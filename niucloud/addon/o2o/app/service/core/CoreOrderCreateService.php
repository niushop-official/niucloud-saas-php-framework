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

namespace addon\o2o\app\service\core;

use addon\o2o\app\dict\GoodsDict;
use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\model\GoodsSku;
use addon\o2o\app\model\Order;
use app\model\member\MemberLevel;
use app\service\core\member\CoreMemberService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 *  订单服务层
 */
class CoreOrderCreateService extends BaseCoreService
{

    use CoreOrderCreateTrait;

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单创建
     * @param array $data
     * @return array
     */
    public function create(array $data)
    {
        //参数赋值
        $this->setParam($data);
        $order_key = $this->param['order_key'] ?? '';
        //获取订单缓存缓存
        $this->getOrderCache($order_key);
        //校验错误
        $this->checkError();
        $order_data = [
            //订单整体
            'site_id' => $data['site_id'],
            'order_type' => OrderDict::ORDER_TYPE_ORDER,
            'order_status' => OrderDict::WAIT_PAY,
            'order_name' => $this->basic['order_name'],
            'member_id' => $this->member_id,
            'goods_money' => $this->basic['goods_money'],
            'order_money' => $this->basic['order_money'],
            'pay_money' => $this->basic['pay_money'],

            //地址相关
            'taker_name' => $this->delivery['take_address']['name'] ?? '',
            'taker_mobile' => $this->delivery['take_address']['mobile'] ?? '',
            'taker_province' => $this->delivery['take_address']['province_id'] ?? 0,
            'taker_city' => $this->delivery['take_address']['city_id'] ?? 0,
            'taker_district' => $this->delivery['take_address']['district_id'] ?? 0,
            'taker_address' => $this->delivery['take_address']['address'] ?? '',
            'taker_full_address' => $this->delivery['take_address']['full_address'] ?? '',
            'taker_longitude' => $this->delivery['take_address']['lng'] ?? '',
            'taker_latitude' => $this->delivery['take_address']['lat'] ?? '',
            //附属信息
            'member_message' => $this->param['member_remark'] ?? '',//买家留言
            'technician_id' => $this->param['technician_id'] ?? 0,//技师
            'reserve_service_time' => $this->param['reserve_service_time'] ?? '',//希望服务时间
            'create_time' => time(),
            'reserve_service_time_stamp' => $this->param['reserve_service_time_stamp'] ?? 0
        ];

        $order_goods_data = [];
        foreach ($this->goods_data as $v) {
            $order_goods_data[] = [
                'site_id' => $data['site_id'],
                'member_id' => $data['member_id'],
                'item_type' => $v['goods']['buy_type'],
                'goods_id' => $v['goods_id'],
                'item_id' => $v['sku_id'],
                'item_name' => $v['sku_name'],
                'item_image' => $v['sku_image'],
                'price' => $v['price'],
                'num' => $v['num'],
                'unit' => $v['sku_unit'],
                'item_money' => $v['goods_money'],
                'order_id' => &$this->order_id,
                'technician_id' => $order_data['technician_id'] ?? 0,
                'is_enable_refund' => $v['goods']['after_sales'] ? 0 : 1,
            ];
        }
        $create_order_data = array(
            'order_data' => $order_data,
            'order_goods_data' => $order_goods_data,
        );
        return $this->createOrder($create_order_data);
    }

    /**
     * 整理
     * @param array $data
     * @return void
     */
    public function calculate(array $data)
    {
        //参数赋值
        $this->setParam($data);
        $this->order_key = $this->param['order_key'] ?? '';
        if (empty($this->order_key)) {
            $this->confirm();
        }
        //获取订单数据的缓存
        $this->getOrderCache($this->order_key . '_basic');
        //计算优惠和营销
        $this->calculateDiscount();
        $this->setOrderCache($this->order_key);
        //服务地址
        $this->selectTakeAddress();
        //服务技师
        $this->selectTechnician();


        //金额格式化
        $discount_money = $this->moneyFormat($this->basic['discount_money'] ?? 0);//优惠金额
        $goods_money = $this->moneyFormat($this->basic['goods_money'] ?? 0);
        $order_money = $this->moneyFormat($goods_money - $discount_money);
        $this->basic['discount_money'] = $discount_money;
        $this->basic['goods_money'] = $goods_money;
        // 校验控制,不能小于0
        $order_money = $order_money < 0 ? 0 : $order_money;
        $this->basic['order_money'] = $order_money;
        $this->basic['pay_money'] = $order_money;
        //订单创建数据写入缓存,并将标识返回给前端
        $order_cache = get_object_vars($this);
        unset($order_cache['param']);
        $this->setOrderCache($this->order_key, $order_cache);
        return $order_cache;
    }

    /**
     * 订单确认(基础信息查询并缓存)
     * @param array $data
     * @return array|mixed
     */
    public function confirm()
    {
        //查看会员信息
        $member_id = $this->param['member_id'];
        $this->member_id = $member_id;
        $member_info = (new CoreMemberService())->getInfoByMemberId($this->site_id, $member_id, 'nickname, point, member_level');

        if (empty($member_info)) throw new CommonException('O2O_ORDER_BUYER_NOT_FOUND');//无效的账号

        // 查询会员等级信息
        $member_info[ 'member_level' ] = ( new MemberLevel() )->where([ [ 'level_id', '=', $member_info[ 'member_level' ] ] ])->field('site_id,level_id,level_benefits')->findOrEmpty()->toArray() ?? [];

        //会员账户信息
        $this->buyer = $member_info;
        //查询商品信息
        $this->getGoodsData();

        $order_cache = get_object_vars($this);
        unset($order_cache['param']);
        unset($order_cache['order_key']);
        $order_key = $this->setOrderCache('', $order_cache);
        //将基础订单数据单独存放一个缓存
        $order_basic_key = $order_key . '_basic';
        $this->setOrderCache($order_basic_key, $order_cache);

        $this->order_key = $order_key;

        return true;
    }

    /**
     * 商品相关数据
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getGoodsData()
    {

        $sku_id = $this->param['sku']['sku_id'] ?? 0;
        $sku_info = (new  GoodsSku())->where([ ['sku_id', '=', $sku_id], ['site_id', '=', $this->site_id] ])->with(['goods'])->field('sku_id, site_id, sku_name, sku_image, goods_id, price,sku_unit,min_buy,member_price')->findOrEmpty()->toArray();
        if (empty($sku_info)) throw new CommonException('O2O_GOODS_NOT_EXIST');//无效的数据
        if($sku_info['sku_name'] != $sku_info['goods']['goods_name']) $sku_info['sku_name'] = $sku_info['goods']['goods_name'].' '.$sku_info['sku_name'];

        if($sku_info['goods']['status'] != GoodsDict::UP) throw new CommonException('O2O_GOODS_NOT_EXIST');//无效的数据
        $goods_list = [];
        $total_num = $num = $this->param['sku']['num'] ?? 1;

        if($num < $sku_info['min_buy']) $this->setError('购买数量不能小于'.$sku_info['min_buy'].$sku_info['sku_unit']);

        //默认金额填充
        $sku_info['discount_money'] = 0;
        $sku_info['num'] = $num;
        $sku_info['price'] = $this->getMemberPrice($sku_info);

        $price = $sku_info['price'];
        $sku_info['goods_money'] = $price * $num;//小计
        $goods_money = $sku_info['goods_money'];
        $goods_list[$sku_info['sku_id']] = $sku_info;
        $this->basic['total_num'] = $total_num;
        $this->goods_data = $goods_list;
        $this->basic['goods_money'] = $goods_money;
        $this->basic['body'] = $sku_info['sku_name'];
        $this->basic['order_name'] = $sku_info['sku_name'];
    }

    /**
     * 获取商品的会员价
     * @param $sku_info
     * @return string
     */
    public function getMemberPrice($sku_info)
    {
        if (empty($sku_info[ 'goods' ][ 'member_discount' ]) || $sku_info[ 'goods' ]['buy_type'] != GoodsDict::BUY) {
            return $sku_info[ 'price' ];
        }

        // 没有会员等级，排除
        if (empty($this->buyer[ 'member_level' ])) {
            return $sku_info[ 'price' ];
        }

        $price = $sku_info[ 'price' ];

        if ($sku_info[ 'goods' ][ 'member_discount' ] == 'discount') {
            // 按照会员等级折扣计算

            // 默认按会员享受折扣计算
            if (isset($this->buyer[ 'member_level' ][ 'level_benefits' ])
                && isset($this->buyer[ 'member_level' ][ 'level_benefits' ][ 'discount' ])
                && $this->buyer[ 'member_level' ][ 'level_benefits' ][ 'discount' ][ 'is_use' ]) {

                $price = number_format($price * $this->buyer[ 'member_level' ][ 'level_benefits' ][ 'discount' ][ 'discount' ] / 10, 2, '.', '');
            }

        } elseif ($sku_info[ 'goods' ][ 'member_discount' ] == 'fixed_price') {
            // 指定会员价
            if (!empty($sku_info[ 'member_price' ])) {
                $sku_info[ 'member_price' ] = json_decode($sku_info[ 'member_price' ], true);
                if (!empty($sku_info[ 'member_price' ][ 'level_' . $this->buyer[ 'member_level' ][ 'level_id' ] ])) {
                    $member_level_price = $sku_info[ 'member_price' ][ 'level_' . $this->buyer[ 'member_level' ][ 'level_id' ] ];
                    $price = number_format($member_level_price, 2, '.', '');
                }
            }
        }

        return $price;
    }


}
