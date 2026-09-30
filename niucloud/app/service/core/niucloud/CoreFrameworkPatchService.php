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

use app\dict\notice\NoticeMessageDict;
use app\model\sys\FrameworkPatch;
use app\service\core\notice\CoreNoticeMessageService;
use core\base\BaseCoreService;
use think\facade\Db;
use think\facade\Log;

/**
 * 框架补丁服务（平台端）
 *
 * 补丁来源：云端 patch 接口（CoreModuleService::getPatch()）。
 * 拉取到的补丁**同时**做两件事：
 * 1. 落库到 sys_framework_patch（按云端补丁 ID 唯一，重复拉取只更新不新增）；
 * 2. 新补丁推送一条平台端站内信（已推送过的不再重复）。
 *
 * 「是否已解决」只是一个标记（is_resolved），由用户在补丁管理页手动标记，
 * 不影响补丁的推送与列表展示 —— 用户可以自己决定「收到过 / 处理完了」。
 */
class CoreFrameworkPatchService extends BaseCoreService
{
    /** 补丁消息归属站点：0 = 平台端 */
    const SITE_ID = 0;

    /**
     * 字段别名：云端返回字段可能改名，这里给出多套命名，按顺序取第一个非空值
     * （新接口调整时只需改这里）
     */
    const FIELD_ALIAS = [
        'patch_id'             => [ 'patch_id', 'id', 'patchId' ],
        'patch_no'             => [ 'patch_no', 'patchNo', 'no' ],
        'title'                => [ 'title', 'name' ],
        'description'          => [ 'description', 'desc', 'content', 'remark', 'intro' ],
        'attach_url'           => [ 'attach_url', 'attachUrl', 'url', 'download_url' ],
        'attach_name'          => [ 'attach_name', 'attachName', 'filename' ],
        'attach_size'          => [ 'attach_size', 'attachSize', 'size' ],
        'release_time'         => [ 'release_time', 'releaseTime', 'create_time', 'created_at' ],
        'framework_version_no' => [ 'version_no', 'framework_version_no', 'framework_version', 'version' ],
        'product_key'          => [ 'product_key', 'productKey' ],
        'status'               => [ 'status', 'state' ],
        'app_key'              => [ 'app_key', 'appKey' ],
        'app_id'               => [ 'app_id', 'appId' ],
    ];

    /** 框架在应用体系中的标识（云端按 app_key 区分框架与插件） */
    const FRAMEWORK_APP_KEY = 'niucloud-admin';

    /**
     * 同步云端补丁：入库 + 新补丁推送消息
     *
     * @return array [ total 本次拉取到的补丁数, new 新增补丁数 ]
     */
    public function sync(): array
    {
        $list = $this->fetchPatchList();

        $total = count($list);
        $new   = 0;

        foreach ($list as $patch) {
            $patchId = $this->pick($patch, 'patch_id');
            if ($patchId === '') continue; // 没有补丁标识无法去重，跳过

            $exists = ( new FrameworkPatch() )->where([ [ 'patch_id', '=', $patchId ] ])->findOrEmpty();

            // 应用上下文由分组节点带上（新接口：data[].patches）
            $appKey     = $this->pick($patch, 'app_key') ?: (string) ( $patch[ '_app_key' ] ?? '' );
            $appVersion = (string) ( $patch[ '_app_version' ] ?? '' );

            $data = [
                'patch_no'             => $this->pick($patch, 'patch_no'),
                'title'                => $this->pick($patch, 'title'),
                'description'          => $this->pick($patch, 'description'),
                'attach_url'           => $this->pick($patch, 'attach_url'),
                'attach_name'          => $this->pick($patch, 'attach_name'),
                'attach_size'          => $this->pick($patch, 'attach_size'),
                'release_time'         => $this->pick($patch, 'release_time'),
                'framework_version_no' => $this->pick($patch, 'framework_version_no') ?: $appVersion,
                'product_key'          => $this->pick($patch, 'product_key'),
                'status'               => $this->pick($patch, 'status'),
                'app_key'              => $appKey,
                'app_id'               => (int) $this->pick($patch, 'app_id'),
                'app_version'          => $appVersion,
                // 云端给的「该应用补丁是否已解决」只作参考，不覆盖用户本地标记
                'cloud_resolved'       => !empty($patch[ '_resolved' ]) ? 1 : 0,
                'update_time'          => time()
            ];

            if ($exists->isEmpty()) {
                $data[ 'patch_id' ]    = $patchId;
                $data[ 'create_time' ] = time();

                $record = ( new FrameworkPatch() )->create($data);
                $this->pushMessage($patch, (int) $record->id);
                $new++;
            } else {
                ( new FrameworkPatch() )->update($data, [ 'id' => $exists[ 'id' ] ]);
            }
        }

        return [ 'total' => $total, 'new' => $new ];
    }

    /**
     * 标记 / 取消标记「已解决」
     * @param int $id
     * @param int $resolved 1 已解决 / 0 未解决
     * @return void
     */
    public function resolve(int $id, int $resolved): void
    {
        // 只支持「未解决 -> 已解决」的单向标记：标记后不可取消，记录的是「已处理过」这一事实
        if ($resolved !== 1) return;

        $exists = ( new FrameworkPatch() )->where([ [ 'id', '=', $id ] ])->findOrEmpty();
        if ($exists->isEmpty()) return;
        if ((int) ( $exists[ 'is_resolved' ] ?? 0 ) === 1) return;

        $data = [
            'is_resolved'   => 1,
            'resolved_time' => time(),
            'update_time'   => time()
        ];

        ( new FrameworkPatch() )->update($data, [ 'id' => $id ]);
    }

    /**
     * 拉取云端补丁列表（已归一化）
     * @return array
     */
    protected function fetchPatchList(): array
    {
        try {
            $res = ( new CoreModuleService() )->getPatch($this->buildApps());
        } catch (\Throwable $e) {
            Log::write('CoreFrameworkPatchService 请求 patch 接口失败：' . $e->getMessage());
            return [];
        }

        if (!is_array($res)) return [];
        if (isset($res[ 'code' ]) && (int) $res[ 'code' ] !== 1) return [];

        $data = $res[ 'data' ] ?? $res;

        return $this->normalizeGroups($data);
    }

    /**
     * 归一化补丁列表
     *
     * 新接口按**应用分组**返回：data[] 每个节点是 { app_key, app_version, resolved, patches: [...] }，
     * 这里把它摊平成补丁列表，并把应用上下文（app_key / app_version / resolved）挂到每条补丁上，
     * 供入库与消息使用；若不是分组结构（旧接口 / 其它约定），退回扁平列表的兼容解析。
     *
     * @param mixed $data
     * @return array
     */
    protected function normalizeGroups($data): array
    {
        if (empty($data) || !is_array($data)) return [];

        $list = [];

        foreach ($data as $app) {
            if (!is_array($app)) continue;

            $patches = $app[ 'patches' ] ?? null;
            if (!is_array($patches)) continue;

            $appKey     = (string) ( $app[ 'app_key' ] ?? '' );
            $appVersion = (string) ( $app[ 'app_version' ] ?? '' );
            $resolved   = !empty($app[ 'resolved' ]);

            foreach ($patches as $patch) {
                if (!is_array($patch)) continue;

                $patch[ '_app_key' ]     = $appKey;
                $patch[ '_app_version' ] = $appVersion;
                $patch[ '_resolved' ]    = $resolved;
                $list[] = $patch;
            }
        }

        if (!empty($list)) return $list;

        // 兼容：扁平列表（可能包在 data / list / items 等容器里）
        foreach ([ 'data', 'list', 'items', 'rows', 'patches', 'patch_list' ] as $key) {
            if (isset($data[ $key ]) && is_array($data[ $key ]) && isset($data[ $key ][ 0 ])) {
                return array_values(array_filter($data[ $key ], 'is_array'));
            }
        }
        if (isset($data[ 0 ])) return array_values(array_filter($data, 'is_array'));

        return [ $data ];
    }

    /**
     * 本地应用清单（patch 接口的 apps 入参）
     *
     * 框架本身作为一个应用（app_key = niucloud-admin，版本取当前框架版本），
     * 再加上所有已启用的插件（addon.key + addon.version）。
     *
     * @return array [[ app_key, app_version ], ...]
     */
    protected function buildApps(): array
    {
        $apps = [
            [
                'app_key'     => self::FRAMEWORK_APP_KEY,
                'app_version' => (string) config('version.version')
            ]
        ];

        try {
            $addons = Db::name('addon')->where([ [ 'status', '=', 1 ] ])->field('key, version')->select()->toArray();

            foreach ($addons as $addon) {
                $key = (string) ( $addon[ 'key' ] ?? '' );
                if ($key === '') continue;

                $apps[] = [
                    'app_key'     => $key,
                    'app_version' => (string) ( $addon[ 'version' ] ?? '' )
                ];
            }
        } catch (\Throwable $e) {
            // 插件清单取不到不影响框架补丁的拉取
        }

        return $apps;
    }

    /**
     * 推送补丁站内信（平台端）
     * @param array $patch 云端原始补丁数据
     * @param int $recordId 本地补丁记录id（消息可据此跳转列表）
     * @return void
     */
    protected function pushMessage(array $patch, int $recordId): void
    {
        $key = (string) $this->pick($patch, 'patch_id');
        if ($key === '') $key = (string) $this->pick($patch, 'patch_no');

        try {
            ( new CoreNoticeMessageService() )->send(
                self::SITE_ID,
                NoticeMessageDict::ADMIN,
                $this->patchTitle($patch),
                $this->pick($patch, 'description'),
                NoticeMessageDict::OTHER,
                NoticeMessageDict::SYSTEM_NOTICE,
                NoticeMessageDict::LEVEL_INFO,
                [
                    'patch'      => $patch,
                    'record_id'  => $recordId,
                    'attach_url' => $this->pick($patch, 'attach_url'),
                ],
                'framework_patch_' . $key   // 同补丁去重
            );

            ( new FrameworkPatch() )->update([ 'is_push' => 1, 'update_time' => time() ], [ 'id' => $recordId ]);
        } catch (\Throwable $e) {
            Log::write('CoreFrameworkPatchService 推送补丁消息失败：' . $e->getMessage());
        }
    }

    /**
     * 补丁消息标题：补丁号 + 标题
     * @param array $patch
     * @return string
     */
    protected function patchTitle(array $patch): string
    {
        $patchNo = $this->pick($patch, 'patch_no');
        $title   = $this->pick($patch, 'title');
        if ($title === '') $title = '框架补丁更新';

        return $patchNo !== '' ? "补丁 {$patchNo}：{$title}" : $title;
    }

    /**
     * 按别名取值：返回第一个非空值的字符串形式
     * @param array $patch
     * @param string $field
     * @return string
     */
    protected function pick(array $patch, string $field): string
    {
        foreach (self::FIELD_ALIAS[ $field ] ?? [ $field ] as $name) {
            $value = $patch[ $name ] ?? '';
            if (is_array($value) || is_object($value)) continue;
            if ($value === '' || $value === null) continue;

            return (string) $value;
        }

        return '';
    }
}
