<?php
declare ( strict_types = 1 );

namespace addon\huodong\app\listener\poster;


/**
 * 海报类型
 */
class PosterType
{
    /**
     * 海报
     * @param array $data
     * @return array
     */
    public function handle($data = [])
    {
        return [
            [
                'type' => 'huodong_act',
                'addon' => 'huodong',
                'name' => '活动报名海报',
                'decs' => '推广活动报名，分享后进入活动详情页',
                'icon' => 'addon/huodong/cover.png'
            ],
        ];

    }
}
