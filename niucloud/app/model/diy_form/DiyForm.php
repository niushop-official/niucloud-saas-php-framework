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

namespace app\model\diy_form;

use app\dict\diy_form\TypeDict;
use app\model\addon\Addon;
use core\base\BaseModel;
use think\model\relation\HasMany;
use think\model\relation\HasOne;


/**
 * 自定义万能表单模型
 * Class DiyForm
 * @package app\model\diy
 */
class DiyForm extends BaseModel
{

    protected $type = [
        'create_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'form_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'diy_form';

    // 设置json类型字段
    protected $json = [ 'value', 'share' ];

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
            return TypeDict::getType([ 'key' => [ $data[ 'type' ] ] ])[ $data[ 'type' ] ][ 'title' ] ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化：所属插件名称
     * @param $value
     * @param $data
     * @return array
     */
    public function getAddonNameAttr($value, $data)
    {
        if (empty($data[ 'addon' ])) {
            return [];
        }
        return ( new Addon() )->where([ [ 'key', '=', $data[ 'addon' ] ] ])->column('title');
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getShareAttr($value, $data)
    {
        if (empty($data[ 'share' ])) {
            $data[ 'share' ] = [
                'wechat' => [
                    'title' => $data[ 'title' ],
                    'desc' => '',
                    'url' => ''
                ],
                'weapp' => [
                    'title' => $data[ 'title' ],
                    'url' => ''
                ]
            ];
        }
        return $data[ 'share' ] ?? '';
    }

    /**
     * 搜索器:表单id
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFormIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("form_id", $value);
        }
    }

    /**
     * 搜索器:表单名称
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("title|page_title", 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 搜索器:表单类型
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("type", $value);
        }
    }

    /**
     * 搜索器:所属插件标识
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchAddonAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("addon", $value);
        }
    }

    /**
     * 搜索器:状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value !== '') {
            $query->where("status", $value);
        }
    }

    /**
     *
     * @return HasOne
     */
    public function writeConfig()
    {
        return $this->hasOne(DiyFormWriteConfig::class, 'form_id', 'form_id');
    }

    /**
     *
     * @return HasOne
     */
    public function submitConfig()
    {
        return $this->hasOne(DiyFormSubmitConfig::class, 'form_id', 'form_id');
    }

    /**
     *
     * @return hasMany
     */
    public function formField()
    {
        return $this->hasMany(DiyFormFields::class, 'form_id', 'form_id');
    }

}
