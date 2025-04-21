<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetNews extends Base
{
    public function index()
    {
        $pageCur = $this->request->param('pageCur');
		$limit = $this->request->param('limit');    
		$website_id = $this->request->param('website_id');
		$card_id = $this->request->param('card_id');    
		$pageCur = $pageCur ? $pageCur : 1;
		$limit = $limit ? $limit : 10;
		if(isset($_SERVER['HTTP_TOKEN'])){
			$user_id = $this->checkLogin($_SERVER['HTTP_TOKEN']);
			if(!$user_id){
				return $this->err('抱歉，请先登录',[],1000);
			} 
		}else{
			$user_id = $this->request->param('user_id');  
			if(!$user_id){
				return $this->err('请求参数不正确');
			}
		} 
		$map = [];
		$map['user_id'] = $user_id;
		$map['status'] = 'normal'; 
		if($website_id){
			$map['website_id'] = $website_id;
		}
		if($card_id){
			$map['card_id'] = $card_id;
		}
		$res = Db::name('ttcard_news')->where('site_id',$this->site_id)->order('id desc')->where($map)->limit($limit)->page($pageCur)->select()->toArray();
		
		if($res === false){
			return $this->err('网络错误');
		}
		if(count($res) == 0){
			return $this->ok('请求成功',[]); 
		} 
		foreach($res as $k => &$v){ 
			$v['createtime'] = date('Y-m-d',$v['create_time']); 
			$v['image'] = $this->checkDouhao($v['image']);
			foreach($v['image'] as $key => $value){
				$v['image'][$key] = $value? $this->cdnurl($value, true):'';   
			}
		}
		return $this->ok('请求成功',$res);
    }
}
