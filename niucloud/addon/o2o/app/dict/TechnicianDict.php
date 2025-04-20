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

namespace addon\o2o\app\dict;

/**
 * 技师相关字典类
 * Class TechnicianDict
 */
class TechnicianDict
{
    const ON = 1;
    const OFF = 0;
    const depart = -1;

    /**
     * 获取技师状态
     */
    public static function getTechnicianStatus() {
        return [
            self::ON => get_lang('dict_o2o_technician_status.status_on'),//正常
            self::OFF => get_lang('dict_o2o_technician_status.status_off'),//休息
            self::depart => get_lang('dict_o2o_technician_status.status_depart'),//离职
        ];
    }

}