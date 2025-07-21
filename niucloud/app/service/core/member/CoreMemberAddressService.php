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

namespace app\service\core\member;

use app\model\member\MemberAddress;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 会员标签服务层
 * Class CoreMemberAccountService
 * @package app\service\core\member
 */
class CoreMemberAddressService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberAddress();
    }

    /**
     * 获取会员收货地址列表
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        if (empty($where['member_id'])) throw new CommonException('MEMBER_NOT_EXIST');
        $field = 'id, member_id, name, mobile, province_id, city_id, district_id, address, address_name, full_address, lng, lat, is_default';
        $order = 'is_default desc, id desc';

        $list = $this->model->where([ ['site_id', '=', $where['site_id']],['member_id', '=', $where['member_id'] ] ])->field($field)->order($order)->select()->toArray();
        return $list;
    }

    /**
     * 获取会员收货地址信息
     * @param int $id
     * @param array $data
     * @return array
     */
    public function getInfo(int $id, array $data)
    {
        if (empty($data['member_id'])) throw new CommonException('MEMBER_NOT_EXIST');
        $field = 'id,member_id,name,mobile,province_id,city_id,district_id,address,address_name,full_address,lng,lat,is_default';

        $info = $this->model->field($field)->where([ ['id', '=', $id], ['site_id', '=', $data['site_id']], ['member_id', '=', $data['member_id'] ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加会员收货地址
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        if (empty($data['member_id'])) throw new CommonException('MEMBER_NOT_EXIST');
        if ($data['is_default']) {
            $this->model->where([ ['member_id', '=', $data['member_id'] ]  ])->update(['is_default' => 0]);
        }
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 会员收货地址编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        if (empty($data['member_id'])) throw new CommonException('MEMBER_NOT_EXIST');
        if ($data['is_default']) {
            $this->model->where([ ['member_id', '=', $data['member_id'] ] ])->update(['is_default' => 0]);
        }
        $this->model->where([ ['id', '=', $id], ['site_id', '=', $data['site_id']], ['member_id', '=', $data['member_id'] ] ])->update($data);
        return true;
    }

    /**
     * 获取会员默认地址
     * @param int $member_id
     * @return array
     */
   public function getDefaultAddressByMemberId(int $member_id){
        $field = 'id,member_id,name,mobile,province_id,city_id,district_id,address,full_address,lng,lat,is_default';
        return $this->model->where([['member_id', '=', $member_id]])->field($field)->order('is_default desc')->findOrEmpty()->toArray();
   }

    /**
     * 获取会员存在经纬度的地址
     * @param int $member_id
     * @return array
     */
   public function getLngLatAddressByMemberId(int $member_id){
        $field = 'id,member_id,name,mobile,province_id,city_id,district_id,address,full_address,lng,lat,is_default';
        return $this->model->where([['member_id', '=', $member_id], ['lng', '<>', ''], ['lat', '<>', '']])->field($field)->order('is_default desc, id desc')->findOrEmpty()->toArray();
   }

    /**
     * 获取收货地址
     * @param int $id
     * @param int $member_id
     * @return array
     */
    public function getMemberAddressById(int $id, int $member_id){
        $field = 'id,member_id,name,mobile,province_id,city_id,district_id,address,full_address,lng,lat,is_default';
        return $this->model->where([['id', '=', $id], ['member_id', '=', $member_id]])->field($field)->findOrEmpty()->toArray();
    }
}
