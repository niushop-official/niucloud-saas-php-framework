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

namespace addon\shop_giftcard\app\service\core\records;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGoods;
use addon\shop_giftcard\app\model\records\useRecords;
use core\base\BaseCoreService;
use core\exception\ApiException;


/**
 * 礼品卡使用记录权益服务层
 * Class CoreUseRecordsGoodsService
 * @package addon\shop_giftcard\app\service\core\records
 */
class CoreUseRecordsService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new useRecords();
    }

    /**
     * 获取礼品卡使用记录列表
     * @param $site_id
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage($site_id, array $where = [], $field = 'record_id,giftcard_id,card_id,use_time,member_id,member_card_id')
    {
        $order = 'use_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $site_id ] ])->withSearch([ "record_id", "giftcard_id", "card_id", "use_time", "member_id", "member_card_id" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡使用记录信息
     * @param $site_id
     * @param int $id
     * @param string $field
     * @return mixed
     */
    public function getInfo($site_id, $id, $field = 'record_id,giftcard_id,card_id,use_time,member_id,member_card_id')
    {
        $info = $this->model->field($field)->where([ [ 'site_id', "=", $site_id ], [ 'record_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡使用记录
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $res = $this->model->create($data);
        return $res->record_id;
    }

    /**
     * 兑换卡使用校验
     * @param int $site_id
     * @param array $data
     * @return array
     */
    public function goodsCardUseCheck($site_id, array $data)
    {
        $card_id = $data[ 'card_id' ];
        $sku_data = $data[ 'sku_data' ];  //['sku_id' => 287, 'num' => 3]

        //过滤掉商品数量为0的商品
        foreach ($sku_data as $key => $item) {
            if ($item[ 'num' ] == 0) unset($sku_data[ $key ]);
        }
        $sku_data = array_values($sku_data);

        $card = ( new Card() )->field('giftcard_id,status,total_num,use_num,validity_time')->where([ [ 'site_id', '=', $site_id ], [ 'card_id', "=", $card_id ] ])
            ->with([ 'giftcard' ])->findOrEmpty()->toArray();
        if (empty($card)) throw new ApiException('CARD_NOT_FOUND');
        if (!in_array($card[ 'status' ], [ CardDict::TO_USE, CardDict::CAN_USE ])) throw new ApiException('CARD_CANNOT_USE');
        $validity_time = $card[ 'validity_time' ] == 0 ? 0 : strtotime($card[ 'validity_time' ]);
        if ($validity_time > 0 && $validity_time < time()) throw new ApiException('CARD_HAS_EXPIRE');//礼品卡已过期

        if (empty($card[ 'giftcard' ])) throw new ApiException('CARD_NOT_FOUND');
        if ($card[ 'giftcard' ][ 'status' ] == GiftcardDict::OFF) throw new ApiException('GIFTCARD_HAS_DOWN');
        if ($card[ 'giftcard' ][ 'card_right_type' ] != GiftcardDict::cardRightTypeGoods) throw new ApiException('CARD_RIGHT_TYPE_ERROR');

        $delivery_way = $card[ 'giftcard' ][ 'delivery_way' ];
        $card_goods_type = $card[ 'giftcard' ][ 'card_goods_type' ];

        $leave_num = $card[ 'total_num' ] - $card[ 'use_num' ];
        $total_use_num = array_reduce($sku_data, function($carry, $item) {
            return $carry + $item[ 'num' ];
        }, 0);
        if ($total_use_num > $leave_num) throw new ApiException('CARD_USE_NUM_GREATER_THAN_LEAVE_UNM');
        if ($card_goods_type == GiftcardDict::ALL_GOODS) {
            foreach ($sku_data as $item) {
                $num = $item[ 'num' ];
                $card_goods_where = [
                    [ 'site_id', '=', $site_id ],
                    [ 'card_id', '=', $card_id ],
                    [ 'sku_id', '=', $item[ 'sku_id' ] ]
                ];
                $card_goods = ( new CardGoods() )->field('id,total_num,use_num')->where($card_goods_where)->findOrEmpty()->toArray();
                if (!empty($card_goods)) {
                    $item_total_num = $card_goods[ 'total_num' ];
                    $item_use_num = $card_goods[ 'use_num' ];
                    if ($item_use_num + $num > $item_total_num) throw new ApiException('CARD_USE_NUM_GREATER_THAN_LEAVE_UNM');
                }
            }
        }
        if ($delivery_way == GiftcardDict::ALL) {
            if ($total_use_num < $leave_num) throw new ApiException('CARD_ALL_MUST_RECEIVE');
        }
        return [
            'sku_data' => $sku_data,
            'extend_data' => [
                'relate_id' => $card_id,
                'activity_type' => OrderDict::TYPE
            ]
        ];
    }

}
