<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetCardBackground extends Base
{
    public function index()
    {
      $res = Db::name('ttcard_cardbackground')->where('site_id',$this->site_id)->where('status','normal')->select()->toArray();
      if($res === false){
        return $this->err('网络错误');
      }
      
      foreach($res as $k=>&$v){ 
        $v['image'] =  $this->cdnurl($v['image'], true);
      }
      
      return $this->ok('请求成功',$res);
    }
}
