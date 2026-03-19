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

namespace app\model\site;

use core\base\BaseModel;
/**
 * 站点模型
 * Class Site
 * @package app\model\site
 */
class SiteMerchantBind extends BaseModel
{

    protected $type = [

    ];
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'site_merchant_bind';

    protected $json = ['extends'];

    protected $jsonAssoc = true;




}
