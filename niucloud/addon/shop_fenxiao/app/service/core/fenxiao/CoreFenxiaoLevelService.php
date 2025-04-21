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

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use core\base\BaseCoreService;
use think\Model;


/**
 * 分销申请
 */
class CoreFenxiaoLevelService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoLevel();
    }

    /**
     * 分销商升级检测
     */
    public static function fenxiaoUpgrade($site_id, $fenxiao_member_id)
    {
        try {
            $fenxiao_info = (new Fenxiao())->where([['site_id', '=', $site_id], ['member_id', '=', $fenxiao_member_id]])->field('member_id,level_id,fenxiao_order_num,fenxiao_total_order,child_num,child_fenxiao_num')->findOrEmpty()->toArray();
            if (empty($fenxiao_info)) return;
            $fenxiao_level_info = (new FenxiaoLevel())->where([['site_id', '=', $site_id], ['level_id', '=', $fenxiao_info['level_id']]])->field('level_id,level_num')->findOrEmpty()->toArray();
            $level_info = (new FenxiaoLevel())->where([['site_id', '=', $site_id], ['level_num', '>', $fenxiao_level_info['level_num']]])->order("level_num asc")->field('level_id,level_num, upgrade_type, fenxiao_commission, fenxiao_order_num, fenxiao_order_money, order_num, order_money, child_num, child_fenxiao_num')->findOrEmpty()->toArray();
            if (empty($level_info)) return;//等级信息不存在
            //检测升级条件
            //查询分销商自购订单数与订单金额(订单完成)
            $fenxiao_info['order_num'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $fenxiao_member_id], ['site_id', '=', $site_id]])->count();
            $fenxiao_info['order_money'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $fenxiao_member_id], ['site_id', '=', $site_id]])->sum('order_money');
            $upgrade_level = [];
            if ($level_info['upgrade_type'] == 2) {
                if (($level_info['order_num'] == 0 || ($level_info['order_num'] > 0 && $fenxiao_info['order_num'] >= $level_info['order_num'])) &&
                    ($level_info['order_money'] == 0 || ($level_info['order_money'] > 0 && $fenxiao_info['order_money'] >= $level_info['order_money'])) &&
                    ($level_info['fenxiao_order_num'] == 0 || ($level_info['fenxiao_order_num'] > 0 && $fenxiao_info['fenxiao_order_num'] >= $level_info['fenxiao_order_num'])) &&
                    ($level_info['fenxiao_order_money'] == 0 || ($level_info['fenxiao_order_money'] > 0 && $fenxiao_info['fenxiao_total_order'] >= $level_info['fenxiao_order_money'])) &&
                    ($level_info['child_num'] == 0 || ($level_info['child_num'] > 0 && $fenxiao_info['child_num'] >= $level_info['child_num'])) &&
                    ($level_info['child_fenxiao_num'] == 0 || ($level_info['child_fenxiao_num'] > 0 && $fenxiao_info['child_fenxiao_num'] >= $level_info['child_fenxiao_num']))

                ) {
                    $upgrade_level = $level_info;
                }
            } else {
                if (($level_info['order_num'] > 0 && $fenxiao_info['order_num'] >= $level_info['order_num']) ||
                    ($level_info['order_money'] > 0 && $fenxiao_info['order_money'] >= $level_info['order_money']) ||
                    ($level_info['fenxiao_order_num'] > 0 && $fenxiao_info['fenxiao_order_num'] >= $level_info['fenxiao_order_num']) ||
                    ($level_info['fenxiao_order_money'] > 0 && $fenxiao_info['fenxiao_total_order'] >= $level_info['fenxiao_order_money']) ||
                    ($level_info['child_num'] > 0 && $fenxiao_info['child_num'] >= $level_info['child_num']) ||
                    ($level_info['child_fenxiao_num'] > 0 && $fenxiao_info['child_fenxiao_num'] >= $level_info['child_fenxiao_num'])

                ) {
                    $upgrade_level = $level_info;
                }
            }
            if ($upgrade_level) {
                (new Fenxiao())->where([['site_id', '=', $site_id], ['member_id', '=', $fenxiao_member_id]])->update(['level_id' => $upgrade_level['level_id']]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * 获取默认分销等级
     * @param $site_id
     * @return FenxiaoLevel|array|mixed|Model
     */
    public function findDefaultFenxiaoLevel($site_id)
    {
        return $this->model->where([['site_id', '=', $site_id]])->findOrEmpty();
    }

    public function findFenxiaoLevel($site_id, $level_id)
    {
        return $this->model->where([['site_id', '=', $site_id], ['level_id', '=', $level_id]])->findOrEmpty();
    }
}
