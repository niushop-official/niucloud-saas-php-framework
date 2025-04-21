<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class SubmitBiographical extends BaseAuth
{
    public function index()
    {
        $from_user_id = $this->request->param('from_user_id'); 
		$to_user_id = $this->request->param('to_user_id'); 
		$biographical_id = $this->request->param('biographical_id'); 
		$recruit_id = $this->request->param('recruit_id'); 
		
		
		if(!$from_user_id || !$to_user_id || !$biographical_id || !$recruit_id){
			return $this->err('参数错误');
		} 
		if($from_user_id ==  $to_user_id){
			return $this->err('不能给自己投递简历');
		}
		
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['from_user_id'] = $from_user_id;
		$map['to_user_id'] = $to_user_id;
		$map['biographical_id'] = $biographical_id; 
		$map['recruit_id'] = $recruit_id; 
		
		$find = DB::name('ttcard_biographicaldelive')->where($map)->find();
		if($find){
			return $this->err('您已投递过此招聘信息'); 
		}
		
		$map['create_time'] = time();
		$res = DB::name('ttcard_biographicaldelive')->insert($map);
		if(!$res){
			return $this->err('简历投递失败'); 
		}
		
		@Db::name('ttcard_biographical')->where('site_id',$this->site_id)->where('id',$biographical_id)->setInc('delive_num');
		
		return $this->ok('简历投递成功'); 
    }
}
