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
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\records\MemberRecords;
use app\model\member\Member;
use core\base\BaseApiService;
use core\exception\ApiException;
use think\db\Query;


/**
 * 礼品卡会员领取记录服务层
 * Class MemberRecordsService
 * @package addon\shop_giftcard\app\service\api\records
 */
class MemberRecordsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberRecords();
    }

    /**
     * 获取礼品卡会员领取记录列表
     * @param $site_id
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'member_card_id,card_id,from_member_id,member_id,to_member_id,is_give,source,get_time,give_time';
        $order = 'get_time desc';

        $search_model = $this->model->where([
            [ 'site_id', "=", $this->site_id ]
        ])->withSearch([ "member_card_id", "card_id", "from_member_id", "member_id", "to_member_id", "is_give", "source", "get_time", "give_time" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡会员领取记录信息
     * @param $site_id
     * @param int $member_card_id
     * @param string $field
     * @return mixed
     */
    public function getInfo($member_card_id, $field = 'member_card_id,card_id,from_member_id,member_id,to_member_id,is_give,source,get_time,give_time')
    {
        $info = $this->model->field($field)->where([ [ 'site_id', "=", $this->site_id ], [ 'member_card_id', "=", $member_card_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 送出的礼品卡分页列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getGivePage(array $where = [])
    {
        $field = 'member_card_id, card_id, to_member_id, give_time';
        $order = 'give_time desc';

        $search_model = $this->model->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'is_give', '=', 1 ]
        ])->field($field)->order($order)->with([ 'giveMember' ]);
        $list = $this->pageQuery($search_model);

        $card_model = new Card();
        foreach ($list[ 'data' ] as $k => $v) {
            // 查询卡信息
            $field = 'card_id, giftcard_id, card_no,card_cover,balance';
            $list[ 'data' ][ $k ][ 'card_info' ] = $card_model->field($field)->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'card_id', "=", $v[ 'card_id' ] ]
            ])->with([ 'giftcard' ])->findOrEmpty()->toArray();
        }

        return $list;
    }

    /**
     * 送出的礼品卡详情
     * @param $member_card_id
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getGiveDetail($member_card_id)
    {
        $field = 'member_card_id,give_id, card_id, to_member_id, give_time';

        $info = $this->model->field($field)->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'member_card_id', "=", $member_card_id ] ])->with([ 'give', 'giveMember' ])->findOrEmpty()->toArray();

        if (empty($info)) {
            throw new ApiException('CARD_NOT_FOUND');
        }

        $card_model = new Card();
        // 查询卡信息
        $field = 'card_id, giftcard_id, card_no,card_cover,balance';
        $info[ 'card_info' ] = $card_model->field($field)->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'card_id', "=", $info[ 'card_id' ] ]
        ])->with([ 'giftcard' ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 收到的礼品卡分页列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getReceivePages(array $where = [])
    {

        $card_model = new Card();

        $field = 'card_id,giftcard_id,source,card_no,card_cover,balance,status,validity_time,total_num,use_num,create_time,use_time,activate_time,invalid_time';
        $order = 'get_time desc';

        $record_where = [
            [ 'recordInfo.site_id', "=", $this->site_id ],
            [ 'recordInfo.member_id', '=', $this->member_id ],
            [ 'recordInfo.source', '=', CardDict::GIVE ],
            [ 'is_give', '=', 0 ]
        ];
        $search_model = $card_model->where([
            [ 'card.site_id', "=", $this->site_id ],
            [ 'card.member_id', '=', $this->member_id ],
            [ 'card.source', '=', CardDict::GIVE ]
        ])->withSearch([ 'status' ], $where)->field($field)
            ->withJoin([
                'recordInfo' => function(Query $query) use ($record_where) {
                    $query->where($record_where);
                }
            ], 'left')
            ->with([ 'giftcard', 'cardGoods' ])
            ->append([ 'source_name', 'status_name' ])
            ->order($order);
        $list = $this->pageQuery($search_model);

        foreach ($list[ 'data' ] as $k => $v) {
            $member_info = (new Member())->where([
                [ 'site_id', "=", $this->site_id ],
                [ 'member_id', '=', $v[ 'recordInfo' ][ 'from_member_id'] ],
            ])->field('member_id,nickname,headimg')->findOrEmpty()->toArray();
            $v[ 'recordInfo' ]['fromMember'] = $member_info;
            $list[ 'data' ][ $k ][ 'record_info' ] = $v[ 'recordInfo' ];
        }

        return $list;
    }

}
