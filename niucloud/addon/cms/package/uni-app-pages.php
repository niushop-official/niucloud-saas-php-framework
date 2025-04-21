<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/cms",
            "pages": [{
                    "path": "pages/list",
                    "style": {
                        "navigationBarTitleText": "%cms.pages.list%"
                    }
                },
                {
                    "path": "pages/detail",
                    "style": {
                        "navigationBarTitleText": "%cms.pages.detail%"
                    }
                }
            ]
        },
        // PAGE_END
EOT
];