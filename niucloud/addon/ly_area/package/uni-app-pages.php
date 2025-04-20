<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/ly_area", 
            "pages": [
				{
                    "path": "pages/index",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%ly_area.pages.index%"
                    },
                    "needLogin": true
				},
				{
                    "path": "pages/sale",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%ly_area.pages.sale%"
                    },
                    "needLogin": true   
				},
				{
                    "path": "pages/team",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%ly_area.pages.team%"
                    },
                    "needLogin": true   
				},
				{
                    "path": "pages/apply",
                    "style": {
                        // #ifndef H5
                        "navigationStyle": "custom",
                        // #endif
                        "navigationBarTitleText": "%ly_area.pages.apply%"
                    },
                    "needLogin": true   
				}
			]
        },
// PAGE_END
EOT
];