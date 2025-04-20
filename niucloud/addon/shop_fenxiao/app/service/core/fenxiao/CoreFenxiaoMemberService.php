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

namespace addon\shop_fenxiao\app\service\core\fenxiao;

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use addon\shop_fenxiao\app\model\agent\AgentLevel;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoMember;
use addon\shop_fenxiao\app\model\fenxiao\Goods;
use core\base\BaseCoreService;
use core\base\BaseModel;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;


/**
 * 分销会员
 * Class CoreFenxiaoMemberService
 * @package addon\shop_fenxiao\app\service\core
 */
class CoreFenxiaoMemberService extends BaseCoreService
{

    /**
     * 获取会员分销关系
     * @param $site_id
     * @param $member_id
     *
     */
    public function getFenxiaoMemberCreateIfNotExists($site_id, $member_id)
    {
        $fenxiao_member = ( new FenxiaoMember() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
        if ($fenxiao_member->isEmpty()) {
            $insert_data = [
                'member_id' => $member_id,
                'site_id' => $site_id,
                'fenxiao_member_id' => 0
            ];
            $fenxiao_member = ( new FenxiaoMember() )->create($insert_data);
        }
        return $fenxiao_member->toArray();
    }

    /**
     * 会员注册成功事件处理
     * @param $member
     */
    public function memberRegister($site_id, $member)
    {
        //添加分销会员表
        $data = [
            'site_id' => $site_id,
            'pid' => $member[ 'pid' ] ?? 0,
            'member_id' => $member[ 'member_id' ]
        ];
        ( new FenxiaoMember() )->create($data);
        $this->bindRelation($site_id, $member[ 'member_id' ], 1);
        return true;
    }

    /**
     * 会员上下级绑定，会员必须存在
     * @param int $site_id
     * @param int $member_id
     * @param int $child_condition 1 注册 2 首次下单 3 首次付款
     */
    public function bindRelation(int $site_id, int $member_id, int $child_condition)
    {
        //检测触发场景和设置是否匹配
        $fenxiao_config = ( new CoreFenxiaoConfigService() )->getFenxiaoConfig($site_id);
        $config_child_condition = $fenxiao_config[ 'child_condition' ];
        if ($child_condition != $config_child_condition) return;
        //查询会员绑定信息
        $fenxiao_member_info = ( new FenxiaoMember() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty()->toArray();
        if (!empty($fenxiao_member_info)) {
            //如果当前用户已经是分销商或者没有推荐人
            if ($fenxiao_member_info[ 'is_fenxiao' ] != 0) return;
            if ($fenxiao_member_info[ 'pid' ] > 0) {
                //查询分销商信息
                $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $fenxiao_member_info[ 'pid' ] ], [ 'status', '=', 1 ] ])->findOrEmpty();
                //当前推荐人是分销商
                if (!$fenxiao->isEmpty()) {
                    //绑定关系
                    ( new FenxiaoMember() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->update([ 'fenxiao_member_id' => $fenxiao[ 'member_id' ], 'bind_time' => time() ]);
                    //绑定上级事件
                    CoreFenxiaoAttrService::memberBindFenxiao($site_id, $fenxiao[ 'member_id' ]);
                }
            }
        }
        //尝试成为分销商
        ( new CoreFenxiaoApplyService() )->autoToFenxiao($site_id, $member_id);
        return true;
    }

    /**
     * 订单创建后执行会员方法
     * @param $site_id
     * @param $data
     */
    public function orderCreate($site_id, $member_id)
    {
        $this->bindRelation($site_id, $member_id, 2);
    }

    /**
     * 订单支付后执行会员方法
     * @param $site_id
     * @param $data
     */
    public function orderPay($site_id, $member_id)
    {
        $this->bindRelation($site_id, $member_id, 3);
    }

    /**
     * 检测会员是否满足分销商申请条件
     * @param int $site_id
     * @param int $member_id
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function checkFenxiaoApply(int $site_id, int $member_id)
    {
        $fenxiao_config = ( new CoreFenxiaoConfigService() )->getFenxiaoConfig($site_id);
        $tag = 0;
        $condition_data = [];
        $condition_data[ 'fenxiao_condition' ] = $fenxiao_config[ 'fenxiao_condition' ];
        $condition_data[ 'consume_count' ] = $fenxiao_config[ 'consume_count' ];
        $condition_data[ 'consume_money' ] = $fenxiao_config[ 'consume_money' ];
        $condition_data[ 'consume_condition' ] = $fenxiao_config[ 'consume_condition' ];

        switch ($fenxiao_config[ 'fenxiao_condition' ]) {
            case 0:
                $tag = 1;
                break;
            case 1:
                // 消费次数
                if ($fenxiao_config[ 'consume_condition' ] == 1)//支付后
                {
                    //查询订单消费次数
                    $count = ( new Order() )->where([ [ 'pay_time', '<>', 0 ], [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->count();
                    $condition_data[ 'order_count' ] = $count;
                    if ($count < $fenxiao_config[ 'consume_count' ]) $tag = 0;
                    else $tag = 1;
                }
                if ($fenxiao_config[ 'consume_condition' ] == 2)//完成后
                {
                    //查询订单消费次数
                    $count = ( new Order() )->where([ [ 'status', '=', OrderDict::FINISH ], [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->count();
                    $condition_data[ 'order_count' ] = $count;
                    if ($count < $fenxiao_config[ 'consume_count' ]) $tag = 0;
                    else $tag = 1;
                }
                break;
            case 2:
                // 消费金额
                if ($fenxiao_config[ 'consume_condition' ] == 1)//支付后
                {
                    //查询订单消费次数
                    $sum = ( new Order() )->where([ [ 'pay_time', '<>', 0 ], [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->sum('order_money');
                    $condition_data[ 'order_sum' ] = $sum;
                    if ($sum < $fenxiao_config[ 'consume_money' ]) $tag = 0;
                    else $tag = 1;
                }
                if ($fenxiao_config[ 'consume_condition' ] == 2)//完成后
                {
                    //查询订单消费次数
                    $sum = ( new Order() )->where([ [ 'status', '=', OrderDict::FINISH ], [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->sum('order_money');
                    $condition_data[ 'order_sum' ] = $sum;
                    if ($sum < $fenxiao_config[ 'consume_money' ]) $tag = 0;
                    else $tag = 1;
                }
                break;
            case 3:
                // 购买指定商品
                $order_list = ( new OrderGoods() )->where([ [ 'member_id', '=', $member_id ], [ 'goods_id', 'in', $fenxiao_config[ 'goods_ids' ] ] ])->field("order_id,member_id,goods_id")->with(
                    [
                        "orderMain" => function ($query) {
                            $query->field("order_id,status,pay_time");
                        }
                    ]
                )->select()->toArray();
                $check = 0;

                $goods_list = ( new Goods() )->where([ [ 'site_id', '=', $site_id ], [ 'goods_id', 'in', $fenxiao_config[ 'goods_ids' ] ] ])
                    ->with([
                        'goods_sku' => function ($item) {
                            $item->withField('goods_id, price, sku_id, sku_name, stock');
                        }
                    ])
                    ->field('goods_id, goods_name, goods_cover, site_id')->append([ 'goods_cover_thumb_mid' ])->select();
                $temp_goods_list = [];
                foreach ($goods_list as $v) {
                    $temp_goods_list[ $v[ 'goods_id' ] ] = $v;
                }
                foreach ($order_list as $k => $v) {
                    if ($fenxiao_config[ 'consume_condition' ] == 1 && $v[ 'orderMain' ][ 'pay_time' ] != 0) {
                        $check = 1;
                        $temp_goods_list[ $v[ 'goods_id' ] ][ 'is_buy' ] = true;
                    }
                    if ($fenxiao_config[ 'consume_condition' ] == 2 && $v[ 'orderMain' ][ 'status' ] == OrderDict::FINISH) {
                        $check = 1;
                        $temp_goods_list[ $v[ 'goods_id' ] ][ 'is_buy' ] = true;
                    }
                }
                $condition_data[ 'goods_list' ] = $temp_goods_list;
                $tag = $check == 1 ? 1 : 0;
                break;
        }
        return [
            'is_allow_apply' => $tag,
            'condition_data' => $condition_data
        ];

    }

    /**
     * 递归获取所有上级
     * 获取分销商上级
     * @param $member_id
     * @return mixed
     */
    public function getAllParentWithLevelList($member_id)
    {
        $parent_list = [];
        $this->getAllParentList($member_id, $parent_list);
        if (!empty($parent_list)) {
            //分销等级
            $level_ids = array_filter(array_unique(array_column($parent_list, 'level_id')));
            $level_list = $level_ids ? ( new FenxiaoLevel() )->where([ [ 'level_id', 'in', $level_ids ] ])->column('*', 'level_id') : [];
            //代理等级
            $agent_level_ids = array_filter(array_unique(array_column($parent_list, 'agent_level')));
            $agent_level_list = $agent_level_ids ? ( new AgentLevel() )->where([ [ 'level_id', 'in', $agent_level_ids ] ])->column('*', 'level_id') : [];
            foreach ($parent_list as &$v) {
                //分销等级
                $v[ 'level_data' ] = $level_list[ $v[ 'level_id' ] ] ?? [];
                //代理等级
                $v[ 'agent_level_data' ] = $agent_level_list[ $v[ 'agent_level' ] ] ?? [];
            }
        }
        return $parent_list ?? [];
    }

    /**
     * 递归获取所有上级(通过传入最下级分销商)
     * @param $member_id
     * @param $list
     * @return true
     */
    public function getAllParentList($member_id, &$list = [])
    {
        if (isset(array_column($list, null, 'member_id')[ $member_id ])) return true;//防无效数据
        $condition = [
            [ 'member_id', '=', $member_id ]
        ];
        $field = 'site_id,fenxiao_no,member_id,level_id,parent,status,is_agent, agent_level, agent_status';
        $fenxiao = ( new Fenxiao() )->where($condition)
            ->field($field)
            ->findOrEmpty();
        if (!$fenxiao->isEmpty()) {
            $list[] = $fenxiao->toArray();
            $parent = $fenxiao[ 'parent' ] ?? 0;
            if ($parent > 0) {
                $this->getAllParentList($parent, $list);
            }
        }
        return true;
    }

    /**
     * 获取分销会员信息
     * @param $site_id
     * @param $member_id
     * @return array|BaseModel|mixed|Model
     */
    public function findFenxiaoMember($site_id, $member_id)
    {
        return ( new FenxiaoMember() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
    }

    /**
     * 修改会员绑定的分销商
     * @param $site_id
     * @param $member_id
     * @param $fenxiao_member_id
     * @return void
     */
    public function modifyBindFenxiao($site_id, $member_id, $fenxiao_member_id)
    {
        //查询会员绑定信息
        $fenxiao_member = ( new FenxiaoMember() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $member_id ] ])->findOrEmpty();
        //如果当前用户已经是分销商或者没有推荐人
        if ($fenxiao_member[ 'is_fenxiao' ] != 0) throw new CommonException('SHOP_FENXIAO_NOT_ALLOW_FENXIAO_BIND');
        $from_fenxiao_member_id = $fenxiao_member[ 'fenxiao_member_id' ];
        if ($from_fenxiao_member_id != 0) {
            if ($from_fenxiao_member_id == $fenxiao_member_id) {
                return true;
            }
        }
        //查询分销商信息
        $fenxiao = ( new Fenxiao() )->where([ [ 'site_id', '=', $site_id ], [ 'member_id', '=', $fenxiao_member_id ], [ 'status', '=', 1 ] ])->findOrEmpty();
        //当前推荐人是分销商
        if (!$fenxiao->isEmpty()) {
            //绑定关系
            $fenxiao_member->save(
                [
                    'fenxiao_member_id' => $fenxiao_member_id,
                    'bind_time' => time()
                ]
            );
            if ($from_fenxiao_member_id != $fenxiao_member_id) {
                //更换绑定分销商事件
                CoreFenxiaoAttrService::modifyMemberBindFenxiao($site_id, $from_fenxiao_member_id, $fenxiao_member_id);
            }
        }
        return true;
    }
}
