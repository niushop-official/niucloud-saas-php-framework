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

namespace addon\o2o\app\service\api\technician;

use addon\o2o\app\dict\GoodsDict;
use addon\o2o\app\dict\TechnicianDict;
use addon\o2o\app\model\Technician;
use addon\o2o\app\model\TechnicianGoods;
use addon\o2o\app\service\api\goods\GoodsService;
use core\base\BaseApiService;

/**
 * 技师服务层
 * Class TechnicianService
 * @package app\service\api\technician
 */
class TechnicianService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Technician();
    }

    /**
     * 获取技师列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = ['technician.site_id', '=', $this->site_id];
        $field = 'technician.id,technician.site_id,technician.member_id,technician.name,technician.age,technician.mobile,technician.working_age,technician.status,technician.label,technician.position_id,technician.position_name,technician.order_num,technician.service_time,technician.create_time,technician.bad_evaluate,technician.headimg,technician.images,technician.desc';
        $order = 'technician.create_time desc';

        $search_model = $this->model->where([ ['technician.site_id', '=', $this->site_id],['technician.status', '=', TechnicianDict::ON] ])->withSearch(["mobile","name","create_time"], $where)
            ->withJoin(['member' => ['member_id', 'member_no', 'username', 'mobile', 'nickname', 'headimg']])->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid', 'headimg_big', 'images_big']);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取技师列表
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        $where[] = ['technician.site_id', '=', $this->site_id];
        $field = 'technician.id,technician.site_id,technician.member_id,technician.name,technician.age,technician.mobile,technician.working_age,technician.status,technician.label,technician.position_id,technician.position_name,technician.order_num,technician.service_time,technician.create_time,technician.bad_evaluate,technician.headimg,technician.images,technician.desc';
        $order = 'technician.create_time desc';

        return $this->model->where([ ['technician.site_id', '=', $this->site_id],['technician.status', '=', TechnicianDict::ON] ])->withSearch(["mobile","name","create_time"], $where)
            ->withJoin(['member' => ['member_id', 'member_no', 'username', 'mobile', 'nickname', 'headimg']])->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid', 'headimg_big', 'images_big'])->select()->toArray();
    }

    /**
     * 获取技师信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,name,age,mobile,working_age,status,label,position_id,position_name,order_num,service_time,create_time,bad_evaluate, headimg,images,desc';
        $info = $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->with(
            [
                'member' => function($query) {
                    $query->field('member_id,mobile,nickname, headimg');
                }
            ]
        )->field($field)->append([ 'status_name', 'headimg_mid', 'images_mid', 'headimg_big', 'images_big'])->findOrEmpty()->toArray();
        $info['goods'] = (new TechnicianGoods())->where([ ['technician_id', '=', $id], ['site_id', '=', $this->site_id] ])->with(
            [
                'goods_info' => function($query) {
                    $query->field('site_id,goods_name,goods_id,goods_cover, sale_num,goods_image,price,buy_type,member_discount')->append([ 'cover_thumb_small' ]);
                }
            ]
        )->select()->toArray();

        if (!empty($this->member_id)) {
            $goods_service = new GoodsService();
            $member_info = $goods_service->getMemberInfo();
            foreach ($info['goods'] as $k => &$v) {
                if($v['goods_info']['buy_type'] == GoodsDict::BUY) $v['goods_info'][ 'goodsSku' ][ 'member_price' ] = $goods_service->getMemberPrice($member_info, $v['goods_info'][ 'member_discount' ], $v['goods_info'][ 'goodsSku' ][ 'member_price' ], $v['goods_info'][ 'goodsSku' ][ 'price' ]);
            }
        }

        return $info;
    }

    /**
     * 获取支持该商品的技师
     * @param int $goods_id
     */
    public function getGoodsTechnician(int $goods_id, array $where)
    {
        $technician_ids = (new TechnicianGoods())->where([ ['goods_id', 'in', $goods_id], ['site_id', '=', $this->site_id] ])->column('technician_id');
        $field = 'id,site_id,member_id,name,age,mobile,working_age,status,label,position_id,position_name,order_num,service_time,create_time,bad_evaluate,headimg,images,desc';
        $order = 'create_time desc';
        return $this->model->where([ ['site_id', '=', $this->site_id],['status', '=', TechnicianDict::ON], ['id', 'in', $technician_ids] ])->withSearch(["mobile","name","create_time"], $where)->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid', 'headimg_big', 'images_big'])->select()->toArray();
    }

    /**
     * 验证是否是技师
     * @return array
     */
    public function checkTechnician()
    {
        $field = 'id,site_id,member_id,name,age,mobile,working_age,status,label,position_id,position_name,order_num,service_time,create_time,bad_evaluate,headimg,images,desc';
        $order = 'create_time desc';
        $info = $this->model->where([ ['site_id', '=', $this->site_id],['member_id', '=', $this->member_id] ])->field($field)->order($order)->append([ 'status_name', 'headimg_mid', 'images_mid', 'headimg_big', 'images_big'])->findOrEmpty()->toArray();
        return $info;
    }

}
