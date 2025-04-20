<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\model\AreaLevel;

use addon\ly_area\app\service\core\CoreAreaConfigService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;


/**
 * 区域代理等级服务层
 * Class LevelService
 * @package app\service\admin\area
 */
class AreaLevelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new AreaLevel();
    }

    /**
     * 获取区域代理等级列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'level_id,site_id,level_name,level_num,level_area,level_rate,up_type,order_goods_id,order_money,status,create_time,update_time';
        $order = 'level_id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->field($field)->order($order)->append(['level_text']);
        
        // $config = (new CoreConfigService())->getConfigValue($this->site_id, 'LY_AREA_CONFIG');
        $config = (new CoreAreaConfigService())->getAreaConfig($this->site_id);
        if($config['is_street'] == 1){
            $search_model = $search_model->where([ [ 'level_area' ,"<=", 4 ] ]);
        }else{
            $search_model = $search_model->where([ [ 'level_area' ,"<", 4 ] ]);
        }

        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取区域代理等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = '*';

        $info = $this->model->field($field)->where([['level_id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加区域代理等级
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->level_id;

    }

    /**
     * 区域代理等级编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['level_id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除区域代理等级
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['level_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }


    public function getLevelNumList(){
        $list = $this->model->where([['site_id', '=', $this->site_id]])->select()->toArray();

        return $list;
    }


    public function modifyLevelStatus($id, $status){
        $res = $this->model->where([['level_id', '=', $id],['site_id', '=', $this->site_id]])->update(['status' => $status]);
        return true;
    }
    
}