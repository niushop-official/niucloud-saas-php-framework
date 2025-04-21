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

namespace addon\o2o\app\service\core;

use addon\o2o\app\dict\GoodsDict;
use addon\o2o\app\model\Evaluate;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use app\model\member\Member;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 评价服务层
 */
class CoreEvaluateService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Evaluate();
    }

    /**
     * 添加评价
     * @param $data
     */
    public function addEvaluate($data)
    {
        $count = (new Order())->where([['order_id', '=', $data[ 'order_id' ]], ['is_evaluate', '=', 0]])->count();
        if(empty($count)) throw new CommonException('该订单已评价');

        $data = [
            'site_id' => $data['site_id'],
            'order_id' => $data[ 'order_id' ] ?? 0,
            'order_item_id' => $data[ 'order_item_id' ] ?? 0,
            'goods_id' => $data[ 'goods_id' ],
            'technician_id' => $data[ 'technician_id' ],
            'member_id' => $data[ 'member_id' ] ?? 0,
            'member_head' => $data[ 'member_head' ],
            'member_name' => $data[ 'member_name' ],
            'content' => $data[ 'content' ],
            'images' => $data[ 'images' ],
            'is_anonymous' => $data[ 'is_anonymous' ],
            'scores' => $data[ 'scores' ],
            'is_audit' => $data[ 'is_audit' ] ?? 1,
            'create_time' => isset($data[ 'create_time' ]) ? strtotime($data[ 'create_time' ]) : time(),
            'update_time' => 0
        ];
        $res = $this->model->create($data);
        if($data[ 'order_id' ] > 0) (new Order())->where([['order_id', '=', $data[ 'order_id' ]]])->update(['is_evaluate' => 1]);
        return $res->evaluate_id;
    }

    /**
     * 自动评价
     */
    public function autoEvaluate($order_id)
    {
        $order = (new Order())->where([['order_id', '=', $order_id], ['is_evaluate', '=', 0]])->findOrEmpty()->toArray();
        if(empty($order)) throw new CommonException('该订单已评价');

        $order_item = (new OrderItem())->where([ ['order_id', '=', $order_id], ['item_type', 'in', [GoodsDict::RESERVATION,GoodsDict::BUY]] ])->select()->toArray();

        $member_info = (new Member())->where([['member_id', '=', $order['member_id']]])->field('nickname, headimg')->findOrEmpty()->toArray();
        if(empty($member_info)) throw new CommonException();

        foreach ($order_item as $k => $v) {
            $data = [
                'site_id' => $order['site_id'],
                'order_id' => $order['order_id'] ?? 0,
                'order_item_id' => $v['order_item_id'] ?? 0,
                'goods_id' => $v['goods_id'],
                'technician_id' => $v['technician_id'],
                'member_id' => $order['member_id'] ?? 0,
                'member_head' => $member_info['headimg'],
                'member_name' => $member_info['nickname'],
                'content' => '系统自动默认好评',
                'images' => '',
                'is_anonymous' => 0,
                'scores' => 5,
                'is_audit' => 2,
                'create_time' => time(),
                'update_time' => 0
            ];
            $this->model->create($data);
        }
        (new Order())->where([['order_id', '=', $order_id]])->update(['is_evaluate' => 1]);
        return true;

    }

}
