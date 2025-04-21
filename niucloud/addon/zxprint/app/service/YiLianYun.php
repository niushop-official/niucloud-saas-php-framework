<?php
namespace addon\zxprint\app\service;

use addon\zxprint\app\model\zx_printlog\ZxPrintlog;
use addon\zxprint\app\service\admin\zx_print\ZxPrintService;

use addon\shop\app\model\order\Order;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\delivery\DeliveryDict;
use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\model\order\OrderDelivery;
use addon\shop\app\model\delivery\Store;
use app\model\pay\Pay;

use core\base\BaseAdminService;
use core\exception\AdminException;
use think\facade\Log;


/**
 * 易联云打印机
 * Class  YiLianYun
 */
class YiLianYun extends BaseAdminService
{
    /**
     * 打印内容
     */
    public function  action_print()
    {
        $Values = ['title','client_id', 'client_secret','machine_code','private_key','print_number','status','auto_print','show_buyer_message','show_qrcode','qrcode_name','qrcode_content','bottom'];
        $ValuesData = (new ZxPrintService())->setting($Values);
     
        $param = array(
            "timestamp"=>time(),
            "client_id"=> $ValuesData['client_id'],
            "access_token"=>$this->getAccessToken($ValuesData['client_id'],$ValuesData['client_secret']),
            "machine_code"=>$ValuesData['machine_code'],
            "origin_id"=>"order_".time(),
            "sign"=>$this->generateSign($ValuesData['client_id'],$ValuesData['client_secret']),
            "id"=>$this->create_uuid(),
 
        );

        if($ValuesData['status'] == 1){
            $search_model = (new ZxPrintlog())->where([['status', '=',  0]])->whereDay('create_time')->select()->toArray();
            foreach ($search_model as $values) {
                $infos = $this->getDetail($values['order_id'],$values['site_id']);
                (new ZxPrintlog())->where([ [ ['order_id', '=', $values['order_id']] ] ])->update( [ 'status' => 1 ] );
                $content = "<center>30</center>" . PHP_EOL;
                $content .= str_repeat('-', 32).PHP_EOL;
                $content = "<FS><center>".$ValuesData['title']."</center></FS>".PHP_EOL;
                $content .= str_repeat('-', 32).PHP_EOL;
                $content .= "订单编号：".$infos['order_no'].PHP_EOL;
                $content .= "支付方式：".$infos['pay']['type_name'].PHP_EOL;
                $content .= "配送方式：".$infos['delivery_type_name'].PHP_EOL; 
        
                $content .= str_repeat('-', 32).PHP_EOL;
                $content .= "<table><tr><td>商品信息</td><td>数量</td><td>单价</td></tr>";
                foreach ($infos['order_goods'] as $value) {
                    $content .= "<tr><td>".mb_substr($value['goods_name'], 0, 10)."</td>";
                    $content .= "<td>".$value['num']."</td>";
                    $content .= "<td>".$value['price']."</td></tr>";  
                }
                $content .= '</table>';
                $content .= str_repeat('-', 32).PHP_EOL;
        
                $content .= "<LR>会员折扣：,-￥".$infos['discount_money']."</LR>";
                $content .= "<LR>运费金额：,￥".$infos['delivery_money']."</LR>";
                $content .= "<LR>实付金额：,￥".$infos['order_money']."</LR>";
                $content .= str_repeat('-', 32).PHP_EOL;
                $content .= "收货信息".PHP_EOL;
                if($infos['taker_name']!=='' ){
                    $content .= "收货人：".$infos['taker_name'].PHP_EOL;
                    $content .= "联系方式：".$infos['taker_mobile'].PHP_EOL;
                }else{
                    $content .= "收货人：".$infos['member']['nickname'].PHP_EOL;
                    $content .= "联系方式：".$infos['member']['mobile'].PHP_EOL;
                }
                $content .= "收货地址：".$infos['taker_full_address'].PHP_EOL;
                $content .= str_repeat('-', 32).PHP_EOL;
        
                //买家留言
                if($ValuesData['show_buyer_message'] == 1){
                    $content .= "留言内容：".$infos['shop_remark'].PHP_EOL;
                    $content .= str_repeat('-', 32).PHP_EOL;
                }
        
                //显示二维码
                if($ValuesData['show_qrcode'] == 1){
                    $content .= "<center>".$ValuesData['qrcode_name']."</center>".PHP_EOL;
                    $content .= "<QR>".$ValuesData['qrcode_content']."</QR>".PHP_EOL;
                    $content .= str_repeat('-', 32).PHP_EOL;
                }
        
                $content .=  "<center>".$ValuesData['bottom']."</center>".PHP_EOL;
            
                $param['content'] = $content;
                
                return $this->sendCmd('https://open-api.10ss.net/print/index',$param); 
            
            };
        }
    }
    
    /**
     * 单独打印内容
     */
    public function  one_print($order_id,$site_id)
    {
        $Values = ['title','client_id', 'client_secret','machine_code','private_key','print_number','status','auto_print','show_buyer_message','show_qrcode','qrcode_name','qrcode_content','bottom'];
        $ValuesData = (new ZxPrintService())->setting($Values);
     
        $param = array(
            "timestamp"=>time(),
            "client_id"=> $ValuesData['client_id'],
            "access_token"=>$this->getAccessToken($ValuesData['client_id'],$ValuesData['client_secret']),
            "machine_code"=>$ValuesData['machine_code'],
            "origin_id"=>"order_".time(),
            "sign"=>$this->generateSign($ValuesData['client_id'],$ValuesData['client_secret']),
            "id"=>$this->create_uuid(),
 
        );
  
        if($ValuesData['status'] == 1){
                $infos = $this->getDetail($order_id,$site_id);
                (new ZxPrintlog())->where([ [ ['order_id', '=', $order_id] ] ])->update( [ 'status' => 1 ] );
                $content = "<center>30</center>" . PHP_EOL;
                $content .= str_repeat('-', 32).PHP_EOL;
                $content = "<FS><center>".$ValuesData['title']."</center></FS>".PHP_EOL;
                $content .= str_repeat('-', 32).PHP_EOL;
                $content .= "订单编号：".$infos['order_no'].PHP_EOL;
                $content .= "支付方式：".$infos['pay']['type_name'].PHP_EOL;
                $content .= "配送方式：".$infos['delivery_type_name'].PHP_EOL; 
        
                $content .= str_repeat('-', 32).PHP_EOL;
                $content .= "<table><tr><td>商品信息</td><td>数量</td><td>单价</td></tr>";
                foreach ($infos['order_goods'] as $value) {
                    $content .= "<tr><td>".mb_substr($value['goods_name'], 0, 10)."</td>";
                    $content .= "<td>".$value['num']."</td>";
                    $content .= "<td>".$value['price']."</td></tr>";  
                }
                $content .= '</table>';
                $content .= str_repeat('-', 32).PHP_EOL;
        
                $content .= "<LR>会员折扣：,-￥".$infos['discount_money']."</LR>";
                $content .= "<LR>运费金额：,￥".$infos['delivery_money']."</LR>";
                $content .= "<LR>实付金额：,￥".$infos['order_money']."</LR>";
                $content .= str_repeat('-', 32).PHP_EOL;
                $content .= "收货信息".PHP_EOL;
                if($infos['taker_name']!=='' ){
                    $content .= "收货人：".$infos['taker_name'].PHP_EOL;
                    $content .= "联系方式：".$infos['taker_mobile'].PHP_EOL;
                }else{
                    $content .= "收货人：".$infos['member']['nickname'].PHP_EOL;
                    $content .= "联系方式：".$infos['member']['mobile'].PHP_EOL;
                }
                $content .= "收货地址：".$infos['taker_full_address'].PHP_EOL;
                $content .= str_repeat('-', 32).PHP_EOL;
        
                //买家留言
                if($ValuesData['show_buyer_message'] == 1){
                    $content .= "留言内容：".$infos['shop_remark'].PHP_EOL;
                    $content .= str_repeat('-', 32).PHP_EOL;
                }
        
                //显示二维码
                if($ValuesData['show_qrcode'] == 1){
                    $content .= "<center>".$ValuesData['qrcode_name']."</center>".PHP_EOL;
                    $content .= "<QR>".$ValuesData['qrcode_content']."</QR>".PHP_EOL;
                    $content .= str_repeat('-', 32).PHP_EOL;
                }
        
                $content .=  "<center>".$ValuesData['bottom']."</center>".PHP_EOL;
            
                $param['content'] = $content;

                return $this->sendCmd('https://open-api.10ss.net/print/index',$param); 
        }else{
            throw new AdminException('打印机未开启！');
        }
    }
 
    
    /**
     * 订单详情
     * @param int $order_id
     * @return array
     */
    public function getDetail($order_id,$site_id)
    {
        $field = 'activity_type,point,order_id,order_no,order_type,order_from,out_trade_no,status,member_id,ip,goods_money,delivery_money,order_money,invoice_id,create_time,pay_time,delivery_time,take_time,finish_time,close_time,delivery_type,taker_name,taker_mobile,taker_province,taker_city,taker_district,taker_address,taker_full_address,taker_longitude,taker_latitude,take_store_id,is_enable_refund,member_remark,shop_remark,close_remark,discount_money';
        $info = (new Order())->where([['order_id', '=', $order_id], ['site_id', '=', $site_id]])->field($field)
            ->with(
                [
                    'order_goods' => function ($query) {
                        $query->field('extend,order_goods_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money, is_enable_refund, goods_type, delivery_status, status,discount_money')->append(['delivery_status_name']);
                    },
                    'member' => function ($query) {
                        $query->field('member_id, nickname, mobile, headimg');
                    },
                    'order_log' => function ($query) {
                        $query->field('order_id, content, main_type, create_time, main_id, type')->order("create_time desc, id desc")->append(['main_type_name', 'type_name', 'main_name']);
                    }
                ])->append(['order_from_name', 'order_type_name', 'status_name', 'delivery_type_name'])->findOrEmpty()->toArray();
        $order_status_list = OrderDict::getStatus();
   
        if (!empty($info)) $info['order_status_data'] = $order_status_list[$info['status']] ?? [];
        if ($info['delivery_type'] == DeliveryDict::STORE) {
            $info['store'] = (new Store())->where([['store_id', '=', $info['take_store_id']]])
                ->field('store_id, store_name, full_address, store_mobile, trade_time')
                ->findOrEmpty()->toArray();
        }
    
        if ($info['delivery_type'] == DeliveryDict::EXPRESS) {
            $info['order_delivery'] = (new OrderDelivery())
                ->where([['order_id', '=', $info['order_id']]])
                ->field('id, order_id, name, delivery_type, sub_delivery_type,express_company_id, express_number, create_time')
                ->select()->toArray();
        }
   
        if ($info['out_trade_no']) {
            $info['pay'] = (new Pay())->where([['out_trade_no', '=', $info['out_trade_no']]])
                ->field('out_trade_no, type, pay_time')->append(['type_name'])->findOrEmpty()->toArray();
        }
        return $info;
    }
    
    
    //获取access_token
    public function getAccessToken($client_id,$apiKey){
        $url="https://open-api.10ss.net/oauth/oauth";
        $sign=$this->generateSign($client_id,$apiKey);
        $id=$this->create_uuid();
        $time=time();
        $params=[
            "timestamp"=>$time,
            "client_id"=>$client_id,
            "grant_type"=>"client_credentials",
            "sign"=>$sign,
            "scope"=>"all",
            "id"=>$id,
        ];
 
        $params=http_build_query($params);
        $res=$this->sendCmd($url,$params);
        $res=json_decode($res,true);
        if($res['error']=="0"){
            return $res['body']['access_token'];
        }
 
    }
    
    /**
     * 生成签名sign
     * @param  array $params 参数
     * @param  string $apiKey API密钥
     * @param  string $msign 打印机密钥
     * @return   string sign
     */
    public function generateSign($client_id,$apiKey)
    {
      
        $str = $client_id.time().$apiKey;
        
        return strtolower(md5($str));
    }
    
    
    /**
     * 生成字符串参数
     * @param array $param 参数
     * @return  string        参数字符串
     */
    public function getStr($param)
    {
        $str = '';
        foreach ($param as $key => $value) {
            $str=$str.$key.'='.$value.'&';
        }
        $str = rtrim($str,'&');
        return $str;
    }
    
    /**
     * 发起请求
     * @param  string $url  请求地址
     * @param  string $data 请求数据包
     * @return   string      请求返回数据
     */
    public function sendCmd($url,$data)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url); 
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2); 
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Expect:')); 
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); 
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); 
        curl_setopt($curl, CURLOPT_POST, 1); 
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); 
        curl_setopt($curl, CURLOPT_HEADER, 0); 
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
 
        $tmpInfo = curl_exec($curl);
        if (curl_errno($curl)) {
            echo 'Errno'.curl_error($curl);
        }
        curl_close($curl); 
        return $tmpInfo; 
    }

 
    //生成UUID4(后面自己找的一个方法)
    function create_uuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
            mt_rand( 0, 0xffff ),
            mt_rand( 0, 0x0fff ) | 0x4000,
            mt_rand( 0, 0x3fff ) | 0x8000,
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }
}
