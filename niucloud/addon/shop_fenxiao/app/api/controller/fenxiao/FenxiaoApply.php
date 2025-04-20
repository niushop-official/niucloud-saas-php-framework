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

use addon\shop_fenxiao\app\service\api\fenxiao\FenxiaoApplyService;
use core\base\BaseApiController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

class FenxiaoApply extends BaseApiController
{
    /**
     * 检测会员是否满足分销商条件
     * @return bool|int
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function checkFenxiaoApply()
    {
        return success('SUCCESS', (new FenxiaoApplyService())->checkFenxiaoApply());
    }

    /**
     * 获取分销商的申请条件
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getCheckFenxiaoApply()
    {
        return success('SUCCESS', (new FenxiaoApplyService())->getCheckFenxiaoApply());
    }

    /**
     * 获取申请分销信息
     * @return array
     */
    public function info()
    {
        return success((new FenxiaoApplyService())->getApplyInfo());
    }

    /**
     * 申请分销
     * @return Response
     */
    public function apply()
    {
        (new FenxiaoApplyService())->applyFenxiao();
        return success('SUCCESS');
    }
}
