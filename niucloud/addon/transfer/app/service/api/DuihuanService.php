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

class DuihuanService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
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


    public function point_balance( )
    {

        $post = input('');

        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_point_balance']!=1){
            throw new CommonException('积分转余额功能已关闭');
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



        $give_money = round($zhuan_money*$config['point_balance_rate'],2);


            $order = [
            'site_id' => $this->site_id,
            'member_id' => $this->member_id,
            'account_type' => 'point',
            'order_no' => create_no(),
            'to_member_id' => $this->member_id,
            'zhuan_money' => $zhuan_money,
            'give_money' => $give_money,
            'shouxufei' => 0,
            'meno' =>'积分转余额',
            'create_time' =>time(),
                'status'=>2,
        ];
        $log_id = (new Log())->strict(false)->insertGetId($order);



            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::POINT, -$zhuan_money, 'transfer_point_balance', '转余额扣除积分', $order['order_no']);


            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::BALANCE, $give_money, 'transfer_point_balance', '积分互转获得余额', $order['order_no']);



            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;

        return true;
    }

    public function balance_point( )
    {

        $post = input('');

        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_balance_point']!=1){
            throw new CommonException('余额转积分功能已关闭');
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



            $give_money = round($zhuan_money/$config['point_balance_rate'],2);


            $order = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'account_type' => 'balance',
                'order_no' => create_no(),
                'to_member_id' => $this->member_id,
                'zhuan_money' => $zhuan_money,
                'give_money' => $give_money,
                'shouxufei' => 0,
                'meno' =>'余额转积分',
                'create_time' =>time(),
                'status'=>2,
            ];
            $log_id = (new Log())->strict(false)->insertGetId($order);



            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::BALANCE, -$zhuan_money, 'transfer_balance_point', '转积分扣除余额', $order['order_no']);


            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::POINT, $give_money, 'transfer_balance_point', '余额互转获得积分', $order['order_no']);



            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;

        return true;
    }



    public function commission_balance( )
    {

        $post = input('');

        $config = (new ConfigService())->getConfig($this->site_id);

        if($config['is_commission_balance']!=1){
            throw new CommonException('佣金转余额功能已关闭');
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



            $give_money = round($zhuan_money*$config['commission_balance_rate'],2);


            $order = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'account_type' => 'commission',
                'order_no' => create_no(),
                'to_member_id' => $this->member_id,
                'zhuan_money' => $zhuan_money,
                'give_money' => $give_money,
                'shouxufei' => 0,
                'meno' =>'佣金转余额',
                'create_time' =>time(),
                'status'=>2,
            ];
            $log_id = (new Log())->strict(false)->insertGetId($order);



            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::COMMISSION, -$zhuan_money, 'transfer_commission_balance', '转余额扣除佣金', $order['order_no']);


            ( new CoreMemberAccountService() )->addLog($order['site_id'], $this->member_id, MemberAccountTypeDict::BALANCE, $give_money, 'transfer_commission_balance', '佣金互转获得余额', $order['order_no']);



            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
        return true;

        return true;
    }

}
