<?php

namespace addon\ly_lian\app\service\admin;

use addon\ly_lian\app\model\Level;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 链动2+1等级服务层
 * Class LevelService
 * @package addon\ly_lian\app\service\admin\level
 */
class LevelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Level();
    }

    /**
     * 获取链动2+1等级列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        // $field = '*';
        $order = 'level_num asc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->order($order)->append(['level_text']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取链动2+1等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        // $field = 'level_id,site_id,level_name,level_num,recommend_money,recommend_rate,see_money,see_rate,cultivate_money,cultivate_rate,upgrade_type,order_money,recharge_money,recommend_num,up_register,up_goods_num,status,create_time,update_time,delete_time,is_default';
        $field = '*';
        $info = $this->model->field($field)->where([['level_id', "=", $id]])->findOrEmpty()->toArray();;
        return $info;
    }

    /**
     * 添加链动2+1等级
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
     * 链动2+1等级编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['level_id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除链动2+1等级
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['level_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }


    /**
     * 获取最低的链动等级
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getMinLevel()
    {
        // $field = 'level_id,site_id,level_num,level_name,recommend_money,recommend_rate,see_money,see_rate,cultivate_money,cultivate_rate,upgrade_type,order_money,recharge_money,recommend_num,up_register,up_goods_num,status,create_time,update_time,is_default';
        $field = '*';
        $info = $this->model->field($field)->where(['site_id', '=', $this->site_id])->order("level_num desc")->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取链动等级权重
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getLevelNumList()
    {
        $list = $this->model->where([['site_id', "=", $this->site_id]])->select()->toArray();
        return $list;
    }


    public function getList($site_id)
    {
        $list = $this->model->where([['site_id', "=", $site_id]])->select();
        return $list;
    }

    /**
     * 等级升级卡片
     * @param $data
     * @return array[]
     */
    public function getLevelCardList($data)
    {
        if ($data['id'] != 0) {
            $field = '*';
            $info = $this->model->where([['site_id', '=', $this->site_id], ['level_id', "=", $data['id']]])->findOrEmpty()->toArray();
        } else {
            $info = [

                // 'order_money' => 0,
                // 'recharge_money' => 0,
                'recommend_num' => 0,
                'up_goods_num' => 0,
            ];
        }
 
        $card = [
            // [
            //     'card_id' => 1,
            //     'card_name' => '充值金额总数',
            //     'card_desc' => '会员自己充值金额总数',
            //     'recharge_money' => $info['recharge_money'] ?? 0,
            //     'is_checkbox' => $info['recharge_money'] > 0 ? 1 : 0,
            //     'unit' => '元',
            //     'key' => 'recharge_money'
            // ],
            [
                'card_id' => 1,
                'card_name' => '直推人数',
                'card_desc' => '直推等级一的人数',
                'recommend_num' => $info['recommend_num'] ?? 0,
                'is_checkbox' => $info['recommend_num'] > 0 ? 1 : 0,
                'unit' => '人',
                'key' => 'recommend_num'
            ],
            // [
            //     'card_id' => 3,
            //     'card_name' => '自购订单总额',
            //     'card_desc' => '分销商自己购买的订单总额',
            //     'order_money' => $info['order_money'] ?? 0,
            //     'is_checkbox' => $info['order_money'] > 0 ? 1 : 0,
            //     'unit' => '元',
            //     'key' => 'order_money'
            // ],
            [
                'card_id' => 2,
                'card_name' => '购买指定商品数量',
                'card_desc' => '指定件数，指定商品可到商品管理列表进行设置',
                'up_goods_num' => $info['up_goods_num'] ?? 0,
                'is_checkbox' => $info['up_goods_num'] > 0 ? 1 : 0,
                'unit' => '件',
                'key' => 'up_goods_num'
            ],
            // [
            //     'card_id' => 5,
            //     'card_name' => '一级下线人数',
            //     'card_desc' => '分销商的直属下级会员（包含已经申请成为分销商的）',
            //     'child_num' => $info['child_num'] ?? 0,
            //     'is_checkbox' => $info['child_num'] > 0 ? 1 : 0,
            //     'unit' => '人',
            //     'key' => 'child_num'
            // ],
            // [
            //     'card_id' => 6,
            //     'card_name' => '一级下线分销商',
            //     'card_desc' => '分销商的直属下级分销商',
            //     'child_fenxiao_num' => $info['child_fenxiao_num'] ?? 0,
            //     'is_checkbox' => $info['child_fenxiao_num'] > 0 ? 1 : 0,
            //     'unit' => '人',
            //     'key' => 'child_fenxiao_num'
            // ],
        ];

        return $card;
    }

    /**
     * 查询链动等级用于选择
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListOfSelect()
    {
        
        $order = 'level_num asc';
        $list = $this->model->where([['site_id', "=", $this->site_id]])->order($order)->select()->toArray();
        return $list;
    }
    
}