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

namespace addon\shop_fenxiao\app\service\admin\fenxiao;

use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 分销等级服务层
 * Class FenxiaoLevelService
 * @package addon\shop_fenxiao\app\service\admin
 */
class FenxiaoLevelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoLevel();
    }

    /**
     * 获取分销等级列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'level_id,site_id,level_num,level_name,one_rate,two_rate,upgrade_type,fenxiao_commission,fenxiao_order_num,fenxiao_order_money,order_num,order_money,child_num,child_fenxiao_num,status,create_time,update_time,is_default';
        $order = 'level_num asc';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])->field($field)->order($order)->append(['level_text']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取分销等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'level_id,site_id,level_num,level_name,one_rate,two_rate,upgrade_type,fenxiao_commission,fenxiao_order_num,fenxiao_order_money,order_num,order_money,child_num,child_fenxiao_num,status,create_time,update_time,is_default';

        $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取最低的分销商等级
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getMinLevel()
    {
        $field = 'level_id,site_id,level_num,level_name,one_rate,two_rate,upgrade_type,fenxiao_commission,fenxiao_order_num,fenxiao_order_money,order_num,order_money,child_num,child_fenxiao_num,status,create_time,update_time';

        $info = $this->model->field($field)->where(['site_id', '=', $this->site_id])->order("level_num desc")->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加分销等级
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        //分销商等级发生变动之后的操作
        event('ShopFenxiaoLevelChangeAfter', ['site_id' => $this->site_id, 'level_id' => $res->level_id]);
        return $res->level_id;

    }

    /**
     * 分销等级编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['level_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        //分销商等级发生变动之后的操作
        event('ShopFenxiaoLevelChangeAfter', ['site_id' => $this->site_id, 'level_id' => $id]);
        return true;
    }

    /**
     * 删除分销等级
     * @param int $level_id
     * @return bool
     */
    public function del(int $level_id)
    {
        //先判断分销等级是否有被使用
        if (!(new Fenxiao())->where([['site_id', '=', $this->site_id], ['level_id', '=', $level_id]])->findOrEmpty()->isEmpty())
            throw new AdminException('SHOP_FENXIAO_HAS_LEVEL_FENXIAO_NOT_ALLOW_DELETE');
        $model = $this->model->where([['level_id', '=', $level_id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 获取分销等级权重
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList()
    {
        $list = $this->model->where([['site_id', "=", $this->site_id]])->select()->toArray();
        return $list;
    }

    /**
     * 等级升级卡片
     * @param $data
     * @return array[]
     */
    public function getFenxiaoCardList($data)
    {
        if ($data['id'] != 0) {
            $field = 'level_id,site_id,level_num,level_name,one_rate,two_rate,upgrade_type,fenxiao_commission,fenxiao_order_num,fenxiao_order_money,order_num,order_money,child_num,child_fenxiao_num,status,create_time,update_time';
            $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $data['id']]])->findOrEmpty()->toArray();
        } else {
            $info = [
                'fenxiao_order_num' => 0,
                'fenxiao_order_money' => 0,
                'order_num' => 0,
                'order_money' => 0,
                'child_num' => 0,
                'child_fenxiao_num' => 0
            ];
        }
        $card = [
            [
                'card_id' => 1,
                'card_name' => '一级分销订单总数',
                'card_desc' => '分销商自己购买和自己推荐的直属会员购买的订单次数',
                'fenxiao_order_num' => $info['fenxiao_order_num'] ?? 0,
                'is_checkbox' => $info['fenxiao_order_num'] > 0 ? 1 : 0,
                'unit' => '个',
                'key' => 'fenxiao_order_num'
            ],
            [
                'card_id' => 2,
                'card_name' => '一级分销订单总额',
                'card_desc' => '分销商自己购买和自己推荐的直属会员购买的订单的总额',
                'fenxiao_order_money' => $info['fenxiao_order_money'] ?? 0,
                'is_checkbox' => $info['fenxiao_order_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'fenxiao_order_money'
            ],
            [
                'card_id' => 3,
                'card_name' => '自购订单总数',
                'card_desc' => '分销商自己购买的订单次数',
                'order_num' => $info['order_num'] ?? 0,
                'is_checkbox' => $info['order_num'] > 0 ? 1 : 0,
                'unit' => '个',
                'key' => 'order_num'
            ],
            [
                'card_id' => 4,
                'card_name' => '自购订单总额',
                'card_desc' => '分销商自己购买的订单总额',
                'order_money' => $info['order_money'] ?? 0,
                'is_checkbox' => $info['order_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'order_money'
            ],
            [
                'card_id' => 5,
                'card_name' => '一级下线人数',
                'card_desc' => '分销商的直属下级会员（包含已经申请成为分销商的）',
                'child_num' => $info['child_num'] ?? 0,
                'is_checkbox' => $info['child_num'] > 0 ? 1 : 0,
                'unit' => '人',
                'key' => 'child_num'
            ],
            [
                'card_id' => 6,
                'card_name' => '一级下线分销商',
                'card_desc' => '分销商的直属下级分销商',
                'child_fenxiao_num' => $info['child_fenxiao_num'] ?? 0,
                'is_checkbox' => $info['child_fenxiao_num'] > 0 ? 1 : 0,
                'unit' => '人',
                'key' => 'child_fenxiao_num'
            ],
        ];

        return $card;
    }

    /**
     * 查询分销等级用于选择
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListOfSelect()
    {
        $field = 'level_id,site_id,level_num,level_name,one_rate,two_rate,upgrade_type,fenxiao_commission,fenxiao_order_num,fenxiao_order_money,order_num,order_money,child_num,child_fenxiao_num,status,create_time,update_time,is_default';
        $order = 'level_num asc';
        $list = $this->model->where([['site_id', "=", $this->site_id]])->field($field)->order($order)->select()->toArray();
        return $list;
    }
}
