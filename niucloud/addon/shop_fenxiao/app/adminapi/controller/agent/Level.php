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

use addon\shop_fenxiao\app\service\admin\agent\AgentLevelService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 代理商等级
 */
class Level extends BaseAdminController
{

    /**
     * 获取代理商等级列表
     * @return Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['name', '']
        ]);
        return success((new AgentLevelService())->getPage($data));
    }

    /**
     * 代理商等级详情
     * @param int $id
     * @return Response
     */
    public function info(int $level_id)
    {
        return success((new AgentLevelService())->getInfo($level_id));
    }

    /**
     * 代理商等级列表
     * @return Response
     */
    public function getList()
    {
        return success((new AgentLevelService())->getList());
    }

    /**
     * 添加
     * @param int $id
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['name', ''],
            ['money', 0],
            ['discount', 0],
        ]);
        $this->validate($data, 'addon\shop_fenxiao\app\validate\agent\AgentLevel.add');
        (new AgentLevelService())->add($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 修改
     * @param int $id
     * @return Response
     */
    public function edit(int $level_id)
    {
        $data = $this->request->params([
            ['name', ''],
            ['money', 0],
            ['discount', 0],
        ]);
        $this->validate($data, 'addon\shop_fenxiao\app\validate\agent\AgentLevel.edit');
        (new AgentLevelService())->edit($level_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除代理商等级
     * @param int $level_id
     * @return Response
     */
    public function del(int $level_id)
    {
        (new AgentLevelService())->del($level_id);
        return success('DEL_SUCCESS');
    }
}
