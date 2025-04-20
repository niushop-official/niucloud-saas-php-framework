<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
//获取产品列表
class GetProduct extends Base
{
    public function index()
    {
        $pageCur = $this->request->param('pageCur');
		$limit = $this->request->param('limit');  
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
		
		$res = Db::name('ttcard_product')->where('site_id',$this->site_id)->order('id desc')->where(['user_id'=>$user_id,'status'=>'normal'])->limit($limit)->page($pageCur)->select()->toArray();
		
		if($res === false){
			return $this->err('网络错误');
		}
		if(count($res) == 0){
			return $this->ok('请求成功',[]); 
		}
		foreach($res as $k=>&$v){ 
			$v['images'] = $this->checkDouhao($v['images']);
			foreach($v['images'] as $key => $value){
				$v['images'][$key] = $value?$this->cdnurl($value, true):'';  
			}
			$v['price'] = floatval($v['price']);
			$v['originalprice'] = floatval($v['originalprice']);
		} 
		
		return $this->ok('请求成功',$res); 
    }
}
