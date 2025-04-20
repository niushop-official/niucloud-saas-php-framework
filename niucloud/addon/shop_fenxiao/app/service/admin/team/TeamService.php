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


namespace addon\shop_fenxiao\app\service\admin\team;


use addon\shop\app\model\order\Order;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoService;
use app\model\member\Member;
use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 团队
 */
class TeamService extends BaseAdminService
{

    /**
     * 我的团队
     * @param $member_id
     * @param $type
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getTeam($member_id, $type = '')
    {
        $data = [
            'direct_ids' => [],
            'indirect_ids' => [],
        ];
        $temp_member_ids = [];
        $temp_indirect_member_ids = [];
        $core_fenxiao_service = new CoreFenxiaoService();
        //查询直属下级会员
        $child_member_list = $core_fenxiao_service->getChildMemberOfOne($this->site_id, $member_id);
        if (!empty($child_member_list)) {
            $child_member_ids = array_column($child_member_list, 'member_id');
            $temp_member_ids = array_merge($temp_member_ids, $child_member_ids);
            $data['direct_ids'] = $temp_member_ids;
        }
        //查询下级分销商
        $child_fenxiao_list = $core_fenxiao_service->getChildFenxiaoOfOne($this->site_id, $member_id);
        if (!empty($child_fenxiao_list)) {
            $child_fenxiao_column = array_column($child_fenxiao_list, null, 'member_id');
            $child_fenxiao_member_ids = array_column($child_fenxiao_list, 'member_id');
            //查询下级分销商的下级会员
            $indirect_child_member_list = $core_fenxiao_service->getIndirectChildMemberOfMany($this->site_id, $child_fenxiao_member_ids);
            if (!empty($indirect_child_member_list)) {
                $temp_indirect_member_ids = array_merge($temp_indirect_member_ids, array_column($indirect_child_member_list, 'member_id'));
            }
            //查询下级分销商的下级分销商
            $indirect_child_fenxiao_list = $core_fenxiao_service->getIndirectChildFenxiaoOfMany($this->site_id, $child_fenxiao_member_ids);
            if (!empty($indirect_child_fenxiao_list)) {
                $temp_indirect_member_ids = array_merge($temp_indirect_member_ids, array_column($indirect_child_fenxiao_list, 'member_id'));
                $indirect_child_fenxiao_column = array_column($indirect_child_fenxiao_list, null, 'member_id');
            }
            $temp_member_ids = array_merge($temp_member_ids, $child_fenxiao_member_ids);
            $data['direct_ids'] = $temp_member_ids;
            $data['indirect_ids'] = $temp_indirect_member_ids;
        }
        $condition = [
            ['site_id', '=', $this->site_id],
        ];
        if ($type) {
            if ($type == 'direct') {
                $condition[] = ['member_id', 'in', $data['direct_ids']];
                $child_fenxiao_column = $child_fenxiao_column ?? [];
            } else {
                $condition[] = ['member_id', 'in', $data['indirect_ids']];
                $child_fenxiao_column = $indirect_child_fenxiao_column ?? [];
            }
        } else {
            $temp_member_ids = array_merge($data['direct_ids'], $data['indirect_ids']);
            $condition[] = ['member_id', 'in', $temp_member_ids];
            $child_fenxiao_column = array_merge($child_fenxiao_column ?? [], $indirect_child_fenxiao_column ?? []);
        }
        $field = 'member_id, username, nickname, mobile, headimg';
        $search_model = (new Member())->where($condition)
            ->field($field);
        $member_list = $this->pageQuery($search_model, function ($item) use ($data, $child_fenxiao_column) {
            if (in_array($item['member_id'], $data['direct_ids'])) {
                $item['is_direct'] = 1;
            } else {
                $item['is_direct'] = 0;
            }
            $item['fenxiao'] = $child_fenxiao_column[$item['member_id']] ?? [];
        });

        $member_ids = array_column($member_list['data'], 'member_id');
        $order_list = (new Order())->where([['site_id', '=', $this->site_id], ['member_id', 'in', $member_ids], ['pay_time', '<>', 0]])->select();
        if (!$order_list->isEmpty()) {
            foreach ($member_list['data'] as &$member_v) {
                foreach ($order_list as $order_v) {
                    if ($order_v['member_id'] == $member_v['member_id']) {
                        $item_order_money_sum = $member_v['order_money_sum'] ?? 0;
                        $item_order_money_sum += round($order_v['order_money'], 2);
                        $member_v['order_money_sum'] = $item_order_money_sum;
                        $item_order_num = $member_v['order_num'] ?? 0;
                        $item_order_num += 1;
                        $member_v['order_num'] = $item_order_num;
                    }
                }
            }
        }
        return $member_list;
    }
}