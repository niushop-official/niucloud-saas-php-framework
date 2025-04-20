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

namespace addon\yk_recharge\app\adminapi\controller;

use addon\yk_recharge\app\service\admin\RechargeSettingService;
use core\base\BaseAdminController;
use think\Response;

class Setting extends BaseAdminController
{
    /**
     * 充值订单列表
     * @return Response
     */
    public function show()
    {
        $data = $this->request->params([]);
        return success(( new RechargeSettingService() )->getPage($data));
    }


    
    /**
     * 充值详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new RechargeSettingService() )->getInfo($id));
    }

    /**
     * 添加充值
     * @return Response
     */
    public function add()
    {
        $res = ( new RechargeSettingService() )->getAuth();
        if(empty($res)){
            return fail('您的宝贵建议是我们更新的动力，请联系客服获取授权码');
        }else{
            $data = $this->request->params([
                [ 'amount', 0 ],
                [ 'money', 0 ],
                [ 'jifen', 0 ],
                [ 'level_id', 0 ],
            ]);
            $this->validate($data, 'addon\yk_recharge\app\validate\Setting.add');
            $id = ( new RechargeSettingService() )->add($data);
            return success('ADD_SUCCESS', [ 'id' => $id ]);
        }
       
    }

    /**
     * 充值编辑
     * @param int $setting_id //分类id
     * @return Response
     */
    public function edit(int $setting_id)
    {
        $data = $this->request->params([
            [ 'amount', 0 ],
            [ 'money', 0 ],
            [ 'jifen', 0 ],
            [ 'level_id', 0 ],
        ]);
        $this->validate($data, 'addon\yk_recharge\app\validate\Setting.edit');
        ( new RechargeSettingService() )->edit($setting_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 充值删除
     * @param int $setting_id
     * @return Response
     */
    public function del(int $setting_id)
    {
        $res = ( new RechargeSettingService() )->getAuth();
        if(empty($res)){
            return fail('您的宝贵建议是我们更新的动力，请联系客服获取授权码');
        }else{
            ( new RechargeSettingService() )->del($setting_id);
            return success('DELETE_SUCCESS');
        }
       
    }

}
