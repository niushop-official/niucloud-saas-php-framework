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

namespace addon\qiankun_recharge\app\adminapi\controller\options;

use core\base\BaseAdminController;
use addon\qiankun_recharge\app\service\admin\options\OptionsService;


/**
 * 充值项列控制器
 * Class Options
 * @package addon\qiankun_recharge\app\adminapi\controller\options
 */
class Options extends BaseAdminController
{
    /**
     * 获取充值项列列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["title", ""],
            ["give_level", ""],
            ["status", ""],
        ]);
        return success((new OptionsService())->getPage($data));
    }

    /**
     * 充值项列详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new OptionsService())->getInfo($id));
    }

    /**
     * 添加充值项列
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["title", ""],
            ["recharge", 0.00],
            ["give_price", 0.00],
            ["give_integral", 0],
            ["give_coupon", []],
            ["give_level", ""],
            ["status", 0],
            ["sort", 0],
        ]);
        $data['give_coupon'] = implode(',', $data['give_coupon']);
        $this->validate($data, 'addon\qiankun_recharge\app\validate\options\Options.add');
        $id = (new OptionsService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 充值项列编辑
     * @param $id int 充值项列id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["title", ""],
            ["recharge", 0.00],
            ["give_price", 0.00],
            ["give_integral", 0],
            ["give_coupon", []],
            ["give_level", ""],
            ["status", 0],
            ["sort", 0],

        ]);
        $data['give_coupon'] = implode(',', $data['give_coupon']);
        $this->validate($data, 'addon\qiankun_recharge\app\validate\options\Options.edit');
        (new OptionsService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 充值项列删除
     * @param $id int 充值项列id
     * @return \think\Response
     */
    public function del(int $id)
    {
        (new OptionsService())->del($id);
        return success('DELETE_SUCCESS');
    }


    public function getCouponAll()
    {
        return success((new OptionsService())->getCouponAll());
    }

    public function getMemberLevelAll()
    {
        return success((new OptionsService())->getMemberLevelAll());
    }

}
