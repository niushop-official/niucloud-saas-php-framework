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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use think\facade\Route;


/**
 * 会员个人信息管理
 */
Route::group('member', function () {

    /***************************************************** 会员管理 ****************************************************/
    //会员个人详情
    Route::get('member', 'member.Member/info');
    //会员中心
    Route::get('center', 'member.Member/center');
    //会员信息修改
    Route::put('modify/:field', 'member.Member/modify');
    //会员信息编辑
    Route::put('edit', 'member.Member/edit');
    //绑定手机号
    Route::put('mobile', 'member.Member/mobile');
    //获取会员码
    Route::get('qrcode', 'member.Member/qrcode');

    /***************************************************** 会员账户 ****************************************************/
    //会员积分流水
    Route::get('account/point', 'member.Account/point');
    //会员余额流水
    Route::get('account/balance', 'member.Account/balance');
    //会员余额流水(新)
    Route::get('account/balance_list', 'member.Account/balanceList');
    //会员零钱流水
    Route::get('account/money', 'member.Account/money');
    //会员零钱流水
    Route::get('account/count', 'member.Account/count');
    //会员佣金流水
    Route::get('account/commission', 'member.Account/commission');
    //账户来源
    Route::get('account/fromtype/:account_type', 'member.Account/getFromType');
    //积分数量
    Route::get('account/pointcount', 'member.Account/pointCount');

    /***************************************************** 会员提现 ****************************************************/

    //会员提现列表
    Route::get('cash_out', 'member.MemberCashOut/lists');
    //会员提现详情
    Route::get('cash_out/:id', 'member.MemberCashOut/info');
    //提现配置
    Route::get('cash_out/config', 'member.MemberCashOut/config');
    //提现转账方式
    Route::get('cash_out/transfertype', 'member.MemberCashOut/getTransferType');
    //提现申请
    Route::post('cash_out/apply', 'member.MemberCashOut/apply');
    //撤销提现申请
    Route::put('cash_out/cancel/:id', 'member.MemberCashOut/cancel');
    // 提现转账
    Route::post('cash_out/transfer/:id', 'member.MemberCashOut/transfer');
    // 提现账号列表
    Route::get('cashout_account', 'member.CashOutAccount/lists');
    // 提现账号详情
    Route::get('cashout_account/:account_id', 'member.CashOutAccount/info');
    // 首条提现账号详情
    Route::get('cashout_account/firstinfo', 'member.CashOutAccount/firstInfo');
    // 添加提现账号
    Route::post('cashout_account', 'member.CashOutAccount/add');
    // 编辑提现账号
    Route::put('cashout_account/:account_id', 'member.CashOutAccount/edit');
    // 删除提现账号
    Route::delete('cashout_account/:account_id', 'member.CashOutAccount/del');
    /***************************************************** 会员地址 **************************************************/
    //会员收货地址列表
    Route::get('address', 'member.Address/lists');
    //会员收货地址详情
    Route::get('address/:id', 'member.Address/info');
    //添加会员收货地址
    Route::post('address', 'member.Address/add');
    //编辑会员收货地址
    Route::put('address/:id', 'member.Address/edit');
    //删除会员收货地址
    Route::delete('address/:id', 'member.Address/del');

    /***************************************************** 会员签到 **************************************************/
    //会员签到记录
    Route::get('sign', 'member.MemberSign/lists');
    //会员签到详情
    Route::get('sign/:sign_id', 'member.MemberSign/info');
    //会员签到
    Route::post('sign', 'member.MemberSign/sign');
    //获取月签到数据
    Route::get('sign/info/:year/:month', 'member.MemberSign/signInfo');
    //获取月签到数据
    Route::get('sign/award/:year/:month/:day', 'member.MemberSign/getDayAward');
    //获取签到设置
    Route::get('sign/config', 'member.MemberSign/signConfig');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)
    ->middleware(ApiLog::class);


Route::group('member', function () {

    /***************************************************** 会员管理 ****************************************************/
    //会员日志
    Route::post('log', 'member.Member/log');

    // 获取手机号
    Route::put('getMobile', 'member.Member/getMobile');

    /***************************************************** 会员等级 **************************************************/
    Route::get('level', 'member.Level/lists');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);
