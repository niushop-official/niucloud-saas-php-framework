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

namespace addon\shortvideo\app\service\admin\config;

use addon\shortvideo\app\model\Config;

use addon\shortvideo\app\service\core\CoreConfigService;
use core\base\BaseAdminService;


/**
 * 服务层
 * Class LabelService
 * @package addon\shortvideo\app\service\admin\cate
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Config();
    }


    public function getset()
    {

        $data['site_id'] = $this->site_id;
        $info = (new CoreConfigService)->getConfig($data);

        return $info;
    }

    public function saveset(array $data)
    {

        $this->model->where([['site_id', '=', $this->site_id]])->update($data);
        return true;
    }


}
