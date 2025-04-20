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

namespace addon\shop_fenxiao\app\adminapi\controller\agent;

use addon\shop_fenxiao\app\dict\agent\AgentDict;
use addon\shop_fenxiao\app\service\admin\agent\AgentService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 代理商
 */
class Agent extends BaseAdminController
{

    /**
     * 获取代理商列表
     * @return Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ['agent_time', []],
            ['keyword', ''],
            ['agent_status', ''],
            ['agent_level', '']
        ]);
        return success((new AgentService())->getPage($data));
    }

    /**
     * 代理商详情
     * @param int $member_id
     * @return Response
     */
    public function info(int $member_id)
    {
        return success((new AgentService())->getInfo($member_id));
    }

    /**
     * 添加
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['member_id', 0],
            ['agent_level', 0],
        ]);
        $this->validate($data, 'addon\shop_fenxiao\app\validate\agent\Agent.add');
        return success('ADD_SUCCESS', (new AgentService())->add($data['member_id'], $data));
    }

    /**
     * 修改
     * @param int $member_id
     * @return Response
     */
    public function edit(int $member_id)
    {
        $data = $this->request->params([
            ['agent_level', 0],
//            ['status', AgentDict::NORMAL]
        ]);
        $this->validate($data, 'addon\shop_fenxiao\app\validate\agent\Agent.edit');
        //验证状态合法性
        return success('SUCCESS', (new AgentService())->edit($member_id, $data));
    }

    /**
     * 修改代理商状态
     * @param int $member_id
     * @param int $status
     * @return Response
     */
    public function modifyStatus(int $member_id, int $status)
    {
        //验证状态合法性
        return success('SUCCESS', (new AgentService())->modifyStatus($member_id, $status));
    }

    /**
     * 查询代理商状态
     * @return Response
     */
    public function getStatus()
    {
        return success(AgentDict::getStatus());
    }

}
