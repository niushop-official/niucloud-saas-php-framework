<?php

namespace app\upgrade\v054;

use app\model\diy\Diy;

class Upgrade
{

    public function handle()
    {
        $this->handleDiyData();
    }

    /**
     * 处理自定义数据
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function handleDiyData()
    {
        $diy_model = new Diy();
        $where = [
            [ 'value', '<>', '' ]
        ];
        $field = 'id,site_id,name,title,template,value';
        $list = $diy_model->where($where)->field($field)->select()->toArray();

        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $diy_data = json_decode($v[ 'value' ], true);

                foreach ($diy_data[ 'value' ] as $ck => $cv) {

                    // 优惠券 组件
                    if ($cv[ 'componentName' ] == 'GoodsCoupon') {

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'titleColor' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'titleColor' ] = '#FFFFFF';
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'subTitleColor' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'subTitleColor' ] = '#FFFFFF';
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'couponItem' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'couponItem' ] = [
                                "bgColor" => "#FFFFFF",
                                "textColor" => "#333333",
                                "subTextColor" => "#666666",
                                "moneyColor" => "#333333",
                                "aroundRadius" => 12
                            ];
                        }
                    }

                    // 商品列表、多商品组
                    if ($cv[ 'componentName' ] == 'GoodsList' || $cv[ 'componentName' ] == 'ManyGoodsList') {
                        if (!isset($diy_data[ 'value' ][ $ck ][ 'goodsNameStyle' ][ 'isShow' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'goodsNameStyle' ][ 'isShow' ] = true;
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'isShow' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'isShow' ] = true;
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'control' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'control' ] = true;
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'color' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'color' ] = '#FF4142';
                        }

                        if (isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'mainColor' ])) {
                            unset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'mainColor' ]);
                        }

                        if (isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'mainControl' ])) {
                            unset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'mainControl' ]);
                        }

                        if (isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'lineColor' ])) {
                            unset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'lineColor' ]);
                        }

                        if (isset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'lineControl' ])) {
                            unset($diy_data[ 'value' ][ $ck ][ 'priceStyle' ][ 'lineControl' ]);
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'saleStyle' ][ 'isShow' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'saleStyle' ][ 'isShow' ] = true;
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'labelStyle' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'labelStyle' ] = [
                                "control" => true,
                                "isShow" => true
                            ];
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'btnStyle' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'btnStyle' ] = [
                                "fontWeight" => false,
                                "padding" => 0,
                                "aroundRadius" => 25,
                                "cartEvent" => "detail",
                                "text" => "购买",
                                "textColor" => "#FFFFFF",
                                "startBgColor" => "#FF4142",
                                "endBgColor" => "#FF4142",
                                "style" => "button",
                                "control" => true
                            ];
                        }

                    }

                    // 轮播搜索 组件
                    if ($cv[ 'componentName' ] == 'CarouselSearch') {

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'style' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'style' ] = 'style-1';
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'styleName' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'styleName' ] = '风格一';
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'subTitle' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'subTitle' ] = [
                                "text" => "本地好价·优选生活",
                                "textColor" => "#000000",
                                "startColor" => "rgba(255,255,255,0.7)",
                                "endColor" => "",
                            ];
                        }

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'search' ][ 'positionColor' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'search' ][ 'positionColor' ] = '#FFFFFF';
                        }

                    }

                    // 图片展播 组件
                    if ($cv[ 'componentName' ] == 'PictureShow') {
                        if ($diy_data[ 'value' ][ $ck ][ 'moduleOne' ][ 'head' ][ 'textImg' ] == 'addon/shop/diy/index/style3/picture_show_head_text3.png') {
                            $diy_data[ 'value' ][ $ck ][ 'moduleOne' ][ 'head' ][ 'textImg' ] = 'static/resource/images/diy/picture_show/picture_show_head_text3.png';
                        }

                        if ($diy_data[ 'value' ][ $ck ][ 'moduleOne' ][ 'list' ]) {

                            foreach ($diy_data[ 'value' ][ $ck ][ 'moduleOne' ][ 'list' ] as $ps_k => $ps_v) {
                                if ($ps_v[ 'imageUrl' ] == 'addon/shop/diy/index/style3/picture_show_goods5.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'moduleOne' ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'static/resource/images/diy/picture_show/picture_05.png';
                                }
                                if ($ps_v[ 'imageUrl' ] == 'addon/shop/diy/index/style3/picture_show_goods6.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'moduleOne' ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'static/resource/images/diy/picture_show/picture_06.png';
                                }
                            }
                        }

                        if ($diy_data[ 'value' ][ $ck ][ 'moduleTwo' ][ 'head' ][ 'textImg' ] == 'addon/shop/diy/index/style3/picture_show_head_text4.png') {
                            $diy_data[ 'value' ][ $ck ][ 'moduleTwo' ][ 'head' ][ 'textImg' ] = 'static/resource/images/diy/picture_show/picture_show_head_text4.png';
                        }

                        if ($diy_data[ 'value' ][ $ck ][ 'moduleTwo' ][ 'list' ]) {

                            foreach ($diy_data[ 'value' ][ $ck ][ 'moduleTwo' ][ 'list' ] as $ps_k => $ps_v) {
                                if ($ps_v[ 'imageUrl' ] == 'addon/shop/diy/index/style3/picture_show_goods7.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'moduleTwo' ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'static/resource/images/diy/picture_show/picture_07.png';
                                }
                                if ($ps_v[ 'imageUrl' ] == 'addon/shop/diy/index/style3/picture_show_goods8.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'moduleTwo' ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'static/resource/images/diy/picture_show/picture_08.png';
                                }
                            }
                        }

                    }

                    // 图文导航 组件
                    if ($cv[ 'componentName' ] == 'GraphicNav') {

                        if (!isset($diy_data[ 'value' ][ $ck ][ 'swiper' ])) {
                            $diy_data[ 'value' ][ $ck ][ 'swiper' ] = [
                                'indicatorColor' => 'rgba(0, 0, 0, 0.3)', // 未选中颜色
                                "indicatorActiveColor" => '#FF0E0E',
                                'indicatorStyle' => 'style-1',
                                'indicatorAlign' => 'center',
                            ];
                        }
                    }

                }

                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

    }

}
