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

namespace addon\shop_giftcard\app\api\controller\records;

use addon\shop_giftcard\app\service\api\records\MemberRecordsService;
use core\base\BaseApiController;


/**
 * 礼品卡会员领取记录控制器
 * Class MemberRecords
 * @package addon\shop_giftcard\app\adminapi\controller\records
 */
class MemberRecords extends BaseApiController
{

    /**
     * 送出的礼品卡分页列表
     * @return \think\Response
     * @throws \think\db\exception\DbException
     */
    public function givePages()
    {
        $data = $this->request->params([]);
        return success(( new MemberRecordsService() )->getGivePage($data));
    }

    /**
     * 送出的礼品卡详情
     * @param $id
     * @return \think\Response
     * @throws \think\db\exception\DbException
     */
    public function giveDetail($id)
    {
        return success(( new MemberRecordsService() )->getGiveDetail($id));
    }

    /**
     * 收到的礼品卡分页列表
     * @return \think\Response
     * @throws \think\db\exception\DbException
     */
    public function receivePages()
    {
        $data = $this->request->params([
            [ 'status', '' ]
        ]);
        return success(( new MemberRecordsService() )->getReceivePages($data));
    }

}
