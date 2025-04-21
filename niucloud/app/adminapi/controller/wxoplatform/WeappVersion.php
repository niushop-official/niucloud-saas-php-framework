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

namespace app\adminapi\controller\wxoplatform;

use app\service\admin\wxoplatform\WeappVersionService;
use core\base\BaseAdminController;
use think\Response;

class WeappVersion extends BaseAdminController
{
    /**
     * 平台提交小程序版本
     * @return Response
     */
    public function weappCommit() {
        $data = $this->request->params([
            ['site_group_id', ""]
        ]);
        $data['is_all'] = empty($data['site_group_id']) ? 1 : 0;
        (new WeappVersionService())->add($data);
        return success();
    }

    /**
     * 平台撤销审核
     * @param $id
     * @return Response
     */
    public function weappCommitUndocodeaudit($id){
        $res = (new WeappVersionService())->undocodeaudit($id);
        return success($res);
    }

    public function getSiteGroupCommitRecord() {
        return success(data:(new WeappVersionService())->getSiteGroupCommitRecord());
    }

    /**
     * 获取最后一次提交记录
     * @return Response
     */
    public function lastCommitRecord() {
        return success(data:(new WeappVersionService())->getLastCommitRecord());
    }

    public function commitRecord() {
        $data = $this->request->params([
            ['site_group_id', ""]
        ]);
        return success(data:(new WeappVersionService())->getPage($data));
    }

    /**
     * 站点小程序提交
     * @return Response
     */
    public function siteWeappCommit() {
        (new WeappVersionService())->siteWeappCommit();
        return success();
    }
}
