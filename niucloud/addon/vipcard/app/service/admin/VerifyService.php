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

namespace addon\vipcard\app\service\admin;

use addon\vipcard\app\model\MemberCardItem;
use addon\vipcard\app\model\MemberCardVerify;
use addon\vipcard\app\service\core\CoreMemberCardService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * Class VerifyService
 */
class VerifyService extends BaseAdminService
{
    public function getPage(array $where){
        $search_model = (new MemberCardVerify())->where([ ['site_id', '=', $this->site_id ] ])
            ->withSearch(['create_time', 'verify_code'], $where)
            ->append(['verifyer'])
            ->with(['member_card_item' => function($query){
                $query->field('item_id,goods_id,use_num,num,card_id')->with(['goods' => function($goods_query) {
                    $goods_query->field('goods_id,site_id,goods_name,goods_cover,price');
                }, 'card' => function($card_query) {
                    $card_query->field('card_id,order_id');
                } ]);
            }]);
        return $this->pageQuery($search_model);
    }

    public function getDetail(string $verify_code){
        return (new MemberCardItem())->where([ ['site_id', '=', $this->site_id], ['verify_code', '=', $verify_code] ])
            ->with(['card' => function($query){
                $query->field('card_id,total_num,total_use_num,create_time');
            }, 'goods' => function($query){
                $query->field('goods_id,goods_name,goods_cover,price,site_id,goods_type')->append(['cover_thumb_samll','goods_type_name']);
            }])->append(['expire_time_name'])
            ->findOrEmpty()->toArray();
    }

    /**
     * 核销
     * @param string $verify_code
     * @param $num
     * @return true
     */
    public function verify(string $verify_code, $num = 1){
        Db::startTrans();
        try {
            $use_res =  CoreMemberCardService::use($this->site_id, $verify_code, $num);

            (new MemberCardVerify())->create([
                'card_id' => $use_res['card_id'],
                'site_id' => $this->site_id,
                'card_item_id' => $use_res['card_item_id'],
                'member_id' => $use_res['member_id'],
                'verify_code' => $verify_code,
                'verifier_id' => $this->uid,
                'verifier_type' => 'user',
                'num' => $num,
                'create_time' => time()
            ]);

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }
}