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

namespace app\adminapi\controller\stat;

use app\service\admin\stat\AddonPanelService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 插件运营面板
 * Class AddonPanel
 * @description 平台端插件运营统计
 * @package app\adminapi\controller\stat
 */
class AddonPanel extends BaseAdminController
{
    /**
     * 插件卡片列表
     * @description 插件卡片列表及顶部汇总
     * @return Response
     */
    public function index()
    {
        return success((new AddonPanelService())->getList());
    }

    /**
     * 插件统计详情
     * @description 单个插件的运营统计
     * @param string $key
     * @return Response
     */
    public function detail(string $key)
    {
        $params = $this->request->params([
            ['days', 7],
        ]);
        return success((new AddonPanelService())->getDetail($key, (int)$params['days']));
    }

    /**
     * 插件关联站点列表
     * @description 即将到期站点与站点使用排行
     * @param string $key
     * @return Response
     */
    public function sites(string $key)
    {
        return success((new AddonPanelService())->getSites($key));
    }
}
