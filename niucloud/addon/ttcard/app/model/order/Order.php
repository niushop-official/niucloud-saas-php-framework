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

namespace addon\ttcard\app\model\order;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\ordertype\Ordertype;

/**
 * 订单管理模型
 * Class Order
 * @package addon\ttcard\app\model\order
 */
class Order extends BaseModel
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
    protected $name = 'ttcard_order';

    

    

    /**
     * 搜索器:订单管理订单号
     * @param $value
     * @param $data
     */
    public function searchOrderNumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_num", $value);
        }
    }
    
    /**
     * 搜索器:订单管理支付状态
     * @param $value
     * @param $data
     */
    public function searchPayStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("pay_status", $value);
        }
    }
    
    /**
     * 搜索器:订单管理用户ID
     * @param $value
     * @param $data
     */
    public function searchUserIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("user_id", $value);
        }
    }
    
    /**
     * 搜索器:订单管理认证ID
     * @param $value
     * @param $data
     */
    public function searchAuthenticationIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("authentication_id", $value);
        }
    }
    
    /**
     * 搜索器:订单管理收费类型ID
     * @param $value
     * @param $data
     */
    public function searchOrdertypeIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("ordertype_id", $value);
        }
    }
    
    /**
     * 搜索器:订单管理会员类型
     * @param $value
     * @param $data
     */
    public function searchOrdertypeViptypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("ordertype_viptype", $value);
        }
    }
    
    /**
     * 搜索器:订单管理收费类型
     * @param $value
     * @param $data
     */
    public function searchOrderTypeDiynameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_type_diyname", $value);
        }
    }
    
    /**
     * 搜索器:订单管理支付时间
     * @param $value
     * @param $data
     */
    public function searchPaytimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("paytime", $value);
        }
    }
    
    /**
     * 搜索器:订单管理创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("create_time", $value);
        }
    }
    
    

    

    
    public function user(){
       return $this->hasOne(User::class, 'id', 'user_id')->joinType('left')->withField('nickname,id')->bind(['user_id_name'=>'nickname']);
    }

    public function ordertype(){
       return $this->hasOne(Ordertype::class, 'real_id', 'ordertype_id')->joinType('left')->withField('name,real_id')->bind(['ordertype_id_name'=>'name']);
    }

}
