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

namespace addon\ttcard\app\model\cardmsg;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\card\Card;

/**
 * 消息管理模型
 * Class Cardmsg
 * @package addon\ttcard\app\model\cardmsg
 */
class Cardmsg extends BaseModel
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
    protected $name = 'ttcard_cardmsg';

    

    

    /**
     * 搜索器:消息管理ID
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
     * 搜索器:消息管理消息类型
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
     * 搜索器:消息管理状态
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
     * 搜索器:消息管理发送者
     * @param $value
     * @param $data
     */
    public function searchFormUserIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("form_user_id", $value);
        }
    }
    
    /**
     * 搜索器:消息管理接受者
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
     * 搜索器:消息管理名片ID
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
     * 搜索器:消息管理标题
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("title", $value);
        }
    }
    
    /**
     * 搜索器:消息管理内容
     * @param $value
     * @param $data
     */
    public function searchContentAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("content", $value);
        }
    }
    
    /**
     * 搜索器:消息管理创建时间
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
       return $this->hasOne(User::class, 'id', 'form_user_id')->joinType('left')->withField('nickname,id')->bind(['form_user_id_name'=>'nickname']);
    }

    public function touser(){
       return $this->hasOne(User::class, 'id', 'to_user_id')->joinType('left')->withField('nickname,id')->bind(['to_user_id_name'=>'nickname']);
    }

    public function card(){
       return $this->hasOne(Card::class, 'id', 'card_id')->joinType('left')->withField('name,id')->bind(['card_id_name'=>'name']);
    }

}
