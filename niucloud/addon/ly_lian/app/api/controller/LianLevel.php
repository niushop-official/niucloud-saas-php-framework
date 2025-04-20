<?php

namespace addon\ly_lian\app\api\controller;

use addon\ly_lian\app\service\api\LianLevelService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 链动会员等级控制器
 * Class FenxiaoLevel
 * @package addon\ly_lian\app\admin\controller\fenxiao
 */
class LianLevel extends BaseAdminController
{
    /**
     * 获取链动会员等级列表
     * @return Response
     */
    public function lists()
    {

        return success((new LianLevelService())->getList());
    }

    /**
     * 链动会员等级详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new LianLevelService())->getInfo($id));
    }
}
