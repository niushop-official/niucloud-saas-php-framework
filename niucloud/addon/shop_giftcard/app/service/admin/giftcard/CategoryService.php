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

namespace addon\shop_giftcard\app\service\admin\giftcard;


use addon\shop_giftcard\app\model\giftcard\Category;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 礼品卡分类服务层
 * Class CategoryService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class CategoryService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Category();
    }

    /**
     * 获取礼品卡分类分页列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'category_id,category_name,status,sort,create_time';
        $order = 'create_time desc';
        if (!empty($where[ 'order' ])) {
            $order = $where[ 'order' ] . ' ' . $where[ 'sort' ];
        }

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "category_id", "category_name", 'status' ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡分类列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'category_id,category_name,status,sort,create_time')
    {
        $order = 'sort desc,create_time desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "category_id", "category_name", 'status' ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取礼品卡分类信息
     * @param int $id
     * @return array
     */
    public function getInfo($id)
    {
        $field = 'category_id,category_name,status,sort';
        $info = $this->model->field($field)->where([ [ 'category_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡分类
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->category_id;
    }

    /**
     * 礼品卡分类编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit($id, array $data)
    {
        $this->model->where([ [ 'category_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除礼品卡分类
     * @param int $id
     * @return bool
     */
    public function del($id)
    {
        $count = ( new Giftcard() )->where([ [ 'category_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->count();
        if ($count > 0) throw new AdminException('CATEGORY_CAN_NOT_DEL');
        $model = $this->model->where([ [ 'category_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 修改礼品卡分类排序号
     * @param $data
     * @return mixed
     */
    public function modifySort($data)
    {
        return $this->model->where([ [ 'category_id', '=', $data[ 'category_id' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'sort' => $data[ 'sort' ] ]);
    }

    /**
     * 修改礼品卡分类状态
     * @param $data
     * @return mixed
     */
    public function modifyStatus($data)
    {
        return $this->model->where([ [ 'category_id', '=', $data[ 'category_id' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'status' => $data[ 'status' ] ]);
    }

}
