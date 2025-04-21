<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class ClickImpression extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $impression_id = $this->request->param('impression_id');  
      $card_id = $this->request->param('card_id');  
      if(!$card_id || !$impression_id){
        return $this->err('请求参数不正确');
      }
      
      $find = Db::name('ttcard_impressionlog')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'card_id'=>$card_id,'impression_id'=>$impression_id])->find();
      
      if($find){
        $res = Db::name('ttcard_impressionlog')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'card_id'=>$card_id,'impression_id'=>$impression_id])->delete();
        if(!$res){
          return $this->err('取消个人印象失败');
        } 
        return $this->ok('取消个人印象成功');
      }else{
        $map = [
          'site_id'=>$this->site_id,
          'create_time'=>time(),
          'user_id'=>$user_id,
          'card_id'=>$card_id,
          'impression_id'=>$impression_id,
        ];
        $res = Db::name('ttcard_impressionlog')->insert($map);
        
        if(!$res){
          return $this->err('提交个人印象失败');
        } 
        $map_log = [
          'site_id'=>$this->site_id,
          'type'=>'impression',
          'card_id'=>$card_id,
          'create_time'=>time(),
          'ip'=>request()->ip(),
        ];
        @Db::name('ttcard_statistics')->insert($map_log);
        return $this->ok('提交个人印象成功');
      }
    }
}
