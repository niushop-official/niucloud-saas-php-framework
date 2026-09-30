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

use core\base\BaseModel;

/**
 * 框架补丁模型
 */
class FrameworkPatch extends BaseModel
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
    protected $name = 'sys_framework_patch';

    protected $type = [
        'resolved_time' => 'timestamp',
        'create_time'   => 'timestamp',
        'update_time'   => 'timestamp'
    ];

    /**
     * 是否已解决（1 已解决 / 0 未解决）名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getResolveNameAttr($value, $data)
    {
        return (int) ( $data[ 'is_resolved' ] ?? 0 ) === 1 ? '已解决' : '未解决';
    }
}
