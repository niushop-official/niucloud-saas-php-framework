<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetRecruit extends Base
{
    public function index()
    {
      $pageCur = $this->request->param('pageCur');
      $limit = $this->request->param('limit');  
      $searchValue = $this->request->param('searchValue'); 
      $source = $this->request->param('source');  
      $checkIndustryId = $this->request->param('checkIndustryId');  
      $pageCur = $pageCur ? $pageCur : 1;
      $limit = $limit ? $limit : 10;
      
      $map_recruit_status = [
        'recruit_status' => 1
      ];
      
      $map = [];
      if($source =='my'){
        $user_id = $this->checkLogin($_SERVER['HTTP_TOKEN']);
        if(!$user_id){
          return $this->err('抱歉，请先登录',[],1000);
        } 
        $map['user_id'] = ['=',$user_id];
        $map_recruit_status = []; 
      }else{
        $user_id = $this->request->param('user_id'); 
        $map['recruit_status'] = ['=',1];   
      } 
      
      $map_industry = [];
      if($checkIndustryId){
        $map_industry['industry_id'] = $checkIndustryId;
      }
      
      $map_position = []; 
      if(trim($searchValue) != ''){
        $map_position['position'] = ['like',"%".$searchValue."%"]; 
      }
      
      
      $res = Db::name('ttcard_recruit')->where('site_id',$this->site_id)->order('id desc')->where($map)->where($map_position)->where($map_industry)->where(['status'=>'normal'])->where($map_recruit_status)->limit($limit)->page($pageCur)->select()->toArray();
    
      if(count($res) == 0){
        return $this->ok();
      }
      
      foreach($res as $k=>&$v){
        $v['tags'] = $this->checkDouhao($v['tags']);
        $v['content'] = mb_substr(strip_tags($v['content']), 0, 50, "UTF-8");
        $v['content'] = str_replace(array('&ldquo;','&rdquo;'),'"',$v['content']);
        
        $v['website'] = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$v['website_id'],'status'=>'normal'])->field('id,logo,phone,name,user_id')->find();
        if(!$v['website']){
          $v['website'] = '';
        }else{
          $v['website']['logo'] = $v['website']['logo'] ? $this->cdnurl($v['website']['logo'], true) : '';  
        }
        
        
        if(strstr($v['city'],'/')){
          $cityArr = explode('/',$v['city']);
          if(count($cityArr) >2){
            $v['city'] = $cityArr[count($cityArr)-2].'/'.$cityArr[count($cityArr)-1];
          }
        } 
        
      } 
      
      return $this->ok('请求成功',$res); 
    }
}
