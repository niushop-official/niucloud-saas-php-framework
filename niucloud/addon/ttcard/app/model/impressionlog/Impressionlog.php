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

namespace addon\ttcard\app\model\impressionlog;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\impression\Impression;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\card\Card;

/**
 * 个人印象日志管理模型
 * Class Impressionlog
 * @package addon\ttcard\app\model\impressionlog
 */
class Impressionlog extends BaseModel
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
    protected $name = 'ttcard_impressionlog';

    

    

    /**
     * 搜索器:个人印象日志管理印象ID
     * @param $value
     * @param $data
     */
    public function searchImpressionIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("impression_id", $value);
        }
    }
    
    /**
     * 搜索器:个人印象日志管理用户ID
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
     * 搜索器:个人印象日志管理名片ID
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
     * 搜索器:个人印象日志管理创建时间
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
    
    

    

    
    public function impression(){
       return $this->hasOne(Impression::class, 'id', 'impression_id')->joinType('left')->withField('name,id')->bind(['impression_id_name'=>'name']);
    }

    public function user(){
       return $this->hasOne(User::class, 'id', 'user_id')->joinType('left')->withField('nickname,id')->bind(['user_id_name'=>'nickname']);
    }

    public function card(){
       return $this->hasOne(Card::class, 'id', 'card_id')->joinType('left')->withField('name,id')->bind(['card_id_name'=>'name']);
    }

}
