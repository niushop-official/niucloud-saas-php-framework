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

namespace addon\ttcard\app\model\website;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\card\Card;

use addon\ttcard\app\model\industry\Industry;

/**
 * 微官网管理模型
 * Class Website
 * @package addon\ttcard\app\model\website
 */
class Website extends BaseModel
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
    protected $name = 'ttcard_website';

    

    

    /**
     * 搜索器:微官网管理ID
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
     * 搜索器:微官网管理状态
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
     * 搜索器:微官网管理用户ID
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
     * 搜索器:微官网管理绑定名片ID
     * @param $value
     * @param $data
     */
    public function searchCardIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("card_id", $value);
        }
    }
    
    /**
     * 搜索器:微官网管理团队成员名片ID
     * @param $value
     * @param $data
     */
    public function searchTeamCardIdsAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("team_card_ids", $value);
        }
    }
    
    /**
     * 搜索器:微官网管理行业ID
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
     * 搜索器:微官网管理企业名称
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("name", $value);
        }
    }
    
    /**
     * 搜索器:微官网管理企业电话
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
     * 搜索器:微官网管理企业微信号
     * @param $value
     * @param $data
     */
    public function searchWechatNumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("wechat_num", $value);
        }
    }
    
    /**
     * 搜索器:微官网管理企业地址
     * @param $value
     * @param $data
     */
    public function searchAddressAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("address", $value);
        }
    }
    
    /**
     * 搜索器:微官网管理创建时间
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

    public function card(){
       return $this->hasOne(Card::class, 'id', 'card_id')->joinType('left')->withField('name,id')->bind(['card_id_name'=>'name']);
    }

    public function industry(){
       return $this->hasOne(Industry::class, 'id', 'industry_id')->joinType('left')->withField('name,id')->bind(['industry_id_name'=>'name']);
    }

}
