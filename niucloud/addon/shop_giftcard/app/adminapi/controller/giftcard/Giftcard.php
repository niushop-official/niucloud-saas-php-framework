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

namespace addon\shop_giftcard\app\adminapi\controller\giftcard;

use addon\shop_giftcard\app\service\admin\giftcard\GiftcardService;
use core\base\BaseAdminController;


/**
 * 礼品卡活动控制器
 * Class Giftcard
 * @package addon\shop_giftcard\app\adminapi\controller\giftcard
 */
class Giftcard extends BaseAdminController
{
    /**
     * 获取礼品卡活动分页列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "type", "" ],
            [ "category_id", "" ],
            [ "card_name", "" ],
            [ "status", "" ],
            [ "card_right_type", "" ],
            [ "delivery_way", "" ],
            [ 'order', '' ],
            [ 'sort', '' ]
        ]);

        return success(( new GiftcardService() )->getPage($data));
    }

    /**
     * 获取礼品卡活动列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "type", "" ],
            [ "category_id", "" ],
            [ "card_name", "" ],
            [ "status", "" ],
            [ "card_right_type", "" ],
            [ "delivery_way", "" ],
        ]);

        return success(( new GiftcardService() )->getList($data));
    }

    /**
     * 礼品卡活动信息
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new GiftcardService() )->getInfo($id));
    }

    /**
     * 获取礼品卡活动详情
     * @param $id
     * @return \think\Response
     */
    public function detail($id)
    {
        return success(( new GiftcardService() )->getDetail($id));
    }

    /**
     * 获取礼品卡活动编辑数据
     * @return \think\Response
     */
    public function init()
    {
        $data = $this->request->params([
            [ "giftcard_id", 0 ],
        ]);
        return success(( new GiftcardService() )->getInit($data));
    }

    /**
     * 添加礼品卡活动
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            // 基础信息
            [ "type", "" ],
            [ "card_name", "" ],
            [ "category_id", 0 ],
            [ "cover", "" ],
            [ "card_price", 0 ],
            [ "is_give", 0 ],
            [ 'receive_validity_time', 0 ],
            [ 'blessing_json', '' ],
            [ "validity_type", "" ],
            [ "validity_day", 0 ],
            [ "validity_time", 0 ],
            [ 'poster_id', 0 ],
            [ "status", 0 ],
            [ "sort", 0 ],

            // 礼品卡权益
            [ "card_right_type", "" ],
            [ "balance_json", "" ],
            [ "delivery_way", "" ],
            [ "card_goods_type", "" ],
            [ "card_goods_count", 0 ],
            [ 'goods_sku_relation', '' ],

            // 制卡规则
            [ 'card_no_length', 0 ],
            [ "card_key_way", "" ],
            [ "card_key_length", 0 ],
            [ "card_prefix", "" ],
            [ "card_suffix", "" ],

            // 详情
            [ 'instruction', '' ],
            [ "card_desc", "" ],
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\Giftcard.add');
        $id = ( new GiftcardService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 礼品卡活动编辑
     * @param $id  礼品卡活动id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            // 基础信息
            [ "type", "" ],
            [ "card_name", "" ],
            [ "category_id", 0 ],
            [ "cover", "" ],
            [ "card_price", 0 ],
            [ "is_give", 0 ],
            [ 'receive_validity_time', 0 ],
            [ 'blessing_json', '' ],
            [ "validity_type", "" ],
            [ "validity_day", 0 ],
            [ "validity_time", 0 ],
            [ 'poster_id', 0 ],
            [ "status", 0 ],
            [ "sort", 0 ],

            // 礼品卡权益
            [ "card_right_type", "" ],
            [ "balance_json", "" ],
            [ "delivery_way", "" ],
            [ "card_goods_type", "" ],
            [ "card_goods_count", 0 ],
            [ 'goods_sku_relation', '' ],

            // 制卡规则
            [ 'card_no_length', 0 ],
            [ "card_key_way", "" ],
            [ "card_key_length", 0 ],
            [ "card_prefix", "" ],
            [ "card_suffix", "" ],

            // 详情
            [ 'instruction', '' ],
            [ "card_desc", "" ],
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\Giftcard.edit');
        ( new GiftcardService() )->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 礼品卡活动删除
     * @param $id  礼品卡活动id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new GiftcardService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改礼品卡上下架状态
     * @return \think\Response
     */
    public function modifyStatus()
    {
        $data = $this->request->params([
            [ 'giftcard_ids', '' ],
            [ 'status', '' ],
        ]);
        ( new GiftcardService() )->modifyStatus($data);
        return success('SUCCESS');
    }

    /**
     * 修改礼品卡商品排序号
     * @return \think\Response
     */
    public function modifySort()
    {
        $data = $this->request->params([
            [ 'giftcard_id', '' ],
            [ 'sort', '' ],
        ]);
        ( new GiftcardService() )->modifySort($data);
        return success('SUCCESS');
    }

    /**
     * 获取礼品卡类型
     * @return \think\Response
     */
    public function type()
    {
        $data = $this->request->params([
            [ 'type', '' ],
        ]);
        return success(( new GiftcardService() )->getType($data[ 'type' ]));
    }

    /**
     * 获取礼品卡权益类型
     * @return \think\Response
     */
    public function cardRightType()
    {
        $data = $this->request->params([
            [ 'type', '' ],
        ]);
        return success(( new GiftcardService() )->getCardRightType($data[ 'type' ]));
    }

    /**
     * 获取礼品卡活动分页列表
     * @return \think\Response
     */
    public function select()
    {
        $data = $this->request->params([
            [ "card_name", "" ],
            [ "category_id", "" ],
            [ "select_type", "all" ],
            [ 'giftcard_ids', [] ],
            [ "card_right_type", "" ],
            [ 'verify_giftcard_ids', [] ]
        ]);

        return success(( new GiftcardService() )->getSelectPage($data));
    }

}
