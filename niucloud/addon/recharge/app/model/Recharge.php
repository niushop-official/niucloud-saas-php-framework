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

namespace addon\recharge\app\model;

use addon\recharge\app\dict\RechargePackageDict;
use think\db\Query;
use core\base\BaseModel;

/**
 * 会员套餐模型
 * Class Recharge
 * @package app\model\Recharge
 */
class Recharge extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'recharge_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'recharge';

    protected $json = [ 'gift_json' ];

    protected $jsonAssoc = true;


    /**
     * 搜索器:套餐名称
     * @param $value
     * @param $data
     */
    public function searchRechargeNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("recharge_name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

    /**
     * 套餐状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getStatusNameAttr($value, $data)
    {
        return RechargePackageDict::getStatus()[ $data[ 'status' ] ] ?? '';
    }

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

}
