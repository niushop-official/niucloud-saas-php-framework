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

use app\dict\sys\CloudDict;
use app\model\site\SiteGroup;
use core\base\BaseModel;

/**
 * @package app\model\sys
 */
class WxOplatfromWeappVersion extends BaseModel
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
    protected $name = 'wx_oplatfrom_weapp_version';

    public function siteGroup() {
        return $this->hasOne(SiteGroup::class, 'group_id', 'site_group_id')->bind(['site_group_name' => 'group_name']);
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (!isset($data['status'])) return '';
        return CloudDict::getAppletUploadStatus($data['status']);
    }

    /**
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchSiteGroupIdAttr($query, $value, $data) {
        if (!empty($value)) {
            $query->where('site_group_id', '=', $value);
        }
    }
}
