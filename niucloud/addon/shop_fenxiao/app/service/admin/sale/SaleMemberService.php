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

namespace addon\shop_fenxiao\app\service\admin\sale;

use addon\shop_fenxiao\app\model\sale\SaleMember;
use core\base\BaseAdminService;


/**
 * 会员销售奖励周期服务层
 */
class SaleMemberService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SaleMember();
    }

    /**
     * 分页
     * @return void`
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,period_id, member_id, period_type,sale_start_time,sale_end_time,order_money,reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        $order = 'id desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['is_settlement', 'period_id'], $where)
            ->field($field)
            ->with(['member' => function ($query){
                $query->withField('nickname, mobile, member_id, headimg');
            }])
            ->append(['period_type_name'])
            ->order($order);

        return $this->pageQuery($search_model);
    }

}
