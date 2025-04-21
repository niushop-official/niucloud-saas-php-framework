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

namespace addon\ttcard\app\adminapi\controller\biographical;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\biographical\BiographicalService;


/**
 * 简历管理控制器
 * Class Biographical
 * @package addon\ttcard\app\adminapi\controller\biographical
 */
class Biographical extends BaseAdminController
{
   /**
    * 获取简历管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["status",""],
             ["name",""],
             ["phone",""],
             ["gender_status",""],
             ["email",""],
             ["wechat_num",""],
             ["position",""],
             ["type_status",""],
             ["education",""],
             ["unemployed_status",""],
             ["create_time",""]
        ]);
        return success((new BiographicalService())->getPage($data));
    }

    /**
     * 简历管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new BiographicalService())->getInfo($id));
    }

    /**
     * 添加简历管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["status",""],
             ["name",""],
             ["phone",0],
             ["avatar",""],
             ["age",0],
             ["gender_status",""],
             ["email",""],
             ["wechat_num",""],
             ["position",""],
             ["expected",""],
             ["working",""],
             ["type_status",""],
             ["education",""],
             ["city",""],
             ["advantage_content",""],
             ["experience_content",""],
             ["learning_content",""],
             ["certificate_images",""],
             ["unemployed_status",""],
             ["delive_num",0],
             ["view_num",0],
             ["reporttime",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\biographical\Biographical.add');
        $id = (new BiographicalService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 简历管理编辑
     * @param $id  简历管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["status",""],
             ["name",""],
             ["phone",0],
             ["avatar",""],
             ["age",0],
             ["gender_status",""],
             ["email",""],
             ["wechat_num",""],
             ["position",""],
             ["expected",""],
             ["working",""],
             ["type_status",""],
             ["education",""],
             ["city",""],
             ["advantage_content",""],
             ["experience_content",""],
             ["learning_content",""],
             ["certificate_images",""],
             ["unemployed_status",""],
             ["delive_num",0],
             ["view_num",0],
             ["reporttime",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\biographical\Biographical.edit');
        (new BiographicalService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 简历管理删除
     * @param $id  简历管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new BiographicalService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new BiographicalService())->getUserAll());
    }

}
