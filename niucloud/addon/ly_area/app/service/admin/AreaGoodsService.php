<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\model\AreaGoods;
use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\model\Level;
use addon\ly_area\app\model\Goods;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;


/**
 * 区域商品服务层
 * Class FenxiaoGoodsService
 * @package addon\ly_area\app\service\admin
 */
class AreaGoodsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();

    }

    /**
     * 获取商品列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,stock,sale_num,status,sort,create_time';
        $order = 'create_time desc';
        $sku_where = [
            ['goodsSku.is_default', '=', 1],
            ['goods.site_id', '=', $this->site_id],
            ['status', '=', 1]
        ];

        $search_model = $this->model->withSearch(["goods_name", "goods_type", "goods_category"], $where)
            ->field($field)
            ->withJoin([
                // 'goodsSku' => function ($query) {
                //     $query->withField('sku_id, goods_id, price');
                // },
                    'goodsSku' => ['sku_id','goods_id','price']
            ])
            ->where($sku_where)
            ->order($order)->append(['goods_type_name', 'goods_edit_path', 'goods_cover_thumb_small']);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as &$value) {
            $info = (new AreaGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $value['goods_id']]])->findOrEmpty()->toArray();

            if (empty($info)) {
                $value['is_set_area'] = 0;
            } else {
                $value['is_set_area'] = $info['is_area'];
            }
        }

        return $list;
    }

    /**
     * 获取商品信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,sub_title,goods_type,goods_cover,goods_image,goods_desc,brand_id,goods_category,label_ids,service_ids,unit,stock,sale_num,virtual_sale_num,status,sort,delivery_type,is_free_shipping,fee_type,delivery_money,delivery_template_id,supplier_id,create_time,update_time';
        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 修改区域分红商品
     * @param int $goods_id
     * @param $data
     */
    public function editAreaGoods(int $goods_id, $data)
    {
        $areaGoods = [
            'is_area' => $data['is_area'],
            'is_rule' => $data['is_rule'],
        ];
        if (!empty($data['skuList'])) {
            foreach ($data['skuList'] as $value) {
                $data['area_rule'][$value['sku_id']]['calculate_price'] = $value['calculate_price'];
            }
            if (is_array($data['area_rule']) && !empty($data['area_rule'])) {
                $areaGoods['area_rule'] = json_encode($data['area_rule']);
            } else {
                $areaGoods['area_rule'] = '';
            }
        } else {
            $areaGoods['area_rule'] = '';
        }

        $info = (new AreaGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])->findOrEmpty()->toArray();
        if (empty($info)) {
            $areaGoods['site_id'] = $this->site_id;
            $areaGoods['goods_id'] = $goods_id;
            (new AreaGoods())->create($areaGoods);
        } else {
            (new AreaGoods())->where([['goods_id', '=', $goods_id], ['site_id', '=', $this->site_id]])->update($areaGoods);
        }

        return true;
    }

    /**
     * 批量设置是否参与区域分红
     * @param $goods_ids
     */
    public function modifyGoodsIsArea($goods_ids, int $is_area)
    {
        $area_goods_list = (new AreaGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            ->with([
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name');
                },
            ])
            ->select()->toArray();

        if (!empty($area_goods_list)) {
            $area_goods_id_list = array_column($area_goods_list, 'goods_id');
        } else {
            $area_goods_id_list = [];

        }

        $area_goods_list = (new Goods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            ->with([
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name,cost_price');
                },
            ])
            ->select()->toArray();
        //添加执行
        $goods_id_array = $goods_ids;

        //查询区域分红等级
        $LevelModel = new AreaLevel();
        $levelList = $LevelModel->field('level_id,level_name,level_num,level_rate,level_money')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();
        
        $skuList = [];
        $goods_rule = [];
        foreach ($area_goods_list as $key => $value) {
            $skuList[] = $value['skuList'];
        }
        $result = array_reduce($skuList, function ($result, $value) {
            return array_merge($result, array_values($value));
        }, array());
        foreach ($result as $key => &$value) {
            $value['calculate_price'] = '';
            $goods_rule[$value['sku_id']] = $value;
        }
        foreach ($goods_rule as &$value) {
            foreach ($levelList as $val) {
                $value[$val['level_id']] = $val;
                $value[$val['level_num']] = $val;
            }
        }
        $result = array_reduce($goods_rule, function ($carry, $item) {
            if (!isset($carry[$item['goods_id']])) {
                $carry[$item['goods_id']] = [];
            }
            $carry[$item['goods_id']][$item['sku_id']] = $item;
            return $carry;
        }, []);

        // foreach ($area_goods_list as $val) {
        //     $val['rate'] = '0';
        // }

        foreach ($goods_id_array as $k => $v) {

            if (!in_array(intval($v), $area_goods_id_list)) {
                //添加
                 (new AreaGoods())->create(['goods_id' => $v, 'site_id' => $this->site_id, 'is_rule' => 1, 'area_rule' => json_encode($result[$v])]);
            }
        }
        //整体执行
        (new AreaGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])->update(['is_area' => $is_area]);
        return true;
    }

    public function getGoodsCommission($goods_id)
    {
        //获取商品信息
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,stock,sale_num,status,sort,create_time';

        $goodsInfo = $this->model->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])
            ->field($field)
            ->with([
                'areaGoods' => function ($query) {
                    $query->withField('goods_id, is_rule, area_rule, is_area');
                },
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name,cost_price');
                },
            ])
            ->append(['goods_type_name', 'goods_edit_path', 'goods_cover_thumb_small'])->findOrEmpty();
        if (!$goodsInfo->isEmpty()) {
            $goodsInfo = $goodsInfo->toArray();
            if (empty($goodsInfo['areaGoods'])) {
                $goodsInfo['is_set_area'] = 0;
                $goodsInfo['is_rule'] = 1;
            } else {

                $goodsInfo['is_set_area'] = $goodsInfo['areaGoods']['is_area'];
                $goodsInfo['is_rule'] = $goodsInfo['areaGoods']['is_rule'];
            }

            //查询区域分红等级
            $areaLevelModel = new AreaLevel();
            $levelList = $areaLevelModel->field('level_id,level_name,level_num,level_rate, level_money')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();
            if (!empty($goodsInfo['areaGoods'])) {
                foreach ($goodsInfo['areaGoods']['area_rule'] as &$value) {

                    foreach ($levelList as $val) {
                        if (!isset($value[$val['level_id']])) {
                            $value[$val['level_id']]['level_name'] = $val['level_name'];
                            $value[$val['level_id']]['level_id'] = $val['level_id'];
                            $value[$val['level_id']]['level_num'] = $val['level_num'];
                            $value[$val['level_id']]['level_rate'] = $val['level_rate'];
                            $value[$val['level_id']]['level_money'] = $val['level_money'];
                            $value[$val['level_id']]['cultivate_money'] = '0';
                        }
                    }
                }
                //追加区域分红计算金额
                foreach ($goodsInfo['skuList'] as &$value) {
                    $temp_area_goods_rule = $goodsInfo['areaGoods']['area_rule'][$value['sku_id']] ?? [];
                    $value['calculate_price'] = $temp_area_goods_rule['calculate_price'] ?? '';
                }

                $goodsInfo['areaGoods']['area_rule'] = json_encode($goodsInfo['areaGoods']['area_rule']);
            } else {

                $goodsInfo['areaGoods'] = [
                    'goods_id' => $goods_id,
                    'is_rule' => 1,
                    'area_rule' => [],
                    'is_area' => 0
                ];
                foreach ($goodsInfo['skuList'] as &$value) {
                    $value['calculate_price'] = '';
                }
            }

            $data = [
                'goods_info' => $goodsInfo,
                'rule' => $levelList
            ];
            return $data;
        } else {
            throw new AdminException('LY_AREA_NOT_FOUND_GOODS');
        }

    }


    public function getAreaGoodsIds($site_id){
        $list = (new AreaGoods())->where([
            ['site_id', '=', $site_id], ['is_area', '=', 1]
        ])->column('goods_id');
        
        return $list;
    }
}
