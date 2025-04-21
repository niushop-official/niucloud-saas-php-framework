<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetTodayStatistics extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];

      $date = $this->request->param('date');  
      if(!$date){
        return $this->err('请求参数不正确');
      } 
      
      $todayStatistics = [];
      
      $cardSelect = Db::name('ttcard_card')->where('site_id',$this->site_id)->where('user_id',$user_id)->where('status','normal')->select();
      
      // 今日访问
      if(!$cardSelect){
        $todayStatistics['today'] = 0;
      }
      $todayStatistics = [
        'todayViews' => 0,
        'todayShare' => 0,
        'todayMessage' => 0,
        'todayEmail' => 0,
        'todayWechat'=> 0,
        'todayPresswechatcode' => 0,
        'todayImpression' => 0,
        'todayPhone'=>0
      ];
      
      foreach($cardSelect as $k=>$v){  
        $views_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','views')->count(); 
        $todayStatistics['todayViews'] = $todayStatistics['todayViews']+$views_count;  
        
        $share_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','share')->count();
        $todayStatistics['todayShare'] = $todayStatistics['todayShare']+$share_count;  
        
        $message_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','message')->count();
        $todayStatistics['todayMessage'] = $todayStatistics['todayMessage']+$message_count;  
        
        $email_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','email')->count();
        $todayStatistics['todayEmail'] = $todayStatistics['todayEmail']+$email_count;  
        
        $wechat_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','wechat')->count();
        $todayStatistics['todayWechat'] = $todayStatistics['todayWechat']+$wechat_count; 
        
        $presswechatcode_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','presswechatcode')->count();
        $todayStatistics['todayPresswechatcode'] = $todayStatistics['todayPresswechatcode']+$presswechatcode_count;  
        
        $impression_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','impression')->count();
        $todayStatistics['todayImpression'] = $todayStatistics['todayImpression']+$impression_count;  
        
        $phone_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','between',[$date.' 00:00:00',$date.' 23:59:59'])->where('card_id',$v['id'])->where('type','phone')->count();
        $todayStatistics['todayPhone'] = $todayStatistics['todayPhone']+$phone_count; 
      }
      
      return $this->ok('请求成功',$todayStatistics);
    }
}
