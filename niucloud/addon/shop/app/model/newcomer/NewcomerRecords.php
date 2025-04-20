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

namespace addon\shop\app\model\newcomer;


use core\base\BaseModel;

/**
 * 新人专享会员参与记录模型
 */
class NewcomerRecords extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'record_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_newcomer_member_records';

    protected $type = [];

    // 设置json类型字段
    protected $json = [ 'goods_ids', 'sku_ids' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

}
