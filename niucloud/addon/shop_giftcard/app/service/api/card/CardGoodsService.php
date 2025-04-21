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

namespace addon\shop_giftcard\app\service\api\card;


use addon\shop_giftcard\app\model\card\CardGoods;
use addon\shop_giftcard\app\service\core\card\CoreCardGoodsService;
use core\base\BaseApiService;


/**
 * 礼品卡获取权益服务层
 * Class CardGoodsService
 * @package addon\shop_giftcard\app\service\admin\card
 */
class CardGoodsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new CardGoods();
    }

    /**
     * 获取礼品卡获取权益列表
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        $field = 'id,card_id,giftcard_id,balance,goods_id,sku_id,goods_name,sku_name,sku_image,sku_no,price,total_num,use_num';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "id", "card_id", "giftcard_id", "goods_id", "sku_id", "goods_name", "sku_name", "sku_no", "price", "total_num", "use_num" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 更新提货次数
     * @return bool
     */
    public function editUseNum($card_id, $sku_id, array $data)
    {
        ( new CoreCardGoodsService() )->editUseNum($this->site_id, $card_id, $sku_id, $data);
        return true;
    }

}
