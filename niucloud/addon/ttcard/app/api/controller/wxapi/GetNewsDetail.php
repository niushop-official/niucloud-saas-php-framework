<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetNewsDetail extends Base
{
    public function index()
    {
        $id = $this->request->param('id');   
		if(!$id){
			return $this->err('参数不正确');
		}
		 
		$res = Db::name('ttcard_news')->where('site_id',$this->site_id)->where(['id'=>$id,'status'=>'normal'])->find(); 
		
		if(!$res){
			return $this->err('请求失败');
		}
		$source = $this->request->param('source');
		if($source == 'my'){ 
			$find_card = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['id'=>$res['card_id'],'status'=>'normal'])->find(); 
			if(!$find_card){
				$res['select_card_info'] = [];
			}else{
				$res['select_card_info']['id'] = $find_card['id'];
				$res['select_card_info']['name'] = $find_card['name']; 
				$res['select_card_info']['position'] = $find_card['position']; 
			}	 
			
			$find_website = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$res['website_id'],'status'=>'normal'])->find();
			
			if(!$find_website){ 
				$res['select_website_info'] = []; 
			}else{  
				$res['select_website_info']['id'] = $find_website['id']; 
				$res['select_website_info']['name'] = $find_website['name'];
			} 
		} 
		$res['createtime'] = date('Y-m-d',$res['create_time']); 
		$res['image'] = $this->checkDouhao($res['image']);
		
		foreach($res['image'] as $key => $value){
			$res['image'][$key] = $value? $this->cdnurl($value, true):'';   
		}
		return $this->ok('请求成功',$res); 
    }
}
