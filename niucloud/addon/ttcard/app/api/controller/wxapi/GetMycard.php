<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
//获取我的名片列表 
class GetMycard extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $sourceUrl = $this->request->param('sourceUrl');
      $pageCur = $this->request->param('pageCur');
      $limit = $this->request->param('limit'); 
      $searchValue = $this->request->param('searchValue'); 
      $pageCur = $pageCur ? $pageCur : 1; 
      $limit = $limit ? $limit : 10; 
      
      
      $map_name = [];
      $map_position = [];
      $map_tags = [];
      if(trim($searchValue) != ''){
        $map_name['name'] = ['like',"%".$searchValue."%"];
        $map_position['position'] = ['like',"%".$searchValue."%"];
        $map_tags['tags'] = ['like',"%".$searchValue."%"];
      }
      
      $map_sourceUrl = []; 
      $map_user = [];
      if($sourceUrl != 'my'){
        $map_sourceUr['connections_status'] ='1'; 
      }else{ 
        $map_user['user_id'] = $user_id;
      }
      
      $res = Db::name('ttcard_card')
      ->where('site_id',$this->site_id)
      ->order('id desc')
      ->where($map_user)
      ->whereOr($map_name)
      ->whereOr($map_position)
      ->whereOr($map_tags)
      ->where($map_sourceUrl)
      ->where(['status'=>'normal'])
      ->limit($limit)->page($pageCur)->select()->toArray();
      
      if(!$res){
        return $this->err('请求失败');
      }
      if(count($res) == 0){
        return $this->ok('请求成功',[]); 
      }
      foreach($res as $k=>&$v){
        $v['tags'] = $this->checkDouhao($v['tags']);
        $v['avatar'] = $v['avatar'] ? $this->cdnurl($v['avatar'], true):'';  
        
        $v['description'] = mb_substr(strip_tags($v['description']), 0, 50, "UTF-8");
        $v['description'] = str_replace(array('&ldquo;','&rdquo;'),'"',$v['description']);
                
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
        
        $findInvite = DB::name('ttcard_invite')->where('site_id',$this->site_id)->where(['to_user_card_id'=>$v['id'],'status'=>'normal'])->find();
        if($findInvite){
          $findWebsite = DB::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$findInvite['from_website_id'],'status'=>'normal'])->find();
          if($findWebsite){
            $v['from_website_name'] = $findWebsite['name'];
          }
        }
        
      }
      
      return $this->ok('请求成功',$res); 
    }
}
