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

namespace addon\shop\app\service\core\marketing;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\dict\active\NewcomerDict;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\active\Active;
use addon\shop\app\model\newcomer\NewcomerRecords;
use addon\shop\app\model\order\Order;
use app\model\member\Member;
use core\base\BaseCoreService;

/**
 * 新人专享服务层
 * Class DiscountService
 * @package addon\shop\app\service\api\marketing
 */
class CoreNewcomerService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Active();
    }

    /**
     * 获取新人专享配置
     * @param $site_id
     * @return array
     */
    public function getConfig($site_id)
    {
        $info = $this->model->field('active_id,active_status,active_value,active_desc')->where([ [ 'site_id', '=', $site_id ], [ 'active_class', '=', ActiveDict::NEWCOMER_DISCOUNT ] ])->findOrEmpty()->toArray();
        $value = [
            'active_id' => $info[ 'active_id' ] ?? 0,
            'active_status' => $info[ 'active_status' ] ?? 'close',
            'validity_type' => $info[ 'active_value' ][ 'validity_type' ] ?? 'day',
            'validity_day' => $info[ 'active_value' ][ 'validity_day' ] ?? 3,
            'validity_time' => date('Y-m-d H:i:s', $info[ 'active_value' ][ 'validity_time' ] ?? time() + 86400 * 3),
            'participation_way' => $info[ 'active_value' ][ 'participation_way' ] ?? 'never_order',
            'appoint_time' => date('Y-m-d H:i:s', $info[ 'active_value' ][ 'appoint_time' ] ?? time()),
            'limit_num' => $info[ 'active_value' ][ 'limit_num' ] ?? 1,
            'banner_list' => $info[ 'active_value' ][ 'banner_list' ] ?? [
                    [
                        'imageUrl' => 'addon/shop/newcomer/banner.jpg',
                        'toLink' => [
                            'name' => '',
                        ]
                    ]
                ]
        ];

        $default_active_desc = "1、新人价是面向" . $this->getParticipationWayContent($value[ 'participation_way' ]) . "提供的一种专属优惠价格，同一账号仅限享受一次优惠；\n";
        $default_active_desc .= "2、仅限" . $this->getParticipationWayText($value[ 'participation_way' ], $value[ 'appoint_time' ]) . "可参与；\n";
        $default_active_desc .= "3、活动有效期：" . $this->getValidityTypeText($value[ 'validity_type' ], $value[ 'validity_day' ], $value[ 'validity_time' ]);

        $value[ 'active_desc' ] = $info[ 'active_desc' ] ?? $default_active_desc;
        return $value;
    }

    /**
     * 获取参与门槛文字描述
     * @param $participation_way
     * @return string
     */
    public function getParticipationWayContent($participation_way)
    {
        switch ($participation_way) {
            case NewcomerDict::NEVER_ORDER:
                return '从未下过单的会员';
            case NewcomerDict::ASSIGN_TIME_ORDER:
                return '指定时间内未下过单的会员';
            case NewcomerDict::ASSIGN_TIME_REGISTER:
                return '指定时间内注册的会员';
            default:
                return '';
        }
    }

    /**
     * 获取参与门槛文字描述
     * @param $participation_way
     * @param $appoint_time
     * @return string
     */
    public function getParticipationWayText($participation_way, $appoint_time)
    {
        switch ($participation_way) {
            case NewcomerDict::NEVER_ORDER:
                return '从未下过单的会员';
            case NewcomerDict::ASSIGN_TIME_ORDER:
                return $appoint_time . '之前未下过单的会员';
            case NewcomerDict::ASSIGN_TIME_REGISTER:
                return $appoint_time . '之后注册的会员';
            default:
                return '';
        }
    }

    /**
     * 获取有效期文字描述
     * @param $validity_type
     * @param $validity_day
     * @param $validity_time
     * @return string
     */
    public function getValidityTypeText($validity_type, $validity_day, $validity_time)
    {
        switch ($validity_type) {
            case NewcomerDict::DAY:
                return '参与活动后' . $validity_day . '天内。';
            case NewcomerDict::DATE:
                return $validity_time . '后截止。';
            default:
                return '';
        }
    }

    /**
     * 检测当前会员是否满足新人专享活动条件
     * @param $site_id
     * @param $member_id
     * @return bool
     */
    public function checkIfNewcomer($site_id, $member_id)
    {
        $is_newcomer = false;
        $config = $this->getConfig($site_id);
        if (!empty($config)) {
            if ($config[ 'active_status' ] == ActiveDict::ACTIVE) {
                $appoint_time = strtotime($config[ 'appoint_time' ]);

                $order_model = new Order();
                $order_where = [
                    [ 'site_id', '=', $site_id ],
                    [ 'member_id', '=', $member_id ],
                    [ 'status', 'in', [ OrderDict::WAIT_PAY, OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE, OrderDict::FINISH ] ]
                ];
                switch ($config[ 'participation_way' ]) {
                    case NewcomerDict::NEVER_ORDER:
                        $order_count = $order_model->where($order_where)->count();
                        if ($order_count == 0) $is_newcomer = true;
                        break;
                    case NewcomerDict::ASSIGN_TIME_ORDER:
                        $order_where[] = [ 'create_time', '<', $appoint_time ];
                        $order_count = $order_model->where($order_where)->count();
                        if ($order_count == 0) $is_newcomer = true;
                        break;
                    case NewcomerDict::ASSIGN_TIME_REGISTER:
                        $member_info = ( new Member() )->field('create_time')->where([
                            [ 'site_id', '=', $site_id ],
                            [ 'member_id', '=', $member_id ] ])
                            ->findOrEmpty()->toArray();
                        if (!empty($member_info) && strtotime($member_info[ 'create_time' ]) >= $appoint_time) $is_newcomer = true;
                        break;
                }

                if ($is_newcomer) {
                    $newcomer_records_model = new NewcomerRecords();
                    $newcomerRecords = $newcomer_records_model->field('validity_time,is_join')->where([
                        [ 'site_id', '=', $site_id ],
                        [ 'member_id', '=', $member_id ]
                    ])->findOrEmpty()->toArray();
                    if (empty($newcomerRecords)) {
                        $validity_time = $this->getNewcomerEndTime($config);
                        $newcomer_records_model->create([
                            'site_id' => $site_id,
                            'member_id' => $member_id,
                            'validity_time' => $validity_time
                        ]);
                    } else {
                        if ($newcomerRecords[ 'validity_time' ] < time() || $newcomerRecords[ 'is_join' ] == 1) {
                            $is_newcomer = false;
                        }
                    }
                }

            }
        }
        return $is_newcomer;
    }

    /**
     * 获取新人专享倒计时结束时间
     * @param $site_id
     * @param $member_id
     * @param $config
     * @return int
     */
    public function getNewcomerEndTime($config)
    {
        $end_time = 0;
        switch ($config[ 'validity_type' ]) {
            case NewcomerDict::DAY:
                $validity_day = $config[ 'validity_day' ];
                $end_time = time() + $validity_day * 86400;
                break;
            case NewcomerDict::DATE:
                $validity_time = strtotime($config[ 'validity_time' ]);
                $end_time = $validity_time;
                break;
        }
        return $end_time;
    }

    /**
     * 新人专享活动修改后更新会员活动有效期
     * @param $site_id
     * @return bool
     */
    public function afterSave($site_id)
    {
        $config = $this->getConfig($site_id);
        ( new NewcomerRecords() )->where([
            [ 'site_id', '=', $site_id ],
            [ 'is_join', '=', 0 ],
            [ 'order_id', '=', 0 ]
        ])->update(
            [
                'validity_time' => $this->getNewcomerEndTime($config),
                'update_time' => time()
            ]
        );
        return true;
    }

}
