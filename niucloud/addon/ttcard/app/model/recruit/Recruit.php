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

namespace addon\ttcard\app\model\recruit;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\website\Website;

use addon\ttcard\app\model\industry\Industry;

/**
 * 招聘管理模型
 * Class Recruit
 * @package addon\ttcard\app\model\recruit
 */
class Recruit extends BaseModel
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
    protected $name = 'ttcard_recruit';

    

    

    /**
     * 搜索器:招聘管理用户ID
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
     * 搜索器:招聘管理状态
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
     * 搜索器:招聘管理招聘状态
     * @param $value
     * @param $data
     */
    public function searchRecruitStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("recruit_status", $value);
        }
    }
    
    /**
     * 搜索器:招聘管理绑定微官网ID
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
     * 搜索器:招聘管理行业ID
     * @param $value
     * @param $data
     */
    public function searchIndustryIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("industry_id", $value);
        }
    }
    
    /**
     * 搜索器:招聘管理标题
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("title", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:招聘管理职位
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
     * 搜索器:招聘管理招聘类型
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
     * 搜索器:招聘管理学历
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
     * 搜索器:招聘管理创建时间
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

    public function industry(){
       return $this->hasOne(Industry::class, 'id', 'industry_id')->joinType('left')->withField('name,id')->bind(['industry_id_name'=>'name']);
    }

}
