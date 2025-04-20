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

namespace addon\shortvideo\app\adminapi\controller\comment;

use core\base\BaseAdminController;
use addon\shortvideo\app\service\admin\comment\CommentService;


/**
 * 控制器
 * Class Comment
 * @package addon\shortvideo\app\adminapi\controller\comment
 */
class Comment extends BaseAdminController
{
    /**
     * 获取列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
  
            ["video_id",""],
            ["member_id",""],
            ["adddate",["",""]]
        ]);
        return success((new CommentService())->getPage($data));
    }

    /**
     * 详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CommentService())->getInfo($id));
    }

    /**
     * 添加
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["video_id",""],
            ["member_id",0],
            ["like_num",0],
            ["status",1],
            ["headimg",''],
            ["nickname",''],
            ["content",''],
        ]);
        $id = (new CommentService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 编辑
     * @param $id  id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
            ["like_num",0],
            ["video_id",""],
            ["member_id",0],
            ["headimg",''],
            ["nickname",''],
            ["content",''],
            ["status",1],

        ]);
        (new CommentService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除
     * @param $id  id
     * @return \think\Response
     */
    public function del(int $id){
        (new CommentService())->del($id);
        return success('DELETE_SUCCESS');
    }



}
