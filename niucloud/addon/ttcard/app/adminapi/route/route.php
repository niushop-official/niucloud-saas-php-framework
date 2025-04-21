<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 天天名片
 */
Route::group('ttcard', function () {

     /***************************************************** hello world ****************************************************/
    Route::get('hello_world', 'addon\ttcard\app\adminapi\controller\hello_world\Index@index');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

// USER_CODE_BEGIN -- ttcard_industry

Route::group('ttcard', function () {

    //行业管理列表
    Route::get('industry', 'addon\ttcard\app\adminapi\controller\industry\Industry@lists');
    //行业管理详情
    Route::get('industry/:id', 'addon\ttcard\app\adminapi\controller\industry\Industry@info');
    //添加行业管理
    Route::post('industry', 'addon\ttcard\app\adminapi\controller\industry\Industry@add');
    //编辑行业管理
    Route::put('industry/:id', 'addon\ttcard\app\adminapi\controller\industry\Industry@edit');
    //删除行业管理
    Route::delete('industry/:id', 'addon\ttcard\app\adminapi\controller\industry\Industry@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_industry





// USER_CODE_BEGIN -- ttcard_cardbackground

Route::group('ttcard', function () {

    //背景图管理列表
    Route::get('cardbackground', 'addon\ttcard\app\adminapi\controller\cardbackground\Cardbackground@lists');
    //背景图管理详情
    Route::get('cardbackground/:id', 'addon\ttcard\app\adminapi\controller\cardbackground\Cardbackground@info');
    //添加背景图管理
    Route::post('cardbackground', 'addon\ttcard\app\adminapi\controller\cardbackground\Cardbackground@add');
    //编辑背景图管理
    Route::put('cardbackground/:id', 'addon\ttcard\app\adminapi\controller\cardbackground\Cardbackground@edit');
    //删除背景图管理
    Route::delete('cardbackground/:id', 'addon\ttcard\app\adminapi\controller\cardbackground\Cardbackground@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_cardbackground

// USER_CODE_BEGIN -- ttcard_card

Route::group('ttcard', function () {

    //名片管理列表
    Route::get('card', 'addon\ttcard\app\adminapi\controller\card\Card@lists');
    //名片管理详情
    Route::get('card/:id', 'addon\ttcard\app\adminapi\controller\card\Card@info');
    //添加名片管理
    Route::post('card', 'addon\ttcard\app\adminapi\controller\card\Card@add');
    //编辑名片管理
    Route::put('card/:id', 'addon\ttcard\app\adminapi\controller\card\Card@edit');
    //删除名片管理
    Route::delete('card/:id', 'addon\ttcard\app\adminapi\controller\card\Card@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\card\Card@getUserAll');

    Route::get('industry_all','addon\ttcard\app\adminapi\controller\card\Card@getIndustryAll');

    Route::get('cardbackground_all','addon\ttcard\app\adminapi\controller\card\Card@getCardbackgroundAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_card






// USER_CODE_BEGIN -- ttcard_ordertype

Route::group('ttcard', function () {

    //会员等级列表
    Route::get('ordertype', 'addon\ttcard\app\adminapi\controller\ordertype\Ordertype@lists');
    //会员等级详情
    Route::get('ordertype/:id', 'addon\ttcard\app\adminapi\controller\ordertype\Ordertype@info');
    //添加会员等级
    Route::post('ordertype', 'addon\ttcard\app\adminapi\controller\ordertype\Ordertype@add');
    //编辑会员等级
    Route::put('ordertype/:id', 'addon\ttcard\app\adminapi\controller\ordertype\Ordertype@edit');
    //删除会员等级
    Route::delete('ordertype/:id', 'addon\ttcard\app\adminapi\controller\ordertype\Ordertype@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_ordertype

// USER_CODE_BEGIN -- ttcard_user

Route::group('ttcard', function () {

    //用户管理列表
    Route::get('user', 'addon\ttcard\app\adminapi\controller\user\User@lists');
    //用户管理详情
    Route::get('user/:id', 'addon\ttcard\app\adminapi\controller\user\User@info');
    //添加用户管理
    Route::post('user', 'addon\ttcard\app\adminapi\controller\user\User@add');
    //编辑用户管理
    Route::put('user/:id', 'addon\ttcard\app\adminapi\controller\user\User@edit');
    //删除用户管理
    Route::delete('user/:id', 'addon\ttcard\app\adminapi\controller\user\User@del');
    
    Route::get('ordertype_all','addon\ttcard\app\adminapi\controller\user\User@getOrdertypeAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_user

// USER_CODE_BEGIN -- ttcard_website

Route::group('ttcard', function () {

    //微官网管理列表
    Route::get('website', 'addon\ttcard\app\adminapi\controller\website\Website@lists');
    //微官网管理详情
    Route::get('website/:id', 'addon\ttcard\app\adminapi\controller\website\Website@info');
    //添加微官网管理
    Route::post('website', 'addon\ttcard\app\adminapi\controller\website\Website@add');
    //编辑微官网管理
    Route::put('website/:id', 'addon\ttcard\app\adminapi\controller\website\Website@edit');
    //删除微官网管理
    Route::delete('website/:id', 'addon\ttcard\app\adminapi\controller\website\Website@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\website\Website@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\website\Website@getCardAll');

    Route::get('industry_all','addon\ttcard\app\adminapi\controller\website\Website@getIndustryAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_website




// USER_CODE_BEGIN -- ttcard_cases

Route::group('ttcard', function () {

    //成功案例管理列表
    Route::get('cases', 'addon\ttcard\app\adminapi\controller\cases\Cases@lists');
    //成功案例管理详情
    Route::get('cases/:id', 'addon\ttcard\app\adminapi\controller\cases\Cases@info');
    //添加成功案例管理
    Route::post('cases', 'addon\ttcard\app\adminapi\controller\cases\Cases@add');
    //编辑成功案例管理
    Route::put('cases/:id', 'addon\ttcard\app\adminapi\controller\cases\Cases@edit');
    //删除成功案例管理
    Route::delete('cases/:id', 'addon\ttcard\app\adminapi\controller\cases\Cases@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\cases\Cases@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\cases\Cases@getCardAll');

    Route::get('website_all','addon\ttcard\app\adminapi\controller\cases\Cases@getWebsiteAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_cases



// USER_CODE_BEGIN -- ttcard_collect

Route::group('ttcard', function () {

    //收藏管理列表
    Route::get('collect', 'addon\ttcard\app\adminapi\controller\collect\Collect@lists');
    //收藏管理详情
    Route::get('collect/:id', 'addon\ttcard\app\adminapi\controller\collect\Collect@info');
    //添加收藏管理
    Route::post('collect', 'addon\ttcard\app\adminapi\controller\collect\Collect@add');
    //编辑收藏管理
    Route::put('collect/:id', 'addon\ttcard\app\adminapi\controller\collect\Collect@edit');
    //删除收藏管理
    Route::delete('collect/:id', 'addon\ttcard\app\adminapi\controller\collect\Collect@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\collect\Collect@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\collect\Collect@getCardAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_collect


// USER_CODE_BEGIN -- ttcard_product

Route::group('ttcard', function () {

    //产品管理列表
    Route::get('product', 'addon\ttcard\app\adminapi\controller\product\Product@lists');
    //产品管理详情
    Route::get('product/:id', 'addon\ttcard\app\adminapi\controller\product\Product@info');
    //添加产品管理
    Route::post('product', 'addon\ttcard\app\adminapi\controller\product\Product@add');
    //编辑产品管理
    Route::put('product/:id', 'addon\ttcard\app\adminapi\controller\product\Product@edit');
    //删除产品管理
    Route::delete('product/:id', 'addon\ttcard\app\adminapi\controller\product\Product@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\product\Product@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\product\Product@getCardAll');

    Route::get('website_all','addon\ttcard\app\adminapi\controller\product\Product@getWebsiteAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_product



// USER_CODE_BEGIN -- ttcard_cardmsg

Route::group('ttcard', function () {

    //消息管理列表
    Route::get('cardmsg', 'addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@lists');
    //消息管理详情
    Route::get('cardmsg/:id', 'addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@info');
    //添加消息管理
    Route::post('cardmsg', 'addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@add');
    //编辑消息管理
    Route::put('cardmsg/:id', 'addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@edit');
    //删除消息管理
    Route::delete('cardmsg/:id', 'addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@getUserAll');

    Route::get('user_all','addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\cardmsg\Cardmsg@getCardAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_cardmsg

// USER_CODE_BEGIN -- ttcard_feedback

Route::group('ttcard', function () {

    //意见反馈管理列表
    Route::get('feedback', 'addon\ttcard\app\adminapi\controller\feedback\Feedback@lists');
    //意见反馈管理详情
    Route::get('feedback/:id', 'addon\ttcard\app\adminapi\controller\feedback\Feedback@info');
    //添加意见反馈管理
    Route::post('feedback', 'addon\ttcard\app\adminapi\controller\feedback\Feedback@add');
    //编辑意见反馈管理
    Route::put('feedback/:id', 'addon\ttcard\app\adminapi\controller\feedback\Feedback@edit');
    //删除意见反馈管理
    Route::delete('feedback/:id', 'addon\ttcard\app\adminapi\controller\feedback\Feedback@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\feedback\Feedback@getUserAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_feedback

// USER_CODE_BEGIN -- ttcard_help

Route::group('ttcard', function () {

    //使用帮助管理列表
    Route::get('help', 'addon\ttcard\app\adminapi\controller\help\Help@lists');
    //使用帮助管理详情
    Route::get('help/:id', 'addon\ttcard\app\adminapi\controller\help\Help@info');
    //添加使用帮助管理
    Route::post('help', 'addon\ttcard\app\adminapi\controller\help\Help@add');
    //编辑使用帮助管理
    Route::put('help/:id', 'addon\ttcard\app\adminapi\controller\help\Help@edit');
    //删除使用帮助管理
    Route::delete('help/:id', 'addon\ttcard\app\adminapi\controller\help\Help@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_help

// USER_CODE_BEGIN -- ttcard_impression

Route::group('ttcard', function () {

    //个人印象列表
    Route::get('impression', 'addon\ttcard\app\adminapi\controller\impression\Impression@lists');
    //个人印象详情
    Route::get('impression/:id', 'addon\ttcard\app\adminapi\controller\impression\Impression@info');
    //添加个人印象
    Route::post('impression', 'addon\ttcard\app\adminapi\controller\impression\Impression@add');
    //编辑个人印象
    Route::put('impression/:id', 'addon\ttcard\app\adminapi\controller\impression\Impression@edit');
    //删除个人印象
    Route::delete('impression/:id', 'addon\ttcard\app\adminapi\controller\impression\Impression@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_impression

// USER_CODE_BEGIN -- ttcard_impressionlog

Route::group('ttcard', function () {

    //个人印象日志管理列表
    Route::get('impressionlog', 'addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@lists');
    //个人印象日志管理详情
    Route::get('impressionlog/:id', 'addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@info');
    //添加个人印象日志管理
    Route::post('impressionlog', 'addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@add');
    //编辑个人印象日志管理
    Route::put('impressionlog/:id', 'addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@edit');
    //删除个人印象日志管理
    Route::delete('impressionlog/:id', 'addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@del');
    
    Route::get('impression_all','addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@getImpressionAll');

    Route::get('user_all','addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\impressionlog\Impressionlog@getCardAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_impressionlog

// USER_CODE_BEGIN -- ttcard_statistics

Route::group('ttcard', function () {

    //数据统计管理列表
    Route::get('statistics', 'addon\ttcard\app\adminapi\controller\statistics\Statistics@lists');
    //数据统计管理详情
    Route::get('statistics/:id', 'addon\ttcard\app\adminapi\controller\statistics\Statistics@info');
    //添加数据统计管理
    Route::post('statistics', 'addon\ttcard\app\adminapi\controller\statistics\Statistics@add');
    //编辑数据统计管理
    Route::put('statistics/:id', 'addon\ttcard\app\adminapi\controller\statistics\Statistics@edit');
    //删除数据统计管理
    Route::delete('statistics/:id', 'addon\ttcard\app\adminapi\controller\statistics\Statistics@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\statistics\Statistics@getUserAll');

    Route::get('user_all','addon\ttcard\app\adminapi\controller\statistics\Statistics@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\statistics\Statistics@getCardAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_statistics

// USER_CODE_BEGIN -- ttcard_images

Route::group('ttcard', function () {

    //相册管理列表
    Route::get('images', 'addon\ttcard\app\adminapi\controller\images\Images@lists');
    //相册管理详情
    Route::get('images/:id', 'addon\ttcard\app\adminapi\controller\images\Images@info');
    //添加相册管理
    Route::post('images', 'addon\ttcard\app\adminapi\controller\images\Images@add');
    //编辑相册管理
    Route::put('images/:id', 'addon\ttcard\app\adminapi\controller\images\Images@edit');
    //删除相册管理
    Route::delete('images/:id', 'addon\ttcard\app\adminapi\controller\images\Images@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\images\Images@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\images\Images@getCardAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_images

// USER_CODE_BEGIN -- ttcard_invite

Route::group('ttcard', function () {

    //微官网邀请管理列表
    Route::get('invite', 'addon\ttcard\app\adminapi\controller\invite\Invite@lists');
    //微官网邀请管理详情
    Route::get('invite/:id', 'addon\ttcard\app\adminapi\controller\invite\Invite@info');
    //添加微官网邀请管理
    Route::post('invite', 'addon\ttcard\app\adminapi\controller\invite\Invite@add');
    //编辑微官网邀请管理
    Route::put('invite/:id', 'addon\ttcard\app\adminapi\controller\invite\Invite@edit');
    //删除微官网邀请管理
    Route::delete('invite/:id', 'addon\ttcard\app\adminapi\controller\invite\Invite@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\invite\Invite@getUserAll');

    Route::get('website_all','addon\ttcard\app\adminapi\controller\invite\Invite@getWebsiteAll');

    Route::get('user_all','addon\ttcard\app\adminapi\controller\invite\Invite@getUserAll');

    Route::get('card_all','addon\ttcard\app\adminapi\controller\invite\Invite@getCardAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_invite

// USER_CODE_BEGIN -- ttcard_authentication

Route::group('ttcard', function () {

    //认证信息管理列表
    Route::get('authentication', 'addon\ttcard\app\adminapi\controller\authentication\Authentication@lists');
    //认证信息管理详情
    Route::get('authentication/:id', 'addon\ttcard\app\adminapi\controller\authentication\Authentication@info');
    //添加认证信息管理
    Route::post('authentication', 'addon\ttcard\app\adminapi\controller\authentication\Authentication@add');
    //编辑认证信息管理
    Route::put('authentication/:id', 'addon\ttcard\app\adminapi\controller\authentication\Authentication@edit');
    //删除认证信息管理
    Route::delete('authentication/:id', 'addon\ttcard\app\adminapi\controller\authentication\Authentication@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\authentication\Authentication@getUserAll');

    Route::get('website_all','addon\ttcard\app\adminapi\controller\authentication\Authentication@getWebsiteAll');
    Route::get('authentication/ordertype_all','addon\ttcard\app\adminapi\controller\authentication\Authentication@getOrdertypeAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_authentication

// USER_CODE_BEGIN -- ttcard_order

Route::group('ttcard', function () {

    //订单管理列表
    Route::get('order', 'addon\ttcard\app\adminapi\controller\order\Order@lists');
    //订单管理详情
    Route::get('order/:id', 'addon\ttcard\app\adminapi\controller\order\Order@info');
    //添加订单管理
    Route::post('order', 'addon\ttcard\app\adminapi\controller\order\Order@add');
    //编辑订单管理
    Route::put('order/:id', 'addon\ttcard\app\adminapi\controller\order\Order@edit');
    //删除订单管理
    Route::delete('order/:id', 'addon\ttcard\app\adminapi\controller\order\Order@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\order\Order@getUserAll');

    Route::get('ordertype_all','addon\ttcard\app\adminapi\controller\order\Order@getOrdertypeAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_order


// USER_CODE_BEGIN -- ttcard_biographical

Route::group('ttcard', function () {

    //简历管理列表
    Route::get('biographical', 'addon\ttcard\app\adminapi\controller\biographical\Biographical@lists');
    //简历管理详情
    Route::get('biographical/:id', 'addon\ttcard\app\adminapi\controller\biographical\Biographical@info');
    //添加简历管理
    Route::post('biographical', 'addon\ttcard\app\adminapi\controller\biographical\Biographical@add');
    //编辑简历管理
    Route::put('biographical/:id', 'addon\ttcard\app\adminapi\controller\biographical\Biographical@edit');
    //删除简历管理
    Route::delete('biographical/:id', 'addon\ttcard\app\adminapi\controller\biographical\Biographical@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\biographical\Biographical@getUserAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_biographical


// USER_CODE_BEGIN -- ttcard_recruit

Route::group('ttcard', function () {

    //招聘管理列表
    Route::get('recruit', 'addon\ttcard\app\adminapi\controller\recruit\Recruit@lists');
    //招聘管理详情
    Route::get('recruit/:id', 'addon\ttcard\app\adminapi\controller\recruit\Recruit@info');
    //添加招聘管理
    Route::post('recruit', 'addon\ttcard\app\adminapi\controller\recruit\Recruit@add');
    //编辑招聘管理
    Route::put('recruit/:id', 'addon\ttcard\app\adminapi\controller\recruit\Recruit@edit');
    //删除招聘管理
    Route::delete('recruit/:id', 'addon\ttcard\app\adminapi\controller\recruit\Recruit@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\recruit\Recruit@getUserAll');

    Route::get('website_all','addon\ttcard\app\adminapi\controller\recruit\Recruit@getWebsiteAll');

    Route::get('industry_all','addon\ttcard\app\adminapi\controller\recruit\Recruit@getIndustryAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_recruit

// USER_CODE_BEGIN -- ttcard_biographicaldelive

Route::group('ttcard', function () {

    //简历投递管理列表
    Route::get('biographicaldelive', 'addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@lists');
    //简历投递管理详情
    Route::get('biographicaldelive/:id', 'addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@info');
    //添加简历投递管理
    Route::post('biographicaldelive', 'addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@add');
    //编辑简历投递管理
    Route::put('biographicaldelive/:id', 'addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@edit');
    //删除简历投递管理
    Route::delete('biographicaldelive/:id', 'addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@del');
    
    Route::get('user_all','addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@getUserAll');

    Route::get('user_all','addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@getUserAll');

    Route::get('recruit_all','addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@getRecruitAll');

    Route::get('biographical_all','addon\ttcard\app\adminapi\controller\biographicaldelive\Biographicaldelive@getBiographicalAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- ttcard_biographicaldelive

Route::group('ttcard', function () {
    Route::get('sys', 'addon\ttcard\app\adminapi\controller\sys\Sys@index');
    Route::post('sys/edit', 'addon\ttcard\app\adminapi\controller\sys\Sys@edit');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
