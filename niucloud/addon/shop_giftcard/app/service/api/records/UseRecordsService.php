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

namespace addon\shop_giftcard\app\service\api\records;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGoods;
use addon\shop_giftcard\app\model\records\MemberRecords;
use addon\shop_giftcard\app\model\records\useRecords;
use addon\shop_giftcard\app\service\api\card\CardGoodsService;
use addon\shop_giftcard\app\service\api\card\CardService;
use addon\shop_giftcard\app\service\core\card\CoreMemberCardBagService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use addon\shop_giftcard\app\service\core\records\CoreUseRecordsService;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseApiService;
use core\exception\ApiException;
use think\facade\Db;


/**
 * 礼品卡使用记录服务层
 * Class useRecordsService
 * @package addon\shop_giftcard\app\service\api\records
 */
class UseRecordsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new useRecords();
    }

    /**
     * 储值卡使用
     * @param array $data
     * @return true
     */
    public function balanceCardUse(array $data)
    {
        $card_id = $data[ 'card_id' ];

        $member_records_where = [
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'card_id', '=', $card_id ],
            [ 'is_give', '=', 0 ]
        ];
        $member_records = ( new MemberRecords() )->field('member_card_id')->where($member_records_where)->findOrEmpty()->toArray();
        if (empty($member_records)) throw new ApiException('CARD_NOT_FOUND');

        $card = ( new Card() )->field('giftcard_id,balance,status,validity_time,card_bag_id')->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ], [ 'card_id', "=", $card_id ] ])
            ->with([ 'giftcard' ])->findOrEmpty()->toArray();
        if (empty($card)) throw new ApiException('CARD_NOT_FOUND');
        if ($card[ 'status' ] != CardDict::TO_USE) throw new ApiException('CARD_CANNOT_USE');
        $validity_time = $card['validity_time'] == 0 ? 0 : strtotime($card['validity_time']);
        if ($validity_time > 0 && $validity_time < time()) throw new ApiException('CARD_HAS_EXPIRE');//礼品卡已过期

        if (empty($card[ 'giftcard' ])) throw new ApiException('CARD_NOT_FOUND');
        if ($card[ 'giftcard' ][ 'status' ] == GiftcardDict::OFF) throw new ApiException('GIFTCARD_HAS_DOWN');
        if ($card[ 'giftcard' ][ 'card_right_type' ] != GiftcardDict::cardRightTypeBalance) throw new ApiException('CARD_RIGHT_TYPE_ERROR');

        //礼品卡权益id
        $card_goods_info = ( new CardGoods() )->field('id,goods_name')->where([ [ 'site_id', '=', $this->site_id ], [ 'card_id', "=", $card_id ] ])->findOrEmpty()->toArray();

        Db::startTrans();
        try {
            // 变更用户余额
            ( new CoreMemberAccountService() )->addLog($this->site_id, $this->member_id, MemberAccountTypeDict::BALANCE, $card[ 'balance' ], 'shop_giftcard_use_balance', '使用礼品卡充值', $card_id);//添加使用记录

            // 变更卡状态
            ( new CardService() )->editStatus($card_id, [ 'status' => CardDict::USED ]);

            // 变更使用次数
            ( new CardService() )->editUseNum($card_id, [ 'use_num' => 1 ]);

            // 更新提货次数
            ( new CardGoodsService() )->editUseNum($card_id, 0, [ 'use_num' => 1 ]);

            // 更新卡包剩余数量
            ( new CoreMemberCardBagService() )->editCount($this->site_id, $this->member_id, $card[ 'card_bag_id' ], [ 'to_use_count' => -1, 'used_count' => 1 ]);

            // 更新使用记录
            $records_data = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'member_card_id' => $member_records[ 'member_card_id' ],
                'giftcard_id' => $card[ 'giftcard_id' ],
                'card_id' => $card_id
            ];
            $records_id = $this->addRecords($records_data);

            //更新使用记录权益
            $records_goods_data = [
                'records_id' => $records_id,
                'site_id' => $this->site_id,
                'card_id' => $card_id,
                'card_goods_id' => $card_goods_info[ 'id' ],
                'goods_name' => $card_goods_info[ 'goods_name' ],
                'balance' => $card[ 'balance' ],
                'use_num' => 1,
                'create_time' => time()
            ];
            ( new UseRecordsGoodsService() )->addRecordsGoods($records_goods_data);

            //增加日志
            $log_data = [
                'giftcard_id' => $card[ 'giftcard_id' ],
                'card_id' => $card_id,
                'member_id' => $this->member_id,
                'site_id' => $this->site_id,
                'type' => GiftcardLogDict::CARD_USE_ACTION,
                'remark' => '使用礼品卡储值余额' . $card[ 'balance' ] . '元'
            ];
            ( new CoreGiftcardLogService() )->add($log_data, 'member');

            //礼品卡使用数量更新
            ( new CoreGiftcardService() )->updateUseCount($this->site_id, $card[ 'giftcard_id' ], 1);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new ApiException($e->getMessage());
        }
    }

    /**
     * 兑换卡使用
     * @param array $data
     * @return array
     */
    public function goodsCardUse(array $data)
    {
        return ( new CoreUseRecordsService() )->goodsCardUseCheck($this->site_id, $data);
    }

    /**
     * 添加使用记录
     * @param array $data
     * @return mixed
     */
    public function addRecords(array $data)
    {
        return ( new CoreUseRecordsService() )->add($data);
    }

}
