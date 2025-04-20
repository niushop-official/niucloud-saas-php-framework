<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetWebsiteList extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      $pageCur = $this->request->param('pageCur');
      $limit = $this->request->param('limit');  
      $pageCur = $pageCur ? $pageCur : 1;
      $limit = $limit ? $limit : 10;
      if(!$user_id){
        return $this->err('请求参数不正确');
      }
      
      $res = Db::name('ttcard_website')->where('site_id',$this->site_id)->order('id desc')->where(['user_id'=>$user_id,'status'=>'normal'])->limit($limit)->page($pageCur)->select()->toArray();
      
      if($res === false){
        return $this->err('网络错误');
      }
      if(count($res) == 0){
        return $this->ok('请求成功',[]); 
      }
      foreach($res as $k=>$v){ 
      
        // 获取当前微官网的认证状态
        $select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$v['user_id'],'website_id'=>$v['id'],'status'=>'normal','ordertype_id'=>2])->field('ordertype_id,examine_status,id')->find(); 
        
        $res[$k]['authentication_info'] = $select_authentication ? $select_authentication : ''; 
        
        $res[$k]['description'] = mb_substr(strip_tags($res[$k]['description']), 0, 50, "UTF-8");
        $res[$k]['description'] = str_replace(array('&ldquo;','&rdquo;'),'"',$res[$k]['description']);
          
        $res[$k]['images'] = [];
        if($v['images']){
          $images = $this->checkDouhao($v['images']);
          if(count($images) > 0){
            foreach($images as $key => $value){
              $images[$key] = $value?$this->cdnurl($value,true):'';
            }
          }
          $res[$k]['images'] = $images;
        }
        $res[$k]['swiper_images'] = [];
        if($v['swiper_images']){
          $swiper_images = $this->checkDouhao($v['swiper_images']);
          if(count($swiper_images) > 0){
            foreach($swiper_images as $key => $value){
              $swiper_images[$key] = $value?$this->cdnurl($value,true):'';
            }
          }
          $res[$k]['swiper_images'] = $swiper_images;
        }
        $res[$k]['logo'] = $res[$k]['logo']?$this->cdnurl($res[$k]['logo'],true):'';
        $res[$k]['video'] = $res[$k]['video']?$this->cdnurl($res[$k]['video'],true):'';
        $res[$k]['weixin_image'] = $res[$k]['weixin_image']?$this->cdnurl($res[$k]['weixin_image'],true):''; 
        
        $findIndustry = Db::name('ttcard_industry')->where('site_id',$this->site_id)->where(['id'=>$res[$k]['industry_id'],'status'=>'normal'])->find();
        $res[$k]['industry_name'] = $findIndustry ? $findIndustry['name'] : '';
      } 
      
      return $this->ok('请求成功',$res); 
    }
}
