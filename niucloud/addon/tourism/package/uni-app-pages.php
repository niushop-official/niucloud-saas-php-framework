<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/tourism",
            "pages": [
                // *********************************** 旅游 ***********************************
                {
                    "path": "pages/index",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%tourism.pages.index%"
                    }
                },
                {
                    "path": "pages/way/list",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.way.list%"
                    }
                },
                {
                    "path": "pages/way/detail",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.way.detail%"
                    }
                },
                {
                    "path": "pages/way/order",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.way.order%"
                    }
                },
                {
                    "path": "pages/hotel/list",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.hotel.list%"
                    }
                },
                {
                    "path": "pages/hotel/detail",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.hotel.detail%"
                    }
                },
                {
                    "path": "pages/hotel/order",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.hotel.order%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/scenic/list",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.scenic.list%"
                    }
                },
                {
                    "path": "pages/scenic/detail",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.scenic.detail%"
                    }
                },
                {
                    "path": "pages/scenic/order",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.scenic.order%"
                    }
                },
                {
                    "path": "pages/member/index",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.member.index%"
                    }
                },
                {
                    "path": "pages/order/list",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.order.list%"
                    }
                },
                {
                    "path": "pages/order/detail",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.order.detail%"
                    }
                },
                {
                    "path": "pages/order/hotel_detail",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.order.hotel_detail%"
                    }
                },
                {
                    "path": "pages/verify/index",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.verify.index%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/verify/record",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.verify.record%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/verify/detail",
                    "style": {
                        "navigationBarTitleText": "%tourism.pages.verify.detail%"
                    },
                    "needLogin": true
                }
            ]
        },
        // PAGE_END
EOT
];