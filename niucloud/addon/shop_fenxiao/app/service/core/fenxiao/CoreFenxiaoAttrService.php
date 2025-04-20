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

use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use core\base\BaseCoreService;


/**
 * 分销商属性发生变化
 */
class CoreFenxiaoAttrService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Fenxiao();
    }

    public static function memberBindFenxiao($site_id, $member_id)
    {
        //上级分销商累加推广人数
        (new CoreFenxiaoDataService())->childMemberNumInc($site_id, $member_id);
        return true;
    }

    public static function memberBecomeFenxiao($site_id, $member_id)
    {
        //上级分销商累加分销商下级人数
        (new CoreFenxiaoDataService())->childFenxiaoNumOnlyInc($site_id, $member_id);
        return true;
    }

    /**
     * 修改会员所绑定的分销商
     * @param $site_id
     * @param $from_member_id
     * @param $to_member_id
     * @return true
     */
    public static function modifyMemberBindFenxiao($site_id, $from_member_id, $to_member_id)
    {
        //上级分销商累加推广人数
        (new CoreFenxiaoDataService())->childMemberNumDec($site_id, $from_member_id);
        //上级分销商累加推广人数
        (new CoreFenxiaoDataService())->childMemberNumInc($site_id, $to_member_id);
        return true;
    }

    /**
     * 分销商上级发生变化
     * @param $site_id
     * @param $from_parent
     * @param $to_parent
     * @return true
     */
    public static function fenxiaoParentChange($site_id, $from_parent, $to_parent)
    {
        //减去原分销商上级的分销商下级人数
        $fenxiao_data = new CoreFenxiaoDataService();
        $fenxiao_data->childFenxiaoNumDec($site_id, $from_parent);

        //增加新分销商上级的分销商下级人数
        $fenxiao_data->childFenxiaoNumInc($site_id, $to_parent);
        return true;
    }
}
