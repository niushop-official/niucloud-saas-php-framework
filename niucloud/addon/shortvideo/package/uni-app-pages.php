<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
		{
			"root": "addon/shortvideo",
			"pages": [{
				"path": "pages/index",
				"style": {
					"navigationBarTitleText": "",
					"navigationStyle": "custom",
					// "disableScroll": true,
					// "mp-toutiao": {
					// 	"navigationStyle": "default"
					// },
					// "mp-alipay": {
					// 	"transparentTitle": "always",
					// 	"titlePenetrate": "YES"
					// },
					"titleNView": false
				},
				"needLogin": true
			}, {
				"path": "pages/add",
				"style": {
					"navigationBarTitleText": "发布",
					"navigationBarBackgroundColor": "#000000",
					"navigationBarTextStyle": "white",
					"navigationStyle": "default"
				},
				"needLogin": true
			}, {
				"path": "pages/list",
				"style": {
					"navigationBarTitleText": "逛一逛",
					"navigationBarBackgroundColor": "#ffffff",
					"navigationBarTextStyle": "black",
					"navigationStyle": "default"
				},
				"needLogin": true
			}, {
				"path": "pages/search",
				"style": {
					"navigationBarTitleText": "搜索",
					"navigationBarBackgroundColor": "#ffffff",
					"navigationBarTextStyle": "black",
					"navigationStyle": "default"
				},
				"needLogin": true
			}, {
				"path": "pages/my",
				"style": {
					"navigationBarTitleText": "我的",
					"navigationBarBackgroundColor": "#3e0062",
					"navigationBarTextStyle": "white"
				},
				"needLogin": true
			}, {
				"path": "pages/follow",
				"style": {
					"navigationBarTitleText": "我的关注",
					"navigationBarBackgroundColor": "#000000",
					"navigationBarTextStyle": "white"
				},
				"needLogin": true
			}, {
				"path": "pages/ta",
				"style": {
					"navigationBarTitleText": "TA的主页",
					"navigationBarBackgroundColor": "#3e0062",
					"navigationBarTextStyle": "white"
				},
				"needLogin": true
			}, {
				"path": "pages/goodslist",
				"style": {
					"navigationBarTitleText": "选择商品",
					"navigationBarBackgroundColor": "#000000",
					"navigationBarTextStyle": "white"
				},
				"needLogin": true
			}]
		},
		// PAGE_END
EOT
];