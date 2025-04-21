<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
//获取个人印象
class GetImpression extends Base
{
    public function index()
    {
      $impression = Db::name('ttcard_impression')->where('site_id',$this->site_id)->select()->toArray(); 
      if(!$impression){ 
        return $this->ok('请求成功',[]);
      } 
      if(isset($_SERVER['HTTP_TOKEN'])){
        $user_id = $this->checkLogin($_SERVER['HTTP_TOKEN']); 
      }else{
        $user_id = $this->request->param('user_id');
      }
      
      $card_user_id = $this->request->param('card_user_id'); 
      $card_id = $this->request->param('card_id'); 
      
      if(!$card_user_id || !$card_id){
        return $this->ok('请求参数错误',[]);
      } 
        
      foreach($impression as $k=>$v ){
        $find = @Db::name('ttcard_impressionlog')->where('site_id',$this->site_id)->where(['impression_id'=>$v['id'],'card_id'=>$card_id,'user_id'=>$user_id])->find();
        
        if($find){
          $impression[$k]['check'] = 1;
        }else{
          $impression[$k]['check'] = 0;
        }
        $impression[$k]['clickTotal'] = @Db::name('ttcard_impressionlog')->where('site_id',$this->site_id)->where(['impression_id'=>$v['id'],'card_id'=>$card_id])->count();
      }
      return $this->ok('请求成功',$impression);
    }
}
