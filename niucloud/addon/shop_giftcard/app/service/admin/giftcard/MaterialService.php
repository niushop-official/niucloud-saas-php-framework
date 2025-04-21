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


use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\giftcard\Material;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 礼品卡素材服务层
 * Class MaterialService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class MaterialService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Material();
    }

    /**
     * 获取礼品卡素材分页列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'material_id,group_id,url,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "material_id", "group_id" ], $where)->field($field)
            ->with([ 'group' ])->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡素材列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'material_id,group_id,url,create_time')
    {
        $order = 'create_time desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "material_id", "group_id" ], $where)->field($field)->with([ 'group' ])->order($order)->select()->toArray();
    }

    /**
     * 获取礼品卡素材信息
     * @param int $id
     * @return array
     */
    public function getInfo($id)
    {
        $field = 'material_id,group_id,url,create_time';

        $info = $this->model->field($field)->where([ [ 'material_id', "=", $id ] ])->with([ 'group' ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡素材
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $url_list = explode(',', $data[ 'url' ]);
        $data_list = [];
        foreach ($url_list as $k => $v) {
            $data_list[] = [
                'site_id' => $this->site_id,
                'group_id' => $data[ 'group_id' ],
                'url' => $v,
                'create_time' => time()
            ];
        }
        $this->model->insertAll($data_list);
        return true;
    }

    /**
     * 礼品卡素材编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit($id, array $data)
    {
        $this->model->where([ [ 'material_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除礼品卡素材
     * @param int $material_ids
     * @return bool
     */
    public function del($material_ids)
    {
        // 检测该素材是否被礼品卡使用过
        $giftcard_model = new Giftcard();

        $count = $giftcard_model->where([
            [ 'site_id', '=', $this->site_id ]
        ])->withSearch([ 'material_ids' ], [ 'material_ids' => explode(',', $material_ids) ])->count();
        if ($count > 0) {
            throw new AdminException('MATERIAL_CAN_NOT_DEL');
        }
        $model = $this->model->where([ [ 'material_id', 'in', $material_ids ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 修改礼品卡素材分组
     * @param $data
     * @return mixed
     */
    public function modifyGroupId($data)
    {
        return $this->model->where([ [ 'material_id', 'in', $data[ 'material_ids' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'group_id' => $data[ 'group_id' ] ]);
    }

}
