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

namespace addon\ttcard\app\adminapi\controller\images;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\images\ImagesService;


/**
 * 相册管理控制器
 * Class Images
 * @package addon\ttcard\app\adminapi\controller\images
 */
class Images extends BaseAdminController
{
   /**
    * 获取相册管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["user_id",""],
             ["card_id",""],
             ["create_time",["",""]]
        ]);
        return success((new ImagesService())->getPage($data));
    }

    /**
     * 相册管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ImagesService())->getInfo($id));
    }

    /**
     * 添加相册管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["user_id",0],
             ["card_id",0],
             ["images",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\images\Images.add');
        $id = (new ImagesService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 相册管理编辑
     * @param $id  相册管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["user_id",0],
             ["card_id",0],
             ["images",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\images\Images.edit');
        (new ImagesService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 相册管理删除
     * @param $id  相册管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new ImagesService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new ImagesService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new ImagesService())->getCardAll());
    }

}
