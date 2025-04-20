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

namespace addon\qiankun_cashier\app\adminapi\controller\cashier;

use addon\shop\app\service\admin\order\OrderCloseService;
use addon\shop\app\service\admin\order\OrderService;
use addon\shop\app\service\core\order\CoreOrderEventService;
use addon\shop\app\service\core\order\CoreOrderPayService;
use app\dict\pay\OnlinePayDict;
use app\service\core\pay\CorePayChannelService;
use app\service\core\wechat\CoreWechatConfigService;
use core\base\BaseAdminController;
use addon\qiankun_cashier\app\service\admin\cashier\CashierService;
use core\pay\PayLoader;
use core\pay\Wechatpay;
use think\facade\Log;
use think\Response;
use Yansongda\Pay\Pay;


/**
 * 收银员控制器
 * Class Cashier
 * @package addon\qiankun_cashier\app\adminapi\controller\cashier
 */
class Cashier extends BaseAdminController
{

    /**
     * 获取收银员列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["user_id", ""],
            ["username", ""],
            ["nickname", ""],
            ["mobile", ""],
            ["status", ""],
            ["create_time", ""],
            ["update_time", ""],
        ]);
        return success((new CashierService())->getPage($data));
    }

    /**
     * 收银员详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new CashierService())->getInfo($id));
    }

    /**
     * 添加收银员
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["user_id", 0],
            ["username", ""],
            ["password", ""],
            ["nickname", ""],
            ["avatar", ""],
            ["mobile", ""],
            ["status", 0],
        ]);
        if (!$data['password']) return fail('请输入密码');
        $this->validate($data, 'addon\qiankun_cashier\app\validate\cashier\Cashier.add');
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $id = (new CashierService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 收银员编辑
     * @param $id int 收银员id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["user_id", 0],
            ["username", ""],
            ["password", ""],
            ["nickname", ""],
            ["avatar", ""],
            ["mobile", ""],
            ["status", 0],
        ]);
        if ($data['password']) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        } else {
            unset($data['password']);
        }
        $this->validate($data, 'addon\qiankun_cashier\app\validate\cashier\Cashier.edit');
        (new CashierService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 收银员删除
     * @param $id int 收银员id
     * @return Response
     */
    public function del(int $id)
    {
        (new CashierService())->del($id);
        return success('DELETE_SUCCESS');
    }


    public function getMemberAll()
    {
        return success((new CashierService())->getMemberAll());
    }

    public function getConfig($siteId = 0)
    {
        if ($siteId == 0) {
            $siteId = $this->request->siteId();
        }
        $config = (new CorePayChannelService())->getConfigByChannelAndType($siteId, "wechat", "wechatpay");
        $config_info = (new CoreWechatConfigService())->getWechatConfig($siteId);
        $config['mch_secret_key_v2'] = $config['mch_secret_key'];
        $config['mp_app_id'] = $config_info['app_id'];
        $config['notify_url'] = (string)url("/api/qiankun_cashier/pay_notify/{$siteId}", [], '', true);//异步回调通知地址

        return $config;
    }

    /**
     * 计算
     * @return Response
     */
    public function calculate()
    {
        $data = $this->request->params([
            ['order_key', []],
            ['cart_ids', []],
            ['sku_data', []],
            ['delivery', []],
            ['member_remark', ''],//买家留言
            ['shop_remark', ''],//买家留言
            ['discount', []],//优惠
            // ['invoice', []],//发票
            ['extend_data', []], // 扩展数据
            ['member_id', 0], // 扩展数据
            ['create', 0], // 扩展数据
            ['changed_price', 0], // 扩展数据
        ]);
        $data['site_id'] = $this->request->siteId();
        $res = (new CashierService())->calculate($data);
        if ($res['error']) {
            return fail(is_array($res['error']) ? implode(',', $res['error']) : $res['error']);
        }
        if ($data['create']) {
            $res = (new CashierService())->create([
                'order_key'     => $res['order_key'],
                'site_id'       => $data['site_id'],
                'member_id'     => $data['member_id'],
                'member_remark' => $data['member_remark'],
                'shop_remark'   => $data['shop_remark'],
                'order_from'    => 'cashier',
            ]);
        }
        return success('SUCCESS', $res);
    }

    /**
     *  流程详细说明：
     * （1）收银员在商户收银台生成支付订单，向用户展示支付金额；
     * （2）用户打开微信客户端，点击“我的钱包”，选择“付款码”，进入条码界面；
     * （3）使用扫码设备读取用户手机屏幕上的条码；
     * （4）扫码设备将读取的信息上传给门店收银台；
     * （5）商户门店生成订单后，收银台向后台系统发起支付请求。
     * （6）商户后台对门店收银台的支付请求进行处理，生成签名后调用【付款码支付API】向微信支付系统发起支付请求。
     * （7）微信支付系统得到商户侧的支付请求之后会对请求进行验证，验证通过后判断当前用户需要输入密码。
     * （8）微信支付系统返回USERPAYING状态，商户后台系统将应答结果返回给商户门店收银台。
     * （9）微信支付系统通知用户微信客户端输入密码。
     * （10）用户得到输入密码提示后，确认支付并输入密码。
     * （11）完成密码输入，提交微信支付。
     * （12）微信客户端在用户完成支付后提示微信支付后台系统返回的支付结果，而且微信支付系统会通过短信、微信消息给用户发送支付结果提醒。
     * （13）商户收银台得到USERPAYING状态后，经过商户后台系统调用【查询订单API】查询实际支付结果。
     * （14）如果支付结果仍为USERPAYING，则每隔5秒循环调用【查询订单API】判断实际支付结果，如果用户取消支付或累计30秒用户都未支付，商户收银台退出查询流程后继续调用【撤销订单API】撤销支付交易。
     * @return Response
     */
    public function scan_pay()
    {
        $authCode = $this->request->post('auth_code');
        if (!$authCode) return fail('请扫描付款码');

        $order = (new CashierService())->getOrder($this->request->post('order_id'));
        if ($order->isEmpty()) {
            return fail('订单不存在');
        }

        $order['order_money'] = 0.01;
        $payParam = [
            'out_trade_no' => $order['order_no'],
            'body'         => mb_substr($order['body'], 0, 32),
            'money'        => bcmul($order['order_money'], 100),
            'auth_code'    => $authCode,
            'notify_url'   => (string)url("/api/qiankun_cashier/pay_notify/{$order['site_id']}", [], '', true),
        ];
        $res = (new PayLoader("wechatpay", $this->getConfig()))->pos($payParam);

        if (isset($res['err_code'])) {
            if ($res['err_code'] == 'USERPAYING') {
                return success('等待支付', $res);
            }
        }

        if ($res['result_code'] == 'FAIL') {
            return fail($res['err_code_des'], $res);
        }

        return success('支付成功', $res);
    }

    public function refund()
    {
        $orderNo = $this->request->post('order_no');
        $refundMoney = $this->request->post('order_no');
        $orderNo = '1741169962';
        $refundMoney = 1;
        $orderMoney = 1;
        $refundNo = time() . '';
        $res = (new PayLoader("wechatpay", $this->getConfig()))->refund([
            'out_trade_no' => $orderNo,
            'money'        => bcmul($refundMoney, 100),
            'total'        => $orderMoney,
            'refund_no'    => $refundNo,
        ]);

        return success('退款成功', $res);
    }

    public function get_order_status($id): Response
    {
        $order = (new CashierService())->getOrder($id);
        if ($order->isEmpty()) {
            return fail('订单不存在');
        }

        /**
         * SUCCESS 支付成功
         * USERPAYING 支付中
         * PAYERROR 支付失败
         */
        $msg = '';
        $res = (new PayLoader("wechatpay", $this->getConfig()))->getOrder([
            'out_trade_no' => $order['order_no'],
        ]);
        if ($res['status'] == 'SUCCESS') {
            (new CoreOrderPayService)->pay([
                'trade_id' => $order['order_id'],
            ]);
            $msg = '支付成功';
        } else if ($res['status'] == 'PAYERROR') {
            (new OrderCloseService())->close($id);
            $order['status'] = -1;
            return success('用户取消支付', ['order' => $order]);
        }

        $order = (new CashierService())->getOrder($id);
        return success($msg, [
            'status' => $order['status'],
            'res'    => $res,
            'order'  => $order,
        ]);
    }

    public function timeout($id)
    {
        $order = (new CashierService())->getOrder($id);
        if ($order->isEmpty()) {
            return fail('订单不存在');
        }

        $res = (new PayLoader("wechatpay", $this->getConfig()))->close($order['order_no']);
        return success('关闭成功', $res);
    }

    public function pay()
    {
        $order = (new CashierService())->getOrder(65);

        $res = (new PayLoader("wechatpay", $this->getConfig()))->getOrder([
            'out_trade_no' => $order['order_no'],
        ]);

        if ($res['status'] == 'SUCCESS') {
            (new CoreOrderPayService)->pay([
                'trade_id' => $order['order_id'],
            ]);
            $order = (new CashierService())->getOrder(65);
            return success('支付成功', ['order' => $order]);
        } else {
            return success('支付中', ['order' => $order]);
        }
    }

    /**
     * 订单关闭
     * @param $id
     * @return Response
     */
    public function close_order($id)
    {
        return success((new OrderCloseService())->close($id));
    }

    public function get_order_list()
    {
        $where = $this->request->params([
            ['keyword', ''],
            ['pay_type', ''],
            ['status', ''],
            ['create_time', []],
        ]);
        $orderList = (new OrderService())->getPage($where);
        return success('', $orderList);
    }
}
