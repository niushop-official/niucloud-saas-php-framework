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

namespace addon\shop\app\listener\marketing;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\model\newcomer\NewcomerRecords;
use addon\shop\app\service\core\marketing\CoreNewcomerService;
use think\facade\Log;

/**
 * 新人专享活动参与
 * Class NewcomerActiveJoinListener
 * @package addon\shop\app\listener\marketing
 */
class NewcomerActiveJoinListener
{
    public function handle(array $params)
    {
        Log::write('NewcomerActiveJoinListener:' . json_encode($params));
        $newcomer_records_model = new NewcomerRecords();
        $core_newcomer_service = new CoreNewcomerService();
        $config = $core_newcomer_service->getConfig($params[ 'site_id' ]);
        if (isset($params[ 'is_join' ]) && $config[ 'active_status' ] == ActiveDict::ACTIVE) {
            if ($params[ 'is_join' ] == 1) {
                $newcomer_records_model->where([
                    [ 'site_id', '=', $params[ 'site_id' ] ],
                    [ 'member_id', '=', $params[ 'member_id' ] ]
                ])->update([
                    'is_join' => $params[ 'is_join' ],
                    'order_id' => $params[ 'order_id' ],
                    'goods_ids' => $params[ 'goods_ids' ],
                    'sku_ids' => $params[ 'sku_ids' ],
                    'update_time' => time()
                ]);
            } else {
                $newcomer_records_model->where([
                    [ 'site_id', '=', $params[ 'site_id' ] ],
                    [ 'member_id', '=', $params[ 'member_id' ] ],
                    [ 'order_id', '=', $params[ 'order_id' ] ]
                ])->update([
                    'is_join' => $params[ 'is_join' ],
                    'order_id' => 0,
                    'goods_ids' => '',
                    'sku_ids' => '',
                    'update_time' => time()
                ]);
            }
        }
        return true;
    }
}
