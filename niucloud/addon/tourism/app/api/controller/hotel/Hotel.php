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

use addon\tourism\app\service\api\hotel\HotelService;
use core\base\BaseApiController;


/**
 * 酒店控制器
 * Class Hotel
 * @package addon\tourism\app\api\controller\hotel
 */
class Hotel extends BaseApiController
{
    /**
     * 获取酒店列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["hotel_name",""],
            ["search_name",""],
            ["create_time",""],
            ['order', 'create_time desc']
        ]);
        return success((new HotelService())->getPage($data));
    }

    /**
     * 酒店详情
     * @param int $hotel_id
     * @return \think\Response
     */
    public function info(int $hotel_id){
        return success((new HotelService())->getInfo($hotel_id));
    }

    /**
     * 推荐酒店
     * @return void
     */
    public function recommend() {
        $data = $this->request->params([
            ["limit", 4],
            ['goods_ids', []]
        ]);
        return success((new HotelService())->getRecommend($data));
    }
}
