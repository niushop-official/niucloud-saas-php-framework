<?php

return [
    'balance' => [
        'key' => 'balance',
        'name' => '送红包', // 礼包名称
        'desc' => '发放红包', // 礼包说明
        'component' => '/src/app/views/member/components/gift-balance.vue',
        'grant' => function($site_id, $member_id, $config, $param) {
            $account_type = \app\dict\member\MemberAccountTypeDict::BALANCE;
            $service = new \app\service\core\member\CoreMemberAccountService();
            $service->addLog($site_id, $member_id, $account_type, $config['money'], $param['from_type'] ?? '', $param['memo'] ?? '', $param['related_id'] ?? '');
        },
        'content' => [
            'admin' => function($site_id, $config) {
                return "{$config['money']}元红包";
            },
            // 会员等级
            'member_level' => function($site_id, $config) {
                $content = [];
                $content[] = [
                    'text' => "{$config['money']}元",
                    'background' => '/static/resource/images/member/gift/gift_balance_bg.png'
                ];
                return $content;
            },
            // 会员签到（日签）
            'member_sign' => function($site_id, $config) {
                $content = [];
                $content[] = [
                    'text' => "{$config['money']}元",
                    'icon' => '/static/resource/images/member/sign/packet.png'
                ];
                return $content;
            },
            // 会员签到（连签）
            'member_sign_continue' => function($site_id, $config) {
                $content = [];
                $content[] = [
                    'text' => "{$config['money']}元",
                    'icon' => '/static/resource/images/member/sign/packet01.png'
                ];
                return $content;
            }
        ]
    ],
    'point' => [
        'key' => 'point',
        'name' => '送积分', // 礼包名称
        'desc' => '发放积分', // 礼包说明
        'component' => '/src/app/views/member/components/gift-point.vue',
        'grant' =>  function($site_id, $member_id, $config, $param) {
            $account_type = \app\dict\member\MemberAccountTypeDict::POINT;
            $service = new \app\service\core\member\CoreMemberAccountService();
            $service->addLog($site_id, $member_id, $account_type, $config['num'], $param['from_type'] ?? '', $param['memo'] ?? '', $param['related_id'] ?? '');
        },
        'content' => [
            'admin' => function($site_id, $config) {
                return "{$config['num']}积分";
            },
            'member_level' => function($site_id, $config) {
                $content = [];
                $content[] = [
                    'text' => "{$config['num']}积分",
                    'background' => '/static/resource/images/member/gift/gift_point_bg.png'
                ];
                return $content;
            },
            // 会员签到（日签）
            'member_sign' => function($site_id, $config) {
                $content = [];
                $content[] = [
                    'text' => "{$config['num']}积分",
                    'icon' => '/static/resource/images/member/sign/point.png'
                ];
                return $content;
            },
            // 会员签到（连签）
            'member_sign_continue' => function($site_id, $config) {
                $content = [];
                $content[] = [
                    'text' => "{$config['num']}积分",
                    'icon' => '/static/resource/images/member/sign/point01.png'
                ];
                return $content;
            }
        ]
    ]
];
