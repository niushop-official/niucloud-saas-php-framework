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
use core\base\BaseCoreService;


/**
 * 分销订单
 * Class CoreFenxiaoOrderService
 * @package addon\shop_fenxiao\app\service\core
 */
class CoreFenxiaoOrderService extends BaseCoreService
{

    /**
     * 累增分销商相关佣金数据
     * @param int $site_id
     * @param int $member_id
     * @param int|float $number
     * @param string $type
     * @return true
     */
    public function incCommission(int $site_id, int $member_id, int|float $number, string $type)
    {
        $data = [];
        switch ($type) {
            case 'fenxiao':
                $data['fenxiao_commission'] = Db::raw('fenxiao_commission + ' . $number);
                break;
            case 'agent':
                $data['agent_commission'] = Db::raw('agent_commission + ' . $number);
                break;
            case 'team':
                $data['team_commission'] = Db::raw('team_commission + ' . $number);
                break;
            case 'task':
                $data['task_commission'] = Db::raw('task_commission + ' . $number);
                break;
            case 'sale':
                $data['sale_commission'] = Db::raw('sale_commission + ' . $number);
                break;
        }
        if (!empty($data)) {
            (new Fenxiao())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->update($data);
        }
        return true;
    }
}
