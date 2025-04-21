<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
		{
			"root": "addon/transfer",
			"pages": [{
					"path": "pages/index/index",
					"style": {
						"navigationBarTitleText": "会员资产转赠"
					},
					"needLogin": true
				},
				{
					"path": "pages/transfer/balance",
					"style": {
						"navigationBarTitleText": "余额转赠"
					},
					"needLogin": true
				},
				{
					"path": "pages/transfer/point",
					"style": {
						"navigationBarTitleText": "积分转赠"
					},
					"needLogin": true
				},
				{
					"path": "pages/transfer/commission",
					"style": {
						"navigationBarTitleText": "佣金转赠"
					},
					"needLogin": true
				},
				{
					"path": "pages/transfer/coupon",
					"style": {
						"navigationBarTitleText": "优惠券转赠"
					},
					"needLogin": true
				},
				{
					"path": "pages/duihuan/point_balance",
					"style": {
						"navigationBarTitleText": "积分转余额"
					},
					"needLogin": true
				},
				{
					"path": "pages/duihuan/commission_balance",
					"style": {
						"navigationBarTitleText": "佣金转余额"
					},
					"needLogin": true
				},
				{
					"path": "pages/duihuan/balance_point",
					"style": {
						"navigationBarTitleText": "余额转积分"
					},
					"needLogin": true
				},
				{
					"path": "pages/log/index",
					"style": {
						"navigationBarTitleText": "转赠记录"
					},
					"needLogin": true
				}
			]
		},
		// PAGE_END
EOT
];