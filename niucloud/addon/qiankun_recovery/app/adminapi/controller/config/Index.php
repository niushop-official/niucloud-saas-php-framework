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

namespace addon\qiankun_recovery\app\adminapi\controller\config;

use addon\qiankun_recovery\app\service\ConfigService;
use core\base\BaseAdminController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

class Index extends BaseAdminController
{
    /**
     * Hello World
     * @return Response
     */
    public function index(): Response
    {
        $config = (new ConfigService())->get();
        return success('SUCCESS', $config);
    }

    /**
     * Hello World
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function save(): Response
    {
        $data = $this->request->post();
        $id = (new ConfigService())->add($data);
        return success('SUCCESS', ['id' => $id]);
    }

}
