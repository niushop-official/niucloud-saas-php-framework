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

namespace addon\ttcard\app\adminapi\controller\help;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\help\HelpService;


/**
 * 使用帮助管理控制器
 * Class Help
 * @package addon\ttcard\app\adminapi\controller\help
 */
class Help extends BaseAdminController
{
   /**
    * 获取使用帮助管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["title",""],
             ["content",""],
             ["create_time",["",""]],
             ["status",""]
        ]);
        return success((new HelpService())->getPage($data));
    }

    /**
     * 使用帮助管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new HelpService())->getInfo($id));
    }

    /**
     * 添加使用帮助管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["title",""],
             ["content",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\help\Help.add');
        $id = (new HelpService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 使用帮助管理编辑
     * @param $id  使用帮助管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["title",""],
             ["content",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\help\Help.edit');
        (new HelpService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 使用帮助管理删除
     * @param $id  使用帮助管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new HelpService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
