<?php

namespace addon\ly_area\app\listener;

use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use app\service\admin\diy\DiyService;

/**
 * 站点创建之后
 */
class AddSiteAfterListener
{
    public function handle($params = [])
    {
        
        if (in_array('ly_area', $params['site_addons'])) {
            $site_id = $params['site_id'];
            request()->siteId($site_id);

            $config = (new CoreAreaConfigService())->getAreaConfig($site_id);
            if($config['is_street'] == 1){
                //站点创建之后增加区域分红默认等级
                //创建4个等级，一级，二级，三级,四级
                for ($i = 1; $i <= 4; $i++) {
                    $level_name = '';
                    $level_area = 0;

                    switch ($i) {
                        case 1:
                            $level_name = '街道代理';   
                            $level_area = 4;
                            break;
                        case 2:
                            $level_name = '区县代理';
                            $level_area = 3;
                            break;
                        case 3:
                            $level_name = '市级代理';
                            $level_area = 2;
                            break;
                        case 4:
                            $level_name = '省级代理';
                            $level_area = 1;
                            break;
                    }

                    $data = $this->loopData($site_id, $i, $level_name, $level_area);
                    (new AreaLevel())->create($data);
                }
            } elseif ($config['is_street'] == 0) {
                for ($i = 1; $i <= 3; $i++) {
                    $level_name = '';
                    $level_area = 0;

                    switch ($i) {
                        case 1:
                            $level_name = '区县代理';
                            $level_area = 3;
                            break;
                        case 2:
                            $level_name = '市级代理';
                            $level_area = 2;
                            break;
                        case 3:
                            $level_name = '省级代理';
                            $level_area = 1;
                            break;
                    }

                    $data = $this->loopData($site_id, $i, $level_name, $level_area);
                    (new AreaLevel())->create($data);
                }
            }

 
            // 创建 分销专区 微页面
            // $addon_flag = 'DIY_SHOP_FENXIAO_ZONE';

            // $diy_service = new DiyService();
            // $addon_index_template = $diy_service->getFirstPageData($addon_flag, 'shop_fenxiao');

            // $diy_service->add([
            //     "title" => $addon_index_template[ 'title' ],
            //     "name" => $addon_flag,
            //     "type" => $addon_flag,
            //     "template" => $addon_index_template[ 'template' ],
            //     "mode" => $addon_index_template[ 'mode' ],
            //     "value" => json_encode($addon_index_template[ 'data' ]),
            //     "is_default" => 1,
            //     "is_change" => 0
            // ]);

            // return true;
        }
    }

    public function loopData($site_id, $i, $level_name, $level_area){
        $data = [
            'level_num' => $i,
            'site_id' => $site_id,
            'level_name' => $level_name,
            'level_rate' => 0,
            'level_area' => $level_area,
            'status' => 1,
            'up_type' => 0,
            'create_time' => time(),
            'update_time' => time(),
        ];

        return $data;
    }
}
