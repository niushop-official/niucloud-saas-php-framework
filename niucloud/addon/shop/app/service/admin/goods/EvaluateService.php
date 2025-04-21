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

namespace addon\shop\app\service\admin\goods;

use addon\shop\app\dict\goods\EvaluateDict;
use addon\shop\app\job\goods\GoodsEvaluateStat;
use addon\shop\app\model\goods\Evaluate;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\service\core\goods\CoreGoodsEvaluateService;
use addon\shop\app\service\core\goods\CoreGoodsStatService;
use core\base\BaseAdminService;
use think\db\Query;


/**
 * 商品评价服务层
 * Class EvaluateService
 * @package addon\shop\app\service\admin\goods
 */
class EvaluateService extends BaseAdminService
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
        $field = 'evaluate_id,site_id,order_id,order_goods_id,goods_id,member_id,content,images,is_anonymous,scores,is_audit,explain_first,create_time,topping';
        $order = 'create_time desc';

        $goods_where = [];
        if (isset($where[ 'goods_name' ]) && $where[ 'goods_name' ] != '') {
            $goods_where[] = [ 'goods.goods_name', 'like', '%' . $this->model->handelSpecialCharacter($where[ 'goods_name' ]) . '%' ];
        }

        $search_model = $this->model
            // ->withSearch(["goods_name"], $where)
            ->where([ [ 'evaluate.site_id', '=', $this->site_id ] ])
            ->field($field)
            ->withJoin([
                'goods' => function(Query $query) use ($goods_where) {
                    $query->where($goods_where);
                },
            ])
            ->order($order)->append([ 'audit_name', 'image_small', 'image_mid' ]);
        $list = $this->pageQuery($search_model, function($item, $key) {
            $item_goods = $item[ 'goods' ];
            if (!empty($item_goods)) {
                $item_goods->append([ 'goods_cover_thumb_small', 'goods_cover_thumb_mid' ]);
            }

        });
        return $list;
    }

    /**
     * 获取商品评价信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'evaluate_id,site_id,order_id,order_goods_id,goods_id,member_id,content,images,is_anonymous,scores,is_audit,explain_first,create_time';

        $info = $this->model->field($field)->where([ [ 'evaluate_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加商品评价
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'is_audit' ] = EvaluateDict::AUDIT_NO;
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreGoodsEvaluateService )->addEvaluate($data);
    }

    /**
     * 删除商品评价
     * @param int $id
     * @return bool
     */
    public function del(int $evaluate_id)
    {
        $model = $this->model->where([ [ 'evaluate_id', '=', $evaluate_id ], [ 'site_id', '=', $this->site_id ] ])->find();
        if (empty($model))return false;
        $res = $model->delete();

        CoreGoodsStatService::addStat([ 'site_id' => $this->site_id, 'goods_id' => $model->goods_id, 'evaluate_num' => -1 ]);
        ( new Goods() )->where([ [ 'goods_id', '=', $model->goods_id ] ])->dec('evaluate_num', 1)->update();
        return $res;
    }

    /**
     * 审核通过
     * @param $evaluate_id
     * @return bool
     */
    public function auditAdopt($evaluate_id)
    {
        $this->model->where([ [ 'evaluate_id', '=', $evaluate_id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_audit' => EvaluateDict::AUDIT_ADOPT ]);

        $goods_id = $this->model->where('evaluate_id', '=', $evaluate_id)->value('goods_id');
        if (empty($goods_id)) return false;
        CoreGoodsStatService::addStat([ 'site_id' => $this->site_id, 'goods_id' => $goods_id, 'evaluate_num' => 1 ]);
        ( new Goods() )->where([ [ 'goods_id', '=', $goods_id ] ])->inc('evaluate_num', 1)->update();
        return true;
    }

    /**
     * 审核拒绝
     * @param $evaluate_id
     * @return bool
     */
    public function auditRefuse($evaluate_id)
    {
        $this->model->where([ [ 'evaluate_id', '=', $evaluate_id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_audit' => EvaluateDict::AUDIT_REFUSE ]);
        return true;
    }

    /**
     * 评价回复
     * @param $evaluate_id
     * @param $data
     * @return bool
     */
    public function reply($evaluate_id, $data)
    {
        $this->model->where([ [ 'evaluate_id', '=', $evaluate_id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 置顶
     * @param $evaluate_id
     * @return bool
     */
    public function topping($evaluate_id)
    {
        $data = [
            'topping' => 1,
            'update_time' => time()
        ];
        $this->model->where([ [ 'evaluate_id', '=', $evaluate_id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 取消置顶
     */
    public function cancelTopping($evaluate_id)
    {
        $data = [
            'topping' => 0,
            'update_time' => 0
        ];
        $this->model->where([ [ 'evaluate_id', '=', $evaluate_id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 审核批量修改
     * @return bool
     */
    public function auditEditBatch()
    {
        // 查询待审核的id
        $evaluate_ids = $this->model->where([ [ 'is_audit', '=', EvaluateDict::AUDIT ], [ 'site_id', '=', $this->site_id ] ])->column('evaluate_id');
        if (!empty($evaluate_ids)) {
            GoodsEvaluateStat::dispatch([ 'evaluate_ids' => $evaluate_ids ]);
        }

        $this->model->where([ [ 'is_audit', '=', EvaluateDict::AUDIT ], [ 'site_id', '=', $this->site_id ] ])->update([ 'is_audit' => EvaluateDict::AUDIT_NO ]);
        return true;
    }

    /**
     * 批量设置评论审核状态后，更新评价统计数据
     * @param $evaluate_ids
     */
    public function updateGoodsEvaluateNumBach($evaluate_ids)
    {
        $list = $this->model->where([ [ 'evaluate_id', 'in', $evaluate_ids ], [ 'site_id', '=', $this->site_id ] ])->chunk(50, function($evaluate) {
            foreach ($evaluate as $item) {
                $goods_id = $this->model->where('goods_id', '=',  $item[ 'goods_id' ])->value('goods_id');
                if (!empty($goods_id)){
                    CoreGoodsStatService::addStat([ 'site_id' => $this->site_id, 'goods_id' => $item[ 'goods_id' ], 'evaluate_num' => 1 ]);
                    ( new Goods() )->where([ [ 'goods_id', '=', $item[ 'goods_id' ] ] ])->inc('evaluate_num', 1)->update();
                }
            }
        });
        return true;
    }
}
