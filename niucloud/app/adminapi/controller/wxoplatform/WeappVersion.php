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
use app\service\core\task\handler\WeappCommitTaskHandler;
use core\base\BaseAdminController;
use core\task\TaskExecutor;
use think\Response;

class WeappVersion extends BaseAdminController
{
    /**
     * 平台提交小程序版本
     * @description 平台提交小程序版本
     * @return Response
     */
    /**
     * 平台提交小程序版本（同步模板库）
     *
     * 已改为创建统一任务：按套餐逐个上传，每个套餐一个步骤，
     * 执行过程与进度在任务详情查看（原队列 job 链已移除）。
     *
     * @return Response
     */
    public function weappCommit() {
        $data = $this->request->params([
            ['site_group_id', ""]
        ]);

        $task = ( new TaskExecutor(new WeappCommitTaskHandler()) )
            ->create([ 'site_group_id' => (int) ( $data[ 'site_group_id' ] ?? 0 ) ]);

        return success(data: [ 'task_key' => (string) ( $task[ 'task_key' ] ?? '' ) ]);
    }

    public function getSiteGroupCommitRecord() {
        return success(data:(new WeappVersionService())->getSiteGroupCommitRecord());
    }

    /**
     * 直接同步模板库（已上传成功、无模板ID 的记录补跑，不创建任务）
     * @description 草稿匹配 -> 添加到模板库 -> 取模板ID -> 回写
     * @return Response
     */
    public function syncTemplate() {
        $data = $this->request->params([
            ['id', 0]
        ]);
        $templateId = (new WeappVersionService())->syncTemplate((int) $data['id']);
        return success(data: [ 'template_id' => $templateId ]);
    }

    /**
     * 获取最后一次提交记录
     * @description 获取最后一次提交记录
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
     * @description 站点小程序提交
     * @return Response
     */
    public function siteWeappCommit() {
        (new WeappVersionService())->siteWeappCommit();
        return success();
    }

    /**
     * 撤销审核
     * @description 撤销审核
     * @return Response
     */
    public function undoAudit() {
        $data = $this->request->params([
            ['id', ""]
        ]);
        (new WeappVersionService())->undoAudit($data['id']);
        return success();
    }

    /**
     * 同步套餐下站点小程序
     * @description 同步套餐下站点小程序
     * @return Response
     */
    public function syncSiteWeapp() {
        $data = $this->request->params([
            ['site_group_id', 0]
        ]);
        (new WeappVersionService())->syncSiteGroupAuthWeapp($data['site_group_id']);
        return success();
    }

    /**
     * 删除版本
     * @param $id
     * @description 删除版本
     * @return Response
     */
    public function delVersion($id) {
        (new WeappVersionService())->delVersion($id);
        return success();
    }
}
