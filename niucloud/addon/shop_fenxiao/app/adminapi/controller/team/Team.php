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

namespace addon\shop_fenxiao\app\adminapi\controller\team;

use addon\shop_fenxiao\app\service\admin\team\TeamService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 团队分红
 */
class Team extends BaseAdminController
{

    /**
     * 获取团队分红列表
     * @return Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ['create_time', []],
        ]);
        return success((new TeamService())->getPage($data));
    }

    /**
     * 团队分红详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new TeamService())->getInfo($id));
    }

}
