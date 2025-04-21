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

namespace addon\shop_giftcard\app\service\api\records;


use addon\shop_giftcard\app\model\records\useRecordsGoods;
use addon\shop_giftcard\app\service\core\records\CoreUseRecordsGoodsService;
use core\base\BaseApiService;


/**
 * 礼品卡使用记录权益服务层
 * Class useRecordsGoodsService
 * @package addon\shop_giftcard\app\service\api\records
 */
class UseRecordsGoodsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new useRecordsGoods();
    }

    /**
     * 添加礼品卡使用记录权益
     * @param array $data
     * @return mixed
     */
    public function addRecordsGoods(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreUseRecordsGoodsService() )->add($data);
    }

}
