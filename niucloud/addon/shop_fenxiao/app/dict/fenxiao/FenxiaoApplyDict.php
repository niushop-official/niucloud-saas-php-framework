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

namespace addon\shop_fenxiao\app\dict\fenxiao;



class FenxiaoApplyDict
{
    public const WAIT_AUDIT = 1;//待审核
    public const AUDIT = 2;//已通过
    public const REFUSE = 3;//已拒绝

    /**
     * 申请状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = '')
    {
        $list = [
            self::WAIT_AUDIT => get_lang('dict_shop_fenxiao_fenxiao_apply.wait_audit'),
            self::AUDIT => get_lang('dict_shop_fenxiao_fenxiao_apply.audit'),
            self::REFUSE => get_lang('dict_shop_fenxiao_fenxiao_apply.refuse'),
        ];
        if ($status == '') return $list;
        return $list[$status] ?? '';
    }
}
