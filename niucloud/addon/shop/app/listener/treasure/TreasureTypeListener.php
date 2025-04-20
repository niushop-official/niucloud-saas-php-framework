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

namespace addon\shop\app\listener\treasure;

/**
 * 宝贝类型查询
 * Class TreasureTypeListener
 * @package addon\shop\app\listener\treasure
 */
class TreasureTypeListener
{

    public function handle()
    {
        return [
            'shop' => '商品'
        ];
    }
}