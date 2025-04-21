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

namespace addon\shop_fenxiao\app\service\admin\agent;

use addon\shop_fenxiao\app\dict\agent\AgentDict;
use addon\shop_fenxiao\app\model\agent\AgentLevel;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\service\admin\fenxiao\FenxiaoService;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 代理商
 */
class AgentService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Fenxiao();
    }

    /**
     * 获取代理商列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'site_id, member_id,agent_level,agent_status,agent_time, agent_money, is_agent,agent_commission';
        $order = 'agent_time desc';
        $condition = array(
            ['fenxiao.site_id', '=', $this->site_id],
//            ['fenxiao.agent_status', '=', [AgentDict::NORMAL]],
            ['fenxiao.is_agent', '=', 1]
        );
        if (isset($where['keyword']) && $where['keyword'] != '') {
            $condition[] = ['member.member_no|member.nickname|member.username|member.mobile', 'like', '%' . $this->model->handelSpecialCharacter($where['keyword']) . '%'];
        }
        $search_model = $this->model->where($condition)
            ->withSearch(['agent_level', 'agent_time', 'agent_status'], $where)
            ->field($field)
            ->withJoin([
                'member' => ['username','nickname','headimg','mobile'],
            ])
            ->with([
                'agentLevel' => function ($query) {
                    $query->field('name, level_id');
                },
            ])
            ->order($order)->append(['agent_status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 分销商信息
     * @param int $fenxiao_id
     * @return array
     */
    public function getInfo(int $member_id)
    {
        $field = 'fenxiao_id, site_id, fenxiao_no, member_id, level_id, parent, fenxiao_order_num, fenxiao_total_order_money, `fenxiao_commission`, child_num, child_fenxiao_num, apply_status, refuse_reason, status, 
        create_time, audit_time, lock_time';
        $info = $this->model->where([['member_id', '=', $member_id]])->with([
            'member' => function ($query) {
                $query->withField('member_id, username. headimg, mobile');
            },
        ])->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加代理商
     * @param $member_id
     * @param $data
     * @return true
     */
    public function add($member_id, $data)
    {
        $level = (new AgentLevel())->findOrEmpty($data['agent_level']);
        if ($level->isEmpty()) throw new AdminException('SHOP_FENXIAO_NOT_FOUND_AGENT_LEVEL');
        $fenxiao = (new FenxiaoService())->findWithFenxiao($member_id);
        if ($fenxiao['is_agent'] == 1) throw new AdminException('SHOP_FENXIAO_ALREADY_AGENT');
        $update_data = [
            'is_agent' => 1,
            'agent_level' => $data['agent_level'],
            'agent_time' => time(),
            'agent_money' => $level['money'],
            'agent_status' => AgentDict::NORMAL
        ];
        $fenxiao->save($update_data);
        return true;
    }

    /**
     * 编辑代理
     * @param $member_id
     * @param $data
     * @return true
     */
    public function edit($member_id, $data)
    {
        $level = (new AgentLevel())->findOrEmpty($data['agent_level']);
        if ($level->isEmpty()) throw new AdminException('SHOP_FENXIAO_NOT_FOUND_AGENT_LEVEL');
        $update_data = [
            'agent_level' => $data['agent_level'],
            'agent_money' => $level['money'],
//            'agent_status' => $data['status']
        ];
        $this->model->where([['member_id', '=', $member_id], ['is_agent', '=', 1]])->update($update_data);
        return true;
    }

    /**
     * 设置代理商状态
     * @param $member_id
     * @param $status
     * @return void
     */
    public function modifyStatus($member_id, $status)
    {
        $this->model->where([['member_id', '=', $member_id], ['is_agent', '=', 1]])->update(['agent_status' => $status]);
        return true;
    }

}
