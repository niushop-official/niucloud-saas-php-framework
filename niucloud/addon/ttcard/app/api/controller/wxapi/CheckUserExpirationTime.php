<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class CheckUserExpirationTime extends Base
{
    public function index()
    {
      $user_id = $this->request->param('user_id');
      $userInfo = Db::name('ttcard_user')->where('site_id',$this->site_id)->where('id',$user_id)->find();
      
      // 判断会员等级是否过期
      if ($userInfo && $userInfo['expirationtime']< time() && $userInfo['ordertype_id'] != 7  && $userInfo['ordertype_id'] != 11) {
        if($userInfo['grade_status'] == 'normal'){
          @Db::name('ttcard_user')->where('site_id',$this->site_id)->where('id',$user_id)->update(['grade_status'=>'hidden','ordertype_id'=>3]);
        }
          return $this->err('账号会员已过期，请重新登陆'); 
      } else { 
          return $this->ok('请求成功',['user_ordertype_id'=>$userInfo['ordertype_id'],'user_grade_status'=>$userInfo['grade_status']]); 
      }
    }
}
