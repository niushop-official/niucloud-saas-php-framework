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

namespace app\service\admin\diy_form;

use app\service\core\diy_form\CoreDiyFormConfigService;
use core\base\BaseAdminService;

/**
 * 万能表单配置服务层
 * Class DiyFormService
 * @package app\service\admin\diy
 */
class DiyFormConfig extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 编辑填写配置
     * @param $data
     * @return bool
     */
    public function editWriteConfig($data)
    {
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreDiyFormConfigService() )->editWriteConfig($data);
    }

    /**
     * 获取表单填写配置
     * @param $form_id
     * @return mixed
     */
    public function getWriteConfig($form_id)
    {
        $data = [
            'site_id' => $this->site_id,
            'form_id' => $form_id
        ];
        return ( new CoreDiyFormConfigService() )->getWriteConfig($data);
    }

    /**
     * 编辑提交配置
     * @param array $data
     * @return mixed
     */
    public function editSubmitConfig($data)
    {
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreDiyFormConfigService() )->editSubmitConfig($data);
    }

    /**
     * 获取表单提交成功页配置
     * @param $form_id
     * @return mixed
     */
    public function getSubmitConfig($form_id)
    {
        $data = [
            'site_id' => $this->site_id,
            'form_id' => $form_id
        ];
        return ( new CoreDiyFormConfigService() )->getSubmitConfig($data);
    }
}
