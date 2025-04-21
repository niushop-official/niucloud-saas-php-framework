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

namespace addon\zxprint\app\model\zx_print;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 小票打印配置模型
 * Class ZxPrint
 * @package addon\zxprint\app\model\zx_print
 */
class ZxPrint extends BaseModel
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
    protected $name = 'zx_print';

    
    /**
     * 搜索器:应用设置参数名称
     * @param $value
     * @param $data
     */
    public function searchValueTypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("value_type", $value);
        }
    }
    
    /**
     * 搜索器:应用设置参数值
     * @param $value
     * @param $data
     */
    public function searchValueCodeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("value_code", $value);
        }
    }
    
    /**
     * 搜索器:应用设置是否启用
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
     * 搜索器:应用设置创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["create_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["create_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["create_time", "<=", $end]]);
        }
    }

    
}
