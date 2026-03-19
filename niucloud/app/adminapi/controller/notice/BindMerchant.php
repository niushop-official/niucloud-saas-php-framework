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

namespace app\adminapi\controller\notice;

use app\service\admin\notice\BindMerchantService;
use core\base\BaseAdminController;
use think\Response;

class BindMerchant extends BaseAdminController
{

    /**
     * 获取商家绑定通知账户信息
     * @description 获取商家绑定通知账户信息
     * @return Response
     */
    public function merchantBindInfo()
    {
        $res = (new BindMerchantService())->merchantBindInfo();
        return success($res);
    }

    /**
     * 接触商家绑定通知账户
     * @description 接触商家绑定通知账户
     * @return Response
     */
    public function unBindMerchant()
    {
        $data = $this->request->params([
            ['unbind_type',[]]
        ]);
        (new BindMerchantService())->unBindMerchant($data);
        return success('SUCCESS');
    }
    /**
     * 获取小程序二维码
     * @return \think\Response
     */
    public function getWeappQrcodeUrl()
    {
        $res = (new BindMerchantService())->getWeappQrcode();
        return success($res);
    }

    /**
     * 获取微信二维码地址
     * @return \think\Response
     */
    public function getWechatQrcodeUrl()
    {
        $res = (new BindMerchantService())->getWechatUrl();
        return success($res);
    }

    /**
     * 发送短信验证码
     * @return Response
     */
    public function sendBindSms()
    {
        $mobile = $this->request->param('mobile');
        $res = (new BindMerchantService())->sendBindSms($mobile);
        return success($res);
    }

    /**
     * 检测短信验证码
     * @return Response
     */
    public function checkSmsCodeAndBind()
    {
        $params = $this->request->params([
            ['mobile_key',''],
            ['mobile_code',''],
            ['mobile','']
        ]);
        $res = (new BindMerchantService())->checkMobileCode($params);
        return success('SUCCESS');
    }
}
