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

namespace addon\shop_fenxiao\app\service\api\sale;

use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\sale\Sale;
use addon\shop_fenxiao\app\model\sale\SaleMember;
use addon\shop_fenxiao\app\service\core\sale\CoreSalePeriodMemberService;
use app\model\member\Member;
use core\base\BaseApiService;
use think\db\exception\DbException;


/**
 * 会员销售奖励周期服务层
 */
class SaleMemberService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SaleMember();
    }

    /**
     * 分页
     * @return void
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,period_id, period_type,sale_start_time,sale_end_time,order_money,reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        $order = 'id desc';
        $search_model = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $this->member_id]
        ])->withSearch(['is_settlement', 'is_send', 'period_id'], $where)
            ->field($field)
            ->append(['period_type_name'])
            ->order($order);

        return $this->pageQuery($search_model);
    }

    /**
     * 会员销售周期信息
     * @param int $period_id
     * @return array
     * @throws DbException
     */
    public function getInfo(int $period_id)
    {
        $field = 'id,site_id,period_id, period_type,sale_start_time,sale_end_time,order_money,reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        return $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $this->member_id],
            ['period_id', '=', $period_id],
        ])
            ->field($field)
            ->append(['period_type_name'])->findOrEmpty()->toArray();
    }

    /**
     * 会员销售周期详情
     * @param int $period_id
     * @return array
     * @throws DbException
     */
    public function getDetail(int $period_id)
    {
        $field = 'id,site_id,period_id, member_id, period_type,sale_start_time,sale_end_time,order_money,reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        $detail = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $this->member_id],
            ['period_id', '=', $period_id],
        ])
            ->with(
                [
                    'member' => function ($query) {
                        $query->withField('member_id, username, headimg, nickname');
                    }
                ]
            )
            ->field($field)
            ->append(['period_type_name'])->findOrEmpty()->toArray();
        if (!empty($detail)) {
            //计算排名和较上一阶差距销售额
            $detail['diff_data'] = (new CoreSalePeriodMemberService())->getDataDiffPrev($this->site_id, $detail);
        }else{
            $detail = (new Sale())->where([
                ['site_id', '=', $this->site_id],
                ['id', '=', $period_id],
            ])->field('id,site_id,period_type,sale_start_time,sale_end_time,total_order_money,total_reward_money,send_reward_money,is_settlement,settlement_time,create_time, is_send, send_time')
                ->append(['period_type_name'])->findOrEmpty()->toArray();
            $detail['period_id'] = $period_id;
            $detail['order_money'] = 0;
            $detail['reward_money'] = 0;
            $detail['member'] = (new Member())->where([
                ['site_id', '=', $this->site_id],
                ['member_id', '=', $this->member_id],
            ])->field('member_id, username, headimg, nickname')->findOrEmpty()->toArray();
            $detail['diff_data'] = (new CoreSalePeriodMemberService())->getDataDiffPrev($this->site_id, [
                'period_id' => $period_id,
                'member_id' => $this->member_id,
                'order_money' => 0
            ]);
        }
        return $detail;
    }

    /**
     * 获取排行
     * @param int $period_id
     * @return void
     */
    public function getRanking(int $period_id)
    {
        return (new CoreSalePeriodMemberService())->getRanking($this->site_id, $period_id, true);
    }

    /**
     * 获取销售佣金记录
     * @return array|string[]
     */
    public function getCommissionData()
    {
        $fenxiao = (new Fenxiao())->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->findOrEmpty();
        if ($fenxiao->isEmpty()) return [];
        $sale_commission = $fenxiao['sale_commission'];
        $wait_sale_commission = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $this->member_id],
            ['is_send', '=', 0]
        ])->sum('reward_money');
        $sale_commission_send = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $this->member_id],
            ['is_send', '=', 1]
        ])->sum('reward_money');
        return [
            'sale_commission' => $sale_commission,
            'wait_sale_commission' => $wait_sale_commission,
            'sale_commission_send' => $sale_commission_send,
        ];
    }

}
