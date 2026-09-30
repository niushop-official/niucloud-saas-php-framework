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

namespace app\service\admin\upgrade;

use app\dict\sys\AppTypeDict;
use app\dict\sys\BackupDict;
use app\dict\sys\TaskDict;
use app\model\site\Site;
use app\model\sys\SysBackupRecords;
use app\service\admin\sys\SystemService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use core\util\DbBackup;
use think\facade\Cache;
use think\facade\Db;

/**
 * 备份记录表服务层
 * 说明：本服务只负责备份 / 恢复的业务动作与状态推进（一次 execute() 推进一个步骤），
 *      任务的落库、状态机、锁与幂等、事件落盘交由统一任务执行器（TaskExecutor）处理，
 *      由 BackupTaskHandler 做入参 / 出参适配。
 */
class BackupRecordsService extends BaseAdminService
{

    protected $upgrade_dir;

    protected $root_path;

    /**
     * 备份 / 恢复任务状态缓存键（全局单实例：同一时刻仅一个任务在执行）
     */
    protected $cache_key = 'backup_task';

    // ========== 任务模式 ==========
    const MODE_BACKUP  = 'backup';  // 手动备份
    const MODE_RESTORE = 'restore'; // 备份恢复

    // ========== 执行步骤 ==========
    const STEP_BACKUP_CODE      = 'backupCode';      // 备份源码
    const STEP_BACKUP_SQL       = 'backupSql';       // 备份数据库（分段）
    const STEP_BACKUP_COMPLETE  = 'backComplete';    // 备份收尾
    const STEP_RESTORE_CODE     = 'restoreCode';     // 恢复源码
    const STEP_RESTORE_SQL      = 'restoreSql';      // 恢复数据库（分段）
    const STEP_RESTORE_DATA     = 'restoreData';     // 恢复数据修正
    const STEP_RESTORE_COMPLETE = 'restoreComplete'; // 恢复收尾
    const STEP_END              = 'end';             // 已结束

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysBackupRecords();
        $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
        $this->upgrade_dir = $this->root_path . 'upgrade' . DIRECTORY_SEPARATOR;
    }

    /**
     * 添加备份记录
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'status' ] = BackupDict::STATUS_READY;
        $data[ 'create_time' ] = time();
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 编辑备份记录
     * @param array $condition
     * @param array $data
     * @return true
     */
    public function edit($condition, array $data)
    {
        $this->model->where($condition)->update($data);
        return true;
    }

    /**
     * 修改备注
     * @param $params
     * @return true
     */
    public function modifyRemark($params)
    {
        return $this->edit([
            [ 'id', '=', $params[ 'id' ] ]
        ], [ 'remark' => $params[ 'remark' ] ]);
    }

    /**
     * 执行完成，更新备份记录的状态
     * @param $backup_key
     * @return void
     */
    public function complete($backup_key)
    {
        $this->model->where([
            [ 'backup_key', '=', $backup_key ],
        ])->update([
            'status' => BackupDict::STATUS_COMPLETE,
            'complete_time' => time()
        ]);
    }

    /**
     * 执行失败，更新备份记录的状态
     * @param $backup_key
     * @return void
     */
    public function failed($backup_key)
    {
        $info = $this->getInfo([
            [ 'backup_key', '=', $backup_key ]
        ], 'id,backup_key');
        if (!empty($info)) {
            $this->del($info[ 'id' ]);
        }
    }

    /**
     * 删除备份记录
     * @param $ids
     * @return true
     */
    public function del($ids)
    {
        $list = $this->model->field('id,backup_key')->where([ [ 'id', 'in', $ids ] ])->select()->toArray();
        if (empty($list)) {
            throw new AdminException('UPGRADE_RECORD_NOT_EXIST');
        }
        try {
            Db::startTrans();

            foreach ($list as $k => $v) {
                // 删除备份文件
                $upgrade_dir = project_path() . 'upgrade' . DIRECTORY_SEPARATOR . $v[ 'backup_key' ] . DIRECTORY_SEPARATOR;
                if (is_dir($upgrade_dir)) {
                    del_target_dir($upgrade_dir, true);
                }
            }

            $this->model->where([ [ 'id', 'in', $ids ] ])->delete();
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 备份归档根目录（项目根/upgrade/）
     *
     * 统一由本服务提供，避免各处用 project_path() 自行拼接导致路径口径不一致。
     * @return string
     */
    public function archiveRoot(): string
    {
        return $this->upgrade_dir;
    }

    /**
     * 按备份归档标识删除备份（备份记录 + 归档目录）
     *
     * @param array|string $keys backup_key（支持逗号分隔字符串）
     * @return int 删除的备份记录数
     */
    public function delByKey($keys): int
    {
        $keys = is_array($keys) ? $keys : explode(',', (string) $keys);
        $keys = array_values(array_unique(array_filter(array_map(fn ($v) => trim((string) $v), $keys))));
        if (empty($keys)) return 0;

        $list = $this->model->field('id, backup_key')->where([ [ 'backup_key', 'in', $keys ] ])->select()->toArray();
        if (empty($list)) return 0;

        $this->del(array_column($list, 'id'));

        return count($list);
    }

    /**
     * 删除备份归档目录（记录已删 / 未建记录时的目录残留兜底）
     * @param string $key 备份归档标识
     * @return void
     */
    public function delArchiveDir(string $key): void
    {
        if ($key === '') return;

        $dir = project_path() . 'upgrade' . DIRECTORY_SEPARATOR . $key . DIRECTORY_SEPARATOR;
        if (is_dir($dir)) del_target_dir($dir, true);
    }

    /**
     * 恢复前检测文件是否存在
     * @param $id
     * @return void
     */
    public function checkDirExist($id)
    {
        $field = 'id, version, backup_key';
        $info = $this->model->where([
            [ 'id', '=', $id ],
            [ 'status', '=', BackupDict::STATUS_COMPLETE ]
        ])->field($field)->findOrEmpty()->toArray();

        if (empty($info)) {
            throw new AdminException('UPGRADE_RECORD_NOT_EXIST');
        }

        // 历史记录的 backup_key 可能是升级任务标识，按真实归档标识校验，
        // 否则这部分记录会被判为「文件不存在」而无法恢复
        $archiveKey = $this->archiveKeyOf((string) ( $info[ 'backup_key' ] ?? '' ));
        $backupDir  = $this->upgrade_dir . $archiveKey . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR;

        // 检测源码目录是否存在
        if (!is_dir($backupDir . 'code' . DIRECTORY_SEPARATOR)) {
            throw new AdminException('UPGRADE_BACKUP_CODE_NOT_FOUND');
        }

        // 检测数据库目录是否存在
        if (!is_dir($backupDir . 'sql' . DIRECTORY_SEPARATOR)) {
            throw new AdminException('UPGRADE_BACKUP_SQL_NOT_FOUND');
        }

        return true;
    }

    /**
     * 检测目录权限
     * @return void
     */
    public function checkPermission()
    {
        $niucloud_dir = $this->root_path . 'niucloud' . DIRECTORY_SEPARATOR;
        $upgrade_dir = $this->root_path . 'upgrade' . DIRECTORY_SEPARATOR;
        $admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR;
        $web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR;
        $wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR;

        if (!is_dir($admin_dir)) throw new CommonException('ADMIN_DIR_NOT_EXIST');
        if (!is_dir($web_dir)) throw new CommonException('WEB_DIR_NOT_EXIST');
        if (!is_dir($wap_dir)) throw new CommonException('UNIAPP_DIR_NOT_EXIST');

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $niucloud_dir), 'status' => is_readable($niucloud_dir) ];
        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $upgrade_dir), 'status' => is_readable($upgrade_dir) ];
        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $admin_dir), 'status' => is_readable($admin_dir) ];
        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $web_dir), 'status' => is_readable($web_dir) ];
        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $wap_dir), 'status' => is_readable($wap_dir) ];

        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $niucloud_dir), 'status' => is_write($niucloud_dir) ];
        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $upgrade_dir), 'status' => is_write($upgrade_dir) ];
        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $admin_dir), 'status' => is_write($admin_dir) ];
        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $web_dir), 'status' => is_write($web_dir) ];
        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $wap_dir), 'status' => is_write($wap_dir) ];

        // 检测全部目录及文件是否可读可写，忽略指定目录

        // 忽略指定目录，admin
        $exclude_admin_dir = [ 'dist', 'node_modules', '.git', '.build' ];
        $check_res = checkDirPermissions(project_path() . 'admin', [], $exclude_admin_dir);

        // 忽略指定目录，uni-app
        $exclude_uniapp_dir = [ 'dist', 'node_modules', '.git', '.build' ];
        $check_res = array_merge2($check_res, checkDirPermissions(project_path() . 'uni-app', [], $exclude_uniapp_dir));

        // 忽略指定目录，web
        $exclude_web_dir = [ '.nuxt', '.output', 'dist', 'node_modules', '.git' ];
        $check_res = array_merge2($check_res, checkDirPermissions(project_path() . 'web', [], $exclude_web_dir));

        // 忽略指定目录，niucloud
        $exclude_niucloud_dir = [
            'public' . DIRECTORY_SEPARATOR . 'admin',
            'public' . DIRECTORY_SEPARATOR . 'wap',
            'public' . DIRECTORY_SEPARATOR . 'web',
            'public' . DIRECTORY_SEPARATOR . 'upload',
            'public' . DIRECTORY_SEPARATOR . 'file',
            'runtime',
            'vendor',
            '.git'
        ];
        $check_res = array_merge2($check_res, checkDirPermissions(project_path() . 'niucloud', [], $exclude_niucloud_dir));

        if (!empty($check_res[ 'unreadable' ])) {
            foreach ($check_res[ 'unreadable' ] as $item) {
                $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $item), 'status' => false ];
            }
        }
        if (!empty($check_res[ 'not_writable' ])) {
            foreach ($check_res[ 'not_writable' ] as $item) {
                $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $item), 'status' => false ];
            }
        }

        $check_res = array_merge(
            array_column($data[ 'dir' ][ 'is_readable' ], 'status'),
            array_column($data[ 'dir' ][ 'is_write' ], 'status')
        );

        // 是否通过校验
        $data[ 'is_pass' ] = !in_array(false, $check_res);

        return $data;
    }

    // ==================== 任务状态（供统一任务执行器驱动） ====================

    /**
     * 按备份标识获取备份记录 id
     * 说明：备份任务的 task_key 即为备份记录的 backup_key，可据此反查记录用于恢复
     * @param string $backup_key
     * @return int
     */
    public function getIdByBackupKey(string $backup_key): int
    {
        if ($backup_key === '') return 0;
        $info = $this->model->where([ [ 'backup_key', '=', $backup_key ] ])->field('id')->findOrEmpty()->toArray();
        return (int) ( $info[ 'id' ] ?? 0 );
    }

    /**
     * 获取当前任务状态
     * @return array
     */
    public function getTaskState(): array
    {
        $state = Cache::get($this->cache_key);
        return is_array($state) ? $state : [];
    }

    /**
     * 从快照恢复任务状态（Cache 失效后续跑）
     * @param array $state
     * @return void
     */
    public function restoreTaskState(array $state): void
    {
        if (empty($state)) return;
        Cache::set($this->cache_key, $state);
    }

    /**
     * 清除任务状态
     * @return void
     */
    public function clearTaskState(): void
    {
        Cache::set($this->cache_key, null);
    }

    /**
     * 发起手动备份（仅初始化任务，不执行具体步骤）
     * @param array $params
     * @return array 任务状态
     */
    public function startBackup(array $params = []): array
    {
        $key = uniqid();

        // 备份记录改为「任务成功完成后」才写入（见 finishBackup）：
        // 任务刚发起就落库的话，中途失败 / 取消会留下一条指向空目录的无效记录。

        $state = [
            'key'      => $key,
            'mode'     => self::MODE_BACKUP,
            'id'       => 0,
            'version'  => "v" . config('version.version'),
            'step'     => self::STEP_BACKUP_CODE,
            'progress' => null,
            'data'     => [ [ 'content' => '开始备份', 'step' => self::STEP_BACKUP_CODE ] ],
            'done'     => false
        ];
        Cache::set($this->cache_key, $state);

        return $state;
    }

    /**
     * 备份任务成功完成后写入备份记录
     *
     * 记录的 backup_key 直接取任务标识（state.key = sys_task.task_key），
     * 与归档目录 upgrade/{backup_key}/backup 完全对齐 —— 恢复、产物查看、
     * 目录存在性校验都基于这个 key 推导，不再有第二套标识。
     *
     * 幂等：同一 task_key 只写一条，重复调用（收敛再次触发）不会重复落库。
     *
     * @param array $state 备份任务状态
     * @return void
     */
    public function finishBackup(array $state): void
    {
        $backupKey = (string) ( $state[ 'key' ] ?? '' );
        if ($backupKey === '') return;

        try {
            $exists = $this->model->where([ [ 'backup_key', '=', $backupKey ] ])->count();
            if ($exists > 0) return;

            $mode    = (string) ( $state[ 'mode' ] ?? self::MODE_BACKUP );
            $version = (string) ( $state[ 'version' ] ?? '' );
            if ($version === '') $version = 'v' . config('version.version');

            // 调用方可显式指定来源（升级产生的备份是「自动备份」，不是手动备份）
            $content = (string) ( $state[ 'content' ] ?? '' );
            if ($content === '') $content = $mode === self::MODE_BACKUP ? '手动备份' : '自动备份';

            // 不走 add()：它固定写入 status=ready，而本记录是「已完成」才落的库，
            // 列表与恢复都只认 complete
            $now = time();
            $this->model->create([
                'backup_key'    => $backupKey,
                'content'       => $content,
                'version'       => $version,
                'status'        => BackupDict::STATUS_COMPLETE,
                'create_time'   => $now,
                'complete_time' => $now
            ]);
        } catch (\Throwable $e) {
            // 记录写入失败不影响任务本身的完成流程
        }
    }

    /**
     * 发起备份恢复（仅初始化任务，不执行具体步骤）
     * 恢复前会先对当前环境做一次自动备份，再执行恢复
     * @param int $id 备份记录 id
     * @return array 任务状态
     */
    public function startRestore(int $id): array
    {
        $field = 'id, version, backup_key';
        $info = $this->model->where([
            [ 'id', '=', $id ],
            [ 'status', '=', BackupDict::STATUS_COMPLETE ]
        ])->field($field)->append([ 'backup_dir', 'backup_code_dir', 'backup_sql_dir' ])->findOrEmpty()->toArray();

        if (empty($info)) {
            throw new AdminException('UPGRADE_RECORD_NOT_EXIST');
        }

        // 恢复源码备份
        if (!is_dir($info[ 'backup_code_dir' ])) {
            throw new AdminException('UPGRADE_BACKUP_CODE_NOT_FOUND');
        }

        // 恢复数据库备份
        if (!is_dir($info[ 'backup_sql_dir' ])) {
            throw new AdminException('UPGRADE_BACKUP_SQL_NOT_FOUND');
        }

        // 恢复前的自动备份记录同样改为任务完成后写入（finishBackup），此处不再预写
        $key = uniqid();

        $state = [
            'key'     => $key,
            'mode'    => self::MODE_RESTORE,
            'id'      => $id,
            'source'  => $info,
            'version' => $info[ 'version' ],
            'step'    => self::STEP_BACKUP_CODE,
            'progress' => null,
            'data'    => [ [ 'content' => '开始恢复备份', 'step' => self::STEP_BACKUP_CODE ] ],
            'done'    => false
        ];
        Cache::set($this->cache_key, $state);

        return $state;
    }

    /**
     * 发起备份恢复（基于统一任务记录 sys_task + 归档目录定位）
     *
     * sys_backup_records 已废弃：备份归属统一由 sys_task（task_type=backup）承载，
     * 归档目录由 backup_key 推导为 upgrade/{backup_key}/backup/{code,sql}，
     * 不再依赖备份记录表的 id 与 status。
     *
     * @param string $backup_key 备份任务标识（sys_task.task_key）
     * @return array 任务状态
     * @throws AdminException
     */
    public function startRestoreByKey(string $backup_key): array
    {
        if ($backup_key === '') throw new AdminException('UPGRADE_RECORD_NOT_EXIST');

        // 备份归属：统一任务记录；仅「已成功终态」的备份可用于恢复
        $task = Db::name('sys_task')
            ->where([
                [ 'task_key', '=', $backup_key ],
                [ 'task_type', '=', TaskDict::TYPE_BACKUP ]
            ])
            ->field('id, task_key, title, status')
            ->find();

        // 历史兼容：早期备份记录的 backup_key 存的是「升级任务标识」，
        // 真正的备份任务是挂在它下面的子任务（parent_key 指向升级任务）。
        // 据此反查真实的归档标识，让这部分历史记录仍能恢复。
        if (empty($task)) {
            $task = Db::name('sys_task')
                ->where([
                    [ 'parent_key', '=', $backup_key ],
                    [ 'task_type', '=', TaskDict::TYPE_BACKUP ]
                ])
                ->field('id, task_key, title, status')
                ->find();
        }

        if (empty($task) || (string) $task[ 'status' ] !== TaskDict::STATUS_SUCCESS) {
            throw new AdminException('UPGRADE_RECORD_NOT_EXIST');
        }

        // 归档目录按「真实备份任务标识」推导（历史记录下它与传入的 backup_key 不同）
        $archiveKey      = (string) $task[ 'task_key' ];
        $backup_dir      = $this->upgrade_dir . $archiveKey . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR;
        $backup_code_dir = $backup_dir . 'code' . DIRECTORY_SEPARATOR;
        $backup_sql_dir  = $backup_dir . 'sql' . DIRECTORY_SEPARATOR;

        // 恢复前校验归档完整性（后续 restoreCode / restoreSql 直接取 source 中的目录）
        if (!is_dir($backup_code_dir)) throw new AdminException('UPGRADE_BACKUP_CODE_NOT_FOUND');
        if (!is_dir($backup_sql_dir)) throw new AdminException('UPGRADE_BACKUP_SQL_NOT_FOUND');

        $key = uniqid();

        $state = [
            'key'      => $key,
            'mode'     => self::MODE_RESTORE,
            'id'       => (int) $task[ 'id' ],
            'source'   => [
                'backup_key'      => $archiveKey,
                'title'           => (string) ( $task[ 'title' ] ?? '' ),
                'backup_dir'      => $backup_dir,
                'backup_code_dir' => $backup_code_dir,
                'backup_sql_dir'  => $backup_sql_dir
            ],
            'version'  => 'v' . config('version.version'),
            'step'     => self::STEP_BACKUP_CODE,
            'progress' => null,
            'data'     => [ [ 'content' => '开始恢复备份', 'step' => self::STEP_BACKUP_CODE ] ],
            'done'     => false
        ];

        Cache::set($this->cache_key, $state);

        return $state;
    }

    /**
     * 推进一个步骤（由统一任务执行器逐片驱动）
     * 说明：数据库备份 / 恢复为分段执行，未完成时保持当前步骤不变，等待下一次驱动
     * @return void
     */
    public function execute(): void
    {
        $state = $this->getTaskState();
        if (empty($state) || !empty($state[ 'done' ])) return;

        $key  = (string) ( $state[ 'key' ] ?? '' );
        $mode = (string) ( $state[ 'mode' ] ?? self::MODE_BACKUP );
        $step = (string) ( $state[ 'step' ] ?? '' );

        switch ($step) {
            // ========== 备份源码（备份与恢复共有：恢复前先自动备份当前环境） ==========
            case self::STEP_BACKUP_CODE:
                $finished = $this->backupCode($key, $state);
                if ($finished) {
                    $state[ 'step' ]     = self::STEP_BACKUP_SQL;
                    $state[ 'progress' ] = 0;
                    $state[ 'data' ][]   = [ 'content' => '源码备份完成，开始备份数据库', 'step' => $state[ 'step' ] ];
                }
                break;

            // ========== 备份数据库（分段，未完成时保持本步骤） ==========
            case self::STEP_BACKUP_SQL:
                $backup_result = $this->backupSql($key);
                if ($backup_result === true || $backup_result >= 100) {
                    $state[ 'progress' ] = 100;
                    $state[ 'step' ]     = $mode === self::MODE_RESTORE ? self::STEP_RESTORE_CODE : self::STEP_BACKUP_COMPLETE;
                    $state[ 'data' ][]   = [ 'content' => '数据库备份完成', 'step' => $state[ 'step' ] ];
                } else {
                    $state[ 'progress' ] = (int) $backup_result;
                    $state[ 'step' ]     = self::STEP_BACKUP_SQL;
                }
                break;

            // ========== 备份收尾 ==========
            case self::STEP_BACKUP_COMPLETE:
                $this->complete($key);
                $state[ 'step' ]     = self::STEP_END;
                $state[ 'progress' ] = 100;
                $state[ 'done' ]     = true;
                $state[ 'data' ][]   = [ 'content' => '备份完成', 'step' => self::STEP_END ];
                break;

            // ========== 恢复：源码 ==========
            case self::STEP_RESTORE_CODE:
                $finished = $this->restoreCode($state);
                if ($finished) {
                    $state[ 'step' ]     = self::STEP_RESTORE_SQL;
                    $state[ 'progress' ] = 0;
                    $state[ 'data' ][]   = [ 'content' => '源码恢复完成，开始恢复数据库', 'step' => $state[ 'step' ] ];
                }
                break;

            // ========== 恢复：数据库（分段，未完成时保持本步骤） ==========
            case self::STEP_RESTORE_SQL:
                $restore_result = $this->restoreSql($state);
                if ($restore_result === true || $restore_result >= 100) {
                    $state[ 'progress' ] = 100;
                    $state[ 'step' ]     = self::STEP_RESTORE_DATA;
                    $state[ 'data' ][]   = [ 'content' => '数据库恢复完成', 'step' => $state[ 'step' ] ];
                } else {
                    $state[ 'progress' ] = (int) $restore_result;
                    $state[ 'step' ]     = self::STEP_RESTORE_SQL;
                }
                break;

            // ========== 恢复：数据修正 ==========
            case self::STEP_RESTORE_DATA:
                $this->restoreData();
                $state[ 'step' ]   = self::STEP_RESTORE_COMPLETE;
                $state[ 'data' ][] = [ 'content' => '数据恢复完成', 'step' => $state[ 'step' ] ];
                break;

            // ========== 恢复收尾 ==========
            case self::STEP_RESTORE_COMPLETE:
                $this->complete($key);
                $state[ 'step' ]     = self::STEP_END;
                $state[ 'progress' ] = 100;
                $state[ 'done' ]     = true;
                $state[ 'data' ][]   = [ 'content' => '备份恢复完成', 'step' => self::STEP_END ];
                ( new SystemService() )->clearCache(); // 清除缓存
                break;
        }

        Cache::set($this->cache_key, $state);
    }

    /**
     * 任务失败 / 取消：收敛备份记录与任务状态
     * - 备份失败：删除未完成的备份记录与文件
     * - 恢复失败：记录标记为失败
     * @return void
     */
    public function failTask(): void
    {
        $state = $this->getTaskState();
        if (empty($state)) return;

        $key  = (string) ( $state[ 'key' ] ?? '' );
        $mode = (string) ( $state[ 'mode' ] ?? self::MODE_BACKUP );

        if ($mode === self::MODE_RESTORE) {
            $this->edit([
                [ 'backup_key', '=', $key ],
            ], [
                'status' => BackupDict::STATUS_FAIL,
                'complete_time' => time()
            ]);
        } else {
            $this->failed($key);
        }

        $this->clearTaskState();
    }

    /**
     * 获取正在进行的恢复任务
     * @return array
     */
    public function getRestoreTask()
    {
        $state = $this->getTaskState();
        return ( $state[ 'mode' ] ?? '' ) === self::MODE_RESTORE ? $state : [];
    }

    /**
     * 获取正在进行的备份任务
     * @return array
     */
    public function getBackupTask()
    {
        $state = $this->getTaskState();
        return ( $state[ 'mode' ] ?? '' ) === self::MODE_BACKUP ? $state : [];
    }

    // ==================== 查询 ====================

    /**
     * 获取备份记录信息
     * @param array $condition
     * @param $field
     * @return array
     */
    public function getInfo(array $condition, $field = 'id, version, backup_key, content, status, fail_reason, create_time, complete_time')
    {
        return $this->model->field($field)->where($condition)->findOrEmpty()->toArray();
    }

    /**
     * 备份记录列表
     * @param $condition
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getList($condition = [], $field = 'id, version, backup_key, content, status, fail_reason, create_time, complete_time')
    {
        $order = "id desc";
        return $this->model->where($condition)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 备份记录分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, version, backup_key, content, remark, complete_time';
        $order = "id desc";
        $search_model = $this->model->where([
            [ 'status', '=', BackupDict::STATUS_COMPLETE ],
            [ 'content|version', 'like', '%' . $where[ 'content' ] . '%' ]
        ])->append([ 'backup_dir' ])->field($field)->order($order);
        return $this->pageQuery($search_model);
    }

    /**
     * 历史记录的归档标识（用于目录存在性校验）
     *
     * 早期备份记录的 backup_key 存的是升级任务标识，真实归档在其子任务目录下。
     *
     * @param string $backupKey
     * @return string
     */
    public function archiveKeyOf(string $backupKey): string
    {
        if ($backupKey === '') return '';

        $dir = $this->upgrade_dir . $backupKey . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR;
        if (is_dir($dir)) return $backupKey;

        try {
            $child = Db::name('sys_task')
                ->where([
                    [ 'parent_key', '=', $backupKey ],
                    [ 'task_type', '=', TaskDict::TYPE_BACKUP ]
                ])
                ->value('task_key');
        } catch (\Throwable $e) {
            return $backupKey;
        }

        return $child ? (string) $child : $backupKey;
    }

    // ==================== 具体业务动作 ====================

    /**
     * 备份代码
     * @param $backup_key
     * @return void
     */
    /**
     * 源码备份的根目录（顺序即备份顺序，排除项随目录固定）
     *
     * 任务步骤模型按此清单把「备份源码」展开为每个目录一个子步骤，
     * 与此处保持单一来源，避免步骤展示与实际备份范围不一致。
     * @return array
     */
    public static function getBackupCodeRoots(): array
    {
        return [
            [ 'key' => 'admin',    'name' => '管理端 admin',    'desc' => '备份 admin 目录',    'exclude' => [ '.build', '.vscode', 'node_modules', 'dist' ] ],
            [ 'key' => 'uni-app',  'name' => '移动端 uni-app',  'desc' => '备份 uni-app 目录',  'exclude' => [ '.build', 'node_modules', 'dist' ] ],
            [ 'key' => 'web',      'name' => 'PC 端 web',       'desc' => '备份 web 目录',      'exclude' => [ 'node_modules', '.nuxt', '.output', 'dist' ] ],
            [ 'key' => 'niucloud', 'name' => '服务端 niucloud', 'desc' => '备份 niucloud 目录', 'exclude' => [ 'runtime', 'upload' ] ],
        ];
    }

    /**
     * 源码恢复的目录（顺序即恢复顺序）
     * @return array
     */
    public static function getRestoreCodeRoots(): array
    {
        return [
            [ 'key' => 'admin',    'name' => '管理端 admin',    'desc' => '恢复 admin 目录' ],
            [ 'key' => 'uni-app',  'name' => '移动端 uni-app',  'desc' => '恢复 uni-app 目录' ],
            [ 'key' => 'web',      'name' => 'PC 端 web',       'desc' => '恢复 web 目录' ],
            [ 'key' => 'niucloud', 'name' => '服务端 niucloud', 'desc' => '恢复 niucloud 目录' ],
        ];
    }

    public function backupCode($backup_key, array &$state): bool
    {
        $backup_dir = $this->upgrade_dir . $backup_key . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;
        dir_mkdir($backup_dir);

        // 每个根目录单独、可续跑地复制（含 vendor / addon 等海量文件），保证单步 run 请求不会长时间阻塞
        $roots = [];
        foreach (self::getBackupCodeRoots() as $root) {
            $roots[] = [ $root[ 'key' ], $this->root_path . $root[ 'key' ], $backup_dir . $root[ 'key' ], $root[ 'exclude' ] ];
        }

        $idx = (int) ( $state[ 'code_root_index' ] ?? 0 );
        if (!isset($roots[ $idx ])) {
            return true; // 所有目录复制完成
        }

        [ $name, $src, $dst, $ex ] = $roots[ $idx ];

        if (!isset($state[ 'code_total' ])) {
            // 首次进入：预扫描所有根目录，计算稳定的文件总量，避免进度条因按根目录分批而倒退
            $total      = 0;
            $rootTotals = [];
            foreach ($roots as [ $n, $s, $d, $e ]) {
                $count = $this->prepareCopyList($s, $d, $e, 'bk_code_' . $backup_key . '_' . $n);
                $rootTotals[ $n ] = $count;
                $total += $count;
            }
            $state[ 'code_total' ] = $total;
            $state[ 'code_done' ]  = 0;
            // 各目录的文件数：供任务步骤按目录展示子步骤进度
            $state[ 'code_root_totals' ] = $rootTotals;
        }

        $r = $this->resumableCopy($src, $dst, $ex, 'bk_code_' . $backup_key . '_' . $name);
        $state[ 'code_done' ] += $r[ 'copied' ];
        if ($r[ 'done' ]) {
            $state[ 'code_root_index' ] = $idx + 1;
        }
        return false; // 未完成则保持当前步骤，等待下一次 run 驱动
    }

    /**
     * 可续跑的目录复制：每次调用只复制有限个文件（受 $budget 限制），
     * 避免单次 run 请求长时间阻塞被 Web 端（php-fpm / 反向代理）请求超时打断导致 500。
     * 通过缓存记录待复制文件清单与偏移量，断点续传；复制为幂等（重复复制同一文件覆盖即可）。
     * @param string $srcRoot     源根目录
     * @param string $dstRoot     目标根目录
     * @param array  $excludeDirs 需排除的子目录名
     * @param string $cookie      续跑缓存键前缀（区分不同复制任务）
     * @param int    $budget      本次复制文件数上限
     * @return array [ 'done' => bool, 'copied' => int, 'total' => int ]
     */
    private function resumableCopy(string $srcRoot, string $dstRoot, array $excludeDirs, string $cookie, int $budget = 1000): array
    {
        $filesKey = 'backup_copy_files_' . $cookie;
        $offKey   = 'backup_copy_offset_' . $cookie;

        $files = Cache::get($filesKey);
        if (!is_array($files)) {
            $files = [];
            if (is_dir($srcRoot)) {
                $this->collectCopyFiles($srcRoot, rtrim($dstRoot, DIRECTORY_SEPARATOR), $excludeDirs, $files);
            }
            Cache::set($filesKey, $files, 86400);
            Cache::set($offKey, 0, 86400);
        }

        $offset = (int) Cache::get($offKey);
        $total  = count($files);
        if ($offset >= $total) {
            Cache::delete($filesKey);
            Cache::delete($offKey);
            return [ 'done' => true, 'copied' => 0, 'total' => $total ];
        }

        $end    = min($offset + $budget, $total);
        $copied = 0;
        for ($i = $offset; $i < $end; $i++) {
            [ $src, $dst ] = $files[ $i ];
            $dir = dirname($dst);
            if (!is_dir($dir)) @mkdir($dir, 0777, true);
            @copy($src, $dst);
            $copied++;
        }
        $offset = $end;
        Cache::set($offKey, $offset, 86400);

        if ($offset >= $total) {
            Cache::delete($filesKey);
            Cache::delete($offKey);
            return [ 'done' => true, 'copied' => $copied, 'total' => $total ];
        }
        return [ 'done' => false, 'copied' => $copied, 'total' => $total ];
    }

    /**
     * 预构建某根目录的待复制文件清单并缓存，返回文件总数（不实际复制）。
     * 用于在阶段首次进入时一次性算出稳定的文件总量，供进度估算使用。
     */
    private function prepareCopyList(string $srcRoot, string $dstRoot, array $excludeDirs, string $cookie): int
    {
        $filesKey = 'backup_copy_files_' . $cookie;
        $cached   = Cache::get($filesKey);
        if (is_array($cached)) return count($cached);

        $files = [];
        if (is_dir($srcRoot)) {
            $this->collectCopyFiles($srcRoot, rtrim($dstRoot, DIRECTORY_SEPARATOR), $excludeDirs, $files);
        }
        Cache::set($filesKey, $files, 86400);
        Cache::set('backup_copy_offset_' . $cookie, 0, 86400);
        return count($files);
    }

    /**
     * 递归收集待复制文件清单（[ 源路径, 目标路径 ]）
     */
    private function collectCopyFiles(string $src, string $dst, array $excludeDirs, array &$files): void
    {
        if (!is_dir($src)) return;
        $dh = @opendir($src);
        if ($dh === false) return;
        while (($f = readdir($dh)) !== false) {
            if ($f === '.' || $f === '..') continue;
            $sp = $src . DIRECTORY_SEPARATOR . $f;
            $dp = $dst . DIRECTORY_SEPARATOR . $f;
            if (is_dir($sp)) {
                if (in_array($f, $excludeDirs, true)) continue;
                $this->collectCopyFiles($sp, $dp, $excludeDirs, $files);
            } else {
                $files[] = [ $sp, $dp ];
            }
        }
        closedir($dh);
    }

    /**
     * 备份数据库（分段执行）
     * @param $backup_key
     * @return bool|int true 表示已完成，否则返回已完成百分比
     */
    public function backupSql($backup_key)
    {
        $backup_dir = $this->upgrade_dir . $backup_key . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'sql' . DIRECTORY_SEPARATOR;
        // 创建目录
        dir_mkdir($backup_dir);

        $prefix = config('database.connections.' . config('database.default'))[ 'prefix' ];

        // 不需要备份的表
        $not_need_backup = [
            "{$prefix}sys_schedule_log",
            "{$prefix}sys_user_log",
            "{$prefix}jobs",
            "{$prefix}jobs_failed",
            "{$prefix}sys_upgrade_records",
            "{$prefix}sys_backup_records"
        ];

        $db = new DbBackup($backup_dir, 1024 * 1024 * 2, $not_need_backup, key: $backup_key);

        $result = $db->backupDatabaseSegment();
        if ($result === true) return true;

        return $db->getBackupProgress();
    }

    /**
     * 恢复源码备份
     * @param array $state
     * @return void
     */
    protected function restoreCode(array &$state): bool
    {
        $source   = $state[ 'source' ] ?? [];
        $code_dir = rtrim((string) ( $source[ 'backup_code_dir' ] ?? '' ), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;

        if ($code_dir === DIRECTORY_SEPARATOR || !is_dir($code_dir)) {
            throw new AdminException('UPGRADE_BACKUP_CODE_NOT_FOUND');
        }

        $roots = [];
        foreach (self::getRestoreCodeRoots() as $root) {
            $roots[] = [ $root[ 'key' ], $code_dir . $root[ 'key' ], $this->root_path . $root[ 'key' ] ];
        }

        $idx = (int) ( $state[ 'restore_root_index' ] ?? 0 );
        if (!isset($roots[ $idx ])) {
            return true; // 所有目录恢复完成
        }

        [ $name, $src, $dst ] = $roots[ $idx ];

        if (!isset($state[ 'restore_total' ])) {
            // 首次进入：预扫描所有根目录，计算稳定的文件总量
            $total      = 0;
            $rootTotals = [];
            foreach ($roots as [ $n, $s, $d ]) {
                $count = $this->prepareCopyList($s, $d, [], 'rs_code_' . ( $state[ 'key' ] ?? '' ) . '_' . $n);
                $rootTotals[ $n ] = $count;
                $total += $count;
            }
            $state[ 'restore_total' ] = $total;
            $state[ 'restore_done' ]  = 0;
            // 各目录的文件数：供任务步骤按目录展示子步骤进度
            $state[ 'restore_root_totals' ] = $rootTotals;
        }

        $r = $this->resumableCopy($src, $dst, [], 'rs_code_' . ( $state[ 'key' ] ?? '' ) . '_' . $name);
        $state[ 'restore_done' ] += $r[ 'copied' ];
        if ($r[ 'done' ]) {
            $state[ 'restore_root_index' ] = $idx + 1;
        }
        return false; // 未完成则保持当前步骤，等待下一次 run 驱动
    }

    /**
     * 恢复数据库备份（分段执行）
     * @param array $state
     * @return bool|int true 表示已完成，否则返回已完成百分比
     */
    protected function restoreSql(array $state)
    {
        $source = $state[ 'source' ] ?? [];
        $sql_dir = (string) ( $source[ 'backup_sql_dir' ] ?? '' );

        if ($sql_dir === '' || !is_dir($sql_dir)) {
            throw new AdminException('UPGRADE_BACKUP_SQL_NOT_FOUND');
        }

        $db = new DbBackup($sql_dir);
        $result = $db->restoreDatabase();
        if ($result === true) return true;

        return $db->getRestoreProgress();
    }

    /**
     * 恢复数据：修正站点数据
     * @return void
     */
    protected function restoreData()
    {
        $site_model = new Site();
        $site_model->where([
            [ 'site_id', '<>', 0 ],
            [ 'app_type', '=', AppTypeDict::ADMIN ]
        ])->update([ 'site_id' => 0 ]);
    }

}
