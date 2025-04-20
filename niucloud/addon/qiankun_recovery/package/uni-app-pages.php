<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/qiankun_recovery", 
            "pages": [
				{
                  "path": "pages/index/index",
                  "style": {
                    "navigationBarTitleText": "%qiankun_recovery.pages.index.index%"
                  },
                    "needLogin": true
                }
			]
        },
// PAGE_END
EOT
];