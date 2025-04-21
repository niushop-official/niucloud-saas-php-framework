<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop_giftcard\app\listener\card;

use addon\shop_giftcard\app\model\card\Card;

/**
 * 储值卡导出数据源查询
 * Class BalanceCardExportDataListener
 * @package addon\shop_giftcard\app\listener\card
 */
class BalanceCardExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param[ 'type' ] == 'shop_giftcard_balance_card') {
            $card_model = new Card();
            $order = 'card_no asc';
            //查询导出卡密数据
            $search_model = $card_model->where([ [ 'site_id', '=', $param[ 'site_id' ] ] ])->withSearch([ 'giftcard_id', 'card_make_id' ], $param[ 'where' ])->field('card_no,card_key,balance')->order($order);
            if ($param[ 'page' ][ 'page' ] > 0 && $param[ 'page' ][ 'limit' ] > 0) {
                $data = $search_model->page($param[ 'page' ][ 'page' ], $param[ 'page' ][ 'limit' ])->select()->toArray();
            } else {
                $data = $search_model->select()->toArray();
            }
            foreach ($data as $key => $val) {
                $data[ $key ][ 'card_no' ] = $val[ 'card_no' ] . "\t";
                $data[ $key ][ 'card_key' ] = $val[ 'card_key' ] . "\t";
            }
        }
        return $data;
    }
}