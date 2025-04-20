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

namespace addon\shop_giftcard\app\service\core\giftcard;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 礼品卡设置服务层
 * Class CoreGiftcardConfigService
 * @package addon\shop_giftcard\app\service\core\giftcard
 */
class CoreGiftcardConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 礼品卡设置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setGiftcardConfig($site_id, array $data)
    {

        $value = [
            'banner' => $data[ 'banner' ] ?? '', // 顶部广告图
            'tips' => $data[ 'tips' ] ?? '',// 温馨提示
        ];

        $this->core_config_service->setConfig($site_id, 'SHOP_GIFTCARD_CONFIG', $value);
        return true;
    }

    /**
     * 获取礼品卡设置
     * @param int $site_id
     * @return array
     */
    public function getGiftcardConfig($site_id)
    {
        $data = $this->core_config_service->getConfigValue($site_id, 'SHOP_GIFTCARD_CONFIG');

        $default_tips = '1、唯一兑换凭证<br/>';
        $default_tips .= '&nbsp;&nbsp;&nbsp;&nbsp;礼品卡的卡号和密码是唯一的兑换凭，‌不记名、‌不挂失、‌不兑换现金，请务必妥善保管。‌<br/>';

        $value = [
            'banner' => $data[ 'banner' ] ?? 'addon/shop_giftcard/activate_balance.png', // 顶部广告图
            'tips' => $data[ 'tips' ] ?? $default_tips,// 温馨提示
        ];

        return $value;
    }

}
