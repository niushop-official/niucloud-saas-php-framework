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

namespace app\service\core\check;

use app\dict\sys\CheckSceneDict;
use app\dict\sys\CloudDict;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\weapp\WeappVersion;
use app\service\admin\addon\AddonService;
use app\service\admin\upgrade\BackupRecordsService;
use app\service\admin\upgrade\UpgradeService;
use app\service\core\niucloud\CoreCloudBuildService;
use app\service\core\niucloud\CoreModuleService;
use app\service\core\niucloud\CoreNiucloudConfigService;
use app\service\core\sys\CoreConfigService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wxoplatform\CoreOplatformConfigService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use core\integrity\CodeIntegrityChecker;
use core\util\niucloud\CloudService;

/**
 * 通用校验服务
 *
 * 一次校验 = 按场景定义逐项执行检测，每项执行前后都能通过回调实时推送，
 * 供 SSE 接口把「校验过程」实时下发到前端。
 *
 * 单项检测方法命名：check + ucfirst(handler)，返回：
 *   [ 'passed' => bool, 'message' => string, 'details' => array ]
 */
class CoreCheckService extends BaseCoreService
{
    /** 磁盘空间最低要求（字节），低于此值视为不通过 */
    const MIN_DISK_SPACE = 2147483648; // 2GB

    /** 连通性检测：连接超时（秒） */
    const CONNECT_TIMEOUT = 5.0;

    /** 连通性检测：请求总超时（秒） */
    const REQUEST_TIMEOUT = 8.0;

    /** 插件检测结果缓存（同一场景内多个检测项共用一次检测结果） */
    protected array $addonCheckCache = [];

    /**
     * 场景校验清单（只下发待检测项，不执行检测）
     *
     * 前端据此先渲染出完整的「待校验清单」，再连接 SSE 逐项接收检测结果，
     * 避免等待首帧期间列表空白、或清单到达时列表突然出现的观感。
     *
     * @param string $scene
     * @return array
     * @throws CommonException
     */
    public function meta(string $scene): array
    {
        $conf = CheckSceneDict::getScene($scene);
        if (empty($conf)) throw new CommonException('CHECK_SCENE_NOT_EXIST');

        return [
            'scene' => $scene,
            'title' => (string) ( $conf[ 'title' ] ?? '正在校验...' ),
            'tip'   => (string) ( $conf[ 'tip' ] ?? '' ),
            'items' => $this->formatItems($conf)
        ];
    }

    /**
     * 场景校验清单（统一字段口径）
     * @param array $conf
     * @return array
     */
    protected function formatItems(array $conf): array
    {
        return array_map(fn (array $item) => [
            'key'      => (string) ( $item[ 'key' ] ?? '' ),
            'name'     => (string) ( $item[ 'name' ] ?? ( $item[ 'key' ] ?? '' ) ),
            'desc'     => (string) ( $item[ 'desc' ] ?? '' ),
            'required' => (int) ( $item[ 'required' ] ?? 1 ),
            // 清单接口不带业务参数，闭包形式的建议无法在这里解析，留空由检测结果（item 帧）下发
            'suggest'  => ( $item[ 'suggest' ] ?? '' ) instanceof \Closure ? '' : (string) ( $item[ 'suggest' ] ?? '' )
        ], array_values($conf[ 'items' ] ?? []));
    }

    /**
     * 解析修复建议
     *
     * 支持两种形式：
     * - 字符串：直接使用
     * - 闭包：fn(array $params, CoreCheckService $service): string，按业务参数生成文案。
     *   未绑定对象的闭包绑定到本服务实例，使其可复用 isDistReady / formatSize 等辅助方法。
     *
     * 解析失败（闭包抛异常）不影响校验结果，返回空串由前端降级为不展示建议。
     *
     * @param mixed $suggest
     * @param array $params
     * @return string
     */
    protected function resolveSuggest($suggest, array $params): string
    {
        if ($suggest instanceof \Closure) {
            try {
                if (( new \ReflectionFunction($suggest) )->getClosureThis() === null) {
                    $suggest = \Closure::bind($suggest, $this, self::class) ?? $suggest;
                }

                return trim((string) $suggest($params, $this));
            } catch (\Throwable $e) {
                return '';
            }
        }

        return is_string($suggest) ? trim($suggest) : '';
    }

    /**
     * 校验项的最终修复建议
     *
     * 优先级：检测方法返回的建议 > 字典配置的建议。
     * 检测方法可能只给出与具体失败原因相关的建议，为空时回落到字典（可能是闭包，按参数动态生成）。
     *
     * @param array $check 检测方法返回
     * @param array $item 校验项定义
     * @param array $params 业务参数
     * @return string
     */
    protected function suggestOf(array $check, array $item, array $params): string
    {
        $suggest = $this->resolveSuggest($check[ 'suggest' ] ?? '', $params);
        if ($suggest !== '') return $suggest;

        return $this->resolveSuggest($item[ 'suggest' ] ?? '', $params);
    }

    /**
     * 逐项校验并实时推送
     *
     * @param string $scene 场景（CheckSceneDict::SCENE_*）
     * @param array $params 业务参数（如升级场景的 addon）
     * @param callable $push fn(string $event, array $data): bool 返回 false 表示连接已断开
     * @return array ['passed' => bool, 'failed' => array, 'items' => array]
     * @throws CommonException
     */
    public function stream(string $scene, array $params, callable $push): array
    {
        $conf = CheckSceneDict::getScene($scene);
        if (empty($conf)) throw new CommonException('CHECK_SCENE_NOT_EXIST');

        $items = array_values($conf[ 'items' ] ?? []);

        // 先下发清单：与 meta() 同一口径（前端通常已提前拿到，这里用于对齐最新定义）
        $push('meta', $this->meta($scene));

        $passed = true;
        $failed = [];
        $result = [];

        foreach ($items as $item) {
            $key = (string) ( $item[ 'key' ] ?? '' );
            if ($key === '') continue;

            // 开始：通知前端切到「校验中」
            if (!$push('item', [ 'key' => $key, 'status' => 'running' ])) break;

            try {
                // handler 可能是闭包（事件扩展），不能强转字符串
                $check = $this->execute($item[ 'handler' ] ?? '', $params);
            } catch (\Throwable $e) {
                // 单个校验项异常不应中断整轮校验，转换为「未通过 + 原因」
                $check = [ 'passed' => false, 'message' => $e->getMessage() ];
            }

            $status = !empty($check[ 'passed' ]) ? 'passed' : 'failed';
            if ($status === 'failed' && (int) ( $item[ 'required' ] ?? 1 ) === 1) {
                $passed = false;
                $failed[] = $key;
            }

            // 单项结果自带口径字段（name / desc）：降级通道 run() 直接回传这些行，
            // 若缺 name 前端只能退回英文 key，故这里与 meta() 保持同一口径。
            // suggest：检测方法可按具体失败原因给出更精确的建议，未提供时回落到字典配置的通用建议
            $row = [
                'key'      => $key,
                'name'     => (string) ( $item[ 'name' ] ?? $key ),
                'desc'     => (string) ( $item[ 'desc' ] ?? '' ),
                'status'   => $status,
                'message'  => (string) ( $check[ 'message' ] ?? '' ),
                'details'  => array_values((array) ( $check[ 'details' ] ?? [] )),
                'required' => (int) ( $item[ 'required' ] ?? 1 ),
                'suggest'  => $this->suggestOf($check, $item, $params)
            ];
            $result[ $key ] = $row;

            if (!$push('item', $row)) break;
        }

        $push('done', [ 'passed' => $passed, 'failed' => $failed ]);

        return [ 'passed' => $passed, 'failed' => $failed, 'items' => array_values($result) ];
    }

    /**
     * 一次性校验（SSE 不可用时的降级通道）
     *
     * @param string $scene
     * @param array $params
     * @return array
     * @throws CommonException
     */
    public function run(string $scene, array $params): array
    {
        $meta  = [];
        $items = [];
        $done  = [];

        $this->stream($scene, $params, function (string $event, array $data) use (&$meta, &$items, &$done) {
            if ($event === 'meta') $meta = $data;
            elseif ($event === 'item' && isset($data[ 'status' ]) && $data[ 'status' ] !== 'running') $items[ $data[ 'key' ] ] = $data;
            elseif ($event === 'done') $done = $data;
            return true;
        });

        return [
            'title'  => (string) ( $meta[ 'title' ] ?? '' ),
            'tip'    => (string) ( $meta[ 'tip' ] ?? '' ),
            'passed' => !empty($done[ 'passed' ]),
            'failed' => $done[ 'failed' ] ?? [],
            'items'  => array_values($items)
        ];
    }

    // ==================== 单项检测 ====================

    /**
     * 执行单项检测
     *
     * handler 支持三种形式（事件扩展主要用闭包）：
     * - 闭包：fn(array $params, self $service): array
     * - 方法名：本服务中 check + ucfirst(handler) 对应的方法
     * - 其他可调用结构：[对象, '方法名'] 等
     *
     * @param mixed $handler
     * @param array $params
     * @return array
     * @throws CommonException
     */
    protected function execute($handler, array $params): array
    {
        // 闭包：事件扩展的主要形式
        if ($handler instanceof \Closure) {
            // 未绑定对象的闭包绑定到本服务，使其可复用 formatDirCheck / formatSize 等辅助方法；
            // 已绑定（如定义在监听类内部）的闭包保持原作用域，避免改写其 $this 语义
            if (( new \ReflectionFunction($handler) )->getClosureThis() === null) {
                $handler = \Closure::bind($handler, $this, self::class) ?? $handler;
            }

            return (array) $handler($params, $this);
        }

        // 方法名：内置校验项
        if (is_string($handler)) {
            $handler = trim($handler);
            if ($handler === '') throw new CommonException('CHECK_HANDLER_NOT_EXIST');

            $method = 'check' . ucfirst($handler);
            if (!method_exists($this, $method)) throw new CommonException('CHECK_HANDLER_NOT_EXIST');

            return (array) $this->$method($params);
        }

        // 其他可调用结构
        if (is_callable($handler)) {
            return (array) $handler($params, $this);
        }

        throw new CommonException('CHECK_HANDLER_NOT_EXIST');
    }

    /**
     * 运行环境：PHP 版本 + 必要扩展
     * @param array $params
     * @return array
     */
    protected function checkRuntimeEnv(array $params): array
    {
        if (version_compare(PHP_VERSION, '8.0.0', '<')) {
            return [
                'passed'  => false,
                'message' => 'PHP 版本过低（当前 ' . PHP_VERSION . '，需要 8.0 及以上）',
                'suggest' => '请将 PHP 升级到 8.0 及以上版本，并在面板/服务中切换站点使用的 PHP 版本后重启服务'
            ];
        }

        // 关键扩展：缺失直接判定不通过
        $required = [ 'zip', 'pdo', 'curl', 'json', 'openssl' ];
        $missing  = [];
        foreach ($required as $ext) {
            if (!extension_loaded($ext)) $missing[] = $ext;
        }

        if (!empty($missing)) {
            return [
                'passed'  => false,
                'message' => '缺少必要扩展：' . implode('、', $missing),
                'suggest' => '在 php.ini 中开启缺失的扩展（' . implode('、', $missing) . '），保存后重启 PHP 服务；宝塔/小皮面板可在「PHP 设置 → 扩展」中直接勾选安装'
            ];
        }

        // 建议扩展：缺失仅提示，不影响校验结果（不同运行环境加载的扩展可能不同）
        $suggest  = [ 'mbstring', 'fileinfo', 'gd' ];
        $absent   = [];
        foreach ($suggest as $ext) {
            if (!extension_loaded($ext)) $absent[] = $ext;
        }

        $message = 'PHP ' . PHP_VERSION . '，必要扩展齐全';
        if (!empty($absent)) $message .= '（建议开启：' . implode('、', $absent) . '）';

        return [ 'passed' => true, 'message' => $message ];
    }

    /**
     * 源码目录：编译所需目录是否齐全
     * @param array $params
     * @return array
     */
    protected function checkSourceDir(array $params): array
    {
        $required = [ 'admin', 'web', 'uni-app' ];
        $missing  = [];
        foreach ($required as $dir) {
            if (!is_dir(project_path() . $dir)) $missing[] = $dir;
        }

        if (!empty($missing)) {
            return [
                'passed'  => false,
                'message' => '缺少源码目录：' . implode('、', $missing),
                'details' => $missing,
                'suggest' => '请重新上传完整源码包，补齐缺失的目录：' . implode('、', $missing)
            ];
        }

        return [ 'passed' => true, 'message' => '源码目录齐全：' . implode(' / ', $required) ];
    }

    /**
     * 云编译相关目录的读写权限（复用编译前环境检测）
     * @param array $params
     * @return array
     */
    protected function checkBuildDirPermission(array $params): array
    {
        $data = (new CoreCloudBuildService())->buildPreCheck();

        return $this->formatDirCheck($data, '编译相关目录读写权限正常');
    }

    /**
     * 升级相关目录的读写权限（复用升级前环境检测）
     * @param array $params
     * @return array
     */
    protected function checkUpgradeDirPermission(array $params): array
    {
        $data = (new UpgradeService())->upgradePreCheck((string) ( $params[ 'addon' ] ?? '' ));

        return $this->formatDirCheck($data, '升级相关目录读写权限正常');
    }

    /**
     * 插件安装：目录读写权限
     * @param array $params
     * @return array
     */
    protected function checkInstallDirPermission(array $params): array
    {
        $data = $this->addonInstallCheck($params);

        // 安装检测整体不可用（如目录不存在导致服务抛异常）：单独说明原因
        if (!empty($data[ 'error' ])) {
            return [ 'passed' => false, 'message' => '插件安装检测未通过：' . (string) $data[ 'error' ] ];
        }

        return $this->formatDirCheck($data, '插件安装相关目录读写权限正常');
    }

    /**
     * 套餐占用：站点套餐中是否正在使用该插件（在用则不允许卸载）
     *
     * 与 CoreAddonInstallService::uninstall() 的前置判断同口径：
     * 套餐（SiteGroup）的 app / addon 字段中登记了该插件，且套餐下存在站点 => 不允许卸载。
     *
     * @param array $params
     * @return array
     */
    protected function checkAddonInUse(array $params): array
    {
        $addon = (string) ( $params[ 'addon' ] ?? '' );
        if ($addon === '') return [ 'passed' => false, 'message' => '缺少插件标识' ];

        try {
            // 套餐的 app / addon 字段为 JSON 数组，按带引号的插件键模糊匹配
            $groups = ( new SiteGroup() )->where([ [ 'app|addon', 'like', "%\"{$addon}\"%" ] ])->column('group_id');

            if (empty($groups)) {
                return [ 'passed' => true, 'message' => '站点套餐中未使用该插件' ];
            }

            $siteNum = ( new Site() )->where([ [ 'group_id', 'in', $groups ] ])->count('site_id');

            if ($siteNum <= 0) {
                return [ 'passed' => true, 'message' => '站点套餐中未使用该插件' ];
            }

            $names = ( new SiteGroup() )->where([ [ 'group_id', 'in', $groups ] ])->column('group_name');

            return [
                'passed'  => false,
                'message' => "该插件正在被 {$siteNum} 个站点使用（涉及 " . count($groups) . " 个套餐），请先在套餐中移除后再卸载",
                'details' => array_values(array_filter(array_map(fn ($name) => (string) $name, (array) $names))),
                'suggest' => '进入「站点 → 站点套餐」，编辑上方列出的套餐，在应用/插件中取消勾选该插件并保存，确认无站点使用后再卸载'
            ];
        } catch (\Throwable $e) {
            return [ 'passed' => false, 'message' => '套餐占用检测失败：' . $e->getMessage() ];
        }
    }

    /**
     * 插件卸载：目录读写权限
     * @param array $params
     * @return array
     */
    protected function checkUninstallDirPermission(array $params): array
    {
        try {
            $data = ( new AddonService() )->uninstallCheck((string) ( $params[ 'addon' ] ?? '' ));
        } catch (\Throwable $e) {
            return [ 'passed' => false, 'message' => '插件卸载检测未通过：' . $e->getMessage() ];
        }

        return $this->formatDirCheck(is_array($data) ? $data : [], '插件卸载相关目录读写权限正常');
    }

    /**
     * 插件兼容性：版本是否支持当前框架（取自安装检测的 addon_check）
     * @param array $params
     * @return array
     */
    protected function checkAddonCompatibility(array $params): array
    {
        $data = $this->addonInstallCheck($params);

        // 安装检测整体不可用时，兼容性无从判断：说明原因而非直接判通过
        if (!empty($data[ 'error' ])) {
            return [ 'passed' => false, 'message' => '插件兼容性无法校验：' . (string) $data[ 'error' ] ];
        }

        $items = (array) ( $data[ 'addon_check' ] ?? [] );

        if (empty($items)) {
            return [ 'passed' => true, 'message' => '插件与当前框架版本兼容' ];
        }

        $messages = [];
        foreach ($items as $item) {
            if (empty($item[ 'status' ])) $messages[] = strip_tags((string) ( $item[ 'msg' ] ?? '' ));
        }

        if (empty($messages)) {
            return [ 'passed' => true, 'message' => '插件与当前框架版本兼容' ];
        }

        return [
            'passed'  => false,
            'message' => empty($data[ 'is_pass' ]) ? '插件校验未通过' : '插件校验存在提示',
            'details' => array_values(array_filter($messages)),
            'suggest' => '按上方提示处理（常见为插件支持的框架版本与当前版本不一致）：将插件或框架升级到互相匹配的版本后再安装'
        ];
    }

    /**
     * 安装检测结果（一次场景内复用，避免重复执行同一套检测）
     * @param array $params
     * @return array
     */
    protected function addonInstallCheck(array $params): array
    {
        $addon = (string) ( $params[ 'addon' ] ?? '' );
        if ($addon === '') return [];

        if (!isset($this->addonCheckCache[ $addon ])) {
            try {
                $data = ( new AddonService() )->installCheck($addon);
                $this->addonCheckCache[ $addon ] = is_array($data) ? $data : [];
            } catch (\Throwable $e) {
                // 缓存异常原因：同一场景下的多个检测项共用一次结果，避免重复执行与重复报错
                $this->addonCheckCache[ $addon ] = [ 'is_pass' => false, 'error' => $e->getMessage() ];
            }
        }

        return $this->addonCheckCache[ $addon ];
    }

    /**
     * 备份相关目录的读写权限（复用备份服务的目录权限检测）
     * @param array $params
     * @return array
     */
    protected function checkBackupDirPermission(array $params): array
    {
        $data = ( new BackupRecordsService() )->checkPermission();

        return $this->formatDirCheck(is_array($data) ? $data : [], '备份相关目录读写权限正常');
    }

    /**
     * 打包扩展：ZipArchive
     * @param array $params
     * @return array
     */
    protected function checkPackageExt(array $params): array
    {
        if (!class_exists('ZipArchive')) {
            return [
                'passed'  => false,
                'message' => '缺少 ZipArchive 扩展，无法打包源码',
                'suggest' => '在 php.ini 中启用 zip 扩展（extension=zip），保存后重启 PHP 服务'
            ];
        }

        return [ 'passed' => true, 'message' => 'ZipArchive 扩展可用' ];
    }

    // ==================== 小程序模板库同步 ====================

    /**
     * 开放平台配置：开发者小程序 AppID 与代码上传密钥
     *
     * 与 CoreWeappCloudService::uploadWeapp() 的前置判断同口径：
     * 这几项缺失会在上传阶段直接抛异常，提前校验可避免任务跑到一半才失败。
     *
     * @param array $params
     * @return array
     */
    protected function checkOplatformConfig(array $params): array
    {
        try {
            $config = ( new CoreOplatformConfigService() )->getConfig();
        } catch (\Throwable $e) {
            return [ 'passed' => false, 'message' => '开放平台配置读取失败：' . $e->getMessage() ];
        }

        if ((string) ( $config[ 'develop_app_id' ] ?? '' ) === '') {
            return [
                'passed'  => false,
                'message' => '未配置开发者小程序 AppID，无法上传代码',
                'suggest' => '前往「微信开放平台 → 配置」填写开发者小程序 AppID（在微信公众平台「开发管理 → 开发设置」中获取）'
            ];
        }

        $key = (string) ( $config[ 'develop_upload_private_key' ] ?? '' );
        if ($key === '') {
            return [
                'passed'  => false,
                'message' => '未配置小程序代码上传密钥',
                'suggest' => '在微信公众平台「开发管理 → 开发设置 → 小程序代码上传」生成密钥，并在开放平台配置页上传该密钥文件'
            ];
        }

        // 上传用的是 public_path() 下的密钥文件，配置里存的只是相对路径
        $keyFile = public_path() . $key;
        if (!is_file($keyFile) || !is_readable($keyFile)) {
            return [
                'passed'  => false,
                'message' => '上传密钥文件不存在或不可读：' . $key,
                'suggest' => '重新上传代码上传密钥文件，确认其保存在 public 目录下的 ' . $key . ' 且文件可读'
            ];
        }

        return [ 'passed' => true, 'message' => '开放平台配置完整' ];
    }

    /**
     * 待同步的套餐是否存在
     * @param array $params
     * @return array
     */
    protected function checkSiteGroupExist(array $params): array
    {
        $groupId = (int) ( $params[ 'site_group_id' ] ?? 0 );

        try {
            if ($groupId > 0) {
                $exists = ( new SiteGroup() )->where([ [ 'group_id', '=', $groupId ] ])->count();
                if ($exists <= 0) return [
                    'passed'  => false,
                    'message' => '指定的套餐不存在',
                    'suggest' => '该套餐可能已被删除，请刷新页面后重新选择要同步的套餐'
                ];

                return [ 'passed' => true, 'message' => '套餐存在' ];
            }

            // 未指定套餐即「一键同步」：同步全部套餐
            $count = ( new SiteGroup() )->count();
            if ($count <= 0) return [
                'passed'  => false,
                'message' => '尚未创建任何套餐，请先添加套餐',
                'suggest' => '先在「站点 → 站点套餐」中添加套餐并绑定站点，再执行同步'
            ];

            return [ 'passed' => true, 'message' => '待同步套餐 ' . $count . ' 个' ];
        } catch (\Throwable $e) {
            return [ 'passed' => false, 'message' => '套餐检测失败：' . $e->getMessage() ];
        }
    }

    /**
     * 站点是否启用 HTTPS
     *
     * 微信代码上传要求站点为 https（CoreWeappCloudService::uploadWeapp 的硬性校验）。
     *
     * @param array $params
     * @return array
     */
    protected function checkSiteSsl(array $params): array
    {
        try {
            $baseUrl = (string) url('/', [], '', true);
        } catch (\Throwable $e) {
            return [ 'passed' => true, 'message' => '无法获取站点地址，已跳过该项校验' ];
        }

        if (strpos($baseUrl, 'https://') === false) {
            return [
                'passed'  => false,
                'message' => '当前站点未启用 HTTPS（' . $baseUrl . '），不允许上传小程序代码',
                'suggest' => '为站点域名申请并部署 SSL 证书（可通过宝塔/云厂商申请免费证书），配置强制跳转 HTTPS 后重新同步'
            ];
        }

        return [ 'passed' => true, 'message' => '站点已启用 HTTPS' ];
    }

    // ==================== 小程序发布（站点端） ====================

    /**
     * 解析校验参数中的站点id（站点端任务；平台端降级为 0）
     * @param array $params
     * @return int
     */
    protected function resolveSiteId(array $params): int
    {
        $siteId = (int) ( $params[ 'site_id' ] ?? 0 );
        if ($siteId > 0) return $siteId;

        try {
            return (int) request()->siteId();
        } catch (\Throwable $e) {
            return 0;
        }
    }

    /**
     * 云端授权码（小程序上传由云端编译，必须有授权）
     *
     * CoreCloudBaseService 构造时即要求授权码，未授权会直接抛 NEED_TO_AUTHORIZE_FIRST，
     * 这里提前检出并给出明确引导，避免上传开始后才失败。
     *
     * @param array $params
     * @return array
     */
    protected function checkAuthCode(array $params): array
    {
        try {
            $authCode = (string) ( ( new CoreNiucloudConfigService() )->getNiucloudConfig()[ 'auth_code' ] ?? '' );
        } catch (\Throwable $e) {
            return [ 'passed' => false, 'message' => '授权配置读取失败：' . $e->getMessage() ];
        }

        if ($authCode === '') {
            return [
                'passed'  => false,
                'message' => '未配置云端授权码，无法使用云端上传',
                'suggest' => '前往「授权」页面绑定授权码后再发布小程序；未授权无法使用云端上传'
            ];
        }

        return [ 'passed' => true, 'message' => '云端授权码已配置' ];
    }

    /**
     * 站点小程序配置：AppID + 代码上传密钥
     *
     * 对应 CoreWeappCloudService::uploadWeapp() 的三项硬性校验（APPID / 密钥 / 密钥文件存在）。
     *
     * @param array $params
     * @return array
     */
    protected function checkWeappConfig(array $params): array
    {
        $siteId = $this->resolveSiteId($params);
        if ($siteId <= 0) {
            return [
                'passed'  => false,
                'message' => '未获取到站点信息，无法校验小程序配置',
                'suggest' => '请在站点端发起小程序发布'
            ];
        }

        $config = ( new CoreWeappConfigService() )->getWeappConfig($siteId);

        if (empty($config[ 'app_id' ])) {
            return [
                'passed'  => false,
                'message' => '未配置小程序 AppID',
                'suggest' => '前往「渠道 → 小程序 → 配置」填写小程序 AppID（在微信公众平台「开发管理 → 开发设置」中获取）'
            ];
        }

        // 已授权站点的「提交」（mode=commit）由开放平台代传，不需要站点自己的代码上传密钥
        if ((string) ( $params[ 'mode' ] ?? '' ) === 'commit') {
            return [ 'passed' => true, 'message' => '小程序配置完整（AppID：' . (string) $config[ 'app_id' ] . '）' ];
        }

        $key = (string) ( $config[ 'upload_private_key' ] ?? '' );
        if ($key === '') {
            return [
                'passed'  => false,
                'message' => '未配置小程序代码上传密钥',
                'suggest' => '在微信公众平台「开发管理 → 开发设置 → 小程序代码上传」生成密钥，并在小程序配置中上传该密钥文件'
            ];
        }

        if (!is_file($key) || !is_readable($key)) {
            return [
                'passed'  => false,
                'message' => '代码上传密钥文件不存在或不可读：' . $key,
                'suggest' => '重新上传代码上传密钥文件，并确认其保存在 ' . $key . ' 且文件可读'
            ];
        }

        return [ 'passed' => true, 'message' => '小程序配置完整（AppID：' . (string) $config[ 'app_id' ] . '）' ];
    }

    /**
     * 当前站点是否存在「上传中」的版本
     *
     * 原流程在 WeappVersionService::add() 中抛 WEAPP_UPLOADING（点击发布后才报错），
     * 改为发布前校验，提前拦截并提示可删除中断的记录。
     *
     * @param array $params
     * @return array
     */
    protected function checkUploadIdle(array $params): array
    {
        $siteId = $this->resolveSiteId($params);
        if ($siteId <= 0) {
            return [
                'passed'  => false,
                'message' => '未获取到站点信息，无法校验发布状态',
                'suggest' => '请在站点端发起小程序发布'
            ];
        }

        try {
            $count = ( new WeappVersion() )
                ->where([ [ 'site_id', '=', $siteId ], [ 'status', '=', CloudDict::APPLET_UPLOADING ] ])
                ->count();
        } catch (\Throwable $e) {
            return [ 'passed' => false, 'message' => '发布状态检测失败：' . $e->getMessage() ];
        }

        if ($count > 0) {
            return [
                'passed'  => false,
                'message' => '当前站点有正在上传的小程序版本',
                'suggest' => '等待该版本上传结束后再发布；若其已中断，可在下方版本列表中删除该记录后重试'
            ];
        }

        return [ 'passed' => true, 'message' => '无进行中的上传版本' ];
    }

    // ==================== 插件打包 ====================

    /**
     * 解析校验参数中的插件标识列表
     *
     * 打包支持批量：参数可能是数组（前端勾选）或逗号分隔字符串，统一成数组。
     *
     * @param array $params
     * @return array
     */
    protected function resolveAddons(array $params): array
    {
        $addon = $params[ 'addon' ] ?? '';
        $list  = is_array($addon) ? $addon : explode(',', (string) $addon);

        return array_values(array_unique(array_filter(array_map(fn ($v) => trim((string) $v), $list))));
    }

    /**
     * 插件源码目录是否存在
     *
     * 对应 CoreAddonDevelopBuildService::build() 的第一个前置判断（ADDON_IS_NOT_EXIST）。
     *
     * @param array $params
     * @return array
     */
    protected function checkAddonSource(array $params): array
    {
        $addons = $this->resolveAddons($params);
        if (empty($addons)) return [ 'passed' => false, 'message' => '缺少插件标识' ];

        $bad = [];
        foreach ($addons as $addon) {
            $dir = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
            if (!is_dir($dir)) $bad[] = $addon;
        }

        if (!empty($bad)) {
            return [
                'passed'  => false,
                'message' => '以下插件源码目录不存在：' . implode('、', $bad),
                'details' => $bad,
                'suggest' => '确认插件已安装且 niucloud/addon/ 下存在对应插件目录；源码缺失请重新放置插件源码后打包'
            ];
        }

        return [ 'passed' => true, 'message' => '插件源码目录完整（' . count($addons) . ' 个）' ];
    }

    /**
     * 前端编译产物是否已就绪（存在、可读且非空）
     *
     * 判定条件与 CoreAddonDevelopBuildService::adminDist() / wapDist() 保持一致：
     * 目录不存在、不可读或仅有 . 与 .. 两项，都会导致打包中断。
     *
     * @param string $dir
     * @return bool
     */
    protected function isDistReady(string $dir): bool
    {
        if (!is_dir($dir) || !is_readable($dir)) return false;

        return count(@scandir($dir)) > 2;
    }

    /**
     * 前端编译产物（admin / wap）是否齐全
     *
     * 打包中最常见的中断点：admin 端与 wap 端的编译产物缺失时，
     * adminDist() / wapDist() 会直接抛异常，导致整个打包失败。
     *
     * @param array $params
     * @return array
     */
    protected function checkAddonBuildDist(array $params): array
    {
        // 打包前先云编译：编译产物由云端生成，无需校验本地编译产物
        if (!empty($params[ 'is_cloud_build' ])) {
            return [ 'passed' => true, 'message' => '本次打包将先执行云编译，无需本地编译产物' ];
        }

        $addons = $this->resolveAddons($params);
        if (empty($addons)) return [ 'passed' => false, 'message' => '缺少插件标识' ];

        $bad = [];
        $commands = [];
        foreach ($addons as $addon) {
            // admin 端：打包无条件拷贝该目录，缺失即中断
            $adminDist = str_replace('/', DIRECTORY_SEPARATOR, project_path() . 'admin/dist/assets/addons/' . $addon . '/');
            if (!$this->isDistReady($adminDist)) {
                $bad[] = "{$addon}：admin 端未编译，请先执行 npm run build:addon {$addon}";
                $commands[] = "npm run build:addon {$addon}（admin 端）";
            }

            // wap 端：仅在插件存在 uni-app 源码时才要求编译产物
            $uniappSrc = project_path() . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
            if (is_dir($uniappSrc)) {
                $wapDist = str_replace('/', DIRECTORY_SEPARATOR, project_path() . 'uni-app/dist/build/h5/assets/addons/' . $addon . '/');
                if (!$this->isDistReady($wapDist)) {
                    $bad[] = "{$addon}：wap 端未编译，请先执行 npm run build:h5:addon {$addon}";
                    $commands[] = "npm run build:h5:addon {$addon}（wap 端）";
                }
            }
        }

        if (!empty($bad)) {
            return [
                'passed'  => false,
                'message' => '以下插件缺少前端编译产物',
                'details' => $bad
            ];
        }

        return [ 'passed' => true, 'message' => '前端编译产物齐全' ];
    }

    /**
     * 打包相关目录的读写权限
     *
     * 打包过程会往插件目录回写（admin / uni-app 拷贝、菜单字典写入）并在 runtime 下生成中间产物与 zip，
     * 任一目录不可写都会导致打包中途失败。
     *
     * @param array $params
     * @return array
     */
    protected function checkAddonBuildDirPermission(array $params): array
    {
        $addons = $this->resolveAddons($params);
        if (empty($addons)) return [ 'passed' => false, 'message' => '缺少插件标识' ];

        $dirs = [ 'runtime' => runtime_path() ];
        foreach ($addons as $addon) {
            $dirs[ 'addon/' . $addon ] = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
        }

        $bad = [];
        foreach ($dirs as $label => $dir) {
            if (!is_dir($dir)) {
                $bad[] = $label . '（目录不存在）';
            } elseif (!is_writable($dir)) {
                $bad[] = $label . '（不可写）';
            }
        }

        if (!empty($bad)) {
            return [
                'passed'  => false,
                'message' => '以下目录不可写：' . implode('；', $bad),
                'details' => $bad,
                'suggest' => '将插件目录与 runtime 目录设为可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户（如 www-data），Windows 去掉目录只读属性'
            ];
        }

        return [ 'passed' => true, 'message' => '打包相关目录读写权限正常' ];
    }

    /**
     * uni-app 端源码文件（pages.json / 语言包）
     *
     * buildUniappPagesJson() 与 buildUniappLangJson() 会直接读取这些文件：
     * 缺失或 JSON 非法会让打包在读文件阶段报错，属于可提前发现的问题。
     *
     * @param array $params
     * @return array
     */
    protected function checkUniappSource(array $params): array
    {
        $addons = $this->resolveAddons($params);
        if (empty($addons)) return [ 'passed' => false, 'message' => '缺少插件标识' ];

        $base = project_path() . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR;
        $bad  = [];

        foreach ($addons as $addon) {
            $src = $base . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
            if (!is_dir($src)) continue; // 插件无 uni-app 端，无需校验

            foreach ([ 'pages.json', 'locale' . DIRECTORY_SEPARATOR . 'zh-Hans.json', 'locale' . DIRECTORY_SEPARATOR . 'en.json' ] as $file) {
                $path = $base . $file;

                if (!is_file($path) || !is_readable($path)) {
                    $bad[] = "{$addon}：缺少 uni-app {$file}";
                    continue;
                }

                // 语言包会被 json_decode 后遍历，格式非法同样会中断打包
                if ($file !== 'pages.json' && json_decode((string) file_get_contents($path), true) === null) {
                    $bad[] = "{$addon}：uni-app {$file} 格式非法";
                }
            }
        }

        if (!empty($bad)) {
            return [
                'passed'  => false,
                'message' => 'uni-app 端源码文件异常',
                'details' => $bad,
                'suggest' => '按上方提示补齐 uni-app/src/addon/{插件}/ 下的 pages.json 与语言包文件，并用 JSON 校验工具确认格式合法（勿保留注释与尾随逗号）'
            ];
        }

        return [ 'passed' => true, 'message' => 'uni-app 端源码文件完整' ];
    }

    /**
     * 磁盘剩余空间
     * @param array $params
     * @return array
     */
    protected function checkDiskSpace(array $params): array
    {
        $free = @disk_free_space(project_path());
        if ($free === false) {
            return [ 'passed' => true, 'message' => '无法读取磁盘空间，已跳过该项校验' ];
        }

        $free = (int) $free;
        if ($free < self::MIN_DISK_SPACE) {
            return [
                'passed'  => false,
                'message' => '磁盘剩余空间不足：' . $this->formatSize($free) . '（建议保留 ' . $this->formatSize(self::MIN_DISK_SPACE) . ' 以上）',
                'suggest' => '清理服务器磁盘：删除 runtime/log 历史日志、过期备份包与临时文件，或扩容磁盘后再执行'
            ];
        }

        return [ 'passed' => true, 'message' => '磁盘剩余空间 ' . $this->formatSize($free) ];
    }

    /**
     * niucloud 官网连通性：实际请求官网开放接口，验证网络可达
     *
     * 只验证「能否连通」，不关心业务返回内容；任何网络层异常（超时 / DNS / 证书）都判为未通过，
     * 并把原因带回前端，便于用户判断是本机网络问题还是官网不可用。
     *
     * @param array $params
     * @return array
     */
    protected function checkNiucloudSite(array $params): array
    {
        try {
            $client   = new CoreModuleService();
            $response = $client->request('store/label/all', 'GET', [
                'query'           => [],
                'connect_timeout' => self::CONNECT_TIMEOUT,
                'timeout'         => self::REQUEST_TIMEOUT
            ]);

            // 只判定 HTTP 层：响应可能是数组（已解码的业务结构）或 PSR 响应对象。
            // 各接口业务码约定不一致（有的 code=0 成功、有的 200 成功），
            // 连通性只看「请求是否成功往返」；HTTP 4xx/5xx 由 Guzzle 抛异常，走下方 catch。
            $status = 200;
            if ($response instanceof \Psr\Http\Message\ResponseInterface) {
                $status = $response->getStatusCode();
            }

            if ($status >= 400) {
                return [
                    'passed'  => false,
                    'message' => '官网接口返回异常（HTTP ' . $status . '）',
                    'suggest' => '官网接口暂时不可用，请稍后重试；若长时间异常可前往官网查看服务状态'
                ];
            }

            return [ 'passed' => true, 'message' => 'niucloud 官网连通正常' ];
        } catch (\Throwable $e) {
            return [
                'passed'  => false,
                'message' => '无法连接 niucloud 官网：' . $e->getMessage(),
                'suggest' => '检查服务器外网连通性：确认 DNS 正常、防火墙/安全组未拦截出站请求；代理环境请为 PHP 配置正确的代理'
            ];
        }
    }

    /**
     * 代码完整性校验：检测目标（文件与目录）是否存在、是否可读
     *
     * 目录解析复用 CodeIntegrityChecker::resolveTargetDirs()：这里检查的目录必须与
     * 真正会被扫描的目录完全一致，否则会出现「检测说没问题、比对却读不到文件」。
     *
     * 参数（$params）：
     * - target 检测目标：framework（框架）或插件 key / addon:{key}
     *
     * @param array $params
     * @return array
     */
    protected function checkIntegrityTarget(array $params): array
    {
        $target = trim((string) ( $params[ 'target' ] ?? '' ));
        // 后台应用列表里框架的 key 是 niucloud-admin，检测侧只认 framework
        if ($target === '' || $target === 'niucloud-admin') $target = 'framework';

        try {
            $checker = new CodeIntegrityChecker();
            $dirs    = $checker->resolveTargetDirs($target);
            // 顺带把目标解析一遍：插件版本号读不到之类的异常在这里就会暴露
            $checker->resolveTarget($target);
        } catch (\Throwable $e) {
            return [
                'passed'  => false,
                'message' => '检测目标不可用：' . $e->getMessage(),
                'suggest' => '确认该目标已正确安装且版本信息完整（插件需存在 info.json），刷新页面后重新检测'
            ];
        }

        $base  = $this->integrityAbsolutePath((string) ( $dirs[ 'base' ] ?? '' ));
        $paths = (array) ( $dirs[ 'paths' ] ?? [] );

        // paths 为空 = 扫描整个 base；非空时逐个检查（相对 base）
        $rows = empty($paths)
            ? [ $base ]
            : array_map(
                fn ($path) => rtrim($base, '/\\') . DIRECTORY_SEPARATOR
                    . trim(str_replace([ '/', '\\' ], DIRECTORY_SEPARATOR, (string) $path), DIRECTORY_SEPARATOR),
                $paths
            );

        $bad = [];
        foreach ($rows as $dir) {
            if (!is_dir($dir)) {
                $bad[] = $dir . '（目录不存在）';
                continue;
            }
            if (!is_readable($dir)) $bad[] = $dir . '（不可读）';
        }

        // 框架目标的基准是「站点根」，正常情况下其下必有 niucloud 应用目录；
        // 缺失说明安装目录结构与框架包不一致，此时按 base 扫描出的结果没有意义
        if ($target === 'framework') {
            $appDir = rtrim($base, '/\\') . DIRECTORY_SEPARATOR . 'niucloud';
            if (is_dir($base) && !is_dir($appDir)) $bad[] = $appDir . '（目录不存在，站点根与框架包结构不一致）';
        }

        $bad = array_values(array_unique($bad));

        if (empty($bad)) {
            return [ 'passed' => true, 'message' => '检测目标存在且可读（共 ' . count($rows) . ' 个目录）' ];
        }

        return [
            'passed'  => false,
            'message' => '检测目标存在异常：' . implode('；', array_slice($bad, 0, 3)) . ( count($bad) > 3 ? ' 等' : '' ),
            'details' => $bad,
            'suggest' => '确认目标目录与文件存在，且 PHP 运行用户可读：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户，Windows 取消目录只读属性；插件检测目标请先安装该插件'
        ];
    }

    /**
     * 代码完整性校验：清单缓存目录与写回备份目录是否可读写
     *
     * 官方清单下载后要落到 app/map 下（config integrity.baseline_dir）；
     * 写回官方文件前要把本地原文件备份到 runtime/integrity/backup（config integrity.diff.backup_dir）。
     * 这两个目录不可写，校验 / 写回会在中途失败，所以放在比对前先暴露出来。
     *
     * @param array $params
     * @return array
     */
    protected function checkIntegrityDirPermission(array $params): array
    {
        $list = [
            '清单缓存目录' => (string) config('integrity.baseline_dir'),
            '写回备份目录' => (string) config('integrity.diff.backup_dir')
        ];

        $data = [ 'is_pass' => true, 'dir' => [ 'is_readable' => [], 'is_write' => [] ] ];
        // 尚未创建、但上层目录可写（首次校验 / 写回时会自动创建）的目录：
        // 这不是异常，只在通过文案里如实说明
        $pending = [];

        foreach ($list as $label => $dir) {
            $dir = rtrim(str_replace('\\', '/', trim($dir)), '/');
            if ($dir === '') continue;

            $path = $label . '：' . str_replace('/', DIRECTORY_SEPARATOR, $dir);

            if (!is_dir($dir)) {
                // ★ 目录不存在是正常状态（按需创建），要判断的是「能不能创建出来」：
                //   沿路径往上找第一个已存在的父级，它可写即可 —— 只看 dirname() 是不够的，
                //   像 runtime/integrity/backup 这种可能连着两三层都还没建。
                $parent = $dir;
                while (($next = dirname($parent)) !== $parent) {
                    $parent = $next;
                    if (is_dir($parent)) break;
                }

                if (is_dir($parent) && is_writable($parent)) {
                    $pending[] = $path . '（尚未创建，将在首次使用时自动创建）';
                    continue;
                }

                // 连创建它的父级都不可写：这才是真问题，且问题出在父级上
                $data[ 'is_pass' ]                  = false;
                $data[ 'dir' ][ 'is_write' ][]      = [
                    'dir'    => $label . '：' . str_replace('/', DIRECTORY_SEPARATOR, $parent),
                    'status' => false
                ];
                continue;
            }

            // 目录已存在：可读可写都要满足
            if (!is_readable($dir)) {
                $data[ 'is_pass' ]             = false;
                $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => $path, 'status' => false ];
            }
            if (!is_writable($dir)) {
                $data[ 'is_pass' ]            = false;
                $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => $path, 'status' => false ];
            }
        }

        if (!empty($data[ 'is_pass' ])) {
            $message = '清单缓存目录与写回备份目录读写正常';
            if (!empty($pending)) $message .= '；' . implode('；', $pending);

            return [ 'passed' => true, 'message' => $message ];
        }

        $result = $this->formatDirCheck($data, '');

        // 把「不存在 ≠ 异常」讲清楚：这里拦下的是连创建都不被允许的情况
        $result[ 'suggest' ] = '目录不存在时会在首次校验 / 写回时自动创建，出现本项说明其上层目录不允许创建：'
            . $result[ 'suggest' ];

        return $result;
    }

    /**
     * 打包场景的云编译服务校验：仅在「先云编译」时要求
     *
     * 直接打包（使用本地编译产物）不需要云编译服务可用，避免把「未配置云编译」也算成校验不通过。
     * @param array $params
     * @return array
     */
    protected function checkAddonCloudService(array $params): array
    {
        if (empty($params[ 'is_cloud_build' ])) {
            return [ 'passed' => true, 'message' => '本次打包不使用云编译，无需校验云编译服务' ];
        }

        return $this->checkCloudBuildService($params);
    }

    /**
     * 云编译服务连通性：请求编译服务根地址，验证返回的是编译服务响应
     *
     * 与 CloudService::checkLocal() 同口径（200 + 欢迎语），但显式设置超时，
     * 避免服务不可达时把校验卡住；支持读取「本地编译服务」配置。
     *
     * @param array $params
     * @return array
     */
    protected function checkCloudBuildService(array $params): array
    {
        // 本地编译服务配置（开启时优先用本地地址，口径同 CloudService::checkLocal）
        $localUri = '';
        try {
            $local    = ( new CoreConfigService() )->getConfig(0, 'LOCAL_CLOUD_COMPILE_CONFIG')[ 'value' ] ?? [];
            $localUri = !empty($local[ 'isOpen' ]) ? (string) ( $local[ 'baseUri' ] ?? '' ) : '';
        } catch (\Throwable $e) {
            $localUri = '';
        }

        try {
            $service  = new CloudService(false, $localUri);
            $response = $service->request('GET', '', [
                'connect_timeout' => self::CONNECT_TIMEOUT,
                'timeout'         => self::REQUEST_TIMEOUT
            ]);

            $status = $response instanceof \Psr\Http\Message\ResponseInterface ? $response->getStatusCode() : 0;
            $body   = $response instanceof \Psr\Http\Message\ResponseInterface ? (string) $response->getBody()->getContents() : '';

            if ($status === 200 && strpos($body, 'NiuCloud') !== false) {
                return [
                    'passed'  => true,
                    'message' => $localUri !== '' ? '云编译服务连通正常（本地编译服务）' : '云编译服务连通正常'
                ];
            }

            return [
                'passed'  => false,
                'message' => '云编译服务返回异常（HTTP ' . $status . '），请检查编译服务是否启动',
                'suggest' => '确认编译服务已启动且版本匹配；使用本地编译服务时，检查后台「本地编译服务」配置的地址是否正确'
            ];
        } catch (\Throwable $e) {
            return [
                'passed'  => false,
                'message' => '无法连接云编译服务：' . $e->getMessage(),
                'suggest' => '确认编译服务已启动、端口已放行且地址可访问；使用本地编译服务时，检查后台「本地编译服务」配置的服务地址'
            ];
        }
    }

    /**
     * 云端服务连通性：未配置授权码视为不可用（非必须项，仅提示）
     * @param array $params
     * @return array
     */
    protected function checkCloudService(array $params): array
    {
        $config = ( new \app\service\core\niucloud\CoreNiucloudConfigService() )->getNiucloudConfig();
        if (empty($config[ 'auth_code' ])) {
            return [
                'passed'  => false,
                'message' => '未配置云端授权码，升级时将使用本地编译',
                'suggest' => '在「云端服务 → 授权配置」中填写授权码以使用云端编译；无需云端编译时可忽略该项，系统将使用本地编译'
            ];
        }

        return [ 'passed' => true, 'message' => '云端服务已配置' ];
    }

    // ==================== 辅助 ====================

    /**
     * 完整性检测的「相对 root_path() 基准」转绝对路径
     *
     * 与 FileScanner::absolutePath() 同口径：base 是相对 root_path() 的写法 ——
     * 框架目标固定为 '..'（站点根），插件目标形如 addon/{key}。
     *
     * @param string $base
     * @return string
     */
    protected function integrityAbsolutePath(string $base): string
    {
        $base = trim(str_replace([ '\\', '/' ], DIRECTORY_SEPARATOR, $base), DIRECTORY_SEPARATOR);
        $path = $base === ''
            ? root_path()
            : rtrim(root_path(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $base;

        return realpath($path) ?: $path;
    }

    /**
     * 把「目录 / 文件权限检测」结果统一格式化为校验项结果
     * @param array $data 检测结果（is_pass + dir.is_readable / dir.is_write）
     * @param string $passMessage
     * @return array
     */
    protected function formatDirCheck(array $data, string $passMessage): array
    {
        if (!empty($data[ 'is_pass' ])) {
            return [ 'passed' => true, 'message' => $passMessage ];
        }

        $bad = [];
        $labels = [ 'is_readable' => '不可读', 'is_write' => '不可写' ];
        foreach ($labels as $field => $label) {
            foreach ((array) ( $data[ 'dir' ][ $field ] ?? [] ) as $row) {
                if (empty($row[ 'status' ])) $bad[] = (string) ( $row[ 'dir' ] ?? '' ) . '（' . $label . '）';
            }
        }
        $bad = array_values(array_unique(array_filter($bad)));

        // 权限异常时，兜底再抛一次检测异常信息，避免只有空清单而无原因
        if (empty($bad)) {
            $extra = [];
            foreach ((array) ( $data[ 'addon_check' ] ?? [] ) as $row) {
                if (empty($row[ 'status' ])) $extra[] = (string) ( $row[ 'msg' ] ?? '' );
            }
            $bad = array_values(array_filter($extra));
        }

        return [
            'passed'  => false,
            'message' => empty($bad) ? '目录权限校验未通过' : ('以下目录权限异常：' . implode('；', array_slice($bad, 0, 5)) . ( count($bad) > 5 ? ' 等' : '' )),
            'details' => $bad,
            'suggest' => '将上方目录设置为可读可写：Linux 执行 chmod -R 755（或 777）并把属主改为 PHP 运行用户（如 www-data），Windows 取消目录只读属性'
        ];
    }

    /**
     * 字节格式化
     * @param int $bytes
     * @return string
     */
    protected function formatSize(int $bytes): string
    {
        $units  = [ 'B', 'KB', 'MB', 'GB', 'TB' ];
        $bytes  = max($bytes, 0);
        $power  = $bytes > 0 ? min((int) floor(log($bytes, 1024)), count($units) - 1) : 0;

        return ( $power === 0 ? (string) $bytes : number_format($bytes / pow(1024, $power), 2) ) . ' ' . $units[ $power ];
    }
}
