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

/**
 * 云编译命令字典
 * 编译范围 / 编译端口 / 编译命令模板 统一定义于此，供 cloud_compile 前端拉取渲染
 * 命令模板中的占位符：{root} = 站点根目录，{key} = 插件标识
 */
class CloudBuildDict
{
    // 编译范围
    public const SCOPE_ALL = 'all';
    public const SCOPE_FRAMEWORK = 'framework';
    public const SCOPE_PLUGIN = 'plugin';
    public const SCOPE_CUSTOM = 'custom';

    // 编译端口
    public const PORT_ADMIN = 'admin';
    public const PORT_H5 = 'h5';
    public const PORT_MP_WEIXIN = 'mp-weixin';
    public const PORT_WEB = 'web';

    /**
     * 编译范围
     * @return array
     */
    public static function getScopeOptions(): array
    {
        return [
            self::SCOPE_ALL => get_lang('dict_cloud_build.scope_all'),
            self::SCOPE_FRAMEWORK => get_lang('dict_cloud_build.scope_framework'),
            self::SCOPE_PLUGIN => get_lang('dict_cloud_build.scope_plugin'),
            self::SCOPE_CUSTOM => get_lang('dict_cloud_build.scope_custom'),
        ];
    }

    /**
     * 可编译的三端：管理端 / H5 / 微信小程序（目录不同，icon 为前端组件名，color 为主题色）
     * @return array
     */
    public static function getPortOptions(): array
    {
        return [
            [
                'key' => self::PORT_ADMIN,
                'label' => get_lang('dict_cloud_build.port_admin'),
                'dir' => 'admin',
                'icon' => 'Monitor',
                'color' => '#1677ff',
                'desc' => get_lang('dict_cloud_build.port_admin_desc'),
            ],
            [
                'key' => self::PORT_H5,
                'label' => get_lang('dict_cloud_build.port_h5'),
                'dir' => 'uni-app',
                'icon' => 'Iphone',
                'color' => '#22c55e',
                'desc' => get_lang('dict_cloud_build.port_h5_desc'),
            ],
            [
                'key' => self::PORT_MP_WEIXIN,
                'label' => get_lang('dict_cloud_build.port_mp_weixin'),
                'dir' => 'uni-app',
                'icon' => 'ChatDotRound',
                'color' => '#a855f7',
                'desc' => get_lang('dict_cloud_build.port_mp_weixin_desc'),
            ],
            [
                'key' => self::PORT_WEB,
                'label' => get_lang('dict_cloud_build.port_web'),
                'dir' => 'web',
                'icon' => 'Monitor',
                'color' => '#f97316',
                'desc' => get_lang('dict_cloud_build.port_web_desc'),
            ],
        ];
    }

    /**
     * 端口支持的编译范围
     *
     * 并非所有端口都能选范围：
     * - admin / h5 / mp-weixin：具备插件体系，支持 整体编译 / 仅框架 / 仅插件
     * - web：各范围的编译命令一致（不区分插件产物），无需选择，固定整体编译
     * - 自定义端口：走自定义端口编译流程（SCOPE_CUSTOM），固定该范围
     *
     * @param string $portKey 端口标识
     * @return array [['value','label','desc'], ...]
     */
    public static function getPortSupportedScopes(string $portKey): array
    {
        if (in_array($portKey, [ self::PORT_ADMIN, self::PORT_H5, self::PORT_MP_WEIXIN ], true)) {
            $scopes = [ self::SCOPE_ALL, self::SCOPE_FRAMEWORK, self::SCOPE_PLUGIN ];
        } elseif ($portKey === self::PORT_WEB) {
            $scopes = [ self::SCOPE_ALL ];
        } else {
            // 自定义端口
            $scopes = [ self::SCOPE_CUSTOM ];
        }

        $list = [];
        foreach ($scopes as $scope) {
            $list[] = [
                'value' => $scope,
                'label' => get_lang('dict_cloud_build.scope_' . $scope),
                'desc'  => get_lang('dict_cloud_build.scope_' . $scope . '_desc')
            ];
        }
        return $list;
    }

    /**
     * 各编译范围对应的命令模板：{root} = 编译根目录，{key} = 插件标识
     * @return array
     */
    public static function getPortTemplates(): array
    {
        return [
            self::SCOPE_ALL => [
                self::PORT_ADMIN => 'cd {root}/admin && npm i && npm run build',
                self::PORT_H5 => 'cd {root}/uni-app && npm i && npm run build:h5',
                self::PORT_MP_WEIXIN => 'cd {root}/uni-app && npm i && npm run build:mp-weixin',
                self::PORT_WEB => 'cd {root}/web && npm i && npm run generate',
            ],
            self::SCOPE_FRAMEWORK => [
                self::PORT_ADMIN => 'cd {root}/admin && npm i && npm run build:core',
                self::PORT_H5 => 'cd {root}/uni-app && npm i && npm run build:h5:core',
                self::PORT_MP_WEIXIN => 'cd {root}/uni-app && npm i && npm run build:mp-weixin:core',
                self::PORT_WEB => 'cd {root}/web && npm i && npm run generate',
            ],
            self::SCOPE_PLUGIN => [
                self::PORT_ADMIN => 'cd {root}/admin && npm i && npm run build:addon {key}',
                self::PORT_H5 => 'cd {root}/uni-app && npm i && npm run build:h5:addon {key}',
                self::PORT_MP_WEIXIN => 'cd {root}/uni-app && npm i && npm run build:mp-weixin:addon {key}',
                self::PORT_WEB => 'cd {root}/web && npm i && npm run generate',
            ],
        ];
    }

    /**
     * 某端口在各编译范围下的编译命令（供前端悬停展示）
     *
     * {root} 替换为真实根目录；{key} 说明性替换为「<插件标识>」（真实值在发起编译时按勾选回填）。
     * 自定义端口不在命令模板内，直接返回其自身命令。
     *
     * @param string $portKey 端口标识
     * @param string $customCommand 自定义端口命令（为空表示标准端口）
     * @return array [['scope','scope_label','command'], ...]
     */
    public static function getPortCommands(string $portKey, string $customCommand = ''): array
    {
        $root = rtrim(str_replace('\\', '/', dirname(root_path())), '/');

        if ($customCommand !== '') {
            return [ [
                'scope'       => self::SCOPE_CUSTOM,
                'scope_label' => get_lang('dict_cloud_build.scope_' . self::SCOPE_CUSTOM),
                'command'     => str_replace('{root}', $root, $customCommand)
            ] ];
        }

        $templates = self::getPortTemplates();
        $commands  = [];

        foreach (self::getPortSupportedScopes($portKey) as $scope) {
            $scopeValue = (string) ( $scope[ 'value' ] ?? '' );
            $tpl        = (string) ( $templates[ $scopeValue ][ $portKey ] ?? '' );
            if ($tpl === '') continue;

            // 同一端口不同范围命令相同时只保留一条（web 端口三范围一致）
            $command = str_replace([ '{root}', '{key}' ], [ $root, '<' . get_lang('dict_cloud_build.addon_key') . '>' ], $tpl);
            foreach ($commands as $exist) {
                if ($exist[ 'command' ] === $command) continue 2;
            }

            $commands[] = [
                'scope'       => $scopeValue,
                'scope_label' => (string) ( $scope[ 'label' ] ?? $scopeValue ),
                'command'     => $command
            ];
        }

        return $commands;
    }

    /**
     * 组装前端所需编译配置
     * 命令模板中的 {root} 在返回前替换为真实项目根目录（含 admin/uni-app 的上级目录），
     * {key}（插件标识）保留交由前端按勾选动态替换
     * @return array
     */
    public static function getBuildConfig(): array
    {
        $root = rtrim(str_replace('\\', '/', dirname(root_path())), '/');
        $templates = self::getPortTemplates();
        foreach ($templates as &$scopeTemplates) {
            foreach ($scopeTemplates as &$tpl) {
                $tpl = str_replace('{root}', $root, $tpl);
            }
            unset($scopeTemplates);
        }
        return [
            'scopeOptions' => self::getScopeOptions(),
            'portOptions' => self::getPortOptions(),
            'portTemplates' => $templates,
        ];
    }
}
