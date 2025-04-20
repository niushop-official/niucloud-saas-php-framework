<?php
return [
    'pages' => <<<EOT
            // PAGE_BEGIN

                // *********************************** 链动2+1页面 ***********************************
                {
                    "root": "addon/ly_lian",
                    "pages": [
                        {
                            "path": "pages/index",
                            "style": {
                                // #ifndef H5
                                "navigationStyle": "custom",
                                // #endif
                                "navigationBarTitleText": "%ly_lian.pages.index%"
                            },
                            "needLogin": true   // 需要登录才能访问的页面，需要设置为true
                        },
                        {
                            "path": "pages/sale",
                            "style": {
                                // #ifndef H5
                                "navigationStyle": "custom",
                                // #endif
                                "navigationBarTitleText": "%ly_lian.pages.sale%"
                            },
                            "needLogin": true   
                        },
                        {
                            "path": "pages/team",
                            "style": {
                                // #ifndef H5
                                "navigationStyle": "custom",
                                // #endif
                                "navigationBarTitleText": "%ly_lian.pages.team%"
                            },
                            "needLogin": true   
                        },
                    ]
                },

                


                // PAGE_END
EOT
];
