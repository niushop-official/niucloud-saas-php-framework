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

namespace addon\huodong\app\api\controller;

use core\base\BaseApiController;
use think\Response;
use app\service\api\member\MemberService;
use app\job\member\SetMemberNoJob;
use core\exception\AuthException;
use addon\tk_vip\app\model\real\Real;
use addon\tk_vip\app\model\vip\Vip;
use addon\wx_notice\app\model\RobotMember;
use app\model\member\Member;
use addon\huodong\app\model\order\Order;
use app\service\core\verify\CoreVerifyService;
use app\service\admin\wxoplatform\WeappVersionService;

class Test extends BaseApiController
{
 

    public function index($site_id)
    {
        
        //处理核销数据
        //$order = Order::where([ [ 'order_status', '=', 2 ] ])->select()->toArray();
        //foreach ($order as $vo){
        //    if(!$vo['member_id']) continue;
        //    $ret = (new CoreVerifyService())->create($vo['site_id'], $vo['member_id'],'huodongVerify',$vo);
        //    $updata['hexiao_url'] = $ret[0]??'';
        //    Order::where([ [ 'order_id', '=', $vo['order_id'] ] ])->update($updata);
        //}
        //echo 'success';
        //exit;
                //
        //request()->siteId($site_id);
        //
        //$service = new WeappVersionService();
        // 提交小程序代码
        //$service->siteWeappCommit();
        
        
        $param = $this->request->params([
            ['nickname', ''],
            ['mobile', ''],
            ['headimg', ''],
            ['card_num', ''],
            ['wechat_account', ''],
        ]); 
        
        $data[ 'nickname' ]  = $param['nickname'];
        $data[ 'mobile' ]    = $param['mobile'];
        $data[ 'headimg' ]   = $param['headimg'];
        $data['member_level'] = 2;
        
        $member_service = new MemberService();
        $member_info = $member_service->findMemberInfo([ 'mobile' => $data['mobile'], 'site_id' => $site_id]);
        if ($member_info->isEmpty()) {
            //提醒绑定
           // $NoticeMsg = ' 未访问小程序名单提醒：['.$param['nickname'].']';
           // event('WxNoticeSend', ['site_id' => $site_id, 'text' => $NoticeMsg, 'key' => '']);
            
            throw new AuthException('账号不存在');
        }else{
           ( new Member() )->where(['site_id' => $site_id, 'member_id' => $member_info['member_id']])->update($data);
        }
        
        //插入实名认证
        $verifyInfo = (new Real())->where(['site_id' => $site_id, 'member_id' => $member_info['member_id']])->findOrEmpty()->toArray();
        if(empty($verifyInfo)){
            
           ( new Real() )->create([
                'site_id'   => $site_id, 
                'member_id' => $member_info['member_id'], 
                'real_name' => $param['nickname'], 
                'mobile' => $param['mobile'], 
                'card_num' => $param['card_num'], 
                'status' => 1, 
            ]); 
        }
        //插入会员到期
        $vipInfo = (new Vip())->where(['site_id' => $site_id, 'member_id' => $member_info['member_id']])->findOrEmpty()->toArray();
        
        $vipData = [
            'site_id'   => $site_id, 
            'member_id' => $member_info['member_id'], 
            'level_id'  => 2, 
            'over_time' => 1759161600, 
        ];
        
        if(!$vipInfo) {
            ( new Vip() )->create($vipData);
        }else{
            ( new Vip() )->where(['site_id' => $site_id, 'member_id' => $member_info['member_id']])->update($vipData);
        }
        
        //插入机器人绑定
        if($param['wechat_account']){
            $RobotInfo = (new RobotMember())->where(['site_id' => $site_id, 'weixin_openid' => $param['wechat_account']])->findOrEmpty()->toArray();
            
            $RobotData = [
                    'site_id'   => $site_id, 
                    'member_id' => $member_info['member_id'], 
                    'weixin_openid' => $param['wechat_account'], 
            ];
            
            if(empty($RobotInfo)){
               ( new RobotMember() )->create($RobotData); 
            }else{
                 ( new RobotMember() )->where(['id' => $RobotInfo['id']])->update($RobotData);
            }
        }
        
        return success($member_info['member_id']);
        
    }
}
