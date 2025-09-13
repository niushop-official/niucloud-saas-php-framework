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

namespace app\service\core\channel;

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysAttachment;
use app\service\core\addon\WapTrait;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;

/**
 * 素材管理服务层
 * Class CoreAttachmentService
 * @package app\service\core\sys
 */
class CoreAppService extends BaseCoreService
{
    use WapTrait;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysAttachment();
    }

    /**
     * 获取app端配置
     * @return array|mixed
     */
    public function getConfig(int $site_id)
    {
        $info = (new CoreConfigService())->getConfig($site_id, ConfigKeyDict::APP)['value'] ?? [];
        if (empty($info)) {
            $info = [
                'wechat_app_id' => '',
                'wechat_app_secret' => '',
                'uni_app_id' => '',
                'app_name' => '',
                'android_app_key' => '',
                'application_id' => ''
            ];
        }
        return $info;
    }

    public function setConfig(int $site_id, $data)
    {
        $info = (new CoreConfigService())->setConfig($site_id, ConfigKeyDict::APP, $data);
        return $info;
    }
}
