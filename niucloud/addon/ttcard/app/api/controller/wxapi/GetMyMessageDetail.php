<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetMyMessageDetail extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
	
		$message_id = $this->request->param('message_id');
		$TabCur = $this->request->param('TabCur'); 
	 
		$res = Db::name('ttcard_cardmsg')->where('site_id',$this->site_id)->where(['id' => $message_id])->find();
		 
		if(!$res){
			return $this->err('请求失败');
		} 
		  
		$res['createtime'] = date('Y-m-d H:i:s',$res['create_time']);
		
		$find = Db::name('ttcard_cardmsg')->where('site_id',$this->site_id)->where(['id' => $message_id,'to_user_id'=>$user_id])->where(['status'=>'normal'])->find();
		if($find && $find['card_id'] != $res['card_id']){
			$find['createtime'] = date('Y-m-d H:i:s',$find['create_time']);
			$res['reply'] = $find;
		}

		return $this->ok('请求成功',$res); 
    }
}
