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

namespace addon\shop_fenxiao\app\dict\task;

/**
 * 任务
 */
class TaskDict
{

    const LOOP = 1;
    const STEP = 2;
    /**
     * 任务类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getType($type = ''){
        $list = [
            self::LOOP => get_lang('dict_shop_fenxiao_task_type.loop'),
            self::STEP => get_lang('dict_shop_fenxiao_task_type.step'),
        ];
        if (!$type) return $list;
        return $list[$type] ?? '';
    }

    //活动状态（待开始）
    const TO_BEGIN = 1;
    //活动状态（进行中）
    const NORMAL = 2;
    //活动状态（完成）
    const FINISH = 3;

    /**
     * 状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = ''){
        $list = [
            self::TO_BEGIN => get_lang('dict_shop_fenxiao_task.to_begin'),
            self::NORMAL => get_lang('dict_shop_fenxiao_task.normal'),
            self::FINISH => get_lang('dict_shop_fenxiao_task.finish'),
        ];
        if (!$status) return $list;
        return $list[$status] ?? '';
    }

    const SEND_TIME_FINISH = 1;//任务完成
    const SEND_TIME_ACTIVITY_FINISH = 2;//活动结束

    /**
     * 奖励发放时间
     * @param $status
     * @return array|mixed|string
     */
    public static function getSendTimeType($status = ''){
        $list = [
            self::SEND_TIME_FINISH => get_lang('dict_shop_fenxiao_send_time_type.finish'),
            self::SEND_TIME_ACTIVITY_FINISH => get_lang('dict_shop_fenxiao_send_time_type.activity_finish'),
        ];
        if (!$status) return $list;
        return $list[$status] ?? '';
    }



    const ALL_LEVEL = 1;
    const PART_LEVEL = 2;
    /**
     * 参与等级
     * @param $type
     * @return array|mixed|string
     */
    public static function getLevelType($type = ''){
        $list = [
            self::ALL_LEVEL => get_lang('dict_shop_fenxiao_task_level_type.all_level'),
            self::PART_LEVEL => get_lang('dict_shop_fenxiao_task_level_type.part_level'),
        ];
        if (!$type) return $list;
        return $list[$type] ?? '';
    }

    const CONDITION_ORDER_NUM = 'order_num';//销售量
    const CONDITION_ORDER_MONEY = 'order_money';//销售额
    const CONDITION_CHILD_NUM = 'child_num';//推广人数
    /**
     * 参与指标条件
     * @param $type
     * @return array|mixed|string
     */
    public static function getConditionType($type = ''){
        $list = [
            self::CONDITION_ORDER_NUM => get_lang('dict_shop_fenxiao_task_condition_type.order_num'),
            self::CONDITION_ORDER_MONEY => get_lang('dict_shop_fenxiao_task_condition_type.order_money'),
            self::CONDITION_CHILD_NUM => get_lang('dict_shop_fenxiao_task_condition_type.child_num'),
        ];
        if (!$type) return $list;
        return $list[$type] ?? '';
    }

}
