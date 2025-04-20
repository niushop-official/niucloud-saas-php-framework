<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
		{
			"root": "addon/huodong",
			"pages": [{
					"path": "pages/index/index",
					"style": {
						"navigationBarTitleText": "%huodong.pages.index.index%"
					}
				},
				{
					"path": "pages/act/detail",
					"style": {
						"navigationBarTitleText": "%huodong.pages.act.detail%"

					},
					"needLogin": false
				},
				{
					"path": "pages/act/form",
					"style": {
						"navigationBarTitleText": "%huodong.pages.act.form%"
					},
					"needLogin": false
				},
				{
					"path": "pages/order/list",
					"style": {
						"navigationBarTitleText": "%huodong.pages.order.list%"

					},
					"needLogin": true
				},
				{
					"path": "pages/order/hexiao",
					"style": {
						"navigationBarTitleText": "%huodong.pages.order.hexiao%"

					},
					"needLogin": false
				},
				{
					"path": "pages/order/detail",
					"style": {
						"navigationBarTitleText": "%huodong.pages.order.detail%"
					},
					"needLogin": false
				},
				{
					"path": "pages/index/rank",
					"style": {
						"navigationBarTitleText": "排行榜",
						"navigationBarBackgroundColor": "#2886ff",
						"navigationBarTextStyle": "white"

					},
					"needLogin": false
				},
				{
					"path": "pages/admin/mingdan",
					"style": {
						"navigationBarTitleText": "报名名单"
					},
					"needLogin": false
				},
				{
					"path": "pages/act/rank",
					"style": {
						"navigationBarTitleText": "活动排行榜"
					},
					"needLogin": true
				},
				{
					"path": "pages/fenxiao/apply",
					"style": {
						"navigationBarTitleText": "成为推广员"
					},
					"needLogin": true
				},
				{
					"path": "pages/fenxiao/index",
					"style": {
						"navigationBarTitleText": "推广员主页"
					},
					"needLogin": true
				}
			]
		},
		// PAGE_END
EOT
];