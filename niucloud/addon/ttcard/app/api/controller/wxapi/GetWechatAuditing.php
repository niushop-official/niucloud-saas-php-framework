<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetWechatAuditing extends Base
{
    public function index()
    {
      $config = $this->get_addon_config(); 
      if(!isset($config['wechat_auditing'])){
        return $this->ok('请求成功',['wechat_auditing'=>0]);
      } 
      return $this->ok('请求成功',['wechat_auditing'=>$config['wechat_auditing'],'dxbLogin_switch'=>$config['dxbLogin_switch'],'accountLogin_switch'=>$config['accountLogin_switch']]);
    }
}
