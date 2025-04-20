<?php

namespace addon\shop_fenxiao\app\upgrade\v120;

use addon\shop\app\service\admin\goods\StatisticsService;
use app\model\diy\Diy;
use Carbon\Carbon;

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

        $diy_model = new Diy();
        $where = [
            [ 'name', '=', 'DIY_SHOP_FENXIAO_ZONE' ],
            [ 'value', '<>', '' ]
        ];
        $field = 'id,site_id,name,title,template,value';
        $list = $diy_model->where($where)->field($field)->select()->toArray();

        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $diy_data = json_decode($v[ 'value' ], true);

                foreach ($diy_data[ 'value' ] as $ck => $cv) {

                    // 图片广告 组件
                    if ($cv[ 'componentName' ] == 'ImageAds') {

                        if ($diy_data[ 'value' ][ $ck ][ 'list' ]) {

                            foreach ($diy_data[ 'value' ][ $ck ][ 'list' ] as $ps_k => $ps_v) {
                                if ($ps_v[ 'imageUrl' ] == 'addon/shop_fenxiao/banner_zone.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'addon/shop_fenxiao/banner_zone.jpg';
                                }
                            }
                        }

                    }

                }

                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

    }

}
