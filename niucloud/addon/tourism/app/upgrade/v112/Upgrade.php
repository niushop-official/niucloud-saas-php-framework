<?php

namespace addon\tourism\app\upgrade\v112;

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
            [ 'app', 'like', '%"tourism"%' ],
        ])->field('site_id')->select()->toArray();

        if (!empty($site_list)) {
            $poster_model = new Poster();
            $poster = new CorePosterService();
            $template_hotel = $poster->getTemplateList('tourism', 'tourism_hotel')[ 0 ];
            $template_scenic = $poster->getTemplateList('tourism', 'tourism_scenic')[ 0 ];
            $template_way = $poster->getTemplateList('tourism', 'tourism_way')[ 0 ];
            foreach ($site_list as $k => $v) {
                // 清除旧海报数据
                $poster_model->where([ [ 'addon', '=', 'tourism' ], [ 'site_id', '=', $v[ 'site_id' ] ] ])->delete();
                // 创建默认酒店海报
                $poster->add($v[ 'site_id' ], 'tourism', [
                    'name' => $template_hotel[ 'name' ],
                    'type' => $template_hotel[ 'type' ],
                    'value' => $template_hotel[ 'data' ],
                    'status' => 1,
                    'is_default' => 1
                ]);
                // 创建默认景点海报
                $poster->add($v[ 'site_id' ], 'tourism', [
                    'name' => $template_scenic[ 'name' ],
                    'type' => $template_scenic[ 'type' ],
                    'value' => $template_scenic[ 'data' ],
                    'status' => 1,
                    'is_default' => 1
                ]);
                // 创建默认线路海报
                $poster->add($v[ 'site_id' ], 'tourism', [
                    'name' => $template_way[ 'name' ],
                    'type' => $template_way[ 'type' ],
                    'value' => $template_way[ 'data' ],
                    'status' => 1,
                    'is_default' => 1
                ]);
            }
        }
    }

}