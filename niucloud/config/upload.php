<?php

use core\dict\DictLoader;

$system = [
    'default' => 'local',//默认驱动
    'drivers' => [
        //本地上传
        'local' => [],
        //七牛云
        'qiniu' => [
            'access_key' => '',
            'secret_key' => '',
            'bucket' => ''
        ],
        //阿里云
        'aliyun' => [
            'access_key' => '',
            'secret_key' => '',
            'endpoint' => '',
            'bucket' => ''
        ],
        //腾讯云
        'tencent' => [
            'access_key' => '',
            'secret_key' => '',
            'region' => '',
            'bucket' => ''
        ],
    ],
    // 默认规则
    'rules' => [
        'image' => [
            'ext' => ['jpg', 'jpeg', 'png', 'gif'],
            'mime' => ['image/jpeg', 'image/gif', 'image/png'],
            'size' => 10485760
        ],
        'video' => [
            'ext' => ['mp4'],
            'mime' => ['video/mp4'],
            'size' => 104857600
        ],
        'wechat' => [
            'ext' => ['pem', 'key'],
            'mime' => [
                'application/x-x509-ca-cert',
                'application/octet-stream',
                'application/x-iwork-keynote-sffkey'
            ],
            'size' => 2097152
        ],
        'aliyun' => [
            'ext' => ['crt'],
            'mime' => [
                'application/x-x509-ca-cert',
                'application/octet-stream'
            ],
            'size' => 2097152
        ],
        'applet' => [
            'ext' => ['zip', 'rar'],
            'mime' => [
                'application/zip',
                'application/vnd.rar',
                'application/x-zip-compressed'
            ],
            'size' => 2097152
        ],
        'excel' => [
            'ext' => ['xls', 'xlsx'],
            'mime' => [
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ],
            'size' => 10485760
        ]
    ],
    'thumb' => [
        'thumb_type' => [
            'big' => [
                'width' => 1200,
                'height' => 1200,
            ],
            'mid' => [
                'width' => 800,
                'height' => 800,
            ],
            'small' => [
                'width' => 200,
                'height' => 200,
            ],
        ]


    ]
];

return (new DictLoader("Config"))->load(['data' => $system, 'name' => 'upload']);
