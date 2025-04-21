<?php

namespace addon\ly_lian\app\service\admin;

use addon\ly_lian\app\model\LianChange;
use core\base\BaseAdminService;


/**
 * 链动2+1关系变动服务层
 * Class LianChangeService
 * @package addon\ly_lian\app\service\admin
 */
class LianChangeService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new LianChange();
    }

    /**
     * 获取链动2+1关系变动列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';
        $order = 'id desc';
    
        $condition = [
            ['lian_change.site_id', '=', $this->site_id]
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        $search_model = $this->model->alias('lian_change')
            ->join('member', 'lian_change.member_id = member.member_id', 'LEFT')
            ->where($condition)
            ->withSearch(['member_id', 'level_id', 'create_time'], $where)
            ->field($field)
            ->withJoin([
                'lianMember' => ['member_id', 'username', 'nickname', 'mobile', 'headimg'],
            ])
            ->with([
                'lianParent' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'newLianParent' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'parentMember' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'lianLevel' => function ($query){
                    $query->withField('level_id, level_name, level_num');
                }
            ])
            ->order($order)->append(['status_name']);
    
        $list = $this->pageQuery($search_model);
    
        return $list;
    }

    /**
     * 获取链动2+1关系变动信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,pid,lian_pid,new_lian_pid,level_id,child_mid,child_type,create_time,update_time,delete_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])
            ->with([
                'lianMember' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'lianParent' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'newLianParent' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'parentMember' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'lianLevel' => function ($query){
                    $query->withField('level_id, level_name, level_num');
                }
            ])
            ->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加链动2+1关系变动
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
     * 链动2+1关系变动编辑
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
     * 删除链动2+1关系变动
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