<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\transfer\app\service\api;

use addon\transfer\app\model\log\Log;
use addon\transfer\app\model\order\Order;
use app\model\member\Member;
use app\service\api\login\LoginService;
use core\base\BaseAdminService;
use app\service\core\notice\CoreSmsService;
use core\base\BaseApiService;
use core\exception\AuthException;
use core\exception\CommonException;
use app\service\core\member\CoreMemberAccountService;
use addon\transfer\app\service\core\ConfigService;
use app\dict\member\MemberAccountTypeDict;
use think\facade\Cache;
use think\facade\Db;
use addon\shop\app\model\coupon\CouponMember;
use app\service\core\pay\CorePayService;
use app\dict\pay\PayDict;

class TransferService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function checkmember()
    {
        $post = input('');

        $to_account = $post['to_account']??'';

        $member = (new Member())->field('member_id,nickname,headimg')->where('site_id',$this->site_id)->where('mobile="'.$to_account.'" or member_no="'.$to_account.'" or (username = "'.$to_account.'")')->findOrEmpty()->toArray();

        if(empty($member)){
            throw new CommonException('查无此人');
        }

        if($member['member_id']==$this->member_id){
            throw new CommonException('不可以转给自己');
        }
        return $member;
    }

    public function check_sms_code()
    {
        $post = input('');
        $mobile = $post['mobile']??'';


        if(empty($mobile)) throw new AuthException('MOBILE_NEEDED');
        $mobile_key = request()->param('mobile_key', '');
        $mobile_code = request()->param('mobile_code', '');
        if(empty($mobile_key) || empty($mobile_code)) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $cache = Cache::get($mobile_key);
        if(empty($cache)) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $temp_mobile = $cache['mobile'];
        $temp_code = $cache['code'];
        $temp_type = $cache['type'];
        if($temp_mobile != $mobile || $temp_code != $mobile_code) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $this->clearMobileCode($temp_mobile, $temp_type);
        return true;
    }

    public function clearMobileCode($mobile, $type){
        $cache_tag_name = "mobile_key".$mobile.$type;
        Cache::tag($cache_tag_name)->clear();
    }

    public function check_password()
    {
        $post = input('');
        $password = $post['password']??'';

        if(empty($password)) throw new AuthException('请填写安全密码');

        $member = (new Member())->field('username')->where('site_id',$this->site_id)->where('member_id='.$this->member_id)->findOrEmpty()->toArray();

        $result = ( new LoginService() )->account($member[ 'username' ], $password);

        if (!$result) {
            throw new AuthException('安全密码错误');
        }

        return true;
    }


    public function transfer_balance( )
    {

        $post = input('');
        $tainfo = $this->checkmember();
        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_transfer_balance']!=1){
            throw new CommonException('转赠余额功能已关闭');
        }
        if($config['is_password']==1){
            $this->check_password();
        }
        if($config['is_sms']==1){
            $this->check_sms_code();
        }
        Db::startTrans();
        try {


        $zhuan_money =  round($post['number'],2);
        $shouxufei = round($post['number']*($config['transfer_balance_fee']/100),2);
        $give_money = round($zhuan_money-$shouxufei,2);

        $order = [
            'site_id' => $this->site_id,
            'member_id' => $this->member_id,
            'account_type' => 'balance',
            'order_no' => create_no(),
            'to_member_id' => $tainfo['member_id'],
            'zhuan_money' => $zhuan_money,
            'give_money' => $give_money,
            'shouxufei' => $shouxufei,
            'meno' =>'转赠余额',
            'create_time' =>time(),
            'status'=>2,
        ];
        $log_id = (new Log())->strict(false)->insertGetId($order);



        ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::BALANCE, -$zhuan_money, 'transfer_balance_zhuan', '转赠扣除余额', $order['order_no']);


        ( new CoreMemberAccountService() )->addLog($order['site_id'], $tainfo['member_id'], MemberAccountTypeDict::BALANCE,$give_money, 'transfer_balance_give', '获得余额转赠', $order['order_no']);

            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;

        return true;
    }


    public function transfer_point( )
    {

        $post = input('');
        $tainfo = $this->checkmember();
        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_transfer_point']!=1){
            throw new CommonException('转赠积分功能已关闭');
        }
        if($config['is_password']==1){
            $this->check_password();
        }
        if($config['is_sms']==1){
            $this->check_sms_code();
        }

        /**手续费扣余额 作者:haha1256610  2025/1/25 下午10:36  **/
        if($config['transfer_point_fee_type']==2){
             return   $this->transfer_point_kou_yue($config,$tainfo);
             //支付
        }else if($config['transfer_point_fee_type']==3){
            return   $this->transfer_point_kou_pay($config,$tainfo);
        }

      Db::startTrans();
      try {

          $zhuan_money =  round($post['number'],2);
          if($config['transfer_point_fee_unit']==1){
              $shouxufei = round($post['number']*($config['transfer_point_fee']/100),2);
          }else if($config['transfer_point_fee_unit']==2){
              $shouxufei = round($post['number'],2);
          }

          $give_money = round($zhuan_money-$shouxufei,2);


          $order = [
              'site_id' => $this->site_id,
              'member_id' => $this->member_id,
              'account_type' => 'point',
              'order_no' => create_no(),
              'to_member_id' => $tainfo['member_id'],
              'zhuan_money' => $zhuan_money,
              'give_money' => $give_money,
              'shouxufei' => $shouxufei,
              'meno' =>'转赠积分',
              'create_time' =>time(),
              'status'=>2,
          ];
          $log_id = (new Log())->strict(false)->insertGetId($order);


          ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::POINT, -$zhuan_money, 'transfer_point_zhuan', '转赠扣除积分', $order['order_no']);

          ( new CoreMemberAccountService() )->addLog($order['site_id'], $tainfo['member_id'], MemberAccountTypeDict::POINT,$give_money, 'transfer_point_give', '获得积分转赠', $order['order_no']);


      	Db::commit();
      } catch (Exception $e) {
      	Db::rollback();
          throw new CommonException($e->getMessage());
      }
        return true;
    }


    /** 转积分扣除余额手续费 作者:haha1256610  2025/1/25 下午10:44  **/
    public function transfer_point_kou_yue($config,$tainfo)
    {

        $post = input('');

        Db::startTrans();
        try {

            $zhuan_money =  round($post['number'],2);
            if($config['transfer_point_fee_unit']==1){
                $shouxufei = round($post['number']*($config['transfer_point_fee']/100),2);
            }else if($config['transfer_point_fee_unit']==2){
                $shouxufei = round($config['transfer_point_fee'],2);
            }


            /** 直接获取的转赠全部金额 作者:haha1256610  2025/1/25 下午10:30  **/
            $give_money = round($zhuan_money,2);


            $order = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'account_type' => 'point',
                'order_no' => create_no(),
                'to_member_id' => $tainfo['member_id'],
                'zhuan_money' => $zhuan_money,
                'give_money' => $give_money,
                'shouxufei' => $shouxufei,
                'meno' =>'转赠积分扣除余额手续费'.$shouxufei.'元',
                'create_time' =>time(),
                'status'=>2,

            ];
            $log_id = (new Log())->strict(false)->insertGetId($order);


            /** 余额 作者:haha1256610  2025/1/25 下午10:30  **/
            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::BALANCE, -$shouxufei, 'transfer_balance_zhuan', '转赠积分扣除余额', $order['order_no']);

            ( new CoreMemberAccountService() )->addLog($order['site_id'], $tainfo['member_id'], MemberAccountTypeDict::POINT,$give_money, 'transfer_point_give', '获得积分转赠', $order['order_no']);


            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;
    }
    /** 转积分扣除现金手续费 作者:haha1256610  2025/1/25 下午10:44  **/
    public function transfer_point_kou_pay($config,$tainfo)
    {

        $post = input('');

        Db::startTrans();
        try {

            $zhuan_money =  round($post['number'],2);
            if($config['transfer_point_fee_unit']==1){
                $shouxufei = round($post['number']*($config['transfer_point_fee']/100),2);
            }else if($config['transfer_point_fee_unit']==2){
                $shouxufei = round($config['transfer_point_fee'],2);
            }


            /** 直接获取的转赠全部金额 作者:haha1256610  2025/1/25 下午10:30  **/
            $give_money = round($zhuan_money,2);


            $order = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'account_type' => 'point',
                'order_no' => create_no(),
                'to_member_id' => $tainfo['member_id'],
                'zhuan_money' => $zhuan_money,
                'give_money' => $give_money,
                'shouxufei' => $shouxufei,
                'meno' =>'转赠积分在线支付手续费'.$shouxufei.'元',
                'create_time' =>time(),
                /**  作者:haha1256610  2025/1/25 下午11:42  **/
                'status'=>1,
                'give_text'=>'获得积分转赠',
                'type'=>'transfer_point'
            ];
            $log_id = (new Log())->strict(false)->insertGetId($order);


            $order_data = [
                'order_from' => $post[ 'order_from' ] ?? 'h5',
                'order_type' => 'transfer_pay',
                'order_no' => create_no(),
                'order_status' => 1,
                'member_id' => $this->member_id,
                'ip' => request()->ip() ?? '',
                'log_id' => $log_id,
                'order_money' => $shouxufei,
                'site_id' => $this->site_id,
            ];
            $create_order = ( new Order() )->create($order_data);
            $order_id = $create_order->order_id;

            //添加订单支付表
            ( new CorePayService() )->create($order_data['site_id'], PayDict::MEMBER, $order_data[ 'member_id' ], $order_data[ 'order_money' ], $order_data[ 'order_type' ], $order_id, get_lang("dict_order.trade_type_transfer"));

            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        //返回订单信息
        return [
            'trade_type' => $order_data[ 'order_type' ],
            'trade_id' => $order_id
        ];
    }


    public function transfer_commission( )
    {

        $post = input('');
        $tainfo = $this->checkmember();
        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_transfer_commission']!=1){
            throw new CommonException('转赠佣金功能已关闭');
        }
        if($config['is_password']==1){
            $this->check_password();
        }
        if($config['is_sms']==1){
            $this->check_sms_code();
        }

        Db::startTrans();
        try {

        $zhuan_money =  round($post['number'],2);
        $shouxufei = round($post['number']*($config['transfer_commission_fee']/100),2);
        $give_money = round($zhuan_money-$shouxufei,2);

        $order = [
            'site_id' => $this->site_id,
            'member_id' => $this->member_id,
            'account_type' => 'commission',
            'order_no' => create_no(),
            'to_member_id' => $tainfo['member_id'],
            'zhuan_money' => $zhuan_money,
            'give_money' => $give_money,
            'shouxufei' => $shouxufei,
            'meno' =>'转赠佣金',
            'create_time' =>time(),
            'status'=>2,
        ];
        $log_id = (new Log())->strict(false)->insertGetId($order);



        ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::COMMISSION, -$zhuan_money, 'transfer_commission_zhuan', '转赠扣除佣金', $order['order_no']);


        ( new CoreMemberAccountService() )->addLog($order['site_id'], $tainfo['member_id'], MemberAccountTypeDict::COMMISSION,$give_money, 'transfer_commission_give', '获得佣金转赠', $order['order_no']);

            Db::commit();
      } catch (Exception $e) {
        Db::rollback();
        throw new CommonException($e->getMessage());
    }
    return true;

    }

    public function transfer_coupon( )
    {

        $post = input('');
        $tainfo = $this->checkmember();
        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_transfer_commission']!=1){
            throw new CommonException('转赠优惠券功能已关闭');
        }
        if($config['is_password']==1){
            $this->check_password();
        }
        if($config['is_sms']==1){
            $this->check_sms_code();
        }

        $my_coupon_id =  $post['my_coupon_id']??'';
        if(empty($my_coupon_id)){
            throw new CommonException('请选择优惠券');

        }



        Db::startTrans();
        try {


            $my_coupon = CouponMember::where(['id'=>$my_coupon_id,'member_id'=>$this->member_id])->findOrEmpty()->toArray();
            
            if(empty($my_coupon)){
                throw new CommonException('优惠券不存在');
            }

            if($my_coupon['status']!=1){
                throw new CommonException('优惠券已失效');
            }



            $order = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'account_type' => 'coupon',
                'order_no' => create_no(),
                'to_member_id' => $tainfo['member_id'],
                'zhuan_money' => 0,
                'give_money' => 0,
                'shouxufei' => 0,
                'my_coupon_id' => $my_coupon_id,
                'meno' =>'转赠优惠券',
                'create_time' =>time(),
                'status'=>2,
            ];
            $log_id = (new Log())->strict(false)->insertGetId($order);


            CouponMember::where(['id'=>$my_coupon_id,'site_id'=>$this->site_id])->update(['status'=>2]);


            $indata = $my_coupon;
            $indata['member_id'] = $tainfo['member_id'];
            $indata['expire_time'] = strtotime($my_coupon['expire_time']);
            $indata['create_time'] = time();
            $indata['status'] = 1;
            unset($indata['id']);
            CouponMember::strict(false)->insertGetId($indata);


            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;

    }
}
