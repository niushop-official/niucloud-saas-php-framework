<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\service\api;

use addon\tk_vip\app\dict\order\OrderDict;
use addon\tk_vip\app\model\order\Order;
use addon\tk_vip\app\service\core\MemberService;
use app\model\member\Member;
use app\model\member\MemberLevel;
use core\base\BaseApiService;
use core\exception\CommonException;
use think\Exception;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;


/**
 * VIP订单服务层
 * Class OrderService
 * @package addon\tk_vip\app\service\admin\order
 */
class OrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取VIP订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,member_id,order_from,order_id,body,level_id,sku_id,day,status,out_trade_no,pay_time,close_time,close_reason,remark,refund_status,create_time,update_time,delete_time,order_money';
        $order = 'update_time desc';
        $search_model = $this->model
            ->where(['member_id'=>$this->member_id])
            ->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["member_id","order_from","order_id","body","level_id","status","out_trade_no","update_time"], $where)->with(['member','memberLevel'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取VIP订单信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,order_from,order_id,body,level_id,sku_id,day,status,out_trade_no,pay_time,close_time,close_reason,remark,refund_status,create_time,update_time,delete_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member','memberLevel'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加VIP订单
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $level_list= Cache::get('tk_vip_level_list'.$this->site_id.$this->member_id);
        if(!$level_list){
            $level_list=(new MemberLevelService())->getList();
        }
        if(isset($level_list[$data['level_index']])&&isset($level_list[$data['level_index']]['level_benefits']['tk_vip_fee'])&&isset($level_list[$data['level_index']]['level_benefits']['tk_vip_fee']['fee_info'])){
            $sku_data=$level_list[$data['level_index']]['level_benefits']['tk_vip_fee']['fee_info'][$data['sku_index']];
            if(!isset($sku_data['id'])||($sku_data['id']!=$data['sku_info']['id']))  throw new Exception('会员等级信息已经变更，请刷新页面');
            $fee_info=$level_list[$data['level_index']]['level_benefits']['tk_vip_fee'];
            if(isset($fee_info['is_real'])&&$fee_info['is_real']==1){
               $checkInfo= (new RealService())->checkReal();
               if($checkInfo['type']!='success') throw new Exception('实名验证未通过');
            }
            $orderData=[
                'site_id'=>$this->site_id,
                'member_id'=>$this->member_id,
                'order_from'=>$this->channel,
                'order_id' => create_no(),
                'status' => OrderDict::WAIT_PAY,
                'level_id'=>$data['level_id'],
                'order_money'=>$sku_data['price'],
                'day'=>$sku_data['day']??'',
                'type'=>$sku_data['over_type']??'common',
                'over_time'=>$sku_data['over_time']??'',
                'body'=>$sku_data['name']??'',
                'sku_info'=>json_encode($sku_data)
            ];
            $res = $this->model->create($orderData);
            return [
                'trade_type' => OrderDict::getOrderType()['type'],
                'trade_id' => $res['id'],
                'order_id' =>$orderData['order_id'],
            ];
        }else{
            throw new Exception('会员等级信息已经变更，请刷新页面');
        }
    }

    /**
     * VIP订单编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除VIP订单
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getMemberAll(){
       $memberModel = new Member();
       return $memberModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getMemberLevelAll(){
       $memberLevelModel = new MemberLevel();
       return $memberLevelModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }
    public function paySuccess($pay_info)
    {
        $trade_id = $pay_info['trade_id'] ?? 0;
        $order_model = new Order();
        $order_info = $order_model->where([['site_id', '=', $pay_info['site_id']], ['id', '=', $trade_id]])->findOrEmpty();
        if (empty($order_info))
            throw new CommonException('ORDER_NOT_EXIST');
        if ($order_info['status'] != OrderDict::WAIT_PAY) return true;
        Db::startTrans();
        try {
            $status = OrderDict::FINISH;
            $order_data = [
                'pay_time' => time(),
                'status' => $status,
                'is_enable_refund' => 0, // 是否允许退款
                'out_trade_no' => $pay_info['out_trade_no']//支付后的交易流水号
            ];

            //进行会员等级更改
            $member=(new Member())->where(['site_id'=>$order_info['site_id'],'member_id'=>$order_info['member_id']])->findOrEmpty();
            if(!$member->isEmpty()){
                $member->member_level=$order_info['level_id'];
                $member->save();
            }
            //同步进行插件会员等级修改
            (new MemberService())->changeVipV1($order_info);
            $order_info->save($order_data);
            Db::commit();
            //进行激励发送
            //(new SendService())->sendEvent($order_info);
            return true;
        } catch (Exception $e) {
            Db::rollback();
            Log::write($e->getMessage(), 'VIP付费会员订单回调失败--' . date('Y-m-d H:i:s'));
            return false;
        }
    }

}
