<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\model\AreaAgent;
use app\model\member\Member;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DbException;
use think\Model;


/**
 * 区域代理服务层
 * Class AgentService
 * @package app\service\admin\area
 */
class AreaAgentService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new AreaAgent();
    }

    /**
     * 获取区域代理列表                    需要增加代理区域低级代理人数统计，代理所属区域订单金额统计（根据成为代理的时间进行统计），后期增加代理单独后台管理
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';
        $order = 'agent_id desc';

        $condition = [ [ 'ly_area_agent.site_id' ,"=", $this->site_id ] ];
        if(!empty($where['search'])){
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }
        if(!empty($where['full_area'])){
            $condition[] = ['full_area', 'like', '%'. $where['full_area'] . '%'];
        }

        $search_model = $this->model->where($condition)->withSearch([ 'agent_at', 'agent_level', 'level_id', 'status','full_area'], $where)
            ->field($field)
            // ->withJoin([
            //     'member' => ['member_id', 'username', 'nickname', 'headimg', 'mobile'],
            // ])
            ->with([
                'member' => function ($query) {
                    $query->withField('member_id,username,nickname,headimg,mobile');
                },
                'agentLevel' =>  function ($query) {
                    $query->withField('level_id,level_area,level_name');
                },
                'hasLevel' =>  function ($query){
                    $query->withField('level_id,level_area,level_name');
                }
            ])
            ->order($order);

        $list = $this->pageQuery($search_model);

        // $order_data = (new Order())->where('site_id', $this->site_id)->order('order_id desc')->findOrEmpty();
        // (new CoreAreaRewardService())->handleReward($this->site_id, $order_data);

        // (new \addon\ly_area\app\service\api\AreaAgentService())->getAgentInfo(1, $this->site_id);

        return $list;
    }

    /**
     * 获取区域代理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'agent_id,site_id,member_id,level_id,province_id,city_id,district_id,street_id,full_area,status,agent_level,rate,agent_at,area_count_money,settle_count_money,already_settle_money,unsettled_money,create_time,update_time,delete_time';

        $info = $this->model->field($field)->where([['agent_id', "=", $id]])
            ->withJoin([
                'member' => ['member_id', 'username', 'nickname', 'headimg', 'mobile'],
            ])
            ->with([
                'agentLevel' => function ($query) {
                    $query->withField('level_id,level_area,level_name');
                },
                'hasLevel' => function ($query){
                    $query->withField('level_id,level_area,level_name');
                }
            ])
            ->findOrEmpty()->toArray();

        return $info;
    }

    /**
     * 添加区域代理
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;

        event('AddAreaAgentBefore', $data);//创建代理之前进行检测，是否可以代理多 个区域
        $res = $this->model->create($data);
        return $res->agent_id;

    }

    /**
     * 区域代理编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['agent_id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除区域代理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['agent_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }


    public function getAgentByMemberId($site_id, int $member_id){
        return $this->model->where([['site_id', '=', $site_id],['member_id', '=', $member_id]])->findOrEmpty();
    }


    /**
     * 查询会员列表(用于弹框选择)
     * 
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getMemberListOfSelect(array $where = []){
        $member_model = new Member();
        $field = 'site_id,member_id,username,nickname,headimg,mobile';
        $order = 'member_id desc';
        $condition = [
            'member.site_id' => $this->site_id,
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        //不包括
        if (!empty($where['not_in'])) {
            $condition[] = ['member.member_id', 'not in', $where['not_in']];
        }

        $member_list = $member_model->field($field)->where($condition)->order($order)->select()->toArray();

        $selectList = [];
        foreach ($member_list as $member) {
            $selectList[] = [
                'label' => $member['username'] ?? $member['nickname'] , 
                'value' => $member['member_id']
            ];
        }

        // return $selectList;

        $search_model = $member_model->alias('member')
            ->where($condition)
            ->field($field)
            // ->join('ly_shareholder', 'ly_shareholder.member_id = member.member_id')
            ->order($order)
            ->append(['status_name']);
 
        
        $list = $this->pageQuery($search_model);
        return ['code' => 1, 'msg' => 'success', 'data' => $list];
    }
    
}