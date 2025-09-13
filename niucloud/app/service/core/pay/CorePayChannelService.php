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

namespace app\service\core\pay;


use app\dict\pay\PayDict;
use app\model\pay\PayChannel;
use app\service\core\channel\CoreAppService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wechat\CoreWechatConfigService;
use core\base\BaseCoreService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;


/**
 * 支付渠道服务层
 */
class CorePayChannelService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new PayChannel();

    }

    /**
     * 查询实例
     * @param int $site_id
     * @param array $where
     * @return PayChannel|array|mixed|Model
     */
    public function find(int $site_id, array $where)
    {
        $where[ 'site_id' ] = $site_id;
        return $this->model->where($where)->findOrEmpty();
    }

    /**
     * 通过渠道获取支持的支付方式(专属用于支付业务)
     * @param int $site_id
     * @param string $channel
     * @param string $trade_type
     * @return array|array[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAllowPayTypeByChannel(int $site_id, string $channel, string $trade_type = '')
    {
        $channel_pay_list = $this->model->where([ [ 'site_id', '=', $site_id ], [ 'channel', '=', $channel ], [ 'status', '=', 1 ] ])->field('type,config')->order('sort asc')->select()->toArray();

        if (!empty($channel_pay_list)) {
            $temp_channel_pay_list = array_column($channel_pay_list, 'type');
            $pay_type_arr = PayDict::getPayType($temp_channel_pay_list);
            foreach ($temp_channel_pay_list as $key) {
                if (isset($pay_type_arr[$key])) {
                    $pay_type_list[$key] = $pay_type_arr[$key];
                }
            }
        }
        //充值订单不支持余额支付和找朋友帮忙付
        if (!empty($pay_type_list) && $trade_type == 'recharge') {
            unset($pay_type_list[ PayDict::BALANCEPAY ], $pay_type_list[ PayDict::FRIENDSPAY ]);
        }
        // 线下支付做处理
        if (!empty($pay_type_list) && isset($pay_type_list[ PayDict::OFFLINEPAY ])) {
            $temp_channel_pay_list = array_column($channel_pay_list, null, 'type');
            $pay_type_list[ PayDict::OFFLINEPAY ][ 'config' ] = $temp_channel_pay_list[ PayDict::OFFLINEPAY ][ 'config' ];
        }
        // 找朋友帮忙付做处理
        if (!empty($pay_type_list) && isset($pay_type_list[ PayDict::FRIENDSPAY ])) {
            $temp_channel_pay_list = array_column($channel_pay_list, null, 'type');
            $pay_type_list[ PayDict::FRIENDSPAY ][ 'config' ] = $temp_channel_pay_list[ PayDict::FRIENDSPAY ][ 'config' ];
            if (!empty($temp_channel_pay_list[ PayDict::FRIENDSPAY ][ 'config' ])) {
                $pay_type_list[ PayDict::FRIENDSPAY ][ 'name' ] = $temp_channel_pay_list[ PayDict::FRIENDSPAY ][ 'config' ][ 'pay_type_name' ];
            }
        }
        return $pay_type_list ?? [];

    }

    /**
     * 通过渠道和支付方式获取支付配置
     * @param int $site_id
     * @param string $channel
     * @param string $type
     * @return array|mixed
     */
    public function getConfigByChannelAndType(int $site_id, string $channel, string $type)
    {
        $pay_channel = $this->model->where([ [ 'site_id', '=', $site_id ], [ 'channel', '=', $channel ], [ 'type', '=', $type ] ])->field('config')->findOrEmpty();
        if (!$pay_channel->isEmpty()) {
            if ($type == PayDict::WECHATPAY) {
                $pay_channel->config = array_merge($pay_channel->config, $this->getWechatPayFullConfig($site_id));
            }
            return $pay_channel->config;
        }
        return [];
    }

    /**
     * 获取完整的微信支付配置(根据场景)
     * @param int $site_id
     * @return array
     */
    public function getWechatPayFullConfig(int $site_id)
    {
        //TODO 先判断是否是开放平台授权,然后再决定使用什么appid
        //查询公众号配置
        $core_wechat_config_service = new CoreWechatConfigService();
        $mp_app_id = $core_wechat_config_service->getWechatConfig($site_id)[ 'app_id' ];//公众号appid
        //查询公众号配置
        $core_weapp_config_service = new CoreWeappConfigService();
        $mini_app_id = $core_weapp_config_service->getWeappConfig($site_id)[ 'app_id' ];//小程序appid
        // 查询微信移动应用配置
        $core_app_service = new CoreAppService();
        $app_id = $core_app_service->getConfig($site_id)['wechat_app_id'] ?? ''; //App appid

        //todo  查询微信小程序 appid  .  应用appid.....
        return [
            'mp_app_id' => $mp_app_id,
            'mini_app_id' => $mini_app_id,
            'app_id' => $app_id
            //............
        ];
    }
}
