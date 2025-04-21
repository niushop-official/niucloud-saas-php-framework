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

namespace addon\vipcard\app\api\controller;

use addon\vipcard\app\service\api\MemberCollectService;
use core\base\BaseApiController;
use think\Response;

class Collect extends BaseApiController
{
    /**
     * 添加收藏
     * @return Response
     */
    public function setMemberCollect()
    {
        $data = $this->request->params([
            ['goods_id', 0],
            ['type', ''],
        ]);
        (new MemberCollectService())->setMemberCollect($data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取收藏信息（单条）
     * @return Response
     */
    public function getCollect()
    {
        $data = $this->request->params([
            ['goods_id', 0],
            ['type', ''],
        ]);
        return success((new MemberCollectService())->getCollectOne($data));
    }

    /**
     * 获取提现设置
     * @return Response
     */
    public function getList()
    {
        $data = $this->request->params([
            ['type', ''],
        ]);
        return success((new MemberCollectService())->getCollectList($data));
    }

    /**
     * 取消收藏
     */
    public function del($id)
    {
        return success((new MemberCollectService())->del($id));
    }
}
