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

namespace addon\shop_fenxiao\app\model\agent;

use core\base\BaseModel;
use think\db\Query;

/**
 * 分销商
 */
class AgentLevel extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'level_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_agent_level';

    protected $type = [

    ];

    /**
     * 搜索器:等级名称
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchNameAttr(Query $query, $value, $data)
    {
        if ($value != '') {
            $query->whereLike('name', "%" . $value . "%");
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
