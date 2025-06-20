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

use app\service\admin\site\UserLogService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 用户操作日志
 * Class UserLog
 * @description 用户操作日志
 * @package app\adminapi\controller\site
 */
class UserLog extends BaseAdminController
{
    /**
     * 操作日志列表
     * @description 操作日志列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['uid', 0],
            ['create_time', []],
            ['ip', ''],
            ['username', ''],
            ['type', ''],
            ['url', ''],
        ]);

        $list = (new UserLogService())->getPage($data);
        return success($list);

    }

    /**
     * 操作日志详情
     * @description 操作日志详情
     * @param $id
     * @return Response
     */
    public function info($id)
    {
        return success((new UserLogService())->getInfo($id));
    }

    /**
     * 清空日志
     * @description 清空日志
     * @return Response
     */
    public function destroy()
    {
        (new UserLogService())->destroy();
        return success("SUCCESS");
    }

}
