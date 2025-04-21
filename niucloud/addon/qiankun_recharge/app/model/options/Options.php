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

namespace addon\qiankun_recharge\app\model\options;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\shop\app\model\coupon\Coupon;

use app\model\member\MemberLevel;

/**
 * 充值项列模型
 * Class Options
 * @package addon\qiankun_recharge\app\model\options
 */
class Options extends BaseModel
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
    protected $name = 'qiankun_recharge_options';

    public function coupon(){
        return $this->hasOne(Coupon::class, 'id', 'give_coupon')->joinType('left')->withField('title,id')->bind(['give_coupon_name'=>'title']);
    }

    /**
     * 搜索器:充值项列标题
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
     * 搜索器:充值项列赠送等级
     * @param $value
     * @param $data
     */
    public function searchGiveLevelAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("give_level", $value);
        }
    }
    
    /**
     * 搜索器:充值项列状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("status", $value);
        }
    }
    
    public function memberLevel(){
       return $this->hasOne(MemberLevel::class, 'level_id', 'give_level')->joinType('left')->withField('level_name,level_id')->bind(['give_level_name'=>'level_name']);
    }

}
