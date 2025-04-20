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

namespace addon\shop_giftcard\app\adminapi\controller\giftcard;

use addon\shop_giftcard\app\service\admin\giftcard\ConfigService;
use core\base\BaseAdminController;


/**
 * 礼品卡设置控制器
 * Class Config
 * @package addon\shop_giftcard\app\adminapi\controller\giftcard
 */
class Config extends BaseAdminController
{

    /**
     * 获取礼品卡设置
     * @return Response
     */
    public function getGiftcardConfig()
    {
        return success(( new ConfigService() )->getGiftcardConfig());
    }

    /**
     * 设置礼品卡
     * @return Response
     */
    public function setGiftcardConfig()
    {
        $data = $this->request->params([
            [ 'banner', '' ], // 顶部广告图
            [ 'tips', '' ], // 温馨提示
        ]);

        ( new ConfigService() )->setGiftcardConfig($data);
        return success('SET_SUCCESS');
    }

}
