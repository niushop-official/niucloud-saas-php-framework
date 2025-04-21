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

namespace addon\shop_fenxiao\app\service\api\agent;

use addon\shop_fenxiao\app\model\agent\AgentLevel;
use core\base\BaseApiService;
use think\Collection;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 代理商等级
 */
class AgentLevelService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new AgentLevel();
    }

    /**
     * 查询列表
     * @param array $where
     * @return AgentLevel[]|array|Collection
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList()
    {
        $field = 'level_id,site_id,name,money,discount,create_time';
        $order = 'level_id desc';
        return $this->model->where([['site_id', '=', $this->site_id]])->field($field)->order($order)->select()->toArray();
    }
}
