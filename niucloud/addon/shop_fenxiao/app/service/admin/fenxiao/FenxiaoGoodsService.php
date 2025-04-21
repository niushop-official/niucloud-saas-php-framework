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

namespace addon\shop_fenxiao\app\service\admin\fenxiao;

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoGoodsDict;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoGoods;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoGoodsRule;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use addon\shop_fenxiao\app\model\fenxiao\Goods;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use think\facade\Db;


/**
 * 分销商品服务层
 * Class FenxiaoGoodsService
 * @package addon\shop_fenxiao\app\service\admin
 */
class FenxiaoGoodsService extends BaseAdminService
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
            ['goods.is_gift', '=', FenxiaoGoodsDict::NOT_IS_GIFT],
            ['status', '=', 1]
        ];

        $search_model = $this->model->withSearch(["goods_name", "goods_type", "goods_category"], $where)
            ->field($field)
            ->withJoin([
                'goodsSku' => ['sku_id', 'goods_id', 'price'],
            ])
            ->where($sku_where)
            ->order($order)->append(['goods_type_name', 'goods_edit_path', 'goods_cover_thumb_small']);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as &$value) {
            $info = (new FenxiaoGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $value['goods_id']]])->findOrEmpty()->toArray();

            if (empty($info)) {
                $value['is_set_fenxiao'] = 0;
                $value['fenxiao_type'] = 1;
            } else {
                $value['is_set_fenxiao'] = $info['is_fenxiao'];
                $value['fenxiao_type'] = $info['fenxiao_type'];
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
     * 修改分销商品
     * @param int $goods_id
     * @param $data
     */
    public function editFenxiaoGoods(int $goods_id, $data)
    {
        $fenxiaoGoods = [
            'is_fenxiao' => $data['is_fenxiao'],
            'fenxiao_type' => $data['fenxiao_type'],
        ];

        $goods_rule_list = [];
        if (!empty($data['fenxiao_rule'])){
            foreach ($data['fenxiao_rule'] as $key=>$value){
                unset($value['calculate_price']);
                foreach ($value as $v){
                    $v['sku_id'] = $v['sku_id'] ?? $key;
                    $v['goods_id'] = $v['goods_id'] ?? $goods_id;
                    $v['site_id'] = $v['site_id'] ??  $this->site_id;
                    $goods_rule_list[] = $v;
                }
            }
        }
        if (!empty($data['skuList'])) {
            $sku_list = array_column($data['skuList'],'calculate_price','sku_id');
            foreach ($goods_rule_list as &$value) {
                if (isset($value['sku_id'] )){
                    $value['calculate_price'] = $sku_list[$value['sku_id']] ?? 0;
                }else{
                    $value['calculate_price'] = 0;
                }
            }
        }

        $fenxiao_goods_rule_model = (new FenxiaoGoodsRule());
        $info = (new FenxiaoGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])->findOrEmpty()->toArray();
        Db::startTrans();
        try {
            if (empty($info)) {
                $fenxiaoGoods['site_id'] = $this->site_id;
                $fenxiaoGoods['goods_id'] = $goods_id;
                (new FenxiaoGoods())->create($fenxiaoGoods);
                $fenxiao_goods_rule_model->saveAll($goods_rule_list);
            } else {
                (new FenxiaoGoods())->where([['goods_id', '=', $goods_id], ['site_id', '=', $this->site_id]])->update($fenxiaoGoods);
                foreach($goods_rule_list as $v){
                    if (isset($v['goods_rule_id'])){
                        $fenxiao_goods_rule_model->where([['goods_rule_id','=',$v['goods_rule_id']]])->update($v);
                    }else{
                        $fenxiao_goods_rule_model->create($v);
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
     * 批量设置是否参与分销
     * @param $goods_ids
     */
    public function modifyGoodsIsFenxiao($goods_ids, int $is_fenxiao)
    {
        $fenxiao_goods_list = (new FenxiaoGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            ->with([
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name');
                },
                'goodsRule',
            ])
            ->select()->toArray();
        $fenxiao_goods_id_list = $fenxiao_sku_id_list = [];
        if (!empty($fenxiao_goods_list)) {
            $fenxiao_goods_id_list = array_column($fenxiao_goods_list, 'goods_id');
            foreach ($fenxiao_goods_list as $item) {
                if (!empty($item['goodsRule'])) {
                    foreach ($item['goodsRule'] as $rule) {
                        $fenxiao_sku_id_list[$rule['goods_id']][] = $rule;
                    }
                }
            }
        }

        $fenxiao_goods_list = (new Goods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            ->with([
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name,cost_price');
                },
            ])
            ->select()->toArray();
        //添加执行
        $goods_id_array = $goods_ids;

        //查询分销等级
        $fenxiaoLevelModel = new FenxiaoLevel();
        $levelList = $fenxiaoLevelModel->field('level_id,level_name,one_rate,two_rate')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();

        //组装分销规则数据
        $goods_rule = [];
        foreach ($fenxiao_goods_list as $goods) {
            if (!empty($goods['skuList'])) {
                $goods_sku_id_list = array_column($goods['skuList'],'sku_id');
                foreach ($goods['skuList'] as $sku) {
                    $sku['calculate_price'] = ''; // 初始化计算价格
                    // 初始化分销等级信息
                    foreach ($levelList as $level) {
                        $goods_rule[$goods['goods_id']][] = [
                            'site_id' => $this->site_id,
                            'goods_id' => $goods['goods_id'],
                            'sku_id' => $sku['sku_id'],
                            'level_id' => $level['level_id'],
                            'level_name' => $level['level_name'],
                            'one_rate' => $level['one_rate'],
                            'two_rate' => $level['two_rate'],
                            'one_money' => '0',
                            'two_money' => '0',
                            'calculate_price' => '0',
                        ];
                    }
                }
            }
        }
        $fenxiao_goods_rule_model = (new FenxiaoGoodsRule());
        Db::startTrans();
        try {
            foreach ($goods_id_array as $k => $v) {
                if (!in_array(intval($v), $fenxiao_goods_id_list)) {
                    //添加分销商品表
                    (new FenxiaoGoods())->create(['goods_id' => $v, 'site_id' => $this->site_id, 'fenxiao_type' => 1]);
                }
                //添加商品分销规则
                if (isset($goods_rule[$v])){
                    $fenxiao_goods_rule_data = $goods_rule[$v];
                    foreach ($fenxiao_goods_rule_data as $key=>$value){
                        if (isset($fenxiao_sku_id_list[$v])){
                            $isInArray = !empty(array_filter($fenxiao_sku_id_list[$v], function ($item) use ($value) {
                                return $item['level_id'] == $value['level_id'];
                            }));
                            if ($isInArray){
                                unset($fenxiao_goods_rule_data[$key]);
                            }
                        }
                    }
                    $fenxiao_goods_rule_model->saveAll($fenxiao_goods_rule_data);
                }
            }

            //整体执行
            (new FenxiaoGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])->update(['is_fenxiao' => $is_fenxiao]);

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    public function getGoodsCommission($goods_id)
    {
        //获取商品信息
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,stock,sale_num,status,sort,create_time';

        $goodsInfo = $this->model->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])
            ->field($field)
            ->with([
                'fenxiaoGoods' => function ($query) {
                    $query->withField('goods_id, fenxiao_type, is_fenxiao');
                },
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name,cost_price');
                },
                'fenxiaoGoodsRule',
            ])
            ->append(['goods_type_name', 'goods_edit_path', 'goods_cover_thumb_small'])->findOrEmpty();
        if (!$goodsInfo->isEmpty()) {
            $goodsInfo = $goodsInfo->toArray();
            //查询分销等级
            $fenxiaoLevelModel = new FenxiaoLevel();
            $levelList = $fenxiaoLevelModel->field('level_id,level_name,one_rate,two_rate')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();
            if (!empty($goodsInfo['fenxiaoGoods'])) {
                $goodsInfo['is_set_fenxiao'] = $goodsInfo['fenxiaoGoods']['is_fenxiao'];
                $goodsInfo['fenxiao_type'] = $goodsInfo['fenxiaoGoods']['fenxiao_type'];
                $goods_sku_list = [];
                foreach ($goodsInfo['fenxiaoGoodsRule'] as $v){
                    $goods_sku_list[$v['sku_id']][$v['level_id']] = $v;
                    $goods_sku_list[$v['sku_id']]['calculate_price'] = $v['calculate_price'];
                }

                foreach ($goods_sku_list as $key=>&$value) {
                    foreach ($levelList as $val) {
                        if (!isset($value[$val['level_id']])) {
                            $value[$val['level_id']]['site_id'] = $this->site_id;
                            $value[$val['level_id']]['sku_id'] = $key;
                            $value[$val['level_id']]['goods_id'] = $goods_id;
                            $value[$val['level_id']]['level_id'] = $val['level_id'];
                            $value[$val['level_id']]['level_name'] = $val['level_name'];
                            $value[$val['level_id']]['one_rate'] = $val['one_rate'];
                            $value[$val['level_id']]['two_rate'] = $val['two_rate'];
                            $value[$val['level_id']]['one_money'] = '0';
                            $value[$val['level_id']]['two_money'] = '0';
                            $value[$val['level_id']]['calculate_price'] = '0';
                        }
                    }
                }
                //追加分销计算金额
                foreach ($goodsInfo['skuList'] as &$value) {
                    $temp_fenxiao_goods_rule = $goods_sku_list[$value['sku_id']] ?? [];
                    $value['calculate_price'] = $temp_fenxiao_goods_rule['calculate_price'] ?? 0;
                }
                $goodsInfo['fenxiaoGoods']['fenxiao_rule'] = json_encode($goods_sku_list);
            } else {
                $goodsInfo['is_set_fenxiao'] = 1;
                $goodsInfo['fenxiao_type'] = 1;
                $goodsInfo['fenxiaoGoods'] = [
                    'goods_id' => $goods_id,
                    'fenxiao_type' => 1,
                    'fenxiao_rule' => [],
                    'is_fenxiao' => 0,
                    'is_set_fenxiao' => 0
                ];

                foreach ($goodsInfo['skuList'] as &$value) {
                    $value['calculate_price'] = 0;
                }
            }

            $data = [
                'goods_info' => $goodsInfo,
                'rule' => $levelList
            ];
            return $data;
        } else {
            throw new AdminException('SHOP_FENXIAO_NOT_FOUND_GOODS');
        }

    }
}
