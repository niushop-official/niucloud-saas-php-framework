<?php

namespace addon\ly_shareholder\app\service\admin;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\service\core\CoreShareholderService;
use app\model\member\Member;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DbException;
use think\Model;


/**
 * 股东服务层
 * Class ShareholderService
 * @package addon\ly_shareholder\app\service\admin
 */
class ShareholderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Shareholder();
    }

    /**
     * 获取股东列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'shareholder_id,site_id,shareholder_no,member_id,level_id,status,create_time,rate,amount';
        $order = 'shareholder_id desc';
        $condition = [
            ['shareholder.site_id', '=', $this->site_id]
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        } 
        // var_dump($condition);
        $search_model = $this->model->where($condition)->withSearch(['level_id', 'join_create_time' => 'create_time', 'join_status' => 'status'], $where)
            ->field($field)
            ->withJoin([
                'member' => ['member_id','username','nickname','headimg','mobile']
            ])
            ->with([
                'shareholderLevel' => function ($query) {
                    $query->withField('level_id, level_name');
                },
            ])
            ->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 股东信息
     * @param int $member_id
     * @return array
     */
    public function getInfo(int $shareholder_id)
    {
        $field = 'shareholder_id, shareholder_no, shareholder.member_id, level_id, shareholder.status, 
        shareholder.create_time, lock_time';
        
        return $this->model->where([['shareholder_id', '=', $shareholder_id]])->withJoin([
            'member' => ['member_id','username','nickname','headimg','mobile','commission','commission_get','commission_cash_outing']
        ])->with([
            'shareholderLevel' => function ($query) {
                $query->withField('level_id, level_name');
            },
        ])->field($field)->append(['status_name'])->findOrEmpty()->toArray();
    }

    /**
     * 冻结股东
     * @param int $member_id
     * @return array
     */
    public function invalid(int $member_id)
    {
        $this->model->where([['member_id', '=', $member_id], ['site_id', '=', $this->site_id]])->update([
            'status' => ShareholderDict::FREEZE
        ]);
        return true;
    }

    /**
     * 添加股东
     * @param $data
     * @return void
     */
    public function add($data)
    {
        $res =  (new CoreShareholderService())->add($this->site_id, $data['member_id'], $data['level_id']);

    }

    /**
     * 编辑股东
     * @param $data
     * @return void
     */
    public function edit($data, $id)
    {
        $shareholder = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['member_id', '=', $id],
        ])->findOrEmpty();
        if ($shareholder->isEmpty()) throw new AdminException('LY_SHAREHOLDER_SHAREHOLDER_NOT_EXIST');
        $update_data = [];

        if (!empty($data['level_id'])) {
            $update_data['level_id'] = $data['level_id'];
        }

        if (!empty($data['status'])) {
            $update_data['status'] = $data['status'];
            if ($update_data['status'] == ShareholderDict::FREEZE) {
                $update_data['lock_time'] = time();
            } else {
                $update_data['lock_time'] = 0;
            }

        }
        if (!empty($update_data)) {
            $this->model->where([['member_id', '=', $id]])->update($update_data);
        }
        return true;
    }


    /**
     *  查询股东列表(用于弹框选择)
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getListOfSelect(array $where = [])
    {

        $field = 'site_id,shareholder_no,member_id,level_id,status,create_time';
        $order = 'shareholder_id desc';
        $condition = [
            ['shareholder.site_id', '=', $this->site_id],
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        //不包括
        if (!empty($where['not_in'])) {
            $condition[] = ['shareholder.member_id', 'not in', $where['not_in']];
        }
        $search_model = $this->model->where($condition)->withSearch(['shareholder_level,create_time,status'], $where)
            ->field($field)
            ->withJoin([
          
                    'member' => ['member_id', 'username', 'nickname', 'headimg', 'mobile'],
            ])
            ->with([
                'shareholderLevel' => function ($query) {
                    $query->withField('level_id, level_name');
                },
            ])
            ->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 查询会员列表(用于弹框选择)
     * 
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getMemberListOfSelect(array $where = []){
        $member_model = new Member();
        $field = 'site_id,member_id,username,nickname,headimg,mobile';
        $order = 'member_id desc';
        $condition = [
            'member.site_id' => $this->site_id,
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }

        //不包括
        if (!empty($where['not_in'])) {
            $condition[] = ['member.member_id', 'not in', $where['not_in']];
        }

        $member_list = $member_model->field($field)->where($condition)->order($order)->select()->toArray();

        $selectList = [];
        foreach ($member_list as $member) {
            $selectList[] = [
                'label' => $member['username'] ?? $member['nickname'] , 
                'value' => $member['member_id']
            ];
        }

        // return $selectList;

        $search_model = $member_model->alias('member')
            ->where($condition)
            ->field($field)
            // ->join('ly_shareholder', 'ly_shareholder.member_id = member.member_id')
            ->order($order)
            ->append(['status_name']);
 
        
        $list = $this->pageQuery($search_model);
        return ['code' => 1, 'msg' => 'success', 'data' => $list];
    }

    /**
     * 查询具备股东的实例(专用)
     * @param $member_id
     * @return Shareholder|array|mixed|Model
     */
    public function findWithShareholder($member_id)
    {
        $shareholder = $this->model->where([['site_id', '=', $this->site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        if ($shareholder->isEmpty()) throw new AdminException('LY_SHAREHOLDER_NOT_FOUND_SELECT_SHAREHOLDER');

        return $shareholder;
    }

    /**
     * 根据股东等级查询股东人数
     * @param $level_id
     * @return int
     */
    public function getShareholderNumByLevelId($level_id){
        
        $condition = [
            ['level_id', '=', $level_id],
            ['site_id', '=', $this->site_id],
            ['status', '=', ShareholderDict::NORMAL]
        ];
        $count = $this->model->where($condition)->count();
        return $count;
    }

    /**
     * 根据股东等级查询股东
     * @param $level_id
     * @return array
     */
    public function getShareholderByLevelId($level_id, $site_id){
        
        $condition = [
            ['level_id', '=', $level_id],
            ['site_id', '=', $site_id],
            ['status', '=', ShareholderDict::NORMAL]
        ];
        
        $list = $this->model->where($condition)->select()->toArray();
        return $list;
    }

    public function getList($site_id){
        
        $condition = [
            ['site_id', '=', $site_id],
            ['status', '=', ShareholderDict::NORMAL]
        ];

        $list = $this->model->where($condition)->select();

        return $list;
    }
    
}


