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

namespace addon\shortvideo\app\adminapi\controller\label;

use core\base\BaseAdminController;
use addon\shortvideo\app\service\admin\label\LabelService;


/**
 * 话题管理控制器
 * Class Label
 * @package addon\shortvideo\app\adminapi\controller\label
 */
class Label extends BaseAdminController
{
   /**
    * 获取话题管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["name",""],
             ["status",""],
             ["adddate",["",""]],
        ]);
        return success((new LabelService())->getPage($data));
    }

    /**
     * 话题管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LabelService())->getInfo($id));
    }

    /**
     * 添加话题管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""],
            ["status",0],
            ["sort",0],
             ["adddate","2024-12-29 16:36:04"],

        ]);
        $this->validate($data, 'addon\shortvideo\app\validate\label\Label.add');
        $id = (new LabelService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 话题管理编辑
     * @param $id  话题管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["name",""],
             ["status",0],
             ["adddate","2024-12-29 16:36:04"],
             ["sort",0]
        ]);
        $this->validate($data, 'addon\shortvideo\app\validate\label\Label.edit');
        (new LabelService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 话题管理删除
     * @param $id  话题管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new LabelService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
