<?php

namespace addon\ly_lian\app\service\admin;

use addon\ly_lian\app\model\LianMember;
use core\base\BaseAdminService;
use think\facade\Db;


/**
 * 链动2+1会员服务层
 * Class LianMemberService
 * @package addon\ly_lian\app\service\admin\member
 */
class LianMemberService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new LianMember();
    }

    /**
     * 获取链动2+1会员列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';
        $order = 'id desc';

        $condition = [
            ['lian_member.site_id', '=', $this->site_id]
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }
        $search_model = $this->model->alias('lian_member')
            ->join('member', 'member.member_id = lian_member.member_id')
            ->where($condition)->withSearch(['level_id','status','thaw_status','up_time','create_time'], $where)
            ->field($field)
            ->withJoin([
                'lianMember' => ['member_id','username','nickname','headimg','mobile']
            ])
            ->with([
                'lianLevel' => function($query){
                    $query->withField('level_id, level_num, level_name');
                },
                'parentMember' => function($query){
                    $query->withField('member_id,username, nickname, headimg, mobile');
                },
                'lianParentMember' => function($query){
                    $query->withField('member_id,username, nickname, headimg, mobile');
                },
            ])
            ->order($order)->append(['status_name']);

        $list = $this->pageQuery($search_model);

        return $list;    
    }

    /**
     * 获取链动2+1会员信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,pid,lian_pid,level_id,child_mid1,child_mid2,commission,give_commission,frozen_commission,status,thaw_status,up_time,create_time,update_time,delete_time';
        
        $info = $this->model->field($field)->where([['id', "=", $id]])
            ->withJoin([
                'hasOneMember' => ['member_id', 'username', 'nickname', 'headimg', 'mobile'],
            ])
            ->with([
                'lianLevel' => function($query){
                    $query->withField('level_id, level_num, level_name');
                },
            ])
            ->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加链动2+1会员
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
     * 链动2+1会员编辑
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
     * 删除链动2+1会员
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
}