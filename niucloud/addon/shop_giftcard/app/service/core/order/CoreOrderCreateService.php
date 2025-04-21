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

namespace addon\shop_giftcard\app\service\core\order;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\giftcard\Material;
use addon\shop_giftcard\app\model\order\Order;
use app\dict\member\MemberDict;
use app\model\member\Member;
use app\service\core\member\CoreMemberService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 订单服务层
 * Class CoreOrderCreateService
 * @package addon\shop_giftcard\app\service\core\order
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
     * 订单计算
     * @param array $data
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function calculate(array $data)
    {
        //参数赋值
        $this->setParam($data);
        $this->order_key = $this->param[ 'order_key' ] ?? '';
        if (empty($this->order_key)) {
            $this->confirm();
        }
        //获取订单数据的缓存
        $this->getOrderCache($this->order_key . '_basic');

        $this->setOrderCache($this->order_key);

        //金额格式化
        $goods_money = $this->moneyFormat($this->basic[ 'goods_money' ] ?? 0);
        $order_money = $goods_money;
        $pay_money = $order_money;

        $this->basic[ 'goods_money' ] = $goods_money;
        $this->basic[ 'order_money' ] = $order_money;
        $this->basic[ 'pay_money' ] = $pay_money;
        //订单创建数据写入缓存,并将标识返回给前端
        $order_cache = get_object_vars($this);
        unset($order_cache[ 'param' ]);
        $this->setOrderCache($this->order_key, $order_cache);
        return $order_cache;
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

        $member_info = ( new CoreMemberService() )->getInfoByMemberId($data[ 'site_id' ], $data[ 'member_id' ], 'status');

        if (empty($member_info)) throw new CommonException('SHOP_ORDER_BUYER_NOT_FOUND');//无效的账号
        if ($member_info[ 'status' ] == MemberDict::OFF) throw new CommonException('SHOP_ORDER_BUYER_LOCKED');//账号被锁定

        $order_key = $this->param[ 'order_key' ] ?? '';
        //获取订单缓存
        $this->getOrderCache($order_key);
        //校验订单商品
        $this->checkOrderGoods($this->goods_data[ 'giftcard_id' ]);

        $order_data = [
            //订单整体
            'site_id' => $data[ 'site_id' ],
            'status' => OrderDict::WAIT_PAY,
            'body' => $this->basic[ 'body' ],
            'member_id' => $this->member_id,
            'goods_money' => $this->basic[ 'goods_money' ],
            'order_money' => $this->basic[ 'order_money' ],
            'num' => $this->basic[ 'total_num' ],

            //订单商品
            'giftcard_id' => $this->goods_data[ 'giftcard_id' ],
            'card_right_type' => $this->goods_data[ 'card_right_type' ],
            'card_cover' => $this->goods_data[ 'card_cover' ],
            'balance' => $this->goods_data[ 'balance' ],
            'material_id' => $this->goods_data[ 'material_id' ],
            'card_price' => $this->goods_data[ 'card_price' ],
            'delivery_way' => $this->goods_data[ 'delivery_way' ],
            'card_goods_type' => $this->goods_data[ 'card_goods_type' ],
            'card_goods_count' => $this->goods_data[ 'card_goods_count' ],
            'is_give' => $this->goods_data[ 'is_give' ],

            //附属信息
            'member_remark' => $this->param[ 'member_remark' ] ?? '',//买家留言
        ];//总

        $create_order_data = array(
            'order_data' => $order_data,
        );
        return $this->createOrder($create_order_data);
    }


    /**
     * 订单确认(基础信息查询并缓存)
     * @return array|mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function confirm()
    {
        //查看会员信息
        $member_id = $this->param[ 'member_id' ];
        $this->member_id = $member_id;
        $count = ( new Member() )->where([ [ 'site_id', '=', $this->site_id ],[ 'member_id', '=', $member_id ] ])->count();
        if ($count == 0) throw new CommonException('SHOP_ORDER_BUYER_NOT_FOUND');//无效的账号

        //查询礼品卡信息
        $this->getGiftCardData();

        $order_cache = get_object_vars($this);
        unset($order_cache[ 'param' ]);
        unset($order_cache[ 'order_key' ]);
        $order_key = $this->setOrderCache('', $order_cache);
        //将基础订单数据单独存放一个缓存
        $order_basic_key = $order_key . '_basic';
        $this->setOrderCache($order_basic_key, $order_cache);

        $this->order_key = $order_key;

        return true;
    }

    /**
     * 商品相关数据
     * @return bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getGiftCardData()
    {
        $giftcard_data = $this->param[ 'giftcard_data' ] ?? [];
        if (empty($giftcard_data)) throw new CommonException('GIFTCARD_ORDER_DATA_EXPIRE');//无效的数据

        $giftcard_id = $giftcard_data[ 'giftcard_id' ];
        $material_id = $giftcard_data[ 'material_id' ];
        $balance = intval($giftcard_data[ 'balance' ]) ?? 0;
        $num = $giftcard_data[ 'num' ];

        //查询礼品卡数据
        $giftcard_info = $this->checkOrderGoods($giftcard_id);

        if ($giftcard_info['card_right_type'] == GiftcardDict::cardRightTypeBalance) {
            if ($balance <= 0) throw new CommonException('GIFTCARD_ORDER_BALANCE_CANNOT_LESS_THAN_OR_EQUAL_TO_ZERO');
            $balance_array = array_column($giftcard_info[ 'balance_json' ], null, 'balance');
            if (!array_key_exists($balance, $balance_array)) throw new CommonException('GIFTCARD_ORDER_BALANCE_FACE_MONEY_ERROR');
            $giftcard_info[ 'card_price' ] = $balance_array[$balance]['price'];//储值卡单价
        }

        //礼品卡封面
        $material = ( new Material() )->field('url')->where([ [ 'site_id', '=', $this->site_id ], [ 'material_id', '=', $material_id ] ])->findOrEmpty()->toArray();
        if (empty($material)) throw new CommonException('GIFTCARD_ORDER_MATERIAL_NOT_EXIST');//礼品卡封面不存在
        $giftcard_info[ 'card_cover' ] = $material[ 'url' ];

        $giftcard_info[ 'num' ] = $num;
        $giftcard_info[ 'material_id' ] = $material_id;
        $giftcard_info[ 'balance' ] = $balance;
        $giftcard_info[ 'goods_money' ] = $giftcard_info[ 'card_price' ] * $num;//小计

        $this->basic[ 'total_num' ] = $num;
        $this->basic[ 'goods_money' ] = $giftcard_info[ 'goods_money' ];
        $this->basic[ 'body' ] = $giftcard_info[ 'card_name' ];
        $this->goods_data = $giftcard_info;
        return true;
    }

}
