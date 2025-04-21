<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class DeleteWebsite extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      $id = $this->request->param('website_id'); 
      if(!$id){
        return $this->err('参数错误');
      }
      $res = Db::name('ttcard_website')->where('site_id',$this->site_id)->where(['id'=>$id,'user_id'=>$user_id])->delete();
      
      if(!$res){
        return $this->err('网络错误');
      }
      return $this->ok('操作成功'); 
    }
}
