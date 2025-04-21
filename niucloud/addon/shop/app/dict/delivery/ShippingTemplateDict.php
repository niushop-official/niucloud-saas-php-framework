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

namespace addon\shop\app\dict\delivery;

class ShippingTemplateDict
{
    const WEIGHT = 'weight';

    const NUM = 'num';

    const VOLUME = 'volume';

    /**
     * 获取运费模板计费类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getFeeType($type = ''){
        $type_list = [
            self::NUM => get_lang('dict_shop_delivery.num'),
            self::WEIGHT => get_lang('dict_shop_delivery.weight'),
            self::VOLUME => get_lang('dict_shop_delivery.volume')
        ];
        if ($type == '') return $type_list;
        return $type_list[$type] ?? '';
    }
}
