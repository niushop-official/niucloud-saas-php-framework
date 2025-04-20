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

use addon\shop_giftcard\app\service\api\giftcard\GiftcardService;
use core\base\BaseApiController;


/**
 * 礼品卡活动控制器
 * Class Giftcard
 * @package addon\shop_giftcard\app\api\controller\giftcard
 */
class Giftcard extends BaseApiController
{
    /**
     * 获取礼品卡活动分页列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "category_id", "" ],
            [ "card_name", "" ],
        ]);

        return success(( new GiftcardService() )->getPage($data));
    }

    /**
     * 获取礼品卡列表（供自定义组件调用）
     * @return \think\Response
     */
    public function components()
    {
        $data = $this->request->params([
            [ 'num', 0 ],
            [ 'giftcard_ids', '' ],
            [ 'category_id', 0 ],
            [ 'order', '' ], // 排序方式（综合：空，销量：sale_num，价格：price）
        ]);

        return success(( new GiftcardService() )->getListByComponents($data));
    }

    /**
     * 礼品卡活动详情
     * @param $id
     * @return \think\Response
     */
    public function detail($id)
    {
        return success(( new GiftcardService() )->getDetail($id));
    }

}
