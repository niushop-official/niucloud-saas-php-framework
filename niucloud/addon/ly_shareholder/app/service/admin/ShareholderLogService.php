<?php

namespace addon\ly_shareholder\app\service\admin;

use addon\ly_shareholder\app\model\ShareholderLevel;
use addon\ly_shareholder\app\model\ShareholderLog;

use core\base\BaseAdminService;


/**
 * 股东分红记录服务层
 * Class ShareholderLogService
 * @package addon\ly_shareholder\app\service\admin\fenhong
 */
class ShareholderLogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ShareholderLog();
    }

    /**
     * 获取股东分红记录列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,member_id,site_id,order_amount,rate,level_id,level_name,level_num,amount,is_settlement,settle_time,is_send,send_time,create_time,update_time,delete_time';
        $order = 'id desc';
        $condition = [ 
            [ 'shareholder_log.site_id' ,"=", $this->site_id ] 
        ];

        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        $search_model = $this->model->where($condition)->withSearch(['level_id', 'join_create_time' => 'create_time'], $where)
            ->field($field)
            ->withJoin([
                'member' => ['member_id', 'nickname', 'username', 'headimg', 'mobile'],
            ]) 
            ->with([
                'shareholderLevel' => function ($query) {
                    $query->withField('level_id, level_name');
                },
            ])
            ->order($order);
        $list = $this->pageQuery($search_model);

        return $list;
    }

    /**
     * 获取股东分红记录信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,member_id,site_id,order_amount,rate,level_id,level_name,level_num,amount,is_settlement,settle_time,is_send,send_time,create_time,update_time,delete_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加股东分红记录
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 股东分红记录编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除股东分红记录
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getShareholderLevelAll(){
       $shareholderLevelModel = new ShareholderLevel();
       return $shareholderLevelModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    /**
     * 获取股东分红记录列表
     * @param array $where
     * @param string $field
     * @param int $page
     * @param int $limit
     * @return array
     */
    public function getList(){
        $list = $this->model
            ->where([["site_id","=",$this->site_id]])
            ->order("id","desc")
            // ->paginate(15)
            ->select()
            ->toArray();
        return $list;
    }

    /**
     * 获取单条分红记录，按create_time排倒序
     * @param int $id
     * @return array
     */
    public function getOne(){
        $list = $this->model
            ->where([["site_id","=",$this->site_id]])
            ->order("create_time","desc")
            ->findOrEmpty();
        return $list;
     }
}