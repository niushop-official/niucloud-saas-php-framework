<?php
declare (strict_types=1);

namespace addon\shop\app\listener\point_exchange;


use addon\shop\app\service\admin\marketing\pointexchange\ExchangeService;
use addon\shop\app\model\goods\GoodsSku;
use think\facade\Log;

/**
 *  订单关闭后 积分商城业务服务层
 */
class AfterGoodsEdit
{

    public function handle($data)
    {
        Log::write('AfterGoodsEdit' . json_encode($data));
        try {
            $where['goods_id'] = $data['goods_id'];
            $exchange_goods_info = (new ExchangeService)->getInfo($where);
            if (!empty($exchange_goods_info)) {
                $sku_list = (new GoodsSku())->where([['goods_id', '=', $where['goods_id']]])->field('sku_id,stock')->select()->toArray();
                $sku_list = array_column($sku_list, null, 'sku_id');
                (new ExchangeService)->afterGoodsEdit($exchange_goods_info, $data['goods_data']['status'], $sku_list);
            }
        } catch (\Exception $e) {
            Log::write('订单AfterShopOrderClose失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}
