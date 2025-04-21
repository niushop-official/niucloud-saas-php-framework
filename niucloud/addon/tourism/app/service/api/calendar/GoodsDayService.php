<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\service\api\calendar;

use addon\tourism\app\model\GoodsDay;
use addon\tourism\app\model\Goods;
use core\base\BaseApiService;

/**
 * 酒店服务层
 * Class HotelService
 * @package aaddon\tourism\app\service\api\hotel
 */
class GoodsDayService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GoodsDay();
    }

    /**
     * 获取商品当日价格，若未设置返回‘’
     * @param $day
     * @param $goods_id
     * @return GoodsDay|array|mixed|\think\Model
     */
    public function getGoodsDayPrice($day, $goods_id){
        $field = "price";
        $info = $this->model->field($field)->where([['time_date', '=', $day], ['goods_id', '=', $goods_id]])->findOrEmpty()->toArray();
        if($info && $info['is_set'] > 0) return $info['price'];
        return 0;
    }

    /**
     * 获取价格日历列表
     * @param array $where
     * @return array
     */
    public function getPage($data)
    {
        $field = 'price,goods_id,sale_price,stock_all,stock,sell_num,year,month,day,is_set,time,time_date';
        $order = '';
        $year = date('Y', $data['date']);
        $month = date('m', $data['date']);
        $day = date('d', $data['date']);

        $goods_price = (new Goods())->field("price")->where([['goods_id', '=', $data['goods_id']]])->findOrEmpty()->toArray();

        $list_1 = $this->model->where([['goods_id', '=', $data['goods_id']], ["year", '=', $year], ["month", '=', $month], ['day', '>=', $day]])->field($field)->order($order)->select()->toArray();
        if($month == 12){
            $list_2 = $this->model->where([['goods_id', '=', $data['goods_id']], ["year", '=', $year+1], ["month", '=', 1]])->field($field)->order($order)->select()->toArray();
        }else{
            $list_2 = $this->model->where([['goods_id', '=', $data['goods_id']], ["year", '=', $year], ["month", '=', $month+1]])->field($field)->order($order)->select()->toArray();
        }

        $list = array_merge($list_1, $list_2);
        foreach ($list as $key => $val){
            if($val['price'] <= 0){
                $list[$key]['price'] = $goods_price['price'];
            }
        }

        return $list;
    }
}