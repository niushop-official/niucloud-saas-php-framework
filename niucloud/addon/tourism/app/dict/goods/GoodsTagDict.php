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
 * 线路标签
 * Class TagDict
 * @package addon\tourism\app\dict\way
 */
class GoodsTagDict
{
    ///上架
    const UP = 1;
    //下架
    const DOWN = 0;

    /**
     * 状态
     */
    public static function getStatus($status = ''){
        $data = [
            self::UP => [
                "status" => self::UP,
                "name"   => "已上架"
            ],
            self::DOWN => [
                "status" => self::DOWN,
                "name"   => "已下架"
            ],
        ];
        return $data;
    }
}