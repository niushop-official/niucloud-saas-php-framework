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

namespace addon\ttcard\app\adminapi\controller\collect;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\collect\CollectService;


/**
 * 收藏管理控制器
 * Class Collect
 * @package addon\ttcard\app\adminapi\controller\collect
 */
class Collect extends BaseAdminController
{
   /**
    * 获取收藏管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["card_id",""],
             ["create_time",""]
        ]);
        return success((new CollectService())->getPage($data));
    }

    /**
     * 收藏管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CollectService())->getInfo($id));
    }

    /**
     * 添加收藏管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["card_id",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\collect\Collect.add');
        $id = (new CollectService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 收藏管理编辑
     * @param $id  收藏管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["card_id",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\collect\Collect.edit');
        (new CollectService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 收藏管理删除
     * @param $id  收藏管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new CollectService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new CollectService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new CollectService())->getCardAll());
    }

}
