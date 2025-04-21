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

namespace addon\shop\app\service\core\goods;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 商品排行榜配置
 * Class CoreGoodsRankConfigService
 * @package addon\shop\app\service\core\goods
 */
class CoreGoodsRankConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置商品排行榜配置
     * @param array $params
     * @return bool
     */
    public function setGoodsRankConfig($params)
    {
        $value = [
//            "rank_name" => $params[ 'rank_name' ], // 排行榜名称
            "rank_images" => $params[ 'rank_images' ], // 广告图
//            'rank_remark' => $params[ 'rank_remark' ], // 备注
            "no_color" => $params[ 'no_color' ], // 常规颜色
            "select_color" => $params[ 'select_color' ], // 选中文字颜色
            "select_bg_color_start" => $params[ 'select_bg_color_start' ], // 选中背景色（开始）
            "select_bg_color_end" => $params[ 'select_bg_color_end' ], // 选中背景色（结束）
        ];

        $this->core_config_service->setConfig($params[ 'site_id' ], 'GOODS_RANK_CONFIG', $value);
        return true;
    }

    /**
     * 获取商品排行榜配置
     * @return array
     */
    public function getGoodsRankConfig(int $site_id)
    {
        $res = ( new CoreConfigService() )->getConfig($site_id, 'GOODS_RANK_CONFIG');
        $data = [
//            'rank_name' => $res[ 'value' ][ 'rank_name' ] ?? '排名依据销量与销售额计算 定时更新',
            'rank_images' => $res[ 'value' ][ 'rank_images' ] ?? 'addon/shop/rank/rank_images.jpg',
//            'rank_remark' => $res[ 'value' ][ 'rank_remark' ] ?? '精选商城内销量最高的商品，涵盖多个品类，为用户提供当前最受欢迎的商品参考。'. PHP_EOL.'本榜单以销量为主要排名依据，保证推荐商品的高质量和高热度。',
            'no_color' => $res[ 'value' ][ 'no_color' ] ?? '#FFFCF5',
            'select_color' => $res[ 'value' ][ 'select_color' ] ?? '#FF4142',
            'select_bg_color_start' => $res[ 'value' ][ 'select_bg_color_start' ] ?? '#FFFFFF',
            'select_bg_color_end' => $res[ 'value' ][ 'select_bg_color_end' ] ?? '#FFEBD7',
        ];
        return $data;
    }

}
