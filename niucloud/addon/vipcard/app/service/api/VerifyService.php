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

use addon\vipcard\app\model\MemberCardItem;
use addon\vipcard\app\model\MemberCardVerify;
use addon\vipcard\app\model\Verifier;
use addon\vipcard\app\service\core\CoreMemberCardService;
use core\base\BaseApiService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 核销服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class VerifyService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->checkIsVerifier();
    }

    public function checkIsVerifier() {
        $model = (new Verifier())->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id] ])->findOrEmpty();
        if ($model->isEmpty()) throw new CommonException('NOT_IS_VERIFIER');

        return true;
    }

    /**
     * 获取核销记录列表
     * @return void
     */
    public function getPage(array $where  = []) {
        $this->checkIsVerifier();

        $search_model = (new MemberCardVerify())->where([
            ['site_id', '=', $this->site_id],
            ['verifier_type', '=', 'member'],
            ['verifier_id', '=', $this->member_id]
        ])->field('id,card_id,site_id,card_item_id,verify_code,num,create_time')
            ->order('create_time desc')
            ->with(['member_card_item' => function($query){
                $query->field('item_id,goods_id,use_num,num')->with(['goods' => function($goods_query) {
                    $goods_query->field('goods_id,site_id,goods_name,goods_cover,price');
                }]);
            }]);

        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取核销记录详情
     * @param string $verify_code
     * @return void
     */
    public function getDetail(int $id) {
        $this->checkIsVerifier();

        $detail = (new MemberCardVerify())->where([
            ['site_id', '=', $this->site_id ],
            ['id', '=', $id],
            ['verifier_type', '=', 'member'],
            ['verifier_id', '=', $this->member_id]
        ])->field('id,card_id,site_id,card_item_id,verify_code,num,create_time')
            ->with(['member_card_item' => function($query){
                $query->field('item_id,goods_id,use_num,num')->with(['goods' => function($goods_query) {
                    $goods_query->field('goods_id,site_id,goods_name,goods_cover,price');
                }]);
            }])
            ->findOrEmpty()->toArray();

        return $detail;
    }

    /**
     * 获取核销信息
     * @param string $verify_code
     * @return void
     */
    public function searchVerifyDetail(string $verify_code) {
        $this->checkIsVerifier();

        $detail = (new MemberCardItem())->where([ ['site_id', '=', $this->site_id ], ['verify_code', '=', $verify_code] ])
            ->field('item_id,card_id,goods_id,num,use_num,expire_time,verify_code')
            ->with(['card' => function($query){
                $query->field('card_id,total_num,total_use_num,goods_type,card_type,create_time');
            }, 'goods' => function($query){
                $query->field('site_id,goods_id,goods_name,goods_cover,price');
            } ])
            ->findOrEmpty()->toArray();

        return $detail;
    }

    /**
     * 订单核销
     * @param string $verify_code
     * @return void
     */
    public function verify(string $verify_code, int $num = 1) {
        $this->checkIsVerifier();

        Db::startTrans();
        try {
            $use_res =  CoreMemberCardService::use($this->site_id, $verify_code, $num);

            (new MemberCardVerify())->create([
                'card_id' => $use_res['card_id'],
                'site_id' => $this->site_id,
                'card_item_id' => $use_res['card_item_id'],
                'member_id' => $use_res['member_id'],
                'verify_code' => $verify_code,
                'verifier_id' => $this->member_id,
                'verifier_type' => 'member',
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

    /**
     * 根据卡项id查询核销记录
     * @param int $card_id
     * @return array
     */
    public function getVerifyRecordByCard(int $card_id){
        $search_model = (new MemberCardVerify())->where([
            ['site_id', '=', $this->site_id ],
            ['member_id', '=', $this->member_id ],
            ['card_id', '=', $card_id ]
        ])->field('id,card_id,site_id,card_item_id,verify_code,num,create_time')
            ->with(['member_card_item' => function($query){
                $query->field('item_id,goods_id,use_num,num')->with(['goods' => function($goods_query) {
                    $goods_query->field('goods_id,site_id,goods_name,goods_cover,price');
                }]);
            }]);

        $list = $this->pageQuery($search_model);
        return $list;
    }
}