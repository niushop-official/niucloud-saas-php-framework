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

namespace addon\o2o\app\service\admin\technician;

use addon\o2o\app\dict\TechnicianDict;
use addon\o2o\app\model\Technician;
use addon\o2o\app\model\TechnicianGoods;
use app\model\member\Member;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 * 技师服务层
 * Class TechnicianService
 * @package app\service\admin\technician
 */
class TechnicianService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Technician();
    }

    /**
     * 获取技师列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = [ 'technician.site_id', '=', $this->site_id ];
        $field = 'technician.id,technician.site_id,technician.member_id,technician.name,technician.age,technician.mobile,technician.working_age,technician.status,technician.label,technician.position_id,technician.position_name,technician.order_num,technician.service_time,technician.create_time,technician.bad_evaluate,technician.headimg,technician.images,technician.desc';
        $order = 'technician.create_time desc';

        $search_model = $this->model->where([ [ 'technician.site_id', '=', $this->site_id ] ])->withSearch([ "mobile", "name", "create_time" ], $where)
            ->withJoin([ 'member' => [ 'member_id', 'member_no', 'username', 'mobile', 'nickname', 'headimg' ] ])->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取技师列表
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {

        $where[] = [ 'technician.site_id', '=', $this->site_id ];
        $field = 'technician.id,technician.site_id,technician.member_id,technician.name,technician.age,technician.mobile,technician.working_age,technician.status,technician.label,technician.position_id,technician.position_name,technician.order_num,technician.service_time,technician.create_time,technician.bad_evaluate,technician.headimg,technician.images,technician.desc';
        $order = 'technician.create_time desc';

        return $this->model->where([ [ 'technician.site_id', '=', $this->site_id ] ])->withSearch([ "mobile", "name", "create_time", "status" ], $where)
            ->withJoin([ 'member' => [ 'member_id', 'member_no', 'username', 'mobile', 'nickname', 'headimg' ] ])->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid' ])->select()->toArray();
    }

    /**
     * 获取技师列表（用于弹框选择）
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {
        $field = 'technician.id,technician.site_id,technician.member_id,technician.name,technician.age,technician.mobile,technician.working_age,technician.status,technician.label,technician.position_id,technician.position_name,technician.order_num,technician.service_time,technician.create_time,technician.bad_evaluate,technician.headimg,technician.images,technician.desc';
        $order = 'technician.create_time desc';

        $verify_ids=[];
        // 检测id集合是否存在，移除不存在的id，纠正数据准确性
        if (!empty($where[ 'verify_ids' ])) {
            $verify_ids = $this->model->where([
                [ 'id', 'in', $where[ 'verify_ids' ] ]
            ])->field('id')->select()->toArray();

            if (!empty($verify_ids)) {
                $verify_ids = array_column($verify_ids, 'id');
            }
        }

        $search_model = $this->model->where([
            [ 'technician.site_id', '=', $this->site_id ],
            [ 'technician.status', '=', 1 ]
        ])->withSearch([ "mobile", "name", "create_time" ], $where)
            ->withJoin([ 'member' => [ 'member_id', 'member_no', 'username', 'mobile', 'nickname', 'headimg' ] ])->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid' ]);
        $list = $this->pageQuery($search_model);
        $list[ 'verify_ids' ] = $verify_ids;
        return $list;
    }

    /**
     * 获取技师信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,sex,name,age,mobile,working_age,status,label,position_id,position_name,order_num,service_time,create_time,bad_evaluate,headimg,images,desc';
        $info = $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->with(
            [
                'goods' => function($query) {
                    $query->field('goods_id,technician_id');
                },
                'member' => function($query) {
                    $query->field('member_id,mobile,nickname, headimg');
                }
            ]
        )->field($field)->append([ 'status_name', 'headimg_mid', 'images_mid' ])->findOrEmpty()->toArray();

        if (!empty($info) && empty($info[ 'position_id' ])) {
            $info[ 'position_id' ] = '';
        }

        return $info;

    }

    /**
     * 添加技师
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'create_time' ] = time();

        if (isset($data[ 'position_id' ]) && $data[ 'position_id' ]) {
            $position_info = ( new PositionService() )->getInfo($data[ 'position_id' ]);
            if (empty($position_info)) throw new CommonException('POSITION_NOT_EXIST');
            $data[ 'position_name' ] = $position_info[ 'name' ];
        }

        $count = $this->model->where([ [ 'member_id', '=', $data[ 'member_id' ] ], [ 'site_id', '=', $this->site_id ] ])->count();
        if ($count > 0) throw new CommonException('TECHNICIAN_MEMBER_EXIST');

        $goods_id_array = explode(',', $data[ 'goods_ids' ]);
        unset($data[ 'goods_ids' ]);
        $res = $this->model->create($data);
        if ($res->id > 0) {

            $item_data = [];
            foreach ($goods_id_array as $val) {
                $item_data[] = [ 'site_id' => $this->site_id, 'goods_id' => $val, 'technician_id' => $res->id, 'create_time' => time() ];
            }
            ( new TechnicianGoods() )->insertAll($item_data);
        }
        return $res->id;

    }


    /**
     * 技师编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        if (isset($data[ 'position_id' ]) && $data[ 'position_id' ]) {
            $position_info = ( new PositionService() )->getInfo($data[ 'position_id' ]);
            if (empty($position_info)) throw new CommonException('POSITION_NOT_EXIST');
            $data[ 'position_name' ] = $position_info[ 'name' ];
        }
        $goods_id_array = explode(',', $data[ 'goods_ids' ]);

        $count = $this->model->where([ [ 'member_id', '=', $data[ 'member_id' ] ], [ 'site_id', '=', $this->site_id ], [ 'id', '<>', $id ] ])->count();
        if ($count > 0) throw new CommonException('TECHNICIAN_MEMBER_EXIST');

        unset($data[ 'goods_ids' ]);
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);

        ( new TechnicianGoods() )->where([ [ 'technician_id', '=', $id ] ])->delete();
        $item_data = [];
        foreach ($goods_id_array as $val) {
            $item_data[] = [ 'site_id' => $this->site_id, 'goods_id' => $val, 'technician_id' => $id, 'create_time' => time() ];
        }
        ( new TechnicianGoods() )->insertAll($item_data);

        return true;
    }

    /**
     * 删除技师
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'delete_time' => time() ]);
        return $res;
    }

    /**
     * 获取会员信息
     */
    public function getMemberList($where)
    {
        $field = 'nickname,username,member_id,mobile';
        $search_model = ( new Member )->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'keyword' ], $where)->field($field)->order('member_id desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 更新状态
     * @param $id
     * @param $data
     * @return bool
     */
    public function editStatus($id, $data)
    {
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 获取支持该商品的技师
     * @param int $goods_id
     */
    public function getGoodsTechnician(int $goods_id, array $where)
    {
        $technician_ids = ( new TechnicianGoods() )->where([ [ 'goods_id', 'in', $goods_id ], [ 'site_id', '=', $this->site_id ] ])->column('technician_id');
        $field = 'id,site_id,member_id,name,age,mobile,working_age,status,label,position_id,position_name,order_num,service_time,create_time,bad_evaluate,headimg,images,desc';
        $order = 'create_time desc';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'status', '=', 1 ], [ 'status', '=', TechnicianDict::ON ], [ 'id', 'in', $technician_ids ] ])->withSearch([ "keyword", "create_time" ], $where)->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid', 'headimg_big', 'images_big' ]);
        return $this->pageQuery($search_model);
    }
}
