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

use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGive;
use addon\shop_giftcard\app\model\records\MemberRecords;
use core\base\BaseJob;

/**
 * 礼品卡赠送到期
 */
class CardGiveExpire extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $card_give_model = new CardGive();
            $member_records_model = new MemberRecords();
            $give_ids = $card_give_model->whereBetweenTime('validity_time', 1, time())->column('give_id');
            //过滤已领取过礼品卡的赠送记录
            for ($i = 0; $i < count($give_ids); $i++) {
                $count = $member_records_model->where([ [ 'give_id', '=', $give_ids[$i] ] ])->count();
                if ($count > 0) {
                    unset($give_ids[$i]);
                }
            }
            $give_ids = array_values($give_ids);
            $card_give_model->where([ [ 'give_id', 'in', $give_ids ] ])->delete();

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
