<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
//创建微官网
class AddWebsite extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $website_id = $this->request->param('id'); 
      $card_id = $this->request->param('card_id');   
      $name = $this->request->param('name');   
      $weixin_image = $this->request->param('weixin_image');   
      $wechat_num = trim($this->request->param('wechat_num'));   
      $phone = $this->request->param('phone');   
      $industry_id = $this->request->param('industry_id');   
      $name = $this->request->param('name');   
      $address = trim($this->request->param('address'));  
      $video = $this->request->param('video');  
      $logo = $this->request->param('logo');  
      $swiper_images = $this->request->param('swiper_images');  
      $images = $this->request->param('images');  
      $description = $_POST['description'];  
      $subtype = $this->request->param('subtype'); 
        
      if(!$name){
        return $this->err('请输入企业名称');
      } 
      if(!trim($phone)){
          return $this->err('请输入企业电话');
      }
      if(!$industry_id){
          return $this->err('请选择行业分类');
      }
      // if(!$card_id){
      //  	return $this->err('请先绑定名片');
      // } 
      if(!$logo){
        return $this->err('请上传企业LOGO');
      }
      if(!$images){
        return $this->err('请上传企业图片');
      }
      if(!$description){
        return $this->err('请输入企业简介');
      }
      
      $map = [];
      $map['site_id'] = $this->site_id; 
      $map['user_id'] = $user_id;
      $map['name'] = $name; 
      $map['industry_id'] = $industry_id; 
      
      $map['card_id'] = $card_id; 
      $map['team_card_ids'] = $card_id; 
      $map['logo'] = $logo;   
      $map['images'] = $images; 
      $map['description'] = $description; 
      
      $map['video'] = $video?$video:'';
      $map['swiper_images'] = $swiper_images?$swiper_images:'';
      $map['address'] = $address?$address:'';
      $map['phone'] = $phone?$phone:'';
      $map['wechat_num'] = $wechat_num?$wechat_num:'';
      $map['weixin_image'] = $weixin_image?$weixin_image:'';
      
      if($subtype == 'editWebsite'){ 
        if(!$website_id){
          return $this->err('参数不正确');
        }
        $res = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$website_id,'user_id'=>$user_id])->update($map);
        if($res ===false){
          return $this->err('网络错误');
        }
        if($res == 0){
          return $this->err('没有更新项');
        }
        return $this->ok('更新微官网成功'); 
      }else{
        
        $map['create_time'] = time();
        $findUser = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$user_id,'status'=>'normal'])->find();
        if(!$findUser){
          return $this->err('当前用户信息不正确');
        }
          
        $getConfig = $this->get_addon_config();
        if($getConfig && $getConfig['vip_switch'] == 1 && !in_array($findUser['ordertype_id'],[8,9,10,11])){
          return $this->err('您好，请先升级SVIP会员');
        }
        
        
        $findOrdertype = Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where(['real_id'=>$findUser['ordertype_id'],'status'=>'normal'])->find();
        if(!$findOrdertype){
          return $this->err('查询当前用户会员等级信息失败');
        }
        
        if($getConfig && $getConfig['authentication_switch'] == 1){
          $websiteTotal = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'status'=>'normal'])->count();
          if($websiteTotal >= $findOrdertype['create_website_num'] && $findOrdertype['create_website_num'] != -1 && $findUser['ordertype_id'] != 7  && $findUser['ordertype_id'] != 11){
            return $this->err('抱歉，您当前的会员等级只能创建 '.($findOrdertype['create_website_num']?$findOrdertype['create_website_num']:'0').' 个微官网');
          }
        }
        
        
        
        $res = @Db::name('ttcard_website')->insert($map);
        if(!$res){
          return $this->err('创建失败');
        }	
        return $this->ok('创建成功'); 
      }
    }
}
