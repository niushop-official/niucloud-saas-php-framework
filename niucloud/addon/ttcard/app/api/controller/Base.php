<?php
namespace addon\ttcard\app\api\controller;

use core\base\BaseApiController;
use think\Response;
use think\facade\Db;
use app\service\api\upload\Base64Service;
use app\service\core\weapp\CoreWeappConfigService;
use addon\ttcard\app\service\admin\sys\SysService;

class Base extends BaseApiController
{
    public $_user;
    public $site_id;
    public function initialize()
    {
        parent::initialize();
        $this->site_id = $this->request->siteId();
    }
    function checkLogin($token)
    {
        $res = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['token'=>$token,'status'=>'normal'])->find();
		if(!$res){
			return false;
		}
		return $res['id'];
    }
    function ok($msg = 'SUCCESS', $data = [], int $code = 1, int $http_code = 200) : Response
    {
        return success($msg, $data, $code, $http_code);
    }
    function err($msg = 'FAIL', ?array $data = [], int $code = 0, int $http_code = 200) : Response
    {
        return fail($msg, $data, $code, $http_code);
    }
    function sendRequest($url,$data=[],$json=false,$header=[]){
        if($data){
            return $this->vCurlPost($url,$data,$json,$header);
        }  
        $ch = curl_init($url) ;
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);//https
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);//https
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ;
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $output = curl_exec($ch) ;
        if (curl_errno($ch)) {
            return ['ret' => 0, 'msg' => curl_error($ch)];
        }
        curl_close($ch);
        return ['ret' => 1, 'msg' => $output];
    }
    static function vCurlPost($url,$data,$json=false,$header=[]){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
        if($json){
            $header2 = ['Content-Type: application/json'];
            $data=json_encode($data);
            if(count($header)>0){
                $header2=array_merge($header2,  $header);
            }
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header2);
        }
        
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
        curl_setopt($curl, CURLOPT_TIMEOUT, 20); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // 获取的信息以文件流的形式返回
        $output = curl_exec($curl);
        if (curl_errno($curl)) {
            return ['ret' => 0, 'msg' => curl_error($curl)];
        }
        curl_close($curl);
        return ['ret' => 1, 'msg' => $output];
    }
    // 随机数 
    function generateRandomString($length) {  
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';  
        $charactersLength = strlen($characters);  
        $randomString = '';  
        for ($i = 0; $i < $length; $i++) {  
            $randomString .= $characters[rand(0, $charactersLength - 1)];  
        }  
        return $randomString;  
    }  
    // 随机数
    function generateRandomNum($length) {  
        $characters = '0123456789';  
        $charactersLength = strlen($characters);  
        $randomString = '';  
        for ($i = 0; $i < $length; $i++) {  
            $randomString .= $characters[rand(0, $charactersLength - 1)];  
        }  
        return $randomString;  
    } 
    function cdnurl($url, $is_cdn = false)
    {
        if(!$url){
            return '';
        }
        if ($is_cdn && !stristr($url, 'http')) {
            $url = $this->request->domain() .'/'. $url;
        }
        return $url;
    }
    function getDates($nDays) {
		$dates = [];
		for ($i = 0; $i < $nDays; $i++) {
			$dates[] = date('Y-m-d', strtotime("-{$i} days"));
		}
		return $dates;
	}
    function getViewsList($map,$pageCur = 1,$limit=10){
		return  Db::name('ttcard_statistics')->where('site_id',$this->site_id)->order('id desc')->group('from_user_id')->where($map)->limit($limit)->page($pageCur)->select();
	}
    function userInfo($user_id){
        $reslute = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$user_id,'status'=>'normal'])->field('id,avatar,token,phone,status,nickname,grade_status,ordertype_id,expirationtime')->find();
		if(!$reslute){
			return '';
		}
		
		if($reslute['expirationtime'] && $reslute['expirationtime'] < time()){
			$updateData = [
				'expirationtime'=>'',
				'ordertype_id'=>3,
				'grade_status'=>'hidden'
			];
			$updateUserData = Db::name('ttcard_user')->where('site_id',$this->site_id)->where(['id'=>$user_id])->update($updateData);
			if(!$updateUserData){
				return $this->err('更新用户会员信息失败');
			}
			
			$reslute['expirationtime']= '';
			$reslute['ordertype_id']= 3;
			$reslute['grade_status']= 'hidden';
			
		}
		 
		$findOrderType = @Db::name('ttcard_ordertype')->where('site_id',$this->site_id)->where('real_id',$reslute['ordertype_id'])->find(); 
		$reslute['duration'] = $findOrderType['duration'] ? $findOrderType['duration']:0;  
		$reslute['avatar'] = $reslute['avatar']?$this->cdnurl($reslute['avatar'], true):''; 
		$reslute['ordertype_name'] = $findOrderType['name'];
		$reslute['ordertype_id'] = $findOrderType['real_id'];
		
		$reslute['expirationtime'] = $reslute['expirationtime']?date('Y-m-d H:i:s',$reslute['expirationtime']) :'';
		
		$select_authentication = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$reslute['id'],'ordertype_id'=>1,'status'=>'normal','examine_status'=>1])->field('ordertype_id,examine_status,id')->find();
		$reslute['authentication_info']['geren_authentication'] = $select_authentication ? 1 : 0;
		  
		$reslute['phone'] = $reslute['phone'] ? $reslute['phone'] :'';
		 
		return $reslute;
    }
    function new_addOrder($user_id,$ordertype_id=null,$authentication_id=null,$buy_num=1,$address_id=null,$product_id=null,$price=null,$total_price=null,$title=null,$type=null){ 
		if(!$user_id){
			return false;
		} 
		$map= [];
        $map['site_id'] = $this->site_id;
		$map['order_num'] = $this->generateRandomNum(10).time();
		$map['price'] = $price; 
		$map['total_price'] = $total_price;  
		$map['address_id'] = $address_id;    
		$map['ordertype_viptype'] = $type;  
		$map['user_id'] = $user_id; 
		$map['buy_num'] = $buy_num;  
		$map['ordertype_id'] = $ordertype_id; 
		$map['create_time'] = time();
		
		if($authentication_id != null){
			$map['authentication_id'] = $authentication_id;
		}
		
		$id = Db::name('ttcard_order')->insertGetId($map);
		if(!$id){
			return false;
		}
		 
		// 创建系统消息
		$this->addCardmsg('systemmessages',$user_id,$title,$map['order_num']);
		
		$map['id'] = $id;
		 
		return $map;
		
	}
    protected function addCardmsg($type_status = 'systemmessages',$user_id='',$order_title='',$order_num=''){
		// 生成系统消息
		$map_o = [];
        $map_o['site_id'] = $this->site_id; 
		$map_o['type_status'] = $type_status; 
		$map_o['to_user_id'] = $user_id; 
		$map_o['title'] = $order_title;
		$map_o['content'] = '商品：'.$order_title.'<br>订单号：'.$order_num; 
		$map_o['create_time'] = time();  
		
		if($type_status = 'systemmessages'){
			$map_o['status'] = 'normal'; 
		}
		 
		return Db::name('ttcard_cardmsg')->insert($map_o); 
	}
    function getArrVal($arr,$key){
        if(isset($arr[$key])){
            return $arr[$key];
        }
        return '';
    }
    function get_addon_config(){
        $config=(new CoreWeappConfigService())->getWeappConfig($this->site_id);
        $info=(new SysService())->getInfo();
        return  
        [
            "leaveamessage_switch" => $this->getArrVal($info,'leaveamessage_switch')
            ,"addCard_switch" => $this->getArrVal($info,'addCard_switch')
            ,"vip_switch" => $this->getArrVal($info,'vip_switch')
            , "recruit_switch" => $this->getArrVal($info,'recruit_switch')
            , "authentication_switch" => $this->getArrVal($info,'authentication_switch')
            , "indexSwiper" => $this->getArrVal($info,'indexSwiper')
            , "accountLogin_switch" => $this->getArrVal($info,'accountLogin_switch')
            ,"dxbLogin_switch" => $this->getArrVal($info,'dxbLogin_switch')
            ,"website_switch" => $this->getArrVal($info,'website_switch')
            ,"website_url" => $this->getArrVal($info,'website_url')
            ,"miniappIndexTitle" => $this->getArrVal($info,'miniappIndexTitle')
            ,"miniappHiddenInformation" => $this->getArrVal($info,'miniappHiddenInformation')
            ,"appid" => $config['app_id']
            ,"appsecret" => $config['app_secret']
            ,"miniappCopy" => $this->getArrVal($info,'miniappCopy')
            ,"miniappV" => ""
            ,"username" => ""
            , "sign" => ""
            , "apikey" => ""
            ,"content" => ""
        ];
    }
    function checkDouhao($text){
        if(!trim($text)){
            return [];
        }
        if(!strstr($text,',')){
            return [trim($text)];
        }
        return explode(',',$text); 
    }
    function getMiniAppCode($table,$id,$path,$user_id=null,$sharetype=null){
        if (!$table || !$id || !$path) {
          throw new \Exception('生成小程序码的参数错误');
        } 
        
        $youyicardConfig = $this->get_addon_config();
        $appId = $youyicardConfig['appid'];
        $appSecret = $youyicardConfig['appsecret']; 
        if (!$appId || !$appSecret) {
            throw new \Exception('请在插件后台配置appid和appsecret');
        } 
        // 获取access_token
        $access_token = $this->sendRequest("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appId}&secret={$appSecret}"); 
        if ($access_token['ret'] != 1) {
            throw new \Exception('请求失败，请稍后再试');
        }
        $getToken = json_decode($access_token['msg'], true); 
        if(!$getToken['access_token'] || !$getToken['expires_in']){
            throw new \Exception('请求错误access_token');
        }
          
        // 参数
        $data = [
            'scene' => $id, // 这里的scene_id是你自定义的参数
            'page' => $path, // 小程序页面路径
            'width' => 430 // 二维码的宽度
        ];
      
        // 生成小程序码
        $getMiniCode = $this->sendRequest("https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token={$getToken['access_token']}",json_encode($data));
        
        if ($getMiniCode['ret'] != 1) {
            throw new \Exception('获取小程序码失败');
        }   
        $binaryContent = $getMiniCode['msg'];
        if(substr($binaryContent,0,1) == '{'){
          $json = json_decode($binaryContent,true);
          if(isset($json['errmsg'])){
            throw new \Exception('获取小程序码失败:'.$json['errmsg']);
          }
        }
        $binaryContent = base64_encode($binaryContent);
        $base64_service = new Base64Service();
        $uploadRes=$base64_service->image($binaryContent);
        $minicode_image = $this->cdnurl($uploadRes['url'],true);
        
        $update = Db::name($table)->where('site_id',$this->site_id)->where('id',$id)->update(['minicode_image'=>$minicode_image]);
        
        if(!$update && $update != 0){
            throw new \Exception('请求失败，请稍后再试');
        }
        return $minicode_image;
      }
     function authenticationDetail($user_id,$ordertype_id){    
        $res = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'status'=>'normal','ordertype_id'=>$ordertype_id])->order('id desc')->find();
        
        if(!$res){
            return false;
        }  
       
       if($ordertype_id == 2){
           $res['qiye_authentication_num'] = Db::name('ttcard_authentication')->where('site_id',$this->site_id)->where(['user_id'=>$user_id,'status'=>'normal','ordertype_id'=>$ordertype_id,'examine_status'=>1])->count(); 
       }
       if($res['website_id']){
           $findWebsite = Db::name('ttcard_website')->where('site_id',$this->site_id)->field('id,name')->where(['id'=>$res['website_id'],'status'=>'normal'])->find();
           $res['select_website_info'] = $findWebsite;
       }else{
           $res['select_website_info'] = [];
       }
         
       $res['idcard_f_image'] = $this->checkdouhao($res['idcard_f_image']); 
       if(count($res['idcard_f_image']) > 0){
           foreach($res['idcard_f_image'] as $key => $value){
               $res['idcard_f_image'][$key] = $value?$this->cdnurl($value, true):''; 
           } 
       } 

       if(isset($res['businesslicense_image']) && $res['businesslicense_image']){
           $res['businesslicense_image'] = $this->checkdouhao($res['businesslicense_image']);
           if(count($res['businesslicense_image']) > 0){
               foreach($res['businesslicense_image'] as $key => $value){
                   $res['businesslicense_image'][$key] = $value?$this->cdnurl($value, true):''; 
               } 
           }
       }
       
       if(isset($res['idcard_z_image']) && $res['idcard_z_image']){
           $res['idcard_z_image'] = $this->checkdouhao($res['idcard_z_image']);
           if(count($res['idcard_z_image']) > 0){
               foreach($res['idcard_z_image'] as $key => $value){
                   $res['idcard_z_image'][$key] = $value?$this->cdnurl($value, true):''; 
               } 
           }
       }
            
        return $res; 
    }
}
