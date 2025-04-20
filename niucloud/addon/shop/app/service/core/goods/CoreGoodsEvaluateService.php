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

namespace addon\shop\app\service\core\goods;

use addon\shop\app\dict\goods\EvaluateDict;
use addon\shop\app\model\goods\Evaluate;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\order\Order;
use core\base\BaseCoreService;

/**
 * 商品库存服务层
 */
class CoreGoodsEvaluateService extends BaseCoreService
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
        $data = [
            'site_id' => $data['site_id'],
            'order_id' => $data[ 'order_id' ] ?? 0,
            'order_goods_id' => $data[ 'order_goods_id' ] ?? 0,
            'goods_id' => $data[ 'goods_id' ],
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

        // 无需审核的增加评论统计数
        if ($data['is_audit'] == EvaluateDict::AUDIT_NO) {
            CoreGoodsStatService::addStat(['site_id' => $data['site_id'], 'goods_id' => $data[ 'goods_id' ], 'evaluate_num' => 1]);
            (new Goods())->where([['goods_id', '=', $data['goods_id']]])->inc('evaluate_num', 1) ->update();
        }

        return $res->evaluate_id;
    }

}
