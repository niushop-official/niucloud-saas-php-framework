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

use app\model\site\SiteGroup;
use core\base\BaseModel;

/**
 * @package app\model\sys
 */
class UserCreateSiteLimit extends BaseModel
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
    protected $name = 'user_create_site_limit';

    public function siteGroup() {
        return $this->hasOne(SiteGroup::class, 'group_id', 'group_id')->append(['app_name', 'addon_name']);
    }
}
