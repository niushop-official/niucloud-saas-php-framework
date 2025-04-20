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

use addon\tourism\app\dict\hotel\HotelTagDict;
use addon\tourism\app\model\Hotel;
use addon\tourism\app\service\core\CoreGoodsService;
use core\base\BaseApiService;

/**
 * 酒店服务层
 * Class HotelService
 * @package aaddon\tourism\app\service\api\hotel
 */
class HotelService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Hotel();
    }

    /**
     * 获取酒店列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'hotel_id,hotel_name,site_id,hotel_star, hotel_tag, hotel_cover,hotel_images,hotel_attribute,create_time,full_address,hotel_status,longitude,latitude';
        $order = $where[ 'order' ];

        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'hotel_status', '=', 1 ] ])->withSearch([ "hotel_name", "create_time", "search_name" ], $where)->field($field)->with([ "goods" => function($query) {
            $query->where([ [ 'is_default', '=', 1 ] ]);
        } ])->order($order)->append([ 'cover_thumb_mid' ]);
        $list = $this->pageQuery($search_model);
        $room_service = new RoomService();
        $core_goods_service = new CoreGoodsService();
        if ($this->member_id) $member_info = $core_goods_service->getMemberInfo($this->member_id, $this->site_id);

        foreach ($list[ 'data' ] as $key => &$val) {
            $val = $room_service->getRoomPrice($val);
            if ($this->member_id) {
                $val[ 'member_price' ] = $core_goods_service->getMemberPrice($member_info, $val[ 'goods' ][ 'member_discount' ], $val[ 'price' ], $val[ 'day_info' ] ?? [], $val[ 'goods' ][ 'fixed_discount' ]);
            }
        }
        return $list;
    }

    /**
     * 获取酒店信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'hotel_id,site_id,poster_id,hotel_star,hotel_tag,hotel_desc,hotel_name,hotel_cover,hotel_images,hotel_attribute,create_time,province_id,city_id,district_id,address,full_address,longitude,latitude';
        $info = $this->model->field($field)->where([ [ 'hotel_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->append([ 'image_thumb_big', 'cover_thumb_big' ])->findOrEmpty()->toArray();
        if ($info) {
            $info[ 'room_list' ] = ( new RoomService() )->getListByHotelId($info[ 'hotel_id' ]);
        }
        //酒店服务信息查询
        $hotel_attribute = explode(",", $info[ 'hotel_attribute' ]);
        $hotel_tag_dict = HotelTagDict::getTag();
        foreach ($hotel_tag_dict as $k => $v) {
            foreach ($v[ 'attr' ] as $k_attr => $v_attr) {
                if (in_array($v_attr[ 0 ], $hotel_attribute)) {
                    $hotel_tag_dict[ $k ][ 'attr' ][ $k_attr ][ 1 ] = 1;
                } else {
                    $hotel_tag_dict[ $k ][ 'attr' ][ $k_attr ][ 1 ] = 0;
                }

            }
        }
        $tag = [];
        foreach ($hotel_tag_dict as $key => $value) {
            foreach ($value[ 'attr' ] as $key_attr => $value_attr) {
                if ($value_attr[ 1 ] == 1) {
                    $tag[ $key ][ $key_attr ] = $value_attr[ 0 ];
                }
            }
        }
        $tags = [];
        foreach ($tag as $v) {
            $tags[] = implode(',', $v);
        }
        $info[ 'hotel_attribute' ] = implode(',', $tags);
        $info[ 'hotel_attribute_array' ] = $hotel_tag_dict;
        if ($info) {
            // 种草秀数据查询
            $info[ 'sow_show_list' ] = event('SowShowData', [ 'relate_id' => $info[ 'hotel_id' ], 'relate_type' => 'hotel', 'limit' => 3 ])[ 0 ] ?? [];
        }
        return $info;
    }

    /**
     * 查询推荐酒店
     * @return void
     */
    public function getRecommend(array $data = [])
    {
        $field = 'hotel_id,hotel_name,site_id,hotel_star, hotel_tag, hotel_cover,hotel_images,hotel_attribute,create_time,full_address,hotel_status';
        $order = 'create_time desc';
        $condition = [
            [ 'site_id', '=', $this->site_id ],
            [ 'hotel_status', '=', 1 ]
        ];
        if (!empty($data[ 'goods_ids' ])) {
            $condition[] = [ 'hotel_id', 'in', $data[ 'goods_ids' ] ];
        }
        $list = $this->model->where($condition)->field($field)->with([ "goods" => function($query) {
            $query->where([ [ 'is_default', '=', 1 ] ]);
        } ])->order($order)->append([ 'cover_thumb_mid', 'cover_thumb_big' ])->limit($data[ 'limit' ])->select()->toArray();
        $room_service = new RoomService();
        $core_goods_service = new CoreGoodsService();
        if ($this->member_id) $member_info = $core_goods_service->getMemberInfo($this->member_id, $this->site_id);

        foreach ($list as $key => &$val) {
            $val = $room_service->getRoomPrice($val);
            if ($this->member_id) {
                $val[ 'member_price' ] = $core_goods_service->getMemberPrice($member_info, $val[ 'goods' ][ 'member_discount' ], $val[ 'price' ], $val[ 'day_info' ] ?? [], $val[ 'goods' ][ 'fixed_discount' ]);
            }
        }
        return $list;
    }

}
