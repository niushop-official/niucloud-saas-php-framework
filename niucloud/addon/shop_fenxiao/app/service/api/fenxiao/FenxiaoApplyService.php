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

namespace addon\shop_fenxiao\app\service\api\fenxiao;

use addon\shop_fenxiao\app\model\fenxiao\FenxiaoApply;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoApplyService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;
use core\base\BaseApiService;
use core\exception\ApiException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 *  分销商申请
 */
class FenxiaoApplyService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoApply();
    }

    /**
     * 申请分销商
     */
    public function applyFenxiao()
    {
        (new CoreFenxiaoApplyService())->apply($this->site_id, $this->member_id);
        return true;
    }

    /**
     * 获取分销商申请条件
     * @return array|bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getCheckFenxiaoApply()
    {
        //获取分销商申请条件
        return (new CoreFenxiaoMemberService())->checkFenxiaoApply($this->site_id, $this->member_id);
    }

    /**
     * 检测分销商申请条件
     * @return bool|int
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function checkFenxiaoApply()
    {
        //检测分销商申请条件
        $fenxiao_config = (new CoreFenxiaoConfigService())->getFenxiaoConfig($this->site_id);
        if ($fenxiao_config['is_fenxiao'] == 0) throw new ApiException("SHOP_FENXIAO_NOT_OPEN");
        if ($fenxiao_config['apply_type'] == 3) throw new ApiException("SHOP_FENXIAO_NOT_OPEN_APPLY");
        return (new CoreFenxiaoMemberService())->checkFenxiaoApply($this->site_id, $this->member_id);
    }

    /**
     * 获取当前会员申请分销商信息
     * @return array
     */
    public function getApplyInfo()
    {
        return $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->field("*")->findOrEmpty()->toArray();
    }
}
