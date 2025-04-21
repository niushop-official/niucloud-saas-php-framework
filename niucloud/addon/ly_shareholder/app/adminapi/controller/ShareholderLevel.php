<?php

namespace addon\ly_shareholder\app\adminapi\controller;

use addon\ly_shareholder\app\service\admin\ShareholderLevelService;
use core\base\BaseAdminController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;


/**
 * 股东等级控制器
 * Class ShareholderLevel
 * @package addon\ly_shareholder\app\adminapi\controller
 */
class ShareholderLevel extends BaseAdminController
{
    /**
     * 获取股东等级列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["create_time", ""]
        ]);
        return success((new ShareholderLevelService())->getPage($data));
    }

    /**
     * 股东等级详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new ShareholderLevelService())->getInfo($id));
    }

    /**
     * 添加股东等级
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["level_num", 0],
            ["level_name", ""],
            ["rate", 0.00],
            ["upgrade_type", 0],
            ["order_num", 0],
            ["order_money", 0.00],
            ["recharge_money", 0.00],
            ["order_goods_id", []],
            ["status", 0],

        ]);

        if(is_array($data['order_goods_id'])){
            $data['order_goods_id'] = implode(",",$data['order_goods_id']);
        }

        $id = (new ShareholderLevelService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 股东等级编辑
     * @param $id  股东等级id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["level_num", 0],
            ["level_name", ""],
            ["rate", 0.00],
            ["upgrade_type", 0],
            ["order_num", 0],
            ["order_money", 0.00],
            ["recharge_money", 0.00],
            ["order_goods_id", []],
            ["status", 0],

        ]);

        if(is_array($data['order_goods_id'])){
            $data['order_goods_id'] = implode(",",$data['order_goods_id']);
        }

        (new ShareholderLevelService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 股东等级删除
     * @param $id  股东等级id
     * @return Response
     */
    public function del(int $id)
    {
        (new ShareholderLevelService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 股东等级权重
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getLevelNumList()
    {
        return success((new ShareholderLevelService())->getLevelNumList());
    }

    /**
     * 等级内容卡片
     * @param int $id
     * @return Response
     */
    public function getShareholderCard()
    {
        $data = $this->request->params([
            ["id", 0],
        ]);
        return success((new ShareholderLevelService())->getShareholderCardList($data));
    }

    /**
     *  查询股东等级列表(用于弹框选择)
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getListOfSelect()
    {
        return success((new ShareholderLevelService())->getListOfSelect());
    }

}
