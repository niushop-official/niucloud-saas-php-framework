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

use addon\shop\app\dict\order\InvoiceDict;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;
use think\model\relation\HasOne;

/**
 * 发票模型
 */
class Invoice extends BaseModel
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
    protected $name = 'shop_invoice';

    //类型
    protected $type = [
        'invoice_time' => 'timestamp',
    ];

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
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

    /**
     * 开票时间
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchInvoiceTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('invoice_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'invoice_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'invoice_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 是否已开票
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchIsInvoiceAttr(Query $query, $value, $data)
    {
        if ($value != 'all') $query->where([ [ 'is_invoice', '=', $value ] ]);
    }

    /**
     * 通过抬头类型搜索
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchHeaderTypeAttr(Query $query, $value, $data)
    {
        if ($value != 'all') $query->where([ [ 'header_type', '=', $value ] ]);
    }

    /**
     * 抬头内容
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchHeaderNameAttr(Query $query, $value, $data)
    {
        if ($value != '') $query->where([ [ 'header_name', 'like', "%" . $this->handelSpecialCharacter($value) . "%" ] ]);
    }

    /**
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getHeaderTypeNameAttr($value, $data)
    {
        return InvoiceDict::getHeaderType()[ $data[ 'header_type' ] ] ?? '';
    }

    public function getTypeNameAttr($value, $data)
    {
        return InvoiceDict::getType()[ $data[ 'type' ] ] ?? '';
    }

    /**
     * 获取开票状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getIsInvoiceNameAttr($value, $data)
    {
        return InvoiceDict::getIsInvoice()[ $data[ 'is_invoice' ] ] ?? '';
    }

    /**
     * 开票会员
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }

    /**
     * 开票订单
     * @return HasOne
     */
    public function shopOrder()
    {
        return $this->hasOne(Order::class, 'order_id', 'trade_id');
    }
}
