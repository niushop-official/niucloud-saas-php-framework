<?php

return [
    'auth' => [
        'code' => env('niucloud.code', ''),//授权码
        'secret' => env('niucloud.secret', ''),//授权秘钥
    ],
    'http' => [
        'max_retries' => 1,// 重试次数，默认 1，指定当 http 请求失败时重试的次数。
        'retry_delay' => 1000,//重试延迟间隔（单位：ms），默认 500
        'timeout' => 5.0,//最大运行时间(超时)
        'connect_timeout' => 10,
        'verify' => false,//请求时验证SSL证书行为。设置成 true 启用SSL证书验证，默认使用操作系统提供的CA包。设置成 false 禁用证书验证(这是不安全的！)。设置成字符串启用验证，并使用该字符串作为自定义证书CA包的路径。
    ],
    'response_type' => 'array',

    'task' => [
        // 任务锁租约有效期（秒）：持有进程被中断且收尾失效时，超过该时长后由其它请求自动接管
        // 需大于单次推进（分片上传 / 产物下载 / 解压部署）的最长耗时
        'lock_ttl' => 1800,
    ],
    'product' => 'saas'
];
