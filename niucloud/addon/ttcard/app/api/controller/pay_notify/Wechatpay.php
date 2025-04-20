<?php
namespace addon\ttcard\app\api\controller\pay_notify;

use core\base\BaseApiController;
use addon\ttcard\app\api\controller\Base;
use think\Response;
use think\facade\Db;
use think\facade\Log;
use app\service\core\pay\CorePayChannelService;
use core\pay\PayLoader;

class Wechatpay extends Base
{
    public function weapp(){
        $this->site_id=$this->request->param('site_id');
        Log::write('[支付回调通知][Wechatpay][weapp][notify]' . $this->site_id);
        $config=( new CorePayChannelService() )->getConfigByChannelAndType($this->site_id, "weapp", "wechatpay");
        $config['site_id'] = $this->site_id;
        $callback = function($out_trade_no, $params) {
            try {
                $this->checkOrder($out_trade_no);
            } catch (\Exception $e) {
                return false;
            }
            return true;
        };
        (new PayLoader("wechatpay", $config))->notify('pay',$callback);
    }
    public function checkOrder($out_trade_no=''){
        $this->site_id=$this->request->param('site_id');
        $sn=$this->request->param('sn','');
        if(!$out_trade_no){
            $out_trade_no=$sn;
        }
        $findOrder = Db::name('ttcard_order')->where(['order_num'=>$out_trade_no])->find();
        if(!$findOrder){
            Log::write('[支付回调通知][Wechatpay][weapp][notify]' . $this->site_id."|" .$out_trade_no . "订单不存在");
            throw new \Exception('订单不存在');
        }
        if($findOrder['pay_status'] == 1){
            Log::write('[支付回调通知][Wechatpay][weapp][notify]' . $this->site_id."|" .$out_trade_no . "订单已支付");
            throw new \Exception('订单已支付');
        }
        $config=( new CorePayChannelService() )->getConfigByChannelAndType($this->site_id, "weapp", "wechatpay");
        $config['site_id'] = $this->site_id;
        $pay_info=(new PayLoader("wechatpay", $config))->getOrder([ 'out_trade_no' => $out_trade_no ]);
        if($pay_info[ 'status' ] != 'SUCCESS'){
            Log::write('[支付回调通知][Wechatpay][weapp][notify]' . $this->site_id."|" .$out_trade_no . "订单支付失败");
            throw new \Exception('订单支付失败');
        }
        Db::startTrans();
        try {
            $findOrderType = Db::name('ttcard_ordertype')->where('real_id',$findOrder['ordertype_id'])->find();
            if(!$findOrderType){ 
                throw new \Exception('查询收费类型信息失败:ordertype_id=>'.$findOrder['ordertype_id']);
            } 
            $this->updateInfo($findOrder['user_id'],$findOrder['ordertype_id'],$findOrderType['name'],$out_trade_no,$findOrder['authentication_id'],$findOrderType['duration']); 
            Db::name('ttcard_order')->where(['order_num'=>$out_trade_no])->update([
                'pay_status' => 1,
                'paytime' => time(),
            ]);
            Db::commit();
        } catch (\Exception $e) {
            Db::rollback();
            Log::error('[支付回调通知][Wechatpay][weapp][notify]'.$out_trade_no.'，错误信息:'.$e->getLine()."|".$e->getMessage() );
            return $sn?'err:'.$e->getMessage():false;
        }
        Log::write('[支付回调通知][Wechatpay][weapp][notify]' . $this->site_id."|" .$out_trade_no . "订单支付成功");
        return $sn?'ok':true;
    }

	private function updateInfo($user_id,$ordertype_id,$ordertype_name,$order_num,$authentication_id=null,$duration=null){
	    
		$vip = [3,4,5,6,7,8,9,10,11];
        $auth = [1,2];
		$vip_id = [3,4,5,6,7];
		$svip_id = [8,9,10,11];
		$ids = '';
		if(in_array($ordertype_id,$vip)){
	        $ids = '3,4,5,6,7,8,9,10,11';
	    }
	    if(in_array($ordertype_id,$auth)){
	        $ids = '1,2';
	    }
		$map = [];
	    $map['user_id'] = ['=', $user_id];
	    $map['pay_status'] = ['=', 2];
	    $map['ordertype_id'] = ['in', $ids];
	    $map['order_num'] = ['<>', $order_num]; 
        $selectOrder = Db::name('ttcard_order')->where($map)->select();
        
        if($selectOrder){ 
            foreach ($selectOrder as $value) {
                $updateOrder = Db::name('ttcard_order')->where(['user_id'=>$user_id,'id'=>$value['id']])->update(['pay_status'=>3]);
                if(!$updateOrder){
                    throw new \Exception("更新史订单信息失败");
                }
               
            }
        } 
 
		if($ordertype_id == 1 || $ordertype_id == 2){
			if(!$authentication_id){
                 throw new \Exception("缺少认证ID参数");
			}
			$updateExamine_status = Db::name('ttcard_authentication')->where(['user_id'=>$user_id,'id'=>$authentication_id])->update(['examine_status'=>3]);
			if(!$updateExamine_status){
                throw new \Exception("没有更新项user_id=>{$user_id}|authentication_id=>".$authentication_id);
			}
			
		}else{ 
		    if(!$duration){
                 throw new \Exception("缺少时长参数");
			}
			$map = [];
			$map['ordertype_id'] = $ordertype_id;
			$map['grade_status'] = 'normal';
			 
			$findUser = Db::name('ttcard_user')->where(['id'=>$user_id,'status'=>'normal'])->find(); 
			if(!$findUser){
                throw new \Exception("查询当前用户信息失败：user_id=>{$user_id}");
			}
			
			// 个人会员
			if(in_array($ordertype_id,$vip_id) && in_array($findUser['ordertype_id'],$vip_id)){
				if($ordertype_id > $findUser['ordertype_id']){ 
					$map['expirationtime'] = $findUser['expirationtime'] ? $findUser['expirationtime']+ $duration*24*60*60 : time()+ $duration*24*60*60;
				}else{
					$map['expirationtime'] = time()+ $duration*24*60*60;
				} 
			}
			
			// 企业会员
			if(in_array($ordertype_id,$svip_id) && in_array($findUser['ordertype_id'],$svip_id)){
				if($ordertype_id > $findUser['ordertype_id']){ 
					$map['expirationtime'] = $findUser['expirationtime']+ $duration*24*60*60;
				}else{
					$map['expirationtime'] = time()+ $duration*24*60*60;
				}
			}
			
			// 从个人升级到企业会员
			if(in_array($ordertype_id,$svip_id) && in_array($findUser['ordertype_id'],$vip_id)){
				$map['expirationtime'] = time()+ $duration*24*60*60;
			}
			
			
			if($ordertype_id == 7 || $ordertype_id ==11){
				$map['expirationtime'] = '';
			}
			 
			$updateUser = Db::name('ttcard_user')->where(['id'=>$user_id])->update($map);
				  
			if(!$updateUser){ 
                 throw new \Exception("更新用户会员信息失败：{$user_id}");
			}
		} 
		// 创建系统消息
		$this->addCardmsg('systemmessages',$user_id,$ordertype_name,$order_num); 
	}
}
