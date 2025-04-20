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

namespace addon\tourism\app\service\admin\goods;

use addon\tourism\app\dict\goods\GoodsDict;
use addon\tourism\app\model\Goods;
use addon\tourism\app\model\GoodsDay;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 房型
 * Class TourismGoodsService
 * @package app\service\admin\tourism_goods
 */
class GoodsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 选择商品
     * @param $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getListOfSelect($where = []){
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'goods_id, site_id, goods_name, goods_type, goods_cover, goods_image, status, price, stock, create_time, way_id, hotel_id, scenic_id';
        $order = 'create_time desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id]])
            ->withSearch(['create_time','goods_type', 'goods_name'], $where)->field($field)->order($order)
            ->append(['status_name','cover_thumb_mid', 'cover_thumb_small', 'goods_type_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 编辑商品会员价格
     * @param $params
     * @return array|bool
     */
    public function editGoodsMemberPrice($params)
    {
        $goods_type = $params['goods_type'];
        if(!in_array($goods_type, [GoodsDict::ROOM,GoodsDict::WAY,GoodsDict::SCENIC])){
            throw new CommonException('商品类型错误');
        }
        try {
            Db::startTrans();

            $this->model->where([
                [ 'goods_id', 'in', $params[ 'goods_ids' ] ],
                [ 'goods_type', '=',  $goods_type],
                [ 'site_id', '=', $this->site_id ]
            ])->update([
                'member_discount' => $params[ 'member_discount' ],
                'fixed_discount' => json_encode($params['fixed_discount'])
            ]);

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage() . '，Line：' . $e->getLine() . '，File：' . $e->getFile());
        }
    }

    /**
     * 设置商品日历价
     * @return void
     */
    public function editGoodsDayMemberPrice($params)
    {
        $goods_ids = $params['goods_ids'];
        $start_date = strtotime($params['start_date']);
        $end_date = strtotime($params['end_date']);
        $member_price = $params['member_price'];//是否参与 1-参与 0-不参与
        $is_set = $params['is_set'];
        try{
            Db::startTrans();
            $num = 0;
            if($is_set == 2) $num = ($end_date - $start_date)/86400;

            $goods_list = $this->model->where([ ['site_id', '=', $this->site_id], ['goods_id', 'in', $goods_ids], ['member_discount', '<>', ''] ])->select()->toArray();

            $goods_day_model = new GoodsDay();

            foreach ($goods_list as $k => $v){

                for ($i = 0; $i <= $num; $i ++){
                    $date_time = $i * 86400 + $start_date;
                    $info = $goods_day_model->where([ ['time_date', '=', date("Y-m-d", $date_time)], ['goods_id', '=', $v['goods_id']] ])->findOrEmpty()->toArray();

                    if($info){
                        $update_data = [
                            'member_price' => $member_price,
                        ];
                        $goods_day_model->where([['time_date', '=', date("Y-m-d", $date_time)], ['goods_id', '=', $v['goods_id']]])->update(
                            $update_data
                        );
                    }else{
                        $data = [
                            'goods_id' => $v['goods_id'],
                            'stock_all' => $v['stock'],
                            'year' => date('Y', $date_time),
                            'month' => date('m', $date_time),
                            'day' => date('d', $date_time),
                            'create_time' => time(),
                            'time' => $date_time,
                            'time_date' => date("Y-m-d", $date_time),
                            'member_price' => $member_price,
                        ];

                        $goods_day_model->create($data);
                    }
                }
            }

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage() . '，Line：' . $e->getLine() . '，File：' . $e->getFile());
        }

    }
}