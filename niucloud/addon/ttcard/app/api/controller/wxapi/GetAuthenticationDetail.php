<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetAuthenticationDetail extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];

		$type = $this->request->param('type');
		if($type == 'geren'){
			$ordertype_id = 1; 
		}else if($type == 'qiye'){ 
			$ordertype_id = 2;   
		}else{
			return $this->err('参数错误');
		}
		$res = $this->authenticationDetail($user_id,$ordertype_id);
		if(!$res){
			return $this->err('获取认证信息失败');
		}
		
		$findOrder = Db::name('ttcard_order')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'authentication_id'=>$res['id']])->find();
		if(!$findOrder){
			return $this->err('获取认证订单详情失败');
		}
		$res['orderInfo'] = $findOrder;
		return $this->ok('请求成功',$res);
    }
}
