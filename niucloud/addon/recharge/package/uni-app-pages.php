<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/recharge",
            "pages": [{
                    "path": "pages/recharge",
                    "style": {
                        "navigationBarTitleText": "%recharge.pages.recharge%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/recharge_record",
                    "style": {
                        "navigationBarTitleText": "%recharge.pages.recharge_record%"
                    },
                    "needLogin": true
                },
                {
                    "path": "pages/recharge_record_detail",
                    "style": {
                        "navigationBarTitleText": "%recharge.pages.recharge_record_detail%"
                    },
                    "needLogin": true
                }
            ]
        },
        // PAGE_END
EOT
];