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

namespace app\dict\diy;

use core\dict\DictLoader;

/**
 * 自定义链接
 * Class LinkDict
 * @package app\dict\diy
 */
class LinkDict
{
    /**
     * 查询存在页面路由的应用插件列表 query 格式：'query' => 'addon'
     * 查询插件的链接列表，包括系统的链接 addon 格式：'addon' => 'shop'
     * @param array $params
     * @return array|null
     */
    public static function getLink($params = [])
    {
        // 查询存在页面路由的应用插件列表
        if (!empty($params[ 'query' ]) && $params[ 'query' ] == 'addon') {
            $system = [
                'app' => [
                    'title' => '系统',
                    'key' => 'app'
                ]
            ];
            $addons = ( new DictLoader("UniappLink") )->load([ 'data' => $system, 'params' => $params ]);
            $app = array_merge($system, $addons);
            return $app;
        } else {
            $system_info = [
                'title' => '系统',
                'key' => 'app'
            ];
            $system_links = [
                'SYSTEM_BASE_LINK' => [
                    'title' => '系统页面',
                    'addon_info' => $system_info,
                    'type' => 'folder', // 类型，folder 表示文件夹，link 表示链接
                    'child_list' => [
                        [
                            'name' => 'SYSTEM_LINK',
                            'title' => get_lang('dict_diy.system_link'),
                            'child_list' => [
                                [
                                    'name' => 'INDEX',
                                    'title' => get_lang('dict_diy.system_link_index'),
                                    'url' => '/app/pages/index/index',
                                    'is_share' => 1,
                                    'action' => 'decorate' // 默认空，decorate 表示支持装修
                                ],
                            ]
                        ],
                        [
                            'name' => 'MEMBER_LINK',
                            'title' => get_lang('dict_diy.member_link'),
                            'child_list' => [
                                [
                                    'name' => 'MEMBER_CENTER',
                                    'title' => get_lang('dict_diy.member_index'),
                                    'url' => '/app/pages/member/index',
                                    'is_share' => 1,
                                    'action' => 'decorate'
                                ],
                                [
                                    'name' => 'MEMBER_PERSONAL',
                                    'title' => get_lang('dict_diy.member_my_personal'),
                                    'url' => '/app/pages/member/personal',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_BALANCE',
                                    'title' => get_lang('dict_diy.member_my_balance'),
                                    'url' => '/app/pages/member/balance',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_POINT',
                                    'title' => get_lang('dict_diy.member_my_point'),
                                    'url' => '/app/pages/member/point',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_COMMISSION',
                                    'title' => get_lang('dict_diy.member_my_commission'),
                                    'url' => '/app/pages/member/commission',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_ADDRESS',
                                    'title' => get_lang('dict_diy.member_my_address'),
                                    'url' => '/app/pages/member/address',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_MY_LEVEL',
                                    'title' => get_lang('dict_diy.member_my_level'),
                                    'url' => '/app/pages/member/level',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_MY_SIGN_IN',
                                    'title' => get_lang('dict_diy.member_my_sign_in'),
                                    'url' => '/app/pages/member/sign_in',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_VERIFY_INDEX',
                                    'title' => get_lang('dict_diy.member_verify_index'),
                                    'url' => '/app/pages/verify/index',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                                [
                                    'name' => 'MEMBER_CONTACT',
                                    'title' => get_lang('dict_diy.member_contact'),
                                    'url' => '/app/pages/member/contact',
                                    'is_share' => 0,
                                    'action' => ''
                                ],
                            ]
                        ],
                        [
                            'name' => 'DIY_FORM_SELECT',
                            'title' => get_lang('dict_diy.diy_form_select'),
                            'component' => '/src/app/views/diy_form/components/form-select-content.vue'
                        ],
                    ]
                ],
                'DIY_PAGE' => [
                    'title' => get_lang('dict_diy.diy_page'),
                    'addon_info' => $system_info,
                    'child_list' => []
                ],
                'OTHER_LINK' => [
                    'title' => '其他页面',
                    'addon_info' => $system_info,
                    'type' => 'folder', // 类型，folder 表示文件夹，link 表示链接
                    'child_list' => [
                        [
                            'name' => 'DIY_LINK',
                            'title' => get_lang('dict_diy.diy_link'),
                        ],
                        [
                            'name' => 'DIY_JUMP_OTHER_APPLET',
                            'title' => get_lang('dict_diy.diy_jump_other_applet'),
                        ],
                        [
                            'name' => 'DIY_MAKE_PHONE_CALL',
                            'title' => get_lang('dict_diy.diy_make_phone_call'),
                        ]
                    ]
                ],
            ];
            return ( new DictLoader("UniappLink") )->load([ 'data' => $system_links, 'params' => $params ]);
        }
    }

}
