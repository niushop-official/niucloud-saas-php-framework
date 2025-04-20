<?php

namespace addon\ly_lian\app\validate;

use core\base\BaseValidate;
/**
 * 链动2+1奖励验证器
 * Class LianReward
 * @package addon\ly_lian\app\validate
 */
class LianReward extends BaseValidate
{

       protected $rule = [
            'member_id' => 'require',
            'level_id' => 'require',
            'buy_mid' => 'require'
        ];

       protected $message = [
            'member_id.require' => ['common_validate.require', ['member_id']],
            'level_id.require' => ['common_validate.require', ['level_id']],
            'buy_mid.require' => ['common_validate.require', ['buy_mid']]
        ];

       protected $scene = [
            "add" => ['member_id', 'level_id', 'buy_mid', 'order_id', 'order_goods_id', 'settle_cycle', 'settle_amount', 'give_rate', 'give_amount', 'frozen_rate', 'frozen_amount', 'reward_type'],
            "edit" => ['member_id', 'level_id', 'buy_mid', 'order_id', 'order_goods_id', 'settle_cycle', 'settle_amount', 'give_rate', 'give_amount', 'frozen_rate', 'frozen_amount', 'reward_type', 'thaw_status', 'status']
        ];

}