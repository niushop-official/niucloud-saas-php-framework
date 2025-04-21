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
use addon\huodong\app\api\middleware\ApiChannel;
use think\facade\Route;




/**
 * 活动报名
 */
Route::group('huodong', function() {

    Route::get('banner', 'addon\huodong\app\api\controller\Index@banner');
    Route::get('newsbao', 'addon\huodong\app\api\controller\Index@newsbao');
    Route::get('rank', 'addon\huodong\app\api\controller\Index@rank');
    Route::get('getrankone', 'addon\huodong\app\api\controller\Index@getrankone');
    Route::get('config', 'addon\huodong\app\api\controller\Index@config');


    Route::get('act/catelist', 'addon\huodong\app\api\controller\Act@catelist');
    Route::get('act/list', 'addon\huodong\app\api\controller\Act@lists');
    Route::get('act/detail', 'addon\huodong\app\api\controller\Act@detail'); 


    Route::post('order/create', 'addon\huodong\app\api\controller\Order@create');
    Route::get('order/list', 'addon\huodong\app\api\controller\Order@lists');
    Route::get('order/detail/:order_id', 'addon\huodong\app\api\controller\Order@detail');
    Route::get('order/status', 'addon\huodong\app\api\controller\Order@status');
    Route::get('order/close/:order_id', 'addon\huodong\app\api\controller\Order@close');
    Route::get('order/hexiao/:order_no', 'addon\huodong\app\api\controller\Order@hexiao');

    Route::any('order/urlhexiao/:site_id', 'addon\huodong\app\api\controller\Order@urlhexiao');
    
    Route::any('test/index/:site_id', 'addon\huodong\app\api\controller\Test@index');

    Route::post('fenxiao/getmyfxuser', 'addon\huodong\app\api\controller\Fenxiao@getmyfxuser');
    Route::post('fenxiao/apply', 'addon\huodong\app\api\controller\Fenxiao@apply');
    Route::post('fenxiao/teamlist', 'addon\huodong\app\api\controller\Fenxiao@teamlist');


})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);

