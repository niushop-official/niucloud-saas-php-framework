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

namespace addon\shop_giftcard\app\listener\giftcard;


use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\giftcard\GiftcardGoods;

/**
 * 商品是否关联礼品卡
 * Class GoodsIsconnectedCard
 * @package addon\shop_giftcard\app\listener\card
 */
class GoodsIsConnectedCard
{

    public function handle($param)
    {
        if (!is_array($param['goods_ids'])) {
            $param['goods_ids'] = [$param['goods_ids']];
        }
        $giftcard_model = new Giftcard();
        $giftcard_goods_model = new GiftcardGoods();
        $giftcard_ids = $giftcard_model->where([ [ 'site_id', '=', $param[ 'site_id' ] ] ])->column('giftcard_id');
        if (empty($giftcard_ids))  return false; // 没有礼品卡，直接返回 false
        $giftcard_goods_ids = $giftcard_goods_model->where([ [ 'giftcard_id', 'in', $giftcard_ids] ])->group('goods_id')->column('goods_id');
        if (empty($giftcard_goods_ids)) return false; // 没有礼品卡商品，直接返回 false
        $intersection = array_intersect($param['goods_ids'], $giftcard_goods_ids);
        return !empty($intersection);

    }
}
