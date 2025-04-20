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

class FenxiaoMemberDict
{
    //是否是分销商
    const YES_FENXIAO = 1;
    //申请状态（审核通过）
    const NO_FENXIAO = 0;

    /**
     * 是否是分销商
     * @param $apply_status
     * @return array|mixed|string
     */
    public static function getIsFenxiao($is_fenxiao = ''){
        $list = [
            self::YES_FENXIAO => get_lang('dict_shop_fenxiao_member.yes'),
            self::NO_FENXIAO => get_lang('dict_shop_fenxiao_member.no'),
        ];
        if ($is_fenxiao == '') return $list;
        return $list[$is_fenxiao] ?? '';
    }

}
