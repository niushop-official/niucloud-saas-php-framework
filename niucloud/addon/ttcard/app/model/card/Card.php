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

namespace addon\ttcard\app\model\card;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\industry\Industry;

use addon\ttcard\app\model\cardbackground\Cardbackground;

/**
 * 名片管理模型
 * Class Card
 * @package addon\ttcard\app\model\card
 */
class Card extends BaseModel
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
    protected $name = 'ttcard_card';

    

    

    /**
     * 搜索器:名片管理所属用户
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
     * 搜索器:名片管理状态
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
     * 搜索器:名片管理审核状态
     * @param $value
     * @param $data
     */
    public function searchAuditingStatusAttr($query, $value, $data)
    {
       if ($value || $value == 0) {
            $query->where("auditing_status", $value);
        }
    }
    
    /**
     * 搜索器:名片管理行业ID
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
     * 搜索器:名片管理姓名
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
     * 搜索器:名片管理手机号
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
     * 搜索器:名片管理职位
     * @param $value
     * @param $data
     */
    public function searchPositionAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("position", $value);
        }
    }
    
    /**
     * 搜索器:名片管理邮箱
     * @param $value
     * @param $data
     */
    public function searchEmailAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("email", $value);
        }
    }
    
    /**
     * 搜索器:名片管理微信号
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
     * 搜索器:名片管理是否推荐
     * @param $value
     * @param $data
     */
    public function searchRecommendAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("recommend", $value);
        }
    }
    
    /**
     * 搜索器:名片管理首页默认展示
     * @param $value
     * @param $data
     */
    public function searchDefaultStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("default_status", $value);
        }
    }
    
    /**
     * 搜索器:名片管理推送到人脉
     * @param $value
     * @param $data
     */
    public function searchConnectionsStatusAttr($query, $value, $data)
    {
       if ($value || $value == 0) {
            $query->where("connections_status", $value);
        }
    }
    
    /**
     * 搜索器:名片管理创建时间
     * @param $value
     * @param $data
     */
    public function searchCreatetimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["createtime", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["createtime", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["createtime", "<=", $end]]);
        }
    }
    
    

    

    
    public function user(){
       return $this->hasOne(User::class, 'id', 'user_id')->joinType('left')->withField('nickname,id')->bind(['user_id_name'=>'nickname']);
    }

    public function industry(){
       return $this->hasOne(Industry::class, 'id', 'industry_id')->joinType('left')->withField('name,id')->bind(['industry_id_name'=>'name']);
    }

    public function cardbackground(){
       return $this->hasOne(Cardbackground::class, 'id', 'card_bg_id')->joinType('left')->withField('title,id')->bind(['card_bg_id_name'=>'title']);
    }

}
