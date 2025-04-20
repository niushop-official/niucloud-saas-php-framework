<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
                // *********************************** qiankun_vip_card ***********************************
                {
                    "root": "addon/qiankun_vip_card",
                    "pages": [
                        {
                            "path": "pages/index/index",
                            "style": {
                                "navigationBarTitleText": "%qiankun_vip_card.pages.index.index%",
						        "needLogin": true
                            }
                        }
                    ]
				},
                // PAGE_END
EOT
];