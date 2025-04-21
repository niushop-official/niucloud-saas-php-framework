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

namespace addon\vipcard\app\adminapi\controller\goods;

use addon\vipcard\app\dict\MemberCardDict;
use core\base\BaseAdminController;
use addon\vipcard\app\service\admin\goods\MemberCardService;


/**
 * 会员领取记录
 * Class Service
 * @package addon\vipcard\app\adminapi\controller\goods
 */
class MemberCard extends BaseAdminController
{

    /**
     * 服务领取记录列表
     * @return \think\Response
     */
    public function servicePage()
    {
        $data = $this->request->params([
            ["create_time",""],
            ["order_no",""],
            ["goods_id", ""],
            ["status", ""]
        ]);
        return success((new MemberCardService())->getServicePage($data));
    }

    /**
     * 服务领取记录详情
     * @param int $id
     * @return \think\Response
     */
    public function serviceInfo(int $id){
        return success((new MemberCardService())->getServiceInfo($id));
    }

    /**
     * 卡项领取记录列表
     * @return \think\Response
     */
    public function cardPage()
    {
        $data = $this->request->params([
            ["card_type",""],
            ["create_time",""],
            ["goods_id", ""],
            ["order_no", ""],
            ["status", ""]
        ]);
        return success((new MemberCardService())->getCardPage($data));
    }

    /**
     * 卡项领取记录详情
     * @param int $id
     * @return \think\Response
     */
    public function cardInfo(int $id){
        return success((new MemberCardService())->getCardInfo($id));
    }

    /**
     * 获取领取记录状态
     */
    public function getStatus(){
        return success(MemberCardDict::getStatus());
    }
}
