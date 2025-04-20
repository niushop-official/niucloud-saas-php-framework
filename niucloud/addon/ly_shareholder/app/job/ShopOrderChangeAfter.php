<?php
declare (strict_types = 1);

namespace addon\ly_shareholder\app\job;


use addon\ly_shareholder\app\service\core\CoreShareholderLevelService;
use core\base\BaseAdminService;
use think\facade\Log;

/**
 * 股东累加订单销售额和销售量之后
 */
class ShopOrderChangeAfter extends BaseAdminService
{
    public function handle($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];
        $order_data = $data['data'];

        //todo 尝试股东升级
        $res = (new CoreShareholderLevelService())->shareholderUpgrade($site_id, $member_id);
        if($res){
            Log::write("股东升级成功");
        }else{
            Log::write("股东升级失败");
        }
    }

    
}
