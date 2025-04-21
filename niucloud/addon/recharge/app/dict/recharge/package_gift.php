<?php
return [
    'point' => [
        'name' => '赠送积分',
        'value' => 0,
        //用于充值编辑
        'edit_component' => '/src/addon/recharge/views/package/components/gift-points.vue',
        //用于充值详情展示
        'detail_component' => '/src/addon/recharge/views/package/components/detail-points.vue',
        'sort' => 1
    ],
    'growth' => [
        'name' => '赠送成长值',
        'value' => 0,
        //用于充值编辑
        'edit_component' => '/src/addon/recharge/views/package/components/gift-growth.vue',
        //用于充值详情展示
        'detail_component' => '/src/addon/recharge/views/package/components/detail-growth.vue',
        'sort' => 2
    ],
];
