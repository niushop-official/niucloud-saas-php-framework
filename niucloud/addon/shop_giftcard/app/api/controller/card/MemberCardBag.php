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

namespace addon\shop_giftcard\app\api\controller\card;

use addon\shop_giftcard\app\service\api\card\MemberCardBagService;
use core\base\BaseApiController;


/**
 * 礼品卡会员卡包控制器
 * Class Card
 * @package addon\shop_giftcard\app\api\controller\card
 */
class MemberCardBag extends BaseApiController
{
    /**
     * 获取卡包列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "giftcard_id", "" ],
            [ "order_id", "" ],
            [ "status", "" ],
        ]);
        return success(( new MemberCardBagService() )->getPage($data));
    }

}
