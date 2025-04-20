<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\model\AreaApply;

use addon\ly_area\app\service\core\agent\CoreAreaApplyService;
use core\base\BaseAdminService;


/**
 * 区域代理申请记录服务层
 * Class ApplyService
 * @package addon\ly_area\app\service\admin
 */
class AreaApplyService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new AreaApply();
    }

    /**
     * 获取区域代理申请记录列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';
        $order = 'apply_id desc';

        $condition = [ [ 'ly_area_apply.site_id', "=", $this->site_id ] ];
        if(!empty($where['search'])){
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }
        if(!empty($where['apply_area'])){
            $condition[] = ['apply_area', 'like', '%' . $where['apply_area'] . '%'];
        }

        $search_model = $this->model->where($condition)
            ->withSearch(["member_id","agent_id","level_area","apply_area",'status',"create_time","level_id"], $where)
            ->field($field)
            // ->withJoin([
            //     'member' => ['member_id', 'username', 'nickname', 'mobile', 'headimg'],
            //     'level' => ['level_id', 'level_name','level_num', 'level_area'],
            // ])
            ->with([
                'member' => function ($query) {
                    $query->withField('member_id,username,nickname,mobile,headimg');
                },
                'level' => function ($query) {
                    $query->withField('level_id,level_name,level_num,level_area');
                }
            ])
            ->order($order);
            
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取区域代理申请记录信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'apply_id,site_id,member_id,agent_id,level_area,apply_area,level_id,province_id,city_id,district_id,status,create_time,update_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])
            ->withJoin([
                'member' => ['member_id', 'username', 'nickname', 'mobile', 'headimg'],
            ])
            ->with([
                'level' => function ($query) {
                    $query->withField('level_id,level_name,level_num,level_area');
                },
                'agent' => function ($query) {
                    $query->withField('agent_id,member_id,level_id,province_id,city_id,district_id,apply_area,create_time');
                }
            ])
            ->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加区域代理申请记录
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
     * 区域代理申请记录编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['apply_id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除区域代理申请记录
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['apply_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }


    /**
     * 审核
     * @param $apply_id
     * @return true
     */
    public function agree($apply_id)
    {
        (new CoreAreaApplyService())->agree($this->site_id, $apply_id);
        return true;
    }

    /**
     * 拒绝
     * @param $apply_id
     * @param $data
     * @return true
     */
    public function refuse($apply_id, $data)
    {
        (new CoreAreaApplyService())->refuse($this->site_id, $apply_id, $data);
        return true;
    }
    
}