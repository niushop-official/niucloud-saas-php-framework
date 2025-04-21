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

namespace addon\shop_giftcard\app\service\admin\giftcard;

use addon\shop\app\model\goods\GoodsSku;
use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGoods;
use addon\shop_giftcard\app\model\card\MemberCardBag;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\giftcard\GiftcardGoods;
use addon\shop_giftcard\app\model\giftcard\Material;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\Query;
use think\facade\Db;


/**
 * 礼品卡活动服务层
 * Class GiftcardService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class GiftcardService extends BaseAdminService
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
        $field = 'giftcard_id,type,category_id,cover,card_name,card_price,status,is_give,card_right_type,validity_type,validity_day,validity_time,card_key_way,sort,make_card_count,sale_count,use_count,invalid_count,activate_count,create_time';
        $order = 'create_time desc';
        if (!empty($where[ 'order' ])) {
            $order = $where[ 'order' ] . ' ' . $where[ 'sort' ];
        }

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "giftcard_id", "type", "category_id", "card_right_type", "card_name", "status" ], $where)->field($field)->with([ 'category' ])->order($order)
            ->append([ 'type_name', 'card_right_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡活动列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'giftcard_id,type,category_id,cover,card_name,card_price,status,is_give,card_right_type,balance_json,delivery_way,card_goods_type,card_goods_count,validity_type,validity_day,validity_time,card_key_way,sort,make_card_count,sale_count,use_count,invalid_count,activate_count,create_time')
    {
        $order = 'sort desc,create_time desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "giftcard_id", "type", "category_id", "card_name", "status" ], $where)->field($field)->with([ 'category' ])->order($order)->select()->toArray();
    }

    /**
     * 获取礼品卡活动信息
     * @param int $id
     * @param string $field
     * @return mixed
     */
    public function getInfo($id, $field = 'giftcard_id,type,category_id,cover,card_name,card_price,status,is_give,receive_validity_time,card_right_type,balance_json,delivery_way,card_goods_type,card_goods_count,validity_type,validity_day,validity_time,card_key_way,card_key_length,card_no_length,card_prefix,card_suffix,card_desc,instruction')
    {
        $info = $this->model->field($field)->where([ [ 'giftcard_id', "=", $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取礼品卡活动详情
     * @param $giftcard_id
     * @return mixed
     */
    public function getDetail($giftcard_id)
    {
        $field = 'giftcard_id, type, card_name, category_id, cover, card_price, status, is_give, receive_validity_time, card_right_type, balance_json, delivery_way, card_goods_type, card_goods_count, validity_type, validity_day, validity_time, make_card_count, sale_count, activate_count, use_count, invalid_count';

        $giftcard_info = $this->model->field($field)->where([ [ 'giftcard_id', "=", $giftcard_id ], [ 'site_id', '=', $this->site_id ] ])->with([ 'category' ])->append([ 'type_name', 'card_right_type_name' ])->findOrEmpty()->toArray();
        if (!empty($giftcard_info)) {

            if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
                // 查询礼品卡关联的商品列表
                $giftcard_info[ 'goods_sku_list' ] = $this->getCardGoodsNum($giftcard_id);
            }
            if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
                $giftcard_info[ 'balance_json' ] = $this->getBalanceCardNum($giftcard_id, $giftcard_info[ 'balance_json' ]);
            }

            return $giftcard_info;
        } else {
            throw new AdminException('GIFTCARD_NOT_FOUND');
        }
    }

    /**
     * 统计各面值储值卡的数量
     * @param int $giftcard_id
     * @param array $balance_json
     * @return array
     */
    public function getBalanceCardNum($giftcard_id, array $balance_json)
    {
        $card_model = new Card();
        $field = 'total_num,use_num';
        foreach ($balance_json as &$item) {
            $where = [ [ 'giftcard_id', '=', $giftcard_id ], [ 'balance', '=', $item[ 'balance' ] ] ];
            $item[ 'to_activate_num' ] = $card_model->field($field)->where($where)->where([ 'status' => CardDict::TO_ACTIVATE ])->count() ?? 0;
            $item[ 'can_use_num' ] = $card_model->field($field)->where($where)->where([ 'status' => CardDict::TO_USE ])->count() ?? 0;
            $item[ 'use_num' ] = $card_model->field($field)->where($where)->where([ 'status' => CardDict::USED ])->count() ?? 0;
            $item[ 'invalid_num' ] = $card_model->field($field)->where($where)->where([ 'status' => CardDict::INVALID ])->count() ?? 0;
        }
        return $balance_json;
    }

    /**
     * 统计各商品的数量
     * @param int $giftcard_id
     * @return array
     */
    public function getCardGoodsNum($giftcard_id)
    {
        $giftcard_goods_model = new GiftcardGoods();
        $giftcard_goods = $giftcard_goods_model->field('goods_id,sku_id')->where([ [ 'giftcard_id', "=", $giftcard_id ] ])->with([ 'goods', 'sku' ])->select()->toArray();
        $card_goods_model = new CardGoods();
        foreach ($giftcard_goods as &$item) {
            $where = [ [ 'goods_id', '=', $item[ 'goods_id' ] ], [ 'sku_id', '=', $item[ 'sku_id' ] ] ];
            $item[ 'total_num' ] = $card_goods_model->where($where)
                ->where([ 'card_goods.giftcard_id' => $giftcard_id ])
                ->withJoin([
                    'card' => function(Query $query) {
                        $query->where([ [ 'status', '<>', CardDict::TO_ACTIVATE ] ]);
                    }
                ], 'left')
                ->sum('card_goods.total_num') ?? 0;
            $item[ 'use_num' ] = $card_goods_model->where($where)->where([ 'giftcard_id' => $giftcard_id ])->sum('use_num') ?? 0;
            $invalid_total_num = $card_goods_model->where($where)
                ->where([ 'card_goods.giftcard_id' => $giftcard_id ])
                ->withJoin([
                    'card' => function(Query $query) {
                        $query->where([ [ 'status', '=', CardDict::INVALID ] ]);
                    }
                ], 'left')
                ->sum('card_goods.total_num') ?? 0;
            $invalid_use_num = $card_goods_model->where($where)
                ->where([ 'card_goods.giftcard_id' => $giftcard_id ])
                ->withJoin([
                    'card' => function(Query $query) {
                        $query->where([ [ 'status', '=', CardDict::INVALID ] ]);
                    }
                ], 'left')
                ->sum('card_goods.use_num') ?? 0;
            $item[ 'invalid_num' ] = max($invalid_total_num - $invalid_use_num, 0);
            $item[ 'not_use_num' ] = max($item[ 'total_num' ] - $item[ 'use_num' ] - $item[ 'invalid_num' ], 0);
        }
        return $giftcard_goods;
    }

    /**
     * 获取礼品卡活动编辑数据
     * @param array $params
     * @return array
     */
    public function getInit(array $params = [])
    {
        $giftcard_info = [];
        if (!empty($params[ 'giftcard_id' ])) {

            $field = 'giftcard_id,type,category_id,cover,card_name,card_price,status,poster_id,is_give,receive_validity_time,blessing_json,card_right_type,balance_json,delivery_way,card_goods_type,card_goods_count,validity_type,validity_day,validity_time,card_key_way,card_key_length,card_no_length,card_prefix,card_suffix,card_desc,instruction,sort';

            $giftcard_info = $this->model->field($field)->where([ [ 'giftcard_id', "=", $params[ 'giftcard_id' ] ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
            if (!empty($giftcard_info)) {

                // 祝福语，多个逗号隔开，处理数据类型
                if (empty($giftcard_info[ 'blessing_json' ])) {
                    $giftcard_info[ 'blessing_json' ] = [];
                }

                // 储值余额面值，多个逗号隔开，处理数据类型
                if (empty($giftcard_info[ 'balance_json' ])) {
                    $giftcard_info[ 'balance_json' ] = [];
                }

                // 卡密内容，多个逗号隔开，处理数据类型
                if (empty($giftcard_info[ 'card_key_way' ])) {
                    $giftcard_info[ 'card_key_way' ] = [];
                }

                // 礼品卡海报id，处理数据类型
                if (empty($giftcard_info[ 'poster_id' ])) {
                    $giftcard_info[ 'poster_id' ] = '';
                }

                if ($giftcard_info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {

                    // 查询礼品卡关联的商品列表
                    $giftcard_goods_service = new GiftcardGoodsService();
                    $giftcard_info[ 'goods_sku_relation' ] = $giftcard_goods_service->getList([
                        [ 'giftcard_id', '=', $params[ 'giftcard_id' ] ]
                    ]);

                    $sku_ids = array_column($giftcard_info[ 'goods_sku_relation' ], 'sku_id');

                    // 查询已选择的商品列表
                    $goods_sku_model = new GoodsSku();
                    $giftcard_info[ 'goods_sku_list' ] = $sku_list = $goods_sku_model
                        ->where([
                            [ 'goods_sku.site_id', '=', $this->site_id ],
                            [ 'goods.status', '=', 1 ],
                            [ 'sku_id', 'in', $sku_ids ]
                        ])
                        ->field('sku_id,goods_id,sku_image,sku_name,stock,price')
                        ->withJoin([
                            'goods'
                        ])->select()->toArray();

                }

            }
        }

        return $giftcard_info;

    }

    /**
     * 添加礼品卡活动
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        try {
            Db::startTrans();

            $giftcard_data = [
                'site_id' => $this->site_id,

                // 基础信息
                'type' => $data[ 'type' ],
                'card_name' => $data[ 'card_name' ],
                'category_id' => $data[ 'category_id' ],
                'cover' => $data[ 'cover' ],
                'card_price' => $data[ 'card_price' ],
                'is_give' => $data[ 'is_give' ],
                'receive_validity_time' => $data[ 'receive_validity_time' ],
                'blessing_json' => $data[ 'blessing_json' ],
                'validity_type' => $data[ 'validity_type' ],
                'validity_day' => $data[ 'validity_day' ],
                'validity_time' => !empty($data[ 'validity_time' ]) ? strtotime($data[ 'validity_time' ]) : 0,
                'poster_id' => $data[ 'poster_id' ],
                'status' => $data[ 'status' ],
                'sort' => $data[ 'sort' ],

                // 礼品卡权益
                'card_right_type' => $data[ 'card_right_type' ],
                'balance_json' => $data[ 'balance_json' ],
                'delivery_way' => $data[ 'delivery_way' ],
                'card_goods_type' => $data[ 'card_goods_type' ],
                'card_goods_count' => $data[ 'card_goods_count' ],

                // 制卡规则
                'card_no_length' => $data[ 'card_no_length' ],
                'card_key_way' => $data[ 'card_key_way' ],
                'card_key_length' => $data[ 'card_key_length' ],
                'card_prefix' => $data[ 'card_prefix' ],
                'card_suffix' => $data[ 'card_suffix' ],

                // 详情
                'instruction' => $data[ 'instruction' ],
                'card_desc' => $data[ 'card_desc' ],
            ];

            $giftcard_data[ 'material_ids' ] = $this->getMaterialIds($data[ 'cover' ]);

            $res = $this->model->create($giftcard_data);

            // 兑换卡
            if ($giftcard_data[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
                if (!empty($data[ 'goods_sku_relation' ])) {
                    $giftcard_goods_service = new GiftcardGoodsService();
                    $giftcard_goods_data = [];
                    foreach ($data[ 'goods_sku_relation' ] as $k => $v) {
                        $giftcard_goods_data[] = [
                            'giftcard_id' => $res->giftcard_id,
                            'goods_id' => $v[ 'goods_id' ],
                            'sku_id' => $v[ 'sku_id' ],
                            'num' => $giftcard_data[ 'card_goods_type' ] == 'all' ? $v[ 'num' ] : 0
                        ];
                    }
                    $giftcard_goods_service->addAll($giftcard_goods_data);
                }
            }

            Db::commit();
            return $res->giftcard_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 礼品卡活动编辑
     * @param int $giftcard_id
     * @param array $data
     * @return bool
     */
    public function edit($giftcard_id, array $data)
    {
        try {
            Db::startTrans();

            $giftcard_data = [
                'site_id' => $this->site_id,

                // 基础信息
                'type' => $data[ 'type' ],
                'card_name' => $data[ 'card_name' ],
                'category_id' => $data[ 'category_id' ],
                'cover' => $data[ 'cover' ],
                'card_price' => $data[ 'card_price' ],
                'is_give' => $data[ 'is_give' ],
                'receive_validity_time' => $data[ 'receive_validity_time' ],
                'blessing_json' => $data[ 'blessing_json' ],
                'validity_type' => $data[ 'validity_type' ],
                'validity_day' => $data[ 'validity_day' ],
                'validity_time' => !empty($data[ 'validity_time' ]) ? strtotime($data[ 'validity_time' ]) : 0,
                'poster_id' => $data[ 'poster_id' ],
                'status' => $data[ 'status' ],
                'sort' => $data[ 'sort' ],

                // 礼品卡权益
                'card_right_type' => $data[ 'card_right_type' ],
                'balance_json' => $data[ 'balance_json' ],
                'delivery_way' => $data[ 'delivery_way' ],
                'card_goods_type' => $data[ 'card_goods_type' ],
                'card_goods_count' => $data[ 'card_goods_count' ],

                // 制卡规则
                'card_no_length' => $data[ 'card_no_length' ],
                'card_key_way' => $data[ 'card_key_way' ],
                'card_key_length' => $data[ 'card_key_length' ],
                'card_prefix' => $data[ 'card_prefix' ],
                'card_suffix' => $data[ 'card_suffix' ],

                // 详情
                'instruction' => $data[ 'instruction' ],
                'card_desc' => $data[ 'card_desc' ],
            ];

            $giftcard_data[ 'material_ids' ] = $this->getMaterialIds($data[ 'cover' ]);

            $this->model->where([ [ 'giftcard_id', '=', $giftcard_id ], [ 'site_id', '=', $this->site_id ] ])->update($giftcard_data);

            // 兑换卡
            if ($giftcard_data[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
                if (!empty($data[ 'goods_sku_relation' ])) {
                    $giftcard_goods_service = new GiftcardGoodsService();
                    // 每次都创建新的礼品卡活动商品关联
                    $giftcard_goods_service->delBatch([
                        [ 'giftcard_id', '=', $giftcard_id ]
                    ]);
                    $giftcard_goods_data = [];
                    foreach ($data[ 'goods_sku_relation' ] as $k => $v) {
                        $giftcard_goods_data[] = [
                            'giftcard_id' => $giftcard_id,
                            'goods_id' => $v[ 'goods_id' ],
                            'sku_id' => $v[ 'sku_id' ],
                            'num' => $giftcard_data[ 'card_goods_type' ] == 'all' ? $v[ 'num' ] : 0
                        ];
                    }
                    $giftcard_goods_service->addAll($giftcard_goods_data);
                }
            }

            //更新卡包
            ( new MemberCardBag() )->where([
                [ 'site_id', "=", $this->site_id ],
                [ 'giftcard_id', '=', $giftcard_id ]
            ])->update([ 'is_give' => $data[ 'is_give' ] ]);

            Db::commit();

            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 删除礼品卡活动
     * @param int $id
     * @return bool
     */
    public function del($id)
    {
        $model = $this->model->where([ [ 'giftcard_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        if ($res) {
            $card_model = new Card();
            $where = [
                [ 'giftcard_id', '=', $id ],
                [ 'status', 'in', [ CardDict::TO_USE, CardDict::CAN_USE ] ]
            ];
            $data = [
                'status' => CardDict::INVALID,
                'invalid_time' => time()
            ];
            $card_model->where($where)->update($data);
            // 删除未激活的卡
            $where_delete = [
                [ 'giftcard_id', '=', $id ],
                [ 'status', '=', CardDict::TO_ACTIVATE ]
            ];
            $card_model->where($where_delete)->delete();
        }
        return $res;
    }

    /**
     * 修改礼品卡上下架状态
     * @param $data
     * @return mixed
     */
    public function modifyStatus($data)
    {
        return $this->model->where([ [ 'giftcard_id', 'in', $data[ 'giftcard_ids' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'status' => $data[ 'status' ] ]);
    }

    /**
     * 修改礼品卡排序号
     * @param $data
     * @return mixed
     */
    public function modifySort($data)
    {
        return $this->model->where([ [ 'giftcard_id', '=', $data[ 'giftcard_id' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'sort' => $data[ 'sort' ] ]);
    }

    /**
     * 获取礼品卡类型
     * @param $type
     * @return array|mixed|string
     */
    public function getType($type)
    {
        return ( new CoreGiftcardService() )->getType($type);
    }

    /**
     * 获取礼品卡权益类型
     * @param $type
     * @return array|mixed|string
     */
    public function getCardRightType($type)
    {
        return ( new CoreGiftcardService() )->getCardRightType($type);
    }

    /**
     * 获取选择礼品卡活动分页列表
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {
        $field = 'giftcard_id,type,category_id,cover,card_name,card_price,is_give,card_right_type,validity_type,validity_day,validity_time';
        $order = 'sort desc,create_time desc';

        $giftcard_where = [
            [ 'site_id', "=", $this->site_id ],
            [ 'status', '=', GiftcardDict::ON ],
            [ 'type', '=', GiftcardDict::VIRTUAL ]
        ];

        $verify_giftcard_ids = [];

        // 检测礼品卡id集合是否存在，移除不存在的礼品卡id，纠正数据准确性
        if (!empty($where[ 'verify_giftcard_ids' ])) {
            $verify_giftcard_ids = $this->model->where([
                [ 'giftcard_id', 'in', $where[ 'verify_giftcard_ids' ] ]
            ])->field('giftcard_id')->select()->toArray();
        }

        if (!empty($verify_giftcard_ids)) {
            $verify_giftcard_ids = array_column($verify_giftcard_ids, 'giftcard_id');
        }

        $giftcard_id = array_merge($where[ 'giftcard_ids' ], $verify_giftcard_ids);

        if ($where[ 'select_type' ] == 'selected') {
            $giftcard_where[] = [ 'giftcard_id', 'in', $giftcard_id ];
        }

        $search_model = $this->model->where($giftcard_where)->withSearch([ "giftcard_id", "category_id", "card_name", "card_right_type" ], $where)->field($field)->with([ 'category' ])->order($order)
            ->append([ 'type_name', 'card_right_type_name' ]);
        $list = $this->pageQuery($search_model);

        $list[ 'verify_giftcard_ids' ] = $verify_giftcard_ids;
        return $list;
    }

    /**
     * 获取礼品卡素材图片id集合
     * @param $cover
     * @return mixed
     */
    public function getMaterialIds($cover)
    {
        $material_model = new Material();
        $list = $material_model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'url', 'in', $cover ]
        ])->field('material_id')->select()->toArray();
        if (!empty($list)) {
            $res = array_column($list, 'material_id');
            $res = array_map(function($item) { return $item . ""; }, $res);
            return $res;
        }
        return [];
    }

}
