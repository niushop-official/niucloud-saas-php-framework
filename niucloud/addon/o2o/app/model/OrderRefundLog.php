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

namespace addon\o2o\app\model;

use addon\o2o\app\dict\order\OrderRefundLogDict;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseModel;

/**
 * 卡项订单维权操作日志表
 * Class OrderLog
 * @package app\model\order
 */
class OrderRefundLog extends BaseModel
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
    protected $name = 'o2o_order_refund_log';

    public function getActionNameAttr($value, $data) {
        return OrderRefundLogDict::getLogAction($data['action']);
    }

    /**
     * 名称
     * @param $value
     * @param $data
     * @return mixed|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
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
