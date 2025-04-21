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

use addon\shop\app\model\active\Active;
use core\base\BaseJob;

/**
 * 活动自动开启
 */
class ActiveStartAfter extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob($active_id)
    {
        try {
            $info = (new Active())->where([ ['active_id', '=', $active_id] ])->findOrEmpty()->toArray();
            event('ActiveStartAfter', $info);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
