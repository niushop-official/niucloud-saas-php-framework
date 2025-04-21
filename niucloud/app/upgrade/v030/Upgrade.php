<?php

namespace app\upgrade\v030;

use app\model\diy\Diy;
use think\facade\Db;

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

                $diy_data[ 'global' ][ 'topStatusBar' ] = [
                    'isShow' => true,
                    'bgColor' => "#ffffff",
                    'isTransparent' => false,
                    'style' => 'style-1',
                    'styleName' => '风格1',
                    'textColor' => "#333333",
                    'textAlign' => 'center',
                    'inputPlaceholder' => '请输入搜索关键词',
                    'imgUrl' => '',
                    'link' => [
                        'name' => ""
                    ]
                ];

                if ($v[ 'name' ] == 'DIY_SHOP_INDEX' && $v[ 'template' ] == 'shop_index_style1') {
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'isShow' ] = false;
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'style' ] = 'style-6';
                    $diy_data[ 'global' ][ 'topStatusBar' ][ 'styleName' ] = '风格6';
                }

                $index = -1;

                foreach ($diy_data[ 'value' ] as $ck => $cv) {
                    if ($cv[ 'componentName' ] == 'ShopMemberInfo') {
                        $cv[ 'margin' ][ 'bottom' ] = 0;
                        $index = $ck;
                    }

                    $diy_data[ 'value' ][ $ck ] = $cv;
                }

                if ($index > -1) {
                    $element = [
                        [
                            "path" => "edit-member-level",
                            "uses" => 1,
                            "id" => "533e6ynytmo0",
                            "componentName" => "MemberLevel",
                            "componentTitle" => "会员等级",
                            "ignore" => [
                                "componentBgColor",
                                "componentBgUrl"
                            ],
                            "style" => "style-1",
                            "styleName" => "风格1",
                            "textColor" => "#303133",
                            "componentStartBgColor" => "",
                            "componentEndBgColor" => "",
                            "topRounded" => 0,
                            "bottomRounded" => 0,
                            "elementBgColor" => "",
                            "topElementRounded" => 0,
                            "bottomElementRounded" => 0,
                            "margin" => [
                                "top" => -45,
                                "bottom" => 10,
                                "both" => 15
                            ],
                            "pageStartBgColor" => "",
                            "pageEndBgColor" => "",
                            "pageGradientAngle" => "to bottom",
                            "componentBgUrl" => "",
                            "componentBgAlpha" => 2,
                            "componentGradientAngle" => "to bottom"
                        ],
                        [
                            "path" => "edit-horz-blank",
                            "uses" => 0,
                            "id" => "5j2pwe3p2ck0",
                            "componentName" => "HorzBlank",
                            "componentTitle" => "辅助空白",
                            "ignore" => [
                                "pageBgColor",
                                "componentBgUrl"
                            ],
                            "textColor" => "#303133",
                            "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                            "componentEndBgColor" => "",
                            "topRounded" => 8,
                            "bottomRounded" => 0,
                            "elementBgColor" => "",
                            "topElementRounded" => 0,
                            "bottomElementRounded" => 0,
                            "margin" => [
                                "top" => 0,
                                "bottom" => 0,
                                "both" => 15
                            ],
                            "pageStartBgColor" => "",
                            "pageEndBgColor" => "",
                            "pageGradientAngle" => "to bottom",
                            "componentBgUrl" => "",
                            "componentBgAlpha" => 2,
                            "componentGradientAngle" => "to bottom",
                            "height" => 10
                        ],
                        [
                            "path" => "edit-text",
                            "uses" => 0,
                            "id" => "35n72xwipje",
                            "componentName" => "Text",
                            "componentTitle" => "标题",
                            "ignore" => [],
                            "textColor" => "#303133",
                            "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                            "componentEndBgColor" => "",
                            "topRounded" => 0,
                            "bottomRounded" => 0,
                            "elementBgColor" => "",
                            "topElementRounded" => 0,
                            "bottomElementRounded" => 0,
                            "margin" => [
                                "top" => 0,
                                "bottom" => 0,
                                "both" => 15
                            ],
                            "pageStartBgColor" => "",
                            "pageEndBgColor" => "",
                            "pageGradientAngle" => "to bottom",
                            "componentBgUrl" => "",
                            "componentBgAlpha" => 2,
                            "componentGradientAngle" => "to bottom",
                            "position" => "",
                            "style" => "style-2",
                            "styleName" => "风格2",
                            "text" => "订单中心",
                            "link" => [
                                "name" => ""
                            ],
                            "fontSize" => 16,
                            "fontWeight" => "normal",
                            "textAlign" => "left",
                            "subTitle" => [
                                "text" => "",
                                "color" => "#999999",
                                "fontSize" => 14,
                                "control" => true,
                                "fontWeight" => "normal"
                            ],
                            "more" => [
                                "text" => "全部订单",
                                "control" => true,
                                "isShow" => true,
                                "link" => [
                                    "parent" => "SHOP_LINK",
                                    "name" => "SHOP_ORDER_LIST",
                                    "title" => "订单列表",
                                    "url" => "/addon/shop/pages/order/list",
                                    "action" => ""
                                ],
                                "color" => "#999999"
                            ]
                        ],
                        [
                            "path" => "edit-graphic-nav",
                            "uses" => 0,
                            "id" => "2ifc2led8oo0",
                            "componentName" => "GraphicNav",
                            "componentTitle" => "图文导航",
                            "ignore" => [],
                            "textColor" => "#303133",
                            "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                            "componentEndBgColor" => "",
                            "topRounded" => 0,
                            "bottomRounded" => 8,
                            "elementBgColor" => "",
                            "topElementRounded" => 0,
                            "bottomElementRounded" => 0,
                            "margin" => [
                                "top" => 0,
                                "bottom" => 5,
                                "both" => 15
                            ],
                            "pageStartBgColor" => "",
                            "pageEndBgColor" => "",
                            "pageGradientAngle" => "to bottom",
                            "componentBgUrl" => "",
                            "componentBgAlpha" => 2,
                            "componentGradientAngle" => "to bottom",
                            "layout" => "horizontal",
                            "mode" => "graphic",
                            "showStyle" => "fixed",
                            "rowCount" => 5,
                            "pageCount" => 2,
                            "carousel" => [
                                "type" => "circle",
                                "color" => "#FFFFFF"
                            ],
                            "imageSize" => 22,
                            "aroundRadius" => 0,
                            "font" => [
                                "size" => 12,
                                "weight" => "normal",
                                "color" => "#303133"
                            ],
                            "list" => [
                                [
                                    "title" => "待付款",
                                    "link" => [
                                        "parent" => "DIY_LINK",
                                        "title" => "待付款订单",
                                        "url" => "/addon/shop/pages/order/list?status=1",
                                        "name" => "DIY_LINK",
                                        "action" => ""
                                    ],
                                    "imageUrl" => "addon/shop/diy/member/order1.png",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ],
                                    "id" => "12w6auana7jk",
                                    "imgWidth" => 44,
                                    "imgHeight" => 44
                                ],
                                [
                                    "title" => "待发货",
                                    "link" => [
                                        "parent" => "DIY_LINK",
                                        "url" => "/addon/shop/pages/order/list?status=2",
                                        "title" => "待发货订单",
                                        "name" => "DIY_LINK",
                                        "action" => ""
                                    ],
                                    "imageUrl" => "addon/shop/diy/member/order2.png",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ],
                                    "id" => "61fwl68irb80",
                                    "imgWidth" => 44,
                                    "imgHeight" => 44
                                ],
                                [
                                    "title" => "待收货",
                                    "link" => [
                                        "parent" => "DIY_LINK",
                                        "url" => "/addon/shop/pages/order/list?status=3",
                                        "title" => "待收货订单",
                                        "name" => "DIY_LINK",
                                        "action" => ""
                                    ],
                                    "imageUrl" => "addon/shop/diy/member/order3.png",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ],
                                    "id" => "1tg2aem3ymxs",
                                    "imgWidth" => 44,
                                    "imgHeight" => 44
                                ],
                                [
                                    "title" => "待评价",
                                    "link" => [
                                        "parent" => "DIY_LINK",
                                        "url" => "/addon/shop/pages/order/list?status=5",
                                        "title" => "待评价",
                                        "name" => "DIY_LINK",
                                        "action" => ""
                                    ],
                                    "imageUrl" => "addon/shop/diy/member/order4.png",
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ],
                                    "id" => "3gxy8l1dst60",
                                    "imgWidth" => 45,
                                    "imgHeight" => 44
                                ],
                                [
                                    "id" => "77dy65ml08o0",
                                    "title" => "售后退款",
                                    "imageUrl" => "addon/shop/diy/member/order5.png",
                                    "imgWidth" => 44,
                                    "imgHeight" => 44,
                                    "link" => [
                                        "parent" => "SHOP_LINK",
                                        "name" => "SHOP_REFUND_LIST",
                                        "title" => "退款列表",
                                        "url" => "/addon/shop/pages/refund/list",
                                        "action" => ""
                                    ],
                                    "label" => [
                                        "control" => false,
                                        "text" => "热门",
                                        "textColor" => "#FFFFFF",
                                        "bgColorStart" => "#F83287",
                                        "bgColorEnd" => "#FE3423"
                                    ]
                                ]
                            ]
                        ],
                    ];

                    array_splice($diy_data[ 'value' ], ( $index + 1 ), 0, $element);
                }

                $diy_data[ 'value' ] = array_values($diy_data[ 'value' ]);
                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

        // 赋值 页面名称（用于后台展示）
        $diy_model->where([ [ 'page_title', '=', '' ], ])->update([ 'page_title' => Db::raw('title') ]);
    }

}