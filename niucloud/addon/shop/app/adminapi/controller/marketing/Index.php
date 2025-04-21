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

namespace addon\shop\app\adminapi\controller\marketing;

use addon\shop\app\service\admin\marketing\MarketingService;
use core\base\BaseAdminController;


/**
 * 营销中心控制器
 * Class Index
 * @package addon\shop\app\adminapi\controller\marketing
 */
class Index extends BaseAdminController
{

    public function index(){
        $data = $this->request->params([
            ['addon', ''],
        ]);
        return success((new MarketingService())->index($data));
    }

}
