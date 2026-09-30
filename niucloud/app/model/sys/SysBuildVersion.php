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
 * 云编译发版记录模型
 *
 * 发版 = 发起云编译任务 + 编译成功后落一条版本记录（与普通云编译的区别就在于是否有版本记录）
 */
class SysBuildVersion extends BaseModel
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
    protected $name = 'sys_build_version';

    protected $type = [
        'create_time'   => 'timestamp',
        'complete_time' => 'timestamp'
    ];

    /**
     * 发布状态名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getReleaseStatusNameAttr($value, $data)
    {
        return (int) ( $data[ 'release_status' ] ?? 0 ) === 1 ? '已发布' : '未发布';
    }

    /**
     * 搜索器：端口标识
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchPortKeyAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('port_key', $value);
        }
    }

    /**
     * 搜索器：版本号
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchVersionAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->whereLike('version', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 搜索器：发布状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchReleaseStatusAttr($query, $value, $data)
    {
        if ($value !== '' && $value !== null) {
            $query->where('release_status', (int) $value);
        }
    }
}
