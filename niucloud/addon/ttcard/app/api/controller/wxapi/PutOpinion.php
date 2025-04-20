<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
//提交意见反馈
class PutOpinion extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		 
		$content = $this->request->param('msg');  
		 
		if(!trim($content)){
			return $this->err('请输入一些文字吧');
		}
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['user_id'] = $user_id; 
		$map['content'] = $content;
		$map['title'] = substr($content,0,30);
		$map['create_time'] = time();
		$map['status'] = 'hidden';
		
		$res = Db::name('ttcard_feedback')->insert($map);
		if(!$res){
			return $this->err('提交失败');
		}	
		return $this->ok('提交成功,客服会在第一时间处理您的意见或者反馈'); 
    }
}
