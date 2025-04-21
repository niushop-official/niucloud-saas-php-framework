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

namespace addon\shop_fenxiao\app\service\core\fenxiao;

use core\base\BaseCoreService;


/**
 * 分销事件
 * Class CoreFenxiaoMemberService
 * @package addon\shop_fenxiao\app\service\core
 */
class CoreEventService extends BaseCoreService
{
//    /**
//     * 会员绑定上级分销商
//     * @param $site_id
//     * @param $fenxiao
//     * @return true
//     */
//    public static function memberBindFenxiaoAfter($site_id, $fenxiao){
//        event('MemberBindFenxiaoAfter', ['site_id' => $site_id, 'fenxiao' => $fenxiao]);
//        return true;
//    }

    /**
     * 分销商订单销售额发生变化
     * @return true
     */
    public static function fenxiaoOrderChange($site_id, $member_id, $data)
    {
        event('ShopFenxiaoOrderChangeAfter', ['site_id' => $site_id, 'member_id' => $member_id, 'data' => $data]);
        return true;
    }

    /**
     * 分销商团队订单销售额发生变化
     * @return true
     */
    public static function fenxiaoTeamOrderChange($site_id, $member_id, $data)
    {
        event('ShopFenxiaoTeamOrderChangeAfter', ['site_id' => $site_id, 'member_id' => $member_id, 'data' => $data]);
        return true;
    }

    /**
     * 分销商下级会员数量发生变化
     * @return true
     */
    public static function fenxiaoChildMemberChangeAfter($site_id, $member_id, $data)
    {
        event('ShopFenxiaoChildMemberChangeAfter', ['site_id' => $site_id, 'member_id' => $member_id, 'data' => $data]);
        return true;
    }

    /**
     * 分销商下级分销商数量发生变化
     * @return void
     */
    public static function fenxiaoChildFenxiaoChangeAfter($site_id, $member_id, $data)
    {
        event('ShopFenxiaoChildFenxiaoChangeAfter', ['site_id' => $site_id, 'member_id' => $member_id, 'data' => $data]);
        return true;
    }

    /**
     * 分销员佣金发生变化
     * @param $site_id
     * @param $member_id
     * @param $data
     * @return true
     */
    public static function fenxiaoCommissionChangeAfter($site_id, $member_id, $data)
    {
        event('ShopFenxiaoCommissionChangeAfter', ['site_id' => $site_id, 'member_id' => $member_id, 'data' => $data]);
        return true;
    }

//    /**
//     * 分销商下级数量发生变化
//     * @param $site_id
//     * @param $fenxiao
//     * @param $data
//     * @return void
//     */
//    public function fenxiaoChildChange($site_id, $fenxiao, $data){
//
//    }

//    /**
//     * 分销商新增业绩之后
//     * @param $site_id
//     * @param $fenxiao
//     * @param $data
//     * @return true
//     */
//    public static function fenxiaoOrderAfter($site_id, $member_id, $data){
//        event('ShopFenxiaoOrderAfter', ['site_id' => $site_id, 'fenxiao' => $fenxiao, 'data' => $data]);
//        return true;
//    }

    /**
     * 分销商产生退款之后
     * @param $site_id
     * @param $fenxiao
     * @param $data
     * @return true
     */
    public static function fenxiaoOrderRefundAfter($site_id, $fenxiao, $data)
    {
        event('ShopFenxiaoOrderRefundAfter', ['site_id' => $site_id, 'fenxiao' => $fenxiao, 'data' => $data]);
        return true;
    }
}
