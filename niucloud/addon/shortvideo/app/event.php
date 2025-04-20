<?php

return [
    //文件执行序列号
    'bind' => [
    ],
    'listen' => [
        'WapIndex' => [ 'addon\shortvideo\app\listener\WapIndexListener' ],
        'BottomNavigation' => [ 'addon\shortvideo\app\listener\BottomNavigationListener' ],

    ],
    'subscribe' => [
    ],
];

