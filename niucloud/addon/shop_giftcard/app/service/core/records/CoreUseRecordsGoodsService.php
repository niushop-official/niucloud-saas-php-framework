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

use addon\shop_giftcard\app\model\records\useRecordsGoods;
use core\base\BaseCoreService;


/**
 * 礼品卡使用记录权益服务层
 * Class CoreUseRecordsGoodsService
 * @package addon\shop_giftcard\app\service\core\records
 */
class CoreUseRecordsGoodsService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new useRecordsGoods();
    }

    /**
     * 获取礼品卡使用记录权益列表
     * @param $site_id
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage($site_id, array $where = [], $field = 'record_goods_id,records_id,card_id,card_goods_id,balance,goods_id,sku_id,goods_name,sku_name,sku_image,sku_no,use_num,order_id,create_time')
    {
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $site_id ] ])->withSearch([ "record_goods_id", "records_id", "card_id", "card_goods_id", "balance", "goods_id", "sku_id", "goods_name", "sku_name", "sku_no", "use_num", "order_id" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡使用记录权益信息
     * @param $site_id
     * @param int $id
     * @param string $field
     * @return mixed
     */
    public function getInfo($site_id, $id, $field = 'record_goods_id,records_id,card_id,card_goods_id,balance,goods_id,sku_id,goods_name,sku_name,sku_image,sku_no,use_num,order_id,create_time')
    {
        $info = $this->model->field($field)->where([ [ 'site_id', "=", $site_id ], [ 'record_goods_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡使用记录权益
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $res = $this->model->create($data);
        return $res->record_goods_id;
    }

}
