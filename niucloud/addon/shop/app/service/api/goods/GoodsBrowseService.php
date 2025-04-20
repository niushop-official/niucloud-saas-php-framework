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

namespace addon\shop\app\service\api\goods;

use addon\shop\app\model\goods\Browse;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\service\core\goods\CoreGoodsStatService;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 *  商品足迹服务层
 */
class GoodsBrowseService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Browse();
    }

    /**
     * 查询足迹
     * @param $data
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getMemberGoodsBrowse($data)
    {
        $field = 'member_id,browse_time,goods_id,sku_id';
        $start_time = isset($data[ 'date' ][ 0 ]) ? strtotime($data[ 'date' ][ 0 ]) : 0;
        $end_time = isset($data[ 'date' ][ 1 ]) ? strtotime($data[ 'date' ][ 1 ]) : time();

        $search_model = $this->model->field($field)->where([ [ 'browse.site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ], [ 'goods.delete_time', '=', 0 ] ])
            ->whereBetweenTime('browse_time', $start_time, $end_time)
            ->withJoin([ 'goods' => [ 'site_id', 'goods_id', 'goods_name', 'goods_cover', 'sale_num', 'virtual_sale_num', 'status', 'member_discount' ] ])
            ->with([ 'goodsSku' ])
            ->order('browse_time desc');
        $list = $this->pageQuery($search_model);
        if (!empty($list[ 'data' ])) {
            $goods_service = ( new GoodsService() );
            $member_info = $goods_service->getMemberInfo();
            foreach ($list[ 'data' ] as &$v) {
                if (!empty($v[ 'member_price' ])) {
                    $v[ 'member_price' ] = $goods_service->getMemberPrice($member_info, $v[ 'member_discount' ], $v[ 'member_price' ], $v[ 'price' ]);
                }
                $v[ 'browse_time_str' ] = strtotime($v[ 'browse_time' ]);
            }
        }

        return $list;
    }

    /**
     * 添加足迹
     */
    public function addGoodsBrowse($data)
    {
        $goods_info = ( new Goods() )->where([ [ 'site_id', '=', $this->site_id ], [ 'goods_id', '=', $data[ 'goods_id' ] ], [ 'delete_time', '=', 0 ] ])->field('site_id, goods_id')->findOrEmpty()->toArray();
        if (empty($goods_info)) throw new CommonException('SHOP_GOODS_NOT_EXIST');//商品不存在
        $sku_id = ( new GoodsSku() )->where([ [ 'site_id', '=', $this->site_id ], [ 'goods_id', '=', $data[ 'goods_id' ] ], [ 'is_default', '=', 1 ] ])->value('sku_id');
        $data = array_merge($data, $goods_info);
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'browse_time' ] = time();
        $data[ 'sku_id' ] = $sku_id;
        $info = $this->model->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'member_id', '=', $data[ 'member_id' ] ],
            [ 'goods_id', '=', $data[ 'goods_id' ] ],
        ])->findOrEmpty();
        if ($info->isEmpty()) {
            $this->model->create($data);
            CoreGoodsStatService::addStat([ 'site_id' => $this->site_id, 'goods_id' => $data[ 'goods_id' ], 'goods_visit_member_count' => 1 ]);
        } else {
            $info->save([
                'browse_time' => $data[ 'browse_time' ]
            ]);
        }
        return true;
    }

    /**
     * 删除足迹
     */
    public function deleteGoodsBrowse($data)
    {
        $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'goods_id', 'in', $data[ 'goods_ids' ] ], [ 'member_id', '=', $this->member_id ] ])->delete();
        return true;
    }

}
