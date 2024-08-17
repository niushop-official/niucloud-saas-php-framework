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

namespace app\model\member;

use core\base\BaseModel;

/**
 * 会员等级模型
 * Class MemberLevel
 * @package app\model\member
 */
class MemberLevel extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'level_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'member_level';

    protected $type = [
        'level_benefits' => 'json',
        'level_gifts' => 'json',
        'style' => 'json'
    ];

    /**
     * 获取对应等级的会员数量
     * @param $value
     * @param $data
     * @return int
     * @throws DbException
     */
    public function getMemberNumAttr($value, $data)
    {
        if (isset($data[ 'level_id' ])) {
            return ( new Member() )->where([ [ 'member_level', "=", $data[ 'level_id' ] ] ])->count();
        } else
            return 0;
    }

    /**
     * 会员等级名称
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchLevelNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('level_name', 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }
}
