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

namespace addon\qiankun_source\app\adminapi\controller\category;

use core\base\BaseAdminController;
use addon\qiankun_source\app\service\admin\category\CategoryService;


/**
 * 乾坤素材分类控制器
 * Class Category
 * @package addon\qiankun_source\app\adminapi\controller\category
 */
class Category extends BaseAdminController
{
   /**
    * 获取乾坤素材分类列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["title",""],
             ["sort",""],
             ["status",""],
             ["create_time",""]
        ]);
        return success((new CategoryService())->getPage($data));
    }

    /**
     * 乾坤素材分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CategoryService())->getInfo($id));
    }

    /**
     * 添加乾坤素材分类
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["title",""],
             ["icon",""],
             ["sort",""],
             ["status",""],

        ]);
        $this->validate($data, 'addon\qiankun_source\app\validate\category\Category.add');
        $id = (new CategoryService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 乾坤素材分类编辑
     * @param $id  乾坤素材分类id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["title",""],
             ["icon",""],
             ["sort",""],
             ["status",""],

        ]);
        $this->validate($data, 'addon\qiankun_source\app\validate\category\Category.edit');
        (new CategoryService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 乾坤素材分类删除
     * @param $id  乾坤素材分类id
     * @return \think\Response
     */
    public function del(int $id){
        (new CategoryService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
