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

namespace addon\shop\app\service\admin\marketing;


use core\base\BaseAdminService;


/**
 * 优惠券服务层
 * Class MarketingService
 * @package addon\shop\app\service\admin\marketing
 */
class MarketingService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index($params)
    {

        $data = event('ShopPromotion', $params);
        $category = [];
        $app = [];
        if (empty($data)) {
            return [];
        }
        foreach ($data as &$value) {
            foreach ($value[ 'category' ] as $v) {
                $category[] = $v;
            }
            unset($value[ 'category' ]);
            foreach ($value as $val) {
                $app[] = $val;
            }
        }
        $category = $this->arrayUniqueness($category, 'key');
        foreach ($category as &$value) {
            $value[ 'child' ] = [];
            foreach ($app as $v) {
                if ($value[ 'key' ] == $v[ 'category' ]) {
                    $value[ 'child' ][] = $v;
                }
            }
        }
        return $category;
    }

    //去重
    function arrayUniqueness($arr, $key)
    {
        $res = array();
        foreach ($arr as $value) {
            //查看有没有重复项
            if (isset($res[ $value[ $key ] ])) {
                //有：销毁
                unset($value[ $key ]);
            } else {
                $res[ $value[ $key ] ] = $value;
            }
        }
        return $res;
    }

}
