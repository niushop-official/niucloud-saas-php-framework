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

namespace addon\shop_fenxiao\app\service\core\fenxiao;

use app\model\sys\Poster;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 商品配置
 * Class CoreFenxiaoConfigService
 * @package addon\shop_fenxiao\app\service\core
 */
class CoreFenxiaoConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 分销设置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setFenxiaoConfig(int $site_id, array $data)
    {

        $value = [
            'is_fenxiao' => $data['is_fenxiao'] ?? '0',
            'level' => $data['level'] ?? 1,//分销层级
            'is_examine' => $data['is_examine'] ?? '1',//是否需要审核
            'self_purchase_rebate' => $data['self_purchase_rebate'] ?? '1',//是否开启分销商自购返佣
            'apply_type' => $data['apply_type'] ?? '2',//申请方式1无需申请2 手动申请 3.手动设置
            'fenxiao_condition' => $data['fenxiao_condition'] ?? '0',//成为分销商条件(0无条件 1消费次数 2消费金额 3购买商品)
            'consume_count' => $data['consume_count'] ?? '0',//消费次数
            'consume_money' => $data['consume_money'] ?? '0',//消费金额
            'goods_ids' => $data['goods_ids'] ?? '',//指定商品id
            'consume_condition' => $data['consume_condition'] ?? '2',//消费条件(1付款后 2订单完成)
            'child_condition' => $data['child_condition'] ?? '1',//成为下线条件 1:首次点击分享链接 2：首次下单 3：首次付款
            'is_show_apply' => $data['is_show_apply'] ?? '0', //是否显示申请协议
            'apply_head' => $data['apply_head'] ?? '', //申请协议顶部图片
            'poster_bg' => $data['poster_bg'] ?? '',//海报背景
        ];

        $this->core_config_service->setConfig($site_id, 'SHOP_FENXIAO_FENXIAO_CONFIG', $value);
        return true;
    }

    /**
     * 获取分销设置
     * @param int $site_id
     */
    public function getFenxiaoConfig(int $site_id)
    {
        $data = $this->core_config_service->getConfigValue($site_id, 'SHOP_FENXIAO_FENXIAO_CONFIG');

        $value = [
            'is_fenxiao' => $data['is_fenxiao'] ?? '0',
            'level' => $data['level'] ?? '1',//分销层级
            'is_examine' => $data['is_examine'] ?? '1',//是否需要审核
            'self_purchase_rebate' => $data['self_purchase_rebate'] ?? '1',//是否开启分销商自购返佣
            'apply_type' => $data['apply_type'] ?? '2',//申请方式1无需申请2 手动申请 3.手动设置
            'fenxiao_condition' => $data['fenxiao_condition'] ?? '0',//成为分销商条件(0无条件 1消费次数 2消费金额 3购买商品)
            'consume_count' => $data['consume_count'] ?? '0',//消费次数
            'consume_money' => $data['consume_money'] ?? '0',//消费金额
            'goods_ids' => $data['goods_ids'] ?? '',//指定商品id
            'consume_condition' => $data['consume_condition'] ?? '2',//消费条件(1付款后 2订单完成)
            'child_condition' => $data['child_condition'] ?? '1',//成为下线条件 1:首次点击分享链接 2：首次下单 3：首次付款
            'is_show_apply' => $data['is_show_apply'] ?? '0', //是否显示申请协议
            'apply_head' => $data['apply_head'] ?? 'addon/shop_fenxiao/apply_top.png', //申请协议顶部图片
            'poster_bg' => $data['poster_bg'] ?? '',//海报背景
        ];

        return $value;
    }

    /**
     * 设置分销海报
     * @param int $site_id
     * @param array $data
     * @return true
     */
    public function setFenxiaoPosterConfig(int $site_id, array $data)
    {
        $value = [
            'share_content' => $data['share_content'] ?? '',
            'poster_bg' => $data['poster_bg'] ?? '',//海报背景
        ];
        $this->core_config_service->setConfig($site_id, 'SHOP_FENXIAO_POSTER_CONFIG', $value);
        //临时方案
        $poster_model = new Poster();
        $poster = $poster_model->where([['site_id', '=', $site_id], ['type', '=', 'fenxiao']])->findOrEmpty();
        if(!$poster->isEmpty()){
            $poster_value = $poster['value'];
            $poster_value['bg_url'] = $data['poster_bg'] ?? '';
            $poster_model->where([['site_id', '=', $site_id], ['type', '=', 'fenxiao']])->update(['value' => $poster_value]);
        }
        return true;
    }

    /**
     * 获取海报配置
     * @param int $site_id
     */
    public function getFenxiaoPosterConfig(int $site_id)
    {
        $data = $this->core_config_service->getConfigValue($site_id, 'SHOP_FENXIAO_POSTER_CONFIG');
        $value = [
            'share_content' => $data['share_content'] ?? '',
            'poster_bg' => $data['poster_bg'] ?? 'addon/shop_fenxiao/poster/fenxiao_1.jpg',//海报背景
        ];
        return $value;
    }

}
