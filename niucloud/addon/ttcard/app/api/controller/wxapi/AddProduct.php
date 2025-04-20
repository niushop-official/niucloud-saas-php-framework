<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class AddProduct extends BaseAuth
{
    public function index()
    {
        $user_id = $this->_user['id'];
		
		$card_id = $this->request->param('card_id');  
		$website_id = $this->request->param('website_id'); 
		$product_id = $this->request->param('id'); 
		$title = $this->request->param('title'); 
		$price = $this->request->param('price'); 
		$originalprice= $this->request->param('originalprice');  
		$images = $this->request->param('images');   
		$video = $this->request->param('video');   
		$description = $_POST['description'];
		$subtype = $this->request->param('subtype');  
		
		if(!$title){
		 	return $this->err('请输入标题');
		} 
		 
		if(!$images){
		 	return $this->err('请上传产品图片');
		}
		if(!$description){
		 	return $this->err('请输入产品描述');
		}
		
		$map = [];
		$map['site_id'] = $this->site_id; 
		$map['user_id'] = $user_id; 
		$map['title'] = $title; 
		$map['images'] = $images;
		$map['description'] = $description; 
		$map['video'] = $video; 
		$map['price'] = $price; 
		$map['originalprice'] = $originalprice; 
		if($card_id){
		 	$map['card_id'] = $card_id;
		}
		if($website_id && $website_id != 'null '){
		 	$map['website_id'] = $website_id;
		}
		if($subtype == 'editProduct'){
			if(!$product_id){
				return $this->err('参数不正确');
			}
			$res = Db::name('ttcard_product')->where('site_id',$this->site_id)->where(['id'=>$product_id,'user_id'=>$user_id])->update($map);
			if($res ===false){
				return $this->err('网络错误');
			}
			if($res == 0){
				return $this->err('没有更新项');
			}
			return $this->ok('更新产品成功'); 
		}else{ 
		    $map['create_time'] = time();  
			$res = @Db::name('ttcard_product')->insert($map);
			if(!$res){
				return $this->err('添加失败');
			}	
			return $this->ok('添加成功'); 
		}
    }
}
