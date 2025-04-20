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

namespace addon\shop_fenxiao\app\model\sale;

use addon\shop_fenxiao\app\dict\sale\SaleDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 销售奖励周期表
 */
class Sale extends BaseModel
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
    protected $name = 'shop_fenxiao_sale_period';

    protected $type = [
        'settlement_time' => 'timestamp',
        'send_time' => 'timestamp',
        'sale_start_time' => 'timestamp',
        'sale_end_time' => 'timestamp'
    ];

    /**
     * 销售周期类型
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getPeriodTypeNameAttr($value, $data)
    {
        if (empty($data['period_type']))
            return '';
        return SaleDict::getPeriodType()[$data['period_type']] ?? '';
    }


    /**
     * 是否结算
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchIsSettlementAttr(Query $query, $value, $data)
    {
        if ($value != 'all') {
            $query->where('is_settlement', $value);
        }
    }

    /**
     * 是否发放
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchIsSendAttr(Query $query, $value, $data)
    {
        if ($value != 'all') {
            $query->where('is_send', $value);
        }
    }

    /**
     * 结算时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchSettlementTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('settlement_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['settlement_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['settlement_time', '<=', $end_time]]);
        }
    }

    /**
     * 发放时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchSendTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('send_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['send_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['send_time', '<=', $end_time]]);
        }
    }

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }
}
