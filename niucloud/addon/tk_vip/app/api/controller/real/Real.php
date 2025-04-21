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

namespace addon\tk_vip\app\api\controller\real;

use addon\tk_vip\app\service\api\RealService;
use core\base\BaseApiController;

class Real extends BaseApiController
{
    /**
     * @Notes:获取实名配置
     * @Interface getRealConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/11/15   上午1:53
     */
    public function getRealConfig()
    {
        return success((new RealService())->getRealConfig('apitype'));
    }

    /**
     * @Notes:检查实名
     * @Interface checkReal
     * @return \think\Response
     * @author: TK
     * @Time: 2024/11/15   上午1:53
     */
    public function checkReal()
    {
        return success((new RealService())->checkReal());
    }

    /**
     * @Notes:申请实名
     * @Interface submitReal
     * @return \think\Response
     * @throws \think\Exception
     * @author: TK
     * @Time: 2024/11/15   上午1:53
     */
    public function submitReal()
    {
        $data = $this->request->params([
            ['real_name', ''],
            ['card_num', ''],
            ['sex', ''],
            ['birthday', ''],
            ['field', []],
            ['mobile',''],
            ['card_img_back',[]],
            ['card_img_front',[]],
        ]);
        return success((new RealService())->submitReal($data));
    }

    /**
     * @Notes:获取实名信息
     * @Interface getRealInfo
     * @return \think\Response
     * @author: TK
     * @Time: 2024/11/15   上午1:56
     */
    public function getRealInfo()
    {
        return success((new RealService())->getRealInfo());
    }
}
