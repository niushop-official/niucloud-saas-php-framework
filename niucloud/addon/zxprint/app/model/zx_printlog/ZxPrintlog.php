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

namespace addon\zxprint\app\model\zx_printlog;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\shop\app\model\order\Order;

/**
 * 小票打印记录模型
 * Class ZxPrintlog
 * @package addon\zxprint\app\model\zx_printlog
 */
class ZxPrintlog extends BaseModel
{

     use SoftDelete;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'zx_printlog';

    /**
    * 定义软删除标记字段.
    * @var string
    */
    protected $deleteTime = 'delete_time';

    /**
    * 定义软删除字段的默认值.
    * @var int
    */
    protected $defaultSoftDelete = 0;

    /**
     * 搜索器:小票打印记录ID
     * @param $value
     * @param $data
     */
    public function searchIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("id", $value);
        }
    }
    
    /**
     * 搜索器:小票打印记录订单编号
     * @param $value
     * @param $data
     */
    public function searchOrderIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_id", $value);
        }
    }
    
    /**
     * 搜索器:小票打印记录创建时间
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
    
    

    public function orderinfos()
    {
        return $this->hasOne(\addon\shop\app\model\order\Order::class, 'order_id', 'order_id');
    }



    
    public function order(){
       return $this->hasOne(Order::class, 'order_id', 'order_id');
    }

}
