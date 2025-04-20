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

use addon\tourism\app\dict\order\OrderRefundLogDict;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseModel;

/**
 * 旅游订单维权操作日志表
 * Class OrderLog
 * @package app\model\order
 */
class TourismOrderRefundLog extends BaseModel
{
    protected $type = [
        'action_time' => 'timestamp'
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
    protected $name = 'tourism_order_refund_log';

    public function getActionNameAttr($value, $data) {
        return OrderRefundLogDict::getLogAction($data['action']);
    }

    public function getNickNameAttr($value, $data) {
        $nickname = '';
        if (!empty($data['uid'])) {
            if ($data['action_way'] == 'user') {
                $nickname = (SysUser::find($data['uid']))->username;
            } else {
                $nickname = (Member::find($data['uid']))->nickname;
            }
        }
        return $nickname;
    }
}
