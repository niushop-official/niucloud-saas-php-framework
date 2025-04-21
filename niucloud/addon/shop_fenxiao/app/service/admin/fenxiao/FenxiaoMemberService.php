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
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoMember;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;
use core\base\BaseAdminService;
use think\db\exception\DbException;


/**
 * 分销会员关系服务层
 */
class FenxiaoMemberService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoMember();
    }

    /**
     * 获取分销商列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'member_id,site_id, pid, fenxiao_member_id, is_fenxiao, bind_time';
        $order = 'fenxiao_member.create_time desc';
        $condition = [
            ['fenxiao_member.site_id', '=', $this->site_id]
        ];
        if (isset($where['keyword']) && $where['keyword'] != '') {
            $condition[] = ['member.member_no|member.username|member.nickname|member.mobile', 'like', '%' . $this->model->handelSpecialCharacter($where['keyword']) . '%'];
        }
        //是否是分销商
        if (!empty($where['is_fenxiao']) && $where['is_fenxiao'] != 'all') {
            $condition[] = ['is_fenxiao', '=', $where['is_fenxiao']];
        }
        $search_model = $this->model->where($condition)
            ->field($field)
            ->withJoin([
                'member' => ['member_id','username','nickname','headimg','mobile'],
            ])
            ->order($order);
        $fenxiao_model = new Fenxiao();
        $list = $this->pageQuery($search_model, function ($item) use($fenxiao_model){
            $item->order_money_sum = 0;
            $item->order_num = 0;
            //如果是分销商就显示分销商的上级,如果是会员就显示上级分销商
            $is_fenxiao = $item['is_fenxiao'] ?? 0;
            $child_ids = [];
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
                $child_ids = $fenxiao_model->where([['parent', '=', $item['member_id']]])->column('member_id');
            } else {
                $item->parent_fenxiao = (new Fenxiao())->where([['site_id', '=', $this->site_id], ['member_id', '=', $item['fenxiao_member_id']]])
                    ->with([
                                'member' => function ($query) {
                                        $query->withField('member_id, username, nickname, headimg, mobile');
                                }
                            ]
                    )->findOrEmpty()['member'] ?? [];
            }
            $item['child_ids'] = $child_ids;
        });
        if ($list['total'] > 0) {
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
     * 更换会员绑定的分销商
     * @param array $data
     * @return true|null
     */
    public function modifyBindFenxiao(array $data)
    {
        return (new CoreFenxiaoMemberService())->modifyBindFenxiao($this->site_id, $data['member_id'], $data['fenxiao_member_id']);
    }

    /**
     *  查询分销商列表(用于弹框选择)
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getMemberListOfSelect(array $where = [])
    {

        $field = 'site_id,member_id,pid,fenxiao_member_id,is_fenxiao, bind_time';
        $order = 'bind_time desc';
        $condition = [
            ['fenxiao_member.site_id', '=', $this->site_id],
            ['fenxiao_member.is_fenxiao', '=', 0],
        ];
        if (!empty($where['keyword'])) {
            $condition[] = ['member.member_no|member.username|member.nickname|member.mobile', 'like', '%' . $where['keyword'] . '%'];
        }
        //不包括
        if (!empty($where['not_in'])) {
            $condition[] = ['fenxiao_member.member_id', 'not in', $where['not_in']];
        }
        $search_model = $this->model->where($condition)
            ->field($field)
            ->withJoin([
                'member' => ['username','nickname','headimg','mobile'],
            ])
            ->with([
                'bindFenxiaoMember' => function ($query) {
                    $query->withField('member_id, username,nickname, headimg, mobile');
                },

            ])
            ->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

}
