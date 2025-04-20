<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

//获取  我的  页面顶部的三项数据 
class GetMyPageStatistics extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $select = Db::name('ttcard_card')->where('site_id',$this->site_id)->where('user_id',$user_id)->where('status','normal')->select();
      
      if(!$select){
        return $this->err('请求失败');
      }
      
      $statistics = [
        'todayTotal'=>0,
        'weekTotal'=>0, 
        'monthTotal'=>0
      ];
      foreach($select as $k=>$v){  
        $todayTotal = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','today')->where('card_id',$v['id'])->where('type','views')->count();
        $statistics['todayTotal'] = $statistics['todayTotal']+$todayTotal;
        
        $weekTotal = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','week')->where('card_id',$v['id'])->where('type','views')->count();
        $statistics['weekTotal'] = $statistics['weekTotal']+$weekTotal;
        
        $monthTotal = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->whereTime('create_time','month')->where('card_id',$v['id'])->where('type','views')->count();
        $statistics['monthTotal'] = $statistics['monthTotal']+$monthTotal; 
      }
      
      return $this->ok('请求成功',$statistics); 
    }
}
