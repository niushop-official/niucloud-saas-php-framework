<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetConnections extends Base
{
    public function index()
    {
      $pageCur = $this->request->param('pageCur'); 
      $limit = $this->request->param('limit'); 
      $searchValue = $this->request->param('searchValue'); 
      $checkIndustryId = $this->request->param('checkIndustryId');  
      $pageCur = $pageCur ? $pageCur : 1; 
      $limit = $limit ? $limit : 10; 
       
       
      $map_industry = [];
      if($checkIndustryId){
        $map_industry['industry_id'] = $checkIndustryId;
      }
       
      $res = Db::name('ttcard_card')
      ->where('site_id',$this->site_id)
      ->order('weigh desc')
      ->order('recommend desc')
      ->order('id desc')
      ->where('name|position|tags','like',"%".$searchValue."%")
      ->where($map_industry)
      ->where(['status'=>'normal','auditing_status'=>'1','connections_status'=>1])
      ->limit($limit)->page($pageCur)->select()->toArray();
       
      if(!$res){
        return $this->err('请求失败');
      }
     
      foreach($res as $k=>&$v){
        $v['tags'] = $this->checkDouhao($v['tags']); 
              
              $v['description'] = mb_substr(strip_tags($v['description']), 0, 50, "UTF-8");
        $v['description'] = str_replace(array('&ldquo;','&rdquo;'),'"',$v['description']);
                      
        if($v['avatar']){
           $v['avatar']  = $v['avatar']?$this->cdnurl($v['avatar'], true):'';
        }
        
        $findIndustry = Db::name('ttcard_industry') 
        ->where('site_id',$this->site_id)
        ->where(['status'=>'normal','id'=>$v['industry_id']])
        ->find();
        if($findIndustry){
          $v['industry_name'] = $findIndustry['name'];
        }else{
          $v['industry_name'] = '';
        }
        
        $select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$v['user_id'],'ordertype_id'=>1,'status'=>'normal','examine_status'=>1])->field('ordertype_id,examine_status,id')->find();
        $v['authentication_info']['geren_authentication'] = $select_authentication ? 1 : 0;  
      }
      
      return $this->ok('请求成功',$res); 
    }
}
