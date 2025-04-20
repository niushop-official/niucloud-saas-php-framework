<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetCollect extends Base
{
    public function index()
    {
      $card_id = $this->request->param('card_id'); 
		
      $collect = [];
      $collect['collectTotal'] = Db::name('ttcard_collect')->where('site_id',$this->site_id)->where(['card_id'=>$card_id])->count();
      
      if(!isset($_SERVER['HTTP_TOKEN'])){ 
        $collect['collectStatus'] = 0;
        return $this->ok('请求成功',$collect); 
      }else{
        $user_id = $this->checkLogin($_SERVER['HTTP_TOKEN']);
      }
      
      $find = Db::name('ttcard_collect')->where('site_id',$this->site_id)->where(['card_id'=>$card_id,'user_id'=>$user_id])->find();
      if($find){
        $collect['collectStatus'] = 1;
      }else{ 
        $collect['collectStatus'] = 0;
      }

      return $this->ok('请求成功',$collect);
    }
}
