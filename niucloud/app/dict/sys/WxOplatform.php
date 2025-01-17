<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\dict\sys;

class WxOplatform
{
    /**
     * 公众号必需权限
     */
    public const WECHAT_MUST_AUTHORITY = [
        1 => '消息管理',
        2 => '用户管理',
        3 => '账号服务',
        4 => '网页服务',
        6 => '微信多客服',
        7 => '群发与通知',
        8 => '微信卡券',
        9 => '微信扫一扫',
        11 => '素材管理',
        15 => '菜单管理',
        27 => '快速注册小程序',
        33 => '小程序关联管理',
        54 => '服务号对话管理',
        89 => '服务号订阅通知'
    ];

    /**
     * 小程序必需权限
     */
    public const WEAPP_MUST_AUTHORITY = [
        17 => '获取小程序码',
        18 => '小程序开发与数据分析',
        19 => '小程序客服管理',
        25 => '开放平台账号管理',
        30 => '小程序基本信息管理',
        31 => '小程序认证名称检测',
        37 => '附近的小程序管理',
        40 => '小程序插件管理',
        45 => '微信物流服务',
        48 => '微信财政电子票据管理',
        49 => '小程序云开发管理',
        51 => '小程序即时配送',
        52 => '小程序直播管理',
        65 => '小程序广告管理',
        70 => '标准版交易组件商品管理',
        71 => '标准版交易组件订单物流与售后管理',
        73 => '标准版交易组件接入',
        76 => '小程序违规与交易投诉管理',
        81 => '试用小程序快速认证',
        84 => '标准版交易组件优惠券管理',
        85 => '自定义版交易组件管理',
        88 => '小程序链接管理',
        93 => '小程序联盟管理',
        99 => '云开发短信服务',
        105 => '城市服务',
        116 => '获取自定义版交易组件数据',
        118 => '硬件服务',
        119 => '小程序支付管理服务',
        120 => '小程序购物订单',
        129 => '视频号小店商品管理',
        130 => '视频号小店物流管理',
        131 => '视频号小店订单与售后管理',
        132 => '视频号小店优惠券管理',
        135 => '流量主代运营权限集',
        139 => '小程序运费险	',
        142 => '小程序发货管理服务',
        144 => '小程序学生认证权限集',
        151 => '小程序交易保障',
        157 => '小程序虚拟支付管理权限',
        161 => '微信客服管理',
    ];

    /**
     * 默认隐私协议内容
     */
    public const SETTING_LIST = [
        ['privacy_key' => 'UserInfo', 'privacy_text' => '用户信息'],
        ['privacy_key' => 'Location', 'privacy_text' => '位置信息'],
        ['privacy_key' => 'Address', 'privacy_text' => '地址'],
        ['privacy_key' => 'Invoice', 'privacy_text' => '发票信息	'],
        ['privacy_key' => 'RunData', 'privacy_text' => '微信运动数据'],
        ['privacy_key' => 'Record', 'privacy_text' => '麦克风'],
        ['privacy_key' => 'Album', 'privacy_text' => '选中的照片或视频信息'],
        ['privacy_key' => 'Camera', 'privacy_text' => '摄像头'],
        ['privacy_key' => 'PhoneNumber', 'privacy_text' => '手机号码	'],
        ['privacy_key' => 'Contact', 'privacy_text' => '通讯录'],
        ['privacy_key' => 'DeviceInfo', 'privacy_text' => '设备信息'],
        ['privacy_key' => 'EXIDNumber', 'privacy_text' => '身份证号码'],
        ['privacy_key' => 'EXOrderInfo', 'privacy_text' => '订单信息	'],
        ['privacy_key' => 'EXUserPublishConten', 'privacy_text' => '发布内容	'],
        ['privacy_key' => 'EXUserFollowAcct', 'privacy_text' => '所关注账号'],
        ['privacy_key' => 'EXUserOpLog', 'privacy_text' => '操作日志	'],
        ['privacy_key' => 'AlbumWriteOnly', 'privacy_text' => '相册'],
        ['privacy_key' => 'LicensePlate	', 'privacy_text' => '车牌号'],
        ['privacy_key' => 'BlueTooth', 'privacy_text' => '蓝牙'],
        ['privacy_key' => 'CalendarWriteOnly', 'privacy_text' => '日历'],
        ['privacy_key' => 'Email', 'privacy_text' => '邮箱'],
        ['privacy_key' => 'MessageFile', 'privacy_text' => '选中的文件'],
        ['privacy_key' => 'ChooseLocation', 'privacy_text' => '选择的位置信息'],
        ['privacy_key' => 'Accelerometer', 'privacy_text' => '加速传感器	'],
        ['privacy_key' => 'Compass', 'privacy_text' => '磁场传感器'],
        ['privacy_key' => 'DeviceMotion	', 'privacy_text' => '方向传感器	'],
        ['privacy_key' => 'Gyroscope', 'privacy_text' => '陀螺仪传感器'],
        ['privacy_key' => 'Clipboard', 'privacy_text' => '剪切板'],
    ];

    /**
     * 默认隐私协议内容
     */
    public const DEFAULT_SETTING_LIST = [
        ['privacy_key' => 'UserInfo', 'privacy_text' => '快捷维护用户信息'], // 用户信息
        ['privacy_key' => 'Location', 'privacy_text' => '用户获取附近门店'], // 位置信息
        ['privacy_key' => 'Address', 'privacy_text' => '快捷维护收货地址'], // 地址
        ['privacy_key' => 'Album', 'privacy_text' => '上传头像或者图片'], // 选中的照片或视频信息
        ['privacy_key' => 'Camera', 'privacy_text' => '调用摄像头扫描二维码'], // 摄像头
        ['privacy_key' => 'PhoneNumber', 'privacy_text' => '用户使用手机号注册'], // 手机号码
        ['privacy_key' => 'AlbumWriteOnly', 'privacy_text' => '获取相册中的图片'], // 相册
        ['privacy_key' => 'MessageFile', 'privacy_text' => '上传头像或者图片'], // 选中的文件
        ['privacy_key' => 'ChooseLocation', 'privacy_text' => '搜集您的位置信息'], // 选择的位置信息
        ['privacy_key' => 'Clipboard', 'privacy_text' => '快速获取订单号'], // 剪切板
    ];
}
