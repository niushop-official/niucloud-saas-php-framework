<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
// 获取系统配置的微官网是否嵌套H5网页是否开启
class GetConfigWebsiteSwitch extends Base
{
    public function index()
    {
      $config = $this->get_addon_config();
      $website_url = $config['website_url'];
      if(!strstr($website_url,'https://') || !strstr($website_url,'.') || !trim($website_url)){
        $website_url = '';
      }
      return $this->ok('请求成功',['website_switch'=>$config['website_switch'],'website_url'=>$website_url]);
    }
}
