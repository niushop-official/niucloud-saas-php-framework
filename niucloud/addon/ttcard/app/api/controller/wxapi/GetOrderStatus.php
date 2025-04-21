<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetOrderStatus extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
		$order_id = $this->request->param('order_id');  
		
		if(!$order_id){
			return $this->err('请求参数错误');
		}
		 
		$find_order = Db::name('ttcard_order')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'id'=>$order_id])->find();
		if(!$find_order){
			return $this->err('查询订单失败');
		}
		if($find_order['pay_status'] != 1){
			return $this->err('支付失败，如有疑问请联系客服');
		} 
		 
		return $this->ok('支付成功',$this->userInfo($user_id));
    }
}
