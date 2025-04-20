<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetMyMessage extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
		$pageCur = $this->request->param('pageCur');  
		$TabCur = $this->request->param('TabCur');
		$pageCur = $pageCur ? $pageCur : 1;
		
		$s_map = [];
		if($TabCur == 1){
		    $s_map['form_user_id'] = $user_id;
		}else{
		    $s_map['to_user_id'] = $user_id;
		    $s_map['status'] = 'normal';
		}
		$res = Db::name('ttcard_cardmsg')->where('site_id',$this->site_id)->order('id desc')->where($s_map)->limit(10)->page($pageCur)->select()->toArray();
		
		if(!$res){
			return $this->ok();
		} 
		
		foreach($res as $k=>$v){
			$res[$k]['createtime'] = date('Y-m-d H:i:s',$v['create_time']);
		}
		
		return $this->ok('请求成功',$res); 
    }
}
