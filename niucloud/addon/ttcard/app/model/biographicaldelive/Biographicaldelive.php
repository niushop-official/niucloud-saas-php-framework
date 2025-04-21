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

namespace addon\ttcard\app\model\biographicaldelive;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\recruit\Recruit;

use addon\ttcard\app\model\biographical\Biographical;

/**
 * 简历投递管理模型
 * Class Biographicaldelive
 * @package addon\ttcard\app\model\biographicaldelive
 */
class Biographicaldelive extends BaseModel
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
    protected $name = 'ttcard_biographicaldelive';

    

    

    /**
     * 搜索器:简历投递管理状态
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
     * 搜索器:简历投递管理发送者用户ID
     * @param $value
     * @param $data
     */
    public function searchFromUserIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("from_user_id", $value);
        }
    }
    
    /**
     * 搜索器:简历投递管理接收者用户ID
     * @param $value
     * @param $data
     */
    public function searchToUserIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("to_user_id", $value);
        }
    }
    
    /**
     * 搜索器:简历投递管理招聘ID
     * @param $value
     * @param $data
     */
    public function searchRecruitIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("recruit_id", $value);
        }
    }
    
    /**
     * 搜索器:简历投递管理简历ID
     * @param $value
     * @param $data
     */
    public function searchBiographicalIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("biographical_id", $value);
        }
    }
    
    /**
     * 搜索器:简历投递管理招聘者是否查看
     * @param $value
     * @param $data
     */
    public function searchViewStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("view_status", $value);
        }
    }
    
    /**
     * 搜索器:简历投递管理创建时间
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
       return $this->hasOne(User::class, 'id', 'from_user_id')->joinType('left')->withField('nickname,id')->bind(['from_user_id_name'=>'nickname']);
    }

    public function user2(){
       return $this->hasOne(User::class, 'id', 'to_user_id')->joinType('left')->withField('nickname,id')->bind(['to_user_id_name'=>'nickname']);
    }

    public function recruit(){
       return $this->hasOne(Recruit::class, 'id', 'recruit_id')->joinType('left')->withField('title,id')->bind(['recruit_id_name'=>'title']);
    }

    public function biographical(){
       return $this->hasOne(Biographical::class, 'id', 'biographical_id')->joinType('left')->withField('name,id')->bind(['biographical_id_name'=>'name']);
    }

}
