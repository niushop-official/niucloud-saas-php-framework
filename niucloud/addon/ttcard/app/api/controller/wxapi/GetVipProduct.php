<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;

class GetVipProduct extends Base
{
    public function index()
    {
      $select = Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where('type','in',['vip','svip'])->where(['status'=>'normal'])->limit(50)->select()->toArray();
      if(!$select){
        return $this->err('没有找到相关信息');
      }
      foreach($select as $k=>$v){
        $select[$k]['id'] = $v['real_id'];
        $select[$k]['price'] = floatval($v['price']);
        $select[$k]['originalprice'] = floatval($v['originalprice']);
      }
      return $this->ok('请求成功',$select); 
    }
}
