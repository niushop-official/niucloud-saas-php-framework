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

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoDict;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoMemberDict;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoMember;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrder;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoAttrService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoService;
use app\dict\member\MemberAccountTypeDict;
use app\model\member\MemberAccountLog;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;


/**
 * 供应商服务层
 * Class FenxiaoService
 * @package addon\shop_fenxiao\app\service\admin
 */
class FenxiaoService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Fenxiao();
    }

    /**
     * 获取分销商列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'fenxiao_id,site_id,fenxiao_no,member_id,level_id,parent,status,create_time,fenxiao_order_num,fenxiao_total_order,fenxiao_commission,child_num,child_fenxiao_num';
        $order = 'fenxiao_id desc';
        $condition = [
            ['fenxiao.site_id', '=', $this->site_id]
        ];
        if (isset($where['keyword']) && $where['keyword'] != '') {
            $condition[] = ['member.member_no|member.username|member.nickname|member.mobile', 'like', '%' . $this->model->handelSpecialCharacter($where['keyword']) . '%'];
        }
        $search_model = $this->model->where($condition)->withSearch(['level_id', 'join_create_time' => 'create_time', 'join_status' => 'status'], $where)
            ->field($field)
            ->withJoin([
                'member' => ['member_id', 'username', 'nickname','headimg','mobile','commission','commission_get','commission_cash_outing'],
            ])
            ->with([
                'parentFenxiao' => function ($query) {
                    $query->withField('member_id, username,nickname');
                },
                'fenxiaoLevel' => function ($query) {
                    $query->withField('level_id, level_name');
                },
            ])
            ->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model, function($item){
            $item['child_ids'] = $this->model->where([['parent', '=', $item['member_id']]])->column('member_id');
        } );
        return $list;
    }

    /**
     * 分销商信息
     * @param int $member_id
     * @return array
     */
    public function getInfo(int $member_id)
    {
        $field = 'fenxiao_id, fenxiao_no, fenxiao.member_id, level_id, parent, fenxiao_order_num, fenxiao_total_order, `fenxiao_commission`, agent_commission, team_commission, task_commission, sale_commission, child_num, child_fenxiao_num, fenxiao.status, 
        fenxiao.create_time, lock_time';
        $info =  $this->model->where([['fenxiao.member_id', '=', $member_id]])->withJoin([
            'member' => ['member_id','username','nickname','headimg','mobile','commission','commission_get','commission_cash_outing'],
        ])->with([
            'parentFenxiao' => function ($query) {
                $query->withField('member_id, username, nickname, headimg, mobile');
            },
            'fenxiaoLevel' => function ($query) {
                $query->withField('level_id, level_name');
            },
        ])->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        $info['child_ids'] = $this->model->where([['parent', '=', $member_id]])->column('member_id');
        return $info;
    }

    /**
     * 冻结分销商
     * @param int $member_id
     * @return array
     */
    public function invalid(int $member_id)
    {
        $this->model->where([['member_id', '=', $member_id], ['site_id', '=', $this->site_id]])->update([
            'status' => FenxiaoDict::FREEZE
        ]);
        return true;
    }

    /**
     * 添加分销商
     * @param $data
     * @return void
     */
    public function add($data)
    {
        return (new CoreFenxiaoService())->add($this->site_id, $data['member_id'], [
                'level_id' => $data['level_id'],
                'parent' => $data['parent']
            ]
        );
    }

    /**
     * 编辑分销商
     * @param $data
     * @return void
     */
    public function edit($data, $id)
    {
        $fenxiao = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $id],
        ])->findOrEmpty();
        if ($fenxiao->isEmpty()) throw new AdminException('SHOP_FENXIAO_FENXIAO_NOT_EXIST');
        $update_data = [];
        if (!empty($data['parent'])) {
            if($data['parent'] == $id) throw new AdminException('SHOP_FENXIAO_NOT_ALLOW_SELF_TO_PARENT');

            $child_ids = $this->model->where([['parent', '=', $id]])->column('member_id');
            if(in_array($data['parent'], $child_ids)) throw new AdminException('SHOP_FENXIAO_NOT_ALLOW_CHILD');
            $update_data['parent'] = $data['parent'];
        }

        if (!empty($data['level_id'])) {
            $update_data['level_id'] = $data['level_id'];
        }

        if (!empty($data['status'])) {
            $update_data['status'] = $data['status'];
            if ($update_data['status'] == FenxiaoDict::FREEZE) {
                $update_data['lock_time'] = time();
            } else {
                $update_data['lock_time'] = 0;
            }

        }
        if (!empty($update_data)) {
            $this->model->where([['member_id', '=', $id]])->update($update_data);
            //更换上级分销商通知
            if ($fenxiao['parent'] != $data['parent']) {
                CoreFenxiaoAttrService::fenxiaoParentChange($this->site_id, $fenxiao['parent'], $data['parent']);
            }
        }
        return true;
    }


    /**
     * 团队信息
     * @param $data
     * @return array|int[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getTeamPage($id, $data)
    {
        $fenxiaoInfo = $this->model->where([['member_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        if (empty($fenxiaoInfo)) {
            throw new CommonException('SHOP_FENXIAO_FENXIAO_NOT_EXIST');
        }
        $member_id = $fenxiaoInfo['member_id'];
        $level = $data['fenxiao_level'];
        $fenxiaoMemberModel = new FenxiaoMember();
        if ($level == 1) {
            $search_model = $fenxiaoMemberModel->where([['pid', '=', $member_id]])->order('id desc');
            $list = $this->pageQuery($search_model);
        } else {

            $one_level = $fenxiaoMemberModel->where([['pid', '=', $member_id], ['is_fenxiao', '=', FenxiaoMemberDict::YES_FENXIAO]])->field('member_id')->select()->toArray();
            if (!empty($one_level)) {
                $fenxiao_member_ids = array_column($one_level, 'member_id');
                $search_model = $fenxiaoMemberModel->where([['pid', 'in', $fenxiao_member_ids]])->order('id desc');
                $list = $this->pageQuery($search_model);
            } else {
                $list = [
                    'total' => 0,
                    'per_page' => 10,
                    'current_page' => 1,
                    'last_page' => 0,
                    'data' => []
                ];
            }
        }
        return $list;
    }

    /**
     * 账户流水
     * @param $id
     * @param $data
     * @return array
     * @throws DbException
     */
    public function getAccountPage($member_id)
    {
        $member_account_log_model = new MemberAccountLog();
        $account = $member_account_log_model->where([
            ['member_id', '=', $member_id],
            ['site_id', '=', $this->site_id],
            ['account_type', '=', MemberAccountTypeDict::COMMISSION],
        ])->order('id desc')->append(['from_type_name']);
        $list = $this->pageQuery($account);
//        $order_ids = array_column($list['data'], 'related_id');
//        $order_list = (new Order())->where([
//            ['site_id', '=', $this->site_id],
//            ['order_id', 'in', $order_ids]
//        ])->with([
//            'member' => function($query){
//                $query->withField('nickname, mobile, headimg, username');
//            }
//        ])->select()->toArray();
//        $order_column = array_column($order_list, null, 'order_id');
//        foreach($list['data'] as &$v){
//            $v['shop_order'] = $order_column[$v['related_id']] ?? [];
//        }
        return $list;
    }

    /**
     * 分销订单信息
     * @param $id
     * @param $data
     * @return array
     * @throws DbException
     */
    public function getOrderPage($id, $data)
    {
        $fenxiaoInfo = $this->model->where([['member_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        if (empty($fenxiaoInfo)) {
            throw new CommonException('SHOP_FENXIAO_FENXIAO_NOT_EXIST');
        }
        $fenxiaoOrderModel = new FenxiaoOrder();
        $account = $fenxiaoOrderModel->where([['fenxiao_member_id1', '=', $fenxiaoInfo['member_id']]])->order('fenxiao_order_id desc');
        $list = $this->pageQuery($account);
        return $list;
    }

    /**
     *  查询分销商列表(用于弹框选择)
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getListOfSelect(array $where = [])
    {

        $field = 'site_id,fenxiao_no,member_id,level_id,status,create_time';
        $order = 'fenxiao_id desc';
        $condition = [
            ['fenxiao.site_id', '=', $this->site_id],
//            ['fenxiao.status', 'in', [FenxiaoDict::NORMAL, FenxiaoDict::FREEZE]],
        ];
        if (!empty($where['keyword'])) {
            $condition[] = ['member.member_no|member.username|member.nickname|member.mobile', 'like', '%' . $where['keyword'] . '%'];
        }
        if ($where['is_agent'] != 'all') {
            $condition[] = ['fenxiao.is_agent', '=', $where['is_agent']];
        }
        //不包括
        if (!empty($where['not_in'])) {
            $condition[] = ['fenxiao.member_id', 'not in', $where['not_in']];
        }
        $search_model = $this->model->where($condition)->withSearch(['parent_user_name,fenxiao_level,create_time,status,apply_status, is_agent'], $where)
            ->field($field)
            ->withJoin([

                'member' => ['member_id','username','nickname','headimg','mobile'],
//                'parentFenxiao' => function($query) {
//                    $query->withField('member_id, username,nickname');
//                },
            ])
            ->with([
                'fenxiaoLevel' => function ($query) {
                    $query->withField('level_id, level_name');
                },
            ])
            ->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 查询具备分销商的实例(专用)
     * @param $member_id
     * @return Fenxiao|array|mixed|Model
     */
    public function findWithFenxiao($member_id)
    {
        $fenxiao = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        if ($fenxiao->isEmpty()) throw new AdminException('SHOP_FENXIAO_NOT_FOUND_SELECT_FENXIAO');
//        if(!in_array($fenxiao['status'], [FenxiaoApplyDict::AUDIT, FenxiaoDict::FREEZE]) ) throw new AdminException('您选择的分销商尚未审核通过！');
        return $fenxiao;
    }
}
