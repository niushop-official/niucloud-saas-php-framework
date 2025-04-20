<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\facade\Db;

class AddAuthentication extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
	
		$id = $this->request->param('id'); 
		$name = $this->request->param('name'); 
		$website_id = $this->request->param('website_id');  
		$idcard_num = $this->request->param('idcard_num');   
		$idcard_z_image = $this->request->param('idcard_z_image');   
		$idcard_f_image = $this->request->param('idcard_f_image');   
		$businesslicense_image = $this->request->param('businesslicense_image');
		$subtype = $this->request->param('subtype');  //提交类型
		$type = $this->request->param('type');  //认证类型，geren，qiye
		  
		if(!$name){
		 	return $this->err('请输入姓名');
		} 
		 
		if(!$idcard_num){
		 	return $this->err('请输入身份证号');
		}
		if(!$website_id && $type == 2){
		 	return $this->err('请选择需要认证的微官网');
		} 
		if(!$idcard_z_image || !strstr($idcard_z_image,'.')){
		 	return $this->err('请上传身份证正面照');
		}
		if(!$idcard_f_image || !strstr($idcard_f_image,'.')){
		 	return $this->err('请上传身份证反面照');
		}
		if($type == 'qiye' && (!$businesslicense_image || !strstr($businesslicense_image,'.'))){
		 	return $this->err('请上传营业执照');
		} 
		
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['user_id'] = $user_id; 
		$map['name'] = $name; 
		$map['idcard_num'] = $idcard_num; 
		$map['website_id'] = $website_id;
		$map['idcard_z_image'] = $idcard_z_image;
		$map['idcard_f_image'] = $idcard_f_image;
		$time = time();
		$map['update_time'] = $time; 
		$map['create_time'] = $time; 
		  
		if($type == 'geren'){
			$ordertype_id = 1;
			$order_title = '个人认证'; 
		}else if($type == 'qiye'){
			$ordertype_id = 2;
			$order_title = '企业认证'; 
			$map['businesslicense_image'] = $businesslicense_image;
		}else{
			return $this->err('参数错误');
		}
		
		$map['ordertype_id'] = $ordertype_id;
		
		$findAuthentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'ordertype_id'=>$ordertype_id])->find();
		
		if($findAuthentication && $findAuthentication['examine_status'] == 4){
			return $this->err('认证信息正在审核中，请不要重复提交');
		}
		
		$authentication_id = Db::name('ttcard_authentication')->insertGetId($map);
		if(!$authentication_id){
			return $this->err('认证信息提交失败');
		} 
		
		// 更新之前创建的认证信息的状态 为 隐藏
		$updateAuthentication =  @Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'ordertype_id'=>$ordertype_id,'status'=>'normal'])->where('id','<>',$authentication_id)->update(['status'=>'hidden']); 
		 
		$findOrdertype = Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where(['real_id'=>$ordertype_id])->find();
		if(!$findOrdertype){
			return $this->err('查询收费类型失败');
		} 
		// 创建认证订单 
		$addOrderRes = $this->new_addOrder($user_id,$ordertype_id,$authentication_id,1,'','',$findOrdertype['price'],$findOrdertype['price'],$findOrdertype['name'],$findOrdertype['type']);
		if(!$addOrderRes){
			return $this->err('创建订单失败');
		} 
		 
		// 创建系统消息
		$this->addCardmsg('systemmessages',$user_id,$findOrdertype['name'],$addOrderRes['order_num']);
		
		return $this->ok('认证信息提交成功',$addOrderRes);  
    }
}
