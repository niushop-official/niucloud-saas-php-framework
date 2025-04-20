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

namespace addon\qiankun_recharge\app\service\admin\options;

use addon\qiankun_recharge\app\model\options\Options;
use addon\shop\app\model\coupon\Coupon;
use app\model\member\MemberLevel;

use core\base\BaseAdminService;


/**
 * 充值项列服务层
 * Class OptionsService
 * @package addon\qiankun_recharge\app\service\admin\options
 */
class OptionsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Options();
    }

    /**
     * 获取充值项列列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,title,recharge,give_price,give_integral,give_coupon,give_level,status,sort,create_time';
        $order = '';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])
            ->withSearch(["title", "give_level", "status"], $where)
            ->with(['memberLevel'])
            ->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as &$v) {
            $couponName = (new Coupon())->where('id', 'in', explode(',', $v['give_coupon']))->column('title');
            $v['give_coupon_name'] = implode(',', $couponName);
        }
        return $list;
    }

    /**
     * 获取充值项列信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,title,recharge,give_price,give_integral,give_coupon,give_level,status,sort,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['coupon', 'memberLevel'])->findOrEmpty()->toArray();
        $info['give_coupon'] = explode(',', $info['give_coupon']);
        return $info;
    }

    /**
     * 添加充值项列
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 充值项列编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除充值项列
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

    public function getCouponAll()
    {
        $couponModel = new Coupon();
        return $couponModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

    public function getMemberLevelAll()
    {
        $memberLevelModel = new MemberLevel();
        return $memberLevelModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

}
