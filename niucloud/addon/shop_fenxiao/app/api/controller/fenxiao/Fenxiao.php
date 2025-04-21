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

use addon\shop_fenxiao\app\service\api\fenxiao\FenxiaoService;
use core\base\BaseApiController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

class Fenxiao extends BaseApiController
{

    /**
     * 分销商详情
     * @return Response
     */
    public function info()
    {
        return success((new FenxiaoService())->getInfo());
    }

    /**
     * 分销商详情
     * @return Response
     */
    public function detail()
    {
        return success((new FenxiaoService())->getDetail());
    }

    /**
     * 获取分销商账户信息
     */
    public function account()
    {
        return success((new FenxiaoService())->getAccount());
    }

    /**
     * 获取我的团队
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getTeam()
    {
        return success((new FenxiaoService())->getTeam());
    }

    /**
     * 我的下级分销商
     * @return void
     */
    public function getChildFenxiao()
    {
        return success((new FenxiaoService())->getChildFenxiao());
    }
}
