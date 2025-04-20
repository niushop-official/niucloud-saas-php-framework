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

namespace addon\huodong\app\service\admin\relation;

use addon\huodong\app\model\relation\Relation;
use app\model\member\Member;

use core\base\BaseAdminService;


/**
 * 推广关系服务层
 * Class RelationService
 * @package addon\huodong\app\service\admin\relation
 */
class RelationService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Relation();
    }

    /**
     * 获取推广关系列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,member_id,pid,pid2,adddate';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","member_id","adddate"], $where)->with(['member'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $k => &$v) {
            $v["pid_name"] =Member::where('member_id', $v['pid'])->value('nickname');
            $v["pid2_name"] =Member::where('member_id', $v['pid2'])->value('nickname');

        }

        return $list;
    }

    /**
     * 获取推广关系信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,pid,pid2,adddate';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加推广关系
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
     * 推广关系编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        if($data['pid']&&!$data['pid2']){
            $data['pid2'] = Relation::where('member_id', $data['pid'])->value('pid');
        }


        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除推广关系
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
