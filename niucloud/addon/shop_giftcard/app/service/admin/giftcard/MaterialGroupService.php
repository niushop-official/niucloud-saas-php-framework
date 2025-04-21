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

use addon\shop_giftcard\app\model\giftcard\Material;
use addon\shop_giftcard\app\model\giftcard\MaterialGroup;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 礼品卡素材分组服务层
 * Class MaterialGroupService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class MaterialGroupService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MaterialGroup();
    }

    /**
     * 获取礼品卡素材分组分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'group_id,group_name,sort,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "group_id", "group_name" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡素材分组列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'group_id,group_name,sort,create_time')
    {
        $order = 'sort desc,create_time desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "group_id", "group_name" ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取礼品卡素材分组信息
     * @param int $id
     * @return array
     */
    public function getInfo($id)
    {
        $field = 'group_id,site_id,group_name,sort';

        $info = $this->model->field($field)->where([ [ 'group_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡素材分组
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->group_id;
    }

    /**
     * 礼品卡素材分组编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit($id, array $data)
    {
        $this->model->where([ [ 'group_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除礼品卡素材分组
     * @param int $id
     * @return bool
     */
    public function del($id)
    {
        $model = $this->model->where([ [ 'group_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        // 检测该分组下是否存在图片
        $material_model = new Material();
        $count = $material_model->where([ [ 'group_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->count();
        if ($count > 0) {
            throw new AdminException('MATERIAL_GROUP_CAN_NOT_DEL');
        }
        $res = $model->delete();
        return $res;
    }

    /**
     * 修改礼品卡素材分组排序号
     * @param $data
     * @return mixed
     */
    public function modifySort($data)
    {
        return $this->model->where([ [ 'group_id', '=', $data[ 'group_id' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'sort' => $data[ 'sort' ] ]);
    }

}
