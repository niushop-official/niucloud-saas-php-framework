<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetImages extends Base
{
    public function index()
    {
      $pageCur = $this->request->param('pageCur');
      $limit = $this->request->param('limit');  
      $pageCur = $pageCur ? $pageCur : 1;
      $limit = $limit ? $limit : 10;
      
      if(isset($_SERVER['HTTP_TOKEN'])){
        $user_id = $this->checkLogin($_SERVER['HTTP_TOKEN']);
        if(!$user_id){
          return $this->err('抱歉，请先登录',[],1000);
        } 
      }else{
        $user_id = $this->request->param('user_id');  
        if(!$user_id){
          return $this->err('请求参数不正确');
        }  
      } 
      
      $res = Db::name('ttcard_images')->where('site_id',$this->site_id)->order('id desc')->where(['user_id'=>$user_id,'status'=>'normal'])->limit($limit)->page($pageCur)->select()->toArray();
      
      if(!$res){
        return $this->ok();
      }
      
      foreach($res as $k => $v){
        $images = [];
        $arr = $this->checkDouhao($v['images']);
        foreach($arr as $key => $value){
          $images[] = $value?$this->cdnurl($value, true):'';   
        }
        $res[$k]['images'] =$images;
      }
      
      return $this->ok('请求成功',$res); 
    }
}
