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

namespace addon\shop_fenxiao\app\adminapi\controller\fenxiao;


use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoApplyDict;
use addon\shop_fenxiao\app\service\admin\fenxiao\FenxiaoApplyService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 分销商控制器
 * Class Fenxiao
 * @package addon\shop_fenxiao\app\adminapi\controller
 */
class FenxiaoApply extends BaseAdminController
{
    /**
     * 获取分销商申请列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['create_time', []],
            ['status', ''],
        ]);
        return success((new FenxiaoApplyService())->getPage($data));
    }

    /**
     * 分销商申请详情
     * @param int $id
     * @return Response
     */
    public function info(int $apply_id)
    {
        return success((new FenxiaoApplyService())->getInfo($apply_id));
    }

    /**
     * 审核
     * @param int $apply_id
     * @return void
     */
    public function agree(int $apply_id)
    {
        (new FenxiaoApplyService())->agree($apply_id);
        return success();
    }

    /**
     * 拒绝
     * @param int $apply_id
     * @return Response
     */
    public function refuse(int $apply_id)
    {
        $data = $this->request->params([
            ['refuse_reason', ''],
        ]);
        (new FenxiaoApplyService())->refuse($apply_id, $data);
        return success();
    }

    /**
     * 获取状态
     * @return Response
     */
    public function getStatus()
    {
        return success(FenxiaoApplyDict::getStatus());
    }
}
