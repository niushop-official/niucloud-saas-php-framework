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

namespace addon\shortvideo\app\adminapi\controller\cate;

use core\base\BaseAdminController;
use addon\shortvideo\app\service\admin\cate\CateService;


/**
 * 分类控制器
 * Class Cate
 * @package addon\shortvideo\app\adminapi\controller\cate
 */
class Cate extends BaseAdminController
{
   /**
    * 获取分类列表
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
     * 分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CateService())->getInfo($id));
    }

    /**
     * 添加分类
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""],
            ["status",1],
            ["sort",0],

        ]);
        $this->validate($data, 'addon\shortvideo\app\validate\cate\Cate.add');
        $id = (new CateService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 分类编辑
     * @param $id  分类id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["name",""],
             ["status",1],
            ["sort",0],

        ]);
        $this->validate($data, 'addon\shortvideo\app\validate\cate\Cate.edit');
        (new CateService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 分类删除
     * @param $id  分类id
     * @return \think\Response
     */
    public function del(int $id){
        (new CateService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
