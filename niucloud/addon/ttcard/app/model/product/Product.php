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

namespace addon\ttcard\app\model\product;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\ttcard\app\model\user\User;

use addon\ttcard\app\model\card\Card;

use addon\ttcard\app\model\website\Website;

/**
 * 产品管理模型
 * Class Product
 * @package addon\ttcard\app\model\product
 */
class Product extends BaseModel
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
    protected $name = 'ttcard_product';

    

    

    /**
     * 搜索器:产品管理用户ID
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
     * 搜索器:产品管理绑定名片ID
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
     * 搜索器:产品管理绑定微官网ID
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
     * 搜索器:产品管理标题
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
     * 搜索器:产品管理创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("create_time", $value);
        }
    }
    
    /**
     * 搜索器:产品管理状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("status", $value);
        }
    }
    
    

    

    
    public function user(){
       return $this->hasOne(User::class, 'id', 'user_id')->joinType('left')->withField('nickname,id')->bind(['user_id_name'=>'nickname']);
    }

    public function card(){
       return $this->hasOne(Card::class, 'id', 'card_id')->joinType('left')->withField('name,id')->bind(['card_id_name'=>'name']);
    }

    public function website(){
       return $this->hasOne(Website::class, 'id', 'website_id')->joinType('left')->withField('name,id')->bind(['website_id_name'=>'name']);
    }

}
