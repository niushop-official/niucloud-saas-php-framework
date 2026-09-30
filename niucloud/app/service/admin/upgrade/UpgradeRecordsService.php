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

use app\dict\sys\TaskDict;
use app\dict\sys\UpgradeDict;
use app\model\sys\SysUpgradeRecords;
use core\base\BaseAdminService;
use think\facade\Db;

/**
 * 升级记录表服务层
 */
class UpgradeRecordsService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysUpgradeRecords();
    }

    /**
     * 添加升级记录
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'create_time' ] = time();
        $res = $this->model->create($data);

        // 备份记录不再在这里创建：升级产生的备份是独立的备份任务（有自己的 task_key），
        // 由该任务成功完成后经 BackupRecordsService::finishBackup() 写入，
        // backup_key 用任务标识，与归档目录对齐（此前用 upgrade_key 会导致目录推导错位）。
        return $res->id;
    }

    /**
     * 编辑升级记录
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
     * 执行完成，更新升级记录状态，备份记录状态
     * @param $upgrade_key
     * @return void
     */
    public function complete($upgrade_key)
    {
        // 记录升级日志
        $this->edit([
            [ 'upgrade_key', '=', $upgrade_key ]
        ], [
            'status' => UpgradeDict::STATUS_COMPLETE,
            'complete_time' => time()
        ]);
        ( new BackupRecordsService() )->complete($upgrade_key);
    }

    /**
     * 执行失败，更新升级记录状态，备份记录状态
     * @param $upgrade_key
     * @param array $fail_reason
     * @return void
     */
    public function failed($upgrade_key, $fail_reason = [])
    {
        $this->model->where([ [ 'upgrade_key', '=', $upgrade_key ] ])->update(['status' => UpgradeDict::STATUS_FAIL, 'fail_reason' => $fail_reason ]);
        ( new BackupRecordsService() )->failed($upgrade_key);
    }

    /**
     * 获取升级记录信息
     * @param array $condition
     * @param $field
     * @return array
     */
    public function getInfo(array $condition, $field = 'id, upgrade_key, app_key, name, content, prev_version, current_version, status, fail_reason, create_time, complete_time')
    {
        return $this->model->field($field)->where($condition)->findOrEmpty()->toArray();
    }

    /**
     * 升级记录分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, upgrade_key, app_key, name, content, prev_version, current_version, complete_time, create_time, status, fail_reason, backup_key';
        $order = "id desc";
        $search_model = $this->model->where([
//            [ 'status', '=', UpgradeDict::STATUS_COMPLETE ],
            [ 'name|content|current_version', 'like', '%' . $where[ 'name' ] . '%' ]
        ])->field($field)->order($order)->append(['status_name']);

        $page = $this->pageQuery($search_model);

        // 逐条解析备份关联，在「数组」上覆盖：
        // SysUpgradeRecords::getBackupDirAttr() 是获取器，它会忽略写入值并按 upgrade_key 计算，
        // 因此在模型上赋值无效，必须在 toArray() 之后再覆盖
        $rows = (array) ( $page[ 'data' ] ?? [] );
        foreach ($rows as &$row) {
            $info = self::backupInfoOf(
                (string) ( $row[ 'upgrade_key' ] ?? '' ),
                (string) ( $row[ 'backup_key' ] ?? '' )
            );
            $row[ 'backup_key' ] = (string) ( $info[ 'backup_key' ] ?? '' );
            $row[ 'backup_dir' ] = (string) ( $info[ 'backup_dir' ] ?? '' );
        }
        unset($row);

        // 是否「本次升级产生的备份」：一次查询判定，避免逐行查库
        $page[ 'data' ] = $this->markOwnBackup($rows);

        return $page;
    }

    /**
     * 标注每行是否本次升级产生的备份
     *
     * 判定依据：备份任务（sys_task）的 parent_key 指向该升级任务 => 本次升级产生的新备份，
     * 否则为「沿用上次备份」（升级时未勾选备份，回滚 / 恢复都基于最近一次备份）。
     *
     * @param array $rows
     * @return array
     */
    protected function markOwnBackup(array $rows): array
    {
        if (empty($rows)) return $rows;

        $keys = array_values(array_unique(array_filter(array_map(fn ($row) => (string) ( $row[ 'backup_key' ] ?? '' ), $rows))));
        $map  = [];

        if (!empty($keys)) {
            try {
                $list = Db::name('sys_task')->where([ [ 'task_key', 'in', $keys ] ])
                    ->field('task_key, parent_key')->select()->toArray();
                foreach ((array) $list as $item) {
                    $map[ (string) ( $item[ 'task_key' ] ?? '' ) ] = (string) ( $item[ 'parent_key' ] ?? '' );
                }
            } catch (\Throwable $e) {
                $map = [];
            }
        }

        foreach ($rows as &$row) {
            $backupKey  = (string) ( $row[ 'backup_key' ] ?? '' );
            $upgradeKey = (string) ( $row[ 'upgrade_key' ] ?? '' );
            // 历史数据没有 backup_key：子备份任务存在即视为本次产生
            $own = $backupKey !== ''
                ? ( ( $map[ $backupKey ] ?? '' ) === $upgradeKey && $upgradeKey !== '' )
                : !empty(self::backupKeysOf($upgradeKey));

            $row[ 'backup_own' ] = $own ? 1 : 0;
        }
        unset($row);

        return $rows;
    }

    /**
     * 写入本次升级关联的备份标识
     *
     * 由 UpgradeService 在升级完成时调用：
     * - 本次产生了备份 => 备份任务标识
     * - 未备份但沿用了上次备份 => 上次备份的标识
     * - 都没有 => 空串
     *
     * @param string $upgradeKey
     * @param string $backupKey
     * @return void
     */
    public function setBackupKey(string $upgradeKey, string $backupKey): void
    {
        if ($upgradeKey === '') return;

        $this->model->where([ [ 'upgrade_key', '=', $upgradeKey ] ])->update([ 'backup_key' => $backupKey ]);
    }

    /**
     * 升级记录关联的备份信息
     *
     * 以记录里落库的 backup_key 为准（与备份记录 sys_backup_records.backup_key 同口径），
     * 再按 archiveKeyOf() 解析真实归档目录；历史记录没有 backup_key 时走推断兜底。
     *
     * @param string $upgradeKey
     * @param string $backupKey 记录里落库的关联备份标识（可为空）
     * @return array ['backup_key' => '', 'backup_dir' => '']
     */
    public static function backupInfoOf(string $upgradeKey, string $backupKey = ''): array
    {
        $backup = new BackupRecordsService();
        $root   = $backup->archiveRoot();

        // 1. 已关联备份标识：以它为准
        // （旧版本曾把 upgrade_key 回退写入 backup_key，这种值无效，走下方推断）
        if ($backupKey !== '' && $backupKey !== $upgradeKey) {
            $archive = $backup->archiveKeyOf($backupKey);
            $dir     = $archive !== '' ? $root . $archive . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR : '';
            if ($dir !== '' && is_dir($dir)) {
                return [ 'backup_key' => $backupKey, 'backup_dir' => 'upgrade/' . $archive . '/backup' ];
            }

            // 归档已被清理：保留关联标识，路径置空（列表展示为「-」）
            return [ 'backup_key' => $backupKey, 'backup_dir' => '' ];
        }

        // 2. 兜底推断：本次升级的备份子任务，或历史以升级任务标识命名的归档
        foreach (self::backupKeysOf($upgradeKey) as $key) {
            if (is_dir($root . $key . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR)) {
                return [ 'backup_key' => $key, 'backup_dir' => 'upgrade/' . $key . '/backup' ];
            }
        }

        return [ 'backup_key' => '', 'backup_dir' => '' ];
    }

    /**
     * 升级记录对应的备份归档标识
     *
     * 两种来源（与 BackupRecordsService::archiveKeyOf() 同口径）：
     * - 历史数据：备份归档直接以升级任务标识命名（upgrade/{upgrade_key}/backup）
     * - 现行数据：升级的备份是独立子任务（parent_key 指向升级任务），归档标识为子任务 task_key
     *
     * @param string $upgradeKey
     * @return array
     */
    public static function backupKeysOf(string $upgradeKey): array
    {
        if ($upgradeKey === '') return [];

        $keys = [];
        $root = ( new BackupRecordsService() )->archiveRoot();

        // 历史记录：归档以升级任务标识命名时直接命中
        // 注意：必须判断 backup 子目录 —— upgrade/{key} 也可能是升级包下载目录（download/）
        if (is_dir($root . $upgradeKey . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR)) {
            $keys[] = $upgradeKey;
        }

        // 现行：升级产生的备份子任务（一次升级可能因重试产生多个）
        try {
            $child = Db::name('sys_task')
                ->where([
                    [ 'parent_key', '=', $upgradeKey ],
                    [ 'task_type', '=', TaskDict::TYPE_BACKUP ]
                ])
                ->column('task_key');
        } catch (\Throwable $e) {
            $child = [];
        }

        foreach ((array) $child as $key) {
            $key = (string) $key;
            if ($key !== '') $keys[] = $key;
        }

        return array_values(array_unique($keys));
    }

    /**
     * 升级记录的备份归档路径（相对项目根，供列表展示）；无可用备份时返回空串
     * @param string $upgradeKey
     * @return string
     */
    public static function backupPathOf(string $upgradeKey): string
    {
        $root = ( new BackupRecordsService() )->archiveRoot();

        foreach (self::backupKeysOf($upgradeKey) as $key) {
            if (is_dir($root . $key . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR)) {
                return 'upgrade/' . $key . '/backup';
            }
        }

        return '';
    }

    /**
     * 删除升级记录对应的备份（备份记录 + 归档目录），升级记录本身保留
     *
     * @param array|string $upgradeKeys upgrade_key（支持逗号分隔字符串）
     * @return array ['record' => 删除的备份记录数, 'total' => 处理的升级记录数]
     */
    public function delBackup($upgradeKeys): array
    {
        $keys = is_array($upgradeKeys) ? $upgradeKeys : explode(',', (string) $upgradeKeys);
        $keys = array_values(array_unique(array_filter(array_map(fn ($v) => trim((string) $v), $keys))));
        if (empty($keys)) return [ 'record' => 0, 'total' => 0 ];

        $backup  = new BackupRecordsService();
        $deleted = 0;
        $archive = [];

        foreach ($keys as $upgradeKey) {
            // 1. 记录里落库的关联备份（本次产生的新备份，或未备份时沿用的上次备份）
            $info      = $this->getInfo([ [ 'upgrade_key', '=', $upgradeKey ] ], 'id, backup_key');
            $backupKey = (string) ( $info[ 'backup_key' ] ?? '' );
            if ($backupKey !== '') {
                $archive[] = $backupKey;
                $deleted  += $backup->delByKey($backupKey);
            }

            // 2. 历史记录兜底：子备份任务 / 以升级任务标识命名的归档
            foreach (self::backupKeysOf($upgradeKey) as $key) {
                $archive[] = $key;
                $deleted  += $backup->delByKey($key);
            }
        }

        // 目录兜底：备份记录已不存在但归档目录残留时一并清理
        foreach (array_values(array_unique($archive)) as $key) {
            $backup->delArchiveDir($key);
        }

        return [ 'record' => $deleted, 'total' => count($keys) ];
    }

    /**
     * 刪除升级记录
     * @param $ids
     * @return void
     */
    public function del($ids) {
        $this->model->where([['id', 'in', $ids]])->delete();
    }
}
