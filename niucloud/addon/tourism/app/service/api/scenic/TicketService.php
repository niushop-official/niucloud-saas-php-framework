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

namespace addon\tourism\app\service\api\scenic;

use addon\tourism\app\model\Goods;
use addon\tourism\app\model\GoodsDay;
use core\base\BaseApiService;

/**
 * 门票
 * Class TourismGoodsService
 * @package app\service\admin\tourism_goods
 */
class TicketService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取景点门票列表
     * @param int $scenic_id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getListByScenicId(int $scenic_id)
    {
        $field = 'site_id,goods_id,goods_name,member_discount,fixed_discount,goods_type,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,sort,price,sale_price,cost_price,create_time,stock,sell_type, buy_info';
        $order = 'create_time desc';
        return $this->model->where([['site_id', '=', $this->site_id],['scenic_id', '=', $scenic_id], ['goods_type', '=', "scenic"], ['status', '=', 1]])->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取门票信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'site_id,goods_name,goods_type,member_discount,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,sort,price,sale_price,cost_price,create_time,stock,sell_type';
        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        return $info;
    }
    /**
     * 获取门票当前价格
     * @return \addon\tourism\app\model\GoodsDay|array|mixed|\think\Model
     */
    public function getTicketPrice(array $info)
    {
        $info['price'] = $info['price'];
        $date = date('Y-m-d');
        $day_info = (new GoodsDay())->where([ ['goods_id', '=', $info['goods_id'] ], ['time_date', '=', $date] ])->field('is_set,price,stock_all,sell_num,stock,member_price')->findOrEmpty()->toArray();
        if(!empty($day_info)){
            if($day_info['is_set'] > 0) $info['price'] = $day_info['price'];
            $info['day_info'] = $day_info;
        }
        return $info;
    }

}
