<?php

namespace addon\shop\app\upgrade\v140;

use addon\shop\app\model\goods\Label;

class Upgrade
{

    public function handle()
    {
        $this->handleData();
    }

    /**
     * 处理商品数据
     */
    private function handleData()
    {
        $label_model = new Label();
        $label_list = $label_model->where([
            [ 'icon', 'in', [ 'addon/shop/goods/label/icon1.jpg', 'addon/shop/goods/label/icon2.jpg', 'addon/shop/goods/label/icon3.jpg' ] ]
        ])->field('label_id,icon')->select()->toArray();
        foreach ($label_list as $k => $v) {
            if ($v[ 'icon' ] == 'addon/shop/goods/label/icon1.jpg') {
                $label_model->where([ [ 'label_id', '=', $v[ 'label_id' ] ] ])->update([
                    'icon' => 'addon/shop/goods/label/icon1.png'
                ]);
            } else if ($v[ 'icon' ] == 'addon/shop/goods/label/icon2.jpg') {
                $label_model->where([ [ 'label_id', '=', $v[ 'label_id' ] ] ])->update([
                    'icon' => 'addon/shop/goods/label/icon2.png'
                ]);
            } else if ($v[ 'icon' ] == 'addon/shop/goods/label/icon3.jpg') {
                $label_model->where([ [ 'label_id', '=', $v[ 'label_id' ] ] ])->update([
                    'icon' => 'addon/shop/goods/label/icon3.png'
                ]);
            }
        }

    }

}
