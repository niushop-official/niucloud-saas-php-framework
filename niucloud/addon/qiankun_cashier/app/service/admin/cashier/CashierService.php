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

namespace addon\qiankun_cashier\app\service\admin\cashier;

use addon\qiankun_cashier\app\model\cashier\Cashier;
use addon\shop\app\dict\coupon\CouponDict;
use addon\shop\app\dict\goods\GoodsDict;
use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderDiscountDict;
use addon\shop\app\dict\order\OrderGoodsDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\model\cart\Cart;
use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use addon\shop\app\service\core\coupon\CoreCouponMemberService;
use addon\shop\app\service\core\delivery\CoreExpressService;
use addon\shop\app\service\core\delivery\CoreLocalDeliveryService;
use addon\shop\app\service\core\delivery\CoreStoreService;
use addon\shop\app\service\core\goods\CoreGoodsLimitBuyService;
use addon\shop\app\service\core\marketing\CoreManjianService;
use addon\shop\app\service\core\order\CoreOrderConfigService;
use addon\shop\app\service\core\order\CoreOrderDiscountService;
use addon\shop\app\service\core\order\CoreOrderEventService;
use addon\shop\app\service\core\order\CoreOrderPayService;
use app\model\member\Member;
use Exception;
use app\model\member\MemberLevel;
use app\service\core\member\CoreMemberAddressService;
use app\service\core\member\CoreMemberService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;
use think\facade\Db;


/**
 * 收银员服务层
 * Class CashierService
 * @package addon\qiankun_cashier\app\service\admin\cashier
 */
class CashierService extends BaseAdminService
{
    public $member_id;//会员id
    public $form_id; // 万能表单id
    public $site_id; // 万能表单id
    public $param = [];//入参
    public $cart_ids = [];//购物车
    public $buyer = [];//买家信息
    public $basic = [
        'discount_money' => 0,//优惠金额
        'coupon_money'   => 0,//优惠券金额
        'delivery_money' => 0,
        'goods_money'    => 0,
        'order_money'    => 0,
    ];//基本数据处理(整体的数据)
    public $goods_data = [];//商品数据处理
    public $extend_data = [];//活动数据
    public $form_data = [];// 万能表单数据
    public $config = [];//配置集合
    public $discount = [];//优惠整合
    public $gift = [];//赠品集合
    public $gift_goods = [];//赠品商品
    public $limit_buy = [];//限购

    public $delivery = [];//配送相关

    public $order_id;

    public $invoice = [];

    public $order_key;
    public $error = [];

    // use CoreOrderCreateTrait;
    public function __construct()
    {
        parent::__construct();
        $this->model = new Cashier();
    }

    /**
     * 获取收银员列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,user_id,username,nickname,avatar,mobile,status,create_time,update_time';
        $order = 'id desc';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])->withSearch(["id", "user_id", "username", "nickname", "mobile", "status", "create_time", "update_time"], $where)->with(['member'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取收银员信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,user_id,username,nickname,avatar,mobile,status,create_time,update_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加收银员
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
     * 收银员编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除收银员
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

    public function getMemberAll()
    {
        $memberModel = new Member();
        return $memberModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

    /**
     * 定义错误
     * @param $error
     * @return void
     */
    public function setError($error)
    {
        $this->error[] = $error;
    }

    /**
     * 选中收货地址
     * @return void
     */
    public function selectTakeAddress()
    {
        //定义收货地址
        $has_goods_types = $this->basic['has_goods_types'];
        if (in_array(GoodsDict::REAL, $has_goods_types)) {
            if ($this->delivery['delivery_type'] == OrderDeliveryDict::STORE) {
                if (!empty($this->param['delivery']['take_store_id'])) {
                    $this->delivery['take_store'] = (new CoreStoreService())->getInfoById($this->param['delivery']['take_store_id']);
                }
            } else {
                //查询默认收货地址
                if (!empty($this->param['delivery']['take_address_id'])) {
                    $this->delivery['take_address'] = (new CoreMemberAddressService())->getMemberAddressById($this->param['delivery']['take_address_id'], $this->member_id);
                } else {
                    $take_address = (new CoreMemberAddressService())->getDefaultAddressByMemberId($this->member_id);
                    if ($this->delivery['delivery_type'] == OrderDeliveryDict::LOCAL_DELIVERY && empty($take_address['lng'])) {
                        $take_address = (new CoreMemberAddressService())->getLngLatAddressByMemberId($this->member_id);
                    }
                    $this->delivery['take_address'] = $take_address;
                }

                if ($this->delivery['delivery_type'] == OrderDeliveryDict::LOCAL_DELIVERY && !empty($this->delivery['take_address']) && empty($this->delivery['take_address']['lng'])) {
                    $this->setError('SHOP_ORDER_PLEASE_SELECT_DELIVERY_EMPTY_LNG_LAT');//选中的配送方式没有设置经纬度....
                }
            }

        }
        return true;
    }

    /**
     * 获取和计算配送信息和费用
     * @return void
     */
    public function calculateDelivery()
    {
        //配送参数
        $delivery = $this->param['delivery'] ?? [];
        //存在实物商品查询物流信息
        $delivery_type = 'cashier';
        if (!$delivery_type) {
            $this->setError('SHOP_ORDER_PLEASE_SELECT_DELIVERY_TYPE');//没有选中配送方式....
        } else {
            $this->delivery['delivery_type'] = $delivery_type;

            //选中收货地址
            $this->selectTakeAddress();

            switch ($delivery_type) {
                case OrderDeliveryDict::EXPRESS://快递
                    CoreExpressService::calculate($this);
                    break;
                case OrderDeliveryDict::LOCAL_DELIVERY://配送
                    CoreLocalDeliveryService::calculate($this);
                    break;
                case OrderDeliveryDict::STORE://自提
                    CoreStoreService::calculate($this);
                    break;
            }

            if (!empty($this->extend_data) && isset($this->extend_data['delivery_money'])) {
                $this->basic['delivery_money'] = $this->extend_data['delivery_money'];
            } else {
                $this->basic['delivery_money'] = round($this->basic['delivery_money'] ?? 0, 2);
            }

        }

        return true;
    }


    /**
     * 检测限购
     * @return bool
     */
    public function checkGoodsLimitBuy()
    {
        $error = (new CoreGoodsLimitBuyService())->checkGoodsLimitBuy($this->member_id, $this->limit_buy);
        if (!empty($error)) {
            $this->setError($error);
        }
        return true;
    }

    /**
     * 金额计算
     * @return float|int
     */
    public function moneyCalculate()
    {
        $args = func_get_args();
        $money = 0;
        foreach ($args as $v) {
            $money += $v * 100;
        }
        return $money / 100;
    }

    /**
     * 校验库存
     * @param $order_goods_data
     * @return void
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function checkStock($order_goods_data)
    {
        $sku_list = (new GoodsSku())->field('sku_id,goods_id,sku_name,stock')->where([['site_id', '=', $this->site_id], ['sku_id', 'in', array_column($order_goods_data, 'sku_id')]])
            ->with([
                'goods' => function ($query) {
                    $query->field('goods_id,goods_name');
                },
            ])->select()->toArray();

        // todo 赠品库存校验
        $sku_num = [];
        foreach ($order_goods_data as $v) {
            if (isset($sku_num['num_' . $v['sku_id']])) {
                $sku_num['num_' . $v['sku_id']] += $v['num'];
            } else {
                $sku_num['num_' . $v['sku_id']] = $v['num'];
            }
        }

        foreach ($sku_list as $v) {
            $goods_name = count($sku_list) > 1 ? '“' . $v['goods']['goods_name'] . $v['sku_name'] . '”' : '';
            if ($v['stock'] < $sku_num['num_' . $v['sku_id']]) throw new CommonException('商品' . $goods_name . '库存不足');
        }
    }

    /**
     * 配置设置或查询
     * @param $key
     * @return array|mixed
     */
    public function config($key)
    {
        //查询购物配置
        $config = $this->config[$key] ?? [];
        $site_id = $this->param['site_id'];
        if (empty($this->config[$key])) {
            switch ($key) {
                case 'order'://交易配置
                    $config = (new CoreOrderConfigService())->orderClose($site_id) ?? [];
                    break;
                case 'point'://交易配置
                    break;
                case 'delivery_type':
                    $config = (new CoreDeliveryService())->getDeliveryConfig($site_id);
                    break;
                case 'invoice':
                    $config = (new CoreOrderConfigService())->invoice($site_id) ?? [];
                    break;
            }
            $this->config[$key] = $config;
        }
        return $config;
    }

    /**
     * 发票整理
     * @return void
     */
    public function invoice()
    {
        if ($this->config('invoice')) {
            if (!empty($this->param['invoice'])) {
//                $invoive_type  = $this->param['invoice']['type'] ?? '';
                $this->invoice['type'] = $this->param['invoice']['type'] ?? '';
                $this->invoice['name'] = $this->param['invoice']['name'] ?? '';
                $this->invoice['header_type'] = $this->param['invoice']['header_type'] ?? '';
                $this->invoice['header_name'] = $this->param['invoice']['header_name'] ?? '';
                $this->invoice['tax_number'] = $this->param['invoice']['tax_number'] ?? '';
                $this->invoice['mobile'] = $this->param['invoice']['mobile'] ?? '';
                $this->invoice['email'] = $this->param['invoice']['email'] ?? '';
                $this->invoice['telephone'] = $this->param['invoice']['telephone'] ?? '';
                $this->invoice['address'] = $this->param['invoice']['address'] ?? '';
                $this->invoice['bank_name'] = $this->param['invoice']['bank_name'] ?? '';
                $this->invoice['bank_card_number'] = $this->param['invoice']['bank_card_number'] ?? '';
//                $this->invoice['money'] = $this->param['invoice']['money'] ?? '';
            }
        }

    }

    /**
     * 优惠写入
     * @return void
     */
    public function useDiscount()
    {
        $insert_discount_data = [];
        $discount_service = new CoreOrderDiscountService();
        if ($this->discount) {
            foreach ($this->discount as $k => $v) {
                $result = array_values(array_filter(event('ShopOrderDiscountCreate', ['data' => $v, 'order_object' => $this])));
                if (empty($result)) {
                    switch ($k) {
                        case 'coupon':
                            //使用优惠券
                            (new CoreCouponMemberService())->use([
                                'id'       => $v['discount_type_id'],
                                'trade_id' => $this->order_id,
                            ]);
                            break;
                    }
                }
                if (isset($v['discount_type'])) {
                    $insert_discount_data[] = [
                        'type'             => $v['type'],
                        'num'              => $v['num'],
                        'money'            => $v['money'],
                        'discount_type'    => $v['discount_type'],
                        'discount_type_id' => $v['discount_type_id'],
                        'content'          => $v['content'],
                        'order_id'         => $this->order_id,
                        'site_id'          => $this->site_id,
                    ];
                } else {
                    foreach ($v as $vv) {
                        $insert_discount_data[] = [
                            'type'             => $vv['type'],
                            'num'              => $vv['num'],
                            'money'            => $vv['money'],
                            'discount_type'    => $vv['discount_type'],
                            'discount_type_id' => $vv['discount_type_id'],
                            'content'          => $vv['content'],
                            'order_id'         => $this->order_id,
                            'site_id'          => $this->site_id,
                        ];
                    }
                }

            }

            $discount_service->addAll($insert_discount_data);
        }
        return true;
    }

    /**
     * 清除订单缓存
     * @param $order_key
     * @return true
     */
    public function delOrderCache($order_key = '')
    {
        Cache::delete($order_key);
        return true;
    }

    public function createOrder(array $data)
    {
        $order_data = $data['order_data'];
        $order_goods_data = $data['order_goods_data'];
        $order_no = create_no();
        $order_data['order_no'] = $order_no;
        $order_data['order_from'] = $this->param['order_from'];//来源渠道
        $order_data['ip'] = request()->ip();
        $main_type = $data['main_type'] ?? OrderLogDict::MEMBER;
        $main_id = $data['main_id'] ?? $order_data['member_id'];
        $site_id = $order_data['site_id'];

        // 校验整理发票
        $this->invoice();
        Db::startTrans();
        try {
            $order = (new Order())->create($order_data);
            $this->order_id = $order['order_id'];

            // 添加订单项目表
            $order_goods_model = new OrderGoods();
            $order_goods_data = array_map(function ($value) {
                $value['order_goods_money'] = $this->calculateOrderGoodsMoney($value);
                return $value;
            }, $order_goods_data);
            $order_goods_model->insertAll($order_goods_data);

            // 优惠项
            $this->useDiscount();

            // 添加万能表单
            // $this->addFormData($this->order_id);

            $order_data['order_id'] = $this->order_id;

            // 订单创建后事件
            CoreOrderEventService::orderCreate(['site_id' => $site_id, 'order_id' => $this->order_id, 'order_data' => $order_data, 'order_goods_data' => $order_goods_data, 'cart_ids' => $this->cart_ids, 'basic' => get_object_vars($this), 'main_type' => $main_type, 'main_id' => $main_id, 'time' => time()]);

            Db::commit();

            // 删除订单缓存
            $this->delOrderCache($this->order_key);

            // 订单创建后事件
            CoreOrderEventService::orderCreateAfter(['site_id' => $site_id, 'order_id' => $this->order_id, 'order_data' => $order_data, 'order_goods_data' => $order_goods_data, 'cart_ids' => $this->cart_ids, 'basic' => get_object_vars($this), 'main_type' => $main_type, 'main_id' => $main_id, 'time' => time()]);
//            event('AfterShopOrderCreate', ['site_id' => $site_id, 'order_id' => $this->order_id, 'order_data' => $order_data, 'order_goods_data' => $order_goods_data, 'cart_ids' => $this->cart_ids, 'basic' => get_object_vars($this), 'main_type' => $main_type, 'main_id' => $main_id, 'time' => time()]);

            // 订单金额为0的话,要直接支付
            if ($order_data['order_money'] == 0) {
                (new CoreOrderPayService())->pay(['site_id' => $site_id, 'trade_id' => $this->order_id, 'main_type' => $main_type, 'main_id' => $main_id]);
            }

            return [
                'trade_type' => $order_data['order_type'],
                'order_id'   => $this->order_id,
            ];

        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单创建
     * @param array $data
     * @return array
     */
    public function create(array $data)
    {
        $this->param = $data;

        $order_key = $data['order_key'] ?? '';
        //获取订单缓存缓存
        $this->getOrderCache($order_key);

        $this->goods_data = array_merge($this->goods_data, $this->gift_goods);
        //校验错误
        //普通订单校验库存
        $this->checkStock($this->goods_data);

        $order_data = [
            //订单整体
            'site_id'            => $data['site_id'],
            'order_type'         => OrderDict::TYPE,
            'status'             => OrderDict::WAIT_PAY,
            'body'               => $this->basic['body'],
            'member_id'          => $this->member_id,
            'goods_money'        => $this->basic['goods_money'],
            'delivery_money'     => $this->basic['delivery_money'] ?? 0,
            'discount_money'     => $this->basic['discount_money'] ?? 0,
            'order_money'        => $this->basic['order_money'],
            'has_goods_types'    => $this->basic['has_goods_types'],//包含的商品形式
            //            'invoice_id' => $order_array['invoice_id'] ?? 0,

            //收发货相关
            'delivery_type'      => $this->delivery['delivery_type'] ?? '',
            'taker_name'         => $this->delivery['take_address']['name'] ?? '',
            'taker_mobile'       => $this->delivery['take_address']['mobile'] ?? '',
            'taker_province'     => $this->delivery['take_address']['province_id'] ?? 0,
            'taker_city'         => $this->delivery['take_address']['city_id'] ?? 0,
            'taker_district'     => $this->delivery['take_address']['district_id'] ?? 0,
            'taker_address'      => $this->delivery['take_address']['address'] ?? '',
            'taker_full_address' => $this->delivery['take_address']['full_address'] ?? '',
            'taker_longitude'    => $this->delivery['take_address']['lng'] ?? '',
            'taker_latitude'     => $this->delivery['take_address']['lat'] ?? '',
            'take_store_id'      => $this->delivery['take_store']['store_id'] ?? 0,

            // 附属信息
            'member_remark'      => $this->param['member_remark'] ?? '',//买家留言
            'shop_remark'        => $this->param['shop_remark'] ?? '',//买家留言
            'relate_id'          => $this->extend_data['relate_id'] ?? 0,//关联id
            'activity_type'      => $this->extend_data['activity_type'] ?? '', // 活动类型

        ];

        //总项
        $order_goods_data = [];
        foreach ($this->goods_data as $v) {
            $order_goods_data[] = [
                'site_id'        => $data['site_id'],
                'member_id'      => $data['member_id'],
                'goods_id'       => $v['goods_id'],
                'sku_id'         => $v['sku_id'],
                'goods_name'     => $v['goods']['goods_name'],
                'sku_name'       => $v['sku_name'],
                'goods_image'    => $v['goods']['goods_cover'],
                'sku_image'      => $v['sku_image'],
                'price'          => $v['price'],
                'original_price' => $v['original_price'] ?? 0,
                'num'            => $v['num'],
                'goods_money'    => $v['goods_money'],
                'goods_type'     => $v['goods']['goods_type'],
                'order_id'       => &$this->order_id,
                'discount_money' => $v['discount_money'] ?? 0,
                'status'         => OrderGoodsDict::NORMAL,
                'extend'         => $v['extend'] ?? '',
                'is_gift'        => $v['is_gift'] ?? 0,
            ];
        }
        $create_order_data = [
            'order_data'       => $order_data,
            'order_goods_data' => $order_goods_data,
        ];
        return $this->createOrder($create_order_data);
    }

    /**
     * 整理
     * @param array $data
     * @return array
     */
    public function calculate(array $data)
    {
        //参数赋值
        // $this->setParam($data);
        $this->param = $data;
        $this->order_key = $this->param['order_key'] ?? '';
        if (empty($this->order_key)) {
            $this->confirm($data);
        }
        //获取订单数据的缓存
        $this->getOrderCache($this->order_key . '_basic');
        //计算优惠和营销
        $this->calculateDiscount();
        $this->setOrderCache($this->order_key);
        //计算运费
        $this->calculateDelivery();
        //检测限购
        $this->checkGoodsLimitBuy();

        //金额格式化
        $discount_money = $this->moneyFormat($this->basic['discount_money'] ?? 0);//优惠金额
        $delivery_money = $this->moneyFormat($this->basic['delivery_money'] ?? 0);
        $goods_money = $this->moneyFormat($this->basic['goods_money'] ?? 0);

        $order_money = $this->moneyFormat($this->moneyCalculate($delivery_money, $goods_money, -$discount_money));
        $this->basic['discount_money'] = $discount_money;
        $this->basic['delivery_money'] = $delivery_money;
        $this->basic['goods_money'] = $goods_money;
        //todo 校验控制,不能小于0
        $order_money = $order_money < 0 ? 0 : $order_money;
        $this->basic['order_money'] = $order_money;
        // 手动改价
        $this->changeMoney();
//        $this->basic['pay_money'] = $this->basic['pay_money'] ?? $order_money;
        //订单创建数据写入缓存,并将标识返回给前端
        $order_cache = get_object_vars($this);
        unset($order_cache['param']);
        $this->setOrderCache($this->order_key, $order_cache);
        return $order_cache;
    }

    /**
     * 订单确认(基础信息查询并缓存)
     * @return array|mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function confirm($data)
    {
        //查看会员信息
        $member_id = $this->param['member_id'];
        $this->member_id = $member_id;
        if ($member_id > 0) {
            $member_info = (new CoreMemberService())->getInfoByMemberId($this->site_id, $member_id, 'nickname, headimg, balance, point, member_level');
        }
        if (empty($member_info)) {
            $member_info = [
                'balance'      => "0.00",
                'headimg'      => "",
                'member_level' => [],
                'nickname'     => "匿名用户",
                'point'        => 0,
            ];
        } else {
            // 查询会员等级信息
            $member_info['member_level'] = (new MemberLevel())->where([['level_id', '=', $member_info['member_level']]])->field('site_id,level_id,level_benefits')->findOrEmpty()->toArray();
        }

        //会员账户信息
        $this->buyer = $member_info;

        $order_config = (new CoreOrderConfigService())->getConfig($data['site_id']) ?? [];
        $this->form_id = $order_config['form_id'];

        //查询商品信息
        $this->getGoodsData($data);

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
     * 设置订单缓存
     * @return string
     * @throws Exception
     */
    public function setOrderCache($order_key = '', $order_cache = [])
    {
        if (empty($order_key)) {
            $order_key = create_no('', $this->member_id);
        }
        Cache::tag('order_cache')->set($order_key, $order_cache, 300000);
        return $order_key;
    }


    /**
     * 计算优惠
     * @return void
     */
    public function calculateDiscount()
    {
        //查询积分优惠
        // $this->getPoint();
        //满减送优惠计算
        $this->calculateManjian();
        //查询可用优惠券
        $this->calculateCoupon();
    }

    /**
     * 计算订单项金额
     * @param $goods
     * @return mixed
     */
    public function calculateOrderGoodsMoney($goods)
    {
        $goods_money = $goods['goods_money'];
        $discount_money = $goods['discount_money'] ?? 0;
        return $goods_money - $discount_money;
    }

    /**
     * 优惠券计算
     * @return void
     */
    public function calculateCoupon()
    {
        $coupon_id = $this->param['discount']['coupon_id'] ?? 0;//使用优惠券id

        if ($coupon_id > 0) {
            $coupon_data = (new CoreCouponMemberService())->getUseCouponById($coupon_id);
            if (empty($coupon_data)) throw new CommonException('SHOP_ORDER_COUPON_EXPIRE_OR_NOT_FOUND');//优惠券已使用或不存在

            $time = time();
            if ($time > strtotime($coupon_data['expire_time'])) {
                throw new CommonException('SHOP_ORDER_COUPON_EXPIRE');//优惠券已使用或不存在
            }
            $type = (int)$coupon_data['type'];
            $goods_data = $coupon_data['goods'];
            $min_condition_money = $coupon_data['min_condition_money'];
            $match_order_goods_money = 0;
            switch ($type) {
                case CouponDict::ALL:
                    //匹配的商品
                    $match_goods_list = $this->goods_data;
                    $match_goods_money = $this->basic['goods_money'];
                    $match_order_goods_money = $this->basic['goods_money'] - $this->basic['discount_money'];
                    break;
                case CouponDict::CATEGORY:
                    $category_ids = array_column($goods_data, 'category_id');
                    //匹配的商品
                    $match_goods_list = [];
                    $match_goods_money = 0;
                    foreach ($this->goods_data as $goods_v) {
                        $item_goods_category = $goods_v['goods']['goods_category'];//商品分类数组
                        if (!empty(array_intersect($category_ids, $item_goods_category))) {
                            $match_goods_list[] = $goods_v;
                            $match_goods_money += $goods_v['goods_money'];
                            $match_order_goods_money += $this->calculateOrderGoodsMoney($goods_v);
                        }
                    }
                    break;
                case CouponDict::GOODS:
                    $goods_ids = array_column($goods_data, 'goods_id');
                    //匹配的商品
                    $match_goods_list = [];
                    $match_goods_money = 0;
                    foreach ($this->goods_data as $goods_v) {
                        if (in_array($goods_v['goods_id'], $goods_ids)) {
                            $match_goods_list[] = $goods_v;
                            $match_goods_money += $goods_v['goods_money'];
                            $match_order_goods_money += $this->calculateOrderGoodsMoney($goods_v);
                        }
                    }

                    break;
            }
            if (empty($match_goods_list)) {
                $this->setError(get_lang('SHOP_ORDER_COUPON_NOT_SUPPORT_GOODS'));//没有支持可用的商品
            } else {
                if ($match_goods_money < $min_condition_money) {
                    $this->setError(get_lang('SHOP_ORDER_COUPON_NOT_SUPPORT_MIN_MONEY'));//没有达到商品最低使用条件
                } else {
                    $coupon_money = $coupon_data['price'];
                    if ($coupon_money > $match_order_goods_money) {
                        $coupon_money = $match_order_goods_money;
                    }
                    $surplus_money = $coupon_money;
                    $match_goods_list = array_values($match_goods_list);
                    $match_goods_list = array_filter($match_goods_list, function ($item) {
                        return ($item['goods_money'] - $item['discount_money']) != 0;
                    });
                    $match_count = count($match_goods_list);
                    //根据商品金额计算个订单项享受的优惠
                    foreach ($match_goods_list as $k => $v) {
                        $item_order_goods_money = $this->calculateOrderGoodsMoney($v);
                        $item_sku_id = $v['sku_id'];
                        if ($k == ($match_count - 1)) {
                            $item_coupon_money = $surplus_money;
                        } else {
                            if ($match_order_goods_money == 0 || $coupon_money == 0) {
                                $item_coupon_money = 0;
                            } else {
                                $item_coupon_money = $this->moneyFormat($item_order_goods_money / $match_order_goods_money * $coupon_money);
                                if ($item_coupon_money == 0) {
                                    $item_coupon_money = $item_order_goods_money;
                                }
                                if ($item_coupon_money > $surplus_money) {
                                    $item_coupon_money = $surplus_money;
                                }
                            }
                        }

                        $this->goods_data[$item_sku_id]['discount_money'] += $item_coupon_money;
//                        $this->goods_data[$item_sku_id]['order_goods_money'] = $this->calculateOrderGoodsMoney($this->goods_data[$item_sku_id]);

                        $surplus_money = bcsub($surplus_money, $item_coupon_money, 2);
                    }
                    //优惠累增
                    $this->basic['discount_money'] += $coupon_money;
                    $this->basic['coupon_money'] += $coupon_money;
//                    $discount_money = $this->basic['discount']['discount_money'];
                    $this->discount['coupon'] = $this->discountFormat(
                        array_column($match_goods_list, 'sku_id'),
                        OrderDiscountDict::DISCOUNT,
                        1,
                        $coupon_money,
                        'coupon',
                        $coupon_id,
                        '',
                        $coupon_data['title']
                    );
                }
            }

        }

    }

    /**
     * 优惠项格式
     * @param $match_goods_ids
     * @param $type
     * @param $num
     * @param $money
     * @param $discount_type
     * @param $discount_type_id
     * @param $content
     * @return array
     */
    public function discountFormat($match_goods_ids, $type, $num, $money, $discount_type, $discount_type_id, $content, $title = '')
    {
        return [
            'match_goods_ids'  => $match_goods_ids,
            'type'             => $type,
            'num'              => $num,
            'money'            => $money,
            'discount_type'    => $discount_type,
            'discount_type_id' => $discount_type_id,
            'content'          => $content,
            'title'            => $title,
        ];
    }

    /**
     * 金额格式化
     * @param $money
     * @return float|int
     */
    public function moneyFormat($money)
    {

        return floor(strval(($money) * 100)) / 100;
    }

    /**
     * 满减送优惠计算
     * @return void
     */
    public function calculateManjian()
    {
        (new CoreManjianService())->calculate($this);
    }

    /**
     * 手动改价
     * @return void
     */
    public function changeMoney()
    {
        if ($this->param['changed_price'] > 0 && $this->param['changed_price'] != $this->basic['goods_money']) {
            $this->basic['chang_discount_money'] = bcsub($this->basic['order_money'], $this->param['changed_price'], 2);
            $this->basic['order_money'] = $this->param['changed_price'];
            // var_dump($this->basic['discount_money']);
            $this->basic['discount_money'] = bcadd($this->basic['discount_money'], $this->basic['chang_discount_money'], 2);
        }
    }

    /**
     * 获取订单缓存
     * @param $order_key
     * @return void
     */
    public function getOrderCache($order_key)
    {

        $order_cache = Cache::get($order_key, []);
        if (empty($order_cache))
            throw new CommonException('SHOP_ORDER_CARTS_EXPIRE');//购物车数据已过期
        foreach ($order_cache as $k => $v) {
            $this->$k = $v;
        }

        return true;
    }

    /**
     * 商品相关数据
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getGoodsData($data)
    {
        $cart_ids = $this->param['cart_ids'] ?? [];
        $this->extend_data = $this->param['extend_data'] ?? []; //活动扩展数据：[ 'relate_id' => 1, 'activity_type' => 'giftcard' ]
        if (!empty($cart_ids)) {
            $this->cart_ids = $cart_ids;
            //查询购物车
            $cart = (new Cart())->where([['id', 'in', $cart_ids], ['site_id', '=', $data['site_id']]])->field('goods_id, site_id, sku_id, num, market_type, market_type_id')->select();
            if ($cart->isEmpty()) throw new CommonException('SHOP_ORDER_CARTS_EXPIRE');//无效的数据
            if ($cart->count() != count($cart_ids)) throw new CommonException('SHOP_ORDER_CARTS_EXPIRE');//无效的商品
            $sku_data = $cart->toArray();
        } else {
            $sku_data = $this->param['sku_data'] ?? [];
            if (empty($sku_data)) throw new CommonException('SHOP_ORDER_CARTS_EXPIRE');//无效的数据
        }
        $sku_ids = array_column($sku_data, 'sku_id');
        $sku_condition = [
            ['sku_id', 'in', $sku_ids],
            ['site_id', '=', $data['site_id']],
        ];
        $sku_list = (new  GoodsSku())->where($sku_condition)->with(['goods'])->field('sku_id, site_id, sku_name, sku_image, goods_id, price, stock, weight, volume,sku_id, sku_spec_format,member_price, sale_price')->select()->toArray();
        $sku_list = array_column($sku_list, null, 'sku_id');
        //商品数据  查询商品列表

        $order_data = [];
        $goods_list = [];
        $order_money = $goods_money = $delivery_money = 0;
        $total_num = 0;
        $body = '';
        //订单中包含的商品形式
        $has_goods_types = [];
        foreach ($sku_data as $v) {
            $sku_id = $v['sku_id'];
            $num = $v['num'];
            $total_num += $num;
            $market_type = $v['market_type'] ?? '';
            $market_type_id = $v['market_type_id'] ?? 0;
            $sku_info = $sku_list[$sku_id] ?? [];
            if (empty($sku_info)) throw new CommonException('SHOP_ORDER_CARTS_EXPIRE');//无效的商品

            //商品原价
            $sku_info['original_price'] = $sku_info['price'];

            // 计算会员价
            $sku_info['price'] = $this->getMemberPrice($sku_info);
            $sku_info['member_price'] = $sku_info['price'];

            //默认金额填充
            $sku_info['discount_money'] = 0;
            $item_goods_type = $sku_info['goods']['goods_type'];

            // 商品限购处理
            if (isset($this->limit_buy['goods_' . $sku_info['goods_id']])) {
                $this->limit_buy['goods_' . $sku_info['goods_id']]['num'] += $num;
            } else {
                $this->limit_buy['goods_' . $sku_info['goods_id']] = [
                    'goods_id'   => $sku_info['goods_id'],
                    'site_id'    => $sku_info['site_id'],
                    'goods_name' => $sku_info['goods']['goods_name'],
                    'stock'      => $sku_info['goods']['stock'],
                    'num'        => $num,
                    'is_limit'   => $sku_info['goods']['is_limit'],
                    'limit_type' => $sku_info['goods']['limit_type'],
                    'max_buy'    => $sku_info['goods']['max_buy'],
                    'min_buy'    => $sku_info['goods']['min_buy'],
                ];
            }

            if (!in_array($item_goods_type, $has_goods_types)) $has_goods_types[] = $item_goods_type;

            $sku_info['num'] = $num;
            $sku_info['market_type'] = $market_type;//活动类型
            $sku_info['market_type_id'] = $market_type_id;//活动id

            //活动操纵数据  market_data 活动信息
            $temp = [];
            $temp_list = array_filter(event('ShopGoodsMarketCalculate', [
                'sku_info'  => $sku_info,
                'sku_data'  => $sku_data,
                'order_obj' => $this,
            ]));

            foreach ($temp_list as $item) {
                if (!empty($item)) $temp = $item;
            }
            if (!empty($temp)) {
                $sku_info = $temp['sku_info'];
                if (!empty($this->extend_data)) {
                    $this->extend_data['relate_id'] = $temp['relate_id'] ?? 0;
                    $this->extend_data['activity_type'] = $temp['activity_type'] ?? '';

                    // 目前礼品卡用到
                    if (!empty($temp['basic']) && isset($temp['basic']['delivery_money'])) {
                        $this->extend_data['delivery_money'] = $temp['basic']['delivery_money'];
                    }
                }
            } else {
                $price = $sku_info['price'];
                $sku_info['goods_money'] = $price * $num;//小计
            }
            $goods_money += $sku_info['goods_money'];

            $goods_list[$sku_id] = $sku_info;
            $body = $body ? $body . ($sku_info['sku_name'] . $sku_info['goods']['goods_name']) : ($sku_info['sku_name'] . $sku_info['goods']['goods_name']);
        }
        $this->basic['has_goods_types'] = $has_goods_types;
        $this->basic['total_num'] = $total_num;
        $this->goods_data = $goods_list;
        $this->basic['goods_money'] = $goods_money;
        $this->basic['body'] = $body;

        return $order_data;
    }

    /**
     * 获取商品的会员价
     * @param $sku_info
     * @return string
     */
    public function getMemberPrice($sku_info)
    {
        if (empty($sku_info['goods']['member_discount'])) {
            return $sku_info['price'];
        }

        // 没有会员等级，排除
        if (empty($this->buyer['member_level'])) {
            return $sku_info['price'];
        }

        $price = $sku_info['price'];

        if ($sku_info['goods']['member_discount'] == 'discount') {
            // 按照会员等级折扣计算

            // 默认按会员享受折扣计算
            if (isset($this->buyer['member_level']['level_benefits'])
                && isset($this->buyer['member_level']['level_benefits']['discount'])
                && $this->buyer['member_level']['level_benefits']['discount']['is_use']) {

                $price = number_format($price * $this->buyer['member_level']['level_benefits']['discount']['discount'] / 10, 2, '.', '');
            }

        } elseif ($sku_info['goods']['member_discount'] == 'fixed_price') {
            // 指定会员价
            if (!empty($sku_info['member_price'])) {
                $sku_info['member_price'] = json_decode($sku_info['member_price'], true);
                if (!empty($sku_info['member_price']['level_' . $this->buyer['member_level']['level_id']])) {
                    $member_level_price = $sku_info['member_price']['level_' . $this->buyer['member_level']['level_id']];
                    $price = number_format($member_level_price, 2, '.', '');
                }
            }
        }

        return $price;
    }

    public function getOrder($orderId): Order
    {
        return (new Order())->where('order_id', $orderId)->findOrEmpty();
    }
}
