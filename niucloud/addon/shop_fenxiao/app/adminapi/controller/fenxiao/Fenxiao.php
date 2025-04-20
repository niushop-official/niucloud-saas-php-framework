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


use addon\shop_fenxiao\app\service\admin\fenxiao\FenxiaoService;
use addon\shop_fenxiao\app\service\admin\team\TeamService;
use core\base\BaseAdminController;
use think\db\exception\DbException;
use think\Response;


/**
 * 分销商控制器
 * Class Fenxiao
 * @package addon\shop_fenxiao\app\adminapi\controller
 */
class Fenxiao extends BaseAdminController
{
    /**
     * 获取分销商列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['parent_user_name', ''],
            ['create_time', []],
            ['level_id', ''],
            ['status', ''],
        ]);
        return success((new FenxiaoService())->getPage($data));
    }

    /**
     * 分销商详情
     * @param int $member_id
     * @return Response
     */
    public function info(int $member_id)
    {
        return success((new FenxiaoService())->getInfo($member_id));
    }

    /**
     * 添加分销商
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['level_id', ''],
            ['member_id', 0],
            ['parent', ''],
        ]);
//        $this->validate($data, 'addon\shop_fenxiao\app\validate\fenxiao\Fenxiao.add');
        (new FenxiaoService())->add($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 编辑分销商
     * ['fenxiao_level' => '', 'parent' => '', 'member_id' => '']
     * @return Response
     */
    public function edit(int $member_id)
    {
        $data = $this->request->params([
            ['level_id', ''],
            ['parent', ''],
            ['status', ''],
        ]);
//        $this->validate($data, 'addon\shop_fenxiao\app\validate\fenxiao\Fenxiao.edit');
        (new FenxiaoService())->edit($data, $member_id);
        return success('SUCCESS');
    }

    /**
     * 冻结
     * @param int $member_id
     * @return Response
     */
    public function invalid(int $member_id)
    {
        $data = $this->request->params([
            ['fenxiao_level', ''],
            ['parent', ''],
            ['status', ''],
        ]);
//        $this->validate($data, 'addon\shop_fenxiao\app\validate\fenxiao\Fenxiao.edit');
        (new FenxiaoService())->invalid($member_id);
        return success('SUCCESS');
    }

    /**
     * 分销商订单信息
     */
    public function order(int $id)
    {
        $data = $this->request->params([]);
        return success((new FenxiaoService())->getOrderPage($id, $data));
    }

    /**
     * 分销商团队信息
     */
    public function team(int $member_id)
    {
        $data = $this->request->params([
            ['type', ''],
        ]);
        return success((new TeamService())->getTeam($member_id, $data['type']));
    }

    /**
     * 分销商账户流水记录
     */
    public function account(int $member_id)
    {
        return success((new FenxiaoService())->getAccountPage($member_id));
    }

    /**
     * 查询分销商列表
     * @return Response
     * @throws DbException
     */
    public function getListOfSelect()
    {
        $data = $this->request->params([
            ['is_agent', 'all'],
            ['keyword', ''],
            ['not_in', []]
        ]);
        return success((new FenxiaoService())->getListOfSelect($data));
    }

}
