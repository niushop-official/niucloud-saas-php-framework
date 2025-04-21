<?php

namespace addon\ly_lian\app\service\admin;

use addon\ly_lian\app\model\LianGoods;
use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\Goods;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;


/**
 * 链动商品服务层
 * Class LianGoodsService
 * @package addon\ly_lian\app\service\admin
 */
class GoodsService extends BaseAdminService
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
            $info = (new LianGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $value['goods_id']]])->findOrEmpty()->toArray();

            if (empty($info)) {
                $value['is_set_lian'] = 0;
            } else {
                $value['is_set_lian'] = $info['is_lian'];
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
     * 修改链动商品
     * @param int $goods_id
     * @param $data
     */
    public function editLianGoods(int $goods_id, $data)
    {
        $lianGoods = [
            'is_lian' => $data['is_lian'],
            'is_rule' => $data['is_rule'],
        ];
        if (!empty($data['skuList'])) {
            foreach ($data['skuList'] as $value) {
                $data['reward_set'][$value['sku_id']]['calculate_price'] = $value['calculate_price'];
            }
            if (is_array($data['reward_set']) && !empty($data['reward_set'])) {
                $lianGoods['reward_set'] = json_encode($data['reward_set']);
            } else {
                $lianGoods['reward_set'] = '';
            }
        } else {
            $lianGoods['reward_set'] = '';
        }

        $info = (new LianGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])->findOrEmpty()->toArray();
        if (empty($info)) {
            $LianGoods['site_id'] = $this->site_id;
            $LianGoods['goods_id'] = $goods_id;
            (new LianGoods())->create($LianGoods);
        } else {
            (new LianGoods())->where([['goods_id', '=', $goods_id], ['site_id', '=', $this->site_id]])->update($lianGoods);
        }

        return true;
    }

    /**
     * 批量设置是否参与链动
     * @param $goods_ids
     */
    public function modifyGoodsIsLian($goods_ids, int $is_lian)
    {
        $lian_goods_list = (new LianGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            ->with([
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name');
                },
            ])
            ->select()->toArray();

        if (!empty($lian_goods_list)) {
            $lian_goods_id_list = array_column($lian_goods_list, 'goods_id');
        } else {
            $lian_goods_id_list = [];

        }

        $lian_goods_list = (new Goods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            ->with([
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name,cost_price');
                },
            ])
            ->select()->toArray();
        //添加执行
        $goods_id_array = $goods_ids;

        //查询链动等级
        $LevelModel = new Level();
        $levelList = $LevelModel->field('level_id,level_name,level_num,recommend_rate,see_rate,cultivate_rate')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();
        
        $skuList = [];
        $goods_rule = [];
        foreach ($lian_goods_list as $key => $value) {
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
                $val['recommend_money'] = '0';
                $val['see_money'] = '0';
                $val['cultivate_money'] = '0';
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

        // foreach ($lian_goods_list as $val) {
        //     $val['rate'] = '0';
        // }

        foreach ($goods_id_array as $k => $v) {

            if (!in_array(intval($v), $lian_goods_id_list)) {
                //添加
                 (new LianGoods())->create(['goods_id' => $v, 'site_id' => $this->site_id, 'is_rule' => 1, 'reward_set' => json_encode($result[$v])]);
            }
        }
        //整体执行
        (new LianGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])->update(['is_lian' => $is_lian]);
        return true;
    }

    public function getGoodsCommission($goods_id)
    {
        //获取商品信息
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,stock,sale_num,status,sort,create_time';

        $goodsInfo = $this->model->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])
            ->field($field)
            ->with([
                'lianGoods' => function ($query) {
                    $query->withField('goods_id, is_rule, reward_set, is_lian');
                },
                'skuList' => function ($query) {
                    $query->field('sku_id, goods_id, price,sku_name,cost_price');
                },
            ])
            ->append(['goods_type_name', 'goods_edit_path', 'goods_cover_thumb_small'])->findOrEmpty();
        if (!$goodsInfo->isEmpty()) {
            $goodsInfo = $goodsInfo->toArray();
            if (empty($goodsInfo['lianGoods'])) {
                $goodsInfo['is_set_lian'] = 0;
                $goodsInfo['is_rule'] = 1;
            } else {

                $goodsInfo['is_set_lian'] = $goodsInfo['lianGoods']['is_lian'];
                $goodsInfo['is_rule'] = $goodsInfo['lianGoods']['is_rule'];
            }

            //查询链动等级
            $lianLevelModel = new Level();
            $levelList = $lianLevelModel->field('level_id,level_name,level_num,see_rate,recommend_rate,cultivate_rate')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();
            if (!empty($goodsInfo['lianGoods'])) {
                foreach ($goodsInfo['lianGoods']['reward_set'] as &$value) {

                    foreach ($levelList as $val) {
                        if (!isset($value[$val['level_id']])) {
                            $value[$val['level_id']]['level_name'] = $val['level_name'];
                            $value[$val['level_id']]['level_id'] = $val['level_id'];
                            $value[$val['level_id']]['level_num'] = $val['level_num'];
                            $value[$val['level_id']]['recommend_rate'] = $val['recommend_rate'];
                            $value[$val['level_id']]['see_rate'] = $val['see_rate'];
                            $value[$val['level_id']]['cultivate_rate'] = $val['cultivate_rate'];
                            $value[$val['level_id']]['recommend_money'] = '0';
                            $value[$val['level_id']]['see_money'] = '0';
                            $value[$val['level_id']]['cultivate_money'] = '0';
                        }
                    }
                }
                //追加链动计算金额
                foreach ($goodsInfo['skuList'] as &$value) {
                    $temp_lian_goods_rule = $goodsInfo['lianGoods']['reward_set'][$value['sku_id']] ?? [];
                    $value['calculate_price'] = $temp_lian_goods_rule['calculate_price'] ?? '';
                }

                $goodsInfo['lianGoods']['reward_set'] = json_encode($goodsInfo['lianGoods']['reward_set']);
            } else {

                $goodsInfo['lianGoods'] = [
                    'goods_id' => $goods_id,
                    'is_rule' => 1,
                    'reward_set' => [],
                    'is_lian' => 0
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
            throw new AdminException('LY_LIAN_NOT_FOUND_GOODS');
        }

    }


    public function getLianGoodsIds($site_id){
        $list = (new LianGoods())->where([
            ['site_id', '=', $site_id], ['is_lian', '=', 1]
        ])->column('goods_id');
        
        return $list;
    }
}
