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

namespace app\dict\sys;

/**
 * 海报枚举类
 */
class PosterDict
{

    /**
     * 获取方式
     * @param string $type
     * @return array
     */
    public static function getType($type = '')
    {
        $list = [];
        $temp = array_filter(event('GetPosterType') ?? []);
        foreach ($temp as $v) {
            $list = array_merge($list, $v);
        }
        if (!empty($type)) {
            $item = [];
            foreach ($list as $v) {
                if ($v[ 'type' ] == $type) {
                    $item = $v;
                    break;
                }
            }
            return $item;
        } else {
            return $list;
        }
    }

    public const ON = '1';//开启
    public const OFF = '2';//关闭

    /**
     * 状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::ON => '启用',
            self::OFF => '关闭',
        ];
    }

}