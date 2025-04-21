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

use addon\shop_giftcard\app\service\admin\giftcard\MaterialService;
use core\base\BaseAdminController;


/**
 * 礼品卡素材控制器
 * Class Material
 * @package addon\shop_giftcard\app\adminapi\controller\giftcard
 */
class Material extends BaseAdminController
{
    /**
     * 获取礼品卡素材分页列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "group_id", "" ],
            [ "url", "" ],
        ]);
        return success(( new MaterialService() )->getPage($data));
    }

    /**
     * 获取礼品卡素材列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "group_id", "" ],
            [ "url", "" ],
        ]);
        return success(( new MaterialService() )->getList($data));
    }

    /**
     * 礼品卡素材详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new MaterialService() )->getInfo($id));
    }

    /**
     * 添加礼品卡素材
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "group_id", 0 ],
            [ "url", "" ],
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\Material.add');
        ( new MaterialService() )->add($data);
        return success('SUCCESS');
    }

    /**
     * 礼品卡素材编辑
     * @param $id  礼品卡素材id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            [ "group_id", 0 ],
            [ "url", "" ],
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\Material.edit');
        ( new MaterialService() )->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 礼品卡素材删除
     * @return \think\Response
     */
    public function del()
    {
        $data = $this->request->params([
            [ 'material_ids', [] ],
        ]);
        ( new MaterialService() )->del($data[ 'material_ids' ]);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改礼品卡素材分组
     * @return \think\Response
     */
    public function modifyGroupId()
    {
        $data = $this->request->params([
            [ 'material_ids', '' ], // 素材图片id，多个逗号隔开
            [ 'group_id', '' ], // 素材分组id
        ]);
        ( new MaterialService() )->modifyGroupId($data);
        return success('SUCCESS');
    }

}
