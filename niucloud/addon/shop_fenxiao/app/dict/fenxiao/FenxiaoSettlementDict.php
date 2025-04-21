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



class FenxiaoSettlementDict
{
    public const FENXIAO = 'fenxiao';//分销
    public const TEAM = 'team';//团队奖励
    public const AGENT = 'agent';//代理

    /**
     * 结算类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getType($type = '')
    {
        $list = [
            self::FENXIAO => get_lang('dict_shop_fenxiao_settlement_type.fenxiao'),
            self::TEAM => get_lang('dict_shop_fenxiao_settlement_type.team'),
            self::AGENT => get_lang('dict_shop_fenxiao_settlement_type.agent'),
        ];
        if ($type == '') return $list;
        return $list[$type] ?? '';
    }

}
