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

namespace addon\yk_recharge\app\service\admin;

use addon\yk_recharge\app\model\RechargeSetting;
use app\service\admin\member\MemberLevelService;
use core\base\BaseAdminService;

/**
 * 充值订单
 * Class RechargeOrderService
 * @package app\service\admin\order
 */
class RechargeSettingService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new RechargeSetting();
    }

    /**
     * 充值订单分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'setting_id, site_id, amount, money, jifen,level_id, create_time';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id] ])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        $levels = ( new MemberLevelService() )->getAll();
        $levels = array_column($levels, null, 'level_id');
        foreach ($list['data'] as $k => $v){
            $list['data'][$k]['level_name'] = !empty($v['level_id']) && !empty($levels[$v['level_id']])?$levels[$v['level_id']]['level_name']:'--';
        }
        return $list;
    }


     /**
     * 获取文章分类信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'setting_id, site_id, amount, money, jifen,level_id, create_time';

        return $this->model->field($field)->where([['setting_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
    }

    /**
     * 添加文章分类
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->setting_id;

    }

    /**
     * 文章分类编辑
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['setting_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除文章分类
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        return $this->model->where([['setting_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
    }


    public function getAuth(){
        $check_url='https://auth.yikecms.cn/api/check2.php?proid=1&url='.$_SERVER['HTTP_HOST'];
        $query = file_get_contents($check_url);
        if ($query = json_decode($query, true)) {
            if ($query['code'] == 1) {
                return true;
            } else if ($query['code'] == 2) {
                return false;
            }
        } else if (!empty($query)) {
           return false;
        } 
    }
}
