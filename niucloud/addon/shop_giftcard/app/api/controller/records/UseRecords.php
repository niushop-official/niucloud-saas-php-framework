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

namespace addon\shop_giftcard\app\api\controller\records;

use addon\shop_giftcard\app\service\api\records\UseRecordsService;
use core\base\BaseApiController;


/**
 * 礼品卡使用记录控制器
 * Class UseRecords
 * @package addon\shop_giftcard\app\adminapi\controller\records
 */
class UseRecords extends BaseApiController
{

    /**
     * 储值卡使用
     * @return \think\Response
     */
    public function balanceCardUse()
    {
        $data = $this->request->params([
            [ 'card_id', 0 ]
        ]);
        ( new UseRecordsService() )->balanceCardUse($data);
        return success('SUCCESS');
    }

    /**
     * 兑换卡使用
     * @return \think\Response
     */
    public function goodsCardUse()
    {
        $data = $this->request->params([
            [ 'card_id', 0 ],
            [ 'sku_data', [] ]
        ]);
        return success(( new UseRecordsService() )->goodsCardUse($data));
    }

}
