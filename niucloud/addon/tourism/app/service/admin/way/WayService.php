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

namespace addon\tourism\app\service\admin\way;

use addon\tourism\app\model\Goods;
use addon\tourism\app\model\GoodsDay;
use addon\tourism\app\model\Way;
use addon\tourism\app\service\admin\goods\GoodsDayService;
use app\dict\sys\FileDict;
use core\base\BaseAdminService;


/**
 * 线路服务层
 * Class WayService
 * @package addon\tourism\app\service\admin\way
 */
class WayService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Way();
    }

    /**
     * 获取线路列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'way_id,site_id,group_buy_type,way_theme,travel_type,way_traffic,way_name,way_cover,way_status,create_time,start_city,end_city';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(["way_name", "start_city", "end_city", "status", "create_time"], $where)->field($field)->with(['goods' => function($query) {
        $query->field('goods_id, site_id, member_discount, fixed_discount,stock, goods_name, goods_type, way_id, goods_cover, goods_image, goods_content, sort, status, sale_num, price,sale_price, buy_info');
        }])->order($order)->append(['group_buy_type_name', 'way_theme_name','travel_type_name', 'way_traffic_name', 'status_name']);
        $list = $this->pageQuery($search_model);
        $goodsDayModel = new GoodsDay();
        foreach ($list['data'] as $key => &$val){
            //查询总销售数量
            $list['data'][$key]['sell_sum'] = $goodsDayModel->where([['goods_id', '=', $val['goods']['goods_id']]])->sum('sell_num');

            $list['data'][$key]['goods']['cover_thumb_small'] = get_thumb_images($val['site_id'], $val['goods']['goods_cover'], FileDict::SMALL);
            $list['data'][$key]['member_discount'] = $val['goods']['member_discount'] ?? '';
            $list['data'][$key]['fixed_discount'] = $val['goods']['fixed_discount'] ?? '';
            $list['data'][$key]['goods_id'] = $val['goods']['goods_id'] ?? 0;

        }
        return $list;
    }

    /**
     * 获取线路信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'way_id,site_id,poster_id,group_buy_type,way_theme,travel_type,way_traffic,way_name,way_cover,way_status,create_time,start_city,end_city,way_character,fee_desc';

        $info = $this->model->field($field)->where([['way_id', '=', $id], ['site_id', '=', $this->site_id]])->field($field)->with(['goods' => function($query) {
                $query->field('goods_id, site_id, member_discount,fixed_discount, stock, goods_name, goods_type, way_id, goods_cover, goods_image, goods_content, sort, status, sale_num, price, sale_price, buy_info');
            }])->append(['group_buy_type_name', 'way_theme_name','travel_type_name', 'way_traffic_name', 'image_thumb_mid', 'cover_thumb_mid'])->findOrEmpty()->toArray();

        $info['goods']['image_thumb_small'] = [];
        $goods_image = explode(",", $info['goods']['goods_image']);
        foreach ($goods_image as $val){
            $info['goods']['image_thumb_small'][] = get_thumb_images($info['site_id'], $val, FileDict::SMALL);
        }
        $info['goods']['cover_thumb_small'] = get_thumb_images($info['site_id'], $info['goods']['goods_cover'], FileDict::SMALL);

        $info['member_discount'] = $info['goods']['member_discount'];
        $info['fixed_discount'] = $info['goods']['fixed_discount'];

        // 海报id，处理数据类型
        if (empty($info[ 'poster_id' ])) $info[ 'poster_id' ] = '';

        return $info;
    }

    /**
     * 添加线路
     * @param array $data
     * @return mixed
     */
    public function add(array $data, $goods_data)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $result = $this->model->create($data);

        $goods_data['site_id'] = $this->site_id;
        $goods_data['goods_name'] = $data['way_name'];
        $goods_data['create_time'] = time();
        $goods_data['goods_type'] = 'way';
        $goods_data['way_id'] = $result->way_id;
        $add_goods_result = (new Goods())->create($goods_data);

        return [
            'way_id' => $result->way_id,
            'goods_id' => $add_goods_result->goods_id
        ];
    }

    /**
     * 线路编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data, $goods_data)
    {
        $data['update_time'] = time();
        $this->model->where([['way_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);

        $goods_data['goods_name'] = $data['way_name'];
        $goods_data['update_time'] = time();
        (new Goods())->where([['way_id', '=', $id], ['site_id', '=', $this->site_id]])->update($goods_data);
        $goods_info = $this->getInfo($id);
        //更新价格日历总库存
        if(isset($data['stock'])){
            (new GoodsDayService())->editGoodsDayStock($goods_info['goods_id'], $data['stock']);
        }

        return true;
    }

    /**
     * 线路上下架
     * @param int $id
     * @param int $status
     * @return bool
     */
    public function modifyWayStatus(int $id, int $status)
    {
        $this->model->where([['way_id', '=', $id], ['site_id', '=', $this->site_id]])->update(['way_status' => $status]);
        (new Goods())->where([['way_id', '=', $id], ['site_id', '=', $this->site_id]])->update(['status' => $status]);
        return true;
    }

    /**
     * 获取选择线路列表
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {
        $field = 'way_id,site_id,group_buy_type,way_theme,travel_type,way_traffic,way_name,way_cover,way_status,create_time,start_city,end_city';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id],['way_status','=',1]])->withSearch(["way_name", "start_city", "end_city", "status", "create_time"], $where)->field($field)->with(['goods' => function($query) {
            $query->field('goods_id, site_id, member_discount, fixed_discount,stock, goods_name, goods_type, way_id, goods_cover, goods_image, goods_content, sort, status, sale_num, price,sale_price, buy_info');
        }])->order($order)->append(['group_buy_type_name', 'way_theme_name','travel_type_name', 'way_traffic_name', 'status_name']);
        $list = $this->pageQuery($search_model);
        $goodsDayModel = new GoodsDay();
        foreach ($list['data'] as $key => &$val){
            //查询总销售数量
            $list['data'][$key]['sell_sum'] = $goodsDayModel->where([['goods_id', '=', $val['goods']['goods_id']]])->sum('sell_num');

            $list['data'][$key]['goods']['cover_thumb_small'] = get_thumb_images($val['site_id'], $val['goods']['goods_cover'], FileDict::SMALL);
            $list['data'][$key]['member_discount'] = $val['goods']['member_discount'] ?? '';
            $list['data'][$key]['fixed_discount'] = $val['goods']['fixed_discount'] ?? '';
            $list['data'][$key]['goods_id'] = $val['goods']['goods_id'] ?? 0;

        }
        return $list;
    }

}
