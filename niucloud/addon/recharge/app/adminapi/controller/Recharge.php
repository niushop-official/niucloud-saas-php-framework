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

namespace addon\recharge\app\adminapi\controller;


use addon\recharge\app\service\admin\RechargeService;
use core\base\BaseAdminController;

class Recharge extends BaseAdminController
{
    /**
     * 设置会员充值套餐配置
     * @return \think\Response
     */
    public function setRechargeConfig()
    {
        $data = $this->request->params([
            [ "is_use", 1 ],
            [ "recharge_explain", "" ],
            [ "min_price", 0.01 ],
            [ "close_length", 10 ],
        ]);

        ( new RechargeService() )->setRechargeConfig($data);
        return success('SUCCESS');
    }

    /**
     * 获取充值套餐配置
     * @return \think\Response
     */
    public function getRechargeConfig()
    {
        return success(( new RechargeService() )->getRechargeConfig());
    }

    /**
     * 获取充值套餐分页列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "recharge_name", "" ],
            [ "create_time", [] ],
        ]);
        return success(( new RechargeService() )->getPage($data));
    }

    /**
     * 添加充值套餐
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "recharge_name", "" ],
            [ "face_value", '' ],
            [ "buy_price", '' ],
            [ "point", 0 ],
            [ "growth", 0 ],
            [ "gift_json", [] ],
            [ "status", 1 ],
            [ "sort", 0 ],
        ]);
        $this->validate($data, 'addon\recharge\app\validate\Recharge.add');
        $id = ( new RechargeService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 编辑充值套餐
     * @param int $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            [ "recharge_name", "" ],
            [ "face_value", '' ],
            [ "buy_price", '' ],
            [ "point", 0 ],
            [ "growth", 0 ],
            [ "gift_json", [] ],
            [ "status", 1 ],
            [ "sort", 0 ],
        ]);
        $this->validate($data, 'addon\recharge\app\validate\Recharge.edit');
        ( new RechargeService() )->edit($id, $data);
        return success('EDIT_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 获取满减送编辑数据
     * @return \think\Response
     */
    public function init()
    {
        $data = $this->request->params([
            [ "recharge_id", 0 ],
        ]);
        return success(( new RechargeService() )->getInit($data));
    }

    /**
     * 删除
     * @param int $id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new RechargeService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改状态
     * @return \think\Response
     */
    public function modifyStatus()
    {
        $data = $this->request->params([
            [ 'recharge_id', '' ],
            [ 'status', '' ],
        ]);
        ( new RechargeService() )->modifyStatus($data);
        return success('SUCCESS');
    }

    /**
     * 修改排序号
     * @return \think\Response
     */
    public function editSort()
    {
        $data = $this->request->params([
            [ "recharge_id", "" ],
            [ "sort", 0 ],
        ]);
        ( new RechargeService() )->editSort($data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 获取充值赠送规则字典
     * @return \think\Response
     */
    public function getPackageGiftDict()
    {
        return success(( new RechargeService() )->getPackageGiftDict());
    }

}
