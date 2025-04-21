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

namespace addon\shop\app\dict\active;

class ManjianDict
{
    //条件类型
    const OVER_N_YUAN = 'over_n_yuan';//满N元
    const OVER_N_PIECE = 'over_n_piece';//满N件

    //参与商品
    const ALL_GOODS = 'all_goods';  //全部商品参与
    const SELECTED_GOODS = 'selected_goods';  //指定商品参与
    const SELECTED_GOODS_NOT = 'selected_goods_not';  //指定商品不参与

    //参与会员类型
    const ALL_MEMBER = 'all_member';  //所有会员参与
    const SELECTED_MEMBER_LEVEL = 'selected_member_level';  //指定会员等级
    const SELECTED_MEMBER_LABEL = 'selected_member_label';  //指定会员标签

    //优惠规则
    const LADDER = 'ladder';  //阶梯优惠
    const CYCLE = 'cycle';  //循环优惠

    //状态
    //未开始
    const NOT_ACTIVE = 0;

    //进行中
    const ACTIVE = 1;

    //已结束
    const END = 2;

    //已关闭
    const CLOSE = -1;

    /**
     * 条件类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getConditionType($type = '')
    {
        $list = [
            self::OVER_N_YUAN => get_lang('dict_shop_manjian_condition_type.over_n_yuan'),
            self::OVER_N_PIECE => get_lang('dict_shop_manjian_condition_type.over_n_piece'),
        ];
        if ($type == '') return $list;
        return $list[ $type ] ?? '';
    }

    /**
     * 参与类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getGoodsType($type = '')
    {
        $list = [
            self::ALL_GOODS => get_lang('dict_shop_manjian_goods_type.all_goods'),
            self::SELECTED_GOODS => get_lang('dict_shop_manjian_goods_type.selected_goods'),
            self::SELECTED_GOODS_NOT => get_lang('dict_shop_manjian_goods_type.selected_goods_not'),
        ];
        if ($type == '') return $list;
        return $list[ $type ] ?? '';
    }

    /**
     * 参与会员类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getJoinMemberType($type = '')
    {
        $list = [
            self::ALL_MEMBER => get_lang('dict_shop_manjian_join_member_type.all_member'),
            self::SELECTED_MEMBER_LEVEL => get_lang('dict_shop_manjian_join_member_type.selected_member_level'),
            self::SELECTED_MEMBER_LABEL => get_lang('dict_shop_manjian_join_member_type.selected_member_label'),
        ];
        if ($type == '') return $list;
        return $list[ $type ] ?? '';
    }

    /**
     * 优惠规格
     * @param $type
     * @return array|mixed|string
     */
    public static function getRuleType($type = '')
    {
        $list = [
            self::LADDER => get_lang('dict_shop_manjian_rule_type.ladder'),
            self::CYCLE => get_lang('dict_shop_manjian_rule_type.cycle'),
        ];
        if ($type == '') return $list;
        return $list[ $type ] ?? '';
    }

    /**
     * 状态
     * @param $type
     * @return array|mixed|string
     */
    public static function getStatus($type = '')
    {
        $data = [
            self::NOT_ACTIVE => get_lang('dict_shop_manjian_status.not_active'), // 未开始
            self::ACTIVE => get_lang('dict_shop_manjian_status.active'), // 进行中
            self::END => get_lang('dict_shop_manjian_status.end'), // 已结束
            self::CLOSE => get_lang('dict_shop_manjian_status.close'), // 已关闭
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

}
