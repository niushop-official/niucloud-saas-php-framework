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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;

/**
 * 消息模块 相关路由
 */
Route::group('notice', function () {

    /***************************************************** 消息管理 ****************************************************/
    //消息列表
    Route::get('notice', 'notice.Notice/lists');
    //消息详情
    Route::get('notice/:key', 'notice.Notice/info');
    //消息启动与关闭
    Route::post('notice/editstatus', 'notice.Notice/editStatus');
    //短信配置列表
    Route::get('notice/sms', 'notice.Notice/smsList');
    //短信配置详情
    Route::get('notice/sms/:sms_type', 'notice.Notice/smsConfig');
    //短信配置修改
    Route::put('notice/sms/:sms_type', 'notice.Notice/editSms');
    //消息修改
    Route::post('notice/edit', 'notice.Notice/edit');

    //消息发送记录
    Route::get('log', 'notice.NoticeLog/lists');
    //消息发送记录详情
    Route::get('log/:id', 'notice.NoticeLog/info');

    //短信发送记录
    Route::get('sms/log', 'notice.SmsLog/lists');
    //短信发送记录详情
    Route::get('sms/log/:id', 'notice.SmsLog/info');

    Route::group('niusms', function () {
        Route::get('packages', 'notice.NiuSms/getSmsPackageList');
        //发送验证短信
        Route::post('send', 'notice.NiuSms/sendMobileCode');
        Route::get('captcha', 'notice.NiuSms/captcha');

        Route::get('config', 'notice.NiuSms/getConfig');
        Route::put('enable', 'notice.NiuSms/enable');
        Route::group('account', function () {
            Route::post('register', 'notice.NiuSms/registerAccount');
            Route::post('login', 'notice.NiuSms/loginAccount');
            Route::post('edit/:username', 'notice.NiuSms/editAccount');
            Route::post('reset/password/:username', 'notice.NiuSms/resetPassword');
            Route::get('send_list/:username', 'notice.NiuSms/accountSendList');
            Route::get('info/:username', 'notice.NiuSms/accountInfo');
        });

        Route::group('order', function () {
            Route::get('list/:username', 'notice.NiuSms/orderList');
            Route::post('calculate/:username', 'notice.NiuSms/calculate');
            Route::post('create/:username', 'notice.NiuSms/createOrder');
            Route::get('info/:username', 'notice.NiuSms/orderInfo');
            Route::get('status/:username', 'notice.NiuSms/orderStatus');
            Route::get('pay/:username', 'notice.NiuSms/getPayInfo');
        });
        Route::group('sign', function () {
            Route::get('list/:username', 'notice.NiuSms/signList');
            Route::get('info/:username', 'notice.NiuSms/signInfo');
            Route::get('report/config', 'notice.NiuSms/signCreateConfig');
            Route::post('report/:username', 'notice.NiuSms/signCreate');
            Route::post('delete/:username', 'notice.NiuSms/signDelete');
        });

        Route::group('template', function () {
            Route::get('sync/:sms_type/:username', 'notice.NiuSms/templateSync');
            Route::get('list/:sms_type/:username', 'notice.NiuSms/templateList');
            Route::get('info/:sms_type/:username', 'notice.NiuSms/templateInfo');
            Route::get('report/config', 'notice.NiuSms/templateCreateConfig');
            Route::post('report/:sms_type/:username', 'notice.NiuSms/templateCreate');
            Route::delete(':username/:template_id', 'notice.NiuSms/templateDelete');
        });
    });

    //商家消息通知
    Route::get('bind/weapp', 'notice.BindMerchant/getWeappQrcodeUrl');
    Route::get('bind/wechat', 'notice.BindMerchant/getWechatQrcodeUrl');
    Route::post('bind/sms/send', 'notice.BindMerchant/sendBindSms');
    Route::post('bind/sms/bind', 'notice.BindMerchant/checkSmsCodeAndBind');

    Route::get('bind/info', 'notice.BindMerchant/merchantBindInfo');
    Route::post('bind/cancel', 'notice.BindMerchant/unBindMerchant');

    /************************************************* 站内信 *****************************************************/
    // 消息分类树
    Route::get('message/category', 'notice.NoticeMessage/category');
    // 消息列表
    Route::get('message/list', 'notice.NoticeMessage/lists');
    // 消息详情
    Route::get('message/info/:id', 'notice.NoticeMessage/info');
    // 各分类未读数量
    Route::get('message/unread_count', 'notice.NoticeMessage/unreadCount');
    // 标记已读（ids 为空表示全部已读）
    Route::put('message/mark_read', 'notice.NoticeMessage/markRead');
    // 删除消息
    Route::delete('message/del', 'notice.NoticeMessage/del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

/**
 * 实时推送：单独分组，只做 token 校验
 * 不挂 AdminCheckRole（避免每次连接重复加载全量菜单接口清单）
 * 不挂 AdminLog（避免高频 WRITE 操作日志）
 * 注意：EventSource 不能自定义请求头，token / site-id 通过 query 传递
 */
Route::group('notice/message', function () {
    // SSE 消息推送流（首选）
    Route::get('stream', 'notice.NoticeMessage/stream');
    // 长轮询监听（SSE 不可用时的降级方案）
    Route::get('listen', 'notice.NoticeMessage/listen');
})->middleware([
    AdminCheckToken::class,
]);
