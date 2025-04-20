<?php

use addon\tk_vip\app\service\core\MemberService;
use addon\tk_vip\app\service\core\SendService;
use app\model\member\MemberLevel;

return [
    'tk_vip_send_gift' => [
        'key' => 'tk_vip_send_gift',
        'name' => '会员等级', // 礼包名称
        'desc' => '奖励会员等级', // 礼包说明
        'component' => '/src/addon/tk_vip/views/member/gift-send-vip.vue',
        // 礼包发放调用方法
        'grant' => function($site_id, $member_id, $config) {
            (new MemberService())->changeVip($site_id,$member_id,$config['level_id'],$config['day'],'sign');
        },
        "content" => [
            // 管理端
            'admin' => function($site_id, $config) {
                $level_info=(new MemberLevel())->where(['site_id'=>$site_id,'level_id'=>$config['level_id']])->findOrEmpty();
                $day=$config['day']==0?'永久':$config['day'].'天';
                return '奖励会员等级'.$level_info['level_name'].'，有效期'.$day;
            },
            // 会员等级
//            'member_level' => function($site_id, $config) {
//                $level_info=(new MemberLevel())->where(['site_id'=>$site_id,'level_id'=>$config['level_id']])->findOrEmpty();
//
//                $content[] = [
//                    'text' => '升级到'. $level_info['level_name'],
//                    'icon' => '/addon/shop/sign/coupon.png'
//                ];
//                return $content;
//            },
            // 会员签到（日签）
            'member_sign' => function($site_id, $config) {

                $level_info=(new MemberLevel())->where(['site_id'=>$site_id,'level_id'=>$config['level_id']])->findOrEmpty();

                $content[] = [
                            'text' => '升级到'. $level_info['level_name'],
                            'icon' => '/addon/tk_vip/rule/vipbuy.png'
                        ];
                return $content;
            },
            // 会员签到（连签）
            'member_sign_continue' => function($site_id, $config) {
                $level_info=(new MemberLevel())->where(['site_id'=>$site_id,'level_id'=>$config['level_id']])->findOrEmpty();

                $content[] = [
                    'text' => '升级到'. $level_info['level_name'],
                    'icon' => '/addon/tk_vip/rule/vipbuy.png'
                ];
                return $content;
            }
        ]
    ],
    'tk_vip_send_commission' => [
        'key' => 'tk_vip_send_commission',
        'name' => '送佣金', // 礼包名称
        'desc' => '奖励会员佣金', // 礼包说明
        'component' => '/src/addon/tk_vip/views/member/gift-send-commission.vue',
        // 礼包发放调用方法
        'grant' => function($site_id, $member_id, $config) {
            (new SendService())->sendCommission($site_id,$member_id,$config['commission']);
        },
        "content" => [
            // 管理端
            'admin' => function($site_id, $config) {

                return '奖励会员佣金'.$config['commission'].'元';
            },
            // 会员等级
            'member_level' => function($site_id, $config) {
                $content[] = [
                    'text' => '奖励会员佣金'.$config['commission'].'元',
                    'icon' => '/addon/tk_vip/rule/vipbuy.png'
                ];
                return $content;
            },
            // 会员签到（日签）
            'member_sign' => function($site_id, $config) {
                $content[] = [
                    'text' => '奖励会员佣金'.$config['commission'].'元',
                    'icon' => '/addon/tk_vip/rule/vipbuy.png'
                ];
                return $content;
            },
            // 会员签到（连签）
            'member_sign_continue' => function($site_id, $config) {
                 $content[] = [
                    'text' => '奖励会员佣金'.$config['commission'].'元',
                    'icon' => '/addon/tk_vip/rule/vipbuy.png'
                ];
                return $content;
            }
        ]
    ]
];
