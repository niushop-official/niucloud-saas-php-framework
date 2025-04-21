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

namespace addon\ttcard\app\model\authentication;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\website\Website;
use addon\ttcard\app\model\ordertype\Ordertype;

/**
 * 认证信息管理模型
 * Class Authentication
 * @package addon\ttcard\app\model\authentication
 */
class Authentication extends BaseModel
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
    protected $name = 'ttcard_authentication';

    

    

    /**
     * 搜索器:认证信息管理ID
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
     * 搜索器:认证信息管理状态
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
     * 搜索器:认证信息管理认证状态
     * @param $value
     * @param $data
     */
    public function searchExamineStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("examine_status", $value);
        }
    }
    
    /**
     * 搜索器:认证信息管理用户ID
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
     * 搜索器:认证信息管理微官网ID
     * @param $value
     * @param $data
     */
    public function searchWebsiteIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("website_id", $value);
        }
    }
    
    /**
     * 搜索器:认证信息管理收费类型ID
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
     * 搜索器:认证信息管理收费类型
     * @param $value
     * @param $data
     */
    public function searchOrdertypeDiynameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("ordertype_diyname", $value);
        }
    }
    
    /**
     * 搜索器:认证信息管理姓名
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:认证信息管理身份证号
     * @param $value
     * @param $data
     */
    public function searchIdcardNumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("idcard_num", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:认证信息管理备注
     * @param $value
     * @param $data
     */
    public function searchTipsAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("tips", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:认证信息管理创建时间
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

    public function website(){
       return $this->hasOne(Website::class, 'id', 'website_id')->joinType('left')->withField('name,id')->bind(['website_id_name'=>'name']);
    }
    
    public function ordertype(){
        return $this->hasOne(Ordertype::class, 'real_id', 'ordertype_id')->joinType('left')->withField('name,real_id')->bind(['ordertype_id_name'=>'name']);
     }
}
