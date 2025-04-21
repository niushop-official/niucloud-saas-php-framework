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

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;


/**
 * 短视频
 */
Route::group('shortvideo', function() {

    Route::get('getconfig', 'addon\shortvideo\app\api\controller\Index@getconfig');
    Route::get('getcatelist', 'addon\shortvideo\app\api\controller\Index@getcatelist');
    Route::any('getvideolist', 'addon\shortvideo\app\api\controller\Index@getvideolist');
    Route::any('addviews', 'addon\shortvideo\app\api\controller\Index@addviews');
    Route::any('tolike', 'addon\shortvideo\app\api\controller\Index@tolike');
    Route::any('getcommentlist', 'addon\shortvideo\app\api\controller\Index@getcommentlist');
    Route::any('tocomment', 'addon\shortvideo\app\api\controller\Index@tocomment');
    Route::any('commentlike', 'addon\shortvideo\app\api\controller\Index@commentlike');
    Route::get('labellist', 'addon\shortvideo\app\api\controller\Index@labellist');


//    Route::any('myvideo_list', 'addon\shortvideo\app\api\controller\Index@myvideo_list');
    Route::any('myvideo_status', 'addon\shortvideo\app\api\controller\Index@myvideo_status');
    Route::any('myvideo_del', 'addon\shortvideo\app\api\controller\Index@myvideo_del');
    Route::any('toaddvideo', 'addon\shortvideo\app\api\controller\Index@toaddvideo');

    Route::any('getuserinfo', 'addon\shortvideo\app\api\controller\Index@getuserinfo');
    Route::any('upload_video', 'addon\shortvideo\app\api\controller\Index@upload_video');
    Route::any('tofollowuser', 'addon\shortvideo\app\api\controller\Index@tofollowuser');
    Route::any('getfollowlist', 'addon\shortvideo\app\api\controller\Index@getfollowlist');
    Route::any('getfensilist', 'addon\shortvideo\app\api\controller\Index@getfensilist');
    Route::any('getposter', 'addon\shortvideo\app\api\controller\Index@getposter');
    Route::any('config', 'addon\shortvideo\app\api\controller\Index@config');
//    Route::any('getvideolist', 'addon\shortvideo\app\api\controller\Index@getvideolist');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);



Route::group('shortvideo', function() {

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);

