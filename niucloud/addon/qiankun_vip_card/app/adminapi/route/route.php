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
 * 等级卡密
 */
Route::group('qiankun_vip_card', function () {


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);


// USER_CODE_BEGIN -- qiankun_vip_card

Route::group('qiankun_vip_card', function () {

    //会员卡密列表
    Route::get('card', 'addon\qiankun_vip_card\app\adminapi\controller\card\Card@lists');
    
    Route::get('member_level_all','addon\qiankun_vip_card\app\adminapi\controller\card\Card@getMemberLevelAll');

    Route::get('member_all','addon\qiankun_vip_card\app\adminapi\controller\card\Card@getMemberAll');

    Route::get('order_all','addon\qiankun_vip_card\app\adminapi\controller\card\Card@getOrderAll');

    Route::get('member_all','addon\qiankun_vip_card\app\adminapi\controller\card\Card@getMemberAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_vip_card
