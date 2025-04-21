<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetHelpList extends Base
{
    public function index()
    {
        $res = Db::name('ttcard_help')->where('site_id',$this->site_id)->where('status','normal')->order('id desc')->select()->toArray();
		if(!$res){
			return $this->ok();
		}
		return $this->ok('请求成功',$res); 
    }
}
