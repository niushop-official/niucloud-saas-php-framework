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

namespace app\model\verify;

use app\model\member\Member;
use core\base\BaseModel;

/**
 * 核销员模型
 * Class Poster
 * @package app\model\verify
 */
class Verifier extends BaseModel
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
    protected $name = 'verifier';

    // 设置json类型字段
    protected $json = [ 'verify_type' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    public function member() {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }


}
