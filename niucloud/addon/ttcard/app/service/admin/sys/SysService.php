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

namespace addon\ttcard\app\service\admin\sys;

use addon\ttcard\app\model\sys\Sys;

use core\base\BaseAdminService;
use addon\ttcard\app\service\admin\ordertype\OrdertypeService;

/**
 * 系统配置服务层
 * Class SysService
 * @package addon\ttcard\app\service\admin\sys
 */
class SysService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Sys();
    }
    /**
     * 初始化系统所有的数据
     * @param array $where
     * @return array
     */
    public function initDataAllSys()
    {
        (new OrdertypeService())->initData();
        $this->initData();
    }
    /**
     * 初始化配置数据
     * @param array $where
     * @return array
     */
    public function initData()
    {
        $hasData = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->count();
        if($hasData>0){
            return;
        }
        $source = $this->model->where('site_id' , 0)->select()->toArray();
        foreach ($source as $key => $value) {
            $value['site_id'] = $this->site_id;
            unset($value['id']);
            $this->model->create($value);
        }
    }
    private function getId(){
        return $this->model->where([['site_id', '=', $this->site_id]])->value('id');
    }
    public function getInfo()
    {
        $this->initDataAllSys();
        $id=$this->getId();
        $info = $this->model->where('id',$id)->findOrEmpty()->toArray();
        $config = json_decode($info['con_json'],true);
        return $config;
    }

    public function edit(array $data)
    {
        $id=$this->getId();
        $this->model->where("id",$id)->update($data);
        return true;
    }


}
