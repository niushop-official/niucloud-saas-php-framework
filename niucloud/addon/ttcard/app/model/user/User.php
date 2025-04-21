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

namespace addon\ttcard\app\model\user;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\ordertype\Ordertype;

/**
 * 用户管理模型
 * Class User
 * @package addon\ttcard\app\model\user
 */
class User extends BaseModel
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
    protected $name = 'ttcard_user';

    

    

    /**
     * 搜索器:用户管理状态
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
     * 搜索器:用户管理登录账号
     * @param $value
     * @param $data
     */
    public function searchUsernameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("username", $value);
        }
    }
    
    /**
     * 搜索器:用户管理用户昵称
     * @param $value
     * @param $data
     */
    public function searchNicknameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("nickname", $value);
        }
    }
    
    /**
     * 搜索器:用户管理手机号
     * @param $value
     * @param $data
     */
    public function searchPhoneAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("phone", $value);
        }
    }
    
    /**
     * 搜索器:用户管理会员等级ID
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
     * 搜索器:用户管理会员等级过期时间
     * @param $value
     * @param $data
     */
    public function searchExpirationtimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("expirationtime", $value);
        }
    }
    
    /**
     * 搜索器:用户管理会员等级状态
     * @param $value
     * @param $data
     */
    public function searchGradeStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("grade_status", $value);
        }
    }
    
    /**
     * 搜索器:用户管理上次登陆时间
     * @param $value
     * @param $data
     */
    public function searchPrelogintimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("prelogintime", $value);
        }
    }
    
    /**
     * 搜索器:用户管理本次登录时间
     * @param $value
     * @param $data
     */
    public function searchLogintimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("logintime", $value);
        }
    }
    
    /**
     * 搜索器:用户管理创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("create_time", $value);
        }
    }
    
    

    

    
    public function ordertype(){
       return $this->hasOne(Ordertype::class, 'real_id', 'ordertype_id')->joinType('left')->withField('name,real_id')->bind(['ordertype_id_name'=>'name']);
    }

}
