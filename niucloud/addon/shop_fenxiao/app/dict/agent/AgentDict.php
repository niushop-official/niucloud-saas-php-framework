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

namespace addon\shop_fenxiao\app\dict\agent;

class AgentDict
{
    //代理商状态（正常）
    const NORMAL = 1;
    //代理商状态（失效）
    const INVALID = 2;

    /**
     * 状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = ''){
        $list = [
            self::NORMAL => get_lang('dict_shop_fenxiao_agent.normal'),
            self::INVALID => get_lang('dict_shop_fenxiao_agent.invalid'),
        ];
        if (!$status) return $list;
        return $list[$status] ?? '';
    }
}
