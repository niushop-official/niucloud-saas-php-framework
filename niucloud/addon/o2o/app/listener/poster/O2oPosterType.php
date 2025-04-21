<?php
declare ( strict_types = 1 );

namespace addon\o2o\app\listener\poster;


/**
 * 项目海报类型
 */
class O2oPosterType
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
                'type' => 'o2o_goods',
                'addon' => 'o2o',
                'name' => '上门服务海报',
                'decs' => '推广项目，分享后进入项目详情页',
                'icon' => 'addon/o2o/poster/type_o2o_goods.png'
            ]
        ];

    }
}
