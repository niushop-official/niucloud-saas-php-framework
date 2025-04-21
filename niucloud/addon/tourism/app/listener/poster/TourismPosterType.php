<?php
declare ( strict_types = 1 );

namespace addon\tourism\app\listener\poster;


/**
 * 酒店海报类型
 */
class TourismPosterType
{
    /**
     * 项目海报
     * @param array $data
     * @return array
     */
    public function handle($data = [])
    {
        return [
            [
                'type' => 'tourism_hotel',
                'addon' => 'tourism',
                'name' => '酒店海报',
                'decs' => '酒店项目，分享后进入酒店详情页',
                'icon' => 'addon/tourism/poster/type_tourism.png'
            ],
            [
                'type' => 'tourism_scenic',
                'addon' => 'tourism',
                'name' => '景点海报',
                'decs' => '景点项目，分享后进入景点详情页',
                'icon' => 'addon/tourism/poster/type_tourism.png'
            ],
            [
                'type' => 'tourism_way',
                'addon' => 'tourism',
                'name' => '线路海报',
                'decs' => '线路项目，分享后进入线路详情页',
                'icon' => 'addon/tourism/poster/type_tourism.png'
            ]
        ];

    }
}
