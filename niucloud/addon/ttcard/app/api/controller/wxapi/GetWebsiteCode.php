<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetWebsiteCode extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
        
      $website_id = $this->request->param('website_id');
      if(!$website_id){
        return $this->err('参数错误');
      }
              
      $findWebsite = Db::name('ttcard_website')->where('site_id',$this->site_id)->where('user_id',$user_id)->where(['id'=>$website_id,'status'=>'normal'])->find();
      if(!$findWebsite){
        return $this->err('查询微官网信息失败');
      }
      
      $findUser = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$findWebsite['user_id'],'status'=>'normal'])->find();
      if(!$findUser){
        return $this->err('当前用户信息不正确');
      } 
      
      $getConfig = $this->get_addon_config();
      if($getConfig && $getConfig['vip_switch'] == 1 && !in_array($findUser['ordertype_id'],[8,9,10,11])){
        return $this->err('您好，请先升级SVIP会员');
      }
      
      if(trim($findWebsite['minicode_image'])){
        return $this->ok('请求成功',['minicode_image'=>$this->cdnurl($findWebsite['minicode_image'],true)]);
      }
        
      $code = $this->getMiniAppCode('ttcard_website',$website_id,'pages/addCard/index');
      if(!$code){
        return $this->err('生成小程序码失败');
      }
      return $this->ok('请求成功',['minicode_image'=>$code]);
    }
}
