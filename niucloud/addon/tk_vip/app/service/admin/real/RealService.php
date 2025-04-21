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

namespace addon\tk_vip\app\service\admin\real;

use addon\tk_vip\app\dict\real\RealDict;
use addon\tk_vip\app\model\real\Real;
use app\model\member\Member;

use core\base\BaseAdminService;
use think\Exception;


/**
 * 实名认证服务层
 * Class RealService
 * @package addon\tk_vip\app\service\admin\real
 */
class RealService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Real();
    }

    /**
     * 获取实名认证列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,member_id,real_name,mobile,card_num,sex,birthday,field,status,update_time,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["member_id","real_name","mobile","card_num","status","create_time"], $where)->with(['member'])->field($field)
            ->order($order)->append(['sex_name']);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $k=>$v){
            $list['data'][$k]['status_name'] = RealDict::getRealStatus($list['data'][$k]['status'])['name'];
        }
        return $list;
    }

    /**
     * 获取实名认证信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,real_name,mobile,card_num,sex,birthday,field,status,update_time,create_time,card_img_back,card_img_front';
        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加实名认证
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        if (!$data['member_id'] > 0) throw new Exception('请选择关联会员');
        $vipInfo = $this->model->where(['site_id' => $this->site_id, 'member_id' => $data['member_id']])->findOrEmpty();
        if (!$vipInfo->isEmpty()) throw new Exception('已存在记录，请修改调整');
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 实名认证编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        if (!$data['member_id'] > 0) throw new Exception('请选择关联会员');
        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除实名认证
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
