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

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoApplyDict;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoService;
use app\model\member\Member;
use core\base\BaseApiService;
use core\exception\ApiException;
use think\Collection;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 *  分销商
 */
class FenxiaoService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Fenxiao();
    }

    /**
     * 查询分销商信息
     * @return array
     */
    public function getInfo()
    {
        $field = 'fenxiao_id,site_id,fenxiao_no,member_id,level_id,parent,fenxiao_order_num,fenxiao_total_order,fenxiao_commission,agent_commission,team_commission,task_commission,
        sale_commission,child_num,child_fenxiao_num,`status`,is_agent,agent_level,agent_status,agent_money,agent_time,create_time,lock_time';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with(
                [
                    'member' => function ($query) {
                        $query->field('member_id,nickname,headimg,commission,commission_get,commission_cash_outing');
                    },
                    'parent_fenxiao' => function ($query) {
                        $query->field('member_id, nickname,headimg');
                    },
                    'fenxiao_level' => function ($query) {
                        $query->withField('level_id, level_name, one_rate, two_rate,team_rate, team_flat_rate');
                    },
                    'agent_level' => function ($query) {
                        $query->field('name, level_id');
                    },
                ]
            )->field($field)->append(['status_name'])->findOrEmpty()->toArray();

        return $info;
    }

    /**
     * 分销商信息
     * @return array
     */
    public function getDetail()
    {
        $field = 'fenxiao_id,site_id,fenxiao_no,member_id,level_id,parent,fenxiao_order_num,fenxiao_total_order,fenxiao_commission,agent_commission,team_commission,task_commission,
        sale_commission,child_num,child_fenxiao_num,`status`,is_agent,agent_level,agent_status,agent_money,agent_time,create_time,lock_time';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with(
                [
                    'member' => function ($query) {
                        $query->field('member_id,member_no,nickname,headimg,commission,commission_get,commission_cash_outing');
                    },
                    'parent_fenxiao' => function ($query) {
                        $query->field('member_id, nickname,headimg');
                    },
                    'fenxiao_level' => function ($query) {
                        $query->withField('level_id, level_name');
                    },
                    'agent_level' => function ($query) {
                        $query->field('name, level_id, discount');
                    },
                ]
            )->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        if ($info) {
            $info['add_up_data'] = (new CoreFenxiaoService())->getMemberData($this->site_id, $this->member_id);
        }
        return $info;
    }

    /**
     * 获取分销商账户信息（包含会员昵称，会员佣金相关）
     */
    public function getAccount()
    {
        $field = 'fenxiao_id,site_id,member_id,fenxiao_order_num,fenxiao_total_order,fenxiao_commission,agent_commission,team_commission,task_commission,
        sale_commission,child_num,child_fenxiao_num';

        $info = $this->model->where([['member_id', '=', $this->member_id]])->with([
            'member' => function ($query) {
                $query->field('member_id,username,headimg,commission,commission_get,commission_cash_outing');
            },
        ])->field($field)->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 申请分销商
     * @param $data
     */
    public function applyFenxiao($data)
    {
        $fenxiao_config = (new CoreFenxiaoConfigService())->getFenxiaoConfig($this->site_id);
        if ($fenxiao_config['is_fenxiao'] == 0) throw new ApiException('SHOP_FENXIAO_NOT_OPEN');
        if ($fenxiao_config['apply_type'] == 3) throw new ApiException('SHOP_FENXIAO_NOT_OPEN_APPLY');
        $check = (new CoreFenxiaoMemberService())->checkFenxiaoApply($this->site_id, $this->member_id)['is_allow_apply'];
        if (!$check) throw new ApiException('SHOP_FENXIAO_CONDITION_NOT_SATISFIED');

        $apply_info = [
            'site_id' => $this->site_id,
            'member_id' => $this->member_id,
            'parent' => $data['parent'],
            'apply_status' => FenxiaoApplyDict::WAIT_AUDIT,
            'refuse_reason' => '',
            'create_time' => time(),
            'audit_time' => 0,
        ];
        $res = $this->model->create($apply_info);
        return $res;

    }

    /**
     * 我的团队
     * @return array|array[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getTeam()
    {
        return (new CoreFenxiaoService())->getTeam($this->site_id, $this->member_id);
    }

    /**
     * 我的下级分销商
     * @return Member[]|array|Collection
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getChildFenxiao()
    {
        return (new CoreFenxiaoService())->getChildFenxiao($this->site_id, $this->member_id);
    }
}
