<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetOrdertype extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
	 	$res = Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where('real_id','in',[1,2])->where(['status'=>'normal'])->select()->toArray();
	 	
	 	if(!$res){
	 		return $this->err('网络错误');
	 	} 
		
	 	foreach($res as $k=>$v){ 
			$res[$k]['id'] = $v['real_id'];
			$a_res= $this->authenticationDetail($user_id,$v['real_id']);
			if($a_res){
				$res[$k]['authenticationDetail'] = $a_res;
			}else{
				$res[$k]['authenticationDetail'] = '';
			}
		}
		 
	 	return $this->ok('请求成功',$res); 
    }
    
}
