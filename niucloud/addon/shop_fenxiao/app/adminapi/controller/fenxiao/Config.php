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

namespace addon\shop_fenxiao\app\adminapi\controller\fenxiao;

use addon\shop_fenxiao\app\service\admin\fenxiao\ConfigService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 分销相关设置
 * Class Config
 * @package addon\shop_fenxiao\app\adminapi\controller
 */
class Config extends BaseAdminController
{
    /**
     * 分销设置
     * @return Response
     */
    public function setFenxiaoConfig()
    {
        $data = $this->request->params([
            ['is_fenxiao', '0'], //是否分销
            ['level', '1'], //分销层级
            ['is_examine', '1'], //是否需要审核
            ['self_purchase_rebate', '1'], //是否开启分销商自购返佣
            ['apply_type', '2'], //申请方式1 无需申请2申请3.手动设置
            ['fenxiao_condition', '1'], //0无条件 1消费次数 2消费金额 3购买商品
            ['consume_count', '1'], //消费次数
            ['consume_money', '0'], //消费金额
            ['goods_ids', '0'], //指定商品id
            ['consume_condition', '2'], //消费条件(1付款后 2订单完成)
            ['child_condition', '1'],//成为下线条件 1:首次点击分享链接 2：首次下单 3：首次付款
            ['is_show_apply', '0'], //是否显示申请协议
            ['apply_head', ''], //申请协议顶部图片
            ['poster_bg', ''],//海报背景
        ]);

        (new ConfigService())->setFenxiaoConfig($data);
        return success('SUCCESS');
    }

    /**
     * 获取分销配置
     * @return Response
     */
    public function getFenxiaoConfig()
    {
        return success((new ConfigService())->getFenxiaoConfig());
    }

    /**
     * 设置分销海报
     * @return Response
     */
    public function setFenxiaoPosterConfig()
    {
        $data = $this->request->params([
            ['share_content', ''], //推广语
            ['poster_bg', ''], //海报背景
        ]);

        (new ConfigService())->setFenxiaoPosterConfig($data);
        return success('SET_SUCCESS');
    }

    /**
     * 获取分销海报
     * @return Response
     */
    public function getFenxiaoPosterConfig()
    {
        return success((new ConfigService())->getFenxiaoPosterConfig());
    }

}
