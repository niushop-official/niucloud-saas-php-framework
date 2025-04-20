<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class AddImages extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $images = $this->request->param('images');   
      $images_id = $this->request->param('images_id');
      $card_id = $this->request->param('card_id'); 
      $subtype = $this->request->param('subtype'); 
        
      if(!$images){
        return $this->err('请至少上传一张图片');
      }
      
      if($subtype == 'editImages'){
        $map = [
          'images'=>$images,
          'card_id'=>$card_id
        ];
        if(!$images_id){
          return $this->err('参数不正确');
        }
        $res = Db::name('ttcard_images')->where('site_id',$this->site_id)->where(['id'=>$images_id,'user_id'=>$user_id])->update($map);
        if($res ===false){
          return $this->err('网络错误');
        }
        if($res == 0){
          return $this->err('没有更新项');
        }
        return $this->ok('更新相册成功'); 
      }else{
        $map = [
          'create_time'=>time(), 
          'images'=>$images,
          'site_id'=>$this->site_id,
          'user_id'=>$user_id,
          'card_id'=>$card_id
        ];
        $res = @Db::name('ttcard_images')->insert($map);
        if(!$res){
          return $this->err('添加失败');
        }	
        return $this->ok('添加成功'); 
      } 
    }
}
