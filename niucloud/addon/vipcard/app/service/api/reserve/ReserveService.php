<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\service\api\reserve;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\dict\ReserveDict;
use addon\vipcard\app\job\ReserveRemind;
use addon\vipcard\app\model\Goods;
use addon\vipcard\app\model\Reserve;
use addon\vipcard\app\service\core\CoreOrderService;
use addon\vipcard\app\service\core\CoreStatService;
use core\base\BaseApiService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 预约服务层
 * Class ReserveService
 * @package app\service\api\reserve
 */
class ReserveService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Reserve();
    }

    /**
     * 获取预约列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $where[] = ['member_id', '=', $this->member_id];
        $field = 'reserve_id,site_id,member_id,reserve_name,reserve_time,reserve_state,remark,create_time,complete_time,to_store_time,cancel_time,source,goods_id,order_id';
        $order = 'create_time desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id],['member_id', '=', $this->member_id]])->withSearch(["reserve_state","create_time","member_id"], $where)->with([
            'goods' => function($query){
                $query->field("goods_name,goods_id,price,goods_cover,site_id")->append(['cover_thumb_small', 'cover_thumb_mid']);
            }
        ])->append(['reserve_state_name', 'trade_type', 'trade_id'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取预约信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'reserve_id,site_id,member_id,reserve_name,reserve_time,reserve_state,remark,create_time,complete_time,to_store_time,cancel_time,source,goods_id,order_id,technician_id,mobile,is_need_pay,pay_time';

        $info = $this->model->field($field)->where([['reserve_id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->with([
            'goods' => function($query){
                $query->field("goods_name,goods_id,price,goods_cover,site_id,keywords")->append(['cover_thumb_mid']);
            },
            'order' => function($query){
                $query->field("order_id,site_id,order_no,order_from,order_type,out_trade_no,order_status,refund_status,refund_no,member_id,ip,member_message,order_money,create_time,pay_time,close_time,auto_close_time,delete_time,is_enable_refund,remark,pay_money,order_name");
            },
            'technician' => function($query){
                $query->field("id,name,mobile,seniority,number,position,headimg,status");
            }
        ])->append(['trade_type', 'trade_id', 'reserve_state_name'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加预约
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $goods = (new Goods())->where([
            ['site_id', '=', $this->site_id ],
            ['goods_id', '=', $data['goods_id'] ],
            ['status', '=', 1],
            ['goods_type', '=', GoodsDict::SERVICE ]
        ])->field('is_reserve,is_reserve_pay')->findOrEmpty();
        if ($goods->isEmpty()) throw new CommonException('VIPCARD_GOODS_NOT_EXIST');
        if (!$goods->is_reserve) throw new CommonException('SERVICE_NOT_REQUIRED_RESERVE');

        $reserve_config = ( new ReserveConfigService() )->getReserveConfig();

        $reserve_time_stamp = strtotime($data['reserve_date']);
        $week = date('w', $reserve_time_stamp);
        $start_time_stamp = strtotime(date('Y-m-d', $reserve_time_stamp)) + $reserve_config[ 'start' ];
        $end_time_stamp = strtotime(date('Y-m-d', $reserve_time_stamp)) + $reserve_config[ 'end' ];

        if (!in_array($week, $reserve_config[ 'week' ])) throw new CommonException('CURRENT_TIME_IS_NOT_WITHIN_TIME_RANGE');
        if ($reserve_time_stamp < $start_time_stamp || $reserve_time_stamp > $end_time_stamp) throw new CommonException('CURRENT_TIME_IS_NOT_WITHIN_TIME_RANGE');

        $reserve_count = $this->model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'goods_id', '=', $data['goods_id'] ],
            [ 'reserve_date', '=', $data['reserve_date'] ],
            [ 'reserve_state', '<>', ReserveDict::REMOVE ]
        ])->count();
        if ($reserve_count >= $reserve_config[ 'max' ]) throw new CommonException('RESERVE_NUM_LIMIT');

        //校验用户当前时间点是否有预约
        $user_reserve_count = $this->model->where([
            ['site_id','=',$this->site_id],
            ['member_id','=',$this->member_id],
            ['reserve_date','=',$data['reserve_date']],
            [ 'reserve_state', '<>', ReserveDict::REMOVE ]
        ])->count();
        if ($user_reserve_count > 0)  throw new CommonException('USER_TIME_BE_RESERVED');

        //校验技师当前时间点是否空闲
        if (!empty($data['technician_id'])){
            $user_reserve_count = $this->model->where([
                ['site_id','=',$this->site_id],
                ['technician_id','=',$data['technician_id']],
                ['reserve_date','=',$data['reserve_date']],
                ['reserve_state', '<>', ReserveDict::REMOVE ]
            ])->count();
            if ($user_reserve_count > 0)  throw new CommonException('TECHNICIAN_TIME_BE_RESERVED');
        }
        Db::startTrans();
        try {
            // 添加预约
            $data['site_id'] = $this->site_id;
            $data['member_id'] = $this->member_id;
            $data['create_time'] = time();
            $data['reserve_time'] = strtotime($data['reserve_date']);

            $data['reserve_state'] = ReserveDict::TREAT_TO_STORE;
            if($goods->is_reserve_pay) $data['reserve_state'] = ReserveDict::TO_BE_CONFIRMED;
            $data['is_need_pay'] = $goods->is_reserve_pay;

            $create_reserve = $this->model->create($data);

            $res = [
                'reserve_id' => $create_reserve->reserve_id
            ];
            // 预约是否需支付
            if ($goods->is_reserve_pay) {
                $create_order = (new CoreOrderService())->create([
                    'site_id' => $this->site_id,
                    'member_id' => $this->member_id,
                    'order_from' => $this->channel,
                    'goods' => [ ['goods_id' => $data['goods_id'], 'num' => 1] ],
                ]);
                $res += $create_order;

                $this->model->update(['order_id' => $create_order['trade_id'] ], [ 'reserve_id' => $create_reserve->reserve_id]);
            }

            CoreStatService::addStat($this->site_id, ['reserve_num' => 1]);

            // 预约使用提醒
            $remind_time = strtotime( date('Y-m-d 09:00:00', strtotime("{$data['reserve_date']} - 1 day")) );
            if ($remind_time > time()) ReserveRemind::dispatch([ 'site_id' => $this->site_id, 'reserve_id' => $create_reserve->reserve_id ], secs: $remind_time - time());

            Db::commit();
            return $res;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 取消预约
     */
    public function remove($id){
        $this->model->where([['reserve_id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->update(['reserve_state' => ReserveDict::REMOVE]);
        return true;
    }
}
