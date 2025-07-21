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

namespace app\service\admin\pay;

use app\dict\common\ChannelDict;
use app\dict\pay\PayDict;
use app\dict\pay\PaySceneDict;
use app\model\member\Member;
use app\model\pay\Pay;
use app\model\sys\Poster;
use app\service\core\pay\CorePayService;
use app\service\core\paytype\CoreOfflineService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Log;

/**
 * 支付服务层
 */
class PayService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Pay();
    }

    /**
     * 待审核支付记录
     * @param array $where
     * @return array
     */
    public function getAuditPage(array $where)
    {
        $field = 'id, out_trade_no, type, money, body, voucher, create_time, trade_id, trade_type, status';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'type', '=', PayDict::OFFLINEPAY ] ])->withSearch([ 'create_time', 'out_trade_no', 'status' ], $where)->field($field)->append([ 'type_name' ])->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取交易详情
     * @param int $id
     * @return array
     */
    public function getDetail(int $id)
    {
        $field = 'id,out_trade_no,trade_type,trade_id,trade_no,body,money,voucher,status,create_time,pay_time,cancel_time,type,channel,fail_reason';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'id', '=', $id ] ])
            ->field($field)
            ->append([ 'type_name', 'channel_name', 'status_name' ])
            ->findOrEmpty()
            ->toArray();
    }

    /**
     * 支付审核通过
     * @param string $out_trade_no
     * @return null
     */
    public function pass(string $out_trade_no)
    {
        return ( new CoreOfflineService() )->pass($this->site_id, $out_trade_no);
    }

    /**
     * 支付审核未通过
     * @param string $out_trade_no
     * @param string $reason
     * @return bool
     */
    public function refuse(string $out_trade_no, string $reason)
    {
        return ( new CoreOfflineService() )->refuse($this->site_id, $out_trade_no, $reason);
    }

    /**
     * 统计支付数据
     * @param $where
     * @return int
     * @throws \think\db\exception\DbException
     */
    public function payCount($where)
    {
        return $this->model->where($where)->count();
    }

    /**
     * 去支付
     * @param string $type
     * @param string $trade_type
     * @param int $trade_id
     * @param string $return_url
     * @param string $quit_url
     * @param string $buyer_id
     * @param string $voucher
     * @param string $openid
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function pay(string $type, string $trade_type, int $trade_id, string $return_url = '', string $quit_url = '', string $buyer_id = '', string $voucher = '', string $openid = '')
    {
        return ( new CorePayService() )->pay($this->site_id, $trade_type, $trade_id, $type, ChannelDict::PC, $openid, $return_url, $quit_url, $buyer_id, $voucher);
    }

    /**
     * 获取支付信息
     * @param string $trade_type
     * @param int $trade_id
     * @return array
     */
    public function getInfoByTrade(string $trade_type, int $trade_id)
    {
        return ( new CorePayService() )->getInfoByTrade($this->site_id, $trade_type, $trade_id, ChannelDict::H5);
    }

    /**
     * 获取找朋友帮忙付支付信息
     * @param string $trade_type
     * @param int $trade_id
     * @param string $channel
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getFriendspayInfoByTrade(string $trade_type, int $trade_id, string $channel)
    {
        $pay_info = ( new CorePayService() )->getInfoByTrade($this->site_id, $trade_type, $trade_id, ChannelDict::H5, PaySceneDict::FRIENDSPAY);
        if (!empty($pay_info)) {
            //海报
            $poster = ( new Poster() )->field('id')->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'type', '=', 'friendspay' ],
                [ 'status', '=', 1 ],
                [ 'is_default', '=', 1 ]
            ])->findOrEmpty()->toArray();
            if (!empty($poster)) {
                $pay_info[ 'poster_id' ] = $poster[ 'id' ];
            }
            //发起帮付会员信息
            $member = ( new Member() )->field('member_id,nickname,headimg')->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'member_id', '=', $pay_info[ 'from_main_id' ] ]
            ])->findOrEmpty()->toArray();
            $pay_info[ 'member' ] = $member;
            //二维码
            $qrcode = $this->getQrcode($trade_type, $trade_id, $channel);
            $pay_info[ 'link' ] = $qrcode[ 'url' ];
            $pay_info[ 'qrcode' ] = $qrcode[ 'path' ];
        }
        return $pay_info;
    }

    /**
     * 获取找朋友帮忙付二维码
     * @param string $trade_type
     * @param int $trade_id
     * @param string $channel
     * @return array
     */
    public function getQrcode(string $trade_type, int $trade_id, string $channel)
    {
        $url = ( new CoreSysConfigService() )->getSceneDomain($this->site_id)[ 'wap_url' ];
        $page = 'app/pages/friendspay/money';

        $data = [
            [
                'key' => 'id',
                'value' => $trade_id
            ],
            [
                'key' => 'type',
                'value' => $trade_type
            ]
        ];
        $dir = 'upload/' . $this->site_id . '/friendspay_qrcode';

        $path = '';
        try {
            $path = qrcode($url, $page, $data, $this->site_id, $dir, $channel);
        } catch (\Exception $e) {
            Log::write('找朋友帮忙付二维码生成error' . $e->getMessage() . $e->getFile() . $e->getLine());
        }

        $url = $url . '/' . $page;
        $scene = [];
        foreach ($data as $v) {
            $scene[] = $v[ 'key' ] . '=' . $v[ 'value' ];
        }
        $url .= '?' . implode('&', $scene);

        return [
            'url' => $url,
            'path' => $path
        ];
    }

    /**
     * 获取支付方式列表
     * @return array|array[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getPayTypeList()
    {
        $pay_type_list = ( new CorePayService() )->getPayTypeByTrade($this->site_id, '', ChannelDict::H5);
        if (!empty($pay_type_list)) {
            foreach ($pay_type_list as $k => $v) {
                if (!in_array($v['key'], [ PayDict::BALANCEPAY, PayDict::FRIENDSPAY ])) {
                    unset($pay_type_list[ $k ]);
                }
            }
            $pay_type_list = array_values($pay_type_list);
        }
        return $pay_type_list;
    }
}
