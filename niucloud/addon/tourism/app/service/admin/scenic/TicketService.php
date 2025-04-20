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

namespace addon\tourism\app\service\admin\scenic;

use addon\tourism\app\model\Goods;
use addon\tourism\app\model\Scenic;
use addon\tourism\app\service\admin\goods\GoodsDayService;
use core\base\BaseAdminService;
use core\exception\AdminException;

/**
 * 房型
 * Class TourismGoodsService
 * @package app\service\admin\tourism_goods
 */
class TicketService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取门票列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'site_id,scenic_id,goods_id,member_discount,fixed_discount,goods_name,goods_type,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,sort,price,sale_price,cost_price,create_time,stock,sell_type, buy_info';
        $order = '';
        $search_model = $this->model->where([['site_id', '=', $this->site_id],['goods_type', '=', "scenic"], ["scenic_id", "=", $where['scenic_id']]])->withSearch(["goods_name", "create_time"], $where)->field($field)->order($order)->append(["status_name"]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取门票信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'site_id,goods_name,goods_type,member_discount,fixed_discount,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,sort,price,sale_price,cost_price,create_time,stock,sell_type, buy_info';
        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加门票
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $data['goods_type'] = "scenic";

        $info = $this->model->where([['scenic_id', '=', $data['scenic_id']], ['is_default', '=', 1]])->field("goods_id")->findOrEmpty();
        if($info->isEmpty()) $data['is_default'] = 1;

        $res = $this->model->create($data);
        return $res->goods_id;

    }

    /**
     * 门票编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        //更新价格日历总库存
        if(isset($data['stock'])){
            (new GoodsDayService())->editGoodsDayStock($id, $data['stock']);
        }
        return true;
    }

    /**
     * 删除门票
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $info = $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->field('scenic_id, is_default, status')->findOrEmpty();
        if($info->isEmpty()) throw new AdminException('TICKET_NOT_EXIST');
        $count = $this->model->where([['goods_id', '<>', $id], ['scenic_id', '=', $info->scenic_id], ['site_id', '=', $this->site_id], ['status', '=', 1]])->count();
        $scenic = (new Scenic())->where([['scenic_id', '=', $info->scenic_id]])->field("scenic_status")->findOrEmpty();
        if($info['status'] == 1 && $scenic['scenic_status'] == 1 && $count < 1) throw new AdminException('LAST_TICKET_NOT_DELETE');

        if($info->is_default == 1){
            $other_info = $this->model->where([['goods_id', '<>', $id], ['status', '=', 1], ['scenic_id', '=', $info->scenic_id]])->field("goods_id")->order("price asc")->findOrEmpty();
            if($other_info) $this->model->where([['goods_id', '=', $other_info['goods_id']], ['site_id', '=', $this->site_id]])->update(['is_default' => 1]);
        }

        $res = $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update(['delete_time' => time(),'is_default' => 0]);
        return true;
    }

    /**
     * 修改景点状态
     */
    public function editStatus(int $id, array $data){
        $info = $this->model->where([['goods_id', '=', $id]])->field("scenic_id,is_default,status")->findOrEmpty();

        //门票下架的时候验证
        $scenic = (new Scenic())->where([['scenic_id', '=', $info['scenic_id']]])->field("scenic_status")->findOrEmpty();
        //如果当前景点上架中并且没有其他上架的门票，当前门票不允许下架
        if($scenic['scenic_status'] == 1 && $info['status'] == 1){
            $res = $this->model->where([['scenic_id', '=', $info['scenic_id']], ['status', '=', 1]])->count();
            if($res <= 1){
                throw new AdminException('TICKET_NOT_ALLOW_DOWN');
            }
        }

        //下架的时候 如果是默认门票 则取消当前默认，重新设置新的
        if($info['status'] == 1 && $info['is_default'] == 1){
            $data['is_default'] = 0;
            $info = $this->model->where([['goods_id', '<>', $id], ['status', '=', 1], ['scenic_id', '=', $info['scenic_id']]])->field("goods_id")->order("price asc")->findOrEmpty();
            if($info) $this->model->where([['goods_id', '=', $info['goods_id']], ['site_id', '=', $this->site_id]])->update(['is_default' => 1]);
        }

        //门票上架的时候验证存不存在默认门票，不存在设置当前为默认
        if($info['status'] == 0){
            $info = $this->model->where([['is_default', '=', 1], ['scenic_id', '=', $info['scenic_id']]])->field("goods_id")->findOrEmpty();
            if($info->isEmpty()) $data['is_default'] = 1;
        }

        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 获取景点上架门票
     */
    public function ticketCount($scenic_id){
        $res = $this->model->where([['scenic_id', '=', $scenic_id], ['status', '=', 1]])->select()->count();
        return $res;
    }
}
