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

namespace addon\transfer\app\service\api;

use addon\transfer\app\model\log\Log;
use app\model\member\Member;
use core\base\BaseAdminService;


/**
 * 资产转赠记录服务层
 * Class LogService
 * @package addon\transfer\app\service\admin\log
 */
class LogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Log();
    }

    /**
     * 获取资产转赠记录列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,account_type,order_no,order_from,member_id,to_member_id,zhuan_money,give_money,meno,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["account_type","order_no","member_id","to_member_id","meno","create_time"], $where)->with(['member','member'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取资产转赠记录信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,account_type,order_no,order_from,member_id,to_member_id,zhuan_money,give_money,meno,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member','member'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加资产转赠记录
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
     * 资产转赠记录编辑
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
     * 删除资产转赠记录
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
