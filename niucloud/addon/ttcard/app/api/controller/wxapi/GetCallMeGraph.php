<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetCallMeGraph extends BaseAuth
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
        'phone'=>[
          'x'=>$arr,
          'y'=>[]
        ]
      ];
      foreach($daysArr as $k=>$v){ 
        
        $cardSelect = Db::name('ttcard_card')->where('site_id',$this->site_id)->where('user_id',$user_id)->where('status','normal')->select()->toArray();
        
        if(!$cardSelect){
          $zhexianStatistics['phone']['y'][] = 0;
          continue;
        }
        $d = 0;
        foreach($cardSelect as $key=>$value){
          $phone_count = Db::name('ttcard_statistics')->where('site_id',$this->site_id)->where('card_id',$value['id'])->whereTime('create_time','between',[$v.' 00:00:00',$v.' 23:59:59'])->where('type','phone')->count(); 
        
          $d = $d+$phone_count;  
        }
        $zhexianStatistics['phone']['y'][] = $d;
      }
      return $this->ok('请求成功',$zhexianStatistics);
    }
}
