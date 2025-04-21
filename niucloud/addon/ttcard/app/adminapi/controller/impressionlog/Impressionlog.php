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

namespace addon\ttcard\app\adminapi\controller\impressionlog;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\impressionlog\ImpressionlogService;


/**
 * 个人印象日志管理控制器
 * Class Impressionlog
 * @package addon\ttcard\app\adminapi\controller\impressionlog
 */
class Impressionlog extends BaseAdminController
{
   /**
    * 获取个人印象日志管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["impression_id",""],
             ["user_id",""],
             ["card_id",""],
             ["create_time",["",""]]
        ]);
        return success((new ImpressionlogService())->getPage($data));
    }

    /**
     * 个人印象日志管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ImpressionlogService())->getInfo($id));
    }

    /**
     * 添加个人印象日志管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["impression_id",0],
             ["user_id",0],
             ["card_id",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\impressionlog\Impressionlog.add');
        $id = (new ImpressionlogService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 个人印象日志管理编辑
     * @param $id  个人印象日志管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["impression_id",0],
             ["user_id",0],
             ["card_id",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\impressionlog\Impressionlog.edit');
        (new ImpressionlogService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 个人印象日志管理删除
     * @param $id  个人印象日志管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new ImpressionlogService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getImpressionAll(){
         return success(( new ImpressionlogService())->getImpressionAll());
    }

    public function getUserAll(){
         return success(( new ImpressionlogService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new ImpressionlogService())->getCardAll());
    }

}
