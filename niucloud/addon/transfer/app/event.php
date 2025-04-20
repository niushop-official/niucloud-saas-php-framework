<?php

return [
    'bind' => [

    ],
    'listen' => [
        'WapIndex' => [ 'addon\transfer\app\listener\WapIndexListener' ],
        'PaySuccess' => [ 'addon\transfer\app\listener\pay\PaySuccessListener' ],
    ],
    'subscribe' => [
    ],
];