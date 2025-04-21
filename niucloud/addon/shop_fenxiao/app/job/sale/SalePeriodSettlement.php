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
namespace addon\shop_fenxiao\app\job\sale;

use addon\shop_fenxiao\app\model\sale\Sale;
use addon\shop_fenxiao\app\service\core\sale\CoreSalePeriodService;
use core\base\BaseJob;

/**
 * 活动自动开启
 */
class SalePeriodSettlement extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $list = (new Sale())->where([['is_settlement', '=', 0], ['sale_end_time', '<=', time()]])->select();
            if(!$list->isEmpty()){
                $core_sale_preiod = new CoreSalePeriodService();
                foreach($list as $v){
                    $core_sale_preiod->settlement($v);
                }
            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
