<?php

namespace addon\shop\app\upgrade\v144;

use addon\shop\app\model\goods\Brand;
use app\model\site\Site;

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
        $site_model = new Site();
        $site_list = $site_model->where([
            [ 'app_type', '=', 'site' ],
            [ 'app', 'like', '%"shop"%' ],
        ])->field('site_id')->select()->toArray();

        if (!empty($site_list)) {
            try {
                $brand_model = new Brand();
                foreach ($site_list as $k => $v) {
                    // 更新商品品牌自定义颜色
                    $brand_model->where([ [ 'brand_id', '>', 0 ], [ 'site_id', '=', $v[ 'site_id' ] ] ])->update([
                        'color_json' => [
                            'text_color' => 'rgba(255, 255, 255, 1)',
                            'bg_color' => 'rgba(255, 65, 66, 1)',
                            'border_color' => ''
                        ]
                    ]);
                }
            } catch (\Exception $e) {

            }
        }
    }

}
