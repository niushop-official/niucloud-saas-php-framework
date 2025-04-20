<?php
namespace addon\ttcard\app\api\controller;

use addon\ttcard\app\api\controller\Base;
use think\facade\Db;

class BaseAuth extends Base
{
    public function initialize()
    {
        parent::initialize();
        $this->_auth();
    }
    public function _auth()
    {
        $token = $this->request->header('token');
        $this->_user=Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['token'=>$token,'status'=>'normal'])->find();
        if(!$this->_user){
            // return $this->err('请先登录',[],1000);
            echo '{"code":1000,"msg":"请先登录","data":[]}';
            exit;
        }
    }
}
