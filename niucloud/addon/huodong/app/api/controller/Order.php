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

namespace addon\huodong\app\api\controller;

use addon\huodong\app\service\api\OrderService;
use core\base\BaseApiController;
use think\Response;

class Order extends BaseApiController
{


    /**
     * 订单创建
     * @return Response
     */
    public function create()
    {
        $data = $this->request->params([
            [ 'act_id', '' ],
            [ 'realname', '' ],
            [ 'mobile', '' ],
            ['pid',0],
            ['douyin_url',''],
            ['kuaishou_url',''],
            ['xiaohongshu_url',''],
            ['shipinhao_url',''],
            ['jietu_image',''],
            ['form_data',''],
        ]);

        $res = ( new OrderService() )->create($data);
        return success($res);
    }

    public function lists()
    {
        $data = $this->request->params([
            [ 'order_status', '' ]
        ]);
        $res = ( new OrderService() )->getPage($data);
        return success($res);
    }

    /**
     * 查询订单详情
     * @param int $id
     * @return Response
     */
    public function detail(int $order_id)
    {
        $res = ( new OrderService() )->getDetail($order_id);
        return success($res);
    }
    public function close(int $order_id)
    {
        $res = ( new OrderService() )->close($order_id);
        return success($res);
    }
    public function status()
    {
        $res = ( new OrderService() )->getStatus();
        return success($res);
    }
    public function hexiao( $order_no)
    {
        $res = ( new OrderService() )->hexiao($order_no);
        return success($res);
    }

    public function urlhexiao($site_id)
    {
        $res = ( new OrderService() )->urlhexiao($site_id);
        return success($res);
    }
}
