<?php
declare ( strict_types = 1 );

namespace addon\shop_fenxiao\app\listener\poster;


/**
 * 分销海报类型
 */
class ShopFenxiaoPosterType
{
    /**
     * 分销商海报
     * @param array $data
     * @return array
     */
    public function handle($data = [])
    {
        return [
            [
                'type' => 'fenxiao',
                'addon' => 'shop_fenxiao',
                'name' => '分销海报',
                'decs' => '推广分销，分享后进入首页，绑定上下级关系',
                'icon' => 'addon/shop_fenxiao/poster/type_fenxiao.png'
            ],
            [
                'type' => 'fenxiao_goods',
                'addon' => 'shop_fenxiao',
                'name' => '分销商品海报',
                'decs' => '推广分销商品赚佣金，分享后进入商品详情页',
                'icon' => 'addon/shop_fenxiao/poster/type_fenxiao_goods.png'
            ]
        ];

    }
}
