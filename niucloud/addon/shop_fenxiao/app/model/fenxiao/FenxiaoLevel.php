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

namespace addon\shop_fenxiao\app\model\fenxiao;

use core\base\BaseModel;

/**
 * 分销等级
 */
class FenxiaoLevel extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'level_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_level';


    /**
     * 等级升级说明
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getLevelTextAttr($value, $data)
    {
        $condition = [];
        if($data['upgrade_type'] == 1) {
            $condition['text'] = '或';
        }else{
            $condition['text'] = '且';
        }
        $list = [];

        if($data['fenxiao_order_num'] > 0) {
            $list[] = '一级分销订单总数大于等于'.$data['fenxiao_order_num'];
        }
        if($data['fenxiao_commission'] > 0) {
            $list[] = '一级分销订单佣金总额大于等于'.$data['fenxiao_commission'];
        }
        if($data['fenxiao_order_money'] > 0) {
            $list[] = '一级分销订单总额大于等于'.$data['fenxiao_order_money'];
        }
        if($data['order_num'] > 0) {
            $list[] = '自购订单总数大于等于'.$data['order_num'];
        }
        if($data['order_money'] > 0) {
            $list[] = '自购订单总额大于等于'.$data['order_money'];
        }
        if($data['child_num'] > 0) {
            $list[] = '下线人数大于等于'.$data['child_num'];
        }
        if($data['child_fenxiao_num'] > 0) {
            $list[] = '下线分销商人数大于等于'.$data['child_fenxiao_num'];
        }
        $condition['list'] = $list;
        return $condition;

    }
}
