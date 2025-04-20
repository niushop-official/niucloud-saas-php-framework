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

use addon\shop_giftcard\app\service\api\card\CardService;
use core\base\BaseApiController;


/**
 * 礼品卡获取控制器
 * Class Card
 * @package addon\shop_giftcard\app\api\controller\card
 */
class Card extends BaseApiController
{
    /**
     * 获取卡列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "giftcard_id", "" ],
            [ "card_bag_id", "" ],
            [ "order_id", "" ],
            [ "card_no", "" ],
            [ "status", "" ],
        ]);
        return success(( new CardService() )->getPage($data));
    }

    /**
     * 查询卡包中的礼品卡
     * @return \think\Response
     */
    public function getCard()
    {
        $data = $this->request->params([
            [ "card_bag_id", "" ],
        ]);
        return success(( new CardService() )->getCard($data['card_bag_id']));
    }

    /**
     * 获取卡的状态列表
     * @return \think\Response
     */
    public function status()
    {
        return success(( new CardService() )->getStatusList());
    }

    /**
     * 获取卡信息
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new CardService() )->getInfo($id));
    }

    /**
     * 获取卡详情
     * @param int $id
     * @return \think\Response
     */
    public function detail(int $id)
    {
        return success(( new CardService() )->getDetail($id));
    }

    /**
     * 激活实体礼品卡
     * @return \think\Response
     */
    public function activate()
    {
        $data = $this->request->params([
            [ "card_no", "" ],
            [ "card_key", "" ]
        ]);
        return success(( new CardService() )->activateRealCard($data));
    }

    /**
     * 修改实体礼品卡的封面图片
     * @return \think\Response
     */
    public function modifyRealCardCover()
    {
        $data = $this->request->params([
            [ "card_id", 0 ],
            [ "card_cover", "" ]
        ]);
        ( new CardService() )->modifyRealCardCover($data);
        return success('SUCCESS');
    }
}
