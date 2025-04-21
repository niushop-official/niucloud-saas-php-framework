<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
//添加成功案例
class AddCase extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $case_id = $this->request->param('id');  
      $card_id = $this->request->param('card_id');  
      $website_id = $this->request->param('website_id');  
      $title = $this->request->param('title'); 
      $video = $this->request->param('video');   
      $description = $_POST['description']; 
      $images = $this->request->param('images');  
      $subtype = $this->request->param('subtype');    
      
      if(!$title){
        return $this->err('请输入标题');
      } 
      if(!$images){
        return $this->err('请上传案例图片');
      }
      if(!$description){
        return $this->err('请输入案例描述');
      }  
      $map = [];
      $map['site_id'] = $this->site_id; 
      $map['user_id'] = $user_id;  
      $map['title'] = $title; 
      $map['description'] = $description; 
      $map['images'] = $images;
      $map['video'] = $video;
      
      if($card_id){
        $map['card_id'] = $card_id;
      }
      if($website_id && $website_id != 'null '){
        $map['website_id'] = $website_id;
      }
      
      if($subtype == 'editCase'){ 
        if(!$case_id){
          return $this->err('参数不正确');
        }
        $res = Db::name('ttcard_cases')->where('site_id',$this->site_id)->where(['id'=>$case_id,'user_id'=>$user_id])->update($map);
        if($res ===false){
          return $this->err('网络错误');
        }
        if($res == 0){
          return $this->err('没有更新项');
        }
        return $this->ok('更新成功'); 
      }else{
        $map['create_time'] = time();  
        $res = @Db::name('ttcard_cases')->insert($map);
        if(!$res){
          return $this->err('添加失败');
        }	
        return $this->ok('添加成功'); 
      }
    }
}
