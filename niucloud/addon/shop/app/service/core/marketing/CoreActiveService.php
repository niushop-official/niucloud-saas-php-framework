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

namespace addon\shop\app\service\core\marketing;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\job\marketing\ActiveEndAfter;
use addon\shop\app\job\marketing\ActiveStartAfter;
use addon\shop\app\model\active\Active;
use addon\shop\app\model\active\ActiveGoods;
use core\base\BaseCoreService;
use core\exception\AdminException;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 活动
 */
class CoreActiveService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Active();
    }

    /**
     * 添加活动
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $active_goods_data = $data['active_goods'] ?? [];
        if(empty($active_goods_data)) throw new AdminException('ACTIVE_GOODS_NOT_EMPTY');

        if(!empty($data['end_time']) && $data['end_time'] < time()) throw new AdminException('END_TIME_NOT_LESS_CURRENT_TIME');

        Db::startTrans();
        try {
            $create_data = [
                'site_id'=> $data['site_id'],
                'active_name'=> $data['active_name'] ?? '',
                'active_desc'=> $data['active_desc'] ?? '',
                'active_type' => $data['active_type'],
                'active_goods_type' => $data['active_goods_type'],
                'active_goods_info' => $data['active_goods_info'] ?? '',
                'active_class' => $data['active_class'],
                'active_class_category' => $data['active_class_category'] ?? '',
                'active_value' => $data['active_value'] ?? '',
                'relate_member' => $data['relate_member'] ?? '',
                'create_time' => time(),
                'update_time' => 0,
                'start_time' => $data['start_time'] ?? 0,
                'end_time' => $data['end_time'] ?? 0,
                'active_status' => $data['active_status'],
            ];

            $res = $this->model->create($create_data);
            $active_goods = [];
            foreach ($active_goods_data as $k => $v){
                $active_goods[] = [
                    'active_id' => $res->active_id,
                    'site_id' => $data['site_id'],
                    'goods_id' => $v['goods_id'],
                    'sku_id' => !empty($v['sku_id']) ? $v['sku_id'] : 0,
                    'active_goods_value' => $v['active_goods_value'] ?? [],
                    'active_goods_status' => $create_data['active_status'],
                    'active_goods_price' => $v['active_goods_price'] ?? 0.00,
                    'active_goods_type' => $v['active_goods_type'],
                    'active_class' => $v['active_class'],
                    'active_goods_label' => $v['active_goods_label'] ?? '',
                    'active_goods_category' => $v['active_goods_category'] ?? '',
                    'active_goods_point' => $v['active_goods_point'] ?? 0.00,
                    'active_goods_stock' => $v['active_goods_stock'] ?? 0,
                ];
            }
            $active_goods_model = new ActiveGoods();
            $active_goods_model->saveAll($active_goods);

            Db::commit();

            if(!empty($data['start_time']) && $create_data['start_time'] <= time()) $this->start($res->active_id);
            if(!empty($data['end_time']) && $create_data['end_time'] <= time()) $this->end($res->active_id);
            return $res->active_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 编辑活动
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $active_id, array $data)
    {
        $info = $this->model->where([ ['site_id', '=', $data['site_id']], ['active_id', '=', $active_id] ])->findOrEmpty();
        if ($info->isEmpty()) throw new AdminException('ACTIVE_NOT_FOUND');
        if ($info->active_class != ActiveDict::NEWCOMER_DISCOUNT && ($info->active_status == ActiveDict::CLOSE || $info->active_status == ActiveDict::END)) throw new AdminException('ACTIVE_NOT_EDIT');

        //结束时间不能小于当前时间
        if(!empty($data['end_time']) && $data['end_time'] < time()) throw new AdminException('END_TIME_NOT_LESS_CURRENT_TIME');
        $active_goods_data = $data['active_goods'] ?? [];
        if($data['active_class'] != ActiveDict::NEWCOMER_DISCOUNT && empty($active_goods_data)) throw new AdminException('ACTIVE_GOODS_NOT_EMPTY');
        $active_goods_model = new ActiveGoods();
        Db::startTrans();
        try {

            $active_goods_list = $active_goods_model->where([ ['active_id', '=', $active_id], ['site_id', '=', $data['site_id']] ])->select()->toArray();
            $active_goods_list = array_column($active_goods_list, null, 'goods_id');

            $save_data = [
                'site_id'=> $data['site_id'],
                'active_name'=> $data['active_name'] ?? '',
                'active_desc'=> $data['active_desc'] ?? '',
                'active_type' => $data['active_type'],
                'active_goods_type' => $data['active_goods_type'],
                'active_goods_info' => $data['active_goods_info'] ?? '',
                'active_class' => $data['active_class'],
                'active_class_category' => $data['active_class_category'] ?? '',
                'active_value' => $data['active_value'] ?? '',
                'relate_member' => $data['relate_member'] ?? '',
                'update_time' => time(),
                'start_time' => $data['start_time'] ?? 0,
                'end_time' => $data['end_time'] ?? 0,
                'active_status' => $data['active_status'],
            ];

            $this->model->where([ ['active_id', '=', $active_id] ])->update($save_data);

            $active_goods = [];
            foreach ($active_goods_data as $k => $v){
                $active_goods[] = [
                    'active_id' => $active_id,
                    'site_id' => $data['site_id'],
                    'goods_id' => $v['goods_id'],
                    'sku_id' => !empty($v['sku_id']) ? $v['sku_id'] : 0,
                    'active_goods_value' => $v['active_goods_value'] ?? [],
                    'active_goods_status' => $save_data['active_status'],
                    'active_goods_price' => $v['active_goods_price'] ?? 0.00,
                    'active_goods_type' => $v['active_goods_type'],
                    'active_class' => $v['active_class'],
                    'active_goods_label' => $v['active_goods_label'] ?? '',
                    'active_goods_category' => $v['active_goods_category'] ?? '',
                    'active_goods_point' => $v['active_goods_point'] ?? 0.00,
                    'active_goods_stock' => $v['active_goods_stock'] ?? 0,
                    'active_goods_order_money' => $active_goods_list[$v['goods_id']]['active_goods_order_money'] ?? 0,
                    'active_goods_order_num' => $active_goods_list[$v['goods_id']]['active_goods_order_num'] ?? 0,
                    'active_goods_member_num' => $active_goods_list[$v['goods_id']]['active_goods_member_num'] ?? 0,
                    'active_goods_success_num' => $active_goods_list[$v['goods_id']]['active_goods_success_num'] ?? 0,
                ];
            }

            $active_goods_model->where([ ['active_id', '=', $active_id], ['site_id', '=', $data['site_id']] ])->delete();
            $active_goods_model->saveAll($active_goods);

            Db::commit();
            if(!empty($save_data['start_time']) && $save_data['start_time'] <= time())$this->start($active_id);
            if(!empty($save_data['end_time']) && $save_data['end_time'] <= time())$this->end($active_id);
            event('ActiveSaveAfter', $data);
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 删除活动
     * @param int $active_id
     * @return bool
     */
    public function del(int $active_id, int $site_id,$is_force=0)
    {
        $info = $this->model->where([ ['site_id', '=', $site_id], ['active_id', '=', $active_id] ])->findOrEmpty();
        if ($info->isEmpty()) throw new AdminException('ACTIVE_NOT_FOUND');
        if ($is_force==0 && $info->active_status == ActiveDict::ACTIVE) throw new AdminException('ACTIVE_NOT_DELETE');
        $this->model->where([ [ 'active_id', '=', $active_id ], ['site_id', '=', $site_id] ])->delete();
        (new ActiveGoods())->where([ [ 'active_id', '=', $active_id ],['site_id', '=', $site_id] ])->delete();
        return true;
    }

    /**
     * 活动关闭
     * @return void
     */
    public function close($active_id, int $site_id)
    {
        $this->model->where([ ['site_id', '=', $site_id], ['active_id', '=', $active_id], ['active_status', '=', ActiveDict::ACTIVE] ])->update([ 'active_status' => ActiveDict::CLOSE ]);
        (new ActiveGoods())->where([ ['site_id', '=', $site_id], ['active_id', '=', $active_id]])->update([ 'active_goods_status' => ActiveDict::CLOSE ]);
        return true;
    }

    /**
     * 活动开启
     * @return void
     */
    public function start($active_id)
    {
        $this->model->where([ ['active_id', '=', $active_id], ['active_status', '=', ActiveDict::NOT_ACTIVE], ['start_time', '<=', time()] ])->update([ 'active_status' => ActiveDict::ACTIVE ]);
        (new ActiveGoods())->where([ ['active_id', '=', $active_id]])->update([ 'active_goods_status' => ActiveDict::ACTIVE ]);
        ActiveStartAfter::dispatch(['active_id' => $active_id]);
        return true;
    }

    /**
     * 活动结束
     * @return void
     */
    public function end($active_id)
    {
        $this->model->where([ ['active_id', '=', $active_id], ['active_status', '=', ActiveDict::ACTIVE], ['end_time', '<=', time()] ])->update([ 'active_status' => ActiveDict::END ]);
        (new ActiveGoods())->where([ ['active_id', '=', $active_id]])->update([ 'active_goods_status' => ActiveDict::END ]);
        ActiveEndAfter::dispatch(['active_id' => $active_id]);
        return true;
    }

}
