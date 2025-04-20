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

class RoomTagDict
{
    //房间设施
    const ROOM = 'room';

    //上架
    const UP = 1;
    //下架
    const DOWN = 0;

    /**
     * 后期可能会存数据表，名称暂不用多语言
     * @param string $tag_type
     * @return array|mixed|string
     */
    public static function getTag($tag_type = '')
    {
        $data = [
            self::ROOM => [
                'name' => '房间设施',
                'attr' => [
                    [ '吸烟' ],
                    [ '早餐' ],
                    [ '加床' ],
                    [ 'Wifi' ],
                    [ '窗台' ],
                    [ '浴缸' ],
                    [ '淋浴' ],
                    [ '热水' ],
                    [ '电脑' ],
                    [ '冰箱' ],
                    [ '楼层' ],
                    [ '保险箱' ],
                ]
            ],
        ];
        if (empty($tag_type)) {
            return $data;
        }
        return $data[ $tag_type ] ?? '';
    }


    /**
     * 房型状态
     */
    public static function getStatus($status = '')
    {
        $data = [
            self::UP => [
                "status" => self::UP,
                "name" => "已上架"
            ],
            self::DOWN => [
                "status" => self::DOWN,
                "name" => "已下架"
            ],
        ];
        return $data;
    }
}
