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

namespace addon\o2o\app\dict;

/**
 * 评价相关字典类
 * Class EvaluateDict
 */
class EvaluateDict
{
    // 评价相关状态
    // 待评价
    const WAIT_EVALUATE = 'wait_evaluate';
    // 已评价
    const EVALUATE_COMPLETED = 'wait_completed';


    //评价审核状态
    // 待审核
    const WAIT = '1';
    // 通过
    const PASS = '2';
    // 拒绝
    const REFUSE = '3';

    /**
     * 获取订单评价状态
     * @param string $status
     * @return array|array[]
     */
    public static function getRefundStatus(string $status = '')
    {
        $data = [
            self::WAIT_EVALUATE => [
                'name' => get_lang('dict_evaluate.wait_evaluate'),
                'status' => self::WAIT_EVALUATE
            ],
            self::EVALUATE_COMPLETED => [
                'name' => get_lang('dict_evaluate.wait_completed'),
                'status' => self::EVALUATE_COMPLETED
            ]
        ];

        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? [];
    }

    /**
     * 获取评价审核状态
     * @param string $status
     * @return array|array[]
     */
    public static function getAuditStatus(string $status = '')
    {
        $data = [
            self::WAIT => [
                'name' => get_lang('dict_evaluate.wait'),
                'status' => self::WAIT
            ],
            self::PASS => [
                'name' => get_lang('dict_evaluate.pass'),
                'status' => self::PASS
            ],
            self::REFUSE => [
                'name' => get_lang('dict_evaluate.refuse'),
                'status' => self::REFUSE
            ]
        ];

        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? [];
    }

}