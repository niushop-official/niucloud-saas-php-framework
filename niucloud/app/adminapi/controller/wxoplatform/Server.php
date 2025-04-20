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

use app\service\admin\wxoplatform\OplatformServerService;
use core\base\BaseAdminController;
use think\Response;

class Server extends BaseAdminController
{
    /**
     * 微信开放平台授权事件接收
     * @return Response
     */
    public function server()
    {
        ob_clean();
        $result = (new OplatformServerService())->server();
        return response($result->getBody())->header([
            'Content-Type' => 'text/plain;charset=utf-8'
        ]);
    }

    /**
     * 微信开放平台消息与事件接收
     * @param string $appid
     * @return Response
     */
    public function message(string $appid) {
        ob_clean();
        $result = (new OplatformServerService())->message($appid);
        return response($result->getBody())->header([
            'Content-Type' => 'text/plain;charset=utf-8'
        ]);
    }

}
