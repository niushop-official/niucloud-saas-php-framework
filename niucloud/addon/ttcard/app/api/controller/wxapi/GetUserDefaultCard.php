<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\facade\Db;

class GetUserDefaultCard extends BaseAuth
{
    public function index()
    {
      $defaultCard_id = Db::name('ttcard_card')->where('site_id',$this->site_id)->where(['user_id'=>$this->_user['id'],'status'=>'normal','default_status'=>1])->field('id')->find();
      if(!$defaultCard_id){
        return $this->err('');
      }
      return $this->ok('请求成功',['card_id'=>$defaultCard_id['id']]); 
    }
}
