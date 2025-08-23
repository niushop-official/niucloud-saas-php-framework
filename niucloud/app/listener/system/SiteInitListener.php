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
namespace app\listener\system;

use app\service\admin\diy\DiyService;
use app\service\core\site\CoreSiteService;

/**
 * 站点初始化
 */
class SiteInitListener
{
    protected $tables = [
        'applet_site_version', //站点小程序版本表
        'applet_version', //小程序版本表
        'diy_form', //万能表单表
        'diy_form_fields', //万能表单字段表
        'diy_form_records', //万能表单填写记录表
        'diy_form_records_fields', //万能表单填写字段表
        'diy_form_submit_config', //万能表单提交页配置表
        'diy_form_write_config', //万能表单填写配置表
//        'diy_page', //自定义页面   todo有点问题先注释 事件顺序问题
        'diy_route', //自定义路由
        'diy_theme', //自定义主题配色表
        'member', //会员表
        'member_account_log', //会员账单表
        'member_address', //会员收货地址
        'member_cash_out', //会员提现表
        'member_cash_out_account', //会员提现账户
        'member_label', //会员标签
        'member_level', //会员等级
        'member_sign', //会员签到表
        'niu_sms_template', //牛云短信模板表
        'pay', //支付记录表
        'pay_channel', //支付渠道配置表
        'pay_refund', //支付退款记录表
        'pay_transfer', //转账表
        'pay_transfer_scene', //支付转账场景表
        'site_account_log', //站点账单记录
        'stat_hour', //小时统计表
        'sys_attachment', //附件管理表
        'sys_attachment_category', //附件分类表
        'sys_config', //系统配置表
        'sys_cron_task', //系统任务
        'sys_export', //导出报表
        'verifier', //核销员表
        'verify', //核销记录
        'sys_notice', //通知模型
        'sys_notice_log', //通知记录表
        'sys_notice_sms_log', //短信发送表
        'sys_notice_sms_log', //短信发送表
        'sys_role', //角色表
//        'sys_poster', //海报表  todo有点问题先注释 事件顺序问题
        'sys_printer', //小票打印机
        'sys_printer_template', //小票打印模板
        'sys_schedule', //系统任务
        'sys_user_log', //管理员操作记录表
        'sys_user_role', //用户权限表
        'sys_user', //后台管理员表
        'weapp_version', //小程序版本
        'wechat_fans', //微信粉丝列表
        'wechat_media', //微信素材表
        'wechat_reply', //公众号消息回调表
        'sys_agreement', //协议表
    ];

    public function handle($params = [])
    {
        $site_id = $params[ 'site_id' ];

        (new CoreSiteService())->siteInitBySiteId($site_id, $this->tables);

        event("AddSiteAfter", [ 'site_id' => $site_id, 'main_app' => [], 'site_addons' => [] ]);

        // 更新微页面数据
        $diy_service = new DiyService();
        $diy_service->loadDiyData([ 'site_id' => $site_id, 'main_app' => $params[ 'main_app' ], 'tag' => 'add' ]);

        return true;
    }
}
