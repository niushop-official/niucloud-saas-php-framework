<?php

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;


/**
 * 链动2+1
 */
Route::group('ly_lian', function() {
    /***************************************************** ly_lian ****************************************************/
    //获取链动会员设置
    Route::get('config', 'addon\ly_lian\app\api\controller\Config@getLianConfig');
    //链动会员等级
    Route::get('level', 'addon\ly_lian\app\api\controller\LianLevel@lists');
    //链动会员等级详情
    Route::get('level/:id', 'addon\ly_lian\app\api\controller\LianLevel@info');


     //链动会员信息
     Route::get('lian_member/info', 'addon\ly_lian\app\api\controller\LianMember@info');
     //链动会员详情
     Route::get('lian_member/detail', 'addon\ly_lian\app\api\controller\LianMember@detail');
     //链动会员账户信息
     Route::get('lian_member/account', 'addon\ly_lian\app\api\controller\LianMember@account');
    //链动会员团队
     Route::get('lian_member/team', 'addon\ly_lian\app\api\controller\LianMember@team');
    //链动会员直推下级
     Route::get('lian_member/recommendChild', 'addon\ly_lian\app\api\controller\LianMember@recommendChild');
    //链动会员直推boss
     Route::get('lian_member/recommendBossChild', 'addon\ly_lian\app\api\controller\LianMember@recommendBossChild');
    // 链动会员奖励记录
     Route::get('lian_member/reward', 'addon\ly_lian\app\api\controller\LianMember@reward');
     // 前2直推
     Route::get('lian_member/firstRecommend', 'addon\ly_lian\app\api\controller\LianMember@firstRecommend');
     //绩效任务期限
     Route::get('lian_member/taskLimitDays', 'addon\ly_lian\app\api\controller\LianMember@taskLimitDays');

     

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);


