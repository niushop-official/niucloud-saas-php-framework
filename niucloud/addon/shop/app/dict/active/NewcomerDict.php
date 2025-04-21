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

namespace addon\shop\app\dict\active;

class NewcomerDict
{
    //参与方式
    const NEVER_ORDER = 'never_order';//从未下过单的会员
    const ASSIGN_TIME_ORDER = 'assign_time_order';//指定时间内未下过单会员
    const ASSIGN_TIME_REGISTER = 'assign_time_register';//指定时间内注册的会员

    //有效期
    const DAY = 'day';  // N天有效
    const DATE = 'date';  // 指定过期日期

}
