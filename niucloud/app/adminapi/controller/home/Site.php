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

namespace app\adminapi\controller\home;

use app\service\admin\home\AuthSiteService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 站点管理
 * Class Site
 * @description 站点管理
 * @package app\adminapi\controller\home
 */
class Site extends BaseAdminController
{
    /**
     * 站点列表
     * @description 站点列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keywords', ''],
            ['status', ''],
            ['app', ''],
            ['sort', ''],
        ]);
        return success((new AuthSiteService())->getSitePage($data));
    }

    /**
     * 站点详情
     * @description 站点详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new AuthSiteService())->getSiteInfo($id));
    }

    /**
     * 站点更新
     * @description 站点更新
     */
    public function edit($id)
    {
        $data = $this->request->params([
            ['site_name', ''],
            ['logo', ''],
            ['keywords', ''],
            ['desc', ''],
            //地址
//            ['latitude', ''],
//            ['longitude', ''],
//            ['province_id', 0],
//            ['city_id', 0],
//            ['district_id', 0],
//            ['address', ''],
//            ['full_address', ''],
//
            ['phone', ''],
//
//            ['business_hours', ''],
//            ['front_end_name', ''],
//            ['front_end_logo', ''],
//            ['icon', '']
        ]);
        $this->validate($data, 'app\validate\site\Site.edit');
        (new AuthSiteService())->editSite($id, $data);

        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取站点分组列表
     * @description 站点分组列表
     * @return Response
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getSiteGroup() {
        return success((new AuthSiteService())->getSiteGroup());
    }

    /**
     * 获取站点分组应用列表
     * @description 站点分组应用列表
     * @return Response
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getSiteGroupAppList() {
        return success((new AuthSiteService())->getSiteGroupAppList());
    }

    /**
     * 创建站点
     * @description 创建站点
     * @return Response
     */
    public function create() {
        $data = $this->request->params([
            ['site_name', ''],
            ['group_id', 0]
        ]);
        return success((new AuthSiteService())->createSite($data));
    }
}
