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

namespace addon\tourism\app\model;

use app\model\member\Member;
use core\base\BaseModel;

/**
 * 旅游核销员表
 * Class OrderLog
 * @package app\model\order
 */
class TourismVerifier extends BaseModel
{

    protected $type = [
        'create_time' => 'timestamp'
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
    protected $name = 'tourism_verifier';

    public function member() {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }
}
