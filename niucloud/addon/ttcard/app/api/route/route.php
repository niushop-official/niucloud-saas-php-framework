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
 * 天天名片
 */
 //支付异步回调
Route::group('ttcard', function() {
    Route::rule('pay_notify/wechatpay/weapp/:site_id', 'addon\ttcard\app\api\controller\pay_notify\Wechatpay@weapp');
    Route::rule('pay_notify/wechatpay/check_order/:site_id', 'addon\ttcard\app\api\controller\pay_notify\Wechatpay@checkOrder');
})->middleware(ApiChannel::class)
  ->middleware(ApiLog::class);


Route::group('ttcard', function() {

    Route::rule('index',      'addon\ttcard\app\api\controller\Index@index');
    Route::rule('wxapi/getConfigSwitch', 'addon\ttcard\app\api\controller\wxapi\GetConfigSwitch@index');
    Route::rule('wxapi/getIndustry', 'addon\ttcard\app\api\controller\wxapi\GetIndustry@index');
    Route::rule('wxapi/getConnections', 'addon\ttcard\app\api\controller\wxapi\GetConnections@index');
    Route::rule('wxapi/getWechatAuditing', 'addon\ttcard\app\api\controller\wxapi\GetWechatAuditing@index');
    Route::rule('wxapi/getRecruit', 'addon\ttcard\app\api\controller\wxapi\GetRecruit@index');
    Route::rule('wxapi/getCopyRight', 'addon\ttcard\app\api\controller\wxapi\GetCopyRight@index');
    Route::rule('wxapi/loginwechat', 'addon\ttcard\app\api\controller\wxapi\Loginwechat@index');
    Route::rule('wxapi/getCardBackground', 'addon\ttcard\app\api\controller\wxapi\GetCardBackground@index');
    Route::rule('wxapi/getOpenIDAndSessionKey', 'addon\ttcard\app\api\controller\wxapi\GetOpenIDAndSessionKey@index');

    //需要登录
    Route::rule('wxapi/getUserInfo', 'addon\ttcard\app\api\controller\wxapi\GetUserInfo@index');
    Route::rule('wxapi/getMyPageStatistics', 'addon\ttcard\app\api\controller\wxapi\GetMyPageStatistics@index');
    Route::rule('wxapi/getUserDefaultCard', 'addon\ttcard\app\api\controller\wxapi\GetUserDefaultCard@index');
    Route::rule('wxapi/getMycard', 'addon\ttcard\app\api\controller\wxapi\GetMycard@index');
    Route::rule('wxapi/upload', 'addon\ttcard\app\api\controller\wxapi\Upload@index');
    Route::rule('wxapi/checkUserExpirationTime', 'addon\ttcard\app\api\controller\wxapi\CheckUserExpirationTime@index');
    Route::rule('wxapi/addCard', 'addon\ttcard\app\api\controller\wxapi\AddCard@index');
    Route::rule('wxapi/getMyCardDetail', 'addon\ttcard\app\api\controller\wxapi\GetMyCardDetail@index');
    Route::rule('wxapi/getCollect', 'addon\ttcard\app\api\controller\wxapi\GetCollect@index');
    Route::rule('wxapi/getImpression', 'addon\ttcard\app\api\controller\wxapi\GetImpression@index');
    Route::rule('wxapi/isCopyWechat', 'addon\ttcard\app\api\controller\wxapi\IsCopyWechat@index');
    Route::rule('wxapi/getCardCode', 'addon\ttcard\app\api\controller\wxapi\GetCardCode@index');
    Route::rule('wxapi/getVipProduct', 'addon\ttcard\app\api\controller\wxapi\GetVipProduct@index');
    Route::rule('wxapi/addProductOrder', 'addon\ttcard\app\api\controller\wxapi\AddProductOrder@index');
    Route::rule('wxapi/goPay', 'addon\ttcard\app\api\controller\wxapi\GoPay@index');
    Route::rule('wxapi/getTodayStatistics', 'addon\ttcard\app\api\controller\wxapi\GetTodayStatistics@index');
    Route::rule('wxapi/getDaysGraph', 'addon\ttcard\app\api\controller\wxapi\GetDaysGraph@index');
    Route::rule('wxapi/getCallMeGraph', 'addon\ttcard\app\api\controller\wxapi\GetCallMeGraph@index');
    Route::rule('wxapi/getWebsiteList', 'addon\ttcard\app\api\controller\wxapi\GetWebsiteList@index');
    Route::rule('wxapi/addWebsite', 'addon\ttcard\app\api\controller\wxapi\AddWebsite@index');
    Route::rule('wxapi/getWebsiteDetail', 'addon\ttcard\app\api\controller\wxapi\GetWebsiteDetail@index');
    Route::rule('wxapi/getConfigWebsiteSwitch', 'addon\ttcard\app\api\controller\wxapi\GetConfigWebsiteSwitch@index');
    Route::rule('wxapi/isClickEmail', 'addon\ttcard\app\api\controller\wxapi\IsClickEmail@index');
    Route::rule('wxapi/clickImpression', 'addon\ttcard\app\api\controller\wxapi\ClickImpression@index');
    Route::rule('wxapi/sendMsg', 'addon\ttcard\app\api\controller\wxapi\SendMsg@index');
    Route::rule('wxapi/clickCollect', 'addon\ttcard\app\api\controller\wxapi\ClickCollect@index');
    Route::rule('wxapi/getWebsiteCode', 'addon\ttcard\app\api\controller\wxapi\GetWebsiteCode@index');
    Route::rule('wxapi/getWebsiteTeamList', 'addon\ttcard\app\api\controller\wxapi\GetWebsiteTeamList@index');
    Route::rule('wxapi/deleteWebsite', 'addon\ttcard\app\api\controller\wxapi\DeleteWebsite@index');

    Route::rule('wxapi/getImages', 'addon\ttcard\app\api\controller\wxapi\GetImages@index');
    Route::rule('wxapi/getImagesDetail', 'addon\ttcard\app\api\controller\wxapi\GetImagesDetail@index');
    Route::rule('wxapi/addImages', 'addon\ttcard\app\api\controller\wxapi\AddImages@index');
    Route::rule('wxapi/deleteImages', 'addon\ttcard\app\api\controller\wxapi\DeleteImages@index');

    Route::rule('wxapi/getCase', 'addon\ttcard\app\api\controller\wxapi\GetCase@index');
    Route::rule('wxapi/addCase', 'addon\ttcard\app\api\controller\wxapi\AddCase@index');
    Route::rule('wxapi/getCaseDetail', 'addon\ttcard\app\api\controller\wxapi\GetCaseDetail@index');
    Route::rule('wxapi/deleteCase', 'addon\ttcard\app\api\controller\wxapi\DeleteCase@index');

    Route::rule('wxapi/getProduct', 'addon\ttcard\app\api\controller\wxapi\GetProduct@index');
    Route::rule('wxapi/addProduct', 'addon\ttcard\app\api\controller\wxapi\AddProduct@index');
    Route::rule('wxapi/getProductDetail', 'addon\ttcard\app\api\controller\wxapi\GetProductDetail@index');
    Route::rule('wxapi/deleteProduct', 'addon\ttcard\app\api\controller\wxapi\DeleteProduct@index');

    Route::rule('wxapi/getProgrammeList', 'addon\ttcard\app\api\controller\wxapi\GetProgrammeList@index');
    Route::rule('wxapi/addProgramme', 'addon\ttcard\app\api\controller\wxapi\AddProgramme@index');
    Route::rule('wxapi/deleteProgramme', 'addon\ttcard\app\api\controller\wxapi\DeleteProgramme@index');

    Route::rule('wxapi/getNews', 'addon\ttcard\app\api\controller\wxapi\GetNews@index');
    Route::rule('wxapi/addNews', 'addon\ttcard\app\api\controller\wxapi\AddNews@index');
    Route::rule('wxapi/getNewsDetail', 'addon\ttcard\app\api\controller\wxapi\GetNewsDetail@index');
    Route::rule('wxapi/deleteNews', 'addon\ttcard\app\api\controller\wxapi\DeleteNews@index');

    Route::rule('wxapi/addRecruit', 'addon\ttcard\app\api\controller\wxapi\AddRecruit@index');
    Route::rule('wxapi/getRecruitDetail', 'addon\ttcard\app\api\controller\wxapi\GetRecruitDetail@index');
    Route::rule('wxapi/deleteRecruit', 'addon\ttcard\app\api\controller\wxapi\DeleteRecruit@index');

    Route::rule('wxapi/getMyCollect', 'addon\ttcard\app\api\controller\wxapi\GetMyCollect@index');

    Route::rule('wxapi/getOrderList', 'addon\ttcard\app\api\controller\wxapi\GetOrderList@index');

    Route::rule('wxapi/getMyMessage', 'addon\ttcard\app\api\controller\wxapi\GetMyMessage@index');
    Route::rule('wxapi/getMyMessageDetail', 'addon\ttcard\app\api\controller\wxapi\GetMyMessageDetail@index');

    Route::rule('wxapi/getBiographicalList', 'addon\ttcard\app\api\controller\wxapi\GetBiographicalList@index');
    Route::rule('wxapi/addBiographical', 'addon\ttcard\app\api\controller\wxapi\AddBiographical@index');
    Route::rule('wxapi/getBiographicalDetail', 'addon\ttcard\app\api\controller\wxapi\GetBiographicalDetail@index');
    Route::rule('wxapi/deleteBiographical', 'addon\ttcard\app\api\controller\wxapi\DeleteBiographical@index');
    Route::rule('wxapi/submitBiographical', 'addon\ttcard\app\api\controller\wxapi\SubmitBiographical@index');

    Route::rule('wxapi/getOrdertype', 'addon\ttcard\app\api\controller\wxapi\GetOrdertype@index');

    Route::rule('wxapi/addAuthentication', 'addon\ttcard\app\api\controller\wxapi\AddAuthentication@index');
    Route::rule('wxapi/getAuthenticationDetail', 'addon\ttcard\app\api\controller\wxapi\GetAuthenticationDetail@index');
    Route::rule('wxapi/withdrawAuthentication', 'addon\ttcard\app\api\controller\wxapi\WithdrawAuthentication@index');

    Route::rule('wxapi/getHelpList', 'addon\ttcard\app\api\controller\wxapi\GetHelpList@index');

    Route::rule('wxapi/putOpinion', 'addon\ttcard\app\api\controller\wxapi\PutOpinion@index');
    
    Route::rule('wxapi/getOrderStatus', 'addon\ttcard\app\api\controller\wxapi\GetOrderStatus@index');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);



Route::group('ttcard', function() {

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);

