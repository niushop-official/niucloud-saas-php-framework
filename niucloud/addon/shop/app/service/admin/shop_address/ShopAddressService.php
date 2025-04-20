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

namespace addon\shop\app\service\admin\shop_address;

use addon\shop\app\model\shop_address\ShopAddress;
use core\base\BaseAdminService;


/**
 * 商家地址库服务层
 * Class ShopAddressService
 * @package addon\shop\app\service\admin\shop_address
 */
class ShopAddressService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ShopAddress();
    }

    /**
     * 获取商家地址库列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,contact_name,mobile,province_id,city_id,district_id,address,full_address,lat,lng,is_delivery_address,is_refund_address,is_default_delivery,is_default_refund';
        $order = '';

        $search_model = $this->model->where([ ['site_id', '=', $this->site_id] ])->withSearch([ "mobile", "full_address" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商家地址库信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,contact_name,mobile,province_id,city_id,district_id,address,full_address,lat,lng,is_delivery_address,is_refund_address,is_default_delivery,is_default_refund';

        $info = $this->model->field($field)->where([ [ 'id', '=', $id ], ['site_id', '=', $this->site_id] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加商家地址库
     * @param array $param
     * @return mixed
     */
    public function add(array $param)
    {
        $data = [
            'site_id' => $this->site_id,
            'contact_name' => $param[ 'contact_name' ],
            'mobile' => $param[ 'mobile' ],
            'province_id' => $param[ 'province_id' ],
            'city_id' => $param[ 'city_id' ],
            'district_id' => $param[ 'district_id' ],
            'address' => $param[ 'address' ],
            'full_address' => $param[ 'full_address' ],
            'lat' => $param[ 'lat' ],
            'lng' => $param[ 'lng' ],
            'is_delivery_address' => $param[ 'is_delivery_address' ],
            'is_refund_address' => $param[ 'is_refund_address' ],
            'is_default_delivery' => $param[ 'is_delivery_address' ] ? $param[ 'is_default_delivery' ] : 0,
            'is_default_refund' => $param[ 'is_refund_address' ] ? $param[ 'is_default_refund' ] : 0
        ];
        if ($data[ 'is_default_delivery' ]) $this->model->update([ 'is_default_delivery' => 0 ], [ [ 'is_default_delivery', '>', 0 ], ['site_id', '=', $this->site_id ] ]);
        if ($data[ 'is_default_refund' ]) $this->model->update([ 'is_default_refund' => 0 ], [ [ 'is_default_refund', '>', 0 ], ['site_id', '=', $this->site_id ] ]);
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 商家地址库编辑
     * @param int $id
     * @param array $param
     * @return bool
     */
    public function edit(int $id, array $param)
    {
        $data = [
            'contact_name' => $param[ 'contact_name' ],
            'mobile' => $param[ 'mobile' ],
            'province_id' => $param[ 'province_id' ],
            'city_id' => $param[ 'city_id' ],
            'district_id' => $param[ 'district_id' ],
            'address' => $param[ 'address' ],
            'full_address' => $param[ 'full_address' ],
            'lat' => $param[ 'lat' ],
            'lng' => $param[ 'lng' ],
            'is_delivery_address' => $param[ 'is_delivery_address' ],
            'is_refund_address' => $param[ 'is_refund_address' ],
            'is_default_delivery' => $param[ 'is_delivery_address' ] ? $param[ 'is_default_delivery' ] : 0,
            'is_default_refund' => $param[ 'is_refund_address' ] ? $param[ 'is_default_refund' ] : 0
        ];
        if ($data[ 'is_default_delivery' ]) $this->model->update([ 'is_default_delivery' => 0 ], [ [ 'is_default_delivery', '>', 0 ], ['site_id', '=', $this->site_id ] ]);
        if ($data[ 'is_default_refund' ]) $this->model->update([ 'is_default_refund' => 0 ], [ [ 'is_default_refund', '>', 0 ], ['site_id', '=', $this->site_id ] ]);
        $this->model->where([ [ 'id', '=', $id ], ['site_id', '=', $this->site_id] ])->update($data);
        return true;
    }

    /**
     * 删除商家地址库
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([ [ 'id', '=', $id ], ['site_id', '=', $this->site_id] ])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 获取默认发货地址
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getDefaultDeliveryAddress()
    {
        $address =  $this->model->where([ [ 'is_delivery_address', '=', 1 ], [ 'is_default_delivery', '=', 1 ], ['site_id', '=', $this->site_id] ])->findOrEmpty();
        if (!$address->isEmpty()) return $address->toArray();
    }

    public function getList()
    {
        $field = 'id,contact_name,mobile,province_id,city_id,district_id,address,full_address,lat,lng,is_delivery_address,is_refund_address,is_default_delivery,is_default_refund';
        $list = $this->model->where([['is_refund_address', '=', 1], ['site_id', '=', $this->site_id] ])->field($field)->select()->toArray();
        return $list;
    }
}
