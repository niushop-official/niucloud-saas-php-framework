<?php

namespace addon\ly_shareholder\app\service\admin;

use addon\ly_shareholder\app\model\ShareholderGoods;
use addon\ly_shareholder\app\model\ShareholderLevel;
use addon\ly_shareholder\app\model\Goods;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;


/**
 * 股东商品服务层
 * Class ShareholderGoodsService
 * @package addon\ly_shareholder\app\service\admin
 */
class ShareholderGoodsService extends BaseAdminService
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
            $info = (new ShareholderGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $value['goods_id']]])->findOrEmpty()->toArray();

            if (empty($info)) {
                $value['is_set_shareholder'] = 0;
            } else {
                $value['is_set_shareholder'] = $info['is_shareholder'];
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
     * 修改股东分红商品
     * @param int $goods_id
     * @param $data
     */
    public function editShareholderGoods(int $goods_id, $data)
    {
        $ShareholderGoods = [
            'is_shareholder' => $data['is_shareholder'],
        ];

        $info = (new ShareholderGoods())->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])->findOrEmpty()->toArray();
        if (empty($info)) {
            $ShareholderGoods['site_id'] = $this->site_id;
            $ShareholderGoods['goods_id'] = $goods_id;
            (new ShareholderGoods())->create($ShareholderGoods);
        } else {
            (new $ShareholderGoods())->where([['goods_id', '=', $goods_id], ['site_id', '=', $this->site_id]])->update($ShareholderGoods);
        }

        return true;
    }

    /**
     * 批量设置是否参与股东分红
     * @param $goods_ids
     */
    public function modifyGoodsIsShareholder($goods_ids, int $is_shareholder)
    {
        $shareholder_goods_list = (new ShareholderGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            // ->with([
            //     'skuList' => function ($query) {
            //         $query->field('sku_id, goods_id, price,sku_name');
            //     },
            // ])
            ->select()->toArray();

        if (!empty($shareholder_goods_list)) {
            $shareholder_goods_id_list = array_column($shareholder_goods_list, 'goods_id');
        } else {
            $shareholder_goods_id_list = [];

        }

        $shareholder_goods_list = (new Goods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])
            // ->with([
            //     'skuList' => function ($query) {
            //         $query->field('sku_id, goods_id, price,sku_name,cost_price');
            //     },
            // ])
            ->select()->toArray();
        //添加执行
        $goods_id_array = $goods_ids;

        //查询股东等级
        $shareholderLevelModel = new ShareholderLevel();
        $levelList = $shareholderLevelModel->field('level_id,level_name,rate')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();

        foreach ($goods_id_array as $k => $v) {

            if (!in_array(intval($v), $shareholder_goods_id_list)) {
                //添加
                (new ShareholderGoods())->create(['goods_id' => $v, 'site_id' => $this->site_id, ]);
            }
        }
        //整体执行
        (new ShareholderGoods())->where([['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids]])->update(['is_shareholder' => $is_shareholder]);
        return true;
    }

    public function getGoodsCommission($goods_id)
    {
        //获取商品信息
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,stock,sale_num,status,sort,create_time';

        $goodsInfo = $this->model->where([['site_id', '=', $this->site_id], ['goods_id', '=', $goods_id]])
            ->field($field)
            ->with([
                'shareholderGoods' => function ($query) {
                    $query->withField('goods_id, is_shareholder');
                },
                // 'skuList' => function ($query) {
                //     $query->field('sku_id, goods_id, price,sku_name,cost_price');
                // },
            ])
            ->append(['goods_type_name', 'goods_edit_path', 'goods_cover_thumb_small'])->findOrEmpty();

        if (!$goodsInfo->isEmpty()) {
            $goodsInfo = $goodsInfo->toArray();
            if (empty($goodsInfo['shareholderGoods'])) {
                $goodsInfo['is_set_shareholder'] = 0;
            } else {
                $goodsInfo['is_set_shareholder'] = $goodsInfo['shareholderGoods']['is_shareholder'];
            }

            //查询股东等级
            $shareholderLevelModel = new ShareholderLevel();
            $levelList = $shareholderLevelModel->field('level_id,level_name,rate')->where([['site_id', '=', $this->site_id]])->order('level_num asc')->select()->toArray();
            if (!empty($goodsInfo['shareholderGoods'])) {
                foreach ($goodsInfo['shareholderGoods'] as &$value) {
                    foreach ($levelList as $val) {
                        if (!isset($value[$val['level_id']])) {
                            $value[$val['level_id']]['level_name'] = $val['level_name'];
                            $value[$val['level_id']]['level_id'] = $val['level_id'];
                            $value[$val['level_id']]['rate'] = $val['rate'];
                        }
                    }
                }
            }

            $data = [
                'goods_info' => $goodsInfo,
            ];
            return $data;
        } else {
            throw new AdminException('LY_SHAREHOLDER_NOT_FOUND_GOODS');
        }

    }


    public function getShareholderGoodsIds($site_id){
        $list = (new ShareholderGoods())->where([
            ['site_id', '=', $site_id], ['is_shareholder', '=', 1]
        ])->column('goods_id');
        
        return $list;
    }


    //获取o2o商品ids
    public function getO2oGoodsIds($site_id){
        $list = (new ShareholderGoods())->where([
            ['site_id', '=', $site_id], ['is_shareholder', '=', 1]
        ])->column('o2o_goods_id');

        return $list;
    }
}
