<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetCopyRight extends Base
{
    public function index()
    {
      $config = $this->get_addon_config(); 
      if(!isset($config['miniappCopy'])){
        return $this->err('请求失败');
      } 
      $data = [
        'miniappCopy'=>$config['miniappCopy'],
        'miniappV'=>$config['miniappV']
      ];
      return $this->ok('请求成功',$data);
    }
}
