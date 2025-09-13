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

use app\dict\channel\AppDict;
use core\base\BaseModel;
use think\db\Query;

class AppVersion extends BaseModel
{
    protected $pk = 'id';

    //类型
    protected $type = [
        'release_time' => 'timestamp',
    ];

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'app_version';

    public function searchPlatformAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('platform', $value);
        }
    }

    public function getPlatformNameAttr($value, $data)
    {
        return AppDict::getAppPlatformName($data['platform']);
    }

    public function getStatusNameAttr($value, $data)
    {
        return AppDict::getStatusName($data['status']);
    }
}
