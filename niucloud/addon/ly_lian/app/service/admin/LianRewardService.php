<?php

namespace addon\ly_lian\app\service\admin;

use addon\ly_lian\app\model\LianReward;

use core\base\BaseAdminService;


/**
 * 链动2+1奖励服务层
 * Class LianRewardService
 * @package addon\ly_lian\app\service\admin
 */
class LianRewardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new LianReward();
    }

    /**
     * 获取链动2+1奖励列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';
        $order = 'id desc';

        $condition = [
            ['lian_reward.site_id', '=', $this->site_id]
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        $search_model = $this->model->where($condition)
            ->withSearch(['member_id', 'level_id', 'buy_mid', 'thaw_status', 'create_time', 'reward_type'], $where)
            ->field($field)
            ->withJoin([
                'member' => ['member_id', 'username', 'nickname', 'mobile', 'headimg'],
            ])
            ->with([
                'buyMember' => function ($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'lianLevel' => function ($query){
                    $query->withField('level_id, level_num, level_name');
                },
                'lianOrder' => function ($query){
                    $query->withField('order_id, order_no');
                },
                'lianOrderGoods' => function ($query){
                    $query->withField('goods_id, goods_name, goods_cover');
                },
            ])
            ->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取链动2+1奖励信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = '*';

        $info = $this->model->field($field)->where([['id', "=", $id]])
            ->withJoin([
                'member' => ['member_id, username, nickname, mobile, headimg'],
            ])
            ->with([
                'buyMember' => function ($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'lianLevel' => function ($query){
                    $query->withField('level_id, level_num, level_name');
                },
                'lianOrder' => function ($query){
                    $query->withField('order_id, order_no');
                },
                'lianOrderGoods' => function ($query){
                    $query->withField('goods_id');
                },
            ])
            ->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加链动2+1奖励
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
     * 链动2+1奖励编辑
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
     * 删除链动2+1奖励
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