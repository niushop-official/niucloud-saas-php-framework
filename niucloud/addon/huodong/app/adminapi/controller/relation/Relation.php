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

namespace addon\huodong\app\adminapi\controller\relation;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\relation\RelationService;


/**
 * 推广关系控制器
 * Class Relation
 * @package addon\huodong\app\adminapi\controller\relation
 */
class Relation extends BaseAdminController
{
   /**
    * 获取推广关系列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["pid",""],
             ["pid2",""],
             ["adddate",""]
        ]);
        return success((new RelationService())->getPage($data));
    }

    /**
     * 推广关系详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new RelationService())->getInfo($id));
    }

    /**
     * 添加推广关系
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["pid",0],
             ["pid2",0],
             ["adddate","2025-01-21 18:21:16"]
        ]);
        $this->validate($data, 'addon\huodong\app\validate\relation\Relation.add');
        $id = (new RelationService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 推广关系编辑
     * @param $id  推广关系id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["pid",0],
             ["pid2",0],
             ["adddate","2025-01-21 18:21:16"]
        ]);
        $this->validate($data, 'addon\huodong\app\validate\relation\Relation.edit');
        (new RelationService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 推广关系删除
     * @param $id  推广关系id
     * @return \think\Response
     */
    public function del(int $id){
        (new RelationService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new RelationService())->getMemberAll());
    }

}
