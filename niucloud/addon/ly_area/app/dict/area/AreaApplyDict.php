<?php

namespace addon\ly_area\app\dict\area;



class AreaApplyDict
{
    public const WAIT_AUDIT = 0;//待审核
    public const AUDIT = 1;//已通过
    public const REFUSE = 2;//已拒绝

    /**
     * 申请状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = '')
    {
        $list = [
            self::WAIT_AUDIT => get_lang('dict_ly_area_area_apply.wait_audit'),
            self::AUDIT => get_lang('dict_ly_area_area_apply.audit'),
            self::REFUSE => get_lang('dict_ly_area_area_apply.refuse'),
        ];
        if ($status == '') return $list;
        return $list[$status] ?? '';
    }
}
