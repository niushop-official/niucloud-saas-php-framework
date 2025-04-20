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

namespace addon\shop_fenxiao\app\service\core\fenxiao;

use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseCoreService;
use think\facade\Db;


/**
 * 分销商属性发生变化 (数字类的)
 */
class CoreFenxiaoDataService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Fenxiao();
    }

    /**
     * 累增分销商相关佣金数据
     * @param int $site_id
     * @param int $member_id
     * @param int|float $number
     * @param string $type
     * @return true
     */
    public static function setCommission(int $site_id, int $member_id, $number, string $type, $relate_id = 0)
    {
        $core_member_account = new CoreMemberAccountService();
        $data = [];
        $type_field = '';
        switch ($type) {
            case 'fenxiao':
                $data[ 'fenxiao_commission' ] = Db::raw('fenxiao_commission + ' . $number);
                $from_type = 'shop_fenxiao';
                $memo = '分销订单佣金结算';
                break;
            case 'agent':
                $data[ 'agent_commission' ] = Db::raw('agent_commission + ' . $number);
                $from_type = 'shop_fenxiao_agent';
                $memo = '渠道代理订单结算';
                break;
            case 'team':
                $data[ 'team_commission' ] = Db::raw('team_commission + ' . $number);
                $from_type = 'shop_fenxiao_team';
                $memo = '团队分红订单结算';
                break;
            case 'task':
                $data[ 'task_commission' ] = Db::raw('task_commission + ' . $number);
                $from_type = 'shop_fenxiao_task';
                $memo = '任务奖励';
                break;
            case 'sale':
                $data[ 'sale_commission' ] = Db::raw('sale_commission + ' . $number);
                $from_type = 'shop_fenxiao_sale';
                $memo = '销售奖励';
                break;
        }
        $type_field = $type . '_commission';
        $data[ $type_field ] = Db::raw($type_field . ' + ' . $number);
        if (!empty($data)) {
            ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->update($data);

            //累计增加会员佣金
            $core_member_account->addLog($site_id, $member_id, MemberAccountTypeDict:: COMMISSION, $number, $from_type, $memo, $relate_id);
            //佣金发生变化
            CoreEventService::fenxiaoCommissionChangeAfter($site_id, $member_id, [ $type_field => $number ]);
        }
        return true;
    }

    /**
     * 分销商销售量和销售额发生变化
     * @param $data
     * @return true
     */
    public function orderDataInc($data)
    {
        $order_data = $data[ 'order_data' ];
        if ($order_data) {
            $site_id = $order_data[ 'site_id' ];
            $member_id = $order_data[ 'member_id' ];
            $fenxiao_member = ( new CoreFenxiaoMemberService() )->findFenxiaoMember($site_id, $member_id);
            if ($fenxiao_member->isEmpty()) return true;
            $fenxiao_member_id = $fenxiao_member[ 'fenxiao_member_id' ];
            if ($fenxiao_member_id > 0) {
                $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $fenxiao_member_id ] ])->findOrEmpty();
                if (!$fenxiao->isEmpty()) {
                    //维护分销商的数据信息
                    $fenxiao->save(
                        [
                            'fenxiao_total_order' => Db::raw('fenxiao_total_order + ' . $order_data[ 'order_money' ]),
                            'fenxiao_order_num' => Db::raw('fenxiao_order_num + ' . 1),
                        ]
                    );

                    //当前分销商业绩变化事件
                    CoreEventService::fenxiaoOrderChange($site_id, $fenxiao[ 'member_id' ], [
                        'order_money' => $order_data[ 'order_money' ],
                        'order_num' => 1
                    ]);

                    //当前分销商团队业绩变化事件
                    CoreEventService::fenxiaoTeamOrderChange($site_id, $fenxiao[ 'member_id' ], [
                        'order_money' => $order_data[ 'order_money' ],
                        'order_num' => 1
                    ]);
                    if ($fenxiao[ 'parent' ] > 0) {
                        //当前分销商上级团队业绩变化事件
                        CoreEventService::fenxiaoTeamOrderChange($site_id, $fenxiao[ 'parent' ], [
                            'order_money' => $order_data[ 'order_money' ],
                            'order_num' => 1
                        ]);
                    }
                }
            }
        }
        return true;
    }

    /**
     * 团队订单销售量和销售额发生变化
     * @param $data
     * @return true
     */
    public function teamOrderDataInc($site_id, $member_id, $data)
    {


        return true;
    }

    /**
     * 下级会员数量增加
     * @param $data
     * @return void
     */
    public function childMemberNumInc($site_id, $member_id)
    {

        $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
        if (!$fenxiao->isEmpty()) {
            //维护分销商的数据信息
            $fenxiao->save(
                [
                    'child_num' => Db::raw('child_num + ' . 1),
                ]
            );
            CoreEventService::fenxiaoChildMemberChangeAfter($site_id, $member_id, [ 'child_num' => 1 ]);
        }

        return true;
    }

    /**
     * 下级会员数量减少
     * @param $site_id
     * @param $member_id
     * @return true
     */
    public function childMemberNumDec($site_id, $member_id)
    {

        $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
        if (!$fenxiao->isEmpty()) {
            //维护分销商的数据信息
            $fenxiao->save(
                [
                    'child_num' => Db::raw('CASE WHEN child_num - ' . 1 . '>= 0 THEN child_num - ' . 1 . ' ELSE 0 END'),
                ]
            );
            CoreEventService::fenxiaoChildMemberChangeAfter($site_id, $member_id, [ 'child_num' => -1 ]);
        }

        return true;
    }

    /**
     * 分销商增加下级分销商人数
     * @param $site_id
     * @param $member_id
     * @return true
     */
    public function childFenxiaoNumInc($site_id, $member_id)
    {
        $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
        if (!$fenxiao->isEmpty()) {
            //维护分销商的数据信息
            $fenxiao->save(
                [
                    'child_num' => Db::raw('child_num + ' . 1),
                    'child_fenxiao_num' => Db::raw('child_fenxiao_num + ' . 1),
                ]
            );

            CoreEventService::fenxiaoChildMemberChangeAfter($site_id, $member_id, [ 'child_num' => 1 ]);
            CoreEventService::fenxiaoChildFenxiaoChangeAfter($site_id, $member_id, [ 'child_fenxiao_num' => 1 ]);
        }
        return true;
    }

    /**
     * 分销商减少下级分销商人数
     * @param $data
     * @return true
     */
    public function childFenxiaoNumDec($site_id, $member_id)
    {
        $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
        if (!$fenxiao->isEmpty()) {
            //维护分销商的数据信息
            $fenxiao->save(
                [
                    'child_num' => Db::raw('CASE WHEN child_num - ' . 1 . '>= 0 THEN child_num - ' . 1 . ' ELSE 0 END'),
                    'child_fenxiao_num' => Db::raw('CASE WHEN child_fenxiao_num - ' . 1 . '>= 0 THEN child_fenxiao_num - ' . 1 . ' ELSE 0 END'),
                ]
            );

            CoreEventService::fenxiaoChildMemberChangeAfter($site_id, $member_id, [ 'child_num' => -1 ]);
            CoreEventService::fenxiaoChildFenxiaoChangeAfter($site_id, $member_id, [ 'child_fenxiao_num' => -1 ]);
        }
        return true;
    }

    /**
     * 分销商增加下级分销商人数
     * @param $site_id
     * @param $member_id
     * @return true
     */
    public function childFenxiaoNumOnlyInc($site_id, $member_id)
    {
        $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
        if (!$fenxiao->isEmpty()) {
            //维护分销商的数据信息
            $fenxiao->save(
                [
                    'child_fenxiao_num' => Db::raw('child_fenxiao_num + ' . 1),
                ]
            );

            CoreEventService::fenxiaoChildFenxiaoChangeAfter($site_id, $member_id, [ 'child_fenxiao_num' => 1 ]);
        }
        return true;
    }

}
