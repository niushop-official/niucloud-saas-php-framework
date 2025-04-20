<?php

namespace addon\shop\app\upgrade\v130;

use app\model\site\Site;
use app\model\sys\Poster;
use app\service\admin\diy\DiyService;
use app\service\core\poster\CorePosterService;

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
        ])->field('site_id,site_name')->select()->toArray();

        if (!empty($site_list)) {

            $poster = new CorePosterService();
            $poster_model = new Poster();

            foreach ($site_list as $k => $v) {

                // 删除旧模板
                $poster_model->where([ [ 'site_id', '=', $v[ 'site_id' ] ], [ 'addon', '=', 'shop' ] ])->delete();

                // 创建默认商品海报
                $template = $poster->getTemplateList('shop', 'shop_goods')[ 0 ];
                $poster->add($v[ 'site_id' ], 'shop', [
                    'name' => $template[ 'name' ],
                    'type' => $template[ 'type' ],
                    'value' => $template[ 'data' ],
                    'status' => 1,
                    'is_default' => 1
                ]);

                // 创建默认积分商品海报
                $template = $poster->getTemplateList('shop', 'shop_point_goods')[ 0 ];
                $poster->add($v[ 'site_id' ], 'shop', [
                    'name' => $template[ 'name' ],
                    'type' => $template[ 'type' ],
                    'value' => $template[ 'data' ],
                    'status' => 1,
                    'is_default' => 1
                ]);

            }
        }

    }

}