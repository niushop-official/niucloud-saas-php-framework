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

namespace addon\shop\app\service\core\order;

use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\model\order\OrderLog;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseCoreService;

/**
 *  订单日志服务层
 */
class CoreOrderLogService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderLog();
    }

    /**
     * 订单日志
     * @param array $data
     * @return true
     */
    public function add(array $data)
    {
        $this->model->create($data);
        return true;
    }

    /**
     * 批量写入日志
     * @param array $data
     * @return true
     */
    public function addAll(array $data)
    {
        $this->model->insertAll($data);
        return true;
    }

    /**
     * 操作人数据批量查询并转化(周)
     * @param $data
     * @return void[]
     */
    public function getMainData($data)
    {
        $member_ids = [];
        $uids = [];
        foreach ($data as $v) {
            $main_type = $v[ 'main_type' ];
            $main_id = $v[ 'main_id' ];
            if ($main_type == OrderLogDict::MEMBER) {
                $member_ids[] = $main_id;
            } elseif ($main_type == OrderLogDict::STORE) {
                $uids[] = $main_id;
            }
        }
        $member_names = !empty($member_ids) ? ( new  Member() )->where([ [ 'member_id', 'in', $member_ids ] ])->column('nickname', 'member_id') : [];
        $user_names = !empty($uids) ? ( new  SysUser() )->where([ [ 'uid', 'in', $uids ] ])->column('username', 'uid') : [];
        return array_map(function($value) use ($member_names, $user_names) {
            $main_type = $value[ 'main_type' ];
            $main_id = $value[ 'main_id' ];
            if ($main_type == OrderLogDict::MEMBER) {
                $main_name = $member_names[ $main_id ];
            } elseif ($main_type == OrderLogDict::STORE) {
                $main_name = $user_names[ $main_id ];
            } else {
                $main_name = '';
            }
            $value[ 'main_name' ] = $main_name;
            return $value;
        }, $data);
    }

}
