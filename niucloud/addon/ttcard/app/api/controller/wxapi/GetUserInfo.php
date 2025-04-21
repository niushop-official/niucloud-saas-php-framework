<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class GetUserInfo extends BaseAuth
{
    public function index()
    {
      $info=$this->userInfo($this->_user['id']);
      return $this->ok('请求成功',$info); 
    }
}
