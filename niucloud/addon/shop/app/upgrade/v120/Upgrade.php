<?php

namespace addon\shop\app\upgrade\v120;

use addon\shop\app\model\goods\Goods;
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
        $goods_model = new Goods();

        // 虚拟商品设置 收货设置
        $goods_model->withTrashed()->where([ [ 'goods_type', '=', 'virtual' ], [ 'virtual_receive_type', '=', '' ] ])->update([ 'virtual_receive_type' => 'artificial' ]);

        $site_model = new Site();
        $site_list = $site_model->where([
            [ 'app_type', '=', 'site' ],
            [ 'app', 'like', '%"shop"%' ],
        ])->field('site_id,site_name')->select()->toArray();

        if (!empty($site_list)) {

            $poster = new CorePosterService();
            $diy_service = new DiyService();
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

                // 创建 积分商城 微页面
                $addon_flag = 'DIY_SHOP_POINT_INDEX';
                $addon_index_template = $diy_service->getFirstPageData($addon_flag, 'shop');
                $diy_service->add([
                    'site_id' => $v[ 'site_id' ],
                    'page_title' => $addon_index_template[ 'title' ],
                    "title" => $addon_index_template[ 'title' ],
                    "name" => $addon_flag,
                    "type" => $addon_flag,
                    "template" => $addon_index_template[ 'template' ],
                    "mode" => $addon_index_template[ 'mode' ],
                    "value" => json_encode($addon_index_template[ 'data' ]),
                    "is_default" => 1,
                    "is_change" => 0
                ]);
            }
        }

    }

}