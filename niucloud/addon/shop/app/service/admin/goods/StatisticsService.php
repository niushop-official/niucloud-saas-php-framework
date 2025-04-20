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

namespace addon\shop\app\service\admin\goods;

use addon\shop\app\dict\goods\StatisticsDict;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\Stat;
use core\base\BaseAdminService;
use DateTime;


/**
 * 商品统计服务层
 * Class RankService
 * @package addon\shop\app\service\admin\goods
 */
class StatisticsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Stat();
    }

    /**
     * 获取商品统计基本信息
     * @param array $data
     * @return array
     */
    public function getBasic(array $data)
    {
        if (empty($data[ 'date' ])) {
            $data[ 'date' ] = date('Y/m/d', strtotime('-1 month')) . '-' . date('Y/m/d');
        }

        $date_arr = explode('-', $data[ 'date' ]);
        $date = [ strtotime($date_arr[ 0 ]), strtotime($date_arr[ 1 ]) ];
        $goods_ids = (new Goods())->where([[ 'site_id', '=', $this->site_id ]])->column('goods_id');

        $field = 'goods_id,sum(cart_num) as cart_num,sum(sale_num) as sale_num,sum(pay_num) as pay_num,sum(pay_money) as pay_money,sum(refund_num) as refund_num,sum(refund_money) as refund_money,sum(collect_num) as collect_num,sum(evaluate_num) as evaluate_num,sum(access_num) as access_num,sum(goods_visit_member_count) as goods_visit_member_count';
        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'date_time', 'between', $date ], ['goods_id','in',$goods_ids] ])
            ->field($field)
            ->group('goods_id')
            ->select()
            ->toArray();

        $data = [
            'access_good_num' => 0,//被访问商品数
            'sale_good_num' => 0,//动销商品数
            'cart_num' => 0,//加入购物车数量
            'sale_num' => 0,//商品销量（下单数）
            'pay_num' => 0,//支付件数
            'pay_money' => 0,//支付总金额
            'refund_num' => 0,//退款件数
            'refund_money' => 0,//退款总额
            'access_num' => 0,//访问次数（浏览量）
            'collect_num' => 0,//收藏数量
            'evaluate_num' => 0,//评论数量
            'goods_visit_member_count' => 0,//商品访客数
//            'pay_percent'=>0,//支付转化率
        ];
        foreach ($list as $value) {
            if ($value[ 'access_num' ] >= 1) {
                $data[ 'access_good_num' ] += 1;
            }
            if ($value[ 'sale_num' ] >= 1) {
                $data[ 'sale_good_num' ] += 1;
            }
            $data[ 'cart_num' ] += $value[ 'cart_num' ];
            $data[ 'sale_num' ] += $value[ 'sale_num' ];
            $data[ 'pay_num' ] += $value[ 'pay_num' ];
            $data[ 'pay_money' ] = bcadd($data[ 'pay_money' ], $value[ 'pay_money' ], 2);
            $data[ 'refund_num' ] += $value[ 'refund_num' ];
            $data[ 'refund_money' ] = bcadd($data[ 'refund_money' ], $value[ 'refund_money' ], 2);
            $data[ 'access_num' ] += $value[ 'access_num' ];
            $data[ 'collect_num' ] += $value[ 'collect_num' ];
            $data[ 'evaluate_num' ] += $value[ 'evaluate_num' ];
            $data[ 'goods_visit_member_count' ] += $value[ 'goods_visit_member_count' ];
        }
        return $data;
    }

    /**
     * 获取商品统计图表信息
     * @param array $data
     * @return array
     */
    public function getTrend(array $data)
    {
        $goods_ids = (new Goods())->where([[ 'site_id', '=', $this->site_id ]])->column('goods_id');
        $where[] = [
            [ 'site_id', '=', $this->site_id ],
            ['goods_id','in',$goods_ids]
        ];
        $date_type = 'day';
        if (empty($data[ 'date' ])) {
            $data[ 'date' ] = date('Y/m/d', strtotime('-1 month')) . '-' . date('Y/m/d');
        }
        $date_arr = explode('-', $data[ 'date' ]);
        $allDates = $this->getDatesBetween($date_arr[ 0 ], $date_arr[ 1 ]);
        $select_data = [];
        if (count($allDates) > 32) {
            $date_type = 'month';
            foreach ($allDates as $v) {
                $select_data[ date('Y-m', strtotime($v)) ][] = $v;
            }
            $allDates = $this->getMonthsBetween($date_arr[ 0 ], $date_arr[ 1 ]);
        }

        $date = [ strtotime($date_arr[ 0 ]), strtotime($date_arr[ 1 ]) ];
        $where[] = [ 'date_time', 'between', $date ];
        $field = 'goods_id,date,date_time,sum(cart_num) as cart_num,sum(sale_num) as sale_num,sum(pay_num) as pay_num,sum(pay_money) as pay_money,sum(refund_num) as refund_num,sum(refund_money) as refund_money,sum(collect_num) as collect_num,sum(evaluate_num) as evaluate_num,sum(access_num) as access_num,sum(goods_visit_member_count) as goods_visit_member_count';
        $list = $this->model
            ->where($where)
            ->field($field)
            ->group('date_time')
            ->order('date_time asc')
            ->select()
            ->toArray();
        $data = $stat_count = $date_arr_data = [];
        if (!empty($allDates)) {
            foreach ($allDates as $key => $value) {
                $stat_count[ 'access_count' ][ $value ] = 0;//浏览量
                $stat_count[ 'goods_visit_member_count' ][ $value ] = 0;//访客数
                $stat_count[ 'pay_money' ][ $value ] = 0;//支付金额
                $stat_count[ 'refund_money' ][ $value ] = 0;//退款金额
                $stat_count[ 'cart_num' ][ $value ] = 0;//加入购物车数
                $stat_count[ 'sale_num' ][ $value ] = 0;//下单件数
                $stat_count[ 'pay_num' ][ $value ] = 0;//支付件数
                $stat_count[ 'refund_num' ][ $value ] = 0;//退款件数
            }

            if ($date_type == 'day') {
                foreach ($list as $k => $v) {
                    $stat_count[ 'access_count' ][ $v[ 'date' ] ] += $v[ 'access_num' ];
                    $stat_count[ 'goods_visit_member_count' ][ $v[ 'date' ] ] += $v[ 'goods_visit_member_count' ];
                    $stat_count[ 'pay_money' ][ $v[ 'date' ] ] = bcadd($stat_count[ 'pay_money' ][ $v[ 'date' ] ], $v[ 'pay_money' ], 2);
                    $stat_count[ 'refund_money' ][ $v[ 'date' ] ] += bcadd($stat_count[ 'refund_money' ][ $v[ 'date' ] ], $v[ 'refund_money' ], 2);
                    $stat_count[ 'cart_num' ][ $v[ 'date' ] ] += $v[ 'cart_num' ];
                    $stat_count[ 'sale_num' ][ $v[ 'date' ] ] += $v[ 'sale_num' ];
                    $stat_count[ 'pay_num' ][ $v[ 'date' ] ] += $v[ 'pay_num' ];
                    $stat_count[ 'refund_num' ][ $v[ 'date' ] ] += $v[ 'refund_num' ];
                }
            } elseif ($date_type == 'month') {
                foreach ($select_data as $key => $value) {
                    foreach ($list as $k => $v) {
                        if (in_array($v[ 'date' ], $value)) {
                            $stat_count[ 'access_count' ][ $key ] += $v[ 'access_num' ];
                            $stat_count[ 'goods_visit_member_count' ][ $key ] += $v[ 'goods_visit_member_count' ];
                            $stat_count[ 'pay_money' ][ $key ] = bcadd($stat_count[ 'pay_money' ][ $key ], $v[ 'pay_money' ], 2);
                            $stat_count[ 'refund_money' ][ $key ] = bcadd($stat_count[ 'refund_money' ][ $key ], $v[ 'refund_money' ], 2);
                            $stat_count[ 'cart_num' ][ $key ] += $v[ 'cart_num' ];
                            $stat_count[ 'sale_num' ][ $key ] += $v[ 'sale_num' ];
                            $stat_count[ 'pay_num' ][ $key ] += $v[ 'pay_num' ];
                            $stat_count[ 'refund_num' ][ $key ] += $v[ 'refund_num' ];
                        }
                    }
                }
            }
            foreach ($stat_count as $key => $value) {
                $data[ $key ][ 'name' ] = $key;
                $data[ $key ][ 'data' ] = array_values($value);
            }
        }
        $arr = [
            'data' => array_values($data),
            'xAxis' => $allDates,
        ];
        return $arr;
    }

    /**
     * 获取商品排行榜信息
     * @param array $data
     * @return array
     */
    public function getRank(array $data)
    {
        if (empty($data[ 'date' ])) {
            $data[ 'date' ] = date('Y/m/d', strtotime('-1 month')) . '-' . date('Y/m/d');
        }
        $date_arr = explode('-', $data[ 'date' ]);
        $date = [ strtotime($date_arr[ 0 ]), strtotime($date_arr[ 1 ]) ];

        $where[] = [
            [ 'stat.site_id', '=', $this->site_id ],
            [ 'date_time', 'between', $date ],
            [ 'goods.delete_time', '=', 0 ],
        ];
        if (!empty($data[ 'category_ids' ])) {
            $category_where = array_map(function($item) { return '%"' . $item . '"%'; }, $data[ 'category_ids' ]);
            $where[] = [ 'goods_category', 'like', $category_where, 'or' ];
        }
        if (!empty($data[ 'goods_name' ])) {
            $where[] = [ "goods_name", "like", "%" . $data[ 'goods_name' ] . "%"];
        }
        $field = 'stat.site_id,stat.goods_id,sum(stat.cart_num) as cart_num,sum(stat.sale_num) as sale_num,sum(stat.pay_num) as pay_num,sum(stat.pay_money) as pay_money,sum(stat.refund_num) as refund_num,sum(stat.refund_money) as refund_money,sum(stat.collect_num) as collect_num,sum(stat.evaluate_num) as evaluate_num,sum(stat.access_num) as access_num,sum(goods_visit_member_count) as goods_visit_member_count,goods_name,goods_cover,is_gift';
        //排序   access_num=访问次数（浏览量） cart_num=>加入购物车数量 sale_num=商品销量（下单数）pay_num=支付件数 collect_num=收藏数量 pay_money=支付总金额
        $order = $data[ 'type' ] . ' desc,goods.sort desc,goods.create_time desc';
        $query = $this->model
            ->alias('stat')
            ->where($where)
            ->withSearch(['goods_name'],$where)
            ->field($field)
            ->join('shop_goods goods', 'stat.goods_id=goods.goods_id', 'left')
            ->append([ 'goods_cover_thumb_small' ])
            ->group('stat.goods_id')
            ->order($order);
        $list = $this->pageQuery($query);
        return $list;
    }

    /**
     * 获取商品排行榜统计类型
     * @return array
     */
    public function getType()
    {
        $list = StatisticsDict::getType();
        return $list;
    }

    public function getDatesBetween($startDate, $endDate)
    {
        $dates = [];
        $start = strtotime($startDate);
        $end = strtotime($endDate);

        // 确保开始日期小于或等于结束日期
        if ($start > $end) {
            return $dates; // 返回空数组
        }

        // 循环获取日期
        while ($start <= $end) {
            $dates[] = date('Y-m-d', $start); // 格式化为日期字符串
            $start = strtotime("+1 day", $start); // 增加一天
        }

        return $dates; // 返回日期数组
    }

    public function getMonthsBetween($startDate, $endDate)
    {
        $months = [];
        $start = new DateTime($startDate);
        $end = new DateTime($endDate);

        // 确保开始日期小于等于结束日期
        if ($start > $end) {
            return $months; // 返回空数组
        }

        // 循环获取月份
        while ($start <= $end) {
            $months[] = $start->format('Y-m'); // 格式化为年月字符串
            $start->modify('first day of next month'); // 移动到下一个月的第一天
        }

        return $months; // 返回月份数组
    }

    /**
     * 同步商品统计信息
     * @param array $date
     * @return bool
     */
    public function syncStatGoods($date = [])
    {
        $pageSize = 100;
        $page = 1;

        if (empty($date)) {
            $date[] = date('Y-m-d');
        }

        while (true) {
            $goods_list = (new Goods())
                ->field('site_id,goods_id')
                ->limit(($page - 1) * $pageSize, $pageSize)
                ->select()
                ->toArray();

            if (empty($goods_list)) {
                break; // 没有更多商品时退出循环
            }

            $goods_ids = array_column($goods_list, 'goods_id');

            $data = [];
            foreach ($date as $value) {
                $stat_goods_ids = $this->model
                    ->where([
                        ['date', '=', $value],
                        ['goods_id', 'in', $goods_ids]
                    ])
                    ->column('goods_id');

                foreach ($goods_list as $v) {
                    if (!in_array($v['goods_id'], $stat_goods_ids)) {
                        $data[] = [
                            'site_id' => $v['site_id'],
                            'date' => $value,
                            'date_time' => strtotime($value),
                            'goods_id' => $v['goods_id'],
                        ];
                    }
                }
            }
            if (!empty($data)) {
                $this->model->saveAll($data);
            }

            $page++;
        }
        return true;
    }

}
