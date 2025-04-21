<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
//新建名片
class AddCard extends BaseAuth
{
    public function index()
    {
      $user_id = $user_id = $this->_user['id'];

      $getConfig = $this->get_addon_config();
      
      $subtype = $this->request->param('subtype'); 
      if($subtype == 'editCard'){
        $card_id = $this->request->param('id');  
        if(!$card_id){
          return $this->err('抱歉，参数不正确');
        }
      }else{
        
        $findUser = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$user_id,'status'=>'normal'])->find();
        if(!$findUser){
          return $this->err('当前用户信息不正确');
        }
        
        $findOrdertype = Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where(['real_id'=>$findUser['ordertype_id'],'status'=>'normal'])->find();
        if(!$findOrdertype){
          return $this->err('查询当前用户会员等级信息失败');
        }
        
        if($getConfig && $getConfig['vip_switch'] == 1){
          
          $cardTotal = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'status'=>'normal'])->count();
          
          if($cardTotal >= $findOrdertype['create_card_num'] && $findOrdertype['create_card_num'] != -1 && $findOrdertype['id'] != 7  && $findOrdertype['id'] != 11){
            
            return $this->err('抱歉，您当前的会员等级只能创建 '.($findOrdertype['create_card_num']?$findOrdertype['create_card_num']:'0').' 张名片');
          }
        } 
      }
        
      $card_bg_id = $this->request->param('card_bg_id'); 
      $industry_id = $this->request->param('industry_id'); 
      $card_diy_bg = $this->request->param('card_diy_bg'); 
      $avatar = $this->request->param('avatar');   
      $name = $this->request->param('name');  
      $gender = $this->request->param('gender');  
      $phone = $this->request->param('phone');  
      $position = $this->request->param('position');  
      $tags = $this->request->param('tags');  
      $address = $this->request->param('address');  
      $email = $this->request->param('email');  
      $wechat_num = $this->request->param('wechat_num');  
      $video = $this->request->param('video');  
      $wechat_code_image = $this->request->param('wechat_code_image');  
      $description = $_POST['description'];  
      $default_status = $this->request->param('default_status');   
      $connections_status = $this->request->param('connections_status');    
       
      if(!$avatar){
         return $this->err('请上传头像');
      }
      if(!strstr($avatar,'.')){
         return $this->err('头像上传错误');
      }
     
      if(!$name){
         return $this->err('请输入姓名');
      }
      if($gender != 0 && $gender != 1){
         return $this->err('请选择性别');
      }
     
      if(!$phone){
         return $this->err('请输入手机号');
      }
      if(!$industry_id){
         return $this->err('请选择行业分类');
      }
      if(!$position){
         return $this->err('请输入职位');
      }
      if(!$tags){
         return $this->err('请输入个人标签，例如：电商，人工智能，美容护肤');
      } 
     
      if(!$description){
         return $this->err('请输入产品描述');
      }
      
      $map = [];
      $map['site_id'] = $this->site_id; 
      $map['user_id'] = $user_id;
      $map['card_bg_id'] = $card_bg_id; 
      $map['industry_id'] = $industry_id; 
      $map['avatar'] = $avatar; 
      $map['name'] = $name;
      $map['gender'] = $gender; 
      $map['phone'] = $phone; 
      $map['position'] = $position; 
      $map['tags'] = $tags; 
      $map['address'] = $address; 
      $map['email'] = $email; 
      $map['wechat_num'] = $wechat_num;
      $map['video'] = $video;
      $map['description'] = $description;
      $map['wechat_code_image'] = $wechat_code_image; 
      $map['default_status'] = $default_status;  
      $map['connections_status'] = $connections_status;  
      $map['card_diy_bg'] = $card_diy_bg; 
      //0审核中，1通过，2拒绝
      $map['auditing_status'] = $getConfig['addCard_switch'] == 1 ? '0' : '1';
       
      if($subtype == 'editCard'){  
        $res = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['id'=>$card_id,'user_id'=>$user_id])->update($map);
        if($res ===false){
          return $this->err('网络错误');
        }
        if($res == 0){
          return $this->err('没有更新项');
        }
        return $this->ok('更新名片成功'); 
      }else{ 
        
        if(Db::name('ttcard_card')->where('site_id',$this->site_id)->where($map)->find()){
          return $this->err('您已创建过同样的名片，请不要重复创建');
        }
          $map['createtime'] = time(); 
        
        // 是否扫微官网小程序邀请码后创建的名片
        $from_website_id = $this->request->param('from_website_id'); 
        if($from_website_id){
          $findiInvite = Db::name('ttcard_invite')->where('site_id',$this->site_id)->where(['from_website_id'=>$from_website_id,'to_user_id'=>$user_id,'status'=>'normal'])->find();
          if($findiInvite){
            return $this->err('你已被此微官网邀请过');
          }
          
        }
          
        $card_id = Db::name('ttcard_card')->insertGetId($map);
        if(!$card_id){
          return $this->err('名片创建失败');
        }	
        
        
        if($from_website_id){ 
          
          $findWebsite = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$from_website_id,'status'=>'normal'])->find();
          if(!$findWebsite){
            return $this->err('查询邀请者的微官网信息失败');
          }
           
          $invite_map = [
            'site_id'=>$this->site_id,
            'from_user_id'=>$findWebsite['user_id'],
            'from_website_id'=>$from_website_id,
            'to_user_id'=>$user_id,
            'to_user_card_id'=>$card_id, 
            'createtime'=>time()
          ];
          $inviteInsert = Db::name('ttcard_invite')->insert($invite_map);
          if(!$inviteInsert){
            return $this->err('名片创建成功，但邀请信息写入失败');
          }
        }
         
        return $this->ok('名片创建成功'); 
      }
    }
}
