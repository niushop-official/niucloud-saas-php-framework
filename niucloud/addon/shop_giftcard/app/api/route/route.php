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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use think\facade\Route;


/**
 * 商城礼品卡
 */
Route::group('shop_giftcard', function() {

    // ************************************** 礼品卡分类 **************************************

    // 礼品卡分类列表
    Route::get('category', 'addon\shop_giftcard\app\api\controller\giftcard\Category@lists');

    // ************************************** 礼品卡活动 **************************************

    // 礼品卡活动分页列表
    Route::get('giftcard', 'addon\shop_giftcard\app\api\controller\giftcard\Giftcard@pages');

    // 获取礼品卡列表（供自定义组件调用）
    Route::get('giftcard/components', 'addon\shop_giftcard\app\api\controller\giftcard\Giftcard@components');

    // 礼品卡活动详情
    Route::get('giftcard/:id', 'addon\shop_giftcard\app\api\controller\giftcard\Giftcard@detail');

    // 获取卡的状态列表
    Route::get('card/status', 'addon\shop_giftcard\app\api\controller\card\Card@status');

    // ************************************** 礼品卡设置 **************************************

    // 获取礼品卡设置
    Route::get('config', 'addon\shop_giftcard\app\api\controller\giftcard\Config@getGiftcardConfig');


    // 礼品卡赠予记录
    Route::get('card/give/:id', 'addon\shop_giftcard\app\api\controller\card\CardGive@info');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)//false表示不验证登录
    ->middleware(ApiLog::class);


Route::group('shop_giftcard', function() {

    // ************************************** 礼品卡获取 **************************************

    // 获取卡列表
    Route::get('card/list', 'addon\shop_giftcard\app\api\controller\card\Card@pages');

    // 获取单张卡
    Route::get('card', 'addon\shop_giftcard\app\api\controller\card\Card@getCard');

    // 获取卡信息
    Route::get('card/info/:id', 'addon\shop_giftcard\app\api\controller\card\Card@info');

    // 获取卡详情
    Route::get('card/:id', 'addon\shop_giftcard\app\api\controller\card\Card@detail');

    // 激活实体礼品卡
    Route::post('card/activate', 'addon\shop_giftcard\app\api\controller\card\Card@activate');

    // 修改实体礼品卡的封面图片
    Route::put('card/cover', 'addon\shop_giftcard\app\api\controller\card\Card@modifyRealCardCover');

    // ************************************** 礼品卡包 **************************************

    // 获取卡列表
    Route::get('card/bag', 'addon\shop_giftcard\app\api\controller\card\MemberCardBag@pages');

    // ************************************** 礼品卡赠予 **************************************

    // 礼品卡赠予
    Route::post('card/give', 'addon\shop_giftcard\app\api\controller\card\CardGive@give');

    // 礼品卡批量赠予
    Route::post('card/give_batch', 'addon\shop_giftcard\app\api\controller\card\CardGive@giveBatch');

    // 领取礼品卡
    Route::post('card/receive', 'addon\shop_giftcard\app\api\controller\card\CardGive@receive');

    // ************************************** 礼品卡使用 **************************************

    // 储值卡使用
    Route::post('records/use/balance', 'addon\shop_giftcard\app\api\controller\records\UseRecords@balanceCardUse');

    // 兑换卡使用
    Route::post('records/use/goods', 'addon\shop_giftcard\app\api\controller\records\UseRecords@goodsCardUse');

    // ************************************** 礼品卡订单 **************************************

    // 订单列表
    Route::get('order', 'addon\shop_giftcard\app\api\controller\order\Order@lists');

    // 订单详情
    Route::get('order/:order_id', 'addon\shop_giftcard\app\api\controller\order\Order@detail');

    // 订单关闭
    Route::put('order/close/:order_id', 'addon\shop_giftcard\app\api\controller\order\Order@close');

    // 订单状态
    Route::get('order/status', 'addon\shop_giftcard\app\api\controller\order\Order@orderStatus');

    // 订单计算
    Route::get('order_create/calculate', 'addon\shop_giftcard\app\api\controller\order\OrderCreate@calculate');

    // 订单创建
    Route::post('order_create/create', 'addon\shop_giftcard\app\api\controller\order\OrderCreate@create');

    // ************************************** 礼品卡会员领取记录 **************************************

    // 送出的礼品卡分页列表
    Route::get('member_records/give', 'addon\shop_giftcard\app\api\controller\records\MemberRecords@givePages');

    // 送出的礼品卡详情
    Route::get('member_records/give/:id', 'addon\shop_giftcard\app\api\controller\records\MemberRecords@giveDetail');

    // 收到的礼品卡分页列表
    Route::get('member_records/receive', 'addon\shop_giftcard\app\api\controller\records\MemberRecords@receivePages');


})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)//表示验证登录
    ->middleware(ApiLog::class);
