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

namespace addon\tourism\app\dict\goods;

/**
 * 商品
 */
class GoodsDict
{

    const ROOM = 'room';
    const WAY = 'way';
    const SCENIC = 'scenic';

    /**
     * 状态
     */
    public static function getType($type = ''){
        $data = [
            self::ROOM => '酒店',
            self::WAY => '路线',
            self::SCENIC => '景点',

        ];
        if($type) return $data[$type] ?? '';
        return $data;
    }
}