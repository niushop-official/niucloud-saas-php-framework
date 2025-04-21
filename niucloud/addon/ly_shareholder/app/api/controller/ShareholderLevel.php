<?php

namespace addon\ly_shareholder\app\api\controller;

use addon\ly_shareholder\app\service\api\ShareholderLevelService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 股东等级控制器
 * Class ShareholderLevel
 * @package addon\ly_shareholder\app\admin\controller
 */
class ShareholderLevel extends BaseAdminController
{
    /**
     * 获取股东等级列表
     * @return Response
     */
    public function lists()
    {

        return success((new ShareholderLevelService())->getList());
    }

    /**
     * 股东等级详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new ShareholderLevelService())->getInfo($id));
    }
}
