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

namespace app\service\admin\member;

use app\model\member\MemberAddress;
use app\service\admin\sys\AreaService;
use app\service\core\member\CoreMemberAddressService;
use core\base\BaseAdminService;


/**
 * 会员收货地址服务层
 */
class AddressService extends BaseAdminService
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
        $where['site_id'] = $this->site_id;
        return ( new CoreMemberAddressService() )->getList($where);
    }

    /**
     * 获取会员收货地址信息
     * @param int $id
     * @param array $data
     * @return array
     */
    public function getInfo($id, $data)
    {
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
        $analysis_res = ( new AreaService() )->getAddress($data['full_address']);
        if ($analysis_res['status'] == 0 && $analysis_res['message'] == 'Success' && !empty($analysis_res['result']))  {
            $data['lng'] = $analysis_res['result']['location']['lng'];
            $data['lat'] = $analysis_res['result']['location']['lat'];
        }
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
        $analysis_res = ( new AreaService() )->getAddress($data['full_address']);
        if ($analysis_res['status'] == 0 && $analysis_res['message'] == 'Success' && !empty($analysis_res['result']))  {
            $data['lng'] = $analysis_res['result']['location']['lng'];
            $data['lat'] = $analysis_res['result']['location']['lat'];
        }
        return ( new CoreMemberAddressService() )->edit($id, $data);
    }

}
