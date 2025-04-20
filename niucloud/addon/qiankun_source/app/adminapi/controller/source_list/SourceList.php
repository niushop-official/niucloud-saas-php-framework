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

namespace addon\qiankun_source\app\adminapi\controller\source_list;

use core\base\BaseAdminController;
use addon\qiankun_source\app\service\admin\source_list\SourceListService;


/**
 * 素材管理控制器
 * Class SourceList
 * @package addon\qiankun_source\app\adminapi\controller\source_list
 */
class SourceList extends BaseAdminController
{
    /**
     * 获取素材管理列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["cate_id", ""],
            ["user_id", ""],
            ["text", ""],
        ]);
        return success((new SourceListService())->getPage($data));
    }

    /**
     * 素材管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        $info = (new SourceListService())->getInfo($id);
        $info['image'] = $info['image'] ? explode(',', $info['image']) : [];
        $info['video'] = $info['video'] ? explode(',', $info['video']) : [];
        return success($info);
    }

    /**
     * 添加素材管理
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["cate_id", 0],
            ["text", ""],
            ["image", []],
            ["video", []],

        ]);
        $data['image'] = $data['image'] ? implode(',', $data['image']) : '';
        $data['video'] = $data['video'] ? implode(',', $data['video']) : '';
        $this->validate($data, 'addon\qiankun_source\app\validate\source_list\SourceList.add');
        $id = (new SourceListService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 素材管理编辑
     * @param $id  素材管理id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["cate_id", 0],
            ["text", ""],
            ["image", []],
            ["video", []],

        ]);
        $data['image'] = $data['image'] ? implode(',', $data['image']) : '';
        $data['video'] = $data['video'] ? implode(',', $data['video']) : '';
        $this->validate($data, 'addon\qiankun_source\app\validate\source_list\SourceList.edit');
        (new SourceListService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 素材管理删除
     * @param $id  素材管理id
     * @return \think\Response
     */
    public function del(int $id)
    {
        (new SourceListService())->del($id);
        return success('DELETE_SUCCESS');
    }


    public function getCategoryAll()
    {
        return success((new SourceListService())->getCategoryAll());
    }

}
