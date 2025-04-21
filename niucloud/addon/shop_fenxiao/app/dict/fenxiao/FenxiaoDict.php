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

class FenxiaoDict
{
    //申请状态（申请中）
    //申请状态（审核通过）
    //申请状态（审核拒绝）

    //分销商状态（正常）
    const NORMAL = 1;
    //分销商状态（冻结）
    const FREEZE = -1;

    /**
     * 状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = ''){
        $list = [
            self::NORMAL => get_lang('dict_shop_fenxiao_fenxiao.normal'),
            self::FREEZE => get_lang('dict_shop_fenxiao_fenxiao.freeze'),
        ];
        if ($status == '') return $list;
        return $list[$status] ?? '';
    }
}
