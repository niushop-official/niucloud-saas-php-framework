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

namespace addon\tourism\app\service\api\hotel;

use addon\tourism\app\model\GoodsDay;
use core\base\BaseApiService;

/**
 * 房型
 * Class GoodsDayService
 * @package addon\tourism\app\service\api\hotel
 */
class GoodsDayService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GoodsDay();
    }

    /**
     * 获取价格日历信息
     * @param int $id
     * @return array
     */
    public function getInfo(string $date)
    {
        $field = 'id';
        $info = $this->model->field($field)->where([['time_date', '=', $date]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取价格日历列表
     * @param array $where
     * @return array
     */
    public function getPage(int $goods_id)
    {
        $field = 'price,goods_id,sale_price,stock_all,stock,sell_num,year,month,day,is_set,time,time_date';
        $order = '';
        $search_model = $this->model->where([['goods_id', '=', $goods_id]])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        $list['data'] = array_column($list['data'], null, 'time_date');
        return $list;
    }
}