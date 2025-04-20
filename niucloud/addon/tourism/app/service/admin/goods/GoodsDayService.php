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

namespace addon\tourism\app\service\admin\goods;

use addon\tourism\app\model\Goods;
use addon\tourism\app\model\GoodsDay;
use core\base\BaseAdminService;

/**
 * 房型
 * Class TourismGoodsService
 * @package app\service\admin\tourism_goods
 */
class GoodsDayService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GoodsDay();
        $this->goods_model = new Goods();
    }

    private $goods_model;
    /**
     * 添加价格日历
     * @param array $data
     * @return mixed
     */
    public function addDatePrice(array $data)
    {
        $data['create_time'] = time();
        $start_date = strtotime($data['start_date']);
        $end_date = strtotime($data['end_date']);
        $num = 0;
        if($data['is_set'] == 2) $num = ($end_date - $start_date)/86400;

        for ($i = 0; $i <= $num; $i ++){
            $date_time = $i * 86400 + $start_date;
            $info = $this->getInfo(date("Y-m-d", $date_time), $data['goods_id']);
            if($info){
                $update_data = [
                    'member_price' => $data['member_price'],
                    'price' => $data['price'],
                ];
                if(empty($info['is_set'])) $update_data['is_set'] = $data['is_set'] ?? 0;

                $this->model->where([['time_date', '=', date("Y-m-d", $date_time)], ['goods_id', '=', $data['goods_id']]])->update(
                    $update_data
                );
            }else{
                $goods_info = $this->goods_model->field("stock")->where([['goods_id', '=', $data['goods_id']]])->findOrEmpty();
                $data['year'] = date('Y', $date_time);
                $data['month'] = date('m', $date_time);
                $data['day'] = date('d', $date_time);
                $data['stock_all'] = $goods_info['stock'];
                $data['time'] = $date_time;
                $data['time_date'] = date("Y-m-d", $date_time);
                $this->model->create($data);
            }
        }
        return true;
    }

    /**
     * 获取价格日历信息
     * @param int $id
     * @return array
     */
    public function getInfo(string $date, int $goods_id)
    {
        $field = 'id';
        $info = $this->model->field($field)->where([['time_date', '=', $date],['goods_id', '=', $goods_id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取价格日历列表
     * @param array $where
     * @return array
     */
    public function getPage(int $goods_id)
    {
        $field = 'price,goods_id,member_price,sale_price,stock_all,stock,sell_num,year,month,day,is_set,time,time_date,member_price';
        $order = '';

        $list = $this->model->where([['goods_id', '=', $goods_id]])->field($field)->order($order)->select()->toArray();
        $list = array_column($list, null, 'time_date');
        return $list;
    }

    /**
     * 删除价格日历
     * @param int $id
     * @return bool
     */
    public function del(string $date)
    {
        $res = $this->model->where([['time_date', '=', $date]])->delete();
        return $res;
    }

    /**
     * 更新商品单日库存
     * @param $goods_id
     * @param $stock
     */
    public function editGoodsDayStock($goods_id, $stock)
    {
        $this->model->where([['goods_id', '=', $goods_id]])->update(
            [
                'stock_all' => $stock,
            ]
        );
    }
}