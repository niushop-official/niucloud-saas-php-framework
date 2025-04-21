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

namespace addon\tourism\app\dict\hotel;

class HotelTagDict
{
    //基础设施
    const BASE   = 'base';
    //商务设施
    const BUSINESS  = 'business';
    //服务设施
    const SERVICE      = 'service';
    //餐饮设施
    const REST      =  'rest';
    //娱乐设施
    const PLAY      =  'play';

    //上架
    const UP = 1;
    //下架
    const DOWN = 0;

    /**
     * 酒店状态
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

    /**
     * 后期可能会存数据表，名称暂不用多语言
     * @param string $tag_type
     * @return array|mixed|string
     */
    public static function getTag($tag_type = ''){
        $data = [
            self::BASE => [
                'name' => '基础设施',
                'attr' => [
                    ['免费wifi'],
                    ['网络'],
                    ['停车场']
                ]
            ],
            self::BUSINESS => [
                'name' => '商务设施',
                'attr' => [
                    ['商务中心'],
                    ['会议厅'],
                    ['多功能厅'],
                    ['行政酒廊']
                ]
            ],
            self::SERVICE => [
                'name' => '酒店服务',
                'attr' => [
                    ['洗衣服务'],
                    ['接机服务'],
                    ['行李寄存'],
                    ['儿童看护'],
                    ['开夜房'],
                    ['唤醒服务']
                ]
            ],
            self::REST => [
                'name' => '餐饮服务',
                'attr' => [
                    ['早餐'],
                    ['午餐'],
                    ['咖啡厅'],
                    ['中餐厅'],
                    ['酒吧'],
                ]
            ],
            self::PLAY => [
                'name' => '娱乐设施',
                'attr' => [
                    ['游泳池'],
                    ['健身房'],
                    ['ktv'],
                    ['儿童乐园'],
                    ['棋牌室'],
                    ['球馆'],
                ]
            ]
        ];
        if(empty($tag_type)){
            return $data;
        }
        return $data[$tag_type] ?? '';
    }
}