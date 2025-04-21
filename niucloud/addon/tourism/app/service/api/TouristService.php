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

namespace addon\tourism\app\service\api;

use addon\tourism\app\model\TourismTourist;
use core\base\BaseApiService;

/**
 * 游客信息服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class TouristService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismTourist();
    }

    /**
     * 获取游客信息列表
     */
    public function getList()
    {
        $where = [
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ]
        ];
        $field = 'id,name,id_card,mobile';
        $order = 'id desc';
        return $this->model->where($where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取游客信息
     */
    public function getDetail(int $id)
    {
        $where = [
            [ 'id', '=', $id ],
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ]
        ];
        $field = 'id,name,id_card,mobile';
        return $this->model->where($where)->field($field)->findOrEmpty()->toArray();
    }

    /**
     * 添加游客信息
     * @param array $data
     */
    public function add(array $data)
    {
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 游客信息编辑
     * @param int $id
     * @param array $data
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ] ])->update($data);
        return true;
    }

    /**
     * 删除游客信息
     * @param int $id
     */
    public function del(int $id)
    {
        return $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ] ])->delete();
    }
}