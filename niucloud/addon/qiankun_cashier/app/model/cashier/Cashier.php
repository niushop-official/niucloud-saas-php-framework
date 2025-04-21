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

namespace addon\qiankun_cashier\app\model\cashier;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

/**
 * 收银员模型
 * Class Cashier
 * @package addon\qiankun_cashier\app\model\cashier
 */
class Cashier extends BaseModel
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
    protected $name = 'qiankun_cashier_list';

    

    

    /**
     * 搜索器:收银员ID
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
     * 搜索器:收银员绑定用户
     * @param $value
     * @param $data
     */
    public function searchUserIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("user_id", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:收银员用户名
     * @param $value
     * @param $data
     */
    public function searchUsernameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("username", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:收银员昵称
     * @param $value
     * @param $data
     */
    public function searchNicknameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("nickname", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:收银员手机号
     * @param $value
     * @param $data
     */
    public function searchMobileAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("mobile", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:收银员状态
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
     * 搜索器:收银员创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("create_time", $value);
        }
    }
    
    /**
     * 搜索器:收银员更新时间
     * @param $value
     * @param $data
     */
    public function searchUpdateTimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("update_time", $value);
        }
    }
    
    

    

    
    public function member(){
       return $this->hasOne(Member::class, 'member_id', 'user_id')->joinType('left')->withField('nickname,member_id')->bind(['user_id_name'=>'nickname']);
    }

}
