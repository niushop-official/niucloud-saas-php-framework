<?php

namespace addon\ly_shareholder\app\listener\order;

use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\service\core\CoreShareholderLevelService;
use think\facade\Log;

class AfterShopOrderPay
{
    public function handle($data){
       Log::write('==================AfterShopOrderPay' . '===========股东分红=======', 'DEBUG');
       $oreder_data = $data['order_data'];
       $site_id = $oreder_data['site_id'];
       $member_id = $oreder_data['member_id'];

       $shareholder = (new Shareholder())->where('site_id', $site_id)->where('member_id', $member_id)->find();
       Log::write('===============ly_publine会员是否是股东===============' . $shareholder);
       
       if(empty($shareholder)){//增加股东
           Log::write('===============ly_publine增加股东========股东ID：' . $member_id);
           (new CoreShareholderLevelService())->autoToShareholder($site_id, $member_id);
       }else{
           //股东升级
           (new CoreShareholderLevelService())->shareholderUpgrade($site_id, $member_id);
       }

    }



}