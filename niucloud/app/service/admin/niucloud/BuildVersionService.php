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

namespace app\service\admin\niucloud;

use app\dict\sys\CloudBuildDict;
use app\model\sys\SysBuildVersion;
use app\service\core\niucloud\CoreBuildVersionService;
use app\service\core\niucloud\CoreCloudBuildService;
use core\base\BaseAdminService;
use core\exception\AdminException;

/**
 * 云编译发版记录服务（管理端）
 * 对外提供：端口列表（含最近发版记录）、版本分页、发布状态切换、删除
 */
class BuildVersionService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysBuildVersion();
    }

    /**
     * 版本记录分页
     * @param array $where port_key / version / release_status / page / limit
     * @return array
     */
    public function getPage(array $where = []): array
    {
        $field = 'id, task_key, port_key, port_name, version, remark, platform, browser, scope, release_status, artifact_count, artifact_size, create_time, complete_time';
        $order = 'id desc';

        $search_model = $this->model
            ->withSearch([ 'port_key', 'version', 'release_status' ], $where)
            ->where('site_id', self::currentSiteId())
            ->field($field)
            ->order($order)
            ->append([ 'release_status_name' ]);

        return $this->pageQuery($search_model);
    }

    /**
     * 编译端口列表（含端口说明与最近一次发版记录）
     * @return array
     */
    /**
     * 当前站点id（多商户隔离）
     * @return int
     */
    protected static function currentSiteId(): int
    {
        try {
            return (int) request()->siteId();
        } catch (\Throwable $e) {
            return 0;
        }
    }

    public function getPorts(): array
    {
        $lastMap = ( new CoreBuildVersionService() )->getLastVersionMap(self::currentSiteId());

        $ports = [];
        foreach (CloudBuildDict::getPortOptions() as $option) {
            $key   = (string) ( $option[ 'key' ] ?? '' );
            $scopes = CloudBuildDict::getPortSupportedScopes($key);

            $option[ 'desc' ]         = (string) ( $option[ 'desc' ] ?? '' );
            $option[ 'last_version' ] = $lastMap[ $key ] ?? null;
            // 该端口可选择的编译范围（长度为 1 时前端直接编译，不弹范围选择）
            $option[ 'scopes' ]        = $scopes;
            $option[ 'default_scope' ] = (string) ( $scopes[ 0 ][ 'value' ] ?? CloudBuildDict::SCOPE_ALL );
            // 各范围的编译命令（{root} 已替换为真实根目录），供前端悬停查看
            $option[ 'commands' ]      = CloudBuildDict::getPortCommands($key);
            $ports[] = $option;
        }

        // 自定义端口（插件自定义的前端产物端口）
        try {
            foreach (( new CoreCloudBuildService() )->getCustomPorts() as $option) {
                $key    = (string) ( $option[ 'key' ] ?? '' );
                $label  = (string) ( $option[ 'label' ] ?? $key );
                $scopes = CloudBuildDict::getPortSupportedScopes($key);

                $ports[] = [
                    'key'           => $key,
                    'label'         => $label,
                    'dir'           => (string) ( $option[ 'dir' ] ?? '' ),
                    'icon'          => (string) ( $option[ 'icon' ] ?? 'Box' ),
                    'color'         => (string) ( $option[ 'color' ] ?? '#f97316' ),
                    'desc'          => '插件自定义端口',
                    'last_version'  => $lastMap[ $key ] ?? null,
                    'scopes'        => $scopes,
                    'default_scope' => (string) ( $scopes[ 0 ][ 'value' ] ?? CloudBuildDict::SCOPE_CUSTOM ),
                    // 自定义端口的命令来自插件配置（port.command），不在标准命令模板内
                    'commands'      => CloudBuildDict::getPortCommands($key, (string) ( $option[ 'command' ] ?? '' ))
                ];
            }
        } catch (\Throwable $e) {
            // 自定义端口不可用时不影响标准端口
        }

        return $ports;
    }

    /**
     * 切换发布状态
     * @param int $id
     * @param int $releaseStatus 0未发布 / 1已发布
     * @return bool
     * @throws AdminException
     */
    public function setRelease(int $id, int $releaseStatus): bool
    {
        $info = $this->model->where([ [ 'id', '=', $id ] ])->findOrEmpty();
        if ($info->isEmpty()) throw new AdminException('BUILD_VERSION_NOT_EXIST');

        $info->save([ 'release_status' => $releaseStatus === 1 ? 1 : 0 ]);
        return true;
    }

    /**
     * 删除版本记录
     * @param string|array $ids
     * @return void
     */
    public function del($ids): void
    {
        $idList = is_array($ids) ? $ids : explode(',', (string) $ids);
        $idList = array_values(array_filter(array_map('intval', $idList)));
        if (empty($idList)) return;

        $this->model->where([ [ 'id', 'in', $idList ] ])->delete();
    }
}
