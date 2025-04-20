<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetProductDetail extends Base
{
    public function index()
    {
        $id = $this->request->param('id');   
		if(!$id){
			return $this->err('参数不正确');
		}
		
		$res = Db::name('ttcard_product')->where('site_id',$this->site_id)->where(['id'=>$id,'status'=>'normal'])->find(); 
		if(!$res){
			return $this->err('查询产品信息失败');
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
		
		$res['images'] = $this->checkDouhao($res['images']);
		
		foreach($res['images'] as $key => &$value){
			$value = $this->cdnurl($value, true);  
		}
 
		$res['price'] = floatval($res['price']);
		$res['originalprice'] = floatval($res['originalprice']);
	
		if($res['video']){
			$res['video'] = $res['video']?$this->cdnurl($res['video'], true):'';  
		}
		return $this->ok('请求成功',$res); 
    }
}
