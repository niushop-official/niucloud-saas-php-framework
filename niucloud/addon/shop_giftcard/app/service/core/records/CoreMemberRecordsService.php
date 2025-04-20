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

namespace addon\shop_giftcard\app\service\core\records;

use addon\shop_giftcard\app\model\records\MemberRecords;
use core\base\BaseCoreService;


/**
 * 礼品卡会员领取记录服务层
 * Class CoreCardMemberRecordsService
 * @package addon\shop_giftcard\app\service\core\card
 */
class CoreMemberRecordsService extends BaseCoreService
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
    public function getPage($site_id, array $where = [], $field = 'member_card_id,card_id,from_member_id,member_id,to_member_id,is_give,source,get_time,give_time')
    {
        $order = 'get_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $site_id ] ])->withSearch([ "member_card_id", "card_id", "from_member_id", "member_id", "to_member_id", "is_give", "source", "get_time", "give_time" ], $where)->field($field)->order($order);
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
    public function getInfo($site_id, $member_card_id, $field = 'member_card_id,card_id,from_member_id,member_id,to_member_id,is_give,source,get_time,give_time')
    {
        $info = $this->model->field($field)->where([ [ 'site_id', "=", $site_id ], [ 'member_card_id', "=", $member_card_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡会员领取记录
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'get_time' ] = time();
        $res = $this->model->create($data);
        return $res->member_card_id;
    }

    /**
     * 修改礼品卡会员领取记录
     * @param $condition
     * @param $data
     * @return bool
     */
    public function edit($condition, $data)
    {
        $this->model->where($condition)->update($data);
        return true;
    }

}
