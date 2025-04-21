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

namespace addon\ttcard\app\model\biographical;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

/**
 * 简历管理模型
 * Class Biographical
 * @package addon\ttcard\app\model\biographical
 */
class Biographical extends BaseModel
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
    protected $name = 'ttcard_biographical';

    

    

    /**
     * 搜索器:简历管理用户ID
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
     * 搜索器:简历管理状态
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
     * 搜索器:简历管理姓名
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
     * 搜索器:简历管理电话
     * @param $value
     * @param $data
     */
    public function searchPhoneAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("phone", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:简历管理性别
     * @param $value
     * @param $data
     */
    public function searchGenderStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("gender_status", $value);
        }
    }
    
    /**
     * 搜索器:简历管理邮箱
     * @param $value
     * @param $data
     */
    public function searchEmailAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("email", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:简历管理微信号
     * @param $value
     * @param $data
     */
    public function searchWechatNumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("wechat_num", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:简历管理应聘职位
     * @param $value
     * @param $data
     */
    public function searchPositionAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("position", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:简历管理应聘类型
     * @param $value
     * @param $data
     */
    public function searchTypeStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("type_status", $value);
        }
    }
    
    /**
     * 搜索器:简历管理学历
     * @param $value
     * @param $data
     */
    public function searchEducationAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("education", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:简历管理是否待业
     * @param $value
     * @param $data
     */
    public function searchUnemployedStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("unemployed_status", $value);
        }
    }
    
    /**
     * 搜索器:简历管理创建时间
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

}
