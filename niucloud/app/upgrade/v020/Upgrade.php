<?php

namespace app\upgrade\v020;

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
        $field = 'id,site_id,title,value';
        $list = $diy_model->where($where)->field($field)->select()->toArray();

        if (!empty($list)) {
            foreach ($list as $k => $v) {

                $diy_data = json_decode($v[ 'value' ], true);

                if (isset($diy_data[ 'global' ][ 'pageBgColor' ]) && !isset($diy_data[ 'global' ][ 'pageStartBgColor' ])) {

                    $diy_data[ 'global' ][ 'pageStartBgColor' ] = $diy_data[ 'global' ][ 'pageBgColor' ]; // 页面背景颜色（开始）
                    $diy_data[ 'global' ][ 'pageEndBgColor' ] = ''; // 页面背景颜色（结束）
                    $diy_data[ 'global' ][ 'pageGradientAngle' ] = 'to bottom'; // 渐变角度，从上到下（to bottom）、从左到右（to right）
                    $diy_data[ 'global' ][ 'bgHeightScale' ] = 0; // 页面背景高度比例，单位%，0为高度自适应

                }

                unset($diy_data[ 'global' ][ 'pageBgColor' ]);

                if (isset($diy_data[ 'global' ][ 'template' ])) {

                    if (isset($diy_data[ 'global' ][ 'template' ][ 'pageBgColor' ]) && !isset($diy_data[ 'global' ][ 'template' ][ 'pageStartBgColor' ])) {

                        $diy_data[ 'global' ][ 'template' ][ 'pageStartBgColor' ] = $diy_data[ 'global' ][ 'template' ][ 'pageBgColor' ]; // 组件底部背景颜色（开始）
                        $diy_data[ 'global' ][ 'template' ][ 'pageEndBgColor' ] = ''; // 组件底部背景颜色（结束）
                        $diy_data[ 'global' ][ 'template' ][ 'pageGradientAngle' ] = 'to bottom'; // 渐变角度，从上到下（to bottom）、从左到右（to right）

                    }

                    unset($diy_data[ 'global' ][ 'template' ][ 'pageBgColor' ]);

                    if (isset($diy_data[ 'global' ][ 'template' ][ 'componentBgColor' ]) && !isset($diy_data[ 'global' ][ 'template' ][ 'componentStartBgColor' ])) {

                        $diy_data[ 'global' ][ 'template' ][ 'componentStartBgColor' ] = $diy_data[ 'global' ][ 'template' ][ 'componentBgColor' ]; // 组件背景颜色（开始）
                        $diy_data[ 'global' ][ 'template' ][ 'componentEndBgColor' ] = ''; // 组件背景颜色（结束）
                        $diy_data[ 'global' ][ 'template' ][ 'componentGradientAngle' ] = 'to bottom'; // 渐变角度，从上到下（to bottom）、从左到右（to right）
                        $diy_data[ 'global' ][ 'template' ][ 'componentBgUrl' ] = ''; // 组件背景图片
                        $diy_data[ 'global' ][ 'template' ][ 'componentBgAlpha' ] = 2; // 组件背景图片的透明度，0~10

                    }

                    unset($diy_data[ 'global' ][ 'template' ][ 'componentBgColor' ]);
                }

                foreach ($diy_data[ 'value' ] as $ck => $cv) {

                    if (isset($cv[ 'pageBgColor' ]) && !isset($cv[ 'pageStartBgColor' ])) {
                        $cv[ 'pageStartBgColor' ] = $cv[ 'pageBgColor' ]; // 组件底部背景颜色（开始）
                        $cv[ 'pageEndBgColor' ] = ''; // 组件底部背景颜色（结束）
                        $cv[ 'pageGradientAngle' ] = 'to bottom'; // 渐变角度，从上到下（to bottom）、从左到右（to right）
                    }

                    unset($cv[ 'pageBgColor' ]);

                    if (isset($cv[ 'componentBgColor' ]) && !isset($cv[ 'componentStartBgColor' ])) {
                        $cv[ 'componentStartBgColor' ] = $cv[ 'componentBgColor' ]; // 组件背景颜色（开始）
                        $cv[ 'componentEndBgColor' ] = ''; // 组件背景颜色（结束）
                        $cv[ 'componentGradientAngle' ] = 'to bottom'; // 渐变角度，从上到下（to bottom）、从左到右（to right）
                        $cv[ 'componentBgUrl' ] = ''; // 组件背景图片
                        $cv[ 'componentBgAlpha' ] = 2; // 组件背景图片的透明度，0~10
                    }
                    unset($cv[ 'componentBgColor' ]);

                    // 图文导航 组件
                    if ($cv[ 'componentName' ] == 'GraphicNav') {
                        if (isset($cv[ 'navTitle' ])) {
                            unset($cv[ 'navTitle' ]);
                            unset($cv[ 'subNavTitle' ]);
                            unset($cv[ 'subNavTitleLink' ]);
                            unset($cv[ 'subNavColor' ]);
                        }
                    } elseif ($cv[ 'componentName' ] == 'Notice') {
                        // 公告 组件
                        if (isset($cv[ 'iconType' ])) {
                            $cv[ 'noticeType' ] = 'img';
                            $cv[ 'imgType' ] = isset($cv[ 'iconType' ]) ? $cv[ 'iconType' ] : '';
                            $cv[ 'systemUrl' ] = isset($cv[ 'systemIcon' ]) ? $cv[ 'systemIcon' ] : '';
                            $cv[ 'imageUrl' ] = ''; // 上传自定义图片
                            $cv[ 'scrollWay' ] = 'upDown'; // 滚动方式 upDown：上下滚动，horizontal：横向滚动
                            $cv[ 'fontSize' ] = 14;
                            $cv[ 'fontWeight' ] = 'normal';
                            $cv[ 'noticeTitle' ] = '公告'; // 公告标题文字

                            $list = $cv[ 'list' ];
                            $cv[ 'list' ] = [ $list ];

                            unset($cv[ 'iconType' ]);
                            unset($cv[ 'systemIcon' ]);
                        }
                    } elseif ($cv[ 'componentName' ] == 'GoodsList') {
                        // 商品列表 组件

                        if ($cv[ 'style' ] == 'style1') {
                            $cv[ 'style' ] = 'style-1';
                        } elseif ($cv[ 'style' ] == 'style2') {
                            $cv[ 'style' ] = 'style-2';
                        }

                        if (!isset($cv[ 'sortWay' ])) {
                            $cv[ 'sortWay' ] = 'default';
                            $cv[ 'source' ] = 'all'; // 恢复默认
                            $cv[ 'goods_category_name' ] = '请选择';
                            $cv[ 'goodsNameStyle' ] = [
                                'color' => '#303133',
                                'control' => true,
                                'fontWeight' => 'bold'
                            ];
                            $cv[ 'priceStyle' ] = [
                                'mainColor' => '#FF4142',
                                'mainControl' => true,
                                'lineColor' => '#999CA7',
                                'lineControl' => true
                            ];
                            $cv[ 'saleStyle' ] = [
                                'color' => '#999999',
                                'control' => true
                            ];

                        }

                    }

                    $diy_data[ 'value' ][ $ck ] = $cv;

                }

                $diy_data[ 'value' ] = array_values($diy_data[ 'value' ]);
                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }
    }

}