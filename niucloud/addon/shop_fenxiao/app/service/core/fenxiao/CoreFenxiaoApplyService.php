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

namespace addon\shop_fenxiao\app\service\core\fenxiao;

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoApplyDict;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoApply;
use core\base\BaseCoreService;
use core\exception\CommonException;


/**
 * 分销申请
 */
class CoreFenxiaoApplyService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoApply();
    }

    public function apply($site_id, $member_id)
    {
        $fenxiao_config = ( new CoreFenxiaoConfigService() )->getFenxiaoConfig($site_id);
        if ($fenxiao_config[ 'is_fenxiao' ] == 0) throw new CommonException('SHOP_FENXIAO_NOT_OPEN');
        if ($fenxiao_config[ 'apply_type' ] == 3) throw new CommonException('SHOP_FENXIAO_NOT_OPEN_APPLY');

        //是否申请过
        $apply_info = $this->model->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->field('apply_id, status')->findOrEmpty()->toArray();
        if (!empty($apply_info)) {
            if ($apply_info[ 'status' ] != FenxiaoApplyDict::REFUSE) throw new CommonException('SHOP_FENXIAO_APPLYING');
        }

        $check = ( new CoreFenxiaoMemberService() )->checkFenxiaoApply($site_id, $member_id)[ 'is_allow_apply' ];
        if (!$check) throw new CommonException('SHOP_FENXIAO_CONDITION_NOT_SATISFIED');

        //有可能之前分销插件不存在导致
        $fenxiao_member_info = ( new CoreFenxiaoMemberService() )->getFenxiaoMemberCreateIfNotExists($site_id, $member_id);

        $data = [
            'site_id' => $site_id,
            'member_id' => $member_id,
            'status' => FenxiaoApplyDict::WAIT_AUDIT,
            'refuse_reason' => '',
            'create_time' => time(),
            'audit_time' => 0,
        ];
        if (empty($apply_info)) {
            $res = $this->model->create($data);
            $apply_id = $res->apply_id;
        } else {
            $apply_id = $apply_info[ 'apply_id' ];
            $res = $this->model->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->update($data);
        }

        //判断分销申请是否需要审核
        if ($fenxiao_config[ 'is_examine' ] == 0) {
            $this->agree($site_id, $apply_id);
        }
        return $res;
    }

    /**
     * 审核
     * @param $site_id
     * @param $apply_id
     * @return true
     */
    public function agree($site_id, $apply_id)
    {
        $this->audit($site_id, $apply_id, [ 'status' => FenxiaoApplyDict::AUDIT ]);
        return true;
    }

    /**
     * 审核
     * @param $site_id
     * @param $apply_id
     * @param $data
     * @return true
     */
    public function audit($site_id, $apply_id, $data)
    {
        $fenxiao_apply = $this->model->where([ [ 'apply_id', '=', $apply_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
        if ($fenxiao_apply->isEmpty()) throw new CommonException('SHOP_FENXIAO_NOT_FOUND_FENXIAO_APPLY');
        if ($fenxiao_apply[ 'status' ] != FenxiaoApplyDict::WAIT_AUDIT) throw new CommonException('SHOP_FENXIAO_APPLY_ALREADY_AUDIT');
        $fenxiao = ( new Fenxiao() )->where([ [ 'member_id', '=', $fenxiao_apply[ 'member_id' ] ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
        if (!$fenxiao->isEmpty()) throw new CommonException('SHOP_FENXIAO_ALREADY_FENXIAO');

        $update_data = [
            'status' => $data[ 'status' ],
            'refuse_reason' => $data[ 'refuse_reason' ] ?? ''
        ];
        $this->model->where([ [ 'apply_id', '=', $apply_id ], [ 'site_id', '=', $site_id ] ])->update($update_data);
        if ($data[ 'status' ] == FenxiaoApplyDict::AUDIT) {
            //添加分销商
            ( new CoreFenxiaoService() )->add($site_id, $fenxiao_apply[ 'member_id' ]);
        }

        return true;
    }

    /**
     * 核验是否可以自动成为分销商
     * @param $site_id
     * @param $member_id
     * @return void
     */
    public function autoToFenxiao($site_id, $member_id)
    {
        try {
            $fenxiao_config = ( new CoreFenxiaoConfigService() )->getFenxiaoConfig($site_id);
            if ($fenxiao_config[ 'apply_type' ] == 1) {
                $check = ( new CoreFenxiaoMemberService() )->checkFenxiaoApply($site_id, $member_id)[ 'is_allow_apply' ];
                if ($check) {
                    // 添加待审核的分销商
                    if ($fenxiao_config[ 'is_examine' ] == 1) {
                        $data = [
                            'site_id' => $site_id,
                            'member_id' => $member_id,
                            'status' => FenxiaoApplyDict::WAIT_AUDIT,
                            'refuse_reason' => '',
                            'create_time' => time(),
                            'audit_time' => 0,
                        ];
                        $this->model->create($data);
                    } else {
                        ( new CoreFenxiaoService() )->add($site_id, $member_id); // 添加分销商
                    }

                }
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

    /**
     * 拒绝
     * @param $site_id
     * @param $apply_id
     * @param $data
     * @return true
     */
    public function refuse($site_id, $apply_id, $data)
    {
        $data[ 'status' ] = FenxiaoApplyDict::REFUSE;
        $this->audit($site_id, $apply_id, $data);
        return true;
    }

}
