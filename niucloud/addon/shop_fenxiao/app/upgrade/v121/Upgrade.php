<?php

namespace addon\shop_fenxiao\app\upgrade\v121;

use addon\shop_fenxiao\app\model\fenxiao\FenxiaoGoods;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoGoodsRule;

class Upgrade
{

    public function handle()
    {
        $this->handleData();
    }

    /**
     * 处理升级数据
     */
    private function handleData()
    {
        $fenxiao_goods_list = ( new FenxiaoGoods() )->field('goods_id,site_id,fenxiao_rule')->select()->toArray();
        $save_data = [];
        foreach ($fenxiao_goods_list as $value) {
            if (empty($value[ 'fenxiao_rule' ])) continue;
            foreach ($value[ 'fenxiao_rule' ] as $v) {
                foreach ($v as $item) {
                    if (is_array($item) &&!empty($v[ 'goods_id' ])) {
                        $save_data[] = [
                            'site_id' => $value[ 'site_id' ],
                            'goods_id' => $v[ 'goods_id' ],
                            'sku_id' => $v[ 'sku_id' ],
                            'level_id' => $item[ 'level_id' ],
                            'level_name' => $item[ 'level_name' ],
                            'one_rate' => $item[ 'one_rate' ],
                            'two_rate' => $item[ 'two_rate' ],
                            'one_money' => $item[ 'one_money' ],
                            'two_money' => $item[ 'two_money' ],
                            'calculate_price' => $v[ 'calculate_price' ],
                        ];
                    }
                }
            }
        }
        foreach ($save_data as $value) {
            $count = ( new FenxiaoGoodsRule() )->where([ [ 'site_id', '=', $value[ 'site_id' ] ], [ 'goods_id', '=', $value[ 'goods_id' ] ], [ 'sku_id', '=', $value[ 'sku_id' ] ], [ 'level_id', '=', $value[ 'level_id' ] ] ])->count();
            if ($count > 0) {
                continue;
            }
            ( new FenxiaoGoodsRule() )->create($value);
        }
    }

}
