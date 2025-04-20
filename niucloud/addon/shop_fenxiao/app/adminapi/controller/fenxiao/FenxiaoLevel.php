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

namespace addon\shop_fenxiao\app\adminapi\controller\fenxiao;

use addon\shop_fenxiao\app\service\admin\fenxiao\FenxiaoLevelService;
use core\base\BaseAdminController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;


/**
 * 分销等级控制器
 * Class FenxiaoLevel
 * @package addon\shop_fenxiao\app\adminapi\controller
 */
class FenxiaoLevel extends BaseAdminController
{
    /**
     * 获取分销等级列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["create_time", ""]
        ]);
        return success((new FenxiaoLevelService())->getPage($data));
    }

    /**
     * 分销等级详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new FenxiaoLevelService())->getInfo($id));
    }

    /**
     * 添加分销等级
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["level_num", 0],
            ["level_name", ""],
            ["one_rate", 0.00],
            ["two_rate", 0.00],
            ["upgrade_type", 0],
            ["fenxiao_commission", 0.00],
            ["fenxiao_order_num", 0],
            ["fenxiao_order_money", 0.00],
            ["order_num", 0],
            ["order_money", 0.00],
            ["child_num", 0],
            ["child_fenxiao_num", 0],
            ["status", 0],

        ]);
//        $this->validate($data, 'addon\shop_fenxiao\app\validate\fenxiao_level\FenxiaoLevel.add');
        $id = (new FenxiaoLevelService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 分销等级编辑
     * @param $id  分销等级id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["level_num", 0],
            ["level_name", ""],
            ["one_rate", 0.00],
            ["two_rate", 0.00],
            ["upgrade_type", 0],
            ["fenxiao_commission", 0.00],
            ["fenxiao_order_num", 0],
            ["fenxiao_order_money", 0.00],
            ["order_num", 0],
            ["order_money", 0.00],
            ["child_num", 0],
            ["child_fenxiao_num", 0],
            ["status", 0],

        ]);
//        $this->validate($data, 'addon\shop_fenxiao\app\validate\fenxiao_level\FenxiaoLevel.edit');
        (new FenxiaoLevelService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 分销等级删除
     * @param $id  分销等级id
     * @return Response
     */
    public function del(int $id)
    {
        (new FenxiaoLevelService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 分销等级权重
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getLevelNumList()
    {
        return success((new FenxiaoLevelService())->getList());
    }

    /**
     * 等级内容卡片
     * @param int $id
     * @return Response
     */
    public function getFenxiaoCard()
    {
        $data = $this->request->params([
            ["id", 0],
        ]);
        return success((new FenxiaoLevelService())->getFenxiaoCardList($data));
    }

    /**
     *  查询分销商等级列表(用于弹框选择)
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getListOfSelect()
    {
        return success((new FenxiaoLevelService())->getListOfSelect());
    }

}
