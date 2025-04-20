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

use addon\shop\app\dict\order\OrderBatchDeliveryDict;
use app\model\sys\SysUser;
use core\base\BaseModel;

/**
 * 批量发货记录模型
 */
class OrderBatchDelivery extends BaseModel
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
    protected $name = 'shop_order_batch_delivery';

    //类型
    protected $type = [
        'update_time' => 'timestamp',
    ];
    // 设置json类型字段
    protected $json = [ 'data' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 管理员
     * @return \think\model\relation\HasOne
     */
    public function user()
    {
        return $this->hasOne(SysUser::class, 'uid', 'main_id');
    }

    /**
     * 状态
     * @param $value
     * @param $data
     * @return string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data[ 'status' ])) return '';
        return OrderBatchDeliveryDict::getStatus()[ $data[ 'status' ] ] ?? '';
    }

    /**
     * 操作类型
     * @return mixed|string
     */
    public function getTypeNameAttr($value, $data)
    {
        if (empty($data[ 'type' ]))
            return '';
        return OrderBatchDeliveryDict::getType()[ $data[ 'type' ] ] ?? '';
    }


    /**
     * 退款状态搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("status", $value);
        }
    }

    /**
     * 类型搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("type", $value);
        }
    }

    /**
     * 操作人搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchMainIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("main_id", $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'create_time', '<=', $end_time ] ]);
        }
    }

}
