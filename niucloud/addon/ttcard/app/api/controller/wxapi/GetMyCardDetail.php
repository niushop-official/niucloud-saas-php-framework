<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
//获取名片详情
class GetMyCardDetail extends Base
{
    public function index()
    {
      $card_id = $this->request->param('card_id');  
      $user_id = $this->request->param('user_id');  
      $share = $this->request->param('share'); 
      
      if(!$card_id){
        return $this->err('参数错误');
      }
      
      $res = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['id'=>$card_id,'status'=>'normal','auditing_status'=>'1'])->find();
      
      if(!$res){
        return $this->err('名片已下架或在审核中');
      }  
        
      $data = []; 
      $miniappHiddenInformation = $this->get_addon_config()['miniappHiddenInformation'];
      if($miniappHiddenInformation == 0){
        $res['phone'] = preg_replace('/(\d{3})\d{4}(\d{4})/', '$1****$2', $res['phone']);
        $res['email'] = substr_replace($res['email'], str_repeat('*', 4), 3, 4);
        $res['wechat_num'] = substr_replace($res['wechat_num'], str_repeat('*', 4), 3, 4); 
        $res['wechat_code_image'] = '';
      }
        
          
          $res['short_description'] = mb_substr(strip_tags($res['description']), 0, 50, "UTF-8");
      $res['short_description'] = str_replace(array('&ldquo;','&rdquo;'),'"',$res['short_description']);
                  
          $res['card_diy_bg'] = $res['card_diy_bg']? $this->cdnurl($res['card_diy_bg'], true):'';       		 $res['video'] = $res['video']? $this->cdnurl($res['video'], true):'';
      
      if($res['industry_id']){
          $findIndustry = Db::name('ttcard_industry')->where('site_id',$this->site_id)
        ->where(['status'=>'normal','id'=>$res['industry_id']])
        ->find();
        $res['industry_name'] = $findIndustry ? $findIndustry['name'] :'';
      }
      
      $find_cardbackground = @Db::name('ttcard_cardbackground')->where('site_id',$this->site_id)->where(['id'=>$res['card_bg_id']])->find(); 
      $res['cardbackground'] = $find_cardbackground && $find_cardbackground['image']?$this->cdnurl($find_cardbackground['image'], true):''; 
      
      $res['tags'] = $this->checkDouhao($res['tags']);
      
      $res['wechat_code_image'] = $res['wechat_code_image']?$this->cdnurl($res['wechat_code_image'], true):'';
      $res['avatar'] = $res['avatar']? $this->cdnurl($res['avatar'], true):''; 
      
      
      $res['view_total'] = @Db::name('ttcard_statistics')->where('site_id',$this->site_id)->where(['card_id'=>$card_id,'type'=>'views'])->count(); 
      $res['today_view_total'] = @Db::name('ttcard_statistics')->where(['card_id'=>$card_id,'type'=>'views'])->whereTime('create_time', 'today')->count();   
      
      $s_map= [];
      $s_map['card_id'] = ['=',$card_id];
      $s_map['type'] = ['=','views'];
      $s_map['from_user_id'] = ['neq',$res['user_id']]; 
      $viewsArr = $this ->getViewsList($s_map,1,3);  
      $view_avatars = [];
      foreach ($viewsArr as $k => $v){
          $findUser = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$v['from_user_id'],'status'=>'normal'])->find();  
        $view_avatars[$k] = $findUser && $findUser['avatar']?$this->cdnurl($findUser['avatar'], true):'';  
      }
      $res['view_avatars'] = array_reverse($view_avatars);
      
      $res['news'] = @Db::name('ttcard_news')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'card_id'=>$card_id,'status'=>'normal'])->order('id desc')->limit(3)->select()->toArray(); 
      foreach($res['news'] as $key =>$value){
        $arr  = $this->checkDouhao($value['image']);
        foreach($arr as $k =>$v){
          $arr[$k] = $v?$this->cdnurl($v, true):''; 
        }
        $res['news'][$key]['image'] = $arr;
        $res['news'][$key]['createtime'] = date('Y-m-d',$value['create_time']);
      }
      
      $res['case'] = @Db::name('ttcard_cases')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'card_id'=>$card_id,'status'=>'normal'])->order('id desc')->limit(1)->select()->toArray(); 
      foreach($res['case'] as $key =>$value){
        $arr  = $this->checkDouhao($value['images']);
        foreach($arr as $k =>$v){
          $arr[$k] = $v?$this->cdnurl($v, true):''; 
        }
        $res['case'][$key]['images'] = $arr;
      }
      
      $res['product'] = @Db::name('ttcard_product')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'card_id'=>$card_id,'status'=>'normal'])->order('id desc')->limit(2)->select()->toArray(); 
      
      foreach($res['product'] as $key =>$value){
        $res['product'][$key]['price'] = floatval($res['product'][$key]['price']);
        $res['product'][$key]['originalprice'] = floatval($res['product'][$key]['originalprice']);
        $arr  = $this->checkDouhao($value['images']);
        foreach($arr as $k =>$v){
          $arr[$k] = $v?$this->cdnurl($v, true):''; 
        }
        $res['product'][$key]['images'] = $arr;
      }
      
      
      $findImages = Db::name('ttcard_images')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'card_id'=>$card_id,'status'=>'normal'])->find();
      if($findImages){
        
        $images_arr  = $this->checkDouhao($findImages['images']);
        $i_arr = [];
        foreach($images_arr as $k =>$v){
          $i_arr[$k] = $v?$this->cdnurl($v, true):'';  
        }
        $res['images'] = $i_arr;
        $res['images_id'] = $findImages['id'];
      }
        
    
      $website_self = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['card_id'=>$res['id'],'status'=>'normal'])->find();
          
      $res['website'] = '';
      $website = [];
      if($website_self){ 
        $website['id'] = $website_self['id'];
        $website['name'] = $website_self['name'];
        $website['logo'] = $this->cdnurl($website_self['logo'], true);  
        $plainText = strip_tags($website_self['description']);     
        $website['description'] = mb_substr($plainText, 0, 30, 'UTF-8');
        $findIndustry = Db::name('ttcard_industry')->where('site_id',$this->site_id)->where(['id'=>$website_self['industry_id'],'status'=>'normal'])->find();
        $website['industry_name'] = $findIndustry ? $findIndustry['name'] : '';
        $res['website'] = $website; 
      }
      
      $findInvite = Db::name('ttcard_invite')->where('site_id',$this->site_id)->where(['to_user_card_id'=>$card_id,'status'=>'normal'])->find();
      if($findInvite){
        $findFromWebsite = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$findInvite['from_website_id'],'status'=>'normal'])->find();
        if($findFromWebsite){
          $website['id'] = $findFromWebsite['id'];
          $website['name'] = $findFromWebsite['name'];
          $website['logo'] = $this->cdnurl($findFromWebsite['logo'], true);
          $plainText = strip_tags($findFromWebsite['description']);     
          $website['description'] = mb_substr($plainText, 0, 30, 'UTF-8');
          $findIndustry = Db::name('ttcard_industry')->where('site_id',$this->site_id)->where(['id'=>$findFromWebsite['industry_id'],'status'=>'normal'])->find();
          $website['industry_name'] = $findIndustry ? $findIndustry['name'] : '';
          $res['website'] = $website;
        } 
      }  
      
      $res['collectStatus'] = @Db::name('ttcard_collect')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'card_id'=>$card_id])->find(); 
      
      if($share == 1){
        $share_map = [
          'create_time'=>time(),
          'ip'=> request()->ip(),
          'card_id'=> $card_id,
          'site_id'=> $this->site_id,
          'type'=> 'share'//名片分享
        ];
        @Db::name('ttcard_statistics')->insert($share_map); 
      }
      
      // 获取当前名片的认证状态 
      $findWebsite = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'card_id'=>$card_id,'status'=>'normal'])->find();
      
      if($findWebsite){
        $findQiye_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'website_id'=>$findWebsite['id'],'ordertype_id'=>2,'status'=>'normal','examine_status'=>1])->field('ordertype_id,examine_status,id')->find();
        
        $res['authentication_info']['qiye_authentication'] = $findQiye_authentication ? 1 : 0;
      }else{
        $res['authentication_info']['qiye_authentication'] = 0;
      }
      
      $findGeren_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$res['user_id'],'ordertype_id'=>1,'status'=>'normal','examine_status'=>1])->field('ordertype_id,examine_status,id')->find();
      $res['authentication_info']['geren_authentication'] = $findGeren_authentication ? 1 : 0;
      
      
      $views_map = [
        'create_time'=>time(),
        'ip'=> request()->ip(),
        'card_id'=> $card_id,
        'type'=> 'views',//名片访问
        'user_id' => $res['user_id'],
        'site_id'=> $this->site_id,
        'from_user_id'=>$user_id
      ];
    
      Db::name('ttcard_statistics')->insert($views_map); 
      return $this->ok('请求成功',$res); 
    }
}
