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

namespace addon\huodong\app\service\admin\order;

use addon\huodong\app\model\fxuser\Fxuser;
use addon\huodong\app\model\order\Order;
use addon\huodong\app\service\core\CoreOrderService;
use app\model\member\Member;

use core\base\BaseAdminService;
use addon\huodong\app\service\admin\act\ActService;
use addon\huodong\app\dict\order\OrderDict;
/**
 * 报名记录服务层
 * Class OrderService
 * @package addon\huodong\app\service\admin\order
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取报名记录列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
           $order = 'order_id desc';



        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["order_id","order_no","order_from","out_trade_no","order_status","member_id","order_money","create_time",'act_id','pid'], $where)->with(['member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'pay' => function($query) {
            $query->field('');
        } ])->order($order);
        $list = $this->pageQuery($search_model);

        $order_status = OrderDict::getStatus();

        foreach ($list[ 'data' ] as $k => &$v) {
            $list[ 'data' ][ $k ][ 'order_status_info' ] = $order_status[ $v[ 'order_status' ] ] ?? [];

            $act = (new ActService)->getInfo( $list[ 'data' ][ $k ]['act_id']);
            $list[ 'data' ][ $k ][ 'act' ] = $act ?? [];
            $list[ 'data' ][ $k ][ 'act_name' ] = $act['name']??'';

            $list[ 'data' ][ $k ][ 'hexiao_url' ] = 'http://'.$_SERVER['HTTP_HOST'].'/wap/addon/huodong/pages/order/hexiao?id='.$list[ 'data' ][ $k ][ 'order_id' ];

            $v['pay_time'] = $v['pay_time']?date('Y-m-d H:i:s',$v['pay_time']):'';

            $v['hx_time'] = $v['hx_time']?date('Y-m-d H:i:s',$v['hx_time']):'';

            $v['hx_member_name'] = (new Member())->where([['member_id', "=", $v['hx_member_id']]])->value('nickname');

            $v['pid_name'] = (new Member())->where([['member_id', "=", $v['pid']]])->value('nickname');
            $v['pid2_name'] = (new Member())->where([['member_id', "=", $v['pid2']]])->value('nickname');



        }

        return $list;
    }

    /**
     * 获取报名记录信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = '*';

        $detail = $this->model->where([['order_id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        if(empty($detail)){
            return '';
        }
        $order_status = OrderDict::getStatus();
        $detail[ 'order_status_info' ] = $order_status[ $detail[ 'order_status' ] ] ?? [];

        $detail['act'] = (new ActService)->getInfo( $detail['act_id']);
        $detail['hx_time'] = $detail['hx_time']?date('Y-m-d H:i:s',$detail['hx_time']):'';

        $detail['hx_member_name'] = (new Member())->where([['member_id', "=", $detail['hx_member_id']]])->value('nickname');


        return $detail;
    }

    /**
     * 添加报名记录
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->order_id;

    }

    /**
     * 报名记录编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['order_id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除报名记录
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['order_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getMemberAll(){
       $memberModel = new Member();
       return $memberModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getStatus()
    {
        return OrderDict::getStatus();
    }

    public function hexiao()
    {
        $post = input('');

        $order_no = $post['order_no'];
        return (new CoreOrderService())->hexiao($order_no);
    }

}
