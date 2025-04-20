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

use addon\shop_fenxiao\app\dict\task\TaskDict;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 销售奖励会员周期表
 */
class SaleMember extends BaseModel
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
    protected $name = 'shop_fenxiao_sale_period_member';

    protected $type = [
        'settlement_time' => 'timestamp',
        'send_time' => 'timestamp',
        'sale_start_time' => 'timestamp',
        'sale_end_time' => 'timestamp'
    ];

    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('member_id, username');
    }
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
        return TaskDict::getLevelType()[$data['period_type']] ?? '';
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
     * 是否结算
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchPeriodIdAttr(Query $query, $value, $data)
    {
        if (!empty($value)) {
            $query->where('period_id', $value);
        }
    }
}
