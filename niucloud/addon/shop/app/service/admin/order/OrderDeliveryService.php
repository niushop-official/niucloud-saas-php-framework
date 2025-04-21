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

namespace addon\shop\app\service\admin\order;

use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\model\order\OrderDelivery;
use addon\shop\app\service\core\order\CoreOrderDeliveryService;
use addon\shop\app\service\core\order\CoreOrderService;
use core\base\BaseAdminService;

/**
 *  订单配送服务层
 */
class OrderDeliveryService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 发货
     * @param $data
     * @return true
     */
    public function delivery($data)
    {
        $data[ 'main_type' ] = OrderLogDict::STORE;
        $data[ 'main_id' ] = $this->uid;
        $data[ 'site_id' ] = $this->site_id;
        ( new CoreOrderDeliveryService() )->delivery($data);
        return true;
    }

    /**
     * 获取订单发货包裹列表
     * @param $params
     * @return mixed
     */
    public function getDeliveryPackageList($params)
    {
        $list = ( new OrderDelivery() )
            ->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'order_id', '=', $params[ 'order_id' ] ]
            ])
            ->field('id, order_id, name, delivery_type, sub_delivery_type,express_company_id, express_number, create_time')->with([
                'company' => function($query) {
                    $query->field('company_id, company_name, express_no');
                },
                'order_goods' => function($query) {
                    $query->field('goods_name, site_id, sku_name, goods_image, delivery_id, num, price')->append([ 'goods_image_thumb_small' ]);
                }
            ])
            ->select()->toArray();
        return $list;
    }

    /**
     * 物流信息
     * @param $id
     */
    public function getDeliveryPackage($data)
    {
        $field = 'id, order_id, site_id, name, delivery_type, sub_delivery_type, express_company_id, express_number, local_deliver_id, status, create_time';
        $info = ( new OrderDelivery() )->where([ [ 'id', '=', $data[ 'id' ] ], [ 'site_id', '=', $this->site_id ] ])->with([
            'company' => function($query) {
                $query->field('company_id, company_name, express_no');
            },
            'order_goods' => function($query) {
                $query->field('goods_name, site_id, sku_name, goods_image, delivery_id, num, price')->append([ 'goods_image_thumb_small' ]);
            }
        ])->field($field)->findOrEmpty()->toArray();
        if (!empty($info) && $info[ 'delivery_type' ] == OrderDeliveryDict::EXPRESS && $info[ 'sub_delivery_type' ] != OrderDeliveryDict::NONE_EXPRESS) {
            $info[ 'mobile' ] = $data[ 'mobile' ];
            $info = ( new CoreOrderService() )->deliverySearch($info);
        }
        return $info;
    }
}
