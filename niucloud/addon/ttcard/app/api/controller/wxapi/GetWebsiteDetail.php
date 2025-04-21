<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
//获取微官网详情
class GetWebsiteDetail extends Base
{
    public function index()
    {
      $user_id = $this->request->param('user_id');  
      $website_id = $this->request->param('website_id');   
      
      if(!$website_id){
        return $this->err('请求参数不正确');
      }
      
      $res = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['status'=>'normal','id'=>$website_id])->find();
        
      if(!$res){
        return $this->err('请求失败');
      }  
      
      $miniappHiddenInformation = $this->get_addon_config()['miniappHiddenInformation'];
      if($miniappHiddenInformation == 0){
        $res['phone'] = preg_replace('/(\d{3})\d{4}(\d{4})/', '$1****$2', $res['phone']); 
        $res['wechat_num'] = substr_replace($res['wechat_num'], str_repeat('*', 4), 3, 4);
        $res['weixin_image'] = '';
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
      
      $res['logo'] = $res['logo']?$this->cdnurl($res['logo'],true):''; 
      $res['weixin_image'] = $this->checkDouhao($res['weixin_image']);
      $res['swiper_images'] = $this->checkDouhao($res['swiper_images']);
      $res['images'] = $this->checkDouhao($res['images']);
      if(!$res['address'] || $res['address'] == 'null ' || $res['address'] == 'null'){
        $res['address'] = '';
      } 
      if(!$res['wechat_num'] || $res['wechat_num'] == 'null ' || $res['wechat_num'] == 'null'){
        $res['wechat_num'] = '';
      }
      if($res['video'] && $res['video'] != 'null '){
        $res['video'] = $res['video']?$this->cdnurl($res['video'], true):'';  	
      }else{
        $res['video'] = ''; 	 
      }
      
      foreach($res['weixin_image'] as $key => &$l){  
        $l = $l?$this->cdnurl($l, true):'';  
      }
      foreach($res['swiper_images'] as $key => &$vo){  
        $vo = $vo?$this->cdnurl($vo, true):'';  
      }
      
      foreach($res['images'] as $key => &$p){
        $p = $p?$this->cdnurl($p, true):'';  
      }
      
      
      $res['short_description'] = mb_substr(strip_tags($res['description']), 0, 50, "UTF-8");
      $res['short_description'] = str_replace(array('&ldquo;','&rdquo;'),'"',$res['short_description']);
      
      $res['news'] = @Db::name('ttcard_news')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'website_id'=>$website_id,'status'=>'normal'])->order('id desc')->limit(3)->select()->toArray();
      foreach($res['news'] as $key =>$value){
        $arr  = $this->checkDouhao($value['image']);
        foreach($arr as $k =>$v){
          $arr[$k] = $v?$this->cdnurl($v, true):''; 
        }
        $res['news'][$key]['image'] = $arr;
        $res['news'][$key]['createtime'] = date('Y-m-d',$value['create_time']);
      }
      
      $res['case'] = @Db::name('ttcard_cases')->where('site_id',$this->site_id)->where(['website_id'=>$res['id'],'status'=>'normal'])->order('id desc')->limit(1)->select()->toArray();
      foreach($res['case'] as $key =>$value){
        $arr  = $this->checkDouhao($value['images']);
        foreach($arr as $k =>$v){
          $arr[$k] = $v?$this->cdnurl($v, true):''; 
        }
        $res['case'][$key]['images'] = $arr;
      }
      
      $res['product'] = @Db::name('ttcard_product')->where('site_id',$this->site_id)->where(['website_id'=>$res['id'],'status'=>'normal'])->order('id desc')->limit(2)->select()->toArray(); 
      
      foreach($res['product'] as $key =>$value){
        $arr  = $this->checkDouhao($value['images']);
        foreach($arr as $k =>$v){
          $arr[$k] =  $this->cdnurl($v, true); 
        }
        $res['product'][$key]['images'] = $arr;
        $res['product'][$key]['price'] = floatval($res['product'][$key]['price']);
        $res['product'][$key]['originalprice'] = floatval($res['product'][$key]['originalprice']);
      }
      
      
      $programme = Db::name('ttcard_programme')->where('site_id',$this->site_id)->order('id desc')->where(['website_id'=>$res['id'],'status'=>'normal'])->select()->toArray();
      
      if($programme){
        $res['programme'] = $programme;
      } 
      
      // 获取当前微官网的认证状态
      $select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'website_id'=>$website_id,'examine_status'=>1,'status'=>'normal','ordertype_id'=>2])->field('ordertype_id,examine_status,id')->find(); 
      $res['authentication_info']['website_authentication'] = $select_authentication ? 1 : 0;
        
      $findIndustry = Db::name('ttcard_industry')->where('site_id',$this->site_id)->where(['id'=>$res['industry_id'],'status'=>'normal'])->find();
      $res['industry_name'] = $findIndustry ? $findIndustry['name'] : '';
      
      return $this->ok('请求成功',$res); 
    }
}
