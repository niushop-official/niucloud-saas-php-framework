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

namespace app\adminapi\controller\addon;

use app\service\admin\addon\FrameworkPatchService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 框架补丁管理
 * Class FrameworkPatch
 * @description 框架补丁管理
 * @package app\adminapi\controller\addon
 */
class FrameworkPatch extends BaseAdminController
{

    /**
     * 补丁列表
     * @description 框架补丁分页列表（可按标题搜索、按是否解决筛选）
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'title', '' ],
            [ 'is_resolved', '' ]
        ]);
        return success(data: ( new FrameworkPatchService() )->getPage($data));
    }

    /**
     * 补丁详情
     * @description 框架补丁详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(data: ( new FrameworkPatchService() )->getInfo($id));
    }

    /**
     * 同步云端补丁
     * @description 立即拉取一次云端补丁（入库 + 新补丁推送消息）
     * @return Response
     */
    public function sync()
    {
        return success(data: ( new FrameworkPatchService() )->sync());
    }

    /**
     * 标记 / 取消标记已解决
     * @description 标记补丁是否已解决（仅作标记，不影响提示与展示）
     * @param int $id
     * @return Response
     */
    public function resolve(int $id)
    {
        $data = $this->request->params([
            [ 'is_resolved', 1 ]
        ]);
        ( new FrameworkPatchService() )->resolve($id, (int) $data[ 'is_resolved' ]);
        return success('MODIFY_SUCCESS');
    }
}
