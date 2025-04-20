<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/qiankun_source",
            "pages": [
                // *********************************** hello world ***********************************
                {
                    "path": "pages/source/index",
                    "style": {
                        "navigationBarTitleText": "%qiankun_source.pages.source.index%"
                    }
				}
            ]
        },
                // PAGE_END
EOT
];