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

namespace app\service\api\member;

use app\model\member\MemberAddress;
use app\service\core\member\CoreMemberAddressService;
use core\base\BaseApiService;


/**
 * 会员收货地址服务层
 * Class AddressService
 * @package app\service\admin\address
 */
class AddressService extends BaseApiService
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
        $where['member_id'] = $this->member_id;
        $where['site_id'] = $this->site_id;
        return ( new CoreMemberAddressService() )->getList($where);
    }

    /**
     * 获取会员收货地址信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $data['member_id'] = $this->member_id;
        $data['site_id'] = $this->site_id;
        return ( new CoreMemberAddressService() )->getInfo($id, $data);
    }

    /**
     * 添加会员收货地址
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['member_id'] = $this->member_id;
        $data['site_id'] = $this->site_id;
        return ( new CoreMemberAddressService() )->add($data);
    }

    /**
     * 会员收货地址编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data['member_id'] = $this->member_id;
        $data['site_id'] = $this->site_id;
        return ( new CoreMemberAddressService() )->edit($id, $data);
    }

    /**
     * 删除会员收货地址
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([ ['id', '=', $id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->find();
        $res = $model->delete();
        return $res;
    }

}
