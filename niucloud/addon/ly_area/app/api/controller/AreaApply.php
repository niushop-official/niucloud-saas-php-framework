<?php

namespace addon\ly_area\app\api\controller;

use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\service\api\AreaApplyService;
use addon\ly_area\app\service\api\AreaLevelService;
use addon\ly_area\app\service\api\cart\CartService;
use app\service\admin\sys\AreaService;
use core\base\BaseApiController;

/**
 * 代理申请
 * Class AreaApply
 * @package addon\ly_area\app\api\controller
 */
class AreaApply extends BaseApiController
{

    /**
     * 添加申请
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ 'level_area', 0 ],
            [ 'apply_area', '' ],
            [ 'level_id', 0 ],
            [ 'province_id', 0 ],
            [ 'city_id', 0 ],
            [ 'district_id', 0 ],
            [ 'status', 0 ],
            ['create_time', time()],
            ['checked', ''],
        ]);

        $province = isset($data['province_id']) ? (new AreaService())->getAreaName($data['province_id']) : '';
        $city = isset($data['city_id']) && !empty($data['city_id']) ? (new AreaService())->getAreaName($data['city_id']) : '';
        $district = isset($data['district_id']) && !empty($data['district_id']) ? (new AreaService())->getAreaName($data['district_id']) : '';
        // $province = $data['province_id'];
        // $city = $data['city_id'];
        // $district = $data['district_id'];

        // var_dump($province, $city, $district);die;

        $data['apply_area'] = implode(' ', [$province, $city, $district]);

        $level = (new AreaLevel())->where('level_area', $data['level_area'])->findOrEmpty();
        $data['level_id'] = $level['level_id'];

        $id = ( ( new AreaApplyService() )->add($data) );
        return success('ADD_SUCCESS', [ 'apply_id' => $id ]);
    }

    /**
     * 编辑申请
     * @return \think\Response
     */
    public function edit()
    {
        $data = $this->request->params([
            [ 'apply_id', 0 ],
            [ 'level_area', 0 ],
            [ 'apply_area', '' ],
            [ 'level_id', 0 ],
            [ 'province_id', 0 ],
            [ 'city_id', 0 ],
            [ 'district_id', 0 ],
            [ 'status', 0 ],
            [ 'update_time', time() ],
        ]);

        $province = isset($data['province_id']) ? (new AreaService())->getAreaName($data['province_id']) : '';
        $city = isset($data['city_id']) && !empty($data['city_id']) ? (new AreaService())->getAreaName($data['city_id']) : '';
        $district = isset($data['district_id']) && !empty($data['district_id']) ? (new AreaService())->getAreaName($data['district_id']) : '';

        $data['apply_area'] = implode(' ', [$province, $city, $district]);

        $level = (new AreaLevel())->where('level_area', $data['level_area'])->findOrEmpty();

        ( new AreaApplyService() )->edit($data);
        return success('EDIT_SUCCESS');
    }

    public function applyInfo(){
        return success((new AreaApplyService())->getApplyInfo());
    }

    /**
     * 申请删除，支持批量
     * @return \think\Response
     */
    public function del()
    {
        $data = $this->request->params([
            [ 'apply_ids', '' ],
            [ 'delete_time', time()]
        ]);
        ( new AreaApplyService() )->del($data);
        return success('DELETE_SUCCESS');
    }


    /**
     * 申请列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([]);
        return success(( new AreaApplyService() )->getList($data));
    }

    /**
     * 获取购物车商品列表
     * @return \think\Response
     */
    public function goodsLists()
    {
        $data = $this->request->params([]);
        return success(( new CartService() )->getGoodsList($data));
    }

    /**
     * 获取购物车数量
     * @return \think\Response
     */
    public function sum()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
        ]);
        return success('SUCCESS', ( new CartService() )->getSum($data));
    }

}
