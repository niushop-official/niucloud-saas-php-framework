<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\BaseAuth;
use think\Response;
use think\facade\Db;
use app\service\core\pay\CorePayChannelService;
use core\pay\PayLoader;

class GoPay extends BaseAuth
{
    public function index()
    {
      $user_id = $this->_user['id'];
      
      $youyicardConfig = $this->get_addon_config();
      $appId = $youyicardConfig['appid'];
      $appSecret = $youyicardConfig['appsecret'];
      if (!$appId || !$appSecret) {
        return $this->err('请在插件后台配置appid和appsecret');
      } 
      
      $website_id = $this->request->param('website_id');  
      $ordertype_id = $this->request->param('ordertype_id');   
      $total_price = $this->request->param('total_price');
      $order_num = $this->request->param('order_num');
      
    
      $map = [];
      if($ordertype_id == 2){ 
        if(!$website_id){
          return $this->err('支付参数错误');
        }
        $map['website_id'] = $website_id;
      }
      
      $finOrder = Db::name('ttcard_order')->where('site_id',$this->site_id)->where(['order_num'=>$order_num,'status'=>'normal'])->find();
      if(!$finOrder){
        return $this->err('订单不存在，如有疑问请联系客服');
      }
      if($finOrder['pay_status'] != 2){
        return $this->err('订单状态已发生改变，如有疑问请联系客服');
      }  
        
      $findUser = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$user_id,'status'=>'normal'])->find();
      if(!$findUser){
        return $this->err('获取用户信息失败');
        }
        
      if(in_array($ordertype_id,[1,2])){
        $findAuthentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['ordertype_id'=>$ordertype_id,'status'=>'normal','user_id'=>$user_id])->where($map)->find();
        if(!$findAuthentication){
          return $this->err('认证信息不存在，如有疑问请联系客服');
        }
        
        if($findAuthentication['examine_status'] !=4){
          return $this->err('认证信息状态已发生改变，如有疑问请联系客服');
        }
      }
      
      $response = $this->submitOrder([
          'out_trade_no' => $order_num,
          'money' => $total_price,
          'body' => $order_num,
          'channel' => 'weapp',
          'type' => 'wechatpay',
          'openid' => $findUser['openid']
      ]);
          
      if(!$response){
        return $this->err('请求失败');
      }
      unset($response['appId']);
	    return $this->ok('请求成功',$response); 
    }
    function submitOrder($arr){
      $action='pay';
      $notify_url = (string)url("/api/ttcard/pay_notify/{$arr['type']}/{$arr['channel']}/$this->site_id", [], '', true);//异步回调通知地址
      $config=( new CorePayChannelService() )->getConfigByChannelAndType($this->site_id, $arr['channel'], $arr['type']);
      $config['notify_url'] = $notify_url;
      $config['site_id'] = $this->site_id;
      if($arr['type'] == 'wechatpay'){
        $arr['money'] = (int) bcmul($arr[ 'money' ], 100);
      }
      if($arr['channel'] == 'weapp'){
        $action='mini';
      }
      return (new PayLoader($arr['type'], $config))->$action($arr);
    }
}
