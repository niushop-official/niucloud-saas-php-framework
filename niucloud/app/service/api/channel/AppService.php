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

namespace app\service\api\channel;

use app\dict\channel\AppDict;
use app\model\sys\AppVersion;
use core\base\BaseApiService;

class AppService extends BaseApiService
{
    /**
     * 获取新的版本
     * @param $data
     * @return array
     */
    public function getNewVersion($data)
    {
        $version = (new AppVersion())->where([
            ['site_id', '=', $this->site_id],
            ['platform', '=', $data['platform'] ],
            ['version_code', '>', $data['version_code'] ],
            ['status', '=', AppDict::STATUS_PUBLISHED],
        ])->order("version_code desc")->findOrEmpty()->toArray();
        return empty($version) ? null : $version;
    }
}
