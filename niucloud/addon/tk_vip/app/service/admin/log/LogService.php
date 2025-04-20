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

namespace addon\tk_vip\app\service\admin\log;

use addon\tk_vip\app\model\log\Log;
use app\model\member\Member;
use app\model\member\MemberLevel;

use core\base\BaseAdminService;


/**
 * 会员日志服务层
 * Class LogService
 * @package addon\tk_vip\app\service\admin\log
 */
class LogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Log();
    }

    /**
     * 获取会员日志列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,member_id,level_id,type,body,over_time,update_time,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["member_id","level_id","type","body","create_time"], $where)->with(['member','memberLevel'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取会员日志信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,level_id,type,body,over_time,update_time,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member','memberLevel'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加会员日志
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
     * 会员日志编辑
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
     * 删除会员日志
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

    public function getMemberLevelAll(){
       $memberLevelModel = new MemberLevel();
       return $memberLevelModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}
