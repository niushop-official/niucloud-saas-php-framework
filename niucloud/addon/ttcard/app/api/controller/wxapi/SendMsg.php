<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
//提交留言
class SendMsg extends BaseAuth
{
    public function index()
    {
      $form_user_id = $this->_user['id'];
      
      $to_user_id = $this->request->param('to_user_id');  
      $card_id = $this->request->param('card_id');     
      $content = $this->request->param('msg');  
      
      if(!trim($content)){
        return $this->err('请输入一些文字吧');
      }
      
      if($form_user_id == $to_user_id){
        return $this->err('不能给自己发送消息');
      }
      
      $map = [];
      $map['site_id'] = $this->site_id; 
      $map['form_user_id'] = $form_user_id;
      $map['to_user_id'] = $to_user_id;
      $map['card_id'] = $card_id;
      $map['title'] = substr($content,0,30);
      $map['content'] = $content; 
      $map['create_time'] = time(); 
      $tips = '留言成功，请耐心等待平台管理员审核';
      $config = $this->get_addon_config();
      if($config && $config['leaveamessage_switch'] == 1){
        $map['status'] = 'normal'; 
        $tips = '留言成功';
      } 
      
      $res = Db::name('ttcard_cardmsg')->insert($map);
      if(!$res){
        return $this->err('留言失败');
      }	
      
      $map_s = [
        'type'=>'message',
        'site_id'=>$this->site_id,
        'card_id'=>$card_id,
        'create_time'=>time(),
        'ip'=>request()->ip(),
      ];
      @Db::name('ttcard_statistics')->insert($map_s);
      return $this->ok($tips); 
    }
}
