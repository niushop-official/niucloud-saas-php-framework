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

namespace addon\vipcard\app\service\api\goods;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\model\Goods;
use app\dict\sys\FileDict;
use core\base\BaseApiService;

/**
 * 卡项服务层(项目)
 * Class GoodsService
 * @package addon\vipcard\app\service\api\goods
 */
class CardService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取卡项列表(service)
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,card_type,virtually_sale';
        $order = '';

        $search_model = $this->model->where([['site_id', '=', $this->site_id], ['goods_type', '=', GoodsDict::getGoodsType("card")["type"] ], ['status', '=', 1]])->withSearch(["goods_name","category_id","card_type","create_time"], $where)->field($field)->order($order)->append(['card_type_name','cover_thumb_small','cover_thumb_mid','image_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取卡项信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_content,goods_cover,buy_info,goods_image,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,card_type,scribe_price,keywords,common_num,virtually_sale';

        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->with(['item' => function($query){
            $query->field("main_goods_id,relate_goods_id,num");
        }])->append(['sale_num'])->findOrEmpty()->toArray();

        if(!empty($info['item'])){
            foreach ($info['item'] as $key => $val){
                $item = $this->model->field("goods_name,price,goods_cover")->where([['goods_id', '=', $val['relate_goods_id']], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
                $info['item'][$key]['goods_name'] = $item['goods_name'];
                $info['item'][$key]['goods_cover'] = get_thumb_images($this->site_id, $item['goods_cover'], FileDict::SMALL);
                $info['item'][$key]['price'] = $item['price'];
            }
        }

        return $info;
    }

    /**
     * 获取卡项列表
     * @param array $where
     * @return array
     */
    public function getLists(array $data)
    {

        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,card_type,virtually_sale';
        $order = 'create_time desc';

        $list = $this->model->where([['site_id', '=', $this->site_id], ['goods_type', '=', GoodsDict::getGoodsType("card")["type"] ], ['status', '=', 1]])->field($field)->order($order)->limit($data['limit'])->append(['card_type_name','cover_thumb_small', 'cover_thumb_mid', 'image_thumb_small'])->select()->toArray();
        return $list;
    }

}
