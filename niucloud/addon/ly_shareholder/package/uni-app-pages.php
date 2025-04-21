<?php
return [
    'pages' => <<<EOT
                // PAGE_BEGIN

                // *********************************** 股东合伙人页面 ***********************************
                {
                    "root": "addon/ly_shareholder",
                    "pages": [
                        {
                            "path": "pages/index",
                            "style": {
                                // #ifdef H5
                                "navigationStyle": "custom",
                                // #endif
                                "navigationBarTitleText": "%ly_shareholder.pages.index%"
                            },
                            "needLogin": true
                        },
                        {
                            "path": "pages/share_level",
                            "style": {
                                // #ifdef H5
                                "navigationStyle": "custom",
                                // #endif
                                "navigationBarTitleText": "%ly_shareholder.pages.share_level%"
                            },
                            "needLogin": true
                        }
                    ]
                    
                },
                // PAGE_END
EOT
];
