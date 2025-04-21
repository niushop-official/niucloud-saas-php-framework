<?php

namespace addon\ly_shareholder\app\service\admin;

use addon\ly_shareholder\app\model\ShareholderLevel;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 股东等级服务层
 * Class ShareholderLevelService
 * @package addon\ly_shareholder\app\service\admin
 */
class ShareholderLevelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ShareholderLevel();
    }

    /**
     * 获取股东分红等级列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,order_num,order_money,order_goods_id,recharge_money,status,create_time,update_time,is_default';
        $order = 'level_num asc';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])->field($field)->order($order)->append(['level_text']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取股东分红等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,order_num,order_money,order_goods_id,recharge_money,status,create_time,update_time,is_default';

        $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取最低的股东分红等级
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getMinLevel()
    {
        $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,order_goods_id, recharge_money,status,create_time,update_time';

        $info = $this->model->field($field)->where(['site_id', '=', $this->site_id])->order("level_num desc")->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加股东分红等级
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        //股东等级发生变动之后的操作
        event('ShareholderLevelChangeAfter', ['site_id' => $this->site_id, 'level_id' => $res->level_id]);
        return $res->level_id;

    }

    /**
     * 股东分红等级编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['level_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        //股东等级发生变动之后的操作
        event('ShareholderLevelChangeAfter', ['site_id' => $this->site_id, 'level_id' => $id]);
        return true;
    }

    /**
     * 删除股东分红等级
     * @param int $level_id
     * @return bool
     */
    public function del(int $level_id)
    {
        //先判断股东等级是否有被使用
        if (!(new ShareholderLevel())->where([['site_id', '=', $this->site_id], ['level_id', '=', $level_id]])->findOrEmpty()->isEmpty())
            throw new AdminException('SHAREHOLDER_HAS_LEVEL_NOT_ALLOW_DELETE');
        $model = $this->model->where([['level_id', '=', $level_id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 获取股东分红等级权重
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
    public function getShareholderCardList($data)
    {
        if ($data['id'] != 0) {
            $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,order_num,order_money,order_goods_id,recharge_money,status,create_time,update_time';
            $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $data['id']]])->findOrEmpty()->toArray();
        } else {
            $info = [

                'order_num' => 0,
                'order_money' => 0,
                'recharge_money' => 0,
                'order_goods_id' => [],
            ];
        }
        $card = [
            [
                'card_id' => 1,
                'card_name' => '充值金额总数',
                'card_desc' => '会员自己充值金额总数',
                'recharge_money' => $info['recharge_money'] ?? 0,
                'is_checkbox' => $info['recharge_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'recharge_money'
            ],
            [
                'card_id' => 2,
                'card_name' => '自购订单总数',
                'card_desc' => '自己购买的订单次数',
                'order_num' => $info['order_num'] ?? 0,
                'is_checkbox' => $info['order_num'] > 0 ? 1 : 0,
                'unit' => '个',
                'key' => 'order_num'
            ],
            [
                'card_id' => 3,
                'card_name' => '自购订单总额',
                'card_desc' => '自己购买的订单总额',
                'order_money' => $info['order_money'] ?? 0,
                'is_checkbox' => $info['order_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'order_money'
            ],
            [
                'card_id' => 4,
                'card_name' => '购买指定商品',
                'card_desc' => '购买指定商品之一,多个用英文逗号隔开',
                'order_goods_id' => $info['order_goods_id'] ? $info['order_goods_id'] : [],
                'is_checkbox' =>!empty($info['order_goods_id']) ? 1 : 0,
                'unit' => 'ID',
                'key' => 'order_goods_id'
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
     * 查询股东分红等级用于选择
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListOfSelect()
    {
        $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,order_num,order_money,recharge_money,status,create_time,update_time,is_default';
        $order = 'level_num asc';
        $list = $this->model->where([['site_id', "=", $this->site_id]])->field($field)->order($order)->select()->toArray();
        return $list;
    }
}
