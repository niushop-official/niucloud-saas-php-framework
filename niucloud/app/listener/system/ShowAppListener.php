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

namespace app\listener\system;

/**
 * 查询应用列表
 * Class ShowAppListener
 * @package app\listener\system
 */
class ShowAppListener
{
    public function handle()
    {
        // 应用：app、addon 待定
        // 营销：promotion
        // 工具：tool
        return [
            // 应用
            'app' => [

            ],
            // 工具
            'tool' => [
                [
                    'title' => '万能表单',
                    'desc' => '适用于各种应用场景，满足多样化的业务需求',
                    'icon' => 'static/resource/images/diy_form/icon.png',
                    'key' => 'diy_form',
                    'url' => '/diy_form/list',
                ],
//                [
//                    'title' => '万能a表单',
//                    'desc' => '万能a表单',
//                    'icon' => 'static/resource/images/diy_form/icon.png',
//                    'key' => 'diy_faorm',
//                    'url' => '/diy_faorm/list',
//                ]
            ],
            // 营销
            'promotion' => [

            ]
        ];
    }
}
