<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\dict\way;

/**
 * 线路标签
 * Class TagDict
 * @package addon\tourism\app\dict\way
 */
class WayTagDict
{
    //参团类型
    const GROUP_BUY_TYPE   = 'group_buy_type';
    //出游类型
    const TRAVEL_TYPE  = 'travel_type';
    //线路主题
    const WAY_THEME      = 'way_theme';
    //交通工具
    const WAY_TRAFFIC      =  'way_traffic';

    ///上架
    const UP = 1;
    //下架
    const DOWN = 0;

    /**
     * 后期可能会存数据表，名称暂不用多语言
     * @param string $tag_type
     * @return array|mixed|string
     */
    public static function getTag($tag_type = ''){
        $data = [
            self::GROUP_BUY_TYPE => [
                'gentuan' => '跟团游',
                'ziyou' => '自由行',
                'zijia' => '自驾游'
            ],
            self::TRAVEL_TYPE =>[
                'guonei' => '国内游',
                'chujing' => '出境游',
                'zhoubian' => '周边游'
            ],
            self::WAY_THEME => [
                'qinzi' => '亲子游',
                'fumu' => '父母游',
                'youlun' => '游轮',
                'haidao' => '海岛游',
                'lvpai' => '旅拍'
            ],
            self::WAY_TRAFFIC => [
                'feiji' => '飞机',
                'bashi' => '巴士',
                'gaotie' => '高铁',
                'zuhe' => '飞机+高铁'
            ],
        ];
        if(empty($tag_type)){
            return $data;
        }
        return $data[$tag_type] ?? '';
    }

    /**
     * 景点状态
     */
    public static function getStatus($status = ''){
        $data = [
            self::UP => [
                "status" => self::UP,
                "name"   => "已上架"
            ],
            self::DOWN => [
                "status" => self::DOWN,
                "name"   => "已下架"
            ],
        ];
        return $data;
    }
}