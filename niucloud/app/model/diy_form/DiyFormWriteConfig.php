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

use core\base\BaseModel;


/**
 * 万能表单填写配置模型
 * Class DiyFormWriteConfig
 * @package app\model\diy_form
 */
class DiyFormWriteConfig extends BaseModel
{

    protected $type = [
        'create_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    // 设置json类型字段
    protected $json = [ 'level_ids', 'label_ids', 'member_write_rule', 'form_write_rule', 'time_limit_rule' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'diy_form_write_config';

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

}
