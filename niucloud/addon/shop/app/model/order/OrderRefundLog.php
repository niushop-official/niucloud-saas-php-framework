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

namespace addon\shop\app\model\order;

use addon\shop\app\dict\order\OrderRefundDict;
use addon\shop\app\dict\order\OrderRefundLogDict;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseModel;

/**
 * 订单模型
 */
class OrderRefundLog extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_order_refund_log';

    //类型
    protected $type = [

    ];
    /**
     * 来源渠道
     * @param $value
     * @param $data
     * @return mixed|string|void
     */
    public function getMainTypeNameAttr($value, $data)
    {
        if (empty($data['main_type']))
            return '';
        return OrderRefundLogDict::getMainType() [$data['main_type']] ?? '';
    }
    /**
     * 操作类型转换
     * @param $value
     * @param $data
     * @return mixed|string|void
     */
    public function getTypeNameAttr($value, $data)
    {
        if (empty($data[ 'type' ]))
            return '';
        return OrderRefundDict::getActionType($data[ 'type' ]) ?? '';
    }

    /**
     * 获取操作人
     * @param $value
     * @param $data
     */
    public function getMainNameAttr($value, $data)
    {
        $main_name = '';
        if (!empty($data[ 'main_type' ]) && !empty($data[ 'main_id' ])) {
            if ($data[ 'main_type' ] == OrderRefundLogDict::MEMBER) $main_name = ( Member::find([ 'member_id' => $data[ 'main_id' ] ]) )->nickname;
            if ($data[ 'main_type' ] == OrderRefundLogDict::STORE) $main_name = ( SysUser::find([ 'uid' => $data[ 'main_id' ] ]) )->username;
        }
        return $main_name;
    }

}
