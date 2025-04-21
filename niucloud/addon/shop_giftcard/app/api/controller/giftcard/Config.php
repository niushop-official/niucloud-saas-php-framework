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

namespace addon\shop_giftcard\app\api\controller\giftcard;

use addon\shop_giftcard\app\service\admin\giftcard\ConfigService;
use core\base\BaseApiController;


/**
 * 礼品卡设置控制器
 * Class Config
 * @package addon\shop_giftcard\app\api\controller\giftcard
 */
class Config extends BaseApiController
{

    /**
     * 获取礼品卡设置
     * @return Response
     */
    public function getGiftcardConfig()
    {
        return success(( new ConfigService() )->getGiftcardConfig());
    }

}
