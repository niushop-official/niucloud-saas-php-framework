<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/shop_giftcard",
            "pages": [
                // *********************************** 礼品卡 ***********************************
                {
                    "path": "pages/index",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_giftcard.pages.index%"
                    }
                },
                {
                    "path": "pages/list",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.list%"
                    }
                },
                {
                    "path": "pages/detail",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.detail%"
                    }
                },
                {
                    "path": "pages/order_list",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.order_list%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/order_detail",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.order_detail%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/member",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_giftcard.pages.member%"
                    }
                },
                {
                    "path": "pages/my_card_list",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.my_card_list%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/card_bag",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.card_bag%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/activate",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_giftcard.pages.activate%"
                    }
                },
                {
                    "path": "pages/receive_list",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.receive_list%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/give_list",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.give_list%"  
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/give_detail",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.give_detail%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/give",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.give%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/receive_info",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.receive_info%"
                    }
                },
                {
                    "path": "pages/use_card",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.use_card%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/use_goods_select",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.use_goods_select%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/payment",
                    "style": {
                        "navigationBarTitleText": "%shop_giftcard.pages.payment%"
                    },
                    "needLogin": true
                }
            ]
        },
        // PAGE_END
EOT
];