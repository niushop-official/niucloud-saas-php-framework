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

namespace addon\shop_giftcard\app\api\controller\giftcard;

use addon\shop_giftcard\app\service\api\giftcard\CategoryService;
use core\base\BaseApiController;


/**
 * 礼品卡分类控制器
 * Class Category
 * @package addon\shop_giftcard\app\api\controller\giftcard
 */
class Category extends BaseApiController
{

    /**
     * 获取礼品卡分类列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "category_name", "" ],
        ]);
        return success(( new CategoryService() )->getList($data));
    }

}
