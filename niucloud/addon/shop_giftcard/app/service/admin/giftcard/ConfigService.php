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

namespace addon\shop_giftcard\app\service\admin\giftcard;


use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardConfigService;
use core\base\BaseAdminService;


/**
 * 礼品卡设置服务层
 * Class ConfigService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 礼品卡设置
     * @param array $params
     * @return bool
     */
    public function setGiftcardConfig($params)
    {
        return ( new CoreGiftcardConfigService() )->setGiftcardConfig($this->site_id, $params);
    }

    /**
     * 获取礼品卡设置
     * @return array
     */
    public function getGiftcardConfig()
    {
        return ( new CoreGiftcardConfigService() )->getGiftcardConfig($this->site_id);
    }
}
