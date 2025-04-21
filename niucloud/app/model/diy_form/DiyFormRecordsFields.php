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

use app\dict\diy_form\ComponentDict;
use core\base\BaseModel;


/**
 * 自定义万能表单填写字段模型
 * Class DiyFormRecordsFields
 * @package app\model\diy_form
 */
class DiyFormRecordsFields extends BaseModel
{

    protected $type = [
        'create_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'diy_form_records_fields';

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getRenderValueAttr($value, $data)
    {
        if (!empty($data[ 'field_value' ])) {
            $component = ComponentDict::getComponent([
                'component_name' => $data[ 'field_type' ]
            ]);
            $render_value = $data[ 'field_value' ]; // 默认渲染值
            if (isset($component[ 'render' ])) {
                $render = $component[ 'render' ];
                if ($render instanceof \Closure) {
                    $render_value = $render($data[ 'field_value' ]);
                }
            }
            return $render_value;
        }
        return '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getHandleFieldValueAttr($value, $data)
    {
        if (!empty($data[ 'field_value' ])) {
            $component = ComponentDict::getComponent([
                'component_name' => $data[ 'field_type' ]
            ]);
            $render_value = $data[ 'field_value' ]; // 默认渲染值
            if (isset($component[ 'convert' ])) {
                $render = $component[ 'convert' ];
                if ($render instanceof \Closure) {
                    $render_value = $render($data[ 'field_value' ]);
                }
            }
            return $render_value;
        }
        return '';
    }


    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getDetailComponentAttr($value, $data)
    {
        if (!empty($data[ 'field_key' ])) {
            $detail_component = '';
            $component = ComponentDict::getComponent([ 'component_name' => $data[ 'field_type' ] ]);
            if (!empty($component)) {
                $detail_component = $component[ 'value' ][ 'field' ][ 'detailComponent' ] ?? '';
            }
            if (empty($detail_component)) {
                $detail_component = '/src/app/views/diy_form/components/detail-form-render.vue';
            }
            return $detail_component;
        }
        return '';
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
     * 搜索器:字段唯一标识
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFieldKeyAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("field_key", $value);
        }
    }

    /**
     * 搜索器:字段类型
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFieldTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("field_type", $value);
        }
    }

    /**
     * 搜索器:字段名称
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFieldNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("field_name", 'like', '%' . $value . '%');
        }
    }

    /**
     * 搜索器:字段是否必填 0:否 1:是
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFieldRequiredAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("field_required", $value);
        }
    }

    /**
     * 搜索器:字段是否隐藏 0:否 1:是
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFieldHiddenAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("field_hidden", $value);
        }
    }

    /**
     * 搜索器:字段内容防重复 0:否 1:是
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchFieldUniqueAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("field_unique", $value);
        }
    }

    /**
     * 搜索器:隐私保护 0:关闭 1:开启
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchPrivacyProtectionAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("privacy_protection", $value);
        }
    }

}
