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

namespace addon\ttcard\app\adminapi\controller\feedback;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\feedback\FeedbackService;


/**
 * 意见反馈管理控制器
 * Class Feedback
 * @package addon\ttcard\app\adminapi\controller\feedback
 */
class Feedback extends BaseAdminController
{
   /**
    * 获取意见反馈管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["title",""],
             ["content",""],
             ["create_time",["",""]],
             ["status",""]
        ]);
        return success((new FeedbackService())->getPage($data));
    }

    /**
     * 意见反馈管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new FeedbackService())->getInfo($id));
    }

    /**
     * 添加意见反馈管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["title",""],
             ["content",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\feedback\Feedback.add');
        $id = (new FeedbackService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 意见反馈管理编辑
     * @param $id  意见反馈管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["title",""],
             ["content",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\feedback\Feedback.edit');
        (new FeedbackService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 意见反馈管理删除
     * @param $id  意见反馈管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new FeedbackService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new FeedbackService())->getUserAll());
    }

}
