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

namespace addon\shop_fenxiao\app\service\admin\agent;

use addon\shop_fenxiao\app\model\agent\AgentLevel;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\Collection;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 代理商等级
 */
class AgentLevelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new AgentLevel();
    }

    /**
     * 获取等级列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'level_id,site_id,name,money,discount,create_time';
        $order = 'level_id desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['name', 'create_time'], $where)
            ->field($field)
            ->order($order);
        return $this->pageQuery($search_model);
    }

    /**
     * 等级信息
     * @param int $level_id
     * @return array
     */
    public function getInfo(int $level_id)
    {
        $field = 'level_id, site_id,name,money,discount, create_time';
        return $this->model->where([['level_id', '=', $level_id]])->field($field)->findOrEmpty()->toArray();
    }

    /**
     * 查询列表
     * @param array $where
     * @return AgentLevel[]|array|Collection
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList(array $where = [])
    {
        $field = 'level_id,site_id,name,money,discount,create_time';
        $order = 'level_id desc';
        return $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['name', 'create_time'], $where)
            ->field($field)
            ->order($order)->select()->toArray();
    }


    /**
     * 添加代理等级
     * @param $data
     * @return true
     */
    public function add($data)
    {
        //增加代理等级
        $insert_data = [
            'site_id' => $this->site_id,
            'name' => $data['name'],
            'money' => $data['money'],
            'discount' => $data['discount'],
            //奖励权益.....
        ];
        $this->model->create($insert_data);
        return true;
    }

    /**
     * 编辑代理等级
     * @param $level_id
     * @param $data
     * @return true
     */
    public function edit($level_id, $data)
    {
        $update_data = [
            'update_time' => time(),
            'name' => $data['name'],
            'money' => $data['money'],
            'discount' => $data['discount'],
        ];
        $this->model->where([['level_id', '=', $level_id], ['site_id', '=', $this->site_id]])->update($update_data);

        return true;
    }

    /**
     * 删除等级
     * @param $level_id
     * @return true
     */
    public function del($level_id)
    {
        if (!(new Fenxiao())->where([['site_id', '=', $this->site_id], ['agent_level', '=', $level_id]])->findOrEmpty()->isEmpty())
            throw new AdminException('SHOP_FENXIAO_EXIST_FENXIAO_WITH_AGENT_LEVEL');
        $this->model->where([['level_id', '=', $level_id], ['site_id', '=', $this->site_id]])->delete();
        return true;
    }
}
