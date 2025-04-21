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

namespace addon\shop_giftcard\app\adminapi\controller\card;

use core\base\BaseAdminController;
use addon\shop_giftcard\app\service\admin\card\CardService;


/**
 * 礼品卡获取控制器
 * Class Card
 * @package addon\shop_giftcard\app\adminapi\controller\card
 */
class Card extends BaseAdminController
{
    /**
     * 获取礼品卡获取分页列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "giftcard_id", "" ],
            [ "source", "" ],
            [ "card_no", "" ],
            [ "status", "" ],
            [ "member_id", "" ],
        ]);
        return success(( new CardService() )->getPage($data));
    }

    /**
     * 礼品卡获取详情
     * @param int $id
     * @return \think\Response
     */
    public function detail(int $id)
    {
        return success(( new CardService() )->getDetail($id));
    }

    /**
     * 实体礼品卡 制作卡密
     * @return \think\Response
     */
    public function makeCard()
    {
        $data = $this->request->params([
            [ 'make_id', 0 ],
            [ "giftcard_id", 0 ],
        ]);
        return success(( new CardService() )->makeCard($data));
    }

    /**
     * 礼品卡获取删除
     * @param $id  礼品卡获取id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new CardService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取卡的来源列表
     * @return \think\Response
     */
    public function getSourceList()
    {
        return success(( new CardService() )->getSourceList());
    }

    /**
     * 获取卡的状态
     * @return \think\Response
     */
    public function getStatusListByType()
    {
        $data = $this->request->params([
            [ 'card_type', '' ],
        ]);
        return success(( new CardService() )->getStatusListByType($data[ 'card_type' ]));
    }

}
