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

namespace addon\shop_fenxiao\app\service\core\settlement;

use addon\shop\app\model\order\OrderGoods;
use addon\shop_fenxiao\app\dict\agent\AgentDict;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoDict;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoGoodsDict;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoSettlementDict;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoGoods;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoMember;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrder;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrderGoods;
use addon\shop_fenxiao\app\service\core\agent\CoreAgentConfigService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;
use addon\shop_fenxiao\app\service\core\team\CoreTeamConfigService;
use core\base\BaseCoreService;


/**
 * 分销订单
 * Class CoreFenxiaoOrderService
 * @package addon\shop_fenxiao\app\service\core
 */
class CoreOrderCalculateService extends BaseCoreService
{
    public $site_id;
    public $order_data = [];//订单
    public $order_goods_list = [];//订单项
    public $member_id = 0;
    public $order_id = 0;
    public $order_no = '';
    public $is_self = false;//购买者和分销商是否是同一个人
    public $fenxiao_member = [];

    public $fenxiao_info = [];
    public $fenxiao_level = [];
    public $fenxiao_member_id = 0;
    public $parent_list = [];
    public $config = [];

    public $fenxiao_goods_list = [];
    public $fenxiao_order_data = [

    ];//分销统计数据
    //数据模板

    public $fenxiao_order_goods_data = [];//分销

    /**
     * 分销订单计算(分销，团队分红，渠道代理)
     * @param $order //订单信息考虑订单商品已经实际查出  直接是基础信息， order_goods(未传入，需要再次查询)
     */
    public function calculate(array $data)
    {
        //订单数据
        $this->order_data = $data['order_data'];
        $this->site_id = $this->order_data['site_id'];
        $this->order_id = $this->order_data['order_id'];
        $this->order_no = $this->order_data['order_no'];
        $this->member_id = $this->order_data['member_id'];

        $fenxiao_config = $this->config('fenxiao');
        //分销是否开启
        if ($fenxiao_config['is_fenxiao'] == 0) return true;

        $this->fenxiao_member = (new FenxiaoMember())->where([['member_id', '=', $this->member_id], ['site_id', '=', $this->site_id]])->findOrEmpty();
        //分销会员不存在
        if ($this->fenxiao_member->isEmpty()) return true;
        $this->fenxiao_member_id = $this->fenxiao_member['fenxiao_member_id'];
        //会员无上级
        if ($this->fenxiao_member_id == 0) return true;
        $this->is_self = $this->fenxiao_member['member_id'] == $this->fenxiao_member_id;
        //查询对应上级分销商信息
        $this->fenxiao_info = (new Fenxiao())->where([['member_id', '=', $this->fenxiao_member_id], ['site_id', '=', $this->site_id]])->findOrEmpty();

        if ($this->fenxiao_info->isEmpty()) return true;
        //查询分销等级

        $this->fenxiao_level = (new FenxiaoLevel())->where([['level_id', '=', $this->fenxiao_info['level_id']]])->findOrEmpty();
        //分销等级如果不存在
        if ($this->fenxiao_level->isEmpty()) return true;
        $this->fenxiao_info['level_data'] = $this->fenxiao_level;
        //获取所有的上级
        $this->parent_list = (new CoreFenxiaoMemberService())->getAllParentWithLevelList($this->fenxiao_member_id);
        //计算分销佣金
        $this->order_goods_list = (new OrderGoods())->where([['order_id', '=', $this->order_id]])->field('*')->select()->toArray();
        //查询对应分销商品设置
        $fenxiao_goods_list = (new FenxiaoGoods())->where([
            ['site_id', '=', $this->site_id],
            ['goods_id', 'in', array_column($this->order_goods_list, 'goods_id')]
        ])->field('*')->with(['goodsRule'])->select()->toArray();
        foreach ($fenxiao_goods_list as &$value){
            $goods_sku_list = [];
            foreach ($value['goodsRule'] as $v){
                $goods_sku_list[$v['sku_id']][$v['level_id']] = $v;
                $goods_sku_list[$v['sku_id']]['calculate_price'] = $v['calculate_price'];
            }
            $value['fenxiao_rule'] = $goods_sku_list;
        }
        $fenxiao_goods_list = array_column($fenxiao_goods_list,null,'goods_id');
        $this->fenxiao_goods_list = $fenxiao_goods_list;

            //初始化分销订单
        $this->fenxiao_order_data = [
            'order_id' => $this->order_id,
            'order_no' => $this->order_no,
            'site_id' => $this->site_id,
            'commission' => 0,
            'commission_fenxiao' => 0,
            'commission_team' => 0,
            'commission_agent' => 0,
            'fenxiao_member_id1' => $this->parent_list[0]['member_id'] ?? 0,
            'fenxiao_member_id2' => $this->parent_list[1]['member_id'] ?? 0,
            'team_members' => [],
            'agent_members' => []
        ];
        //分销佣金计算
        $this->fenxiaoCalculate();
        //代理佣金计算
        $this->agentCalculate();
        //团队分红
        $this->teamCalculate();
        $this->fenxiao_order_data['commission'] = $this->fenxiao_order_data['commission_fenxiao'] + $this->fenxiao_order_data['commission_team'] + $this->fenxiao_order_data['commission_agent'];

        if ($this->fenxiao_order_data) {
            (new FenxiaoOrder())->create($this->fenxiao_order_data);
        }

        //添加对应表

        if (!empty($this->fenxiao_order_goods_data)) {
            (new FenxiaoOrderGoods())->insertAll($this->fenxiao_order_goods_data);
        }

        return true;

    }

    /**
     * 获取配置
     * @param $key
     * @return array|string[]
     */
    public function config($key)
    {
        switch ($key) {
            case 'fenxiao':
                $config = (new CoreFenxiaoConfigService())->getFenxiaoConfig($this->site_id);
                break;
            case 'agent':
                $config = (new CoreAgentConfigService())->getConfig($this->site_id);
                break;
            case 'team':
                $config = (new CoreTeamConfigService())->getConfig($this->site_id);
                break;
        }
        $this->config[$key] = $config;
        return $config;
    }

    /**
     * 分销佣金计算
     * @return void
     */
    public function fenxiaoCalculate()
    {
        $fenxiao_config = $this->config('fenxiao');
        //初始化分销佣金项目
        $fenxiao_order_goods_base = [
            'site_id' => $this->site_id,
            'order_id' => $this->order_id,
            'order_no' => $this->order_no,
            'order_goods_id' => 0,
            'order_goods_money' => 0,
            'commission_type' => FenxiaoSettlementDict::FENXIAO,
            'calculate_type' => 1,  //默认按照1比率计算 2. 固定金额计算
//            'commission_level' => 1,
            'commission_rate' => 0,
            'fenxiao_member_id' => 0,
            'commission' => 0,
        ];
        foreach ($this->order_goods_list as $order_goods_v) {
            $goods_id = $order_goods_v['goods_id'];
            $sku_id = $order_goods_v['sku_id'];
            $num = $order_goods_v['num'];
            //查询商品是否存在分销配置
            $fenxiao_goods = $this->fenxiao_goods_list[$goods_id] ?? [];

            //未设置继续下一个
            if (!$fenxiao_goods) continue;
            //未启动继续下一个
            if ($fenxiao_goods['is_fenxiao'] == 0) continue;

            //整体考虑订单项目分销数据
            $fenxiao_order_goods = $fenxiao_order_goods_base;
            $fenxiao_order_goods['order_goods_id'] = $order_goods_v['order_goods_id'];

            $fenxiao_goods_rule = $fenxiao_goods['fenxiao_rule'][$sku_id] ?? [];

            //计算订单项目分销中商品价格基准
            $calculate_price = $fenxiao_goods_rule['calculate_price'] ?? 0;
            $order_goods_money = $calculate_price > 0 ? $calculate_price * $num : $order_goods_v['order_goods_money'];

            $fenxiao_order_goods['order_goods_money'] = $order_goods_money;

            $fenxiao_goods_rule_type = $fenxiao_goods['fenxiao_type'];//分销商品计算规则

            if($fenxiao_config['self_purchase_rebate'] == 1){//开启自购
                $start_index = 0;
            }else{//关闭自购
                if($this->member_id == $this->parent_list[0]['member_id']){
                    $start_index = 1;
                }else{
                    $start_index = 0;
                }
            }
            //遍历上级

            foreach ($this->parent_list as $k => $v) {

                //一级分销比率
                if ($k == $start_index) {


                    //是否开启自购
                    $first_parent = $this->parent_list[$k] ?? [];

                    $temp_level_info = $first_parent['level_data'];
//                    $one_rate = $this->fenxiao_level['one_rate'];
                    $one_rate = $temp_level_info['one_rate'];
                    if ($first_parent && $first_parent['status'] == FenxiaoDict::NORMAL) {

//                        if (($fenxiao_config['self_purchase_rebate'] == 1 && $this->is_self) || !$this->is_self) {
                            $one_fenxiao_order_goods = $fenxiao_order_goods;
                            $one_fenxiao_order_goods['commission_level'] = 1;
                            $one_fenxiao_order_goods['fenxiao_member_id'] = $first_parent['member_id'];
                            if ($fenxiao_goods_rule_type == 1) {
                                //默认规则
                                $temp_one_calculate_type = 1;
                                $temp_one_data = $one_rate;
                            } else {
                                $one_fenxiao_goods_config = $fenxiao_goods_rule[$first_parent['level_id']] ?? [];

                                //未设置，按照默认规则
                                if (empty($one_fenxiao_goods_config)) {
                                    $temp_one_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                    $temp_one_data = $one_rate;
                                } else {
                                    if ($one_fenxiao_goods_config['one_rate'] > 0) {
                                        //佣金比率计算
                                        $temp_one_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                        $temp_one_data = $one_fenxiao_goods_config['one_rate'];
                                    } elseif ($one_fenxiao_goods_config['one_money'] > 0) {
                                        //固定金额
                                        $temp_one_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_MONEY;
                                        $temp_one_data = $one_fenxiao_goods_config['one_money'] * $num;
                                    } else {
                                        //默认等级
                                        $temp_one_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                        $temp_one_data = $one_rate;
                                    }
                                }
                            }
                            $one_fenxiao_order_goods['calculate_type'] = $temp_one_calculate_type;
                            if ($temp_one_calculate_type == FenxiaoGoodsDict::CALCULATE_TYPE_RATE) {
                                $one_fenxiao_order_goods['commission_rate'] = $temp_one_data; //佣金比率设置为0
                                $one_fenxiao_order_goods['commission'] = $order_goods_money * $temp_one_data / 100;
                            } else {
                                $one_fenxiao_order_goods['commission'] = $temp_one_data;
                            }
                            $this->fenxiao_order_data['commission_fenxiao'] += $one_fenxiao_order_goods['commission'];
                            $this->insertFenxiaoGoodsTemplate($one_fenxiao_order_goods);
//                        }
                    }
                } else if ($k == ($start_index + 1)) {
//                    $two_rate = $this->fenxiao_level['two_rate'];
                    $two_rate = $temp_level_info['two_rate'];
                    //是否开启自购
                    $second_parent = $this->parent_list[$k] ?? [];

                    if ($second_parent && $second_parent['status'] == FenxiaoDict::NORMAL) {
                        if ($fenxiao_config['level'] == 2) {//是否启用二级分销
                            $second_parent_level_id = $second_parent['level_id'];
                            $two_fenxiao_order_goods = $fenxiao_order_goods;
                            $two_fenxiao_order_goods['commission_level'] = 2;
                            $two_fenxiao_order_goods['calculate_type'] = 1; //按照比率计算
                            $two_fenxiao_order_goods['fenxiao_member_id'] = $second_parent['member_id'];

                            if ($fenxiao_goods_rule_type == 1) {
                                //默认规则
                                $temp_two_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                $temp_two_data = $two_rate;
                            } else {
                                $two_fenxiao_goods_config = $fenxiao_goods_rule[$second_parent_level_id] ?? [];
                                //未设置，按照默认规则
                                if (empty($two_fenxiao_goods_config)) {
                                    $temp_two_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                    $temp_two_data = $two_rate;
                                } else {
                                    //按照比率计算
                                    if ($two_fenxiao_goods_config['two_rate'] > 0) {
                                        $temp_two_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;

                                        $temp_two_data = $two_fenxiao_goods_config['two_rate'];
                                    } elseif ($two_fenxiao_goods_config['two_money'] > 0) {
                                        $temp_two_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_MONEY;
                                        $temp_two_data = $two_fenxiao_goods_config['two_money'] * $num;
                                    } else {
                                        $temp_two_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                        $temp_two_data = $two_rate;
                                    }
                                }
                            }
                            $two_fenxiao_order_goods['calculate_type'] = $temp_two_calculate_type;
                            if ($temp_two_calculate_type == FenxiaoGoodsDict::CALCULATE_TYPE_RATE) {
                                $two_fenxiao_order_goods['commission_rate'] = $temp_two_data; //佣金比率设置为0
                                $two_fenxiao_order_goods['commission'] = $order_goods_money * $temp_two_data / 100;
                            } else {
                                $two_fenxiao_order_goods['commission'] = $temp_two_data;
                            }
                            $this->fenxiao_order_data['commission_fenxiao'] += $two_fenxiao_order_goods['commission'];
                            $this->insertFenxiaoGoodsTemplate($two_fenxiao_order_goods);

                        }
                    }

                }

            }
        }
        return true;
    }

    /**
     * 分销商品合并统一数据
     * @return void
     */
    public function insertFenxiaoGoodsTemplate($data)
    {
        $template = [
            'site_id' => $this->site_id,
            'order_id' => $this->order_id,
            'order_no' => $this->order_no,
            'order_goods_id' => 0,
            'order_goods_money' => 0,
            'order_original_goods_money' => 0,
            'calculate_type' => 0,
            'commission_level' => 1,
            'commission_rate' => 0,
            'fenxiao_member_id' => 0,
            'commission' => 0,
            'team_flat_rate' => 0,
            'agent_discount' => 0,
        ];
        $this->fenxiao_order_goods_data[] = array_merge($template, $data);
    }

    /**
     * 代理商佣金计算
     * @return void
     */
    public function agentCalculate()
    {
        $config = $this->config('agent');
        if ($config['is_open'] == 1) {
            foreach ($this->order_goods_list as $order_goods_v) {
                $goods_id = $order_goods_v['goods_id'];
                $sku_id = $order_goods_v['sku_id'];
                $temp_level = 1;
                $num = $order_goods_v['num'];
                $order_goods_money = $order_goods_v['order_goods_money'];
                $original_price = $order_goods_v['original_price'];
                $original_goods_money = $original_price * $num;
                $temp_discount = 10;//基于最大10折
                $temp_commission = 0;//最后一层佣金
                $add_commission = 0;
                foreach ($this->parent_list as $v) {
                    if ($v['is_agent'] == 1 && $v['agent_status'] == AgentDict::NORMAL) {
                        $agent_level_data = $v['agent_level_data'];//代理商等级
                        if (!$agent_level_data) continue;
                        $item_discount = $agent_level_data['discount'];
                        if ($item_discount < $temp_discount) {
                            $agent_order_goods_money = $original_goods_money * $item_discount / 10;
                            if ($order_goods_money > $agent_order_goods_money) {
                                $commission = $order_goods_money - $agent_order_goods_money;
                                if ($commission > $add_commission) {
                                    $temp_commission = $commission - $add_commission;
                                    $add_commission += $temp_commission;
                                    $agent_order_goods_data = [
                                        'site_id' => $this->site_id,
                                        'order_id' => $this->order_id,
                                        'order_no' => $this->order_no,
                                        'order_goods_id' => $order_goods_v['order_goods_id'],
                                        'order_goods_money' => $order_goods_money,
                                        'order_original_goods_money' => $original_goods_money,
                                        'agent_discount' => $item_discount,
                                        'commission_type' => FenxiaoSettlementDict::AGENT,
                                        'commission_level' => $temp_level,
                                        'fenxiao_member_id' => $v['member_id'],
                                        'commission' => $temp_commission,
                                    ];
                                    $this->insertFenxiaoGoodsTemplate($agent_order_goods_data);
                                    $this->fenxiao_order_data['commission'] += $temp_commission;
                                    $this->fenxiao_order_data['commission_agent'] += $temp_commission;
                                    //todo  只记录发放代理佣金的会员
                                    $this->fenxiao_order_data['agent_members'][] = $v['member_id'];

                                    $temp_level++;
                                }
                            }
                            $temp_discount = $item_discount;
                        }

                    }

                }
            }
        }
        return true;
    }

    /**
     * 团队分红佣金计算(上两级团队)
     * @return void
     */
    public function teamCalculate()
    {
        $config = $this->config('team');
        if ($config['is_open']) {
            foreach ($this->order_goods_list as $order_goods_v) {
                $temp_rate = 0;//临时填充比例值
                $temp_level = 1;
                $num = $order_goods_v['num'];
                $order_goods_money = $order_goods_v['order_goods_money'];
                $original_price = $order_goods_v['original_price'];
                $original_goods_money = $original_price * $num;
                $temp_level_num = 0;
                foreach ($this->parent_list as $v) {
                    if ($temp_level > 2) {
                        break;
                    }
                    $level_data = $v['level_data'];//团队等级
                    if($level_data['level_num'] < $temp_level_num){
                        continue;
                    }

                    $team_rate = $level_data['team_rate'];
                    $team_flat_rate = $level_data['team_flat_rate'];

//                    if ($team_rate > $temp_rate) {//大于这个比率算极差
//                        $this_commission = $order_goods_money * ($team_rate - $temp_rate) / 100;
//                    } else if ($team_rate == $temp_rate) {
//                        $this_commission = $order_goods_money * $team_flat_rate / 100;
//                        $temp_team_flat_rate = $team_flat_rate;
//                    } else {
//                        $this_commission = 0;
//                    }

                    if ($team_rate > $temp_rate) {//大于这个比率算极差
                        $this_commission = $order_goods_money * ($team_rate - $temp_rate) / 100;
                    } else{
                        if($level_data['level_num'] == $temp_level_num){
                            $this_commission = $order_goods_money * $team_flat_rate / 100;
                            $temp_team_flat_rate = $team_flat_rate;
                        } else {
                            $this_commission = 0;
                        }
                    }
                    $temp_level_num = $level_data['level_num'];
                    $temp_rate = $team_rate;
                    if ($this_commission > 0) {
                        $team_order_goods_data = [
                            'site_id' => $this->site_id,
                            'order_id' => $this->order_id,
                            'order_no' => $this->order_no,
                            'order_goods_id' => $order_goods_v['order_goods_id'],
                            'order_goods_money' => $order_goods_money,
                            'order_original_goods_money' => $original_goods_money,
                            'commission_type' => FenxiaoSettlementDict::TEAM,
                            'commission_level' => $temp_level,
                            'commission_rate' => $team_rate,
                            'fenxiao_member_id' => $v['member_id'],
                            'commission' => $this_commission,
                            'team_flat_rate' => $temp_team_flat_rate ?? 0,//存在就有值
                        ];
                        $this->insertFenxiaoGoodsTemplate($team_order_goods_data);

                        $this->fenxiao_order_data['commission'] += $this_commission;
                        $this->fenxiao_order_data['commission_team'] += $this_commission;
                        //todo  只记录发放代理佣金的会员
                        $this->fenxiao_order_data['team_members'][] = $v['member_id'];
                    }

                    $temp_level++;

                }
            }
        }
        return true;
    }
}
