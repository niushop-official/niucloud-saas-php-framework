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
namespace addon\shop_giftcard\app\job\card;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\service\core\card\CoreCardService;
use core\base\BaseJob;

/**
 * 礼品卡到期
 */
class CardExpire extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $ids = ( new Card() )
                ->where([[ 'status', 'in', [CardDict::TO_USE, CardDict::CAN_USE] ]])
                ->whereBetweenTime('validity_time', 1, time())//查询有效期<=当前时间且>=1的，0 表示永久有效，要排除掉
                ->column('card_id');
            if (!empty($ids)) {
                // 过期
                ( new CoreCardService() )->expire($ids);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
