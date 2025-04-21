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

namespace app\adminapi\controller\wxoplatform;

use app\service\admin\wxoplatform\OplatformConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取微信开放平台开放平台配置信息
     * @return Response
     */
    public function get()
    {
        return success((new OplatformConfigService())->getConfig());
    }

    /**
     * 设置微信开放平台配置信息
     * @return Response
     */
    public function set()
    {
        $data = $this->request->params([
            ['app_id', ''],
            ['app_secret', ''],
            ['token', ''],
            ['aes_key', ''],
            ['develop_app_id', ''],
            ['develop_upload_private_key', '']
        ]);
        (new OplatformConfigService())->setConfig($data);
        return success('SET_SUCCESS');
    }

    /**
     * 获取微信开放平台静态资源
     * @return Response
     */
    public function static()
    {
        return success((new OplatformConfigService())->getStaticInfo());
    }

}
