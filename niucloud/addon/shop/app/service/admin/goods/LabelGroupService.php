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

namespace addon\shop\app\service\admin\goods;

use addon\shop\app\model\goods\Label;
use addon\shop\app\model\goods\LabelGroup;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 商品标签分组服务层
 * Class LabelGroupService
 * @package addon\shop\app\service\admin\goods
 */
class LabelGroupService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new LabelGroup();
    }

    /**
     * 获取商品标签分组列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'group_id, group_name, sort, create_time, update_time';
        $order = 'group_id desc';
        if (!empty($where[ 'order' ])) {
            $order = $where[ 'order' ] . ' ' . $where[ 'sort' ];
        }

        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "group_name" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商品标签分组列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'group_id, group_name, sort, create_time, update_time')
    {
        $order = 'sort desc,group_id desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "group_name" ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取商品标签分组信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'group_id, group_name, sort, create_time, update_time';

        $info = $this->model->field($field)->where([ [ 'group_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加商品标签分组
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'create_time' ] = time();
        $brandInfo = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'group_name', '=', $data[ 'group_name' ] ] ])->findOrEmpty()->toArray();
        if ($brandInfo) {
            throw new AdminException('标签分组已存在，请检查');
        }
        $res = $this->model->create($data);
        return $res->group_id;
    }

    /**
     * 商品标签分组编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data[ 'update_time' ] = time();
        $labelInfo = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'group_name', '=', $data[ 'group_name' ] ] ])->findOrEmpty()->toArray();
        if ($labelInfo && $labelInfo[ 'group_id' ] != $id) {
            throw new AdminException('标签分组已存在，请检查');
        }

        $this->model->where([ [ 'group_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除商品标签分组
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        // 检测商品标签分组是否被使用
        $label_model = new Label();
        $label_count = $label_model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'group_id', '=', $id ]
        ])->count();
        if ($label_count) {
            throw new AdminException('该标签分组正在使用中，无法删除');
        }

        $model = $this->model->where([ [ 'group_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 修改排序
     * @param $data
     * @return mixed
     */
    public function modifySort($data)
    {
        return $this->model->where([
            [ 'group_id', '=', $data[ 'group_id' ] ],
            [ 'site_id', '=', $this->site_id ]
        ])->update([ 'sort' => $data[ 'sort' ] ]);
    }

}
