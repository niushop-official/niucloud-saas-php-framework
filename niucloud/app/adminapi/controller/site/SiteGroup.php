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

namespace app\adminapi\controller\site;

use app\service\admin\site\SiteGroupService;
use core\base\BaseAdminController;
use Exception;
use think\Response;

/**
 * 站点分组
 * Class SiteGroup
 * @description 站点分组
 * @package app\adminapi\controller\site
 */
class SiteGroup extends BaseAdminController
{
    /**
     * 站点分组列表
     * @description 站点分组列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keywords', ''],
        ]);
        return success((new SiteGroupService())->getPage($data));
    }

    /**
     * 分组详情
     * @description 分组详情
     * @param int $group_id
     * @return Response
     */
    public function info(int $group_id)
    {
        return success((new SiteGroupService())->getInfo($group_id));
    }

    /**
     * 添加分组
     * @description 添加分组
     * @return Response
     * @throws Exception
     */
    public function add()
    {
        $data = $this->request->params([
            ['group_name', ''],
            ['group_desc', ''],
            ['app', []],
            ['addon', []],
        ]);
        $this->validate($data, 'app\validate\site\SiteGroup.add');
        $group_id = (new SiteGroupService())->add($data);
        return success('ADD_SUCCESS', ['group_id' => $group_id]);
    }

    /**
     * 编辑分组
     * @description 编辑分组
     * @param $group_id
     * @return Response
     */
    public function edit($group_id)
    {
        $data = $this->request->params([
            ['group_name', ''],
            ['group_desc', ''],
            ['app', []],
            ['addon', []],
        ]);
        (new SiteGroupService())->edit($group_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除分组
     * @description 删除分组
     * @param $group_id
     * @return Response
     */
    public function del($group_id)
    {
        (new SiteGroupService())->del($group_id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 所有分组
     * @description 所有分组
     * @return Response
     */
    public function all()
    {
        $data = $this->request->params([
            ['app', ''],
        ]);
        return success((new SiteGroupService())->getAll());
    }

    /**
     * 所有分组
     * @description 所有分组
     * @return Response
     */
    public function getUserSiteGroupAll()
    {
        $data = $this->request->params([
            ['uid', 0],
        ]);
        return success((new SiteGroupService())->getUserSiteGroupAll($data['uid']));
    }
}
