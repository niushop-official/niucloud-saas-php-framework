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

namespace addon\huodong\app\adminapi\controller\cate;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\cate\CateService;


/**
 * 活动分类控制器
 * Class Cate
 * @package addon\huodong\app\adminapi\controller\cate
 */
class Cate extends BaseAdminController
{
   /**
    * 获取活动分类列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["name",""],
             ["status",""],
             ["adddate",["",""]]
        ]);
        return success((new CateService())->getPage($data));
    }

    /**
     * 活动分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CateService())->getInfo($id));
    }

    /**
     * 添加活动分类
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""],
             ["status",0],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\cate\Cate.add');
        $id = (new CateService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 活动分类编辑
     * @param $id  活动分类id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["name",""],
             ["status",0],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\cate\Cate.edit');
        (new CateService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 活动分类删除
     * @param $id  活动分类id
     * @return \think\Response
     */
    public function del(int $id){
        (new CateService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
