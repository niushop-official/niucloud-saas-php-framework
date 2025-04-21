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

namespace addon\o2o\app\service\admin\goods;

use addon\o2o\app\dict\GoodsDict;
use addon\o2o\app\model\Goods;
use addon\o2o\app\model\GoodsSku;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 商品服务层(项目)
 * Class GoodsService
 * @package addon\o2o\app\service\admin\goods
 */
class GoodsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取商品列表(goods)
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'goods_id,member_discount,site_id,goods_name,goods_cover,sale_num,status,sort,create_time,price,buy_type';
        $sku_where = [
            [ 'goodsSku.is_default', '=', 1 ],
            [ 'goods.is_delete', '=', 0 ],
        ];

        if (!empty($where[ 'start_price' ]) && !empty($where[ 'end_price' ])) {
            $money = [ $where[ 'start_price' ], $where[ 'end_price' ] ];
            sort($money);
            $sku_where[] = [ 'goodsSku.price', 'between', $money ];
        } else if (!empty($where[ 'start_price' ])) {
            $sku_where[] = [ 'goodsSku.price', '>=', $where[ 'start_price' ] ];
        } else if (!empty($where[ 'end_price' ])) {
            $sku_where[] = [ 'goodsSku.price', '<=', $where[ 'end_price' ] ];
        }

        if (!empty($where[ 'order' ])) {
            $order = 'goods.' . $where[ 'order' ] . ' ' . $where[ 'sort' ] . ',goods.create_time desc';
        } else {
            $order = 'goods.create_time desc';
        }

        $search_model = $this->model->where([ [ 'goods.site_id', '=', $this->site_id ] ])->withSearch([ "create_time", "goods_name", "goods_category", "sale_num", "status" ], $where)
            ->field($field)
            ->withJoin([
                'goodsSku' => [ 'sku_id', 'goods_id', 'price' ],
            ])->where($sku_where)->order($order)->append([ 'goods_cover_thumb_small', 'buy_type_name' ]);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取商品信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,goods_cover,goods_image,goods_category,sale_num,virtually_sale,status,sort,create_time,update_time,price,price_list,after_sales,buy_type';

        $info = $this->model->field($field)->where([ [ 'is_delete', '=', 0 ], [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->with('category')->findOrEmpty()->append([ 'cover_thumb_small', 'image_thumb_small' ])->toArray();
        return $info;
    }

    /**
     * 获取商品添加/编辑数据
     * @param array $params
     * @return array
     */
    public function getInit(array $params = [])
    {

        $res = [];

        if (!empty($params[ 'goods_id' ])) {
            // 查询商品信息，用于编辑
            $field = 'goods_id,site_id,goods_name,goods_cover,goods_image,goods_category,virtually_sale,status,sort,buy_type,after_sales,price_list,buy_info,goods_content,poster_id,member_discount';
            $goods_info = $this->model->field($field)->where([ [ 'goods_id', '=', $params[ 'goods_id' ] ] ])->findOrEmpty()->toArray();
            if (!empty($goods_info)) {
                $goods_info[ 'status' ] = (string) $goods_info[ 'status' ];

                $goods_sku_model = new GoodsSku();

                $sku_field = 'sku_id,sku_name,sku_image,sku_no,goods_id,price,sale_num,is_default,sku_unit,min_buy';
                $sku_order = 'sku_id asc';
                $goods_info[ 'sku_list' ] = $goods_sku_model->withSearch([ "goods_id" ], [ 'goods_id' => $params[ 'goods_id' ] ])->field($sku_field)->order($sku_order)->select()->toArray();

                $goods_info[ 'spec_type' ] = 'single';
                if (count($goods_info[ 'sku_list' ]) > 1) {
                    // 多规格
                    $goods_info[ 'spec_type' ] = 'multi';
                }

                // 海报id，处理数据类型
                if (empty($goods_info[ 'poster_id' ])) $goods_info[ 'poster_id' ] = '';

                $res[ 'goods_info' ] = $goods_info;
            }

        }

        return $res;
    }

    /**
     * 添加商品
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        try {
            Db::startTrans();
            $goods_sku_model = new GoodsSku();
            // 商品封面
            if (!empty($data[ 'goods_image' ])) $data[ 'goods_cover' ] = explode(',', $data[ 'goods_image' ])[ 0 ];
            $goods_data = [
                'site_id' => $this->site_id,
                'goods_name' => $data[ 'goods_name' ],
                'goods_category' => $data[ 'goods_category' ],
                'goods_cover' => $data[ 'goods_cover' ],
                'goods_image' => $data[ 'goods_image' ],
                'status' => $data[ 'status' ],
                'buy_type' => $data[ 'buy_type' ],
                'price' => $data[ 'price' ],
                'sort' => $data[ 'sort' ],
                'after_sales' => $data[ 'after_sales' ],
                'create_time' => time(),
                'price_list' => $data[ 'price_list' ],
                'buy_info' => $data[ 'buy_info' ],
                'goods_content' => $data[ 'goods_content' ],
                'virtually_sale' => $data[ 'virtually_sale' ],
                'poster_id' => $data[ 'poster_id' ],
                'member_discount' => $data[ 'buy_type' ] == 'buy' ? $data[ 'member_discount' ] : '',
            ];

            $res = $this->model->create($goods_data);
            // 预约
            if ($data[ 'buy_type' ] == 'reservation') {
                $sku_data = [
                    'site_id' => $this->site_id,
                    'sku_name' => $data[ 'goods_name' ],
                    'sku_image' => $data[ 'goods_cover' ],
                    'sku_no' => $data[ 'sku_no' ],
                    'goods_id' => $res->goods_id,
                    'price' => $data[ 'price' ],
                    'sku_unit' => $data[ 'sku_unit' ],
                    'min_buy' => $data[ 'min_buy' ],
                    'is_default' => 1
                ];
                $goods_sku_model->save($sku_data);
            } else {
                if ($data[ 'spec_type' ] == 'single') {
                    // 单规格
                    $sku_data = [
                        'site_id' => $this->site_id,
                        'sku_name' => $data[ 'goods_name' ],
                        'sku_image' => $data[ 'goods_cover' ],
                        'sku_no' => $data[ 'sku_no' ],
                        'goods_id' => $res->goods_id,
                        'price' => $data[ 'price' ],
                        'sku_unit' => $data[ 'sku_unit' ],
                        'min_buy' => $data[ 'min_buy' ],
                        'is_default' => 1
                    ];
                    $goods_sku_model->save($sku_data);

                } elseif ($data[ 'spec_type' ] == 'multi') {
                    $data[ 'goods_sku_data' ] = json_decode($data[ 'goods_sku_data' ], true);
                    // 多规格数据
                    $sku_data = [];
                    foreach ($data[ 'goods_sku_data' ] as $k => $v) {

                        $sku_data[] = [
                            'site_id' => $this->site_id,
                            'sku_name' => $v[ 'sku_name' ],
                            'sku_image' => !empty($v[ 'sku_image' ]) ? $v[ 'sku_image' ] : $data[ 'goods_cover' ],
                            'sku_no' => $v[ 'sku_no' ],
                            'goods_id' => $res->goods_id,
                            'price' => $v[ 'price' ],
                            'is_default' => $v[ 'is_default' ],
                            'sku_unit' => $v[ 'sku_unit' ],
                            'min_buy' => $v[ 'min_buy' ],
                        ];
                    }
                    $goods_sku_model->saveAll($sku_data);
                    $this->model->where([ [ 'goods_id', '=', $res->goods_id ] ])->update([
                        'price' => $sku_data[ 0 ][ 'price' ],
                    ]);

                }
            }
            Db::commit();
            return $res->goods_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }

    }

    /**
     * 商品编辑
     * @param int $goods_id
     * @param array $data
     * @return bool
     */
    public function edit(int $goods_id, array $data)
    {
        try {
            Db::startTrans();
            $goods_sku_model = new GoodsSku();

            // 商品封面
            if (!empty($data[ 'goods_image' ])) $data[ 'goods_cover' ] = explode(',', $data[ 'goods_image' ])[ 0 ];

            $goods_data = [
                'site_id' => $this->site_id,
                'goods_name' => $data[ 'goods_name' ],
                'goods_category' => $data[ 'goods_category' ],
                'goods_cover' => $data[ 'goods_cover' ],
                'goods_image' => $data[ 'goods_image' ],
                'status' => $data[ 'status' ],
                'sort' => $data[ 'sort' ],
                'buy_type' => $data[ 'buy_type' ],
                'price' => $data[ 'price' ],
                'after_sales' => $data[ 'after_sales' ],
                'price_list' => $data[ 'price_list' ],
                'buy_info' => $data[ 'buy_info' ],
                'goods_content' => $data[ 'goods_content' ],
                'virtually_sale' => $data[ 'virtually_sale' ],
                'poster_id' => $data[ 'poster_id' ],
                'member_discount' => $data[ 'buy_type' ] == 'buy' ? $data[ 'member_discount' ] : '',
                'update_time' => time()
            ];
            $this->model->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $this->site_id ] ])->update($goods_data);
            if ($data[ 'buy_type' ] == 'reservation') {
                // 单规格
                $sku_data = [
                    'site_id' => $this->site_id,
                    'sku_name' => $data[ 'goods_name' ],
                    'sku_image' => $data[ 'goods_cover' ],
                    'sku_no' => $data[ 'sku_no' ],
                    'price' => $data[ 'price' ],
                    'sku_unit' => $data[ 'sku_unit' ],
                    'min_buy' => $data[ 'min_buy' ],
                    'is_default' => 1
                ];

                $sku_count = $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->count();
                if ($sku_count > 1) {

                    // 规格项发生变化，删除旧规格，添加新规格重新生成
                    $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->delete();

                    // 新增规格
                    $goods_sku_model->create($sku_data);

                } else {

                    $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->update($sku_data);
                }

            } else {

                if ($data[ 'spec_type' ] == 'single') {
                    // 单规格
                    $sku_data = [
                        'site_id' => $this->site_id,
                        'sku_name' => $data[ 'goods_name' ],
                        'sku_image' => $data[ 'goods_cover' ],
                        'sku_no' => $data[ 'sku_no' ],
                        'price' => $data[ 'price' ],
                        'sku_unit' => $data[ 'sku_unit' ],
                        'min_buy' => $data[ 'min_buy' ],
                        'is_default' => 1
                    ];

                    $sku_count = $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->count();
                    if ($sku_count > 1) {

                        // 规格项发生变化，删除旧规格，添加新规格重新生成
                        $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->delete();

                        // 新增规格
                        $goods_sku_model->create($sku_data);

                    } else {

                        $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->update($sku_data);
                    }
                } elseif ($data[ 'spec_type' ] == 'multi') {

                    $data[ 'goods_sku_data' ] = json_decode($data[ 'goods_sku_data' ], true);
                    // 多规格数据
                    $first_sku_data = reset($data[ 'goods_sku_data' ]);

                    // 检测规格项是否发生变化
                    if (!empty($first_sku_data[ 'sku_id' ])) {
                        // 规格项没有变化，修改/新增规格数据

                        $sku_ids = $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->column('sku_id');

                        $sku_id_arr = [];
                        foreach ($data[ 'goods_sku_data' ] as $k => $v) {

                            $sku_data = [
                                'site_id' => $this->site_id,
                                'sku_name' => $v[ 'sku_name' ],
                                'sku_image' => !empty($v[ 'sku_image' ]) ? $v[ 'sku_image' ] : $data[ 'goods_cover' ],
                                'sku_no' => $v[ 'sku_no' ],
                                'goods_id' => $goods_id,
                                'price' => $v[ 'price' ],
                                'is_default' => $v[ 'is_default' ],
                                'sku_unit' => $v[ 'sku_unit' ],
                                'min_buy' => $v[ 'min_buy' ],
                            ];

                            if (!empty($v[ 'sku_id' ])) {
                                // 修改规格
                                $sku_id_arr[] = $v[ 'sku_id' ];
                                $goods_sku_model->where([ [ 'sku_id', '=', $v[ 'sku_id' ] ], [ 'goods_id', '=', $goods_id ] ])->update($sku_data);
                            } else {
                                // 新增规格
                                $sku_model = $goods_sku_model->create($sku_data);
                                $sku_id_arr[] = $sku_model->sku_id;
                            }
                        }

                        foreach ($sku_ids as $k => $v) {
                            if (in_array($v, $sku_id_arr)) unset($sku_ids[ $k ]);
                        }

                        if (!empty($sku_ids)) {
                            $goods_sku_model->where([ [ 'sku_id', 'in', implode(',', $sku_ids) ] ])->delete();
                        }

                        $this->model->where([ [ 'goods_id', '=', $goods_id ] ])->update([
                            'price' => $data[ 'goods_sku_data' ][ 0 ][ 'price' ] ?? 0,
                        ]);

                    } else {

                        // 规格项发生变化，删除旧规格，添加新规格重新生成
                        $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ] ])->delete();

                        $sku_data = [];
                        foreach ($data[ 'goods_sku_data' ] as $k => $v) {
                            $sku_data[] = [
                                'site_id' => $this->site_id,
                                'sku_name' => $v[ 'sku_name' ],
                                'sku_image' => !empty($v[ 'sku_image' ]) ? $v[ 'sku_image' ] : $data[ 'goods_cover' ],
                                'sku_no' => $v[ 'sku_no' ],
                                'goods_id' => $goods_id,
                                'price' => $v[ 'price' ],
                                'is_default' => $v[ 'is_default' ],
                                'sku_unit' => $v[ 'sku_unit' ],
                                'min_buy' => $v[ 'min_buy' ],
                            ];
                        }
                        $goods_sku_model->saveAll($sku_data);
                        $this->model->where([ [ 'goods_id', '=', $goods_id ] ])->update([
                            'price' => $sku_data[ 0 ][ 'price' ] ?? 0,
                        ]);
                    }

                }
            }

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 编辑商品规格列表会员价格
     * @param $params
     * @return array|bool
     */
    public function editGoodsListMemberPrice($params)
    {
        try {
            Db::startTrans();

            $goods_info = $this->model->where([
                [ 'goods_id', '=', $params[ 'goods_id' ] ],
                [ 'site_id', '=', $this->site_id ]
            ])->field('goods_id,buy_type')->findOrEmpty()->toArray();

            if (empty($goods_info)) {
                throw new CommonException('O2O_GOODS_NOT_EXIST');
            }

            if ($goods_info[ 'buy_type' ] != GoodsDict::BUY) {
                throw new CommonException('O2O_GOODS_NOT_SET_MEMBER_PRICE');
            }

            // 修改商品的会员等级折扣
            $this->model->where([
                [ 'goods_id', '=', $params[ 'goods_id' ] ],
                [ 'site_id', '=', $this->site_id ]
            ])->update([
                'member_discount' => $params[ 'member_discount' ]
            ]);

            $sku_list = $params[ 'sku_list' ];
            if (!empty($sku_list)) {
                $goods_sku_model = new GoodsSku();
                foreach ($sku_list as $k => $v) {
                    $update_data = [
                        'member_price' => json_encode($v[ 'member_price' ]),
                    ];

                    $goods_sku_model->where([
                        [ 'goods_id', '=', $params[ 'goods_id' ] ],
                        [ 'sku_id', '=', $v[ 'sku_id' ] ]
                    ])->update($update_data);
                }
            }
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage() . '，Line：' . $e->getLine() . '，File：' . $e->getFile());
        }
    }

    /**
     * 复制服务项目
     * @param int $goods_id
     * @return mixed
     */
    public function copy(int $goods_id)
    {
        try {
            Db::startTrans();
            $goods_sku_model = new GoodsSku();

            // 查询商品信息
            $field = 'site_id,goods_name,goods_cover,goods_image,goods_category,virtually_sale,status,sort,buy_type,price,after_sales,price_list,buy_info,goods_content,poster_id,member_discount';

            $goods_data = $this->model->field($field)->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
            if (empty($goods_data)) {
                throw new AdminException('O2O_GOODS_NOT_EXIST');
            }

            // 初始化数据
            $goods_data[ 'goods_name' ] .= '_副本';
            $goods_data[ 'sale_num' ] = 0;
            $goods_data[ 'create_time' ] = time();
            $goods_data[ 'sort' ] = 0;
            $goods_data[ 'status' ] = 0;

            // 添加商品
            $res = $this->model->create($goods_data);

            // 查询商品规格信息
            $sku_field = 'site_id,sku_name,sku_image,sku_no,goods_id,price,market_price,sale_num,sku_unit,min_buy,is_default,member_price';

            $sku_order = 'sku_id asc';
            $goods_sku_list = $goods_sku_model->withSearch([ "goods_id" ], [ 'goods_id' => $goods_id ])->field($sku_field)->order($sku_order)->select()->toArray();

            // 添加商品规格
            foreach ($goods_sku_list as $k => $v) {
                $goods_sku_list[ $k ][ 'sale_num' ] = 0;
                $goods_sku_list[ $k ][ 'goods_id' ] = $res->goods_id;
            }
            $goods_sku_model->saveAll($goods_sku_list);

            Db::commit();
            return $res->goods_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 删除商品
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        return $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_delete' => 1 ]);
    }


    /**
     * 查询商品SKU规格列表
     * @param $params
     * @return array
     */
    public function getSkuList($params)
    {
        $goods_sku_model = new GoodsSku();

        $field = 'sku_id, sku_name, sku_image,sku_no,goods_id,price,market_price,sale_num,sku_unit,min_buy,is_default,member_price';
        $order = 'sku_id asc';
        $list = $goods_sku_model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "goods_id" ], [ 'goods_id' => $params[ 'goods_id' ] ])->with([ 'goods' ])->field($field)->order($order)->select()->toArray();
        return $list;
    }

    /**
     * 获取项目列表不分页
     * @param array $where
     * @return array
     */
    public function getLists(array $where = [])
    {
        $field = 'goods_id,site_id,goods_name,goods_cover,goods_image,goods_category,sale_num,virtually_sale,status,sort,create_time,update_time,price,price_list,after_sales,buy_type';
        $order = 'create_time desc';

        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'is_delete', '=', 0 ] ])->withSearch([ "goods_name", "create_time", "categroy_id" ], $where)->field($field)->with('category')->order($order)->append([ 'cover_thumb_small' ])->select()->toArray();
        return $list;
    }

    /**
     * 项目上下架
     */
    public function editStatus($id, $data)
    {
        $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 修改排序
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function editSort(int $id, array $data)
    {
        $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 获取商品选择分页列表
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {

        $field = 'goods_id,member_discount,site_id,goods_name,goods_cover,sale_num,status,sort,create_time,price,buy_type';
        $order = 'create_time desc';
        $sku_where = [
            [ 'goodsSku.is_default', '=', 1 ],
            [ 'goods.is_delete', '=', 0 ],
        ];

        if (!empty($where[ 'start_price' ]) && !empty($where[ 'end_price' ])) {
            $money = [ $where[ 'start_price' ], $where[ 'end_price' ] ];
            sort($money);
            $sku_where[] = [ 'goodsSku.price', 'between', $money ];
        } else if (!empty($where[ 'start_price' ])) {
            $sku_where[] = [ 'goodsSku.price', '>=', $where[ 'start_price' ] ];
        } else if (!empty($where[ 'end_price' ])) {
            $sku_where[] = [ 'goodsSku.price', '<=', $where[ 'end_price' ] ];
        }

        if (!empty($where[ 'goods_ids' ])) {
            $sku_where[] = [ 'goods.goods_id', 'in', $where[ 'goods_ids' ] ];
        }

        if (!empty($where[ 'order' ])) {
            $order = 'goods.' . $where[ 'order' ] . ' ' . $where[ 'sort' ];
        } else {
            $order = 'goods.sort desc,goods.create_time desc';
        }

        $verify_goods_ids = [];

        // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
        if (!empty($where[ 'verify_goods_ids' ])) {
            $verify_goods_ids = $this->model->where([
                [ 'goods_id', 'in', $where[ 'verify_goods_ids' ] ]
            ])->field('goods_id')->select()->toArray();
        }

        $search_model = $this->model->where([ [ 'goods.site_id', '=', $this->site_id ] ])->withSearch([ "create_time", "goods_name", "goods_category" ], $where)
            ->field($field)
            ->withJoin([
                'goodsSku' => [ 'sku_id', 'goods_id', 'price' ],
            ])->where($sku_where)->order($order)->append([ 'goods_cover_thumb_small', 'buy_type_name' ]);
        $list = $this->pageQuery($search_model);

        if (!empty($verify_goods_ids)) {
            $verify_goods_ids = array_column($verify_goods_ids, 'goods_id');
        }
        $list[ 'verify_goods_ids' ] = $verify_goods_ids;

        return $list;

    }

}
