<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetImagesDetail extends Base
{
    public function index()
    {
      $id = $this->request->param('id'); 
      if(!$id){
        return $this->err('参数错误');
      }
      
      $res = Db::name('ttcard_images')->where('site_id',$this->site_id)->where(['id'=>$id,'status'=>'normal'])->find();
      
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
      }
      $images = []; 
      $arr = $this->checkDouhao($res['images']);
      foreach($arr as $key => $value){
        $images[] = $value?$this->cdnurl($value, true):'';   
      }
      $res['images'] =$images;
      
      return $this->ok('请求成功',$res); 
    }
}
