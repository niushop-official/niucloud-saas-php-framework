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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;

/**
 * 商城礼品卡
 */
Route::group('shop_giftcard', function() {

    // ************************************** 礼品卡分类 **************************************

    // 礼品卡分类分页列表
    Route::get('category', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@pages');

    // 礼品卡分类列表
    Route::get('category/list', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@lists');

    // 礼品卡分类详情
    Route::get('category/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@info');

    // 添加礼品卡分类
    Route::post('category', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@add');

    // 编辑礼品卡分类
    Route::put('category/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@edit');

    // 删除礼品卡分类
    Route::delete('category/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@del');

    // 修改 礼品卡分类排序号
    Route::put('category/sort', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@modifySort');

    // 修改 礼品卡分类状态
    Route::put('category/status', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Category@modifyStatus');

    // ************************************** 礼品卡素材分组 **************************************

    // 礼品卡 素材分组分页列表
    Route::get('material/group', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@pages');

    // 礼品卡 素材分组列表
    Route::get('material/group/list', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@lists');

    //礼品卡 素材分组详情
    Route::get('material/group/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@info');

    //添加 礼品卡素材分组
    Route::post('material/group', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@add');

    //编辑 礼品卡素材分组
    Route::put('material/group/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@edit');

    //删除 礼品卡素材分组
    Route::delete('material/group/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@del');

    // 修改 礼品卡素材分组排序号
    Route::put('material/group/sort', 'addon\shop_giftcard\app\adminapi\controller\giftcard\MaterialGroup@modifySort');

    // ************************************** 礼品卡素材 **************************************

    // 礼品卡素材分页列表
    Route::get('material', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@pages');

    // 礼品卡素材列表
    Route::get('material/list', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@lists');

    // 礼品卡素材详情
    Route::get('material/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@info');

    // 添加礼品卡素材
    Route::post('material', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@add');

    // 编辑礼品卡素材
    Route::put('material/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@edit');

    // 删除礼品卡素材
    Route::delete('material', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@del');

    // 修改 礼品卡素材分组
    Route::put('material/modifyGroupId', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Material@modifyGroupId');

    // ************************************** 礼品卡活动 **************************************

    // 礼品卡活动分页列表
    Route::get('giftcard', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@pages');

    // 礼品卡活动列表
    Route::get('giftcard/list', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@lists');

    // 礼品卡活动信息
    Route::get('giftcard/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@info');

    // 礼品卡活动详情
    Route::get('giftcard/detail/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@detail');

    // 礼品卡活动编辑数据
    Route::get('giftcard/init', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@init');

    // 添加礼品卡活动
    Route::post('giftcard', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@add');

    // 编辑礼品卡活动
    Route::put('giftcard/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@edit');

    // 删除礼品卡活动
    Route::delete('giftcard/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@del');

    // 修改 礼品卡活动排序号
    Route::put('giftcard/sort', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@modifySort');

    // 修改 礼品卡活动状态
    Route::put('giftcard/status', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@modifyStatus');

    // 获取 礼品卡类型
    Route::get('giftcard/type', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@type');

    // 获取 礼品卡权益类型
    Route::get('giftcard/cardRightType', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@cardRightType');

    // 选择礼品卡活动列表
    Route::get('giftcard/select', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Giftcard@select');

    // ************************************** 实体礼品卡制作 **************************************

    // 实体礼品卡制作列表
    Route::get('giftcard/make', 'addon\shop_giftcard\app\adminapi\controller\giftcard\GiftcardMake@lists');

    // 添加实体礼品卡制作
    Route::post('giftcard/make', 'addon\shop_giftcard\app\adminapi\controller\giftcard\GiftcardMake@add');

    // 删除实体礼品卡制作
    Route::delete('giftcard/make/:id', 'addon\shop_giftcard\app\adminapi\controller\giftcard\GiftcardMake@del');

    // ************************************** 礼品卡获取 **************************************

    // 礼品卡获取列表
    Route::get('giftcard/card', 'addon\shop_giftcard\app\adminapi\controller\card\Card@pages');

    // 礼品卡获取详情
    Route::get('giftcard/card/:id', 'addon\shop_giftcard\app\adminapi\controller\card\Card@detail');

    // 实体礼品卡 制作卡密
    Route::post('giftcard/makeCard', 'addon\shop_giftcard\app\adminapi\controller\card\Card@makeCard');

    // 删除礼品卡获取
    Route::delete('giftcard/card/:id', 'addon\shop_giftcard\app\adminapi\controller\card\Card@del');

    // 获取卡的来源列表
    Route::get('giftcard/card/source', 'addon\shop_giftcard\app\adminapi\controller\card\Card@getSourceList');

    // 获取卡的状态
    Route::get('giftcard/card/status', 'addon\shop_giftcard\app\adminapi\controller\card\Card@getStatusListByType');

    // ************************************** 礼品卡订单 **************************************

    // 礼品卡订单列表
    Route::get('order', 'addon\shop_giftcard\app\adminapi\controller\order\Order@lists');

    // 礼品卡订单详情
    Route::get('order/:id', 'addon\shop_giftcard\app\adminapi\controller\order\Order@info');

    // 修改礼品卡订单备注
    Route::put('order/remark/:id', 'addon\shop_giftcard\app\adminapi\controller\order\Order@remark');

    // 关闭礼品卡订单
    Route::put('order/close/:id', 'addon\shop_giftcard\app\adminapi\controller\order\Order@close');

    // 获取订单状态
    Route::get('order/status', 'addon\shop_giftcard\app\adminapi\controller\order\Order@getOrderStatus');

    // 获取支付类型
    Route::get('order/pay/type', 'addon\shop_giftcard\app\adminapi\controller\order\Order@getPayType');

    // ************************************** 礼品卡设置 **************************************

    // 获取礼品卡设置
    Route::get('config', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Config@getGiftcardConfig');

    // 设置礼品卡
    Route::put('config', 'addon\shop_giftcard\app\adminapi\controller\giftcard\Config@setGiftcardConfig');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
