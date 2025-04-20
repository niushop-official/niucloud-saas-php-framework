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

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\job\AfterO2oOrderCreate;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use app\service\core\member\CoreMemberAddressService;
use core\exception\CommonException;
use Exception;
use think\facade\Cache;
use think\facade\Db;

/**
 *  订单服务层
 */
trait CoreOrderCreateTrait
{
    public $member_id;//会员id
    public $site_id; // 站点id
    public $param = [];//入参
    public $cart_ids = [];//购物车
    public $buyer = [];//买家信息
    public $delivery = [];//地址
    public $basic = [
        'discount_money' => 0,//优惠金额
        'goods_money' => 0,
        'order_money' => 0
    ];//基本数据处理(整体的数据)
    public $goods_data = [];//商品数据处理
    public $config = [];//配置集合
    public $discount = [];//优惠整合

    public $order_id;

    public $invoice = [];

    public $order_key;
    public $error = [];

    public function createOrder(array $data)
    {
        $order_data = $data['order_data'];
        $order_goods_data = $data['order_goods_data'];
        $order_no = create_no();
        $order_data['order_no'] = $order_no;
        $order_data['order_from'] = $this->param['order_from'];//来源渠道
        $order_data['ip'] = request()->ip();

        $site_id = $order_data['site_id'];
        //校验整理发票
        $this->invoice();
        Db::startTrans();
        try {
            $order = (new Order())->create($order_data);
            $this->order_id = $order['order_id'];
            //添加订单项目表
            $order_goods_model = new OrderItem();

            $order_goods_model->insertAll($order_goods_data);
            //优惠项
            $this->useDiscount();

            //删除订单缓存
            $this->delOrderCache($this->order_key);
            $order_data['order_id'] = $this->order_id;

            //订单金额为0的话,要直接支付
            if ($order_data['order_money'] == 0) {
                (new CoreOrderPayService())->pay(['site_id' => $site_id, 'trade_id' => $this->order_id]);
            }
            Db::commit();

            //订单创建后事件
            AfterO2oOrderCreate::dispatch(['site_id' => $site_id, 'order_id' => $order_data['order_id'],'order_data' => $order_data, 'order_goods_data' => $order_goods_data, 'cart_ids' => $this->cart_ids, 'time' => time() ], secs:10);
            return [
                'order_id' => $this->order_id,
                'trade_type' => $order_data['order_type'],
            ];

        } catch ( Exception $e ) {
            Db::rollback();
            throw new CommonException($e->getFile() . $e->getLine() . $e->getMessage());
        }
    }

    /**
     * 发票整理
     * @return void
     */
    public function invoice()
    {}

    /**
     * 配置设置或查询
     * @param $key
     */
    public function config($key)
    {
        return [];
    }

    /**
     * 优惠写入
     * @return void
     */
    public function useDiscount()
    {
        return true;
    }


    /**
     * 获取参数
     * @param $key
     * @param $default
     * @return mixed|string
     */
    public function param($key, $default = '')
    {
        return $this->param[$key] ?? $default;
    }

    /**
     * 订单优惠
     * @return void
     */
    public function getDiscount()
    {
        //查询可用优惠券
        $this->getCoupon();
    }

    /**
     * 获取有效的优惠券
     * @param $data
     * @return void
     */
    public function getCoupon($data)
    {}

    /**
     * 给传参
     * @param $param
     * @return true
     */
    public function setParam($param)
    {
        $this->param = $param;
        $this->site_id = $param['site_id'];
        return true;
    }


    /**
     * 计算优惠
     * @return void
     */
    public function calculateDiscount()
    {

        //查询可用优惠券
        $this->calculateCoupon();
    }

    /**
     * 优惠券计算
     * @return void
     */
    public function calculateCoupon()
    {}


    /**
     * 使用优惠券
     * @param $data
     * @return void
     */
    public function useCoupon($data)
    {}

    /**
     * 选中地址
     * @return void
     */
    public function selectTakeAddress()
    {
        //查询默认收货地址
        if (!empty($this->param['delivery']['take_address_id'])) {
            $this->delivery['take_address'] = (new CoreMemberAddressService())->getMemberAddressById($this->param['delivery']['take_address_id'], $this->member_id);
        } else {
            $this->delivery['take_address'] = (new CoreMemberAddressService())->getDefaultAddressByMemberId($this->member_id);
        }
        if (empty($this->delivery['take_address'])) {
            $this->error[] = get_lang('O2O_NOT_SELECT_ADDRESS');
            return;
        }

        return true;
    }

    /**
     * 选中技师
     * @return void
     */
    public function selectTechnician()
    {
        //查询选中技师当前时间端是否空闲
        $technician_id = $this->param('technician_id');
        $reserve_service_time = $this->param('reserve_service_time');
        if (!empty($technician_id)) {
            $count = $this->model->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'technician_id', '=', $technician_id ],
                [ 'order_status', 'in', [OrderDict::IN_SERVICE ,OrderDict::WAIT_SERVICE]],
                [ 'reserve_service_time', '=', $reserve_service_time ]
            ])->count();
            if ($count > 0) {
                $this->error[] = get_lang('O2O_SELECT_TECHNICIAN_IN_SERVICE');
                return;
            }
        }
        return true;
    }

    /**
     * 存在错误则抛出
     * @return void
     */
    public function checkError()
    {
        $error = $this->getError();
        if ($error) throw new CommonException($error[0]);
    }

    /**
     * 获取错误
     * @return array|mixed
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * 定义错误
     * @param $key
     * @param $error
     * @return void
     */
    public function setError($error)
    {
        $this->error[] = $error;
    }

    /**
     * 获取整合后的数据
     * @return void
     */
    public function getData()
    {}

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
        Cache::tag('order_cache')->set($order_key, $order_cache, 300);
        return $order_key;
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
            throw new CommonException('O2O_ORDER_EXPIRE');//订单数据已过期
        foreach ($order_cache as $k => $v) {
            $this->$k = $v;
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
    /**
     * 校验抵扣项是否可用
     * @return void
     */
    public function checkDiscount()
    {}

    /**
     * 比例(向下取整)
     * @param $rate
     * @return float|int
     */
    public function rateFormat($rate)
    {
        return floor(strval(($rate) * 100)) / 100;
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
}
