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

namespace addon\tourism\app\api\controller\hotel;

use core\base\BaseAdminController;
use addon\tourism\app\service\api\hotel\RoomService;

/**
 * 房间类型控制器
 * Class Room
 * @package addon\tourism\app\api\controller\hotel
 */
class Room extends BaseAdminController
{
    /**
     * 获取房型列表
     * @return \think\Response
     */
    public function lists(int $hotel_id){
        $data = $this->request->params([
            ["date", ""],
        ]);
        return success((new RoomService())->getListByHotelId($hotel_id, date:$data['date']));
    }

    /**
     * 房型详情
     * @param int $room_id
     * @return \think\Response
     */
    public function info(int $room_id){
        return success((new RoomService())->getInfo($room_id));
    }

    /**
     * 获取酒店价格日历
     */
    public function goodsDay(int $hotel_id){
        return success((new RoomService())->getGoodsDay($hotel_id));
    }
}
