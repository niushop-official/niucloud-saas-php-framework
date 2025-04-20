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

namespace addon\vipcard\app\service\admin\goods;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\model\Goods;
use addon\vipcard\app\model\GoodsCardItem;
use core\base\BaseAdminService;

/**
 * 卡项服务层(项目)
 * Class GoodsService
 * @package addon\vipcard\app\service\admin\goods
 */
class CardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取卡项列表(service)
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,card_type';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'goods_type', '=', GoodsDict::CARD ] ])->withSearch([ "goods_name", "category_id", "card_type", "create_time" ], $where)->field($field)->order($order)->append([ 'card_type_name', 'cover_thumb_small', 'image_thumb_small' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取卡项信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_content,goods_cover,buy_info,goods_image,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,card_type,scribe_price,keywords,common_num,virtually_sale';

        $info = $this->model->field($field)->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ], [ 'goods_type', '=', GoodsDict::CARD ] ])->with([ 'item' => function ($query) {
            $query->field("main_goods_id,relate_goods_id,num");
        } ])->findOrEmpty()->toArray();

        if (!empty($info[ 'item' ])) {
            foreach ($info[ 'item' ] as $key => $val) {
                $item = $this->model->field("goods_name,price")->where([ [ 'goods_id', '=', $val[ 'relate_goods_id' ] ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
                $info[ 'item' ][ $key ][ 'goods_name' ] = $item[ 'goods_name' ];
                $info[ 'item' ][ $key ][ 'price' ] = $item[ 'price' ];
            }
        }

        return $info;
    }

    /**
     * 添加卡项
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'goods_type' ] = GoodsDict::CARD;
        $res = $this->model->create($data);
        if ($res->goods_id > 0) {
            $item_data = [];
            foreach ($data[ 'goods_arr' ] as $val) {
                $item_data[] = [ 'site_id' => $this->site_id, 'main_goods_id' => $res->goods_id, 'relate_goods_id' => $val[ 'goods_id' ], 'num' => $val[ 'num' ] ?? 0 ];
            }
            ( new GoodsCardItem() )->insertAll($item_data);
        }
        return $res->goods_id;
    }

    /**
     * 卡项编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data, array $goods_data)
    {
        $data[ 'goods_type' ] = GoodsDict::CARD;
        $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);

        ( new GoodsCardItem() )->where([ [ 'main_goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->delete();

        if (!empty($goods_data)) {
            $item_data = [];
            foreach ($goods_data as $val) {
                $relate_goods_id = $val[ 'relate_goods_id' ] ?? $val[ 'goods_id' ];
                $item_data[] = [ 'site_id' => $this->site_id, 'main_goods_id' => $id, 'relate_goods_id' => $relate_goods_id, 'num' => $val[ 'num' ] ?? 0 ];
            }
            ( new GoodsCardItem() )->insertAll($item_data);
        }
        return true;
    }

    /**
     * 删除卡项
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->delete();
        return $res;
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
     * 卡项上下架
     */
    public function editStatus($id, $data)
    {
        $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 获取卡项列表(service)
     * @param array $where
     * @return array
     */
    public function getGoodsPageOfSelect(array $where = [])
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,card_type, stock';
        $order = 'goods_id desc';
        $search_model = $this->model->where([ [ 'status', '=', 1 ], [ 'goods_type', '=', GoodsDict::CARD ], [ 'site_id', '=', $this->site_id ] ])
            ->withSearch([ 'goods_name', 'category_id', 'goods_type' ], $where)
            ->field($field)->order($order)->append([ 'card_type_name', 'cover_thumb_small', 'image_thumb_small', 'goods_type_name', 'status_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

}
