<?php
declare(strict_types=1);

namespace core\integrity;

use core\exception\CommonException;
use Throwable;

/**
 * 代码完整性检测主控
 *
 * - 归一化开关可运行时传参（is_bom / is_crlf_lf）
 * - 算法可运行时切换（crc32 / md5 / sha256 / sha512）
 * - 支持预设目标 + 自动枚举插件 + 动态指定目录
 *
 * @package core\integrity
 */
class CodeIntegrityChecker
{
    private FileScanner $scanner;
    private BaselineManager $baseline;
    private CloudBaselineClient $cloud;
    private RulesProvider $rulesProvider;
    private array $config;

    /** 算法（对外名） */
    private string $algorithm = 'crc32';

    /** 归一化开关 */
    private array $normalize = ['is_bom' => true, 'is_crlf_lf' => true];

    /** 规则段（由 normalize 推导） */
    private string $profile = 'bom-eol';

    /** 本次检测生效的排除规则版本 */
    private string $rulesVersion = '';

    /** 本次检测生效的排除规则（惰性载入：同一次检测内只读一次盘） */
    private ?array $rules = null;

    /** 过程中产生的告警（例如规则降级到内置兜底），供入口层展示 */
    private array $warnings = [];

    /**
     * @param string|null $algorithm 算法；不传取配置默认值
     * @param array|null  $normalize 归一化开关；不传取配置同名字段
     * @throws CommonException
     */
    public function __construct(?string $algorithm = null, ?array $normalize = null)
    {
        $this->config        = (array) config('integrity');
        $this->scanner       = new FileScanner($this->config);
        $this->baseline      = new BaselineManager();
        $this->cloud         = new CloudBaselineClient();
        $this->rulesProvider = new RulesProvider($this->config);

        $this->setAlgorithm($algorithm ?: (string) ($this->config['default_algorithm'] ?? 'crc32'));
        $this->setNormalize($normalize);
    }

    /**
     * 取出并清空过程中的告警
     *
     * 入口层（命令行 / 后台）拿到后要展示出来，
     * 尤其是「规则降级到内置兜底」这种会影响结果可信度的情况。
     */
    public function takeWarnings(): array
    {
        $warnings       = $this->warnings;
        $this->warnings = [];

        return $warnings;
    }

    public function getRulesVersion(): string
    {
        return $this->rulesVersion;
    }

    /**
     * 当前生效的清单缓存签名 = 规则版本 + 本地归一化白名单版本
     *
     * 两者任一变化都必须让本地清单缓存失效：
     *   - 排除规则变了     → 参与扫描的文件集合变了；
     *   - 归一化白名单变了 → 同一批文件的哈希算法变了。
     *
     * 与服务端 manifestSignature() 依据同一套量，便于两端对照排查。
     *
     * @param string $rulesVersion 规则版本；传空串则取本次检测已确定的版本，
     *                             仍为空则返回空串（= 不校验，与 signatureMatches 语义一致）
     */
    public function cacheSignature(string $rulesVersion = ''): string
    {
        $rulesVersion = $rulesVersion !== '' ? $rulesVersion : $this->rulesVersion;
        if ($rulesVersion === '') {
            return '';
        }

        return BaselineManager::buildSignature(
            $rulesVersion,
            FileScanner::normalizeVersion((array) ($this->config['normalize']['extensions'] ?? []))
        );
    }

    /**
     * 设置 / 切换算法
     *
     * @throws CommonException
     */
    public function setAlgorithm(string $algorithm): self
    {
        // 白名单校验，绝不用「试扫一下看行不行」的写法
        $this->scanner->assertAlgorithm($algorithm);
        $this->algorithm = $algorithm;

        return $this;
    }

    public function getAlgorithm(): string
    {
        return $this->algorithm;
    }

    /**
     * 设置归一化开关（缺省项回落配置文件）
     */
    public function setNormalize(?array $normalize): self
    {
        $base = (array) ($this->config['normalize'] ?? []);

        $this->normalize = [
            'is_bom'     => ($normalize !== null && array_key_exists('is_bom', $normalize))
                ? (bool) $normalize['is_bom']
                : (bool) ($base['is_bom'] ?? true),
            'is_crlf_lf' => ($normalize !== null && array_key_exists('is_crlf_lf', $normalize))
                ? (bool) $normalize['is_crlf_lf']
                : (bool) ($base['is_crlf_lf'] ?? true),
        ];

        $this->profile = FileScanner::normalizeProfile($this->normalize);

        return $this;
    }

    public function getNormalize(): array
    {
        return $this->normalize;
    }

    public function getProfile(): string
    {
        return $this->profile;
    }

    /**
     * 读取产品标识
     *
     * @throws CommonException
     */
    public function getProduct(): string
    {
        $product = trim((string) config('niucloud.product'));

        if ($product === '') {
            throw new CommonException(
                '缺少配置 niucloud.product，请在 config/niucloud.php 中配置（例如 \'product\' => \'saas\'）。'
                . '该值用于拼装清单存放路径，缺失会导致路径不完整并命中错误的清单。'
            );
        }

        return $product;
    }

    /**
     * 列出全部可检测目标（预设目标 + 自动枚举插件）
     *
     * 注意：插件版本读不到时这里置为 null，不报错；真正使用时才由 resolveTarget() 拦截。
     */
    public function getTargets(): array
    {
        $targets = [];

        // 1) 预设目标（框架）：版本号用框架版本
        foreach ((array) ($this->config['targets'] ?? []) as $key => $item) {
            // base / paths 统一交给 resolveTargetDirs() 决定（「目标 → 目录」的唯一入口）
            $dirs = $this->resolveTargetDirs((string) $key);

            $targets[] = [
                'key'     => (string) $key,
                'name'    => (string) ($item['name'] ?? $key),
                'base'    => $dirs['base'],
                'paths'   => $dirs['paths'],
                'version' => (string) config('version.version'),
                'type'    => 'framework',
            ];
        }

        // 2) 插件目标：版本号来自各自 info.json
        $addonDirName = (string) ($this->config['addon_dir'] ?? 'addon');
        $addonRoot    = rtrim(root_path(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $addonDirName;

        foreach ((array) glob($addonRoot . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR) as $dir) {
            $addonKey = basename($dir);
            $dirs     = $this->resolveTargetDirs($addonKey);

            $targets[] = [
                'key'     => 'addon:' . $addonKey,
                'name'    => $addonKey . ' 插件',
                'base'    => $dirs['base'],
                'paths'   => $dirs['paths'],
                'version' => $this->readAddonVersion($addonKey),
                'type'    => 'addon',
            ];
        }

        return $targets;
    }

    /**
     * 目标 → 检测目录的唯一映射入口
     *
     * 传入目标标识，返回「扫描基准 + 检测目录集合」：
     *   - base  ：清单键的基准（相对 root_path()）。空串 = root_path()。
     *   - paths ：相对 base 要扫描的目录。空数组 = 扫描整个 base。
     *
     * ★ 客户端与服务端各有一个同逻辑的实现（服务端对应入口见第 8.5.1 节）。
     *   后续要调整某个目标的检测范围，只改这里（以及服务端对应实现），
     *   不用再碰 getTargets() / resolveTarget() 等调用方。
     *
     * @param string $key 目标标识：'framework'，或插件 key（'shop' / 'addon:shop' 均可）
     * @return array{base: string, paths: array}
     */
    public function resolveTargetDirs(string $key): array
    {
        $key = trim($key);

        // 框架：基准是「站点根」，也就是 root_path() 的【上一级】。
        //
        // ★ 为什么是上一级：媒体库里的框架包 niucloud-admin/ 解压后就是站点根，
        //   里面平级放着 niucloud/（PHP 应用）、admin/、uni-app/、web/。
        //   服务端按「包根」遍历出的键形如 niucloud/app/common.php，
        //   客户端必须同样从站点根起算，两边键才对得上。
        //   若基准落在 root_path()（= 站点根/niucloud），键会少掉 niucloud/ 前缀，
        //   每个文件都会同时报「删除」+「新增」。
        //
        //   '..' 是相对 root_path() 的写法，FileScanner::absolutePath() 会拼成
        //   {root_path}/.. 交给文件系统解析，得到的正是站点根。
        if ($key === 'framework') {
            return [
                'base'  => '..',
                'paths' => $this->frameworkMonitorPaths(),
            ];
        }

        // 插件：基准是插件自己的根目录（addon/{key}），扫整个插件目录
        $addonKey = str_starts_with($key, 'addon:')
            ? substr($key, strlen('addon:'))
            : $key;
        $addonDir = trim((string) ($this->config['addon_dir'] ?? 'addon'), '/');

        return [
            'base'  => $addonDir . '/' . trim($addonKey, '/'),
            'paths' => [],
        ];
    }

    /**
     * 目标在「云端 / 本地清单」语境下的名字
     *
     * ★ target['key'] 形如 'addon:shop'（带前缀，用于区分框架与插件），
     *   但云端接口的 addon_key、以及本地清单目录名，都必须是纯标识 'shop'。
     *   服务端是用 {mediaPath}/{addon_key}/... 拼路径的，带前缀会直接找不到插件。
     *
     * 框架目标 'framework' 本身没有前缀，原样返回。
     */
    public function targetName(array $target): string
    {
        $key = (string) $target['key'];

        return str_starts_with($key, 'addon:') ? substr($key, strlen('addon:')) : $key;
    }

    /**
     * framework 目标要检测的目录（相对「站点根」，用 / 分隔）
     *
     * 来源：config('niucloud.framework.monitor')。
     *
     * ★ 空数组 = 扫描整个站点根（当前策略）。
     *   框架包根就是站点根，里面有 niucloud/（PHP 应用）、admin/、uni-app/、web/；
     *   要检测的就是这几块，不必再逐目录列出。至于其中哪些内容该排除
     *   （插件目录、运行时、上传文件、依赖等），统一交给共享排除规则
     *   （服务端下发，见第 3.5 节），不在这里重复维护。
     *
     * ★ 非空时，列的是相对站点根的路径，例如 ['niucloud/app', 'niucloud/config']。
     *   注意：一旦靠它收窄范围，服务端必须同步收窄（服务端是按整个框架包遍历出清单的），
     *   否则两边文件集合不一致，会整目录误报。默认留空最安全。
     *
     * @return array 相对站点根、排序去重后的目录列表；空数组 = 全扫站点根
     */
    private function frameworkMonitorPaths(): array
    {
        $paths = [];

        foreach ((array) config('niucloud.framework.monitor') as $p) {
            $p = trim(str_replace('\\', '/', (string) $p), '/');

            if ($p !== '' && $p !== '.' && $p !== '..') {
                $paths[] = $p;
            }
        }

        // 去重 + 排序：后台分片的游标是下标，目录顺序必须稳定
        $paths = array_values(array_unique($paths));
        sort($paths);

        return $paths;
    }

    /**
     * 读取插件版本号（来自 addon/{key}/info.json 的 version 字段）
     *
     * @return string|null 读不到返回 null；调用方决定是「列表里显示未知」还是「直接报错中止」
     */
    public function readAddonVersion(string $addonKey): ?string
    {
        $addonDirName = (string) ($this->config['addon_dir'] ?? 'addon');
        $file = rtrim(root_path(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR
            . $addonDirName . DIRECTORY_SEPARATOR . $addonKey . DIRECTORY_SEPARATOR . 'info.json';

        if (!is_file($file)) {
            return null;
        }

        $info = json_decode((string) file_get_contents($file), true);
        if (!is_array($info) || empty($info['version']) || !is_scalar($info['version'])) {
            return null;
        }

        $version = trim((string) $info['version']);

        // 版本号最终要进文件名，这里先过滤一遍非法字符
        return self::isValidVersion($version) ? $version : null;
    }

    /**
     * 版本号字符规则
     *
     * 读 info.json 与「外部传入的版本」共用这一套：版本号最终会拼进清单路径与云端请求，
     * 脏字符会变成莫名其妙的 404 甚至路径穿越，必须在入口挡住。
     */
    private static function isValidVersion(string $version): bool
    {
        return preg_match('/^[A-Za-z0-9][A-Za-z0-9._\-]*$/', $version) === 1;
    }

    /**
     * 校验外部传入的版本号；不合法直接抛错
     *
     * 规则与 readAddonVersion() 完全一致，但语义不同：那边读不到就返回 null（列表里显示未知即可），
     * 这边是调用方**主动指定**的，错了就必须报出来 —— 悄悄换成别的版本会变成静默漏报。
     *
     * @throws CommonException
     */
    private static function assertVersion(string $version): string
    {
        if (!self::isValidVersion($version)) {
            throw new CommonException('版本号不合法: ' . $version . '（只允许字母、数字、点、下划线、中划线）');
        }

        return $version;
    }

    /**
     * 解析检测目标
     *
     * @param string|null $targetKey 预设目标标识，如 framework、addon:shop
     * @param string|null $path      自定义目录（优先级高于 targetKey）
     * @return array ['key','name','base','paths','version','type']
     * @throws CommonException
     */
    public function resolveTarget(?string $targetKey, ?string $path = null): array
    {
        if ($path !== null && trim($path) !== '') {
            $path = trim(str_replace('\\', '/', $path), '/');

            return [
                // 自定义目录也要有稳定的 name：用路径 md5 前 8 位
                // 这样同一个路径永远得到同一个目录名，不会每次换一个清单位置
                'key'     => 'custom_' . substr(md5($path), 0, 8),
                'name'    => '自定义目录 ' . $path,
                // 基准就是这个目录本身，清单键 = 目录内的相对路径
                'base'    => $path,
                'paths'   => [],
                'version' => (string) config('version.version'),
                'type'    => 'custom',
            ];
        }

        foreach ($this->getTargets() as $item) {
            if ($item['key'] === (string) $targetKey) {
                // 到这里才强制要求版本号可用
                $item['version'] = $this->targetVersionOrFail($item);

                return $item;
            }
        }

        throw new CommonException('未找到检测目标: ' . (string) $targetKey);
    }

    // ==================== 共享排除规则 ====================

    /**
     * 确保手上有一份可用的排除规则
     *
     * 规则来源是本站自己的 config/hash_rules.ignore（见 RulesProvider），
     * 与服务端 {仓库}/config/hash_rules.ignore 内容逐字一致、由人工保证同步，
     * 不再联网拉取云端规则。
     *
     * @param string|null $forceVersion 兼容历史调用保留；本地单一规则下不参与决策
     * @return array{version: string, patterns: array, source: string}
     * @throws CommonException
     */
    public function ensureRules(?string $forceVersion = null): array
    {
        // 同一次检测里可能被调用多次（prepare / baselineStatus），只读一次盘
        if ($this->rules !== null) {
            return $this->rules;
        }

        $rules = $this->rulesProvider->load();

        if (($rules['source'] ?? '') === 'fallback') {
            $this->warnings[] = '未读到本地排除规则文件（' . $this->rulesProvider->rulesFilePath()
                . '），已降级使用 config/integrity.php 的 fallback_rules。'
                . '此时两端规则很可能不一致，检测结果仅供参考。';
        }

        $this->rulesVersion = (string) $rules['version'];

        return $this->rules = $rules;
    }

    /**
     * 从服务端拉取规则并缓存
     *
     * ★ 保留但不再调用：规则已改为读本站 config/hash_rules.ignore（见 ensureRules）。
     *   整条云端规则链路（本方法 → CloudBaselineClient::fetchRules() →
     *   服务端 GET /addon/hash_rules）一并保留，作为将来需要重新统一分发时的退路。
     *
     * @throws CommonException
     */
    private function pullRules(string $product, string $expectVersion): array
    {
        try {
            $rules = $this->cloud->fetchRules();
        } catch (Throwable $e) {
            // 拉不到：是否允许降级到内置兜底规则
            if (!(bool) ($this->config['cloud']['fallback_to_builtin_rules'] ?? true)) {
                throw new CommonException('排除规则拉取失败：' . $e->getMessage());
            }

            $fallback = $this->normalizeRules((array) ($this->config['fallback_rules'] ?? []), 'builtin-v1');

            $this->warnings[]   = '排除规则拉取失败，已降级使用内置兜底规则（' . $e->getMessage()
                . '）。此时两端规则可能不一致，检测结果仅供参考。';
            $this->rulesVersion = (string) $fallback['version'];

            return $fallback;
        }

        $rules = $this->normalizeRules($rules, $expectVersion);

        if ($rules['version'] === '') {
            throw new CommonException('服务端下发的排除规则缺少 version 字段，无法判定本地缓存是否还有效');
        }

        $this->baseline->saveRules($product, $rules);
        $this->baseline->saveLatestRulesVersion($product, (string) $rules['version']);

        $this->rulesVersion = (string) $rules['version'];

        return $rules;
    }

    /**
     * 规则结构归一化（补齐缺失字段）
     *
     * 规则只是一份「有序的 patterns 列表」，顺序本身有语义（后面的规则可推翻前面的），
     * 所以这里绝不做排序。
     */
    private function normalizeRules(array $rules, string $expectVersion = ''): array
    {
        $version = trim((string) ($rules['version'] ?? ''));
        if ($version === '') {
            $version = $expectVersion;
        }

        $patterns = array_values((array) ($rules['patterns'] ?? []));

        // 兼容旧版规则格式（dirs / paths / suffixes / names 四个数组）。
        // 用途：客户端先上线、服务端仍是旧格式时，避免拿到空规则 → 什么都不排除 → 全量误报。
        if ($patterns === []) {
            $patterns = self::legacyRulesToPatterns($rules);
        }

        return [
            'version'  => $version,
            'patterns' => $patterns,
        ];
    }

    /**
     * 旧版四字段规则 → git 规格 patterns（仅用于兼容过渡，服务端升级后即可移除）
     */
    private static function legacyRulesToPatterns(array $rules): array
    {
        $patterns = [];

        // dirs：任意层级同名目录
        foreach ((array) ($rules['dirs'] ?? []) as $dir) {
            $dir = trim((string) $dir, '/');
            if ($dir !== '') {
                $patterns[] = $dir . '/';
            }
        }

        // paths：锚定内容根
        foreach ((array) ($rules['paths'] ?? []) as $path) {
            $path = trim((string) $path, '/');
            if ($path !== '') {
                $patterns[] = '/' . $path . '/';
            }
        }

        // suffixes：文件类型
        foreach ((array) ($rules['suffixes'] ?? []) as $ext) {
            $ext = ltrim(strtolower(trim((string) $ext)), '.');
            if ($ext !== '') {
                $patterns[] = '*.' . $ext;
            }
        }

        // names：文件名
        foreach ((array) ($rules['names'] ?? []) as $name) {
            $name = trim((string) $name, '/');
            if ($name !== '') {
                $patterns[] = $name;
            }
        }

        return $patterns;
    }

    /**
     * 确保清单可用
     *
     * 命中条件 = 文件在 + `.sha256` 通过 + **记录的缓存签名与当前一致**。
     * 三者缺一都不算命中，宁可重下一次 —— 拿规则/白名单不一致的清单去比对，
     * 会造成成规模的误报（见第 3.5.5 节）。
     *
     * @param array  $target        目标
     * @param string $rulesVersion  当前生效的规则版本
     * @param bool   $allowDownload 是否允许联网下载
     * @return array{list: array<string, string>, source: string, rules_version: string}
     * @throws CommonException
     */
    public function ensureBaseline(array $target, string $rulesVersion = '', bool $allowDownload = true): array
    {
        $product   = $this->getProduct();
        // ★ 用纯标识（shop / framework），不能带 addon: 前缀：
        //   云端 addon_key 与本地清单目录名都必须是它
        $name      = $this->targetName($target);
        $version   = $this->targetVersionOrFail($target);
        $profile   = $this->profile;
        $algorithm = $this->algorithm;

        // 缓存签名 = 规则版本 + 归一化白名单版本（见 BaselineManager::buildSignature）
        $signature = $this->cacheSignature($rulesVersion);

        $cached = $this->baseline->load($product, $name, $version, $profile, $algorithm);

        if ($cached !== null
            && $this->baseline->signatureMatches($product, $name, $version, $profile, $algorithm, $signature)
        ) {
            return ['list' => $cached, 'source' => 'cache', 'rules_version' => $rulesVersion];
        }

        if (!$allowDownload) {
            throw new CommonException(
                '清单未命中或排除规则/归一化白名单已变化，且已禁用下载，请先联网获取：'
                . $this->baseline->relativePath($product, $name, $version, $profile, $algorithm)
            );
        }

        $result = $this->cloud->fetch(
            $name,
            $version,
            $algorithm,
            !empty($this->normalize['is_bom']),
            !empty($this->normalize['is_crlf_lf'])
        );

        // 服务端回带的「生成这份清单时所用的规则版本」只用于**核对**。
        // 规则已改为两端各自维护、一致性由人工保证，这是整条链最容易出错的一环：
        // 两份 hash_rules.ignore 一旦不同步，扫描到的文件集合就不同，会整目录级误报。
        // 所以只要对不上就明确告警，不能静默放过。
        $serverVersion = trim((string) ($result['rules_version'] ?? ''));
        if ($serverVersion !== '' && $rulesVersion !== '' && $serverVersion !== $rulesVersion) {
            $this->warnings[] = '云端清单是用规则版本 ' . $serverVersion . ' 生成的，'
                . '与本地规则版本 ' . $rulesVersion . ' 不一致：两端 hash_rules.ignore 很可能未同步，'
                . '检测结果可能出现整目录级误报。';
        }

        // 先清掉旧版本，再落新清单（只清版本不同的，其它规则/算法组合保留）
        $this->baseline->cleanOtherVersions($product, $name, $version);
        $this->baseline->save(
            $product,
            $name,
            $version,
            $profile,
            $algorithm,
            (array) $result['list'],
            // ★ 落**本地**签名：这份缓存还能不能继续用，取决于本地规则/白名单有没有变，
            //   与服务端回带的版本无关（回带版本不同时上面已经告警）。
            //   若按服务端版本落盘，本地一改就会永远对不上 → 每次都重新下载。
            $signature
        );

        return [
            'list'          => (array) $result['list'],
            'source'        => 'cloud',
            'rules_version' => $rulesVersion,
        ];
    }

    /**
     * 查询单个目标的清单状态（含当前生效的规则与算法）
     *
     * @throws CommonException
     */
    public function baselineStatus(array $target): array
    {
        $product   = $this->getProduct();
        $name      = $this->targetName($target);
        $version   = $this->targetVersionOrFail($target);
        $profile   = $this->profile;
        $algorithm = $this->algorithm;

        // 状态判定需要知道「当前规则版本」；这次调用已经取过就复用，不重复读盘
        $rulesVersion = $this->rulesVersion;
        if ($rulesVersion === '') {
            try {
                $rulesVersion = (string) $this->ensureRules()['version'];
            } catch (Throwable $e) {
                // 规则拿不到就不校验版本，状态里会体现为「未校验」，
                // 比直接让状态表打不开更合适
                $rulesVersion = '';
            }
        }

        return [
            'target'        => $name,
            'name'          => $target['name'],
            'base'          => (string) $target['base'],
            'version'       => $version,
            'profile'       => $profile,
            'algorithm'     => $algorithm,
            'rules_version' => $rulesVersion,
            'file'          => $this->baseline->relativePath($product, $name, $version, $profile, $algorithm),
            // 状态判定比对的是缓存签名（规则版本 + 白名单版本），不是单纯的规则版本
            'status'        => $this->baseline->status(
                $product,
                $name,
                $version,
                $profile,
                $algorithm,
                $this->cacheSignature($rulesVersion)
            ),
            'baseline_root' => $this->baseline->root(),
        ];
    }

    /**
     * 清单根目录（供命令行 / 后台展示）
     */
    public function baselineRoot(): string
    {
        return $this->baseline->root();
    }

    /**
     * 当前规则/算法下，某目标的清单相对路径（供展示）
     *
     * @throws CommonException
     */
    public function baselineRelativePath(array $target): string
    {
        return $this->baseline->relativePath(
            $this->getProduct(),
            $this->targetName($target),
            $this->targetVersionOrFail($target),
            $this->profile,
            $this->algorithm
        );
    }

    /**
     * 轻量上下文：只解析目标 + 取清单，**不做目录遍历**
     *
     * 与 prepare() 的区别：prepare() 会把整棵树走一遍（几万个文件），
     * 而「取单个文件内容」「写回」只需要基准 / 目标名 / 版本 / 清单，
     * 用 prepare() 会白扫一次全站。
     *
     * 清单同时充当写回的白名单：只有键存在于清单里（= 官方版确实有这个文件）
     * 才允许覆盖，所以任何绕过前端构造的路径都落不了地。
     *
     * @return array{target: array, base: string, name: string, version: string, baseline: array, rules_version: string}
     * @throws CommonException
     */
    public function resolveBaselineContext(string $targetKey): array
    {
        $target = $this->resolveTarget($targetKey);

        $rules    = $this->ensureRules();
        $baseline = $this->ensureBaseline($target, (string) $rules['version'], true);

        return [
            'target'        => $target,
            'base'          => (string) $target['base'],
            'name'          => $this->targetName($target),
            'version'       => $this->targetVersionOrFail($target),
            'baseline'      => (array) $baseline['list'],
            'rules_version' => (string) $rules['version'],
        ];
    }

    /**
     * 准备阶段：解析目标 → 确保规则 → 确保清单 → 列出文件键
     *
     * @param string|null $version 指定版本：传了就用**该版本**的官方包来比对（不传则回落本地口径：
     *                             插件读 info.json、框架用框架自身版本）。参数加在末位，旧调用不受影响。
     * @return array
     * @throws CommonException
     */
    public function prepare(?string $targetKey, ?string $path = null, bool $allowDownload = true, ?string $version = null): array
    {
        $target  = $this->resolveTarget($targetKey, $path);
        $product = $this->getProduct();

        // 显式指定版本：清单路径与云端取包都以「目标名 + 版本」为维度（见 ensureBaseline），
        // 所以覆盖后再走原流程，语义自然就是「本地现状 vs 该版本的官方包」，不必另造分支。
        if ($version !== null && trim($version) !== '') {
            $target['version'] = self::assertVersion(trim($version));
        }

        // 第 1 步：取得本地排除规则（读 config/hash_rules.ignore，零网络）
        $rules        = $this->ensureRules();
        $rulesVersion = (string) $rules['version'];

        // 第 2 步：确保清单可用（命中要求规则版本一致）
        $baseline = $this->ensureBaseline($target, $rulesVersion, $allowDownload);

        // 注：原先这里还有一步「服务端回带的规则版本不同 → 换一版规则重新列文件」。
        //     规则改为两端各自维护本地文件后，客户端手上只有一份规则、无版本可换；
        //     两端不同步的场景改由 ensureBaseline() 直接告警，不再左右本次列文件。

        return [
            'target'        => $target,
            'product'       => $product,
            'profile'       => $this->profile,
            'algorithm'     => $this->algorithm,
            'normalize'     => $this->normalize,
            'base'          => (string) $target['base'],
            'rules'         => $rules,
            'rules_version' => $rulesVersion,
            'files'         => $this->scanner->listFiles(
                (string) $target['base'],
                (array) $target['paths'],
                $rules
            ),
            'baseline'      => (array) $baseline['list'],
            'source'        => (string) $baseline['source'],
        ];
    }

    /**
     * 扫描一片并比对
     *
     * @param array $context prepare() 的返回值
     * @param int   $cursor  游标（从第几个文件开始）
     * @param int   $limit   本片数量；0 = 不限（全量）
     * @throws CommonException
     */
    public function scanChunk(array $context, int $cursor = 0, int $limit = 0): array
    {
        $files = $context['files'];
        $total = count($files);

        // 用 context 里保存的基准、算法与开关，保证一次检测过程中不会「中途换规则」
        $current = $this->scanner->hashChunk(
            $files,
            (string) $context['base'],
            (string) $context['algorithm'],
            (array) $context['normalize'],
            $cursor,
            $limit
        );

        $baseline = $context['baseline'];
        $changed  = [];
        $details  = [];

        foreach ($current as $file => $hash) {
            if (!array_key_exists($file, $baseline)) {
                $changed[$file] = 'new';
                $details[]      = $this->diffDetail($context, $file, 'new', (string) $hash, '');
            } elseif ($baseline[$file] !== $hash) {
                // 差异是否只来自 BOM / 行尾？是的话不算改动（缘由见 sameIgnoringBomEol）
                if ($this->sameIgnoringBomEol($context, $file, (string) $baseline[$file])) {
                    continue;
                }

                $changed[$file] = 'modified';
                $details[]      = $this->diffDetail($context, $file, 'modified', (string) $hash, (string) $baseline[$file]);
            }
        }

        $scanned = count($current);
        $done    = ($cursor + $scanned) >= $total;

        $deleted = $done ? $this->diffDeleted($baseline, $files) : [];
        foreach ($deleted as $file) {
            $details[] = $this->diffDetail($context, $file, 'deleted', '', (string) ($baseline[$file] ?? ''));
        }

        return [
            'changed'     => $changed,
            // 删除项只在最后一片算，避免每片都做一遍全集比较
            'deleted'     => $deleted,
            // 明细：文件名 + 状态 + 大小 + 两侧哈希（文件差异弹框要用）
            'details'     => $details,
            'scanned'     => $scanned,
            'total'       => $total,
            'cursor'      => $cursor,
            'next_cursor' => $done ? null : $cursor + $scanned,
            'done'        => $done,
            ];
            }

            /**
            * 这一处差异是否只来自 BOM / 行尾
            *
            * 为什么需要它：归一化白名单（FileScanner::shouldNormalize）是按**扩展名**划的，
            * 但「BOM 与行尾不参与比对」是**规则**层面的承诺，两者不该绑死。
            * 像 admin/postcss.config.cjs 这种文本文件，只因为扩展名不在名单里，
            * 本地 LF、官方 CRLF 就会被报成「已修改」，而两侧内容看起来一模一样。
            *
            * 判据：把本地文件按「BOM 有无 × 行尾 LF/CRLF」各算一次，命中清单里的值即视为一致。
            *
            * ★ 用户显式关掉两个开关时（--no-normalize / 工具页取消勾选）直接返回 false，
            *   此时按原始字节严格比对，不能替他「容忍」。
            */
            private function sameIgnoringBomEol(array $context, string $file, string $expected): bool
            {
            $normalize = (array) $context['normalize'];
            $ignoreBom = !empty($normalize['is_bom']);
            $ignoreEol = !empty($normalize['is_crlf_lf']);

            if (!$ignoreBom && !$ignoreEol) {
                return false;
            }

            return $this->scanner->matchesIgnoringBomEol(
                (string) $context['base'],
                $file,
                (string) $context['algorithm'],
                $expected,
                $ignoreBom,
                $ignoreEol
            );
            }

    /**
     * 组装单个差异文件的明细（供后台弹框展示：大小 + 两侧哈希）
     *
     * 删除项本地已无文件，大小记 0、本地哈希留空。
     */
    private function diffDetail(array $context, string $file, string $status, string $hashLocal, string $hashBaseline): array
    {
        return [
            'file'          => $file,
            'status'        => $status,
            'size'          => $status === 'deleted'
                ? 0
                : $this->scanner->fileSize($this->scanner->absoluteFor((string) $context['base'], $file)),
            'hash_local'    => $hashLocal,
            'hash_baseline' => $hashBaseline,
        ];
    }

    /**
     * 一次性全量检测（命令行用）
     *
     * @throws CommonException
     */
    public function check(?string $targetKey, ?string $path = null, bool $allowDownload = true): array
    {
        $started = microtime(true);

        $context = $this->prepare($targetKey, $path, $allowDownload);
        $chunk   = $this->scanChunk($context, 0, 0);

        $summary = ['new' => 0, 'modified' => 0, 'deleted' => count($chunk['deleted'])];
        foreach ($chunk['changed'] as $status) {
            $summary[$status]++;
        }

        return [
            'target'          => $context['target']['key'],
            'target_name'     => $context['target']['name'],
            'base'            => $context['base'],
            'paths'           => $context['target']['paths'],
            'product'         => $context['product'],
            'version'         => $context['target']['version'],
            'profile'         => $context['profile'],
            'algorithm'       => $context['algorithm'],
            'rules_version'   => $context['rules_version'],
            'baseline_file'   => $this->baseline->relativePath(
                $context['product'],
                $this->targetName($context['target']),
                $context['target']['version'],
                $context['profile'],
                $context['algorithm']
            ),
            'baseline_source' => $context['source'],
            'scanned'         => $chunk['scanned'],
            'changed'         => $chunk['changed'],
            'deleted'         => $chunk['deleted'],
            'details'         => $chunk['details'],
            'summary'         => $summary,
            'warnings'        => $this->takeWarnings(),
            'elapsed_ms'      => round((microtime(true) - $started) * 1000, 2),
        ];
    }

    /**
     * 批量比对：框架 / 插件（一个或多个）+ 各自版本
     *
     * 内部就是「prepare 一次 + 循环 scanChunk」（与 stream() 同一套范式），
     * 区别是结果一次性返回、且逐目标互不影响 —— 调用方只关心「有没有差异、差在哪些文件」。
     *
     * 入参支持三种写法（可混用；列表写法里也可以只给 key 不给版本）：
     *   ['framework', 'addon:shop']
     *   ['addon:shop' => '1.6.4', 'framework' => '2.0.2']
     *   [['key' => 'addon:shop', 'version' => '1.6.4']]
     * 版本不传 / 传空则回落本地口径（插件 info.json 的版本、框架自身版本）。
     *
     * @param array $targets       要比对的目标集合，见上方三种写法
     * @param bool  $allowDownload 清单未命中或规则变化时是否允许联网下载
     * @return array{has_diff: bool, targets: array<int, array{
     *     key: string,
     *     name: string,
     *     version: string,
     *     has_diff: bool,
     *     diff_files: array<int, array{file: string, status: string}>,
     *     skipped: bool,
     *     skip_reason: string,
     *     warnings: string[],
     *     error: string
     * }>}
     * @throws CommonException 目标集合为空时（空集合没有比对的意义，属于调用方写错）
     */
    public function compareTargets(array $targets, bool $allowDownload = true): array
    {
        $chunkSize = (int) ($this->config['chunk_size'] ?? 500);
        $results   = [];
        $hasDiff   = false;

        foreach ($this->normalizeTargets($targets) as $item) {
            $one = $this->compareOneTarget($item['key'], $item['version'], $allowDownload, $chunkSize);

            // 总开关：任一目标有差异即为 true
            $hasDiff   = $hasDiff || $one['has_diff'];
            $results[] = $one;
        }

        return ['has_diff' => $hasDiff, 'targets' => $results];
    }

    /**
     * 把三种入参写法归一成 [['key' => ..., 'version' => ...], ...]
     *
     * @param array $targets
     * @return array<int, array{key: string, version: string}>
     * @throws CommonException 一个有效目标都没有时
     */
    private function normalizeTargets(array $targets): array
    {
        $list = [];

        foreach ($targets as $key => $value) {
            // 写法二：['addon:shop' => '1.6.4']
            if (is_string($key)) {
                $list[] = [
                    'key'     => $key,
                    'version' => is_scalar($value) ? trim((string) $value) : '',
                ];

                continue;
            }

            // 写法三：[['key' => 'addon:shop', 'version' => '1.6.4']]
            if (is_array($value)) {
                $version = $value['version'] ?? null;

                $list[] = [
                    'key'     => (string) ($value['key'] ?? $value['target'] ?? ''),
                    'version' => is_scalar($version) ? trim((string) $version) : '',
                ];

                continue;
            }

            // 写法一：['framework', 'addon:shop']
            $list[] = ['key' => (string) $value, 'version' => ''];
        }

        // 空 key（既没给标识、又不是合法写法）直接丢掉，最后统一判断有没有剩下有效目标
        $list = array_values(array_filter($list, static fn (array $item): bool => trim($item['key']) !== ''));

        if ($list === []) {
            throw new CommonException('未传入要比对的目标（框架或插件标识）');
        }

        return $list;
    }

    /**
     * 失败分支里尽量补全目标的 key / name / version
     *
     * skipped 与 error 时 prepare() 已经抛出、拿不到它的 context，但调用方仍然需要知道
     * 「说的是哪个目标、哪个版本」。做法与 IntegrityService::skippedResult() 一致：
     * 再解析一次目标，解析不了就保持原样（key 兜底）。
     *
     * ★ version 只在调用方没指定时才回填：他指定了就以他给的为准 ——
     *   那是他问的东西，哪怕云端没有这个版本。
     */
    private function fillTargetLoose(array $row, string $key): array
    {
        try {
            $target = $this->resolveTarget($key);

            $row['key']  = (string) $target['key'];
            $row['name'] = (string) $target['name'];

            if ($row['version'] === '') {
                $row['version'] = (string) $target['version'];
            }
        } catch (Throwable $e) {
            // 目标本身也解析不了（如插件缺 info.json）：保持原样即可
        }

        return $row;
    }

    /**
     * 比对单个目标（批量里的一个单元）
     *
     * ★ 所有失败都在这里收敛成返回值，不往外抛：批量场景下「一个目标坏了」不该让整批失败，
     *   调用方按 target 级读 error / skipped 就能区分「有差异」「没比成」「报错」三种情况。
     *
     * @param int $chunkSize 分片大小（与 admin 层同一口径）
     */
    private function compareOneTarget(string $key, string $version, bool $allowDownload, int $chunkSize): array
    {
        $row = [
            'key'         => $key,
            'name'        => $key,
            'version'     => $version,
            'has_diff'    => false,
            'diff_files'  => [],
            'skipped'     => false,
            'skip_reason' => '',
            'warnings'    => [],
            'error'       => '',
        ];

        try {
            $context = $this->prepare($key, null, $allowDownload, $version !== '' ? $version : null);
        } catch (CloudPackageMissingException $e) {
            // 云端没有该版本的包体：与 check() / stream() 同一套语义 —— 不是失败，是「这次没比成」。
            // ★ 必须单独标记出来，否则上层会把「没检测」当成「没有差异」。
            $row['skipped']     = true;
            $row['skip_reason'] = $e->getMessage();
            $row['warnings']    = array_merge($this->takeWarnings(), [$e->getMessage()]);

            return $this->fillTargetLoose($row, $key);
        } catch (Throwable $e) {
            // 目标不存在、版本号非法、云端异常等：记在该目标上，批量的其它目标照跑
            $row['error']    = $e->getMessage();
            $row['warnings'] = $this->takeWarnings();

            return $this->fillTargetLoose($row, $key);
        }

        // 回落本地版本时，这里拿到的才是真正参与比对的版本
        $row['key']     = (string) $context['target']['key'];
        $row['name']    = (string) $context['target']['name'];
        $row['version'] = (string) $context['target']['version'];

        try {
            $cursor = 0;

            while (true) {
                $chunk = $this->scanChunk($context, $cursor, $chunkSize);

                foreach ($chunk['details'] as $detail) {
                    // 只保留「路径 + 状态」：比对结论用不到大小与哈希
                    $row['diff_files'][] = [
                        'file'   => (string) $detail['file'],
                        'status' => (string) $detail['status'],
                    ];
                }

                if ($chunk['done']) {
                    break;
                }

                $cursor = (int) $chunk['next_cursor'];
            }
        } catch (Throwable $e) {
            $row['error'] = $e->getMessage();
        }

        $row['has_diff'] = $row['diff_files'] !== [];
        $row['warnings'] = array_merge($row['warnings'], $this->takeWarnings());

        return $row;
    }

    /**
     * 取目标版本号；不可用时直接抛异常
     *
     * ★ 绝不允许「猜一个版本号」：猜出来的版本会写出错误的文件名，
     *   命中错误的清单，最终变成静默漏报（文件被改了却查不出来）。
     *
     * @throws CommonException
     */
    private function targetVersionOrFail(array $target): string
    {
        if (!empty($target['version']) && is_string($target['version'])) {
            return $target['version'];
        }

        $hint = str_starts_with((string) $target['key'], 'addon:')
            ? 'addon/' . substr((string) $target['key'], strlen('addon:')) . '/info.json 缺失，或其中没有有效的 version 字段'
            : '无法确定该目标的版本号';

        throw new CommonException(
            '无法确定检测目标「' . $target['key'] . '」的版本号（' . $hint . '）。'
            . '插件版本必须实时读取，不允许兜底猜测 —— 猜出来的版本会命中错误的清单，造成静默漏报。'
        );
    }

    /**
     * 计算「清单里有、当前没有」的文件
     */
    private function diffDeleted(array $baseline, array $files): array
    {
        $currentIndex = array_flip($files);
        $deleted      = [];

        foreach (array_keys($baseline) as $file) {
            if (!isset($currentIndex[$file])) {
                $deleted[] = $file;
            }
        }

        sort($deleted);

        return $deleted;
    }
}
