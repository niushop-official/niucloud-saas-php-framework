<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\model\AreaReward;

use core\base\BaseAdminService;


/**
 * 区域代理分红记录服务层
 * Class AreaRewardService
 * @package addon\ly_area\app\service\admin
 */
class AreaRewardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new AreaReward();
    }

    /**
     * 获取区域代理分红记录列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = '*';
        $order = 'id desc';

        $condition = [
            ['ly_area_log.site_id', '=', $this->site_id]
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        $search_model = $this->model->where($condition)
            ->withSearch(["member_id","level_id","agent_area","status","settle_time","create_time"], $where)
            // ->withJoin(["member" => ["username", "nickname", "mobile"]], "LEFT")
            // ->withJoin([
            //     'member' => ['member_id', 'username', 'nickname', 'mobile', 'headimg'],
            // ])
            ->with([
                'member' => function($query){
                    $query->withField('member_id, username, nickname, mobile, headimg');
                },
                'buyMember' => function($query){
                    $query->withField('member_id,username,nickname, headimg, mobile');
                },
                'areaLevel' => function($query){
                    $query->withField('level_id, level_name, level_num, level_rate');
                },
                'shopOrder' => function($query){
                    $query->withField('order_id, order_no, order_money, pay_money, status, taker_address, taker_full_address, taker_province, taker_city, taker_district');
                }
            ])
            ->field($field)->order($order);;
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取区域代理分红记录信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = '*';

        $info = $this->model->field($field)->where([['id', "=", $id]])
            ->withJoin([
                'areaAgent' => ['member_id', 'username', 'nickname', 'mobile', 'headimg'],
            ])
            ->with([
                'buyMember' => function($query){
                    $query->withField('member_id,username,nickname, headimg, mobile');
                },
                'areaLevel' => function($query){
                    $query->withField('level_id, level_name, level_num, level_rate');
                },
                'shopOrder' => function($query){
                    $query->withField('order_id, order_sn, order_money, pay_money, status, taker_full_adress, taker_province, taker_city, taker_district');
                }
            ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加区域代理分红记录
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
     * 区域代理分红记录编辑
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
     * 删除区域代理分红记录
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