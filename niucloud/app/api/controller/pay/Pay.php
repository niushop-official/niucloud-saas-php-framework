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

namespace app\api\controller\pay;

use app\service\api\pay\PayService;
use core\base\BaseApiController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

/**
 * 微信服务端通信以及网页授权
 */
class Pay extends BaseApiController
{

    /**
     * 接收消息并推送
     * @return void|null
     */
    public function notify($site_id, $channel, $type, $action)
    {
        return (new PayService())->notify($channel, $type, $action);
    }

    /**
     *  去支付
     * @return Response
     */
    public function pay()
    {

        $data = $this->request->params([
            ['type', ''],
            ['trade_type', ''],//业务类型
            ['trade_id', ''],//业务id
            ['quit_url', ''],
            ['buyer_id', ''],
            ['return_url', ''],
            ['voucher', ''],
            ['openid', '']
        ]);

        return success('SUCCESS',(new PayService())->pay($data['type'], $data['trade_type'], (int)$data['trade_id'], $data['return_url'], $data['quit_url'], $data['buyer_id'], $data['voucher'], $data['openid']));
    }

    public function info($trade_type, $trade_id)
    {
        $data = $this->request->params([
            ['scene', '']
        ]);
        return success((new PayService())->getInfoByTrade($trade_type, $trade_id, $data));
    }

    /**
     * 获取找朋友帮忙付支付信息
     * @return Response
     */
    public function friendspayInfo($trade_type, $trade_id)
    {
        return success((new PayService())->getFriendspayInfoByTrade($trade_type, $trade_id));
    }

    /**
     * 获取可用的支付方法
     * @param $trade_type
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getPayType($trade_type){
        return success((new PayService())->getPayTypeByTrade($trade_type));
    }

    /**
     * 关闭支付
     * @return Response
     */
    public function close(){
        $data = $this->request->params([
            ['out_trade_no', ''],
            ['type', ''],
        ]);
        return success('SUCCESS',(new PayService())->close($data['type'], $data['out_trade_no']));
    }
}
