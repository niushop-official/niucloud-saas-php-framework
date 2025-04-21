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
namespace addon\shop\app\job\marketing;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\model\active\Active;
use addon\shop\app\service\core\marketing\CoreActiveService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 活动自动关闭
 */
class ActiveEnd extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        Log::write('活动自动关闭');
        try {

            $ids = ( new Active() )->where([
                [ 'active_status', '=', ActiveDict::ACTIVE ],
            ])->whereBetweenTime('end_time', 1, time())->column('active_id');//过滤end_time=0的情况，0表示活动永久有效

            foreach ($ids as $k => $v) {
                ( new CoreActiveService() )->end($v);
            }

            return true;
        } catch (\Exception $e) {
            Log::write('活动自动关闭error' . $e->getMessage() . $e->getFile() . $e->getLine());
            return false;
        }
    }

}
