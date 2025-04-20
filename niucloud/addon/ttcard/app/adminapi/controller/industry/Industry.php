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

namespace addon\ttcard\app\adminapi\controller\industry;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\industry\IndustryService;


/**
 * 行业管理控制器
 * Class Industry
 * @package addon\ttcard\app\adminapi\controller\industry
 */
class Industry extends BaseAdminController
{
   /**
    * 获取行业管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["name",""],
             ["flag_status",""],
             ["status",""]
        ]);
        return success((new IndustryService())->getPage($data));
    }

    /**
     * 行业管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new IndustryService())->getInfo($id));
    }

    /**
     * 添加行业管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""],
             ["flag_status",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\industry\Industry.add');
        $id = (new IndustryService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 行业管理编辑
     * @param $id  行业管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["name",""],
             ["flag_status",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\industry\Industry.edit');
        (new IndustryService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 行业管理删除
     * @param $id  行业管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new IndustryService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
