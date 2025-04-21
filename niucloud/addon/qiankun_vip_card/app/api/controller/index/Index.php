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

namespace addon\qiankun_vip_card\app\api\controller\index;

use addon\qiankun_vip_card\app\service\admin\card\CardService;
use core\base\BaseApiController;
use think\Response;

class Index extends BaseApiController
{
    /**
     * Hello World
     * @return Response
     */
    public function index()
    {
        $service = app()->make(CardService::class);
        $where = [
            'member_id' => $this->request->memberId(),
        ];
        $data = $service->getPage($where);
        return success('SUCCESS', $data);
    }

    public function exchange()
    {
        $cardNo = $this->request->post('card_no', '', 'trim');
        $cardPwd = $this->request->post('card_pwd', '', 'trim');

        $service = app()->make(CardService::class);
        $service->exchange($cardNo, $cardPwd, $this->request->memberId());
        return success('兑换成功');
    }
}
