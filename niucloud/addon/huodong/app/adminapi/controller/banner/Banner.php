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

namespace addon\huodong\app\adminapi\controller\banner;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\banner\BannerService;


/**
 * 轮播图管理控制器
 * Class Banner
 * @package addon\huodong\app\adminapi\controller\banner
 */
class Banner extends BaseAdminController
{
   /**
    * 获取轮播图管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""]
        ]);
        return success((new BannerService())->getPage($data));
    }

    /**
     * 轮播图管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new BannerService())->getInfo($id));
    }

    /**
     * 添加轮播图管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["image",""],
            ["url",""],
             ["status",0],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\banner\Banner.add');
        $id = (new BannerService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 轮播图管理编辑
     * @param $id  轮播图管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
            ["url",""],
             ["image",""],
             ["status",0],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\banner\Banner.edit');
        (new BannerService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 轮播图管理删除
     * @param $id  轮播图管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new BannerService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
