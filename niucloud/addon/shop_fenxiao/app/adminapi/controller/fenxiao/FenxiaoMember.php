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


use addon\shop_fenxiao\app\service\admin\fenxiao\FenxiaoMemberService;
use core\base\BaseAdminController;
use think\db\exception\DbException;
use think\Response;


/**
 * 分销关系控制器
 */
class FenxiaoMember extends BaseAdminController
{
    /**
     * 获取分销商列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['is_fenxiao', 'all'],
        ]);
        return success((new FenxiaoMemberService())->getPage($data));
    }

    /**
     * 修改会员绑定的分销商
     * @return Response
     */
    public function modifyBindFenxiao()
    {
        $data = $this->request->params([
            ['fenxiao_member_id', 0],
            ['member_id', 0]
        ]);
        return success('EDIT_SUCCESS', (new FenxiaoMemberService())->modifyBindFenxiao($data));
    }

    /**
     * 查询会员列表
     * @return Response
     * @throws DbException
     */
    public function getMemberListOfSelect()
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['not_in', []]
        ]);
        return success((new FenxiaoMemberService())->getMemberListOfSelect($data));
    }
}
