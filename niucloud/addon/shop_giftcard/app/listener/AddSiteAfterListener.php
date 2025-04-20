<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------
namespace addon\shop_giftcard\app\listener;


use addon\shop_giftcard\app\model\giftcard\Material;
use addon\shop_giftcard\app\model\giftcard\MaterialGroup;
use app\service\admin\diy\DiyService;
use app\service\core\poster\CorePosterService;

/**
 * 站点创建之后
 */
class AddSiteAfterListener
{
    public function handle($params = [])
    {
        if (in_array('shop_giftcard', $params[ 'site_addons' ])) {
            $site_id = $params[ 'site_id' ];
            request()->siteId($site_id);

            // 创建默认礼品卡赠送海报
            $poster = new CorePosterService();
            $template = $poster->getTemplateList('shop_giftcard', 'shop_giftcard_give')[ 0 ];
            $poster->add($site_id, 'shop_giftcard', [
                'name' => $template[ 'name' ],
                'type' => $template[ 'type' ],
                'value' => $template[ 'data' ],
                'status' => 1,
                'is_default' => 1
            ]);

            // 创建 礼品卡首页 微页面
            $addon_flag = 'DIY_SHOP_GIFTCARD_INDEX';

            $diy_service = new DiyService();
            $addon_index_template = $diy_service->getFirstPageData($addon_flag, 'shop_giftcard');

            $diy_service->add([
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

            // 创建 礼品卡个人中心 微页面
            $addon_flag = 'DIY_SHOP_GIFTCARD_MEMBER_INDEX';

            $diy_service = new DiyService();
            $addon_index_template = $diy_service->getFirstPageData($addon_flag, 'shop_giftcard');

            $diy_service->add([
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

            // 维护礼品卡素材分组
            $material_group_model = new MaterialGroup();
            $material_group_list = [
                [
                    'site_id' => $site_id,
                    'group_name' => '中秋节',
                    'sort' => 0,
                    'create_time' => time()
                ],
                [
                    'site_id' => $site_id,
                    'group_name' => '国庆节',
                    'sort' => 1,
                    'create_time' => time()
                ],
                [
                    'site_id' => $site_id,
                    'group_name' => '生日祝福',
                    'sort' => 2,
                    'create_time' => time()
                ]
            ];
            $material_group_model->insertAll($material_group_list);

            $material_model = new Material();
            $material_group_list = $material_group_model->field('group_id,group_name')->where([ [ 'site_id', "=", $site_id ] ])->select()->toArray();

            $group_id_1 = 0;
            $group_id_2 = 0;
            $group_id_3 = 0;
            foreach ($material_group_list as $k => $v) {
                if ($v[ 'group_name' ] == '中秋节') {
                    $group_id_1 = $v[ 'group_id' ];
                } else if ($v[ 'group_name' ] == '国庆节') {
                    $group_id_2 = $v[ 'group_id' ];
                } else if ($v[ 'group_name' ] == '生日祝福') {
                    $group_id_3 = $v[ 'group_id' ];
                }
            }

            // 维护礼品卡素材
            $material_list = [
                [
                    'site_id' => $site_id,
                    'group_id' => $group_id_1,
                    'url' => 'addon/shop_giftcard/material/zhongqiu.jpg',
                ],
                [
                    'site_id' => $site_id,
                    'group_id' => $group_id_2,
                    'url' => 'addon/shop_giftcard/material/guoqin.jpg',
                ],
                [
                    'site_id' => $site_id,
                    'group_id' => $group_id_3,
                    'url' => 'addon/shop_giftcard/material/birthday.jpg',
                ]
            ];
            $material_model->insertAll($material_list);

            return true;
        }
    }
}
