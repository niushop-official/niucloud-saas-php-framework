<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/shop_fenxiao",
            "pages": [
                // *********************************** 商城分销 ***********************************
                {
                    "path": "pages/index",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.index%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/zone",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.zone%"
                    }
                },
                {
                    "path": "pages/level",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.level%",
                        "usingComponents": {
                            "ns-goods-recommend": "../../../../addon/shop/components/ns-goods-recommend/ns-goods-recommend"
                        },
                        "componentPlaceholder": {
                            "ns-goods-recommend": "view"
                        }
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/child_fenxiao",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.child_fenxiao%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/goods",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.goods%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/team",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.team%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/agent_list",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.agent_list%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/team_dividend",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.team_dividend%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/order",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.order%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/apply",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.apply%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/task_rewards",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.task_rewards%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/task_detail",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.task_detail%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/task_rewards_detail",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.task_rewards_detail%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/sale",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%shop_fenxiao.pages.sale%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/sale_detail",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.sale_detail%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/sale_ranking",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.sale_ranking%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/promote",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.promote%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/promote_code",
                    "style": {
                        "navigationBarTitleText": "%shop_fenxiao.pages.promote_code%"
                    }
                }
            ]
        },
        // PAGE_END
EOT
];