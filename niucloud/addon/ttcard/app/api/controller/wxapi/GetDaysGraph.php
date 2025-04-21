<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetDaysGraph extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $days = $this->request->param('days');  
      if(!$days){
        return $this->err('请求参数不正确');
      } 
      
      $daysArr = $this->getDates($days);
      $arr = [];
      foreach($daysArr as $t => $q){
        $q = explode('-',$q);
        $arr[] = $q[1].'-'.$q[2];
      }
      
      $zhexianStatistics = [
        'views'=>[
          'x'=>$arr,
          'y'=>[]
        ]
      ];
      foreach($daysArr as $k=>$v){ 
        
        $cardSelect = Db::name('ttcard_card')->where('site_id',$this->site_id)->where('user_id',$user_id)->where('status','normal')->select();
        
        if(!$cardSelect){
          $zhexianStatistics['views']['y'][] = 0;
          continue;
        }
        $d = 0;
        foreach($cardSelect as $key=>$value){
          $views_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->where('card_id',$value['id'])->whereTime('create_time','between',[$v.' 00:00:00',$v.' 23:59:59'])->where('type','views')->count(); 
        
          $d = $d+$views_count;  
        }
        $zhexianStatistics['views']['y'][] = $d;
      }
      return $this->ok('请求成功',$zhexianStatistics);
    }
}
