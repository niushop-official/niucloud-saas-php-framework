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

namespace addon\shortvideo\app\adminapi\controller\video;

use core\base\BaseAdminController;
use addon\shortvideo\app\service\admin\video\VideoService;


/**
 * 控制器
 * Class Video
 * @package addon\shortvideo\app\adminapi\controller\Video
 */
class Video extends BaseAdminController
{
   /**
    * 获取列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["cate_id",""],
             ["name",""],
             ["member_id",""],
             ["status",""],
             ["adddate",["",""]]
        ]);
        return success((new VideoService())->getPage($data));
    }

    /**
     * 详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new VideoService())->getInfo($id));
    }

    /**
     * 添加
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["cate_id",0],
             ["name",""],
            ["desc",''],
            ["url",''],
            ["cover",""],
             ["member_id",0],
            ["like_num",0],
            ["view_num",0],
             ["is_show",1],
            ["status",1],
            ["goods_ids",''],
            ['label_ids',[]]

        ]);
//        $this->validate($data, 'addon\shortvideo\app\validate\Video\Video.add');
        $id = (new VideoService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 编辑
     * @param $id  id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
            ["cate_id",0],
            ["name",""],
            ["desc",''],
            ["url",''],
            ["cover",""],
            ["member_id",0],
            ["like_num",0],
            ["view_num",0],
            ["is_show",1],
            ["status",1],
            ["goods_ids",''],
            ['label_ids',[]]

        ]);
//        $this->validate($data, 'addon\shortvideo\app\validate\Video\Video.edit');
        (new VideoService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 删除
     * @param $id  id
     * @return \think\Response
     */
    public function del(int $id){
        (new VideoService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getCateAll(){
         return success(( new VideoService())->getCateAll());
    }

    public function getMemberAll(){
         return success(( new VideoService())->getMemberAll());
    }
    public function getVideoAll(){
        return success(( new VideoService())->getVideoAll());
    }

    public function getGoodsAll(){
        return success(( new VideoService())->getGoodsAll());
    }

    public function getLabelAll(){
        return success(( new VideoService())->getLabelAll());
    }

}
