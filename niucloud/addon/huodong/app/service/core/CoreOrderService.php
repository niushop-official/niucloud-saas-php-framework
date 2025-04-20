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

namespace addon\huodong\app\service\core;

use addon\huodong\app\model\fxuser\Fxuser;
use addon\huodong\app\model\order\Order;
use addon\huodong\app\model\user\User;
use addon\huodong\app\model\act\Act;
use addon\huodong\app\dict\order\OrderDict;
use app\dict\pay\PayDict;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use app\model\verify\Verifier;
use app\model\member\Member;
use app\service\core\pay\CoreRefundService;
use app\service\core\verify\CoreVerifyService;
use app\service\api\verify\VerifyService;
use think\facade\Log;
use app\job\member\MemberGiftGrantJob;
use app\dict\member\MemberAccountChangeTypeDict;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use addon\huodong\app\service\core\ConfigService;
use addon\huodong\app\model\relation\Relation;
use app\service\core\diy_form\CoreDiyFormRecordsService;

class CoreOrderService extends BaseCoreService
{

    /**
     * 订单创建
     * @param array $data //[‘member_id’ => 1， 'order_from' => 'h5', 'member_message' => '','huodong_money' => 12.00]
     * @return array
     */
    public function create(array $data)
    {
        $act = $info = Act::where([ [ 'id', '=', $data['act_id'] ] ])->findOrEmpty()->toArray();
        if(!$data[ 'member_id' ]){
            throw new CommonException('请先登录');
        }

        $isbaoming = Order::where(['member_id'=>$data[ 'member_id' ],'act_id'=>$info['id'],"site_id"=>$data[ 'site_id' ]])->where('order_status','in','1,2')->findOrEmpty()->toArray();
        $info['isbaoming'] = !empty($isbaoming) ? 1 : 0;
        if( $info['isbaoming'] ==1){
            throw new CommonException('已报名该活动，请勿重复报名');
        }
        $member = (new Member())->where('member_id', $data[ 'member_id' ])->findOrEmpty()->toArray();
        if(!isset($data['is_super'])){
            $has_num = Order::where(['act_id'=>$data['act_id'],"site_id"=>$data['site_id']])->where('order_status','>=',0)->count();
            $act['has_num'] = $has_num;
            $act['is_man'] = 0;
            if(intval($act['num'])>0&&$act['has_num']>=$act['num']){
                throw new CommonException('来晚了,活动已满人啦~~');
            }

            $info['usertype'] = $info['usertype']?explode(',',$info['usertype']):[-1];
            if(!in_array(-1,$info['usertype'])){
                if($member['member_level']==0&&!in_array(0,$info['usertype'])){
                    throw new CommonException('当前用户等级无法参与!');
                }
                if($member['member_level']>0&&!in_array($member['member_level'],$info['usertype'])){
                    throw new CommonException('当前用户等级不符合报名要求!');
                }
            }
        }


        /**  作者:haha1256610  2024/12/11 上午10:01  **/
        if(isset($info['vip_mianfei'])&&$info['vip_mianfei']==1&&$member['member_level']>0){
            $act['is_pay'] = 0;
            $act['price'] = 0;
        }

        if($act['is_pay']==0){
            $act[ 'price' ] = 0;
        }
        //$act[ 'price' ] = 100;//
        /**  作者:haha1256610  2025/1/20 下午3:18  **/
        $data = $this->get_pid($data);
        $order_data = [
            'order_from' => $data[ 'order_from' ] ?? 'h5',
            'order_type' => 'huodong',
            'order_status' => OrderDict::WAIT_PAY,
            'member_id' => $data[ 'member_id' ],
            'ip' => request()->ip() ?? '',
            'act_id' => $data[ 'act_id' ] ?? '',
            'realname' => $data[ 'realname' ] ?? '',
            'mobile' => $data[ 'mobile' ] ?? '',
            'jietu_image' => $data[ 'jietu_image' ] ?? '',
            'douyin_url' => $data[ 'douyin_url' ] ?? '',
            'kuaishou_url' => $data[ 'kuaishou_url' ] ?? '',
            'xiaohongshu_url' => $data[ 'xiaohongshu_url' ] ?? '',
            'shipinhao_url' => $data[ 'shipinhao_url' ] ?? '',


            'order_discount_money' => 0,
            'order_money' => $act[ 'price' ],
            'site_id' => $data['site_id'],
            'pid' => intval($data['pid']??0),
            'pid2' => intval($data['pid2']??0),
        ];

        /** 分销 作者:haha1256610  2025/1/26 下午2:02  **/
        $this->set_relation($order_data);
        $config = (new ConfigService())->getConfig($order_data['site_id']);
        if($config['open_fenxiao_gifts']==1&&$config['fenxiao_gifts_type']==2){
            $order_data['pid_price'] = round($config['fenxiao_rate1']*$order_data['order_money']*0.01,2);
            $order_data['pid2_price'] = round($config['fenxiao_rate2']*$order_data['order_money']*0.01,2);
        }


        $this->set_relation($order_data);



        Db::startTrans();
        try {


            /**  作者:haha1256610  2025/3/20 下午8:06  **/
            if(isset($data)&&$data['form_data']){
                $data['form_data']['site_id'] = $data['site_id'];
                $data['form_data']['member_id'] = $data['member_id'];
                $order_data['form_record_id'] = (new CoreDiyFormRecordsService)->add($data['form_data']);
                $order_data['form_id'] = $data['form_data']['form_id'];
            }

            /** 是否填写过报名信息 作者:haha1256610  2025/3/20 下午8:19  **/
            $user = (new User())->where('member_id', $order_data['member_id'])->findOrEmpty()->toArray();
            $config = (new ConfigService())->getConfig($order_data['site_id']);
            if($config['one_tianbiao']==1&&!empty($user)){
                $last_order = (new Order())->where('member_id',$order_data['member_id'])->order('order_id desc')->findOrEmpty()->toArray();
                $order_data['form_record_id'] = $last_order['form_record_id'];
                $order_data['form_id'] = $last_order['form_id'];
                unset($last_order);
            }


            //添加订单表
            $order_data[ 'order_no' ] = create_no();
            $create_order = ( new Order() )->create($order_data);

            
            
            $order_id = $create_order->order_id;
            if($order_data['order_money']==0||$act['is_pay']==0){
                $pay_info['trade_id'] = $order_id;
                $pay_info['out_trade_no'] = $order_id.rand(1000,9999);

                if(isset($data['is_no_create_verify'])){
                    $pay_info['is_no_create_verify'] = 1;
                }

                $this->pay_notify($pay_info);
                Db::commit();
                return [
                    'trade_id' => -100
                ];
            }
            //添加订单支付表
            ( new CorePayService() )->create($data['site_id'], PayDict::MEMBER, $order_data[ 'member_id' ], $order_data[ 'order_money' ], $order_data[ 'order_type' ], $order_id, get_lang("dict_order.trade_type_huodong"));
            Db::commit();
            //返回订单信息
            return [
                'trade_type' => $order_data[ 'order_type' ],
                'trade_id' => $order_id
            ];
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    public function add_huodong_user($order)
    {



        if(!isset($order['form_record_id'])||empty($order['form_record_id'])){
          return;
      }
      $form_data = (new CoreDiyFormRecordsService)->getInfo(['site_id'=>$order['site_id'],'record_id'=>$order['form_record_id']]);


        $form_data = $form_data['value']??[];

        $indata['member_id'] = $order['member_id'];
      foreach ($form_data as $k => &$v) {
          if(strpos($v["field"]['name'],'姓名')!==false){
              $indata['realname'] = $v["field"]['value'];
          };
          if(strpos($v["field"]['name'],'手机')!==false||strpos($v["field"]['name'],'电话')!==false){
              $indata['mobile'] = $v["field"]['value'];
          };
          if(strpos($v["field"]['name'],'身份证号')!==false){
              $indata['idcard'] = $v["field"]['value'];
          };
      }

        $user = (new User())->where('member_id', $order['member_id'])->findOrEmpty()->toArray();
          if(empty($user)){
              (new User())->strict(false)->insertGetId($indata);
          }else{
              (new User())->where('member_id', $order['member_id'])->update($indata);
          }

    }


    /** 推广员 作者:haha1256610  2025/1/21 上午10:56  **/
    public function get_pid($data)
    {

        //之前有绑定
        $relation = (new Relation())->where([['member_id', "=", $data['member_id']??0]])->where([['site_id', "=", $data['site_id']]])->findOrEmpty()->toArray();
        if(!empty($relation)){
            $data['pid'] = $relation['pid'];
        }

        $pinfo = Fxuser::where('member_id', $data['pid'])->where([['site_id', "=", $data['site_id']]])->where('status',2)->findOrEmpty()->toArray();


        if(empty($pinfo)){
            $data['pid'] =  0;
            return $data;
        }

        if($pinfo[ 'member_id' ]==$data[ 'member_id' ]){
            $data['pid'] =  0;
            return $data;
        }



        $pRelation = (new Relation())->where([['member_id', "=", $data['pid']??0]])->where([['site_id', "=", $data['site_id']]])->findOrEmpty()->toArray();


        $data['pid2'] = $pRelation['pid']??0;
        return $data;
    }

    /** //绑定关系 作者:haha1256610  2025/1/21 下午6:27  **/
    public function set_relation($data)
    {
        $post = input('');
        if(!$data['pid']) return;

        $relation = Relation::where('member_id', $data[ 'member_id' ])->where([['site_id', "=", $data['site_id']]])->findOrEmpty()->toArray();


        if(empty($relation)){
            $indata['site_id'] = $data['site_id'];
            $indata['member_id'] = $data['member_id'];
            Relation::strict(false)->insertGetId($indata);
            $relation = Relation::where('member_id', $data[ 'member_id' ])->where([['site_id', "=", $data['site_id']]])->findOrEmpty()->toArray();
        }
        if($relation['pid']>0){
            return false;
        }

        $Fxuser = Fxuser::where('member_id', $data['pid'])->where([['site_id', "=", $data['site_id']]])->where('status',2)->findOrEmpty()->toArray();
        if(empty($Fxuser)){
            return;
        }
        $p_pid = Relation::where('member_id', $Fxuser[ 'member_id' ])->where([['site_id', "=", $data['site_id']]])->value('pid');

        $updata['pid'] = $Fxuser[ 'member_id' ];
        $updata['pid2'] =$p_pid;
        Relation::where('id', $relation['id'])->strict(false)->update($updata);


        return true;
    }


    /**
     * 订单支付
     * @param array $pay_info
     * @return true
     */
    public function pay_notify(array $pay_info)
    {
        try {
            $trade_id = $pay_info[ 'trade_id' ] ?? 0;
            $order_model = new Order();
            $order_info = $order_model->where([ [ 'order_id', '=', $trade_id ] ])->findOrEmpty()->toArray();
            if (empty($order_info))
                throw new CommonException('ORDER_NOT_EXIST');
            $order_data = [
                'pay_time'      => time(),
                'order_status'  => OrderDict::WAIT_HX,
                'out_trade_no'  => $pay_info[ 'out_trade_no' ]//支付后的交易流水号
            ];
            $act = Act::where([ [ 'id', '=', $order_info['act_id'] ] ])->findOrEmpty()->toArray();
            if($act['is_hexiao']==0) {
                $order_data['order_status'] = OrderDict::FINISH;
            }

            /** 分销佣金 作者:haha1256610  2025/1/26 下午2:04  **/
            $config = (new ConfigService())->getConfig($order_info['site_id']);
            if($config['open_fenxiao_gifts']==1){
                $order_data['yongjin_status'] = 1;
            }


            (new Act())->where([ [ 'id', '=', $act[ 'id' ] ] ])->inc('sales',1)->update();
            $order_model->where([ [ 'order_id', '=', $trade_id ] ])->update($order_data);

            if(!isset($pay_info['is_no_create_verify'])){
                $this->create_verify($order_info);
            }
            /**  作者:haha1256610  2025/3/20 下午2:07  **/ 
            $this->add_huodong_user($order_info);

            event('AfterHuoDongOrderPay', $order_info);

            if($act['is_hexiao']==0) {
                $order_data['order_status'] = OrderDict::FINISH;
                $order = (new Order())->where([ [ 'order_id', '=', $trade_id ] ])->findOrEmpty()->toArray();
                $this->hexiao_finish($order);
            }
            return true;
        } catch (Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    public function create_verify($order)
    {
        $order = $this->orderInfo($order['order_id']);

        $data = [
            'order_id' => $order['order_id'],
            'site_id' => $order['site_id'],
            'order_no' => $order['order_no'],
            'order_status' => $order['order_status'],
            'member_id' => $order['member_id'],
        ];

        $ret = (new CoreVerifyService())->create($order['site_id'], $order['member_id'],'huodongVerify',$data);
        $updata['hexiao_url'] = $ret[0]??'';
        Order::where([ [ 'order_id', '=', $order['order_id'] ] ])->update($updata);

        return $updata['hexiao_url'];
    }

    public function hexiao( $order_no)
    {
        $order = ( new Order() )->where([ [ 'order_no', '=', $order_no ], ])->find();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status == OrderDict::FINISH) throw new CommonException('已核销成功');
        if ($order->order_status != OrderDict::WAIT_HX) {
            throw new CommonException('已失效');
        };
        $act = Act::where([ [ 'id', '=', $order['act_id'] ] ])->findOrEmpty()->toArray();
        if( empty($act) || strtotime($act['endtime'])<time() ){
            throw new CommonException('活动已过期');
        }

//        if(isset($act['hxstartime'])&&$act['hxstartime']&&time()<strtotime($act['hxstartime'])){
//            throw new CommonException('未到达核销时间, 仅限'.$act['hxstartime'].'以后核销');
//
//        }else if(date('Y-m-d',strtotime($act['startime'])) != date('Y-m-d')){
//            throw new CommonException('未到达核销时间, 仅限当天('.date('Y-m-d',strtotime($act['startime'])).')核销');
//        }

        $order->save([ 'order_status' => OrderDict::FINISH ,'hx_member_id' => $order['member_id'],'hx_time'=>time() ]);
        $this->hexiao_finish(( new Order() )->where([ [ 'order_no', '=', $order_no ] ])->findOrEmpty()->toArray());
        return true;
    }

    /**
     * 扫码器核销
     * 0001 核销成功
     * 0002 无效
     * 0003 已过期
     * 0004 活动不存在
     * 0005 未到时间
     */
    public function urlhexiao( array $data)
    {
        // 替换 && 为 &，因为 parse_str 默认处理 & 作为分隔符
        $post = str_replace('&&', '&', file_get_contents('php://input'));
        parse_str($post, $params);
        $order_no = $params['vgdecoderesult'] ?? '';

        $order = ( new Order() )->where([ [ 'hexiao_url', '=', $order_no ] ])->findOrEmpty()->toArray();
        if (empty($order)){
            echo 'code=0002';die;
        };
        if ($order['order_status'] != OrderDict::WAIT_HX) {
            echo 'code=0001';die;
        };

        $act = Act::where([ [ 'id', '=', $order['act_id'] ] ])->findOrEmpty()->toArray();
        if(empty($act)){
            echo 'code=0004';die;
        }elseif( strtotime($act['endtime'])<time() ){
            echo 'code=0003';die;
        }elseif(date('Y-m-d',strtotime($act['startime'])) != date('Y-m-d')){
            echo 'code=0005';die;
        }

        ( new Order() )->where('order_id', $order['order_id'])->strict(false)->update([ 'order_status' => OrderDict::FINISH ,'hx_time'=>time() ]);

        $this->hexiao_finish(( new Order() )->where([ [ 'order_id', '=', $order['order_id'] ] ])->findOrEmpty()->toArray());
        echo 'code=0001';die;
    }

    public function hexiao_finish($order)
    {
        $post = input('');

        $act = Act::where([ [ 'id', '=', $order['act_id'] ] ])->findOrEmpty()->toArray();



        $config = (new ConfigService())->getConfig($order['site_id']);
        if(isset($config['open_send_point'])&&$config['open_send_point']==1){
            //手动发放奖励
            if(isset($post['point'])&&$post['point']>=0){

                $give_money = $post['point'];
                ( new CoreMemberAccountService() )->addLog($order['site_id'], $order['member_id'], MemberAccountTypeDict::POINT,$give_money, 'adjust', '参与活动报名奖励', $order['order_no']);

                ( new Order() )->where('order_id', $order['order_id'])->strict(false)->update([ 'is_jiangli' => 1,'point'=>$give_money ]);
            }


        }else{
            // 自动发放奖励
            if($act['level_gifts']){
                $act['level_gifts'] = json_decode($act['level_gifts'],true);
                $ret =  MemberGiftGrantJob::dispatch([
                    'site_id' => $act['site_id'],
                    'member_id' => $order['member_id'],
                    'gift' => $act['level_gifts'],
                    'param' => [
                        'from_type' => 'adjust',
                        'memo' => '参与活动报名奖励'
                    ]
                ]);

                $updata = [ 'is_jiangli' => 1 ];
                if(isset($act['level_gifts']['point'])&&$act['level_gifts']['point']['is_use']==1){
                    $updata['point'] = $act['level_gifts']['point']['num'];
                }
                ( new Order() )->where('order_id', $order['order_id'])->strict(false)->update($updata);
            }
        }


        //给推广员发放奖励 2025年1月21日 10:49:52

        /** 分销佣金 作者:haha1256610  2025/1/26 下午2:04  **/
        $config = (new ConfigService())->getConfig($order['site_id']);
        if($config['open_fenxiao_gifts']==1&&$order['yongjin_status']==1){

            if($config['fenxiao_gifts_type']==1){

                $this->send_gifts($order,$config);
            }else{
                $this->send_yongjin($order);

            }

        }

        //内置活动订单事件监听
        event('AfterHuoDongHexiaoOrder', $order);
    }

    /** 发放佣金 作者:haha1256610  2025/1/26 下午2:08  **/
    public function send_yongjin($order)
    {
        if($order['yongjin_status']==1){
            ( new Order() )->where('order_id', $order['order_id'])->strict(false)->update([ 'yongjin_status' => 2 ]);
            if($order['pid']>0){
                ( new CoreMemberAccountService() )->addLog($order['site_id'], $order['pid'], MemberAccountTypeDict::COMMISSION,$order['pid_price'], 'huodong_fenxiao', '推荐用户进行活动报名获得一级奖励', $order['order_no']);


                $indata = [];
                $indata['site_id'] = $order['site_id'];
                $indata['member_id'] = $order['pid'];
                $indata['account_type'] = 'balance';
                $indata['account_data'] = $order['pid_price'];
                $indata['from_type'] = 'huodong_fenxiao';
                $indata['related_id'] = $order['order_id'];
                $indata['status'] = 2;
                $indata['fxlevel'] = 1;
                $indata['from_member_id'] = $order['member_id'];
                $indata['memo'] = '推荐用户进行活动报名获得一级奖励';
                $indata['create_time'] = time();
                $indata['account_text'] = '佣金奖励';

                Db::name('huodong_fxbill')->strict(false)->insertGetId($indata);


                if($order['pid2']>0){
                    ( new CoreMemberAccountService() )->addLog($order['site_id'], $order['pid'], MemberAccountTypeDict::COMMISSION,$order['pid2_price'], 'huodong_fenxiao', '推荐用户进行活动报名获得二级奖励', $order['order_no']);


                    $indata = [];
                    $indata['site_id'] = $order['site_id'];
                    $indata['member_id'] = $order['pid2'];
                    $indata['account_type'] = 'balance';
                    $indata['account_data'] = $order['pid2_price'];
                    $indata['from_type'] = 'huodong_fenxiao';
                    $indata['related_id'] = $order['order_id'];
                    $indata['from_member_id'] = $order['member_id'];
                    $indata['memo'] = '推荐用户进行活动报名获得二级奖励';
                    $indata['status'] = 2;
                    $indata['fxlevel'] = 2;
                    $indata['create_time'] = time();
                    $indata['account_text'] = '佣金奖励';

                    Db::name('huodong_fxbill')->strict(false)->insertGetId($indata);

                }
            }

        }
    }
    /** 发放固定奖励 作者:haha1256610  2025/1/26 下午2:08  **/
    public function send_gifts($order, $config)
    {
        if($order['yongjin_status']==1){
            ( new Order() )->where('order_id', $order['order_id'])->strict(false)->update([ 'yongjin_status' => 2 ]);
            if($order['pid']>0){
                $fenxiao_gifts = $config['fenxiao_gifts'];

                /*  {
     "shop_coupon": {
       "is_use": 0,
       "coupon_id": [],
       "coupon_list": []
     },
     "balance": {
       "is_use": 1,
       "money": "1"
     },
     "point": {
       "is_use": 1,
       "num": "2"
     },
     "commission": {
       "is_use": 1,
       "num": "3"
     }
   }*/

                foreach ($fenxiao_gifts as $k => &$v) {
                    if($v['is_use']!=1){
                        continue;
                    }

                    if($k=='commission'){
                        $type = MemberAccountTypeDict::COMMISSION;
                        $account_text = '佣金奖励';
                        $account_type =  'commission';
                        $pid_price = $v['num'];
                    }else if($k=='point'){
                        $type = MemberAccountTypeDict::POINT;
                        $account_text = '积分奖励';
                        $account_type =  'point';
                        $pid_price = $v['num'];
                    }else if($k=='balance'){
                        $type = MemberAccountTypeDict::BALANCE;
                        $account_text = '现金奖励';
                        $account_type =  'balance';
                        $pid_price = $v['money'];
                    }


                    ( new CoreMemberAccountService() )->addLog($order['site_id'], $order['pid'], $type,$pid_price, 'huodong_fenxiao', '推荐用户进行活动报名获得一级奖励', $order['order_no']);


                    $indata = [];
                    $indata['site_id'] = $order['site_id'];
                    $indata['member_id'] = $order['pid'];
                    $indata['account_type'] = $account_type;
                    $indata['account_data'] = $pid_price;
                    $indata['from_type'] = '活动报名推广奖励';
                    $indata['related_id'] = $order['order_id'];
                    $indata['related_id'] = $order['order_id'];
                    $indata['status'] = 2;
                    $indata['fxlevel'] = 1;
                    $indata['account_text'] = $account_text;
                    $indata['from_member_id'] = $order['member_id'];
                    $indata['memo'] = '推荐用户进行活动报名获得一级奖励';
                    $indata['create_time'] = time();
                    Db::name('huodong_fxbill')->strict(false)->insertGetId($indata);
                }



                if($order['pid2']>0){
                    foreach ($fenxiao_gifts as $k => &$v) {
                        if($v['is_use']!=1){
                            continue;
                        }
                        if($k=='commission'){
                            $type = MemberAccountTypeDict::COMMISSION;
                            $account_text = '佣金奖励';
                            $account_type =  'commission';
                            $pid2_price = $v['num'];
                        }else if($k=='point'){
                            $type = MemberAccountTypeDict::POINT;
                            $account_text = '积分奖励';
                            $account_type =  'point';
                            $pid2_price = $v['num'];
                        }else if($k=='balance'){
                            $type = MemberAccountTypeDict::BALANCE;
                            $account_text = '现金奖励';
                            $account_type =  'balance';
                            $pid2_price = $v['money'];
                        }

                        ( new CoreMemberAccountService() )->addLog($order['site_id'], $order['pid2'], $type,$pid2_price, 'huodong_fenxiao', '推荐用户进行活动报名获得二级奖励', $order['order_no']);


                        $indata = [];
                        $indata['site_id'] = $order['site_id'];
                        $indata['member_id'] = $order['pid2'];
                        $indata['account_type'] = $account_type;
                        $indata['account_data'] = $pid2_price;
                        $indata['from_type'] = '活动报名推广奖励';
                        $indata['related_id'] = $order['order_id'];
                        $indata['from_member_id'] = $order['member_id'];
                        $indata['memo'] = '推荐用户进行活动报名获得二级奖励';
                        $indata['status'] = 2;
                        $indata['fxlevel'] = 2;
                        $indata['create_time'] = time();
                        $indata['account_text'] = $account_text;

                        Db::name('huodong_fxbill')->strict(false)->insertGetId($indata);

                    }
                }
            }

        }
    }



    /**
     * 关闭订单
     * @param int $order_id
     * @return true
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function close(int $order_id)
    {
        $order = $this->orderInfo($order_id);
        if (!$order) throw new CommonException('ORDER_NOT_EXIST');
        //如果是支付中的话
        if ($order['order_status'] == OrderDict::CLOSE) throw new CommonException('订单已关闭');
        //关闭支付单据
        if ($order['order_status'] == OrderDict::WAIT_PAY)
            ( new CorePayService() )->closeByTrade($order['site_id'], 'huodong', $order_id);


        /** 2024/12/8 Robin 判断是否允许取消*/
        $config = (new ConfigService())->getConfig($order['site_id']);
        $act = Act::where([ [ 'id', '=', $order['act_id'] ] ])->findOrEmpty()->toArray();
        if(empty($act)){
            throw new CommonException('活动不存在!');
        }elseif(strtotime($act['startime']) < time() && $config['is_allow_cancel']==1 ){
            throw new CommonException('活动已开始,禁止取消订单!');
        }

        /**  作者:haha1256610  2024/12/11 上午8:52  **/
        if($config['cancel_del_jifen']>0){
            //取消扣除积分, 不足会抛出异常
            ( new CoreMemberAccountService() )->addLog($order['site_id'], $order['member_id'], MemberAccountTypeDict::POINT, -$config['cancel_del_jifen'], 'huodong_cancel', '活动取消扣除积分', $order['order_no']);
        }


        /**  2024/11/11 下午5:03  **/
        if($order['order_money']>0&&$order['pay_time']>0){
            $refund_no = ( new CoreRefundService() )->create($order['site_id'],$order[ 'out_trade_no' ], $order[ 'order_money' ], '退款', $order['order_type'], $order['order_id']);
            // 调用支付退款
            ( new CoreRefundService() )->refund($order['site_id'],$refund_no);
        }

        ( new Order() )->where('order_id', $order['order_id'])->update([ 'order_status' => OrderDict::CLOSE  ]);

        //内置活动订单事件监听
        event('AfterHuoDongCancelOrder', $this->orderInfo($order_id));
        return true;
    }

    /**
     * 获取订单信息
     * @param int $order_id
     * @return array
     */
    public function orderInfo(int $order_id)
    {
        return ( new Order() )->where([
            [ 'order_id', '=', $order_id ]
        ])->field('*')->with(['act'])->findOrEmpty()->toArray();
    }

}

