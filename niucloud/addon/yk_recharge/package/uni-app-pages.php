<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
				{
					"path": "yk_recharge/pages/recharge",
					"style": {
						"navigationBarTitleText": "%yk_recharge.pages.recharge%"
					},
					"needLogin": true
				},
				{
					"path": "yk_recharge/pages/recharge_record",
					"style": {
						"navigationBarTitleText": "%yk_recharge.pages.recharge_record%"
					},
					"needLogin": true
				},
				{
					"path": "yk_recharge/pages/recharge_record_detail",
					"style": {
						"navigationBarTitleText": "%yk_recharge.pages.recharge_record_detail%"
					},
					"needLogin": true
				},
				{
					"path": "yk_recharge/pages/balance",
					"style": {
						"navigationBarTitleText": "%yk_recharge.pages.balance%"
					},
					"needLogin": true
				},
				// PAGE_END
EOT
];