<?php

namespace addon\shop_fenxiao\app\upgrade\v115;

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

        $site_model = new Site();
        $site_list = $site_model->where([
            [ 'app_type', '=', 'site' ],
            [ 'app', 'like', '%"shop_fenxiao"%' ],
        ])->field('site_id,site_name')->select()->toArray();

        if (!empty($site_list)) {

            $poster = new CorePosterService();
            $poster_model = new Poster();

            foreach ($site_list as $k => $v) {

                // 删除旧模板
                $poster_model->where([ [ 'site_id', '=', $v[ 'site_id' ] ], [ 'addon', '=', 'shop_fenxiao' ] ])->delete();

                // 创建默认分销商品海报
                $fenxiao_goods_template = $poster->getTemplateList('shop_fenxiao', 'fenxiao_goods')[ 0 ];
                $poster->add($v[ 'site_id' ], 'shop_fenxiao', [
                    'name' => $fenxiao_goods_template[ 'name' ],
                    'type' => $fenxiao_goods_template[ 'type' ],
                    'value' => $fenxiao_goods_template[ 'data' ],
                    'status' => 1,
                    'is_default' => 1
                ]);

            }
        }

    }

}