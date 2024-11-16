<?php

use core\dict\DictLoader;

$system_event = [
    //文件执行序列号
    'file_sort' => 1,
    'bind' => [
    ],
    'listen' => [
        /**
         * 系统事件
         */
        'AppInit' => [ 'app\listener\system\AppInitListener' ],
        // 站点创建之后
        'AddSiteAfter' => [
            'app\listener\system\AddSiteAfterListener'
        ],
        'HttpRun' => [],
        'HttpEnd' => [],
        'LogLevel' => [],
        'LogWrite' => [],
        /**
         * 会员相关事件
         */
        //会员注册事件
        'MemberRegister' => [ 'app\listener\member\MemberRegisterListener' ],
        //会员登录事件
        'MemberLogin' => [ 'app\listener\member\MemberLoginListener' ],
        //会员账户变化事件
        'MemberAccount' => [ 'app\listener\member\MemberAccountListener' ],
        //扫码事件
        'Scan' => [ 'app\listener\scan\ScanListener' ],
        /**
         * 支付相关事件
         */
        'PayCreate' => [ 'app\listener\pay\PayCreateListener' ],
        //支付成功
        'PaySuccess' => [ 'app\listener\pay\PaySuccessListener' ],
        //退款成功
        'RefundSuccess' => [ 'app\listener\pay\RefundSuccessListener' ],
        //转账成功
        'TransferSuccess' => [ 'app\listener\pay\TransferSuccessListener' ],
        // 任务失败统一回调,有四种定义方式
        'queue_failed' => [
            [ 'app\listener\job\QueueFailedLoggerListener', 'report' ],
        ],
        //系统应用管理加载
        'AppManage' => [
            'app\listener\system\AppManageListener'
        ],
        //协议类型加载
        'AgreementType' => [],
        //站点首页加载
        'SiteIndex' => [
            'app\listener\system\SiteIndexListener'
        ],
        // 站点端布局
        'SiteLayout' => [
            'app\listener\system\SiteLayout'
        ],
        //平台首页加载
        'AdminIndex' => [
            'app\listener\system\AdminIndexListener'
        ],
        'BottomNavigation' => [
            'app\listener\system\BottomNavigationListener'
        ],
        //消息模板数据内容
        'NoticeData' => [
            'app\listener\notice_template\VerifyCode',//手机验证码
            'app\listener\notice_template\MemberVerifySuccess',
        ],
        //全场景消息发送
        'Notice' => [
            'app\listener\notice\Sms',//短信
            'app\listener\notice\Wechat',//公众号模板消息
            'app\listener\notice\Weapp',//小程序订阅消息
        ],
        //小程序包替换
        'AppletReplace' => [
            'app\listener\applet\WeappListener',//微信小程序
        ],
        //创建二维码
        'GetQrcodeOfChannel' => [
            // 微信公众号二维码
            'app\listener\qrcode\WechatQrcodeListener',
            // 微信小程序二维码
            'app\listener\qrcode\WeappQrcodeListener'
        ],
        //导出数据类型
        'ExportDataType' => [
            //会员导出
            'app\listener\member_export\MemberExportTypeListener',
        ],
        //导出数据源
        'ExportData' => [
            //会员导出
            'app\listener\member_export\MemberExportDataListener',
        ],
        //统计执行
        'StatExecute' => [],
        //统计字段获取
        'StatField' => [],

        // 获取海报数据
        'GetPosterData' => [ 'app\listener\system\Poster' ],

        // 小程序授权变更事件
        'WeappAuthChangeAfter' => [ 'app\listener\system\WeappAuthChangeAfter' ]
    ],
    'subscribe' => [
    ],
];
return ( new DictLoader("Event") )->load($system_event);
