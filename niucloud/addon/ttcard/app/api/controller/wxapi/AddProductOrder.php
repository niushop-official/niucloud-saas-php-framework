<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;

class AddProductOrder extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $ordertype_id = $this->request->param('ordertype_id');
      if(!$ordertype_id){
        return $this->err('参数错误');
      }
      
      $find = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$user_id,'grade_status'=>'normal'])->where('ordertype_id','<>',3)->find();
      if($find && $find['ordertype_id'] == $ordertype_id){
        return $this->err('当前账号已开通此会员');
      }
      if($find && $find['ordertype_id'] > $ordertype_id){
        return $this->err('抱歉，不能降级会员');
      }
      
      $vip_id= [3,4,5,6,7];
      $svip_id= [8,9,10,11];
      if($find && in_array($find['ordertype_id'],$svip_id) && in_array($ordertype_id,$vip_id)){
        return $this->err('抱歉，SVIP会员暂不支持通过此种方法降为VIP会员，但SVIP会员到期会自动降为普通会员');
      }
      
      $res = @Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where(['status'=>'normal','real_id'=>$ordertype_id])->find();
      if(!$res){
        return $this->err('请求失败|c='.$ordertype_id);
      } 
      
      // 创建vip会员订单
      $addOrderRes = $this->new_addOrder($user_id,$ordertype_id,'',1,'','',$res['price'],$res['price'],$res['name'],$res['type']);
      if(!$addOrderRes){
        return $this->err('创建订单失败');
      }  
      
      return $this->ok('创建订单成功',$addOrderRes); 
    }
}
