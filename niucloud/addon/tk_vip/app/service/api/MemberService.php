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

namespace addon\tk_vip\app\service\api;

use addon\tk_vip\app\model\real\Real;
use addon\tk_vip\app\model\vip\Vip;
use app\model\member\Member;
use app\service\admin\member\MemberAccountService;
use core\base\BaseApiService;
use think\Exception;

/**
 * 会员等级服务层
 * @package app\service\api\member
 */
class MemberService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Vip();
    }

    /**
     * 获取会员VIP管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $order = 'update_time desc';
        $wheret = [];
        $wheret[] = ['memberInfo.site_id', '=', $this->site_id];
        // 检查条件是否设置且不为空
        if (isset($where['sex']) && !empty($where['sex'])) {
            $wheret[] = ['memberInfo.sex', '=', $where['sex']];
        }
        if (isset($where['nickname']) && !empty($where['nickname'])) {
            $wheret[] = ['memberInfo.nickname', 'like', '%' . $where['nickname'] . '%'];
        }
        $search_model = $this->model
            ->withSearch(["member_id", "level_id", "over_time"], $where)
            ->withJoin([
                'memberInfo' => ['member_id', 'member_no', 'headimg', 'sex', 'birthday', 'nickname', 'site_id', 'point']
            ])
            ->with(['memberLevel'])
            ->where($wheret)
            ->order($order);
        $list = $this->pageQuery($search_model);
        $realModel = new Real();
        foreach ($list['data'] as $k => $v) {
            $list['data'][$k]['real_info'] = $realModel->where(['site_id' => $this->site_id, 'member_id' => $v['member_id']])->findOrEmpty()->toArray();
        }
        return $list;
    }

    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,level_id,over_time,update_time,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])
            ->with(['memberLevel'])
            ->findOrEmpty();
        if ($info->isEmpty()) throw new Exception('会员信息异常');
        $info['memberInfo'] = $this->getMemberInfo($info['member_id']);
        $info['real_info'] = (new Real())->where(['site_id' => $this->site_id, 'member_id' => $info['member_id']])->findOrEmpty()->toArray();
        return $info->toArray();
    }

    public function getMemberInfo($member_id)
    {
        $field = 'member_id, site_id, username, member_no, mobile, register_channel, nickname, headimg, member_level, member_label, login_ip, login_type, login_time, create_time, last_visit_time, last_consum_time, sex, status, birthday, point, balance, growth, is_member, member_time, is_del, province_id, city_id, district_id, address, location, money, money_get, wx_openid, weapp_openid, commission, commission_get, commission_cash_outing';
        return (new Member())->where([['member_id', '=', $member_id]])->with(['member_level_name_bind'])->field($field)->append(['sex_name'])->findOrEmpty()->toArray();
    }

    public function adjustPoint($data)
    {
        if (!is_numeric($data['account_data'])) throw new Exception('调整积分必须为数字');
        $memberInfo = (new Member())->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->findOrEmpty();
        $data['memo'] = '核销员:' . $memberInfo['nickname'] . '调整积分,变动:' . $data['account_data'] . '核销员ID:' . $this->member_id;
        $res = (new MemberAccountService())->adjustPoint($data);
        return $res;
    }

    public function adjustBalance($data)
    {
        if (!is_numeric($data['account_data'])) throw new Exception('调整余额必须为数字');
        $memberInfo = (new Member())->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->findOrEmpty();
        $data['memo'] = '核销员:' . $memberInfo['nickname'] . '调整余额,变动:' . $data['account_data'] . '核销员ID:' . $this->member_id;
        $res = (new MemberAccountService())->adjustBalance($data);
        return $res;
    }
}
