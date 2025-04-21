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


use core\dict\DictLoader;

class PrinterDict
{

    public const YI_LIAN_YUN = 'yilianyun'; // 易联云打印机

    /**
     * 打印机品牌
     * @param string $brand
     * @return array|mixed|string
     */
    public static function getBrandName($brand = '')
    {
        $list = [
            self::YI_LIAN_YUN => get_lang('dict_printer.yilianyun'), // 易联云打印机
        ];
        if ($brand == '') return $list;
        return $list[ $brand ] ?? '';
    }

    /**
     * 获取打印机模板类型
     * @param string $type
     * @return array|null
     */
    public static function getType($type = '')
    {
        $system_type = [];

        $type_list = ( new DictLoader("Printer") )->load($system_type);

        if ($type == '') {
            return $type_list;
        } else {
            $data = [];
            foreach ($type_list as $k => $v) {
                if ($v[ 'key' ] == $type) {
                    $data = $v;
                    break;
                }
            }
            return $data;
        }

    }

}