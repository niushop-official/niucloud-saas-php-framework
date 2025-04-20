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

namespace app\adminapi\controller\user;

use app\dict\sys\UserDict;
use app\service\admin\user\UserService;
use core\base\BaseAdminController;
use think\Response;

class User extends BaseAdminController
{
    public function lists()
    {
        $data = $this->request->params([
            ['username', ''],
            ['real_name', ''],
            ['last_time', []]
        ]);

        $list = (new UserService())->getPage($data);
        return success($list);
    }

    /**
     * 用户详情
     * @param $uid
     * @return Response
     */
    public function info($uid)
    {
        return success((new UserService())->getInfo($uid));
    }

    public function getUserAll()
    {
        $data = $this->request->params([
            ['username', ''],
            ['realname', ''],
            ['create_time', []],
        ]);
        $list = (new UserService())->getUserAll($data);
        return success($list);
    }

    public function getUserSelect()
    {
        $data = $this->request->params([
            ['username', '']
        ]);
        $list = (new UserService())->getUserSelect($data);
        return success($list);
    }

    public function checkUserIsExist() {
        $data = $this->request->params([
            ['username', ''],
        ]);
        $is_exist = (new UserService())->checkUsername($data['username']);
        return success(data:$is_exist);
    }

    /**
     * 添加用户
     * @return Response
     * @throws \Exception
     */
    public function add() {
        $data = $this->request->params([
            ['username', ''],
            ['password', ''],
            ['real_name', ''],
            ['status', UserDict::ON],
            ['head_img', ''],
            ['create_site_limit', []]
        ]);
        (new UserService())->add($data);
        return success();
    }

    /**
     * 编辑用户
     * @return Response
     * @throws \Exception
     */
    public function edit($uid) {
        $data = $this->request->params([
            ['password', ''],
            ['real_name', ''],
            ['head_img', ''],
        ]);
        (new UserService())->edit($uid, $data);
        return success();
    }

    /**
     * 删除用户
     * @param $uid
     * @return Response
     */
    public function del($uid) {
        (new UserService())->del($uid);
        return success("DELETE_SUCCESS");
    }

    /**
     * 获取用户站点创建限制
     * @param $uid
     * @return Response
     */
    public function getUserCreateSiteLimit($uid){
        return success(data:(new UserService())->getUserCreateSiteLimit($uid));
    }

    /**
     * 获取用户站点创建限制
     * @param $uid
     * @return Response
     */
    public function getUserCreateSiteLimitInfo($id){
        return success(data:(new UserService())->getUserCreateSiteLimitInfo($id));
    }

    /**
     * 添加用户站点创建限制
     * @param $uid
     * @return Response
     */
    public function addUserCreateSiteLimit($uid){
        $data = $this->request->params([
            ['uid', 0],
            ['group_id', 0],
            ['num', 1],
            ['month', 1],
        ]);
        (new UserService())->addUserCreateSiteLimit($data);
        return success('SUCCESS');
    }

    /**
     * 编辑用户站点创建限制
     * @param $uid
     * @return Response
     */
    public function editUserCreateSiteLimit($id){
        $data = $this->request->params([
            ['num', 1],
            ['month', 1],
        ]);
        (new UserService())->editUserCreateSiteLimit($id, $data);
        return success('SUCCESS');
    }

    /**
     * 删除用户站点创建限制
     * @param $uid
     * @return Response
     */
    public function delUserCreateSiteLimit($id){
        (new UserService())->delUserCreateSiteLimit($id);
        return success('SUCCESS');
    }
}
