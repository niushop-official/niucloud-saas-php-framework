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
namespace app\dict\member;

/**
 * 会员等级样式枚举类
 * Class MemberDict
 */
class MemberLevelDict
{
    /**
     * 样式
     * @return array
     */
    public static function getStyle()
    {

        return [
//            'level_1' => [
//                'bg_color' => '#414852',
//                'level_color' => '#666666',
//                'progress' => ['#999999','#666666'],
//                'gift'=> '#ECEBEB',
//            ],
            'level_1' => [
                'bg_color' => '#354B54',
                'level_color' => '#116787',
                'progress' => ['#4BA5C7','#116787'],
                'gift'=> '#F1FDFF',
            ],
            'level_2' => [
                'bg_color' => '#203B54',
                'level_color' => '#286BAA',
                'progress' => ['#529BDF','#286BAA'],
                'gift'=> '#E3F2FF',
            ],
            'level_3' => [
                'bg_color' => '#403E32',
                'level_color' => '#967600',
                'progress' => ['#D1A400','#967600'],
                'gift'=> '#FFFAE3',
            ],
            'level_4' => [
                'bg_color' => '#36354B',
                'level_color' => '#4B3EF9',
                'progress' => ['#8F87FF','#4B3EF9'],
                'gift'=> '#E7EEFF',
            ],
            'level_5' => [
                'bg_color' => '#362F28',
                'level_color' => '#9F5300',
                'progress' => ['#EFA244','#9F5300'],
                'gift'=> '#FFF5DC',
            ],
            'level_6' => [
                'bg_color' => '#322432',
                'level_color' => '#DE43D6',
                'progress' => ['#FFA0FA','#DE43D6'],
                'gift'=> '#FFEAFF',
            ],
            'level_7' => [
                'bg_color' => '#301C1E',
                'level_color' => '#DE000B',
                'progress' => ['#FF8B36','#DE000B'],
                'gift'=> '#FFE3E6',
            ],
        ];
    }
}