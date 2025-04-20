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

namespace addon\shop\app\service\core\marketing;

use addon\shop\app\model\manjian\Manjian;
use core\base\BaseCoreService;
use think\facade\Db;


/**
 * 满减活动统计
 */
class CoreManjianStatService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 统计
     * @param $site_id
     * @param $manjian_id
     * @param $data
     * @return true
     */
    public function stat(int $site_id, int $manjian_id, array $data)
    {
        $data = [
            'total_order_money' => $data['order_money'] ?? 0,
            'total_order_num' => $data['order_num'] ?? 0,
            'total_member_num' => $data['member_num'] ?? 0,
            'total_point' => $data['point'] ?? 0,
            'total_balance' => $data['balance'] ?? 0,
            'total_coupon_num' => $data['coupon_num'] ?? 0,
            'total_goods_num' => $data['goods_num'] ?? 0
        ];
        self::set($site_id, $manjian_id, $data);
        return true;
    }

    /**
     * 统计
     * @param int $site_id
     * @param int $manjian_id
     * @param array $data
     * @return true
     */
    public static function set(int $site_id, int $manjian_id, array $data)
    {
        $manjian_model = new Manjian();
        $condition = [
            ['site_id', '=', $site_id],
            ['manjian_id', '=', $manjian_id],
        ];
        $manjian_info = $manjian_model->where($condition)->findOrEmpty();
        if (!$manjian_info->isEmpty()) {
            $update_data = [];
            foreach ($data as $k => $v) {
                if ($v != 0) {
                    if ($v > 0) {
                        $item_sql = ' + ' . abs($v);
                    } else if ($v < 0) {
                        $item_sql = ' - ' . abs($v);
                    }
                    $update_data[$k] = Db::raw('CASE WHEN '.$k . $item_sql. '>= 0 THEN ' .$k . $item_sql. ' ELSE 0 END');
                }
            }
            if ($update_data) {
                $manjian_info->save($update_data);
            }
        }
        return true;
    }

}
