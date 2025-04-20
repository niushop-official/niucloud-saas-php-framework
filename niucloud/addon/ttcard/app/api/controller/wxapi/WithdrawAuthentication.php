<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class WithdrawAuthentication extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
		$website_id = $this->request->param('website_id');
		$authentication_id = $this->request->param('authentication_id');
		if(!$website_id || !$authentication_id){
			return $this->err('参数不正确');
		}
		 
		$res = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'id'=>$authentication_id,'website_id'=>$website_id,'status'=>'normal'])->find();
		if(!$res){
			return $this->err('查找认证信息失败');
		}
		$updateAuthentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'id'=>$authentication_id,'website_id'=>$website_id])->update(['examine_status'=>5,'status'=>'hidden']);
		if(!$updateAuthentication){
			return $this->err('撤回失败');
		}
		$updateOrder = Db::name('ttcard_order')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'authentication_id'=>$authentication_id])->update(['pay_status'=>3,'status'=>'hidden']);
		if(!$updateOrder){
			return $this->err('更新认证订单失败');
		}
		 
		return $this->ok('操作成功');
    }
}
