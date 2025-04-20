<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetIndustry extends Base
{
    public function index()
    {
      $res = Db::name('ttcard_industry')->where('site_id',$this->site_id)->where(['status'=>'normal'])->select();
      if(!$res){
        return $this->ok('请求成功',[]);
      }
      return $this->ok('请求成功',$res);
    }
}
