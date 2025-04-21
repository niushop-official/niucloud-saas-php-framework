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

namespace addon\vipcard\app\service\admin\reserve;

use addon\vipcard\app\dict\ReserveDict;
use addon\vipcard\app\model\Reserve;
use app\model\member\Member;
use core\base\BaseAdminService;

/**
 * 预约服务层
 * Class VipcardReserveService
 * @package app\service\admin\reserve
 */
class ReserveService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Reserve();
    }

    /**
     * 获取预约列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'reserve_id,site_id,reserve_date,member_id,reserve_name,reserve_time,reserve_state,remark,create_time,complete_time,to_store_time,cancel_time,source,goods_id';
        $order = '';

        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(["reserve_state","create_time"], $where)->with([
            'goods' => function($query){
                $query->field("goods_name,goods_id");
            }
        ])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 预约看板
     */
    public function reserveByWeek($where)
    {
        $date = $this->getWeekDay($where['length']);

        foreach ($date as $wk => $w_item) {
            $field = 'reserve_id,site_id,member_id,goods_id,reserve_date,reserve_name,reserve_time,reserve_state,remark,create_time,complete_time,to_store_time,cancel_time,source,goods_id,technician_id';
            $list= $this->model->where([['site_id', '=', $this->site_id], [ 'reserve_time', 'between', [ $w_item[ 'start' ], $w_item[ 'end' ] ] ]])->withSearch(['search_name'], $where)->with([
                'goods' => function($query){
                    $query->field("goods_name,goods_id,goods_cover,site_id")->append(['cover_thumb_small']);
                }
            ])->field($field)->order("create_time desc")->append(['reserve_state_name','technician_name','goods_name'])->select()->toArray();
            $date[ $wk ][ 'data' ] = $list;
        }
        return $date;
    }

    /**
     * 获取预约信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'reserve_id,site_id,goods_id,member_id,reserve_name,reserve_date,reserve_time,reserve_state,remark,create_time,complete_time,to_store_time,cancel_time,source,goods_id,technician_id';

        $info = $this->model->field($field)->where([['reserve_id', '=', $id], ['site_id', '=', $this->site_id]])->with([
            'goods' => function($query){
                $query->field("goods_name,goods_id");
            }
        ])->append(['technician_name'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加预约
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $data['reserve_time'] = strtotime($data['reserve_date']);
        $data['reserve_state'] = ReserveDict::TREAT_TO_STORE;
        $res = $this->model->create($data);
        return $res->reserve_id;

    }

    /**
     * 预约编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data['reserve_time'] = strtotime($data['reserve_date']);
        $this->model->where([['reserve_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除预约
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['reserve_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

    /**
     * 获取一周内的时间段
     * @param $length
     * @return array
     */
    public function getWeekDay($length = 0)
    {
        $first_day = mktime(0, 0, 0, date("m"), date("d") - date("w") + 1, date("Y"));
        $first_day = strtotime($length . ' week', $first_day);

        $week = [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ];
        $data = [];
        for ($i = 0; $i < 7; $i++) {
            $time = strtotime("+ {$i} day", $first_day);
            array_push($data, [
                'start' => $time,
                'end' => strtotime(date('Y-m-d 23:59:59', $time)),
                'date' => date('m/d', $time),
                'w' => date('w', $time),
                'week' => $week[ date('w', $time) ],
                'currday' => date('Y-m-d', $time) == date('Y-m-d') ? 1 : 0
            ]);
        }
        return $data;
    }

    /**
     * 获取会员信息
     */
    public function getMemberInfo($data)
    {
        $field = 'nickname,username,member_id,mobile';
        $info = (new Member())->field($field)->where([['mobile', '=', $data['mobile']]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 更新状态
     * @param $id
     * @param $data
     * @return bool
     */
    public function editStatus($id, $data)
    {
        $this->model->where([['reserve_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }
}