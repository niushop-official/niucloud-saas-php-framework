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

use app\dict\site\SiteAccountLogDict;
use app\service\admin\site\SiteAccountLogService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 站点账户
 * Class SiteAccount
 * @description 站点账户
 * @package app\adminapi\controller\site
 */
class SiteAccount extends BaseAdminController
{
    /**
     * 账单列表
     * @description 账单列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['type', ''],
            ['trade_no', ''],
            ['create_time', []],
        ]);
        return success((new SiteAccountLogService())->getPage($data));
    }

    /**
     * 账单详情
     * @description 账单详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new SiteAccountLogService())->getInfo($id));
    }

    /**
     * 累计账单
     * @description 累计账单
     */
    public function stat()
    {
        return success((new SiteAccountLogService())->stat());
    }

    /**
     * 账单类型
     * @description 账单类型
     * @return Response
     */
    public function accountType()
    {
        return success(SiteAccountLogDict::getType());
    }
}
