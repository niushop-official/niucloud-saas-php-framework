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
use addon\tourism\app\model\Scenic;
use addon\tourism\app\service\api\calendar\GoodsDayService;
use addon\tourism\app\service\core\CoreGoodsService;
use Carbon\Carbon;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 景点服务层
 * Class ScenicService
 * @package addon\tourism\app\service\api\scenic
 */
class ScenicService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Scenic();
    }

    /**
     * 获取景点列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = [ 'site_id', '=', $this->site_id ];
        $field = 'scenic_id,site_id,scenic_name,scenic_level,open_time,create_time,scenic_cover,scenic_status';
        $order = $where[ 'order' ];
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'scenic_status', '=', 1 ] ])->withSearch([ 'scenic_name', 'search_name' ], $where)->field($field)
            ->with([ "goods" => function($query) {
                $query->where([ [ 'is_default', '=', 1 ] ]);
            } ])->order($order)->append([ 'cover_thumb_mid' ]);
        $list = $this->pageQuery($search_model);
        $ticket_service = new TicketService();
        $core_goods_service = new CoreGoodsService();
        if ($this->member_id) $member_info = $core_goods_service->getMemberInfo($this->member_id, $this->site_id);
        foreach ($list[ 'data' ] as $key => &$val) {
            $val[ 'price' ] = $val[ 'goods' ][ 'price' ];
            $val[ 'goods_id' ] = $val[ 'goods' ][ 'goods_id' ];
            $val = $ticket_service->getTicketPrice($val);
            if ($this->member_id) {
                $val[ 'member_price' ] = $core_goods_service->getMemberPrice($member_info, $val[ 'goods' ][ 'member_discount' ], $val[ 'price' ], $val[ 'day_info' ] ?? [], $val[ 'goods' ][ 'fixed_discount' ]);
            }
        }
        return $list;
    }

    /**
     * 获取景点信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = "scenic_id,site_id,poster_id,scenic_name,scenic_level,open_time,create_time,province_id,city_id,district_id,address,full_address,telephone,scenic_desc,surround,scenic_cover,scenic_images,longitude,latitude";
        $info = $this->model->field($field)->where([ [ 'scenic_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->with([ "goods" => function($query) {
            $query->where([ [ 'is_default', '=', 1 ] ]);
        } ])->append([ 'cover_thumb_big', 'image_thumb_big' ])->findOrEmpty()->toArray();
        if ($info) {
            $ticket_service = new TicketService();
            $core_goods_service = new CoreGoodsService();
            if ($this->member_id) $member_info = $core_goods_service->getMemberInfo($this->member_id, $this->site_id);
            $info[ 'ticket_list' ] = ( new TicketService() )->getListByScenicId($info[ 'scenic_id' ]);
            foreach ($info[ 'ticket_list' ] as $key => &$val) {
                $val = $ticket_service->getTicketPrice($val);
                if ($this->member_id) {
                    $val[ 'member_price' ] = $core_goods_service->getMemberPrice($member_info, $val[ 'member_discount' ], $val[ 'price' ], $val[ 'day_info' ] ?? [], $val[ 'fixed_discount' ]);
                }

            }
            // 种草秀数据查询
            $info[ 'sow_show_list' ] = event('SowShowData', [ 'relate_id' => $info[ 'scenic_id' ], 'relate_type' => 'scenic', 'limit' => 3 ])[ 0 ] ?? [];
        }
        return $info;
    }

    /**
     * 获取推荐景点
     * @return Scenic|array
     */
    public function getRecommend(array $data = [])
    {
        $field = 'scenic_id,site_id,scenic_name,scenic_level,open_time,create_time,scenic_cover';
        $order = 'create_time desc';
        $condition = [
            [ 'site_id', '=', $this->site_id ],
            [ 'scenic_status', '=', 1 ]
        ];
        if (!empty($data[ 'goods_ids' ])) {
            $condition[] = [ 'scenic_id', 'in', $data[ 'goods_ids' ] ];
        }
        $list = $this->model->where($condition)->field($field)->with([ "goods" => function($query) {
            $query->where([ [ 'is_default', '=', 1 ] ]);
        } ])->append([ 'cover_thumb_big', 'cover_thumb_mid' ])->order($order)->limit($data[ 'limit' ])->select()->toArray();

        $ticket_service = new TicketService();
        $core_goods_service = new CoreGoodsService();
        if ($this->member_id) $member_info = $core_goods_service->getMemberInfo($this->member_id, $this->site_id);
        foreach ($list as $key => &$val) {
            $val[ 'price' ] = $val[ 'goods' ][ 'price' ];
            $val[ 'goods_id' ] = $val[ 'goods' ][ 'goods_id' ];
            $val = $ticket_service->getTicketPrice($val);
            if ($this->member_id) {
                $val[ 'member_price' ] = $core_goods_service->getMemberPrice($member_info, $val[ 'goods' ][ 'member_discount' ], $val[ 'price' ], $val[ 'day_info' ] ?? [], $val[ 'goods' ][ 'fixed_discount' ]);
            }
        }
        return $list;
    }

    /**
     * 获取价格日历
     * @param int $hotel_id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getGoodsDay(int $goods_id)
    {
        $goods = ( new Goods() )->field("goods_id,price,member_discount,fixed_discount")->where([ [ 'site_id', '=', $this->site_id ], [ 'goods_id', '=', $goods_id ] ])->findOrEmpty();
        if ($goods->isEmpty()) throw new CommonException('GOODS_NOT_EXIST');

        $start_time = Carbon::today()->getTimestamp();
        $end_time = $start_time + ( 86400 * 30 );

        $goods_day_list = ( new GoodsDay() )->where([
            [ 'goods_id', '=', $goods[ 'goods_id' ] ],
            [ 'time', '>=', $start_time ],
            [ 'time', '<=', $end_time ],
        ])->field('price,time,member_price,is_set')->select()->toArray();

        $list = [];
        if (!empty($goods_day_list)) {
            foreach ($goods_day_list as $item) {
                $key = date('Y-m-d', $item[ 'time' ]);
                $list[ $key ] = $item;
            }
        }

        $core_goods_service = new CoreGoodsService();
        if ($this->member_id) {
            $member_info = $core_goods_service->getMemberInfo($this->member_id, $this->site_id);
            $goods[ 'price' ] = $core_goods_service->getMemberPrice($member_info, $goods[ 'member_discount' ], $goods[ 'price' ], [], $goods[ 'fixed_discount' ]);
            foreach ($list as $k => &$v) {
                $list[ $k ][ 'price' ] = $core_goods_service->getMemberPrice($member_info, $goods[ 'member_discount' ], $v[ 'price' ], $v, $goods[ 'fixed_discount' ]);
            }
        }

        $data = [];
        for ($i = 0; $i <= 30; $i++) {
            $date = date('Y-m-d', $start_time + ( 86400 * $i ));
            $data[ $date ] = isset($list[ $date ]) && $list[ $date ][ 'is_set' ] > 0 ? $list[ $date ][ 'price' ] : $goods[ 'price' ];
        }

        return $data;
    }

    /**
     * 获取门票列表
     * @param int $scenic_id
     * @param $order
     * @param $date
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getTicketList(int $scenic_id, $order = "create_time desc", $date = '')
    {
        $field = 'site_id,hotel_id,goods_id,stock,goods_name,goods_type,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,price,create_time,room_bed,room_area,room_stay,room_floor,buy_info';
        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'scenic_id', '=', $scenic_id ], [ 'goods_type', '=', "ticket" ], [ 'status', '=', 1 ] ])->field($field)->order($order)->append([ 'attr_name' ])->select()->toArray();
        $time = date("Y-m-d", $date ? strtotime($date) : time());
        foreach ($list as $k => $v) {
            $goods_day_price = ( new GoodsDayService() )->getGoodsDayPrice($time, $v[ 'goods_id' ]);
            $list[ $k ][ 'price' ] = $goods_day_price ? $goods_day_price : $v[ 'price' ];
        }
        return $list;
    }
}
