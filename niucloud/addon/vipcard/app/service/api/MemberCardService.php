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

namespace addon\vipcard\app\service\api;

use addon\vipcard\app\dict\MemberCardDict;
use addon\vipcard\app\model\MemberCard;
use core\base\BaseApiService;
use core\util\Barcode;

/**
 * 会员卡项服务层
 * Class MemberCardService
 * @package addon\vipcard\app\service\api\MemberCardService
 */
class MemberCardService extends BaseApiService
{
    /**
     * 查询会员卡项
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where) {
        $search_model = (new MemberCard())->where([ ['site_id', '=', $this->site_id],['member_id', '=', $this->member_id], ['status', '<>', MemberCardDict::REFUNDED ] ])
            ->with(['goods' => function($query){
                $query->field('site_id,goods_id,goods_name,goods_cover,keywords,price');
            }])
            ->field('card_id,card_no,goods_id,total_num,total_use_num,goods_type,card_type,create_time,expire_time,status')->order('create_time desc')
            ->append(['card_type_name', 'status_name', 'expire_time_name', 'goods.cover_thumb_small']);

        return $this->pageQuery($search_model);
    }

    /**
     * 查询卡项详情
     * @param int $card_id
     * @return MemberCard
     */
    public function getDetail(int $card_id) {
        $detail = (new MemberCard())->where([ ['site_id', '=', $this->site_id],['member_id', '=', $this->member_id], ['card_id', '=', $card_id], ['status', '<>', MemberCardDict::REFUNDED ] ])
            ->with(['goods' => function($query){
                $query->field('goods_id,site_id,goods_name,goods_cover,keywords,price,goods_content');
            }, 'member_card_item' => function($query){
                $query->field('item_id,card_id,goods_id,use_num,num,verify_code')->with(['goods' => function($item_query){
                    $item_query->field('goods_id,site_id,goods_name,goods_cover,price');
                }, 'member_card_verify' => function($query){
                    $query->field('card_item_id,num,create_time');
                }]);
            }])
            ->field('card_id,card_no,total_num,total_use_num,goods_type,card_type,create_time,expire_time,goods_id,status')->order('create_time desc')
            ->append(['card_type_name', 'status_name', 'expire_time_name', 'goods.cover_thumb_small', 'goods.cover_thumb_mid', 'member_card_item.goods.cover_thumb_small'])->findOrEmpty()->toArray();

        if (!empty($detail)) {
            foreach ($detail['member_card_item'] as $key => $item) {
                try {
                    // 生成核销码二维码
                    $qrcode_dir = 'upload/temp';
                    if (!is_dir($qrcode_dir)) mkdir($qrcode_dir, intval('0755', 8), true);
                    $qrcode_path = "{$qrcode_dir}/card_item_qrcode_{$item['item_id']}.png";
                    \core\util\QRcode::png($item['verify_code'], $qrcode_path, 'L', 16, 1);

                    // 生成核销码条形码
                    $barcode_path = (new Barcode(14, $item['verify_code']))->generateBarcode($qrcode_dir, 2);

                    $detail['member_card_item'][$key]['verify_code_qrcode'] = image_to_base64($qrcode_path, true);
                    $detail['member_card_item'][$key]['verify_code_barcode'] = image_to_base64($barcode_path);
                } catch (\Exception $e) {
                }
            }
        }

        return $detail;
    }
}
