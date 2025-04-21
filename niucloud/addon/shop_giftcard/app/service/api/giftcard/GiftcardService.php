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

namespace addon\shop_giftcard\app\service\api\giftcard;

use addon\shop\app\service\api\goods\GoodsService;
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\giftcard\GiftcardGoods;
use addon\shop_giftcard\app\model\giftcard\Material;
use core\base\BaseApiService;
use core\exception\ApiException;


/**
 * 礼品卡活动服务层
 * Class GiftcardService
 * @package addon\shop_giftcard\app\service\api\giftcard
 */
class GiftcardService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Giftcard();
    }

    /**
     * 获取礼品卡活动分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'giftcard_id,category_id,cover,card_name,card_price,is_give,card_right_type,sale_count';
        $order = 'sort desc,create_time desc';

        $giftcard_where = [
            [ 'site_id', "=", $this->site_id ],
            [ 'status', '=', GiftcardDict::ON ],
            [ 'type', '=', GiftcardDict::VIRTUAL ] // 线上只支持购买电子卡
        ];

        $search_model = $this->model->where($giftcard_where)->withSearch([ "category_id", "card_name" ], $where)->field($field)->order($order)
            ->append([ 'card_right_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡列表（供自定义组件调用）
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getListByComponents(array $where = [])
    {
        $field = 'giftcard_id,category_id,cover,card_name,card_price,is_give,card_right_type,sale_count';

        $giftcard_where = [
            [ 'site_id', "=", $this->site_id ],
            [ 'status', '=', GiftcardDict::ON ],
            [ 'type', '=', GiftcardDict::VIRTUAL ] // 线上只支持购买电子卡
        ];

        if (!empty($where[ 'giftcard_ids' ])) {
            $giftcard_where[] = [ 'giftcard_id', 'in', $where[ 'giftcard_ids' ] ];
        }

        if (!empty($where[ 'category_id' ])) {
            $giftcard_where[] = [ 'category_id', '=', $where[ 'category_id' ] ];
        }

        // 参数过滤
        if (!empty($where[ 'order' ]) && in_array($where[ 'order' ], [ 'sale_num', 'price' ])) {
            $order = $where[ 'order' ] . ' desc';
        } else {
            $order = 'sort desc,create_time desc';
        }

        return $this->model->where($giftcard_where)->field($field)
            ->append([ 'card_right_type_name' ])
            ->order($order)->limit($where[ 'num' ])
            ->select()->toArray();
    }

    /**
     * 查询礼品卡活动详情
     * @param $giftcard_id
     * @return mixed
     */
    public function getDetail($giftcard_id)
    {
        $field = 'giftcard_id,cover,card_name,card_price,status,is_give,card_right_type,balance_json,delivery_way,card_goods_type,card_goods_count,validity_type,validity_day,validity_time,card_desc,instruction,sale_count';
        $giftcard_info = $this->model->field($field)->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'type', '=', GiftcardDict::VIRTUAL ],
            [ 'giftcard_id', "=", $giftcard_id ],
        ])->append([ 'card_right_type_name' ])->findOrEmpty()->toArray();

        if (empty($giftcard_info)) {
            throw new ApiException('CARD_NOT_FOUND');
        }

        if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
            // 查询礼品卡关联的商品列表
            $giftcard_goods_model = new GiftcardGoods();
            $giftcard_info[ 'goods_sku_list' ] = $giftcard_goods_model->field('id,giftcard_id,goods_id,sku_id,num')->where([ [ 'giftcard_id', "=", $giftcard_info[ 'giftcard_id' ] ] ])->with([ 'goods', 'sku' ])->select()->toArray();

            $goods_service = new GoodsService();
            $member_info = [];
            if (!empty($this->member_id)) {
                $member_info = $goods_service->getMemberInfo();
            }
            // 处理商品价格展示
            foreach ($giftcard_info[ 'goods_sku_list' ] as $k => $v) {

                $member_price = 0;
                if (!empty($this->member_id)) {
                    $member_price = $goods_service->getMemberPrice($member_info, $v[ 'goods' ][ 'member_discount' ], $v[ 'sku' ][ 'member_price' ], $v[ 'sku' ][ 'price' ]);
                }

                if ($v[ 'goods' ][ 'is_discount' ] && $v[ 'sku' ][ 'sale_price' ] != $v[ 'sku' ][ 'price' ]) {
                    $price = $v[ 'sku' ][ 'sale_price' ]; // 折扣价
                } else if (!empty($this->member_id) && $v[ 'goods' ][ 'member_discount' ] && $member_price != $v[ 'sku' ][ 'price' ]) {
                    $price = $member_price; // 会员价
                } else {
                    $price = $v[ 'sku' ][ 'price' ];
                }
                $giftcard_info[ 'goods_sku_list' ][ $k ][ 'sku' ][ 'price' ] = $price;
            }
        }

        // 查询礼品卡用到的素材图片列表
        $giftcard_material_model = new Material();

        $material_list = $giftcard_material_model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'url', 'in', $giftcard_info[ 'cover' ] ]
        ])->field('material_id,url')->order('create_time desc')->select()->toArray();

        // 按照添加礼品卡素材的顺序调整数据
        $giftcard_info[ 'material_list' ] = [];
        $cover = [];

        // 查询有效的素材
        foreach ($material_list as $k => $v) {
            $giftcard_info[ 'material_list' ][] = [
                'material_id' => $v[ 'material_id' ],
                'url' => $v[ 'url' ]
            ];
            $cover[] = $v[ 'url' ];
        }
        $giftcard_info[ 'cover' ] = implode(',', $cover);

        return $giftcard_info;
    }

}
