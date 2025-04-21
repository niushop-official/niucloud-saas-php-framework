<?php

namespace addon\ly_area\app\service\api;

use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\model\AreaAgent;
use addon\ly_area\app\model\AreaConfig;
use addon\ly_area\app\model\AreaGoods;
use addon\ly_area\app\model\AreaReward;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use addon\ly_area\app\service\core\order\CoreAreaRewardAttrService;
use addon\recharge\app\model\RechargeOrder;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\model\member\Member;
use app\model\member\MemberAccountLog;
use app\service\core\member\CoreMemberService;
use core\base\BaseApiService;
use think\facade\Log;

class AreaAgentService extends BaseApiService
{
    public function __construct(){
        parent::__construct();
        $this->model = new AreaAgent();
    }


    //获取代理信息
    // public function getAgentInfo($member_id, $site_id){
    public function getAgentInfo(){
        $field = '*';
        $info = $this->model->where('member_id', $this->member_id)->where('site_id', $this->site_id)
        // $info = $this->model->where('member_id', $member_id)->where('site_id', $site_id)
            ->with([
                'member' => function ($query){
                    $query->withField('member_id, nickname,  mobile, headimg');
                },
                'hasLevel' => function ($query){
                    $query->withField('level_id, level_name, level_area, level_num, level_rate, level_money');
                }
            ])
            ->field($field)->findOrEmpty()->toArray();
        
        $show_apply = 0;
        if(empty($info)){
            $info = (new CoreMemberService())->find($this->site_id, $this->member_id)->toArray();
            $show_apply = 1;
        }else{
            if($info['full_area'] == null){
                $show_apply = 1;
            }
        }

        $info['show_apply'] = $show_apply;

        $order_money = $this->getAgentOrderStat()['order_money'];
        $order_goods_id = $this->getAgentOrderStat()['order_goods_id'];

        $info['order_goods_id'] = explode(',', $order_goods_id) ?? [];
        // $info['order_goods_id'] = $order_goods_id ?? [];
        $info['order_money'] = $order_money;
 
        return $info;
    }


    public function getAgentNomalInfo(){
        $field = '*';
        $info = $this->model->where('member_id', $this->member_id)->where('site_id', $this->site_id)
            ->with([
                'member' => function ($query) {
                    $query->withField('member_id, nickname,  mobile, headimg');
                },
                'hasLevel' => function ($query) {
                    $query->withField('level_id, level_name, level_area, level_num, level_rate, level_money');
                }
            ])
            ->field($field)->findOrEmpty()->toArray();
        if(empty($info)){
            $info = (new CoreMemberService())->find($this->site_id, $this->member_id)->toArray();
        }

        return $info;
    }


    //代理奖励明细
    public function getRewardLog(){
        $config = (new ConfigService())->getAreaConfig();
        $type = (new AreaConfig())->getTakeTypeAttr($config['area_config']['take_type']);

        $field = 'id,site_id,member_id,buy_mid,agent_id,level_id,agent_area,order_id,order_goods_id,order_amount,dividend_amount,status,is_send,send_time,settle_time,create_time,update_time,delete_time';
        $log = (new AreaReward())->where('site_id', $this->site_id)
            ->where([['member_id', '=', $this->member_id]])
            ->with([
                'member' => function ($query){
                    $query->withField('member_id, nickname,  mobile, headimg');
                },
                'areaLevel' => function ($query){
                    $query->withField('level_id, level_name, level_area, level_num, level_rate, level_money');
                },
                'buyMember' => function ($query){
                    $query->withField('member_id, nickname,  mobile, headimg');
                },
                'shopOrder' => function ($query){
                    $query->withField('order_id, order_no, order_money, status');
                },
                'orderGoods' => function ($query){
                    $query->withField('order_goods_id, goods_id, goods_name, goods_image, goods_money, num, sku_id, sku_name, sku_image');
                }
            ])
            ->field($field)->order('id desc');
        
        return $this->pageQuery($log);
    }


    /**
     * 代理账户奖励明细
     * @return array
     */
    public function getAccountDetail(){
        $config = (new ConfigService())->getAreaConfig();
        $type = (new AreaConfig())->getTakeTypeAttr($config['area_config']['take_type']);

        $info = (new MemberAccountLog())->where('site_id', $this->site_id)
            ->where([['member_id', '=', $this->member_id]])
            ->where('account_type', $type)
            ->where('from_type', 'ly_area')
            ->order('id desc');
            // ->select()->toArray();
        return $this->pageQuery($info);
    }

    //获取代理订单统计
    public function getAgentOrderStat(){
        $order_stat = (new OrderGoods())->where('site_id', $this->site_id)->where('member_id', $this->member_id)->field('sum(order_goods_money) as order_money, count(order_goods_id) as order_num, goods_id')->findOrEmpty()->toArray();

        $recharge_stat = (new RechargeOrder())->where('site_id', $this->site_id)->where('member_id', $this->member_id)->field('sum(order_money) as recharge_money')->findOrEmpty()->toArray();
        
        // 根据goods_id获取商品信息
        $goods_ids = explode(',', $order_stat['goods_id'] ?? '');
        $goods_list = (new Goods())->where('site_id', $this->site_id)->where('goods_id', 'in', $goods_ids)->field('goods_id,goods_name,goods_cover')->select()->toArray();
        
        return [
            'order_money' => $order_stat['order_money'] ?? 0.00,
            'order_num' => $order_stat['order_num'] ?? 0.00,
            'recharge_money' => $recharge_stat['order_money'] ?? 0.00,
            'order_goods_id' => $order_stat['goods_id'] ?? [],
            'goods_list' => $goods_list
        ];
    }


    //获取代理区域订单
    public function getAgentAreaOrder(){
        // $agent = $this->getAgentInfo();
        $agent = $this->getAgentNomalInfo();
        if(empty($agent)) return [];
        // $agent = (new AreaAgent())->where('site_id', $this->site_id)->where('member_id', 1)->findOrEmpty();
        $area_goods = (new CoreAreaRewardAttrService())->getAreaGoodsIds($this->site_id);

        $condition = [];

        if(isset($agent['agent_level'])){
            if($agent['agent_level'] == AreaDict::PROVINCE){
                $condition[] = ['o.taker_province', '=', $agent['province_id']];
            }elseif($agent['agent_level'] == AreaDict::CITY){
                $condition[] = ['o.taker_city', '=', $agent['city_id']];
            }elseif($agent['agent_level'] == AreaDict::DISTRICT){
                $condition[] = ['o.taker_district', '=', $agent['district_id']];
            }
        }else{
            $condition[] = ['o.taker_province', '=', 0];
        }

        $order = (new OrderGoods())->alias('og')
            ->where('og.site_id', $this->site_id)
            ->whereIn('og.goods_id',  $area_goods)
            ->join('shop_order o', 'og.order_id = o.order_id')
            ->where($condition)
            ->where('o.create_time', '>=', $agent['create_time'])
            ->whereIn('o.status',  [OrderDict::FINISH, OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE])
            // ->field('o.order_id, o.order_no, o.order_goods_money, o.create_time')
            ->select();
        
        $order_money = 0.00;
        $pay_order = 0;
        $finish_order = 0;

        foreach($order as $k => $v){
            $order_money += $v['order_goods_money'];
            if($v['status'] == OrderDict::FINISH) $finish_order++;
            if($v['status'] == OrderDict::WAIT_DELIVERY || $v['status'] == OrderDict::WAIT_TAKE) $pay_order++;
        }

        return [
            'order_money' => $order_money,
            'order_num' => count($order),
            'order_list' => $order,
            'pay_order' => $pay_order,
            'finish_order' => $finish_order
        ];
    }


    public function getTeamAgentList(){
        $agent = $this->getAgentInfo();
        $where = [];
        if($agent['agent_level'] == AreaDict::PROVINCE){
            $where[] = ['province_id', '=', $agent['province_id']];
        }
        if($agent['agent_level'] == AreaDict::CITY){
            $where[] = ['city_id', '=', $agent['city_id']];
        }

        $list = (new AreaAgent())
            ->where('site_id', $this->site_id)
            ->where($where)
            ->where('member_id', '<>', $agent['member_id'])
            ->where('delete_time', null)
            ->with([
                'member' => function($query){
                    $query->withField('member_id,nickname, mobile,headimg');
                },
                'hasLevel' => function($query){
                    $query->withField('level_id,level_name, level_area, level_num');
                }
            ])
            ->select()->toArray();

        // return $this->pageQuery($list);

        return $list;
    }


    //获取代理列表及代理数量
    public function getAgentList(){
        $agent = $this->getAgentInfo();
        // $agent = (new AreaAgent())->where('site_id', $this->site_id)->where('member_id', 1)->findOrEmpty();

        $list = [];
        if($agent['agent_level'] == AreaDict::PROVINCE){
            $list['city_agent_list'] = $this->getCityList();
            $list['district_agent_list'] = $this->getDistrictOfProvince();
            $list['city_agent_num'] = count($list['city_agent_list']) ?? 0;
            $list['district_agent_num'] = count($list['district_agent_list']) ?? 0;
            $list['all_agent_num'] = $list['city_agent_num'] + $list['district_agent_num'];
        }

        if($agent['agent_level'] == AreaDict::CITY){
            $list['city_agent_list'] = $this->getCityList() ?: [];
            $list['district_agent_list'] = $this->getDistrictList() ?: [];
            $list['city_agent_num'] = count($list['city_agent_list']) ?? 0;
            $list['district_agent_num'] = count($list['district_agent_list']) ?? 0;
            $list['all_agent_num'] = $list['district_agent_num'] + $list['city_agent_num'] ?? 0;
        }

        if($agent['agent_level'] == AreaDict::DISTRICT){
            $list['district_agent_list'] = $this->getDistrictList() ?: [];
            $list['all_agent_num'] = count($list['district_agent_list']) ?? 0;
        }

        return $list;
    }


    //获取当前省级代理区域内的市级代理
    public function getCityList(){
        $agent = $this->getAgentInfo();
        // $agent = (new AreaAgent())->where('site_id', $this->site_id)->where('member_id', 1)->findOrEmpty();
        $list = (new AreaAgent())->where('site_id', $this->site_id)->where('province_id', $agent['province_id'])
            ->where('agent_level', AreaDict::CITY)
            ->where('member_id', '<>', $agent['member_id'])
            ->where('delete_time', null)
            ->with([
                'member' => function($query){
                    $query->withField('member_id,nickname,  mobile,headimg');
                },
                'hasLevel' => function($query){
                    $query->withField('level_id,level_name, level_area, level_num');
                }
            ])->select()->toArray();

        return $list;
    }


    //获取当前市级代理区域内的区县代理
    public function getDistrictList($area_agent = null){
        $agent = $this->getAgentInfo();
        //  $agent = (new AreaAgent())->where('site_id', $this->site_id)->where('member_id', 1)->findOrEmpty();

        $list = (new AreaAgent())->where('site_id', $this->site_id)->where('city_id', $agent['city_id'])
            ->where('agent_level', AreaDict::DISTRICT)
            ->where('member_id', '<>', $agent['member_id'])
            ->where('delete_time', null)
            ->with([
                'member' => function($query){
                    $query->withField('member_id,nickname, mobile,headimg');
                },
                'hasLevel' => function($query){
                    $query->withField('level_id,level_name, level_area, level_num');
                }
            ])->select()->toArray();

        return $list;
    }


    //获取当前省级代理区域内的区县代理
    public function getDistrictOfProvince(){
        $city_list = $this->getCityList();
        $list = [];
        foreach($city_list as $k => $v){
            $list[$k]['city_agent'] = $v;
            // $list[$k]['district_agent_list'] = $this->getDistrictList($v);
            $list['district_agent_list'] = $this->getDistrictList($v);
        }
        return $list;
    }
    
}