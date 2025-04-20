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

namespace addon\transfer\app\service\api;

use addon\transfer\app\model\log\Log;
use app\model\member\Member;
use app\service\core\site\CoreSiteService;
use core\base\BaseAdminService;
use app\service\core\notice\CoreSmsService;
use core\exception\CommonException;
use addon\transfer\app\service\core\ConfigService;


class IndexService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getconfig()
    {
        $config = (new ConfigService())->getConfig( $this->site_id);

        return $config;
    }

    public function aa()
    {
        $post = input('');
        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId(request()->siteId());
        echo json_encode(['code' => 1, 'msg' => '操作成功']);die;
    }


    public function edit(int $id, array $data)
    {

        $member = (new Member())->where('member_id', $data[ 'member_id' ])->findOrEmpty()->toArray();
        if(empty($mobile)){
            throw new CommonException('请先登录');
        }
        $mobile = $member['mobile']??'';
        if(empty($mobile)){
            throw new CommonException('未绑定手机号');
        }

//        $core_sms_service = new CoreSmsService();

//        $core_sms_service->send( $this->site_id, $mobile, $vars, $key, $sms_id, $content);


        return true;
    }


}
