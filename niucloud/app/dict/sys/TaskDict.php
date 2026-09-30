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

namespace app\dict\sys;

use app\service\core\task\handler\AddonBuildTaskHandler;
use app\service\core\task\handler\BackupTaskHandler;
use app\service\core\task\handler\CloudBuildTaskHandler;
use app\service\core\task\handler\UpgradeTaskHandler;
use app\service\core\task\handler\WeappCommitTaskHandler;
use app\service\core\task\handler\WeappUploadTaskHandler;

/**
 * 统一任务字典（任务类型 / 状态 / 结束原因）
 *
 * 任务类型**可扩展**（与支付方式 PayDict::getPayType() 同一套路）：
 * - 内置类型在 getTaskType() 的 $list 中声明
 * - 插件 / 其它模块监听 TaskDict::EVENT_TASK_TYPE 事件追加自己的类型，无需改动本字典与 TaskService
 *
 * 每个任务类型声明：
 * - name      名称（前端展示）
 * - handler   处理器类名（实现 core\task\TaskHandlerInterface）
 * - is_mutex  是否互斥（同站点同时只允许一个互斥任务执行）
 * - app_type  可用端：admin（平台端）/ site（站点端）/ all（两端）
 *
 * Class TaskDict
 * @package app\dict\sys
 */
class TaskDict
{
    // ========== 任务类型 ==========
    const TYPE_CLOUD_BUILD  = 'cloud_build';  // 云编译
    const TYPE_UPGRADE      = 'upgrade';      // 系统升级
    const TYPE_BACKUP       = 'backup';       // 系统备份 / 恢复
    const TYPE_ADDON_BUILD  = 'addon_build';  // 插件打包（支持批量）
    const TYPE_WEAPP_COMMIT = 'weapp_commit'; // 小程序模板库同步（按套餐逐个上传）
    const TYPE_WEAPP_UPLOAD  = 'weapp_upload';  // 小程序发布（站点端：打包源码上传云端并等待编译）

    // ========== 端（任务按「平台端 / 站点端」划分） ==========
    /** 平台端（site_id = 0） */
    const APP_TYPE_ADMIN = 'admin';
    /** 站点端（site_id > 0） */
    const APP_TYPE_SITE  = 'site';
    /** 两端都可用 */
    const APP_TYPE_ALL   = 'all';

    /**
     * 任务类型扩展事件名
     *
     * 监听者（handle 无入参）返回：[ '类型标识' => [ 'name'=>..., 'handler'=>XxxHandler::class, 'is_mutex'=>0, 'app_type'=>'site' ] ]
     */
    const EVENT_TASK_TYPE = 'TaskType';

    // ========== 任务互斥（类型级固定，创建时不可覆盖） ==========
    /** 互斥任务类型：同一站点同时只允许一个互斥任务在执行（会改动系统文件 / 数据库） */
    const MUTEX_TYPES = [
        self::TYPE_CLOUD_BUILD, // 云编译：产物会覆盖部署
        self::TYPE_UPGRADE,     // 系统升级：覆盖源码 + 执行数据库变更
        self::TYPE_BACKUP,      // 备份 / 恢复：整库打包、恢复时会覆盖数据
    ];

    // ========== 任务状态 ==========
    const STATUS_CREATED        = 'created';         // 已创建
    const STATUS_RUNNING        = 'running';         // 执行中
    const STATUS_WAITING_INPUT  = 'waiting_input';   // 等待用户决策（任务暂停）
    const STATUS_ROLLING_BACK   = 'rolling_back';    // 回滚中

    const STATUS_SUCCESS         = 'success';          // 成功
    const STATUS_FAILED          = 'failed';           // 失败
    const STATUS_CANCELED        = 'canceled';         // 已取消
    const STATUS_ROLLED_BACK     = 'rolled_back';      // 已回滚
    const STATUS_ROLLBACK_FAILED = 'rollback_failed';  // 回滚失败

    /**
     * 非持久化状态：仅用于接口响应（任务被其它进程占用 / 游标冲突）
     */
    const STATUS_LOCKED = 'locked';

    // ========== 等待决策时的用户操作（actions.code） ==========
    const ACTION_RETRY  = 'retry';  // 重试：回到原步骤继续执行
    const ACTION_SKIP   = 'skip';   // 跳过：略过当前步骤继续推进
    const ACTION_CANCEL = 'cancel'; // 取消任务

    // ========== 结束原因（end_reason） ==========
    const END_REASON_COMPLETED   = 'completed';    // 正常完成
    const END_REASON_USER_CANCEL = 'user_cancel';  // 用户取消
    const END_REASON_FAILED      = 'failed';       // 执行失败
    const END_REASON_ROLLED_BACK = 'rolled_back';  // 已回滚

    /**
     * 终态：不可再驱动，仅只读回放
     */
    public static function getTerminalStatus(): array
    {
        return [
            self::STATUS_SUCCESS,
            self::STATUS_FAILED,
            self::STATUS_CANCELED,
            self::STATUS_ROLLED_BACK,
            self::STATUS_ROLLBACK_FAILED,
        ];
    }

    /**
     * 非终态：可进行、受单实例约束
     */
    public static function getNonTerminalStatus(): array
    {
        return [
            self::STATUS_CREATED,
            self::STATUS_RUNNING,
            self::STATUS_WAITING_INPUT,
            self::STATUS_ROLLING_BACK,
        ];
    }

    public static function isTerminal(string $status): bool
    {
        return in_array($status, self::getTerminalStatus(), true);
    }

    // ==================== 任务类型注册（可扩展） ====================

    /**
     * 任务类型注册表缓存（单次请求内复用，避免重复的事件分发与解析）
     * @var array
     */
    protected static array $typeCache = [];

    /**
     * 任务类型注册表（内置 + 事件扩展）
     *
     * @param string $appType 端：admin / site；为空返回全部类型（不做端过滤）
     * @return array 类型标识 => ['name'=>名称, 'handler'=>处理器类, 'is_mutex'=>0/1, 'app_type'=>admin|site|all]
     */
    public static function getTaskType(string $appType = ''): array
    {
        // 单次请求内缓存：事件分发与类型解析有开销，而 getType()/isMutex() 会被逐行调用
        if (empty(self::$typeCache)) self::$typeCache = self::buildTaskType();

        $list = self::$typeCache;

        if ($appType !== '') {
            foreach ($list as $key => $item) {
                $type = (string) ( $item[ 'app_type' ] ?? self::APP_TYPE_ALL );
                if ($type !== self::APP_TYPE_ALL && $type !== $appType) unset($list[ $key ]);
            }
        }

        return $list;
    }

    /**
     * 构建任务类型注册表（内置 + 事件扩展）
     * @return array
     */
    protected static function buildTaskType(): array
    {
        $list = [
            self::TYPE_CLOUD_BUILD => [
                'name'     => '云编译',
                'handler'  => CloudBuildTaskHandler::class,
                'is_mutex' => 1,
                'app_type' => self::APP_TYPE_ADMIN // 编译产物会覆盖部署，仅平台端
            ],
            self::TYPE_UPGRADE => [
                'name'     => '系统升级',
                'handler'  => UpgradeTaskHandler::class,
                'is_mutex' => 1,
                'app_type' => self::APP_TYPE_ADMIN
            ],
            self::TYPE_BACKUP => [
                'name'     => '系统备份',
                'handler'  => BackupTaskHandler::class,
                'is_mutex' => 1,
                'app_type' => self::APP_TYPE_ADMIN
            ],
            self::TYPE_ADDON_BUILD => [
                'name'     => '插件打包',
                'handler'  => AddonBuildTaskHandler::class,
                'is_mutex' => 0,
                'app_type' => self::APP_TYPE_ADMIN
            ],
            self::TYPE_WEAPP_COMMIT => [
                'name'     => '小程序模板同步',
                'handler'  => WeappCommitTaskHandler::class,
                'is_mutex' => 0,
                'app_type' => self::APP_TYPE_ADMIN
            ],
            self::TYPE_WEAPP_UPLOAD => [
                'name'     => '小程序发布',
                'handler'  => WeappUploadTaskHandler::class,
                'is_mutex' => 1,
                'app_type' => self::APP_TYPE_SITE // 站点端：发布当前站点的小程序
            ],
        ];

        // 事件扩展：插件 / 其它模块追加的任务类型（同 key 覆盖内置）
        foreach (self::eventTaskType() as $key => $item) {
            $list[ $key ] = $item;
        }

        foreach ($list as $key => &$item) {
            $item[ 'key' ] = (string) ( $item[ 'key' ] ?? $key );
        }
        unset($item);

        return $list;
    }

    /**
     * 通过事件收集扩展任务类型
     *
     * 监听者返回：[ '类型标识' => [ 'name'=>..., 'handler'=>..., 'is_mutex'=>0, 'app_type'=>'site' ] ]
     * 定义不合法（缺 key / 缺 handler）的项直接丢弃：单个插件写错不应拖垮整个任务体系。
     *
     * @return array
     */
    protected static function eventTaskType(): array
    {
        $items = [];

        foreach ((array) event(self::EVENT_TASK_TYPE) as $contribution) {
            if (!is_array($contribution) || empty($contribution)) continue;

            foreach ($contribution as $key => $item) {
                $key = (string) $key;
                if ($key === '' || !is_array($item)) continue;

                $handler = (string) ( $item[ 'handler' ] ?? '' );
                if ($handler === '' || !class_exists($handler)) continue;

                $appType = (string) ( $item[ 'app_type' ] ?? self::APP_TYPE_ALL );
                if (!in_array($appType, [ self::APP_TYPE_ADMIN, self::APP_TYPE_SITE, self::APP_TYPE_ALL ], true)) {
                    $appType = self::APP_TYPE_ALL;
                }

                $items[ $key ] = [
                    'name'     => (string) ( $item[ 'name' ] ?? $key ),
                    'handler'  => $handler,
                    'is_mutex' => (int) ( $item[ 'is_mutex' ] ?? 0 ),
                    'app_type' => $appType
                ];
            }
        }

        return $items;
    }

    /**
     * 单个任务类型定义
     * @param string $type
     * @return array 未注册返回空数组
     */
    public static function taskType(string $type): array
    {
        return self::getTaskType()[ $type ] ?? [];
    }

    /**
     * 任务类型的处理器类名（未注册返回空串）
     * @param string $type
     * @return string
     */
    public static function handlerClass(string $type): string
    {
        return (string) ( self::taskType($type)[ 'handler' ] ?? '' );
    }

    /**
     * 任务类型是否为互斥任务（类型级固定）
     *
     * 互斥任务：同一站点同时只允许一个在执行，创建时若同站点已有非终态的互斥任务则拒绝创建。
     * 非互斥任务：与互斥任务互不影响（可并行），但同站点也受「非互斥槽位」数量限制。
     *
     * @param string $type TaskDict::TYPE_*
     * @return bool
     */
    public static function isMutex(string $type): bool
    {
        $defined = self::taskType($type);
        // 已注册类型以注册表为准；未注册（历史类型）回退到常量清单
        if (!empty($defined)) return (int) ( $defined[ 'is_mutex' ] ?? 0 ) === 1;

        return in_array($type, self::MUTEX_TYPES, true);
    }

    /**
     * 互斥标记（落库用）：1 互斥 / 0 非互斥
     * @param string $type
     * @return int
     */
    public static function mutexFlag(string $type): int
    {
        return self::isMutex($type) ? 1 : 0;
    }

    /**
     * 指定端是否允许该任务类型
     * @param string $type
     * @param string $appType admin / site
     * @return bool
     */
    public static function allowAppType(string $type, string $appType): bool
    {
        $defined = self::taskType($type);
        if (empty($defined)) return false;

        $allow = (string) ( $defined[ 'app_type' ] ?? self::APP_TYPE_ALL );

        return $allow === self::APP_TYPE_ALL || $allow === $appType;
    }

    /**
     * 任务类型名称（未注册时回退为类型标识，保证历史数据仍能展示）
     * @param string $type
     * @return string
     */
    public static function getType(string $type): string
    {
        return (string) ( self::taskType($type)[ 'name' ] ?? $type );
    }

    public static function getStatus(string $status): string
    {
        $list = [
            self::STATUS_CREATED        => '已创建',
            self::STATUS_RUNNING        => '执行中',
            self::STATUS_WAITING_INPUT  => '等待决策',
            self::STATUS_ROLLING_BACK   => '回滚中',
            self::STATUS_SUCCESS        => '成功',
            self::STATUS_FAILED         => '失败',
            self::STATUS_CANCELED       => '已取消',
            self::STATUS_ROLLED_BACK    => '已回滚',
            self::STATUS_ROLLBACK_FAILED => '回滚失败',
            self::STATUS_LOCKED         => '被占用',
        ];
        return $list[ $status ] ?? $status;
    }

    public static function getEndReason(string $reason): string
    {
        $list = [
            self::END_REASON_COMPLETED   => '正常完成',
            self::END_REASON_USER_CANCEL => '用户取消',
            self::END_REASON_FAILED      => '执行失败',
            self::END_REASON_ROLLED_BACK => '已回滚',
        ];
        return $list[ $reason ] ?? $reason;
    }

    /**
     * 任务类型筛选项（label/value 结构，供前端 select 使用）
     *
     * @param string $appType 端：admin / site；为空返回全部类型（含扩展类型）
     * @return array
     */
    public static function getTypeOptions(string $appType = ''): array
    {
        $options = [];
        foreach (self::getTaskType($appType) as $value => $item) {
            $options[] = [ 'label' => (string) ( $item[ 'name' ] ?? $value ), 'value' => (string) $value ];
        }
        return $options;
    }

    /**
     * 任务状态筛选项（label/value 结构，供前端 select 使用）
     * 排除非持久化状态 STATUS_LOCKED（仅接口响应瞬态，不落库、不应筛选）
     * @return array
     */
    public static function getStatusOptions(): array
    {
        $list = [
            self::STATUS_CREATED        => '已创建',
            self::STATUS_RUNNING        => '执行中',
            self::STATUS_WAITING_INPUT  => '等待决策',
            self::STATUS_ROLLING_BACK   => '回滚中',
            self::STATUS_SUCCESS         => '成功',
            self::STATUS_FAILED          => '失败',
            self::STATUS_CANCELED        => '已取消',
            self::STATUS_ROLLED_BACK     => '已回滚',
            self::STATUS_ROLLBACK_FAILED => '回滚失败',
        ];
        $options = [];
        foreach ($list as $value => $label) {
            $options[] = [ 'label' => $label, 'value' => $value ];
        }
        return $options;
    }

    /**
     * 任务默认操作（各 Handler 可按场景裁剪/扩展）
     */
    public static function getAction(string $code): string
    {
        $list = [
            'retry'       => '重试',
            'continue'    => '继续',
            'cancel'      => '取消任务',
            'rollback'    => '回滚',
            'local_build' => '本地编译',
        ];
        return $list[ $code ] ?? $code;
    }
}
