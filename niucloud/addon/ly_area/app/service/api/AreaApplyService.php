<?php

namespace addon\ly_area\app\service\api;

use addon\ly_area\app\dict\area\AreaApplyDict;
use addon\ly_area\app\model\AreaApply;
use addon\ly_area\app\service\core\agent\CoreAreaAgentService;
use addon\ly_area\app\service\core\agent\CoreAreaApplyService;
use addon\ly_area\app\service\core\level\CoreAreaLevelService;
use addon\shop\app\model\cart\Cart;
use addon\shop\app\service\api\goods\GoodsService;
use app\dict\member\MemberDict;
use app\service\core\member\CoreMemberService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 代理申请服务层
 * Class CartService
 */
class AreaApplyService extends BaseApiService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new AreaApply();
    }

    /**
     * 添加代理申请
     * @param $data
     * @return mixed
     */
    public function add($data)
    {
        $config = (new CoreConfigService())->getConfigValue($this->site_id, 'LY_AREA_CONFIG');
        if($config['is_open'] == 0) throw new CommonException('LY_AREA_NOT_OPEN');

          //判断是否需要代理协议
        if($config['is_agreement']){
            if(!$data['checked']) throw new CommonException('PLEASE_READ_AND_AGREE_THE_AGENT_AGREEMENT'); //请阅读并同意代理协议
        }

        $member_info = ( new CoreMemberService() )->getInfoByMemberId($this->site_id, $this->member_id, 'status');
        if (empty($member_info)) throw new CommonException('SHOP_ORDER_BUYER_NOT_FOUND');//无效的账号
        if ($member_info[ 'status' ] == MemberDict::OFF) throw new CommonException('SHOP_ORDER_BUYER_LOCKED');//账号被锁定

        $agent = (new CoreAreaAgentService())->getAgentByMemberId($this->site_id, $this->member_id);
        if($config['become_many'] != 1 && !$agent->isEmpty()) throw new CommonException('LY_AREA_ALREADY_AGENT');//已经是代理了

         //是否申请过
        $apply_info = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->where('delete_time', 0)->field('apply_id, status')->order('create_time desc')->findOrEmpty()->toArray();
        if (!empty($apply_info)) {
            if ($apply_info['status'] == AreaApplyDict::REFUSE && $config['can_apply_again'] == 0) throw new CommonException('LY_AREA_APPLY_REFUSE');//申请被拒绝，不允许再次申请
            if ($apply_info['status'] == AreaApplyDict::WAIT_AUDIT) throw new CommonException('LY_AREA_APPLYING');//已经宴请过，请t耐心等待
        }

        //判断该区域是否已经有代理
        $has_agent = (new CoreAreaAgentService())->getAgentByArea($this->site_id, $data['province_id'], $data['city_id'], $data['district_id']);
        if(!$has_agent->isEmpty()) throw new CommonException('THIS_AREA_ALREADY_AGENT'); //该区域已经有代理了
        
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;

        $res = (new CoreAreaApplyService())->apply($data);
        if($res){
            return json(['code' => 0, 'message' => '申请成功，请耐心等待审核']);
        }

         // 添加
        // $res = $this->model->create($data);

        // return $res->apply_id; 
    }

    /**
     * 获取当前会员的申请信息
     * @return mixed
     * */
    public function getApplyInfo(){
        return $this->model
            ->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])
            ->where('delete_time', 0)
            ->field("*")
            ->order('create_time desc')
            ->findOrEmpty()->toArray();
    }


    /**
     * 编辑代理申请
     * @param $data
     * @return bool
     */
    public function edit($data)
    {
        $member_info = ( new CoreMemberService() )->getInfoByMemberId($this->site_id, $this->member_id, 'status');

        if (empty($member_info)) throw new CommonException('SHOP_ORDER_BUYER_NOT_FOUND');//无效的账号
        if ($member_info[ 'status' ] == MemberDict::OFF) throw new CommonException('SHOP_ORDER_BUYER_LOCKED');//账号被锁定

        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;
        $info = $this->model->where([
            [ 'id', '=', $data[ 'id' ] ],
            [ 'member_id', '=', $data[ 'member_id' ] ],
            [ 'site_id', '=', $data[ 'site_id' ] ],
        ])->field('sku_id')->findOrEmpty()->toArray();

        if (empty($info)) return false;

        $update = [
            'num' => $data[ 'num' ]
        ];

        if (!empty($data[ 'sku_id' ]) && $info[ 'sku_id' ] != $data[ 'sku_id' ]) {
            $update[ 'sku_id' ] = $data[ 'sku_id' ];

            $cart_info = $this->model->where([
                [ 'sku_id', '=', $data[ 'sku_id' ] ],
                [ 'member_id', '=', $this->member_id ],
            ])->field('id')->findOrEmpty()->toArray();

            if (!empty($cart_info)) {
                $this->model->where([ [ 'id', '=', $cart_info[ 'id' ] ] ])->delete();
            }
        }

        $this->model->where([ [ 'id', '=', $data[ 'id' ] ] ])->update($update);
        return true;
    }

    /**
     * 代理申请删除，支持批量
     * @param $data
     * @return bool
     */
    public function del($data)
    {
        $this->model->where([ [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ], [ 'apply_id', 'in', $data[ 'apply_ids' ] ] ])->delete();
        return true;
    }

    /**
     * 清空代理申请
     * @return bool
     */
    public function clear()
    {
        $this->model->where([ [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ] ])->delete();
        return true;
    }

    /**
     * 获取代理申请列表
     * @param $data
     * @return array
     */
    public function getList($data)
    {
        $data[ 'member_id' ] = $this->member_id;
        $field = 'apply_id, member_id, goods_id, site_id, sku_id, num, market_type, market_type_id, status, invalid_remark';
        $order = "create_time desc";
        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "member_id" ], $data)->field($field)
            ->with([
                'goodsSku' => function($query) {
                    $query->withField('sku_id, site_id, sku_image, price, sale_price, stock,member_price');
                },
                'goods' => function($query) {
                    $query->withField('goods_id, site_id, status,delete_time,member_discount,is_discount');
                },
            ])->order($order)->select()->toArray();

        $goods_service = new GoodsService();
        $member_info = $goods_service->getMemberInfo();
        foreach ($list as $k => &$v) {
            if (!empty($v[ 'goodsSku' ])) {
                $v[ 'goodsSku' ][ 'member_price' ] = $goods_service->getMemberPrice($member_info, $v[ 'goods' ][ 'member_discount' ], $v[ 'goodsSku' ][ 'member_price' ], $v[ 'goodsSku' ][ 'price' ]);
            }
        }
        return $list;
    }

    /**
     * 获取代理申请商品列表
     * @param $data
     * @return array
     */
    public function getGoodsList($data)
    {
        $data[ 'member_id' ] = $this->member_id;
        $field = 'id, member_id, goods_id, sku_id, num, market_type, market_type_id, status, invalid_remark';
        $order = "create_time desc";
        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "member_id" ], $data)->field($field)
            ->with([
                'goods' => function($query) {
                    $query->withField('goods_id, site_id, goods_name, goods_type, sub_title, goods_cover, unit, stock, sale_num + virtual_sale_num as sale_num, status,delete_time,member_discount,is_discount');
                },
                'goodsSku' => function($query) {
                    $query->withField('sku_id, site_id, sku_name, sku_image, sku_no, goods_id, sku_spec_format, price, market_price, sale_price, stock, weight, volume, is_default,member_price');
                },
                // 商品规格项/规格值列表
                'goodsSpec' => function($query) {
                    $query->field('spec_id, goods_id, spec_name, spec_values');
                },
            ])->order($order)->select()->toArray();

        $goods_service = new GoodsService();
        $member_info = $goods_service->getMemberInfo();
        foreach ($list as $k => &$v) {
            if (!empty($v[ 'goodsSku' ])) {
                $v[ 'goodsSku' ][ 'member_price' ] = $goods_service->getMemberPrice($member_info, $v[ 'goods' ][ 'member_discount' ], $v[ 'goodsSku' ][ 'member_price' ], $v[ 'goodsSku' ][ 'price' ]);
            }
        }
        return $list;
    }

    /**
     * 获取代理申请数量
     * @param $data
     * @return float
     */
    public function getSum($data)
    {
        $condition = [
            [ 'member_id', '=', $this->member_id ],
            [ 'site_id', '=', $this->site_id ]
        ];
        if (!empty($data[ 'goods_id' ])) {
            $condition[] = [ 'goods_id', '=', $data[ 'goods_id' ] ];
        }
        return $this->model->where($condition)->sum('num');
    }

}
