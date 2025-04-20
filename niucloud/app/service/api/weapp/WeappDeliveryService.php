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

namespace app\service\api\weapp;

use app\model\pay\Pay;
use app\service\core\weapp\CoreWeappDeliveryService;
use core\base\BaseApiService;


/**
 * 小程序发货信息管理服务
 * Class WeappDeliveryService
 * @package app\service\core\wechat
 */
class WeappDeliveryService extends BaseApiService
{

    public $core_weapp_deliver_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_weapp_deliver_service = new CoreWeappDeliveryService();
    }

    /**
     * 查询小程序是否已开通发货信息管理服务
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     */
    public function getIsTradeManaged()
    {
        $result = $this->core_weapp_deliver_service->isTradeManaged($this->site_id);
        if ($result[ 'errcode' ] == 0 && $result[ 'is_trade_managed' ]) {
            return true;
        }
        return false;
    }

    /**
     * 通过外部交易号获取消息跳转路径
     * @param $out_trade_no
     * @return string
     */
    public function getMsgJumpPath($out_trade_no)
    {

        $pay_model = new Pay();
        $where = array (
            [ 'site_id', '=', $this->site_id ],
            [ 'out_trade_no', '=', $out_trade_no ]
        );
        $pay_info = $pay_model->where($where)->field('out_trade_no,trade_type,trade_id')->findOrEmpty()->toArray();

        // 未获取到交易信息
        if (empty($pay_info)) {
            return '';
        }

        $order_detail_path = event('WapOrderDetailPath', $pay_info)[ 0 ] ?? '';
        // 未获取到订单详情路径
        if (empty($order_detail_path)) {
            return '';
        }

        return $order_detail_path;
    }

}