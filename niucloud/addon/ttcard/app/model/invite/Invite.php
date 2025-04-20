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

namespace addon\ttcard\app\model\invite;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\website\Website;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\card\Card;

/**
 * 微官网邀请管理模型
 * Class Invite
 * @package addon\ttcard\app\model\invite
 */
class Invite extends BaseModel
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
    protected $name = 'ttcard_invite';

    

    

    /**
     * 搜索器:微官网邀请管理状态
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
     * 搜索器:微官网邀请管理邀请者ID
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
     * 搜索器:微官网邀请管理邀请者微官网ID
     * @param $value
     * @param $data
     */
    public function searchFromWebsiteIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("from_website_id", $value);
        }
    }
    
    /**
     * 搜索器:微官网邀请管理被邀请者ID
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
     * 搜索器:微官网邀请管理被邀请者创建的名片ID
     * @param $value
     * @param $data
     */
    public function searchToUserCardIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("to_user_card_id", $value);
        }
    }
    
    /**
     * 搜索器:微官网邀请管理创建时间
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
    
    

    

    
    public function user(){
       return $this->hasOne(User::class, 'id', 'from_user_id')->joinType('left')->withField('nickname,id')->bind(['from_user_id_name'=>'nickname']);
    }

    public function website(){
       return $this->hasOne(Website::class, 'id', 'from_website_id')->joinType('left')->withField('name,id')->bind(['from_website_id_name'=>'name']);
    }

    public function user2(){
       return $this->hasOne(User::class, 'id', 'to_user_id')->joinType('left')->withField('nickname,id')->bind(['to_user_id_name'=>'nickname']);
    }

    public function card(){
       return $this->hasOne(Card::class, 'id', 'to_user_card_id')->joinType('left')->withField('name,id')->bind(['to_user_card_id_name'=>'name']);
    }

}
