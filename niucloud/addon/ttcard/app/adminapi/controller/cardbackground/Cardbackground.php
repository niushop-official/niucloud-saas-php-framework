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

namespace addon\ttcard\app\adminapi\controller\cardbackground;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\cardbackground\CardbackgroundService;


/**
 * 背景图管理控制器
 * Class Cardbackground
 * @package addon\ttcard\app\adminapi\controller\cardbackground
 */
class Cardbackground extends BaseAdminController
{
   /**
    * 获取背景图管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["title",""],
             ["type",""],
             ["create_time",""],
             ["status",""]
        ]);
        return success((new CardbackgroundService())->getPage($data));
    }

    /**
     * 背景图管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CardbackgroundService())->getInfo($id));
    }

    /**
     * 添加背景图管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["title",""],
             ["type",""],
             ["image",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\cardbackground\Cardbackground.add');
        $id = (new CardbackgroundService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 背景图管理编辑
     * @param $id  背景图管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["title",""],
             ["type",""],
             ["image",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\cardbackground\Cardbackground.edit');
        (new CardbackgroundService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 背景图管理删除
     * @param $id  背景图管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new CardbackgroundService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
