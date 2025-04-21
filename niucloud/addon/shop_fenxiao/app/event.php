<?php

return [
    'bind' => [

    ],
    'listen' => [
        //会员注册事件， 检测会员成为分销商条件，以及会员分销商绑定
        'MemberRegister' => ['addon\shop_fenxiao\app\listener\member\MemberRegisterListener'],
        //商城订单事件
        //订单创建后
        'AfterShopOrderCreate' => [ 'addon\shop_fenxiao\app\listener\order\AfterShopOrderCreate' ],
        //订单支付后, 计算佣金
        'ShopOrderPay' => [ 'addon\shop_fenxiao\app\listener\order\AfterShopOrderPay' ],
        //订单收货后, 结算佣金
        'AfterShopOrderFinish' => [ 'addon\shop_fenxiao\app\listener\order\AfterShopOrderFinish' ],
        //订单退款后, 重新计算佣金
        'AfterShopOrderRefundFinish' => [ 'addon\shop_fenxiao\app\listener\refund\AfterShopOrderRefundFinish' ],
        //协议类型加载
        'AgreementType' => [ 'addon\shop_fenxiao\app\listener\AgreementType' ],
        //站点创建后增加分销默认等级
        'AddSiteAfter' => ['addon\shop_fenxiao\app\listener\AddSiteAfterListener'],
//        //会员绑定上级分销商事件
//        'MemberBindFenxiaoAfter' => ['addon\shop_fenxiao\app\listener\member\MemberBindFenxiaoAfter'],
//        //分销商更换上级事件
//        'ShopFenxiaoParentChangeAfter' => ['addon\shop_fenxiao\app\listener\fenxiao\ShopFenxiaoParentChangeAfter'],
        /**********************************************    订单业绩相关    ***********************************************/
        //分销商产生订单业绩事件
        'ShopFenxiaoOrderAfter' => ['addon\shop_fenxiao\app\listener\fenxiao\ShopFenxiaoOrderAfter'],
        //分销商产生订单退款事件
        'ShopFenxiaoOrderRefundAfter' => ['addon\shop_fenxiao\app\listener\fenxiao\ShopFenxiaoOrderRefundAfter'],

        /**********************************************    分销商属性变化事件相关    ***********************************************/
        //下级分销商发生变化
        'ShopFenxiaoChildFenxiaoChangeAfter' => ['addon\shop_fenxiao\app\listener\change\ShopFenxiaoChildFenxiaoChangeAfter'],
        //下级会员发生变化
        'ShopFenxiaoChildMemberChangeAfter' => ['addon\shop_fenxiao\app\listener\change\ShopFenxiaoChildMemberChangeAfter'],
        //分销商业绩发生变化
        'ShopFenxiaoOrderChangeAfter' => ['addon\shop_fenxiao\app\listener\change\ShopFenxiaoOrderChangeAfter'],
        //分销商团队业绩发生变化
        'ShopFenxiaoTeamOrderChangeAfter' => ['addon\shop_fenxiao\app\listener\change\ShopFenxiaoTeamOrderChangeAfter'],
        //分销商佣金发生变化
        'ShopFenxiaoCommissionChangeAfter' => ['addon\shop_fenxiao\app\listener\change\ShopFenxiaoCommissionChangeAfter'],

        //获取海报数据
        'GetPosterType' => ['addon\shop_fenxiao\app\listener\poster\ShopFenxiaoPosterType'],
        'GetPosterData' => ['addon\shop_fenxiao\app\listener\poster\ShopFenxiaoPoster'],

        //主题色
        'ThemeColor' => [ 'addon\shop_fenxiao\app\listener\diy\ThemeColorListener' ],
    ],
    'subscribe' => [
    ],
];
