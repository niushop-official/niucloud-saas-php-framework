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

namespace addon\qiankun_source\app\model\source_list;

use app\model\member\Member;
use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\qiankun_source\app\model\category\Category;

/**
 * 素材管理模型
 * Class SourceList
 * @package addon\qiankun_source\app\model\source_list
 */
class SourceList extends BaseModel
{

    use SoftDelete;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'qiankun_source_list';

    /**
     * 定义软删除标记字段.
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值.
     * @var int
     */
    protected $defaultSoftDelete = 0;

    /**
     * 搜索器:素材管理ID
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
     * 搜索器:素材管理分类
     * @param $value
     * @param $data
     */
    public function searchCateIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("cate_id", $value);
        }
    }

    /**
     * 搜索器:素材管理用户
     * @param $value
     * @param $data
     */
    public function searchUserIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("username|nickname", "like", "%" . $value . "%");
        }
    }

    /**
     * 搜索器:素材管理文本
     * @param $value
     * @param $data
     */
    public function searchTextAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("text", "like", "%" . $value . "%");
        }
    }

    /**
     * 搜索器:用户
     * @param $value
     * @param $data
     */
    public function searchUserAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("username|nickname", "like", "%" . $value . "%");
        }
    }



    // public function category()
    // {
    //     return $this->hasOne(\addon\qiankun_source\app\model\category\Category::class, 'id', 'cate_id');
    // }


    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'cate_id')->joinType('left')->withField('title,id')->bind(['cate_id_name' => 'title']);
    }

    public function user()
    {
        return $this->hasOne(Member::class, 'member_id', 'user_id')->joinType('left')->withField('member_id,nickname,username,headimg')->bind(['nickname' => 'nickname', 'username' => 'username', 'headimg' => 'headimg']);
    }

}
