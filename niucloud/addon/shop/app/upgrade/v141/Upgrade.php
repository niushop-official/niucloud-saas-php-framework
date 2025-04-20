<?php

namespace addon\shop\app\upgrade\v141;

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

        // 同步最近两天的商品统计
        $start_time = Carbon::today()->getTimestamp();
        $date_arr = [];
        for ($i = 1; $i >= 0; $i--) {
            $date_arr[] = date('Y-m-d', $start_time - ( 86400 * $i ));
        }
        ( new StatisticsService() )->syncStatGoods($date_arr);

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

                    // 精选推荐 组件
                    if ($cv[ 'componentName' ] == 'SingleRecommend') {

                        if ($diy_data[ 'value' ][ $ck ][ 'list' ]) {

                            foreach ($diy_data[ 'value' ][ $ck ][ 'list' ] as $ps_k => $ps_v) {
                                if ($ps_v[ 'imageUrl' ] == 'addon/shop/diy/index/style3/single_recommend_banner1.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'addon/shop/diy/index/style3/single_recommend_banner1.jpg';
                                } else if ($ps_v[ 'imageUrl' ] == 'addon/shop/diy/index/style3/single_recommend_banner2.png') {
                                    $diy_data[ 'value' ][ $ck ][ 'list' ][ $ps_k ][ 'imageUrl' ] = 'addon/shop/diy/index/style3/single_recommend_banner2.jpg';
                                }
                            }
                        }

                    }

                    // 轮播搜索 组件
                    if ($cv[ 'componentName' ] == 'CarouselSearch') {

                        if (!empty($diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'list' ]) && $diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'list' ][ 0 ][ 'imageUrl' ] == 'addon/shop/diy/index/style3/banner1.jpg') {
                            $diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'imageHeight' ] = 274;
                            $diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'list' ][ 0 ][ 'imgWidth' ] = 750;
                            $diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'list' ][ 0 ][ 'imgHeight' ] = 580;
                            $diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'list' ][ 0 ][ 'width' ] = 355;
                            $diy_data[ 'value' ][ $ck ][ 'swiper' ][ 'list' ][ 0 ][ 'height' ] = 274.53;
                        }

                    }

                }

                $diy_data = json_encode($diy_data);
                $diy_model->where([ [ 'id', '=', $v[ 'id' ] ] ])->update([ 'value' => $diy_data ]);
            }
        }

    }

}
