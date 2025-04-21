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

namespace addon\shop_fenxiao\app\service\admin\fenxiao;

use addon\shop\app\model\order\Order;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoApply;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoApplyService;
use core\base\BaseAdminService;


/**
 * 分销商申请服务层
 */
class FenxiaoApplyService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoApply();
    }

    /**
     * 获取分销商申请列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'apply_id,site_id,member_id,status,create_time,audit_time, refuse_reason';
        $order = 'apply_id desc';
        $condition = [
            ['fenxiao_apply.site_id', '=', $this->site_id]
        ];
        if (!empty($where['keyword'])) {
            $condition[] = ['member.member_no|member.username|member.nickname|member.mobile', 'like', '%' . $where['keyword'] . '%'];
        }
        $search_model = $this->model->where($condition)->withSearch(['join_create_time' => 'create_time', 'audit_time', 'join_status' => 'status'], $where)
            ->field($field)
            ->withJoin([
                'member' => ['member_id', 'username', 'nickname', 'headimg', 'mobile'],
            ])
            ->with([
                'fenxiao_member' => function ($query) {
                    $query->withField('member_id, is_fenxiao, fenxiao_member_id');
                },
            ])
            ->append(['status_name'])
            ->order($order);
        $fenxiao_model = new Fenxiao();
        $list = $this->pageQuery($search_model, function ($item) use($fenxiao_model) {
            $item->order_money_sum = 0;
            $item->order_num = 0;
            //如果是分销商就显示分销商的上级,如果是会员就显示上级分销商
            $fenxiao_member = $item['fenxiao_member'] ?? [];
            $is_fenxiao = $fenxiao_member['is_fenxiao'] ?? 0;
            $fenxiao_member_id = $fenxiao_member['fenxiao_member_id'] ?? 0;
            if ($is_fenxiao == 1) {
                $item_fenxiao = $fenxiao_model->where([['site_id', '=', $this->site_id], ['member_id', '=', $item['member_id']]])->findOrEmpty();
                $item->parent_fenxiao = $fenxiao_model->where([['site_id', '=', $this->site_id], ['member_id', '=', $item_fenxiao['parent']]])
                    ->with(
                        [
                            'member' => function ($query) {
                                $query->withField('member_id, username, nickname, headimg, mobile');
                            }
                        ]
                    )->findOrEmpty()['member'] ?? [];
            } else {
                $item->parent_fenxiao = (new Fenxiao())->where([['site_id', '=', $this->site_id], ['member_id', '=', $fenxiao_member_id]])
                    ->with([
                            'member' => function ($query) {
                                $query->withField('member_id, username, nickname, headimg, mobile');
                            }
                        ]
                    )->findOrEmpty()['member'] ?? [];
            }
        });
        if (!empty($list['data'])) {
            $member_ids = array_column($list['data'], 'member_id');
            $order_list = (new Order())->where([['site_id', '=', $this->site_id], ['member_id', 'in', $member_ids], ['pay_time', '<>', 0]])->select();
            if (!$order_list->isEmpty()) {
                foreach ($list['data'] as &$member_v) {
                    foreach ($order_list as $order_v) {
                        if ($order_v['member_id'] == $member_v['member_id']) {
                            $member_v['order_money_sum'] += round($order_v['order_money'], 2);
                            $member_v['order_num'] += 1;
                        }
                    }
                }
            }
        }
        return $list;
    }

    /**
     * 分销商信息
     * @param int $apply_id
     * @return array
     */
    public function getInfo(int $apply_id)
    {
        $field = 'apply_id, site_id, member_id, status, refuse_reason, create_time, audit_time';
        $info = $this->model->where([['apply_id', '=', $apply_id]])->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 审核
     * @param $apply_id
     * @return true
     */
    public function agree($apply_id)
    {
        (new CoreFenxiaoApplyService())->agree($this->site_id, $apply_id);
        return true;
    }

    /**
     * 拒绝
     * @param $apply_id
     * @param $data
     * @return true
     */
    public function refuse($apply_id, $data)
    {
        (new CoreFenxiaoApplyService())->refuse($this->site_id, $apply_id, $data);
        return true;
    }
}
