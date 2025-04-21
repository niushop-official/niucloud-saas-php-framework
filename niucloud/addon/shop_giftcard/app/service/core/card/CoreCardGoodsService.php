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

namespace addon\shop_giftcard\app\service\core\card;

use addon\shop_giftcard\app\model\card\CardGoods;
use core\base\BaseCoreService;


/**
 * 礼品卡获取权益服务层
 * Class CoreCardGoodsService
 * @package addon\shop_giftcard\app\service\core\card
 */
class CoreCardGoodsService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new CardGoods();
    }

    /**
     * 更新提货次数
     * @return bool
     */
    public function editUseNum($site_id, $card_id, $sku_id, array $data)
    {
        $this->model->where([ [ 'site_id', '=', $site_id ], [ 'card_id', "=", $card_id ], [ 'sku_id', "=", $sku_id ] ])->inc('use_num', $data[ 'use_num' ])->update();
        return true;
    }

    /**
     * 累减提货次数
     * @return bool
     */
    public function decUseNum($site_id, $card_id, $sku_id, array $data)
    {
        $this->model->where([ [ 'site_id', '=', $site_id ], [ 'card_id', "=", $card_id ], [ 'sku_id', "=", $sku_id ] ])->dec('use_num', $data[ 'use_num' ])->update();
        return true;
    }

}
