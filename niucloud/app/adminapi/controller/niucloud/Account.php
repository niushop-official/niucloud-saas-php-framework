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

namespace app\adminapi\controller\niucloud;

use app\service\admin\niucloud\NiucloudAccountService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 官网账号（内嵌授权）
 * Class Account
 * @description 官网账号内嵌授权：生成 embed 地址、读取账号与授权信息、绑定授权、退出会话
 * @package app\adminapi\controller\niucloud
 */
class Account extends BaseAdminController
{
    /**
     * 获取官网内嵌页地址
     * @description 获取官网内嵌页地址（登录页 / 授权页）
     * @return Response
     */
    public function embedUrl()
    {
        $data = $this->request->params([
            ['mode', 'login'],
            ['origin', '']
        ]);
        return success((new NiucloudAccountService())->getEmbedUrl($data['mode'], $data['origin']));
    }

    /**
     * 获取账号与当前授权信息
     * @description 获取官网账号与当前已绑定授权信息（读取本地缓存，官网不可用时仍可展示）
     * @return Response
     */
    public function info()
    {
        return success((new NiucloudAccountService())->getAccountInfo());
    }

    /**
     * 保存官网账号登录态
     * @description 保存内嵌页登录后回传的官网登录令牌（含有效期），用于下次进入免登录
     * @return Response
     */
    public function saveToken()
    {
        $data = $this->request->params([
            ['token', ''],
            ['expires_time', 0]
        ]);
        return success('SUCCESS', (new NiucloudAccountService())->saveToken($data));
    }

    /**
     * 选用授权
     * @description 保存官网 embed 页所选授权的授权码/密钥（仅保存，不做绑定）
     * @return Response
     */
    public function select()
    {
        $data = $this->request->params([
            ['auth_code', ''],
            ['auth_secret', ''],
            ['site_address', ''],
            ['company_name', ''],
            ['product_key_name', '']
        ]);
        return success('SUCCESS', (new NiucloudAccountService())->saveSelectedAuth($data));
    }

    /**
     * 绑定授权
     * @description 接收官网 embed 页回传的授权凭据并完成绑定（复用现有授权校验链路）
     * @return Response
     */
    public function bind()
    {
        $data = $this->request->params([
            ['auth_code', ''],
            ['auth_secret', ''],
            ['site_address', ''],
            ['company_name', ''],
            ['product_key_name', '']
        ]);
        return success('SUCCESS', (new NiucloudAccountService())->bindAuthorization($data));
    }

    /**
     * 退出官网账号会话
     * @description 清除官网账号信息（不解除已绑定的本地授权）
     * @return Response
     */
    public function logout()
    {
        return success('SUCCESS', (new NiucloudAccountService())->logout());
    }

    /**
     * 同步授权状态
     * @description 读取官网授权信息并同步本地状态
     * @return Response
     */
    public function syncState()
    {
        return success((new NiucloudAccountService())->syncState());
    }
}
