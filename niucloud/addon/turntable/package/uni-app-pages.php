<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "root": "addon/turntable",
            "pages": [
                {
                    "path": "pages/game/index",
                    "style": {
                        "navigationBarTitleText": "%turntable.pages.game.index%"
                    }
                },
                {
                    "path": "pages/game/record",
                    "style": {
                        "navigationBarTitleText": "%turntable.pages.game.record%"
                    }
                }                              
            ]
        },
        // PAGE_END
EOT
];