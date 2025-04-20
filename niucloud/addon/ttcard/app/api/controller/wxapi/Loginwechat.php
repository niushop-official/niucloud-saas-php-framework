<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class Loginwechat extends Base
{
    public function index()
    {
      return $this->err('暂不支持该登录方式');
      $youyicardConfig = $this->get_addon_config();
      $appId = $youyicardConfig['appid'];
      $appSecret = $youyicardConfig['appsecret']; 
      if (!$appId || !$appSecret) {
        return $this->err('请在插件后台配置appid和appsecret');
      } 
      $getOpenidCode = $this->request->param('code');
      // 获取openid
      $getOpendId =  $this->sendRequest("https://api.weixin.qq.com/sns/jscode2session?appid={$appId}&secret={$appSecret}&js_code={$getOpenidCode}&grant_type=authorization_code");  
      if ($getOpendId['ret'] != 1) {  
        return $this->err('网络错误，请稍后再试');
      }
      $data = json_decode($getOpendId['msg'], true); 
      if (!isset($data['openid'])) {
        return $this->err('微信小程序配置错误，请检查appid和appsecret');
      }
  
      $map= [];
      $map['site_id'] = $this->site_id;
      $map['openid'] = $data['openid'];
      
      $userInfo = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('openid',$data['openid'])->find();
      $findOrderType = Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where('real_id',3)->find();
      if(!$userInfo){ 
        $time = time(); 
        $map['nickname'] = '微信用户'.$this->generateRandomString(6); 
        $map['token'] = $this->generateRandomString(50);
        $map['prelogintime'] = $time;
        $map['logintime'] = $time;
        $map['create_time'] = $time; 
          
        $map['expirationtime'] = ($time+ $findOrderType['duration']*24*60*60); 
        
        $id = Db::name('ttcard_user')->insertGetId($map);
        if(!$id){
          return $this->err('网络错误，请稍后再试');
        }
        
        $res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('id',$id)->where('status','normal')->field('id,avatar,token,phone,status,nickname,grade_status,ordertype_id')->find();
        if(!$res){
          return $this->err('查找用户信息失败');
        }  
        
        
      }else{
        
        if($userInfo['status'] == 'hidden'){
          return $this->err('抱歉，此账号已被关进小黑屋');
        } 
        
        $map['token'] = $this->generateRandomString(50); 
        $map['prelogintime'] = $userInfo['logintime'];
        $map['logintime'] =time(); 
        
        $res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('openid',$data['openid'])->update($map);
        if(!$res){
          return $this->err('抱歉，登录失败');
        }
        $res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('token',$map['token'])->where('status','normal')->field('id,avatar,token,phone,status,nickname,grade_status,ordertype_id')->find();
        if(!$res){
          return $this->err('查找用户信息失败');
        }
        
      }
      
      $reslute = $res;
      $reslute['duration'] = $findOrderType['duration']; 
      
      $select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$reslute['id'],'status'=>'normal'])->field('examine_status,id,ordertype_id')->order('id desc')->select()->toArray();
      
      $reslute['authentication_info'] = count($select_authentication) > 0 ? $select_authentication :[];
      
      return $this->ok('登录成功',$reslute); 
    }
}
