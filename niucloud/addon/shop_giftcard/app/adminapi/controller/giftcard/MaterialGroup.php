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

namespace addon\shop_giftcard\app\adminapi\controller\giftcard;

use addon\shop_giftcard\app\service\admin\giftcard\MaterialGroupService;
use core\base\BaseAdminController;


/**
 * 礼品卡素材分组控制器
 * Class MaterialGroup
 * @package addon\shop_giftcard\app\adminapi\controller\giftcard
 */
class MaterialGroup extends BaseAdminController
{
    /**
     * 获取礼品卡素材分组分页列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "group_name", "" ],
        ]);
        return success(( new MaterialGroupService() )->getPage($data));
    }

    /**
     * 获取礼品卡素材分组列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "group_name", "" ],
        ]);
        return success(( new MaterialGroupService() )->getList($data));
    }

    /**
     * 礼品卡素材分组详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new MaterialGroupService() )->getInfo($id));
    }

    /**
     * 添加礼品卡素材分组
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "group_name", "" ],
            [ "sort", 0 ]
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\MaterialGroup.add');
        $id = ( new MaterialGroupService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 礼品卡素材分组编辑
     * @param $id  礼品卡素材分组id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            [ "group_name", "" ],
            [ "sort", 0 ]
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\MaterialGroup.edit');
        ( new MaterialGroupService() )->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 礼品卡素材分组删除
     * @param $id  礼品卡素材分组id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new MaterialGroupService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改礼品卡素材分组排序号
     * @return \think\Response
     */
    public function modifySort()
    {
        $data = $this->request->params([
            [ 'group_id', '' ],
            [ 'sort', '' ],
        ]);
        ( new MaterialGroupService() )->modifySort($data);
        return success('SUCCESS');
    }

}
