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

namespace addon\huodong\app\service\admin\fxbill;

use addon\huodong\app\model\fxbill\Fxbill;
use app\model\member\Member;

use core\base\BaseAdminService;


/**
 * 活动佣金明细服务层
 * Class FxbillService
 * @package addon\huodong\app\service\admin\fxbill
 */
class FxbillService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Fxbill();
    }

    /**
     * 获取活动佣金明细列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';//'id,member_id,site_id,account_type,account_data,account_sum,from_type,related_id,create_time,memo,from_member_id,fxlevel,status';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["member_id","account_type","account_data","account_sum","from_type","related_id","create_time","memo","from_member_id","fxlevel","status"], $where)->with(['member'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);

        foreach ($list['data'] as $k => &$v) {
            $v['from_member_name'] = (new Member())->where([['member_id', "=", $v['from_member_id']]])->value('nickname');
        }


        return $list;
    }

    /**
     * 获取活动佣金明细信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,member_id,site_id,account_type,account_data,account_sum,from_type,related_id,create_time,memo,from_member_id,fxlevel,status';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加活动佣金明细
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
     * 活动佣金明细编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除活动佣金明细
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getMemberAll(){
       $memberModel = new Member();
       return $memberModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}
