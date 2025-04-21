<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\api\controller;

use addon\tourism\app\service\api\TouristService;
use core\base\BaseApiController;

/**
 * 游客信息控制器
 * Class GoodsController
 * @package app\adminapi\controller\goods
 */
class Tourist extends BaseApiController
{
    public function lists() {
        return success('SUCCESS', (new TouristService())->getList());
    }

    public function detail(int $id) {
        return success('SUCCESS', (new TouristService())->getDetail($id));
    }

    /**
     * 添加
     * @return \think\Response
     */
    public function add() {
        $data = $this->request->params([
            ['name', ''],
            ['id_card', ''],
            ['mobile', '']
        ]);
        $this->validate($data, 'addon\tourism\app\validate\Tourist.add');
        return success('SUCCESS', (new TouristService())->add($data));
    }

    /**
     * 添加
     * @return \think\Response
     */
    public function edit(int $id) {
        $data = $this->request->params([
            ['name', ''],
            ['id_card', ''],
            ['mobile', '']
        ]);
        $this->validate($data, 'addon\tourism\app\validate\Tourist.edit');
        return success('SUCCESS', (new TouristService())->edit($id, $data));
    }

    /**
     * 添加
     * @return \think\Response
     */
    public function del(int $id) {
        return success('SUCCESS', (new TouristService())->del($id));
    }
}