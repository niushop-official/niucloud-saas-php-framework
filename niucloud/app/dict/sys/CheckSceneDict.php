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
 * 校验场景字典
 *
 * 场景化校验：业务方只声明「场景 + 业务参数」，校验项与执行顺序由本字典定义，
 * CoreCheckService 负责逐项执行并通过 SSE 实时推送过程。
 *
 * 校验项字段：
 * - key      校验项标识（前端按它更新状态）
 * - name     名称
 * - desc     说明（未执行时的提示文案）
 * - handler  CoreCheckService 中的检测方法名（check + ucfirst(handler)）
 * - required 是否必须通过（未通过 => 整体不通过，阻断下一步）
 * - suggest  修复建议（未通过时展示）
 *
 * suggest 支持两种形式：
 * - 字符串：固定文案
 * - 闭包：fn(array $params, CoreCheckService $service): string，按业务参数动态生成文案
 *   （如插件打包场景按待打包插件列出具体的编译命令）。闭包在 CoreCheckService 中解析，
 *   未绑定 $this 的闭包会被绑定到校验服务实例，可直接复用其辅助方法。
 *
 * 修复建议的取值优先级：检测方法返回结果中的 suggest > 本字典该项的 suggest。
 * 同一校验项可能有多种失败原因（如运行环境可能是版本低，也可能是缺扩展），
 * 检测方法可针对具体原因返回更精确的建议，未返回时回落到这里的通用建议 / 闭包。
 *
 * 注意：闭包形式的 suggest 只在检测结果（item 帧）中下发；清单接口（meta）不含业务参数，
 * 无法解析闭包，该字段下发空字符串，前端以 item 帧为准。
 */
class CheckSceneDict
{
    /** 云编译（发版 / 编译前） */
    const SCENE_CLOUD_BUILD = 'cloud_build';

    /** 系统升级（升级前） */
    const SCENE_UPGRADE = 'upgrade';

    /** 备份 / 恢复（执行前） */
    const SCENE_BACKUP = 'backup';

    /** 插件安装（安装前） */
    const SCENE_ADDON_INSTALL = 'addon_install';

    /** 插件卸载（卸载前） */
    const SCENE_ADDON_UNINSTALL = 'addon_uninstall';

    /** 插件打包（打包前，支持批量） */
    const SCENE_ADDON_BUILD = 'addon_build';

    /** 小程序模板库同步（上传代码前，按套餐逐个同步） */
    const SCENE_WEAPP_COMMIT = 'weapp_commit';

    /** 小程序发布（站点端上传代码到云端前） */
    const SCENE_WEAPP_UPLOAD = 'weapp_upload';

    /** 代码完整性校验（「文件差异」比对前） */
    const SCENE_INTEGRITY = 'integrity';

    /**
     * 校验项扩展事件名
     *
     * 业务方 / 插件监听该事件即可向任意场景追加校验项，无需改动本字典与 CoreCheckService。
     * 事件入参：['scene' => 场景标识]。
     */
    const EVENT_CHECK_SCENE = 'CheckScene';

    /**
     * 全部场景
     * @return array
     */
    public static function getSceneType(): array
    {
        return [
            self::SCENE_ADDON_BUILD => [
                'title' => '正在分析打包环境...',
                'tip'   => '将自动校验运行环境、插件源码与前端编译产物，通过后即可开始打包',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'addon_source', 'handler' => 'addonSource',
                        'name' => '插件源码', 'desc' => '检查待打包插件的源码目录是否存在', 'required' => 1,
                        'suggest' => '确认插件已安装且 niucloud/addon/ 下存在对应插件目录，源码缺失请重新放置后再打包'
                    ],
                    [
                        'key' => 'package_ext', 'handler' => 'packageExt',
                        'name' => '打包扩展', 'desc' => '检查 ZipArchive 压缩扩展是否可用', 'required' => 1,
                        'suggest' => '在 php.ini 中启用 zip 扩展（extension=zip），保存后重启 PHP 服务'
                    ],
                    [
                        'key' => 'build_dir_permission', 'handler' => 'addonBuildDirPermission',
                        'name' => '目录权限', 'desc' => '检查插件目录与 runtime 目录是否可写', 'required' => 1,
                        'suggest' => '将插件目录与 runtime 目录设置为可写：Linux 执行 chmod -R 755（或 777）并将属主改为 PHP 运行用户，Windows 去掉目录只读属性'
                    ],
                    [
                        'key' => 'addon_cloud_service', 'handler' => 'addonCloudService',
                        'name' => '云编译服务', 'desc' => '选择「先云编译」时校验云编译服务是否可连通', 'required' => 1,
                        'suggest' => '在「云端服务/授权配置」中填写授权码，或检查云编译服务地址是否可访问'
                    ],
                    [
                        'key' => 'addon_build_dist', 'handler' => 'addonBuildDist',
                        'name' => '前端编译产物', 'desc' => '检查 admin / wap 端是否已编译（选择云编译时跳过）', 'required' => 1,
                        // 按待打包插件生成具体的编译命令（闭包形式的 suggest 在检测结果中解析下发）
                        'suggest' => function (array $params): string {
                            $addon = $params[ 'addon' ] ?? '';
                            $list  = is_array($addon) ? $addon : explode(',', (string) $addon);
                            $list  = array_values(array_unique(array_filter(array_map(fn ($v) => trim((string) $v), $list))));
                            if (empty($list)) return '请指定要打包的插件后重新校验';

                            $addon = implode(' ', $addon);
                            $commands = [
                                "npm run build:addon {$addon}（admin 端）",
                                "npm run build:h5:addon {$addon}（uni-app 端）",
                                "npm run build:mp-weixin:addon {$addon}（uni-app 端）",
                            ];
                            return '请先在admin、uni-app目录下安装依赖（npm install），再依次执行：' . implode('、', $commands);
                        }
                    ],
                    [
                        'key' => 'uniapp_source', 'handler' => 'uniappSource',
                        'name' => 'uni-app 源码', 'desc' => '检查 pages.json 与语言包是否完整', 'required' => 1,
                        'suggest' => '补齐 uni-app/src/addon/{插件}/ 下的 pages.json 与 locale/zh-Hans.json、locale/en.json，并确认 JSON 格式合法（可用 JSON 校验工具检查）'
                    ],
                    [
                        'key' => 'disk_space', 'handler' => 'diskSpace',
                        'name' => '磁盘空间', 'desc' => '检查磁盘剩余空间是否充足', 'required' => 1,
                        'suggest' => '清理服务器磁盘（日志、历史备份、临时文件等），保证剩余空间在 2GB 以上'
                    ]
                ]
            ],
            self::SCENE_WEAPP_COMMIT => [
                'title' => '正在分析上传环境...',
                'tip'   => '将自动校验开放平台配置、套餐与站点协议，通过后即可开始同步模板库',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'oplatform_config', 'handler' => 'oplatformConfig',
                        'name' => '开放平台配置', 'desc' => '检查开发者小程序 AppID 与代码上传密钥', 'required' => 1,
                        'suggest' => '前往「微信开放平台」配置页填写开发者小程序 AppID，并在微信公众平台下载代码上传密钥，上传到后台'
                    ],
                    [
                        'key' => 'site_group', 'handler' => 'siteGroupExist',
                        'name' => '同步套餐', 'desc' => '检查待同步的套餐是否存在', 'required' => 1,
                        'suggest' => '先在「站点套餐管理」中创建套餐，或刷新页面后重新选择要同步的套餐'
                    ],
//                    [
//                        'key' => 'site_ssl', 'handler' => 'siteSsl',
//                        'name' => '站点协议', 'desc' => '微信代码上传要求站点启用 HTTPS', 'required' => 1,
//                        'suggest' => '为站点域名申请并部署 SSL 证书，使用 https:// 访问后台后再执行同步'
//                    ],
                    [
                        'key' => 'niucloud_site', 'handler' => 'niucloudSite',
                        'name' => '云端服务', 'desc' => '检查云端编译服务是否可达', 'required' => 1,
                        'suggest' => '检查服务器能否访问外网（DNS、防火墙、安全组），确认未拦截 niucloud 官网域名；代理环境请配置正确的代理后再重试'
                    ]
                ]
            ],

            self::SCENE_WEAPP_UPLOAD => [
                'title' => '正在分析发布环境...',
                'tip'   => '将自动校验运行环境、授权码与小程序配置，通过后即可开始发布',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'auth_code', 'handler' => 'authCode',
                        'name' => '云端授权', 'desc' => '检查云端服务授权码（小程序上传由云端编译）', 'required' => 1,
                        'suggest' => '前往「授权」页面绑定授权码后再发布小程序；未授权无法使用云端上传'
                    ],
                    [
                        'key' => 'weapp_config', 'handler' => 'weappConfig',
                        'name' => '小程序配置', 'desc' => '检查小程序 AppID 与代码上传密钥', 'required' => 1,
                        'suggest' => '前往「渠道 → 小程序 → 配置」填写小程序 AppID，并上传代码上传密钥文件'
                    ],
//                    [
//                        'key' => 'site_ssl', 'handler' => 'siteSsl',
//                        'name' => '站点协议', 'desc' => '微信代码上传要求站点启用 HTTPS', 'required' => 1,
//                        'suggest' => '为站点域名申请并部署 SSL 证书，使用 https:// 访问后台后再执行同步'
//                    ],
                    [
                        'key' => 'niucloud_site', 'handler' => 'niucloudSite',
                        'name' => '云端服务', 'desc' => '检查云端编译服务是否可达', 'required' => 1,
                        'suggest' => '检查服务器能否访问外网（DNS、防火墙、安全组），确认未拦截 niucloud 官网域名；代理环境请配置正确的代理后再重试'
                    ]
                ]
            ],

            self::SCENE_CLOUD_BUILD => [
                'title' => '正在分析编译环境...',
                'tip'   => '将自动校验运行环境、目录权限与打包扩展，通过后即可开始编译',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'source_dir', 'handler' => 'sourceDir',
                        'name' => '源码目录', 'desc' => '确认编译所需源码目录存在', 'required' => 1,
                        'suggest' => '重新下载或上传完整源码包，确认 admin、web、uni-app 目录均存在且未缺失文件'
                    ],
                    [
                        'key' => 'dir_permission', 'handler' => 'buildDirPermission',
                        'name' => '目录读写权限', 'desc' => '检查编译相关目录的读写权限', 'required' => 1,
                        'suggest' => '将提示中的目录设置为可读可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 去掉只读属性'
                    ],
                    [
                        'key' => 'package_ext', 'handler' => 'packageExt',
                        'name' => '打包扩展', 'desc' => '检查 ZipArchive 压缩扩展是否可用', 'required' => 1,
                        'suggest' => '在 php.ini 中启用 zip 扩展（extension=zip），保存后重启 PHP 服务'
                    ],
                    [
                        'key' => 'disk_space', 'handler' => 'diskSpace',
                        'name' => '磁盘空间', 'desc' => '检查编译与打包所需剩余空间', 'required' => 0,
                        'suggest' => '清理磁盘或扩容后再编译，建议保留 2GB 以上剩余空间'
                    ],
                    [
                        'key' => 'cloud_build_service', 'handler' => 'cloudBuildService',
                        'name' => '云编译服务', 'desc' => '检查云编译服务是否可连通', 'required' => 1,
                        'suggest' => '确认云编译服务已启动且地址可访问；使用本地编译服务时，请在后台「本地编译服务」配置中检查服务地址是否正确，并放行对应端口'
                    ],
                    [
                        'key' => 'niucloud_site', 'handler' => 'niucloudSite',
                        'name' => 'Niucloud官网连通性', 'desc' => '检查 niucloud 官网是否可连通', 'required' => 1,
                        'suggest' => '检查服务器外网连通性（DNS、防火墙、安全组），确认未拦截 niucloud 官网域名；代理环境请配置正确的代理后再重试'
                    ]
                ]
            ],
            self::SCENE_UPGRADE => [
                'title' => '正在分析升级环境...',
                'tip'   => '将自动校验运行环境、目录权限与备份空间，通过后即可开始升级',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'dir_permission', 'handler' => 'upgradeDirPermission',
                        'name' => '目录读写权限', 'desc' => '检查升级相关目录的读写权限', 'required' => 1,
                        'suggest' => '将提示中的目录设置为可读可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 去掉只读属性'
                    ],
                    [
                        'key' => 'disk_space', 'handler' => 'diskSpace',
                        'name' => '备份空间', 'desc' => '检查升级备份所需剩余空间', 'required' => 1,
                        'suggest' => '清理历史备份与日志文件，确保剩余空间足够存放本次升级备份（建议 2GB 以上）'
                    ],
                    [
                        'key' => 'cloud_service', 'handler' => 'cloudService',
                        'name' => '云端服务', 'desc' => '检查云端服务授权配置', 'required' => 0,
                        'suggest' => '在「云端服务/授权配置」中填写授权码以使用云端编译；无授权码也可忽略该项，系统将使用本地编译'
                    ],
                    [
                        'key' => 'niucloud_site', 'handler' => 'niucloudSite',
                        'name' => 'Niucloud官网连通性', 'desc' => '检查 niucloud 官网是否可连通（升级包下载依赖）', 'required' => 1,
                        'suggest' => '检查服务器外网连通性（DNS、防火墙、安全组），确保能访问 niucloud 官网以下载升级包；代理环境请配置正确的代理后再重试'
                    ]
                ]
            ],
            self::SCENE_INTEGRITY => [
                'title' => '正在分析校验环境...',
                'tip'   => '将自动校验检测目标（文件与目录）、目录权限与官网连通性，通过后即开始文件比对',
                'items' => [
                    [
                        'key' => 'niucloud_site', 'handler' => 'niucloudSite',
                        'name' => 'Niucloud官网连通性', 'desc' => '检查 niucloud 官网是否可连通（官方清单与文件内容下载依赖）', 'required' => 1,
                        'suggest' => '检查服务器外网连通性（DNS、防火墙、安全组），确保能访问 niucloud 官网以获取官方清单；代理环境请配置正确的代理后再重试'
                    ],
                    [
                        'key' => 'integrity_target', 'handler' => 'integrityTarget',
                        'name' => '检测目标', 'desc' => '检查待校验的文件与目录是否存在、是否可读', 'required' => 1,
                        'suggest' => '确认目标目录与文件存在，且 PHP 运行用户可读：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 取消目录只读属性；插件目标请先安装该插件'
                    ],
                    [
                        'key' => 'integrity_dir_permission', 'handler' => 'integrityDirPermission',
                        'name' => '校验目录权限', 'desc' => '检查清单缓存目录与写回备份目录是否可写', 'required' => 1,
                        'suggest' => '将提示中的目录设置为可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 取消目录只读属性'
                    ]
                ]
            ],
            self::SCENE_BACKUP => [
                'title' => '正在分析备份环境...',
                'tip'   => '将自动校验运行环境、目录权限与磁盘空间，通过后即可开始备份',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'dir_permission', 'handler' => 'backupDirPermission',
                        'name' => '目录读写权限', 'desc' => '检查备份相关目录的读写权限', 'required' => 1,
                        'suggest' => '将提示中的备份目录设置为可读可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 去掉只读属性'
                    ],
                    [
                        'key' => 'disk_space', 'handler' => 'diskSpace',
                        'name' => '磁盘空间', 'desc' => '检查备份所需剩余空间', 'required' => 1,
                        'suggest' => '清理磁盘或调整备份目录到空间充足的分区，建议保留 2GB 以上剩余空间'
                    ]
                ]
            ],
            self::SCENE_ADDON_INSTALL => [
                'title' => '正在分析插件安装环境...',
                'tip'   => '将自动校验运行环境、目录权限与插件兼容性，通过后即可安装',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'dir_permission', 'handler' => 'installDirPermission',
                        'name' => '目录读写权限', 'desc' => '检查插件安装相关目录的读写权限', 'required' => 1,
                        'suggest' => '将提示中的目录设置为可读可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 去掉只读属性'
                    ],
                    [
                        'key' => 'addon_compat', 'handler' => 'addonCompatibility',
                        'name' => '插件兼容性', 'desc' => '检查插件与当前框架版本是否兼容', 'required' => 1,
                        'suggest' => '将插件升级到与当前框架匹配的版本，或联系插件服务商获取适配版本后再安装'
                    ]
                ]
            ],
            self::SCENE_ADDON_UNINSTALL => [
                'title' => '正在分析插件卸载环境...',
                'tip'   => '将自动校验运行环境、套餐占用、源码打包条件与目录权限，通过后即可卸载',
                'items' => [
                    [
                        'key' => 'runtime_env', 'handler' => 'runtimeEnv',
                        'name' => '运行环境', 'desc' => '检查 PHP 版本与必要扩展', 'required' => 1,
                        'suggest' => '将 PHP 升级到 8.0 及以上，并在 php.ini 中开启 zip、pdo、curl、json、openssl 扩展后重启 PHP 服务'
                    ],
                    [
                        'key' => 'addon_in_use', 'handler' => 'addonInUse',
                        'name' => '套餐占用', 'desc' => '检查站点套餐中是否正在使用该插件', 'required' => 1,
                        'suggest' => '先在「站点套餐管理」中将该插件从相关套餐的应用/插件里移除，确认无站点使用后再卸载'
                    ],
                    [
                        'key' => 'package_ext', 'handler' => 'packageExt',
                        'name' => '打包扩展', 'desc' => '卸载前会备份插件源码包，检查 ZipArchive 压缩扩展是否可用', 'required' => 1,
                        'suggest' => '在 php.ini 中启用 zip 扩展（extension=zip），保存后重启 PHP 服务'
                    ],
                    [
                        'key' => 'addon_source', 'handler' => 'addonSource',
                        'name' => '插件源码', 'desc' => '检查待卸载插件的源码目录是否存在（卸载前打包备份依赖）', 'required' => 1,
                        'suggest' => '确认 niucloud/addon/ 下存在该插件目录；源码缺失时将无法完成卸载前的打包备份'
                    ],
                    [
                        'key' => 'dir_permission', 'handler' => 'uninstallDirPermission',
                        'name' => '目录读写权限', 'desc' => '检查插件卸载相关目录（含 runtime 打包暂存目录）的读写权限', 'required' => 1,
                        'suggest' => '将提示中的目录设置为可读可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 去掉只读属性'
                    ]
                ]
            ]
        ];
    }

    /**
     * 场景配置（内置校验项 + 事件扩展项）
     * @param string $scene
     * @return array 未定义时返回空数组
     */
    public static function getScene(string $scene): array
    {
        $conf = self::getSceneType()[ $scene ] ?? [];
        if (empty($conf)) return [];

        $conf[ 'items' ] = self::mergeItems($conf[ 'items' ] ?? [], self::eventItems($scene));

        return $conf;
    }

    // ==================== 事件扩展 ====================

    /**
     * 通过事件收集扩展校验项
     *
     * 监听者（handle 入参 ['scene' => 场景]）可返回以下任一形式：
     * 1. 校验项列表：作用于当前场景
     *    [ ['key' => 'x', 'name' => 'X', 'handler' => fn(array $params) => [...], 'required' => 1,
     *       'suggest' => '修复建议' 或 fn(array $params): string ] ]
     * 2. 包装形式：['items' => 校验项列表]
     * 3. 按场景分组：[self::SCENE_UPGRADE => 校验项列表, ...]，只取当前场景的部分
     * 4. 单个校验项：['key' => ..., 'handler' => ...]
     *
     * @param string $scene
     * @return array 已规范化的校验项列表
     */
    protected static function eventItems(string $scene): array
    {
        $items = [];

        foreach ((array) event(self::EVENT_CHECK_SCENE, [ 'scene' => $scene ]) as $contribution) {
            if (!is_array($contribution) || empty($contribution)) continue;

            if (isset($contribution[ 'items' ]) && is_array($contribution[ 'items' ])) {
                $list = $contribution[ 'items' ];
            } elseif (isset($contribution[ 'key' ])) {
                // 单个校验项
                $list = [ $contribution ];
            } elseif (array_is_list($contribution)) {
                $list = $contribution;
            } else {
                // 按场景分组
                $list = $contribution[ $scene ] ?? [];
            }

            if (!is_array($list)) continue;

            foreach ($list as $item) {
                if (!is_array($item)) continue;

                $normalized = self::normalizeItem($item);
                if ($normalized !== null) $items[] = $normalized;
            }
        }

        return $items;
    }

    /**
     * 规范化扩展校验项
     *
     * handler 支持两种形式：
     * - 闭包（推荐）：fn(array $params, CoreCheckService $service): array，返回 passed / message / details
     * - 方法名：CoreCheckService 中 check + ucfirst(handler) 对应的方法
     *
     * 定义不合法（缺 key、或 handler 不可执行）的项直接丢弃：
     * 单个扩展写错不应拖垮整轮校验，也不应让前端渲染出无意义的空项。
     *
     * @param array $item
     * @return array|null 不合法返回 null
     */
    protected static function normalizeItem(array $item): ?array
    {
        $key = (string) ( $item[ 'key' ] ?? '' );
        if ($key === '') return null;

        $handler = $item[ 'handler' ] ?? null;
        $callable = $handler instanceof \Closure
            || is_callable($handler)
            || ( is_string($handler) && trim($handler) !== '' );
        if (!$callable) return null;

        return [
            'key'      => $key,
            'name'     => (string) ( $item[ 'name' ] ?? $key ),
            'desc'     => (string) ( $item[ 'desc' ] ?? '' ),
            'handler'  => $handler,
            'required' => (int) ( $item[ 'required' ] ?? 1 ),
            // suggest 支持字符串与闭包两种形式，闭包原样保留，交由 CoreCheckService 按参数解析
            'suggest'  => $item[ 'suggest' ] ?? ''
        ];
    }

    /**
     * 合并内置项与扩展项
     *
     * 扩展项排在内置项之后；同 key 以扩展项为准，便于覆盖内置校验项。
     *
     * @param array $base 内置项
     * @param array $extend 扩展项
     * @return array
     */
    protected static function mergeItems(array $base, array $extend): array
    {
        if (empty($extend)) return array_values($base);

        $map = [];
        foreach ($base as $item) $map[ (string) ( $item[ 'key' ] ?? '' ) ] = $item;
        foreach ($extend as $item) $map[ (string) ( $item[ 'key' ] ?? '' ) ] = $item;

        return array_values(array_filter($map, fn ($key) => $key !== '', ARRAY_FILTER_USE_KEY));
    }
}
