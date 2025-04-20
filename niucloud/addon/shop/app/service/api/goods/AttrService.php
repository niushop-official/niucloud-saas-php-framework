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

namespace addon\shop\app\service\api\goods;

use addon\shop\app\model\goods\Attr;
use core\base\BaseApiService;


/**
 * 商品参数服务层
 * Class AttrService
 * @package addon\shop\app\service\admin\goods
 */
class AttrService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Attr();
    }

    /**
     * 获取商品参数列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'attr_id,site_id,attr_name,sort';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "attr_id", "attr_name", "attr_value_format", "sort" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商品参数信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'attr_id,site_id,attr_name,attr_value_format,sort';

        $info = $this->model->field($field)->where([ [ 'attr_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

}
