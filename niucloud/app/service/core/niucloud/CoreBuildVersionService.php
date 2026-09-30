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

namespace app\service\core\niucloud;

use app\dict\sys\CloudBuildDict;
use app\model\sys\SysBuildVersion;
use core\base\BaseCoreService;
use core\task\TaskExecutor;
use core\util\ArtifactScanner;

/**
 * 云编译发版记录核心服务
 *
 * 发版与普通云编译的差异只有一点：发版在任务上带版本信息（version/remark），
 * 编译成功后由这里落一条版本记录；普通云编译不写记录。
 */
class CoreBuildVersionService extends BaseCoreService
{
    protected $model;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysBuildVersion();
    }

    /**
     * 编译成功后写入版本记录（幂等：同一任务只落一条）
     *
     * @param string $taskKey 云编译任务标识
     * @return int 新增记录 id；非发版任务 / 已存在时返回 0
     */
    public function record(string $taskKey): int
    {
        $taskKey = trim($taskKey);
        if ($taskKey === '') return 0;

        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) return 0;

        // 任务入参在部分场景下是 JSON 字符串（模型 json 字段是否解析取决于读取方式），这里统一兼容
        $params = $task[ 'params' ] ?? [];
        if (is_string($params)) $params = json_decode($params, true);
        if (!is_array($params)) $params = [];

        $version = trim((string) ( $params[ 'version' ] ?? '' ));
        // 无版本信息 => 普通云编译，不写版本记录
        if ($version === '') return 0;

        // 幂等：success 分支会被多轮轮询命中，已记录则直接返回
        $exists = $this->model->where([ [ 'task_key', '=', $taskKey ] ])->value('id');
        if (!empty($exists)) return (int) $exists;

        $ports   = (array) ( $params[ 'port' ] ?? [] );
        $portKey = (string) ( $ports[ 0 ] ?? '' );

        // 产物统计（任务目录可能已被清理，统计失败不影响记录写入）
        $artifact = [ 'files' => 0, 'size' => 0 ];
        try {
            $dir = ( new CoreCloudBuildService() )->getTaskDir($taskKey);
            if ($dir !== '' && is_dir($dir . 'download')) {
                $node     = ArtifactScanner::scan($dir . 'download', 0);
                $artifact = [ 'files' => (int) $node[ 'files' ], 'size' => (int) $node[ 'size' ] ];
            }
        } catch (\Throwable $e) {
            // 忽略
        }

        $now = time();
        return (int) $this->model->create([
            // 版本记录与任务同属一个站点
            'site_id'        => (int) ( $task[ 'site_id' ] ?? 0 ),
            'task_key'       => $taskKey,
            'port_key'       => $portKey,
            'port_name'      => $this->portName($portKey),
            'version'        => $version,
            'remark'         => (string) ( $params[ 'remark' ] ?? '' ),
            'platform'       => (string) ( $params[ 'platform' ] ?? '' ),
            'browser'        => (string) ( $params[ 'browser' ] ?? '' ),
            'scope'          => (string) ( $params[ 'scope' ] ?? '' ),
            // 构建完成后默认「未发布」，由用户在版本管理里手动发布
            'release_status' => 0,
            'artifact_count' => $artifact[ 'files' ],
            'artifact_size'  => $artifact[ 'size' ],
            'create_time'    => (int) ( $task[ 'create_time' ] ?? $now ),
            'complete_time'  => $now
        ])->getKey();
    }

    /**
     * 各端口最近一次发版记录：port_key => 记录
     * @param int|null $siteId 站点id（多商户隔离，null 表示不过滤）
     * @return array
     */
    public function getLastVersionMap(?int $siteId = null): array
    {
        $query = $this->model->field('id, port_key, port_name, version, remark, release_status, create_time, complete_time');
        if ($siteId !== null) $query = $query->where('site_id', $siteId);

        $list = $query->order('id desc')->select()->toArray();

        $map = [];
        foreach ($list as $item) {
            $key = (string) $item[ 'port_key' ];
            if ($key === '' || isset($map[ $key ])) continue;
            $map[ $key ] = $item;
        }
        return $map;
    }

    /**
     * 端口展示名（未知端口回退为原标识）
     * @param string $portKey
     * @return string
     */
    public function portName(string $portKey): string
    {
        if ($portKey === '') return '';

        foreach (CloudBuildDict::getPortOptions() as $option) {
            if ((string) ( $option[ 'key' ] ?? '' ) === $portKey) return (string) ( $option[ 'label' ] ?? $portKey );
        }

        // 自定义端口：取端口配置里的标题
        try {
            foreach (( new CoreCloudBuildService() )->getCustomPorts() as $option) {
                if ((string) ( $option[ 'key' ] ?? '' ) === $portKey) return (string) ( $option[ 'label' ] ?? $portKey );
            }
        } catch (\Throwable $e) {
            // 忽略
        }

        return $portKey;
    }
}
