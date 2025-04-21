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

namespace addon\shop_giftcard\app\service\api\giftcard;


use addon\shop_giftcard\app\model\giftcard\Category;
use core\base\BaseApiService;


/**
 * 礼品卡分类服务层
 * Class CategoryService
 * @package addon\shop_giftcard\app\service\api\giftcard
 */
class CategoryService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Category();
    }

    /**
     * 获取礼品卡分类列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'category_id,category_name')
    {
        $order = 'sort desc,create_time desc';
        return $this->model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'status', '=', 1 ]
        ])->withSearch([ "category_id", "category_name" ], $where)->field($field)->order($order)->select()->toArray();
    }

}
