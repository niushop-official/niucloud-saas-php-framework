<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\model\sys;

use app\dict\sys\PosterDict;
use core\base\BaseModel;

/**
 * 海报模型
 * Class Poster
 * @package app\model\sys
 */
class Poster extends BaseModel
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
    protected $name = 'sys_poster';

    // 设置json类型字段
    protected $json = [ 'value' ];

    //设置只读字段
    protected $readonly = [ 'type' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;


    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        if (!empty($data[ 'type' ])) {
            return PosterDict::getType($data[ 'type' ])[ 'name' ] ?? '';
        }
        return '';
    }

    /**
     * 搜索器:海报名称
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("name", 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 搜索器:海报类型
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("type", '=', $value);
        }
    }
}
