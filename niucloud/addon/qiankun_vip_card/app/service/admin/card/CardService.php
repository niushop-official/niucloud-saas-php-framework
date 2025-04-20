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

namespace addon\qiankun_vip_card\app\service\admin\card;

use addon\qiankun_vip_card\app\model\card\Card;
use app\model\member\MemberLevel;
use app\model\member\Member;
use addon\tk_vip\app\model\order\Order;

use core\base\BaseAdminService;
use think\db\exception\DbException;
use think\exception\ValidateException;


/**
 * 会员卡密服务层
 * Class CardService
 * @package addon\qiankun_vip_card\app\service\admin\card
 */
class CardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Card();
    }

    /**
     * 获取会员卡密列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,level_id,member_id,order_id,card_no,card_pwd,use_member,use_time,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])->withSearch(["id", "level_id", "member_id", "card_no", "use_time", "create_time"], $where)->with(['memberLevel', 'member', 'useMemberInfo'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    public function getMemberLevelAll()
    {
        $memberLevelModel = new MemberLevel();
        return $memberLevelModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

    public function getMemberAll()
    {
        $memberModel = new Member();
        return $memberModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

    public function getOrderAll()
    {
        $orderModel = new Order();
        return $orderModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

    /**
     * @param $length
     * @param $cardType
     * @param $filed
     * @return string
     * @throws DbException
     */
    public function getRandomString($length, $cardType, $filed): string
    {
        $str = '';
        if ($cardType == 'number') {
            while (strlen($str) < $length) {
                $str .= mt_rand(0, 9);
            }
        } else if ($cardType == 'letter') {
            // A-Z
            while (strlen($str) < $length) {
                $str .= chr(mt_rand(65, 90));
            }
        }
        if ($this->model->where([['site_id', '=', $this->site_id], [$filed, '=', $str]])->count()) {
            return $this->getRandomString($length, $cardType, $filed);
        }

        return $str;
    }

    /**
     * @param $memberId
     * @param $siteId
     * @param $levelId
     * @param $number
     * @param $cardType
     * @param int $length
     * @return void
     * @throws DbException
     */
    public function giveMemberCard($order_info, $levelId, $number, $cardType, int $length = 0): void
    {
        $cardList = [];
        for ($i = 0; $i < $number; $i++) {
            $cardList[] = [
                'site_id'    => $order_info['site_id'],
                'level_id'   => $levelId,
                'order_id'   => $order_info['id'],
                'member_id'  => $order_info['member_id'],
                'card_no'    => $this->getRandomString($length > 0 ? $length : 8, $cardType, 'card_no'),
                'card_pwd'   => $this->getRandomString($length > 0 ? $length : 8, $cardType, 'card_pwd'),
                'use_member' => 0,
                'use_time'   => 0,
            ];
        }
        $this->model->saveAll($cardList);
    }

    public function exchange($cardNo, $cardPwd, $memberId)
    {
        $card = $this->model->where(['site_id' => $this->site_id, 'card_no' => $cardNo, 'card_pwd' => $cardPwd])->findOrEmpty();
        if ($card->isEmpty()) throw new ValidateException('卡密不存在');
        if ($card['use_member'] > 0) throw new ValidateException('卡密已被使用');
        $member = app()->make(Member::class)->where('member_id', $memberId)->findOrEmpty();
        if ($member->isEmpty()) throw new ValidateException('会员不存在');
        if ($card['member_id'] == $memberId) throw new ValidateException('不允许使用自己的卡密');

        $this->model->transaction(function () use ($card, $memberId, $member) {
            $card->use_member = $memberId;
            $card->use_time = time();
            $card->save();

            $member->member_level = $card['level_id'];
            $member->save();
        });
    }
}
