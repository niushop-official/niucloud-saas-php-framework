<?php

namespace addon\shop\app\upgrade\v133;

use addon\shop\app\model\goods\Label;
use addon\shop\app\model\goods\LabelGroup;
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

            $label_group_model = new LabelGroup();
            $label_model = new Label();

            foreach ($site_list as $k => $v) {

                // 添加默认商品标签分组
                $res = $label_group_model->create([
                    'site_id' => $v[ 'site_id' ],
                    'group_name' => '默认',
                    'create_time' => time(),
                ]);

                if (!empty($res->group_id)) {

                    // 更新商品标签数据，标签分组id、效果设置、自定义颜色、图标、状态
                    $label_model->where([ [ 'label_id', '>', 0 ], [ 'site_id', '=', $v[ 'site_id' ] ] ])->update([
                        'group_id' => $res->group_id,
                        'status' => 1,
                        'style_type' => 'diy',
                        'color_json' => [
                            'text_color' => 'rgba(255, 255, 255, 1)',
                            'bg_color' => 'rgba(255, 65, 66, 1)',
                            'border_color' => ''
                        ]
                    ]);
                }

            }

        }

    }

}