<?php

namespace addon\o2o\app\upgrade\v112;

use app\model\site\Site;
use app\model\sys\Poster;
use app\service\core\poster\CorePosterService;

class Upgrade
{

    public function handle()
    {
        $this->handleData();
    }

    /**
     * 处理海报数据
     */
    private function handleData()
    {
        $site_model = new Site();
        $site_list = $site_model->where([
            [ 'app_type', '=', 'site' ],
            [ 'app', 'like', '%"o2o"%' ],
        ])->field('site_id')->select()->toArray();

        if (!empty($site_list)) {
            $poster_model = new Poster();
            $poster = new CorePosterService();
            $template = $poster->getTemplateList('o2o', 'o2o_goods')[ 0 ];
            foreach ($site_list as $k => $v) {
                // 清除旧海报数据
                $poster_model->where([ [ 'type', '=', 'o2o_goods' ], [ 'addon', '=', 'o2o' ], [ 'site_id', '=', $v[ 'site_id' ] ] ])->delete();
                // 创建默认上门服务海报
                $poster->add($v[ 'site_id' ], 'o2o', [
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