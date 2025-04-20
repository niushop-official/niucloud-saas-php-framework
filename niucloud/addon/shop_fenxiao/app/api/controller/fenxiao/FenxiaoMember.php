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

namespace addon\shop_fenxiao\app\api\controller\fenxiao;

use addon\shop_fenxiao\app\service\api\fenxiao\FenxiaoMemberService;
use core\base\BaseApiController;

class FenxiaoMember extends BaseApiController
{
    /**
     * 获取申请分销信息
     * @return array
     */
    public function info()
    {
        return success((new FenxiaoMemberService())->getInfo());
    }
}
