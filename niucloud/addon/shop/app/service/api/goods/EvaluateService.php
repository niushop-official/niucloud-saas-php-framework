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

use addon\shop\app\dict\goods\EvaluateDict;
use addon\shop\app\model\goods\Evaluate;
use addon\shop\app\service\core\goods\CoreGoodsEvaluateService;
use addon\shop\app\service\core\order\CoreOrderConfigService;
use app\model\member\Member;
use core\exception\CommonException;
use core\base\BaseApiService;


/**
 * 商品评价服务层
 * Class EvaluateService
 * @package addon\shop\app\service\admin\goods
 */
class EvaluateService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Evaluate();
    }

    /**
     * 获取商品评价列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'evaluate_id,site_id,order_id,order_goods_id,goods_id,member_id,member_name,member_head,content,images,is_anonymous,scores,is_audit,explain_first,create_time,topping,update_time';
        $order = 'topping desc,update_time desc,create_time desc';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'is_audit', 'in', [ EvaluateDict::AUDIT_NO, EvaluateDict::AUDIT_ADOPT ] ] ])->withSearch([ "goods_id", "scores" ], $where)->field($field)->order($order)->append([ 'image_mid' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商品评价信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'evaluate_id,order_id,site_id,order_goods_id,goods_id,member_id,member_name,member_head,content,images,is_anonymous,scores,is_audit,explain_first,create_time';
        $info = $this->model->field($field)->where([ [ 'evaluate_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->append([ 'image_mid', 'image_big' ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加商品评价
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {

        $member_info = ( new Member() )->where([ [ 'member_id', '=', $this->member_id ] ])->field('nickname, headimg')->findOrEmpty()->toArray();
        if (empty($member_info)) throw new CommonException();

        $config = ( new CoreOrderConfigService() )->getEvaluateConfig($this->site_id);

        foreach ($data[ 'evaluate_array' ] as $key => $val) {
            $params = $val;
            $params[ 'site_id' ] = $this->site_id;
            $params[ 'member_id' ] = $this->member_id;
            $params[ 'member_name' ] = $member_info[ 'nickname' ];
            $params[ 'member_head' ] = $member_info[ 'headimg' ];
            $params[ 'is_audit' ] = $config[ 'evaluate_is_to_examine' ] == 1 ? 1 : 0;
            ( new CoreGoodsEvaluateService )->addEvaluate($params);
        }

        return true;
    }

    /**
     * 获取商品评价统计
     * @param $goods_id
     * @return mixed
     * @throws \think\db\exception\DbException
     */
    public function getCount($goods_id)
    {
        $data[ 'good_evaluate' ] = $this->model->where([ [ 'goods_id', '=', $goods_id ], [ 'scores', 'in', [ 4, 5 ] ], [ 'is_audit', 'in', [ EvaluateDict::AUDIT_NO, EvaluateDict::AUDIT_ADOPT ] ] ])->count();
        $data[ 'centre_evaluate' ] = $this->model->where([ [ 'goods_id', '=', $goods_id ], [ 'scores', 'in', [ 2, 3 ] ], [ 'is_audit', 'in', [ EvaluateDict::AUDIT_NO, EvaluateDict::AUDIT_ADOPT ] ] ])->count();
        $data[ 'wanting_centre_evaluate' ] = $this->model->where([ [ 'goods_id', '=', $goods_id ], [ 'scores', 'in', [ 1 ] ], [ 'is_audit', 'in', [ EvaluateDict::AUDIT_NO, EvaluateDict::AUDIT_ADOPT ] ] ])->count();
        return $data;
    }

    /**
     * 详情页展示评价
     * @param $goods_id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getList($goods_id)
    {
        $data = [];
        $field = 'evaluate_id,site_id,order_id,order_goods_id,goods_id,member_id,member_name,member_head,content,images,is_anonymous,scores,is_audit,explain_first,create_time,topping,update_time';
        $order = 'topping desc,update_time desc,create_time desc';
        $data[ 'list' ] = $this->model->field($field)->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $this->site_id ], [ 'is_audit', 'in', [ EvaluateDict::AUDIT_NO, EvaluateDict::AUDIT_ADOPT ] ] ])->limit(3)->order($order)->append([ 'image_mid' ])->select()->toArray();
        $data[ 'count' ] = $this->model->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $this->site_id ], [ 'is_audit', 'in', [ EvaluateDict::AUDIT_NO, EvaluateDict::AUDIT_ADOPT ] ] ])->count();

        return $data;
    }

    /**
     * 获取评价详情
     * @param $order_id
     */
    public function getDetail($order_id)
    {
        $field = 'evaluate_id,order_id,site_id,order_goods_id,goods_id,member_id,member_name,member_head,content,images,is_anonymous,scores,is_audit,explain_first,create_time';
        $list = $this->model->field($field)->where([ [ 'order_id', '=', $order_id ], [ 'site_id', '=', $this->site_id ] ])->with([
            'order_goods' => function($query) {
                $query->field('order_goods_id, site_id, goods_name, sku_name, goods_image, num, price')->append([ 'goods_image_thumb_mid' ]);
            }
        ])->append([ 'image_mid', 'image_big' ])->select()->toArray();
        return $list;
    }
}
