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

namespace app\service\api\pay;

use app\dict\common\ChannelDict;
use app\dict\pay\PaySceneDict;
use app\model\member\Member;
use app\model\pay\Pay;
use app\model\sys\Poster;
use app\service\core\member\CoreMemberService;
use app\service\core\pay\CorePayService;
use core\base\BaseApiService;
use core\exception\ApiException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 支付业务
 */
class TransferService extends BaseApiService
{

    public $core_pay_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_pay_service = new CorePayService();
    }

    /**
     * 去支付
     * @param string $type
     * @param string $trade_type
     * @param int $trade_id
     * @param string $return_url
     * @param string $quit_url
     * @param string $buyer_id
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function confirm(string $transfer_no, array $data = []){

//        $member = (new CoreMemberService())->getInfoByMemberId($this->site_id, $this->member_id);
//        switch ($this->channel) {
//            case ChannelDict::WECHAT://公众号
//                $openid = $openid ? $openid : $member['wx_openid'] ?? '';
//                break;
//            case ChannelDict::WEAPP://微信小程序
//                $openid = $openid ? $openid : $member['weapp_openid'] ?? '';
//                break;
//        }

//        /**/return $this->core_pay_service->pay($this->site_id, $trade_type, $trade_id, $type, $this->channel, $openid, $return_url, $quit_url, $buyer_id, $voucher, $this->member_id);
    }


}
