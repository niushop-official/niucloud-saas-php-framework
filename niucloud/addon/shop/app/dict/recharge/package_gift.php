<?php
return [
    'coupon' => [
        'name' => '赠送优惠券',
        'value' => [],
        //用于充值编辑
        'edit_component'=>'/src/addon/shop/views/member/components/recharge-gift-coupon.vue',
        //用于充值详情展示
        'detail_component' => '/src/addon/shop/views/member/components/recharge-detail-coupon.vue',
        'sort' => 3
    ],
];
