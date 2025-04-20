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

namespace addon\shop_giftcard\app\service\admin\card;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\giftcard\GiftcardLog;
use addon\shop_giftcard\app\model\records\MemberRecords;
use addon\shop_giftcard\app\model\records\useRecords;
use addon\shop_giftcard\app\service\core\card\CoreCardService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 礼品卡获取服务层
 * Class CardService
 * @package addon\shop_giftcard\app\service\admin\card
 */
class CardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Card();
    }

    /**
     * 获取礼品卡获取列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'card_id,giftcard_id,source,card_no,card_key,card_cover,balance,card_make_id,status,member_id,validity_time,total_num,use_num,create_time,use_time,activate_time,invalid_time';
        $order = 'card_id desc';
        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "card_id", "giftcard_id", "source", "card_no", "status" ], $where)->field($field)
            ->append([ 'source_name', 'status_name' ])
            ->with([ 'member' ])
            ->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡获取详情
     * @param int $card_id
     * @return array
     */
    public function getDetail($card_id)
    {
        $field = 'card_id,giftcard_id,source,card_no,card_key,card_cover,balance,card_make_id,status,member_id,validity_time,total_num,use_num,create_time,use_time,activate_time,invalid_time';
        $card_info = $this->model->field($field)->where([ [ 'site_id', '=', $this->site_id ], [ 'card_id', "=", $card_id ] ])
            ->append([ 'source_name', 'status_name' ])
            ->with([ 'giftcard', 'member', 'cardGoods' ])
            ->findOrEmpty()->toArray();
        if (!empty($card_info)) {
            // 查询礼品卡使用记录
            $use_records_list = (new useRecords())->where([ [ 'site_id', '=', $this->site_id ], [ 'card_id', "=", $card_id ] ])
                ->with([ 'recordsGoods', 'member' ])->order('record_id desc')->select()->toArray();

            $card_info[ 'use_records_list' ] = $use_records_list;

            // 查询礼品卡领取记录
            $card_info[ 'member_records_log' ] = $this->getMemberRecordsLog($card_id);

            // 查询礼品卡日志
            $giftcard_log = (new GiftcardLog())->where([ [ 'site_id', '=', $this->site_id ], [ 'card_id', "=", $card_id ] ])
                ->append([ 'type_name' ])->order('create_time desc')->select()->toArray();

            $card_info[ 'giftcard_log' ] = $giftcard_log;

            return $card_info;
        } else {
            throw new AdminException('CARD_NOT_FOUND');
        }
    }

    /**
     * 查询礼品卡领取记录
     * @param int $card_id
     * @return array
     */
    public function getMemberRecordsLog($card_id)
    {
        $member_records_log = [];
        $member_records_list = (new MemberRecords())->where([ [ 'site_id', '=', $this->site_id ], [ 'card_id', "=", $card_id ] ])
            ->append([ 'member', 'fromMember', 'giveMember' ])->select()->toArray();
        foreach ($member_records_list as $item) {
            $from_member_nickname = $item['fromMember'] ? $item['fromMember']['nickname'] : '';
            $give_member_nickname = $item['giveMember'] ? $item['giveMember']['nickname'] : '';
            $member_nickname = $item['member'] ? $item['member']['nickname'] : '';

            switch ($item['source']) {
                case CardDict::ORDER:
                    $member_records_log[] = [
                        'id' => $item['member_card_id'],
                        'time' => $item['get_time'],
                        'nickname' => $member_nickname,
                        'content' => '通过购买获取了礼品卡'
                    ];
                    break;
                case CardDict::GIVE:
                    $member_records_log[] = [
                        'id' => $item['member_card_id'],
                        'time' => $item['get_time'],
                        'nickname' => $member_nickname,
                        'content' => '领取了' . $from_member_nickname . '赠送的礼品卡'
                    ];
                    break;
                case CardDict::ACTIVATE:
                    $member_records_log[] = [
                        'id' => $item['member_card_id'],
                        'time' => $item['get_time'],
                        'nickname' => $member_nickname,
                        'content' => '通过卡密激活获取了礼品卡'
                    ];
                    break;
            }

            if ($item['give_time'] && $item['is_give']) {
                $member_records_log[] = [
                    'id' => $item['member_card_id'],
                    'time' => $item['give_time'],
                    'nickname' => $member_nickname,
                    'content' => '将礼品卡赠送给了' . $give_member_nickname
                ];
            }
        }
        array_multisort(array_column($member_records_log, "time"), SORT_DESC, array_column($member_records_log, "id"), SORT_DESC, $member_records_log);
        return $member_records_log;
    }

    /**
     * 实体礼品卡 制作卡密
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function makeCard(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreCardService() )->makeCard($data);
    }

    /**
     * 删除礼品卡获取
     * @param int $id
     * @return bool
     */
    public function del($id)
    {
        $model = $this->model->where([ [ 'card_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        //增加日志
        $log_data = [
            'giftcard_id' => $model[ 'giftcard_id' ],
            'card_id' => $model[ 'card_id' ],
            'member_id' => $this->uid,
            'site_id' => $this->site_id,
            'type' => GiftcardLogDict::CARD_DELETE_ACTION,
            'remark' => '删除了该礼品卡'
        ];
        ( new CoreGiftcardLogService() )->add($log_data, 'user');
        return $res;
    }

    /**
     * 获取卡的来源列表
     * @return array|mixed
     */
    public function getSourceList()
    {
        return ( new CoreCardService() )->getSourceList();
    }

    /**
     * 获取卡的状态
     * @param string $card_type
     * @return array|mixed
     */
    public function getStatusListByType($card_type = '')
    {
        return ( new CoreCardService() )->getStatusListByType($card_type);
    }

}
