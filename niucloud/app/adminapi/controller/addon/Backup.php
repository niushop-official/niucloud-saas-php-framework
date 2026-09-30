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

namespace app\adminapi\controller\addon;

use app\dict\sys\TaskDict;
use app\service\admin\task\TaskService;
use app\service\admin\upgrade\BackupRecordsService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 备份管理
 * Class Backup
 * @description 备份管理
 * @package app\adminapi\controller\addon
 */
class Backup extends BaseAdminController
{

    /**
     * 获取升级记录分页列表
     * @description 获取升级记录分页列表
     * @return Response
     */
    public function getRecords()
    {
        $data = $this->request->params([
            [ "content", "" ],
        ]);
        return success(( new BackupRecordsService() )->getPage($data));
    }

    /**
     * 修改备注
     * @description 修改备注
     * @return Response
     */
    public function modifyRemark()
    {
        $data = $this->request->params([
            [ "id", "" ],
            [ 'remark', '' ]
        ]);
        ( new BackupRecordsService() )->modifyRemark($data);
        return success('MODIFY_SUCCESS');
    }

    /**
     * 恢复前检测文件是否存在
     * @description 恢复前检测文件是否存在
     * @return Response
     */
    public function checkDirExist()
    {
        $data = $this->request->params([
            [ "id", 0 ],
        ]);
        return success(( new BackupRecordsService() )->checkDirExist($data[ 'id' ]));
    }

    // 目录权限检测已统一到通用校验（sys/check?scene=backup）
    // BackupRecordsService::checkPermission() 仍保留，由通用校验服务复用

    /**
     * 恢复备份
     * @description 恢复备份（创建统一任务，由任务执行器逐片驱动）
     * @return Response
     */
    public function restoreBackup()
    {
        $data = $this->request->params([
            [ 'id', 0 ],
        ]);
        $task = ( new TaskService() )->create(TaskDict::TYPE_BACKUP, [
            'mode' => BackupRecordsService::MODE_RESTORE,
            'id'   => (int) $data[ 'id' ]
        ]);
        return success(data: $task);
    }

    /**
     * 删除升级记录
     * @description 删除升级记录
     * @return Response
     */
    public function deleteRecords()
    {
        $data = $this->request->params([
            [ "ids", [] ],
        ]);
        ( new BackupRecordsService() )->del($data[ 'ids' ]);
        return success('DELETE_SUCCESS');
    }

    /**
     * 手动备份
     * @description 手动备份（创建统一任务，由任务执行器逐片驱动）
     * @return Response
     */
    public function manualBackup()
    {
        $task = ( new TaskService() )->create(TaskDict::TYPE_BACKUP, [
            'mode' => BackupRecordsService::MODE_BACKUP
        ]);
        return success(data: $task);
    }

    /**
     * 获取正在进行的恢复任务
     * @description 获取正在进行的恢复任务
     * @return Response
     */
    public function getRestoreTask()
    {
        return success(( new BackupRecordsService() )->getRestoreTask());
    }

    /**
     * 获取正在进行的备份任务
     * @description 获取正在进行的备份任务
     * @return Response
     */
    public function getBackupTask()
    {
        return success(( new BackupRecordsService() )->getBackupTask());
    }
}
