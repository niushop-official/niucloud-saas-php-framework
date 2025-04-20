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

namespace addon\vipcard\app\api\controller;

use addon\vipcard\app\service\api\MemberCardService;
use core\base\BaseApiController;

/**
 * 会员卡控制器
 * Class MemberCard
 * @package addon\vipcard\app\api\controller\MemberCard
 */
class MemberCard extends BaseApiController
{
    /**
     * 会员卡列表
     * @return void
     */
    public function lists() {
        return success((new MemberCardService())->getPage([]));
    }

    /**
     * 会员卡详情
     * @param $card_id
     * @return void
     */
    public function detail(int $card_id) {
        return success((new MemberCardService())->getDetail($card_id));
    }
}
