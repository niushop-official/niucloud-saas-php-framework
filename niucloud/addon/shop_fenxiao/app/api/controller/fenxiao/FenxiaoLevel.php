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

namespace addon\shop_fenxiao\app\api\controller\fenxiao;

use addon\shop_fenxiao\app\service\api\fenxiao\FenxiaoLevelService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 分销等级控制器
 * Class FenxiaoLevel
 * @package addon\shop_fenxiao\app\admin\controller\fenxiao
 */
class FenxiaoLevel extends BaseAdminController
{
    /**
     * 获取分销等级列表
     * @return Response
     */
    public function lists()
    {
        return success((new FenxiaoLevelService())->getList());
    }

    /**
     * 分销等级详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new FenxiaoLevelService())->getInfo($id));
    }
}
