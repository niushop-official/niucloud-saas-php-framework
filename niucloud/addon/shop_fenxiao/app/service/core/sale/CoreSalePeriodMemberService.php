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

namespace addon\shop_fenxiao\app\service\core\sale;

use addon\shop_fenxiao\app\model\sale\SaleMember;
use core\base\BaseCoreService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 销售奖励周期
 */
class CoreSalePeriodMemberService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SaleMember();
    }

    /**
     * 查询比较上一阶
     * @param $site_id
     * @param $member_sale
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getDataDiffPrev($site_id, $member_sale)
    {
        $period_id = $member_sale['period_id'];
        $member_id = $member_sale['member_id'];
        $member_order_money = $member_sale['order_money'] ?? 0;
        $ranking = $this->getRanking($site_id, $period_id);
        $last_member_rank = end($ranking);
        $ranking_member_ids = array_column($ranking, 'member_id');
//        $ranking_member_column = array_column($ranking, null, 'member_id');
        $reward_config = (new CoreSaleConfigService())->getRewardConfig($site_id);
        $condition_order_money = $reward_config['order_money'];
//        $last_rank = $reward_config['last_rank'];
        $reward_list = $reward_config['reward_list'];
        $end_reward = end($reward_list);
        if (!in_array($member_id, $ranking_member_ids)) return ['diff_order_money' => (!empty($ranking) ? ($last_member_rank['order_money'] - $member_order_money) : ($condition_order_money - $member_order_money)), 'prev_reward' => $end_reward['reward']['commission'], 'now_reward' => 0];
        $rank = array_search($member_id, $ranking_member_ids) + 1;
        $temp_reward = [];
        foreach ($reward_list as $reward_list_v) {
            $reward_list_v_start = $reward_list_v['start'];
            $reward_list_v_end = $reward_list_v['end'];
            if ($rank >= $reward_list_v_start && $rank <= $reward_list_v_end) {

                if (empty($temp_reward)) {
                    return ['diff_order_money' => 0, 'prev_reward' => $end_reward['reward']['commission'], 'now_reward' => $reward_list_v['reward']['commission']];
                } else {
                    break;
                }
            } else {
                $temp_reward = $reward_list_v;
            }
        }
        $prev_rank = $temp_reward['end'];
        $prev_member_rank = $ranking[$prev_rank - 1];
        return ['diff_order_money' => ($prev_member_rank['order_money'] - $member_order_money), 'prev_reward' => $temp_reward['reward']['commission'], 'now_reward' => $reward_list[0]['reward']['commission']];
    }

    /**
     * 获取排名
     * @param int $site_id
     * @param int $period_id
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getRanking(int $site_id, int $period_id, $is_with_member = false)
    {
        $reward_config = (new CoreSaleConfigService())->getRewardConfig($site_id);
        $last_rank = $reward_config['last_rank'];
        $reward_list = $reward_config['reward_list'];
        //销售门槛
        $condition_order_money = $reward_config['order_money'];
        //按照排序来发放佣金
        return $this->model
            ->where(
                [
                    ['period_id', '=', $period_id],
                    ['site_id', '=', $site_id],
                    ['order_money', '>=', $condition_order_money]
                ]
            )
            ->when($is_with_member, function ($query) {
                $query->with(
                    [
                        'member' => function ($query) {
                            $query->withField('member_id, username, headimg, nickname');
                        }
                    ]
                );
            })
            ->order('order_money desc, id asc')->limit($last_rank)->select()->toArray();
    }
}
