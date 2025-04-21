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

use addon\shop_fenxiao\app\model\sale\Sale;
use addon\shop_fenxiao\app\model\sale\SaleMember;
use core\base\BaseCoreService;
use think\facade\Db;


/**
 * 销售奖励配置
 */
class CoreSaleService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SaleMember();
    }

    /**
     * 销售额
     * @param $site_id
     * @param $member_id
     * @param $data
     * @return void
     */
    public function set($site_id, $member_id, $data)
    {
        $config = (new CoreSaleConfigService())->getConfig($site_id);
        if ($config['is_open'] == 0) return true;
        $now_time = time();
        //查询当前最新的周期
        $period = (new Sale())->where([
            ['site_id', '=', $site_id],
            ['sale_start_time', '<=', $now_time],
            ['sale_end_time', '>=', $now_time],
            ['is_settlement', '=', 0]
        ])->findOrEmpty();
        if ($period->isEmpty()) return true;

        $condition = [
            ['site_id', '=', $site_id],
            ['period_id', '=', $period->id],
            ['member_id', '=', $member_id]
        ];
        $member_period = $this->model->where($condition)->findOrEmpty();
        if ($member_period->isEmpty()) {
            //创建新的
            $insert_data = array(
                'site_id' => $site_id,
                'period_id' => $period['id'],
                'member_id' => $member_id,
                'period_type' => $period['period_type'],
                'sale_start_time' => $period['sale_start_time'],
                'sale_end_time' => $period['sale_end_time'],
            );
            $this->model->create(array_merge($insert_data, $data));
        } else {//维护原有的数据
            $update_data = [];
            foreach ($data as $k => $v) {
                $update_data[$k] = Db::raw($k . ' + ' . $v);
            }
            if ($update_data) {
                $member_period->save($update_data);
            }
        }
        //累加周期总业绩
        $period_update_data = [];
        foreach ($data as $k => $v) {
            switch ($k) {
                case 'order_money':
                    $period_update_data['total_order_money'] = Db::raw('total_order_money + ' . $v);
                    break;
            }
        }
        if ($period_update_data) {
            $period->save($period_update_data);
        }
        return true;
    }

    /**
     * 订单业绩统计
     * @param $site_id
     * @param $fenxiao
     * @param $data
     * @return void
     */
//    public function order($site_id, $fenxiao, $data){
//        $fenxiao_member_id = $fenxiao['member_id'];
//        $parent = $fenxiao['parent'];
//        $data = [
//            'order_money' => $data['order_money'],
//        ];
//        //以及累加销售额和销售量
//        $this->set($site_id, $fenxiao_member_id, $data);
//        //上级以及累加销售额和销售量
//        $this->set($site_id, $parent, $data);
//        return true;
//    }

}
