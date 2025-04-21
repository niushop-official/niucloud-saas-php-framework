<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetOpenIDAndSessionKey extends Base
{
    public function index()
    {
        $ttcardConfig = $this->get_addon_config();
		$appId = $ttcardConfig['appid'];
		$appSecret = $ttcardConfig['appsecret']; 
		if (!$appId || !$appSecret) {
			return $this->err('请在插件后台配置appid和appsecret');
		} 
		 
		$getOpenidCode = $this->request->param('getOpenidCode');
		$getPhoneCode = $this->request->param('getPhoneCode');
		 
		// 获取openid
		$getOpendId =  $this->sendRequest("https://api.weixin.qq.com/sns/jscode2session?appid={$appId}&secret={$appSecret}&js_code={$getOpenidCode}&grant_type=authorization_code");  
		
		if ($getOpendId['ret'] != 1) {  
			return $this->err('请求失败');
		}   
		
		$data = json_decode($getOpendId['msg'], true); 
		
		if(!$data['openid'] || !$data['session_key']){
			return $this->err('请求错误');
		} 
		
		// 获取access_token
		$access_token = $this->sendRequest("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appId}&secret={$appSecret}"); 
		if ($access_token['ret'] != 1) {
			return $this->err('请求失败，请稍后再试');
		}   
		$getToken = json_decode($access_token['msg'], true); 
		if(!$getToken['access_token'] || !$getToken['expires_in']){
			return $this->err('请求错误');
		}
		
		// 获取手机号
		$getPhone = $this->sendRequest("https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token={$getToken['access_token']}",json_encode(['code'=>$getPhoneCode]));
		if ($getPhone['ret'] != 1) {
			return $this->err('网络错误');
		}  
		
		$phonInfo = json_decode($getPhone['msg'],true); 
		if ($phonInfo['errmsg'] != 'ok') {
			return $this->err('获取手机号失败');
		} 
		 
		$phone = $phonInfo['phone_info']['phoneNumber'];
		 
		$reslute = []; 
		
		$findOrderType = @Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where('real_id',3)->find(); 
		$duration = $findOrderType && $findOrderType['duration']?$findOrderType['duration']:7;
		$userInfo = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('openid',$data['openid'])->find();
		if(!$userInfo){
            $isExit=Db::name('ttcard_user')->where('site_id',$this->site_id)->where('phone',$phone)->find();
            if($isExit){
                return $this->err('当前手机号已被其他微信绑定');
            }
			$map = [];
			$time = time();
			$map['site_id'] = $this->site_id;
			$map['phone'] = $phone;
			$map['openid'] = $data['openid'];
			$map['nickname'] = '用户'.substr($phone,7,4);
			$map['token'] = $this->generateRandomString(50);
			$map['prelogintime'] = $time;
			$map['logintime'] = $time;
			$map['create_time'] = $time; 
			$map['expirationtime'] = ($time+ $duration*24*60*60); 
			
			$id = Db::name('ttcard_user')->insertGetId($map);
			if(!$id){
				return $this->err('请求失败');
			}
			 
			$res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('id',$id)->where('status','normal')->field('id,avatar,token,phone,status,nickname,grade_status,ordertype_id')->find();
			if(!$res){
				return $this->err('查找用户信息失败');
			}  
			
		}else{ 
			if($userInfo['status'] == 'hidden'){
				return $this->err('抱歉，此账号已被关进小黑屋');
			}
            if($userInfo['phone'] != $phone){
                return $this->err('当前微信已被其他手机号绑定');
            }
			$map= []; 
			$map['token'] = $this->generateRandomString(50); 
			$map['prelogintime'] = $userInfo['logintime'];
			$map['logintime'] =time();
			$res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('openid',$data['openid'])->update($map);
			if(!$res){
				return $this->err('抱歉，登录失败');
			}
			
			$res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('openid',$data['openid'])->field('id,avatar,token,phone,status,nickname,grade_status,ordertype_id')->where('status','normal')->find();
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
