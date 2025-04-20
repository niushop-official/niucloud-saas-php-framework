<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/qiankun_recharge", 
            "pages": [
				{
                    "path": "pages/recharge/recharge",
                    "style": {
                        "navigationBarTitleText": "充值",
                        "enablePullDownRefresh": false
                    }
                }
			]
        },
// PAGE_END
EOT
];