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

namespace app\api\controller\member;

use app\service\api\member\MemberSignService;
use core\base\BaseApiController;
use think\Response;

class MemberSign extends BaseApiController
{

    /**
     * 会员签到记录
     * @return Response
     */
    public function lists()
    {
        return success(( new MemberSignService() )->getPage());
    }

    /**
     * 签到详情
     * @return Response
     */
    public function info($sign_id)
    {
        return success(( new MemberSignService() )->getInfo($sign_id));
    }

    /**
     * 会员签到
     * @return Response
     */
    public function sign()
    {
        return success(( new MemberSignService() )->sign());
    }

    /**
     * 获取月签到数据
     * @param $year
     * @param $month
     * @return Response
     */
    public function signInfo($year, $month)
    {
        return success(( new MemberSignService() )->getSignInfo($year, $month));
    }

    /**
     * 获取日签到奖励
     * @param $year
     * @param $month
     * @param $day
     * @return Response
     */
    public function getDayAward($year, $month, $day)
    {
        return success(( new MemberSignService() )->getDayAward($year, $month, $day));
    }

    /**
     * 获取签到设置
     * @return Response
     */
    public function signConfig()
    {
        return success(( new MemberSignService() )->getSignConfig());
    }

}
