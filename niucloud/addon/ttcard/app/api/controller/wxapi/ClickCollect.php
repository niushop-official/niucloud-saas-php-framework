<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class ClickCollect extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $card_id = $this->request->param('card_id');  
      if(!$card_id){
        return $this->err('请求参数不正确');
      }
      
      $find = Db::name('ttcard_collect')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'card_id'=>$card_id])->find();
      
      if($find){
        $res = Db::name('ttcard_collect')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'card_id'=>$card_id])->delete();
        if(!$res){
          return $this->err('取消失败');
        } 
        return $this->ok('取消成功');
      }else{
        $map = [
          'site_id'=>$this->site_id,
          'create_time'=>time(),
          'user_id'=>$user_id,
          'card_id'=>$card_id,
        ];
        $res = Db::name('ttcard_collect')->insert($map);
          
        if(!$res){
          return $this->err('收藏失败');
        } 
        return $this->ok('收藏成功');
      } 
    }
}
