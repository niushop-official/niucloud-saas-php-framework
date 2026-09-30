<?php
declare(strict_types=1);

namespace core\integrity;

use core\exception\CommonException;

/**
 * 清单（完整校验值列表）的本地缓存管理
 *
 * 路径规则：
 *   {baseline_dir}/{product}/{name}/{version}_{profile}_{algorithm}.json
 *   校验和：同路径 + .sha256
 *
 * @package core\integrity
 */
class BaselineManager
{
    /** 规则段枚举（顺序即生成顺序：先 bom 后 eol） */
    public const PROFILES = ['none', 'bom', 'eol', 'bom-eol'];

    /** 算法段枚举（对外名） */
    public const ALGORITHMS = ['crc32', 'md5', 'sha256', 'sha512'];

    /** 当前三段组合的清单存在且校验通过 */
    public const STATUS_READY = 'ready';
    /** 该目标目录不存在，或目录下没有任何清单 */
    public const STATUS_MISSING = 'missing';
    /** 有清单，但没有任一份的版本号等于当前版本 */
    public const STATUS_VERSION_MISMATCH = 'version_mismatch';
    /** 有当前版本的清单，但没有规则与算法同时匹配当前组合的 */
    public const STATUS_CONFIG_MISMATCH = 'config_mismatch';
    /** 三段都匹配、文件也在，但它记录的缓存签名与当前不一致（排除规则或归一化白名单变过） */
    public const STATUS_RULES_MISMATCH = 'rules_mismatch';
    /** 目标文件存在，但 .sha256 校验不通过 */
    public const STATUS_CORRUPTED = 'corrupted';

    /** 清单根目录（绝对路径） */
    private string $root;

    public function __construct(?string $root = null)
    {
        $this->root = rtrim($root ?: (string) config('integrity.baseline_dir'), DIRECTORY_SEPARATOR);
    }

    public function root(): string
    {
        return $this->root;
    }

    /**
     * 清单所在目录：{root}/{product}/{name}
     */
    public function dir(string $product, string $name): string
    {
        return $this->root . DIRECTORY_SEPARATOR
            . $this->safeSegment($product) . DIRECTORY_SEPARATOR
            . $this->safeSegment($name);
    }

    /**
     * 清单文件名：{version}_{profile}_{algorithm}.json
     *
     * @throws CommonException
     */
    public function fileName(string $version, string $profile, string $algorithm): string
    {
        if (preg_match('/^[A-Za-z0-9][A-Za-z0-9._\-]*$/', $version) !== 1) {
            throw new CommonException('非法的版本号段: ' . $version);
        }
        if (!in_array($profile, self::PROFILES, true)) {
            throw new CommonException('非法的规则段: ' . $profile . '（可选 ' . implode(' / ', self::PROFILES) . '）');
        }
        if (!in_array($algorithm, self::ALGORITHMS, true)) {
            throw new CommonException('非法的算法段: ' . $algorithm . '（可选 ' . implode(' / ', self::ALGORITHMS) . '）');
        }

        return $version . '_' . $profile . '_' . $algorithm . '.json';
    }

    /**
     * 清单完整路径（绝对）
     *
     * @throws CommonException
     */
    public function filePath(string $product, string $name, string $version, string $profile, string $algorithm): string
    {
        return $this->dir($product, $name) . DIRECTORY_SEPARATOR
            . $this->fileName($version, $profile, $algorithm);
    }

    /**
     * 校验和文件完整路径（绝对）
     *
     * @throws CommonException
     */
    public function hashPath(string $product, string $name, string $version, string $profile, string $algorithm): string
    {
        return $this->filePath($product, $name, $version, $profile, $algorithm) . '.sha256';
    }

    /**
     * 清单「缓存签名」的伴随文件路径
     *
     * 单独存一个纯文本伴随文件，**不改动清单 JSON 的结构** ——
     * 这样本地缓存与云端下发的清单保持逐字节同构，出了问题可以直接对比排查。
     *
     * 后缀沿用 .rules（历史命名），内容见 buildSignature()。
     */
    public function cacheSignaturePath(string $product, string $name, string $version, string $profile, string $algorithm): string
    {
        return $this->filePath($product, $name, $version, $profile, $algorithm) . '.rules';
    }

    /**
     * 读取清单落盘时记录的缓存签名（读不到返回空串）
     */
    public function cacheSignature(string $product, string $name, string $version, string $profile, string $algorithm): string
    {
        $path = $this->cacheSignaturePath($product, $name, $version, $profile, $algorithm);

        return is_file($path) ? trim((string) file_get_contents($path)) : '';
    }

    /**
     * 拼清单的缓存签名 = 规则版本 + 归一化白名单版本
     *
     * 两者任一变化都会改变清单内容，所以都要参与新鲜度判定：
     *   - 排除规则变了     → 参与扫描的文件集合变了；
     *   - 归一化白名单变了 → 同一批文件的哈希算法变了。
     *
     * ★ 只比对规则版本是不够的：那样白名单一改，本地缓存仍然「命中」，
     *   就会拿按旧白名单算出来的哈希去比对，那批文件会全部被报成「已修改」。
     *   服务端也是这么算的（manifestSignature = 规则版本 + normalizeVersion），
     *   两边依据同一套量，排查时才对得上。
     */
    public static function buildSignature(string $rulesVersion, string $normalizeVersion): string
    {
        return $rulesVersion . '-' . $normalizeVersion;
    }

    /**
     * 清单记录的缓存签名是否匹配期望值
     *
     * - 期望值为空串 = 不校验（例如只想看清单本身能不能读）
     * - 期望值非空、但清单没记录签名 → 判定为**不匹配**
     *   理由：无法证明它是用当前规则/白名单生成的，宁可重下一次，也不能拿旧产物去比对
     */
    public function signatureMatches(string $product, string $name, string $version, string $profile, string $algorithm, string $expectedSignature = ''): bool
    {
        if ($expectedSignature === '') {
            return true;
        }

        return $this->cacheSignature($product, $name, $version, $profile, $algorithm) === $expectedSignature;
    }

    // ==================== 排除规则的本地缓存 ====================
    //
    // ★ 保留但不再调用：规则已改为读本站 config/hash_rules.ignore（见 RulesProvider），
    //   这一组方法属于「从云端拉取规则」那条链路，与其一并保留备查。

    /**
     * 规则缓存目录：{root}/{product}/_rules
     */
    public function rulesDir(string $product): string
    {
        return $this->root . DIRECTORY_SEPARATOR
            . $this->safeSegment($product) . DIRECTORY_SEPARATOR . '_rules';
    }

    /**
     * 某个版本规则的缓存路径
     *
     * @throws CommonException
     */
    public function rulesPath(string $product, string $version): string
    {
        return $this->rulesDir($product) . DIRECTORY_SEPARATOR . $this->safeSegment($version) . '.json';
    }

    /**
     * 读取本地缓存的规则
     *
     * @return array|null 命中返回规则数组；否则 null
     * @throws CommonException
     */
    public function loadRules(string $product, string $version): ?array
    {
        if ($version === '') {
            return null;
        }

        $path = $this->rulesPath($product, $version);
        if (!is_file($path)) {
            return null;
        }

        $data = json_decode((string) file_get_contents($path), true);

        return is_array($data) ? $data : null;
    }

    /**
     * 缓存规则（原子写入）
     *
     * @throws CommonException
     */
    public function saveRules(string $product, array $rules): void
    {
        $version = trim((string) ($rules['version'] ?? ''));
        if ($version === '') {
            throw new CommonException('规则缺少 version 字段，无法缓存');
        }

        $dir = $this->rulesDir($product);
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new CommonException('规则缓存目录创建失败，请检查写入权限: ' . $dir);
        }

        $json = json_encode($rules, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new CommonException('规则序列化失败: ' . json_last_error_msg());
        }

        $path = $this->rulesPath($product, $version);
        $tmp  = $path . '.tmp';

        if (file_put_contents($tmp, $json) === false) {
            throw new CommonException('规则写入失败: ' . $tmp);
        }

        if (!rename($tmp, $path)) {
            @unlink($tmp);
            throw new CommonException('规则落盘失败: ' . $path);
        }
    }

    /**
     * 「最新规则版本」标记文件路径
     *
     * 用一个小文本文件记住最近一次成功拉到的规则版本，
     * 这样正常检测路径（规则没变）可以完全不联网。
     */
    public function latestRulesVersionPath(string $product): string
    {
        return $this->rulesDir($product) . DIRECTORY_SEPARATOR . '_latest';
    }

    /**
     * 读取「最新规则版本」（读不到返回空串）
     */
    public function loadLatestRulesVersion(string $product): string
    {
        $path = $this->latestRulesVersionPath($product);

        return is_file($path) ? trim((string) file_get_contents($path)) : '';
    }

    /**
     * 记录「最新规则版本」
     *
     * 这里失败不抛异常：只是下次检测会多一次网络请求，不影响正确性。
     */
    public function saveLatestRulesVersion(string $product, string $version): void
    {
        $dir = $this->rulesDir($product);
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            return;
        }

        @file_put_contents($this->latestRulesVersionPath($product), $version);
    }

    /**
     * 对外展示用的相对路径（统一 / 分隔，相对站点根）
     */
    public function relativePath(string $product, string $name, string $version, string $profile, string $algorithm): string
    {
        $prefix = rtrim(str_replace('\\', '/', root_path()), '/') . '/';
        $full   = str_replace('\\', '/', $this->filePath($product, $name, $version, $profile, $algorithm));

        return str_starts_with($full, $prefix) ? substr($full, strlen($prefix)) : $full;
    }

    /**
     * 清单是否可用（存在 + 校验通过 + 缓存签名一致）
     *
     * @param string $expectedSignature 期望的缓存签名（见 buildSignature）；传空串表示不校验
     */
    public function isReady(string $product, string $name, string $version, string $profile, string $algorithm, string $expectedSignature = ''): bool
    {
        if ($this->load($product, $name, $version, $profile, $algorithm) === null) {
            return false;
        }

        return $this->signatureMatches($product, $name, $version, $profile, $algorithm, $expectedSignature);
    }

    /**
     * 读取清单
     *
     * @return array|null 命中返回「清单键 => 校验值」；否则返回 null
     */
    public function load(string $product, string $name, string $version, string $profile, string $algorithm): ?array
    {
        $file     = $this->filePath($product, $name, $version, $profile, $algorithm);
        $hashFile = $file . '.sha256';

        if (!is_file($file) || !is_file($hashFile)) {
            return null;
        }

        $expected = trim((string) file_get_contents($hashFile));
        $actual   = hash_file('sha256', $file);

        // 用 hash_equals 做定长安全比较
        if ($expected === '' || $actual === false || !hash_equals($expected, $actual)) {
            return null;
        }

        $data = json_decode((string) file_get_contents($file), true);

        return is_array($data) ? $data : null;
    }

    /**
     * 保存清单（原子写入：先写 .tmp 再 rename）
     *
     * @param string $cacheSignature 缓存签名（见 buildSignature）；写失败不中断
     * @throws CommonException
     */
    public function save(string $product, string $name, string $version, string $profile, string $algorithm, array $list, string $cacheSignature = ''): void
    {
        $dir = $this->dir($product, $name);

        // 目录按需创建（不在构造函数里创建，避免「只读一次状态」也产生副作用）
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new CommonException('清单目录创建失败，请检查写入权限: ' . $dir);
        }

        $json = json_encode($list, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new CommonException('清单序列化失败: ' . json_last_error_msg());
        }

        $file = $dir . DIRECTORY_SEPARATOR . $this->fileName($version, $profile, $algorithm);
        $tmp  = $file . '.tmp';

        if (file_put_contents($tmp, $json) === false) {
            throw new CommonException('清单写入失败: ' . $tmp);
        }

        if (!rename($tmp, $file)) {
            @unlink($tmp);
            throw new CommonException('清单落盘失败: ' . $file);
        }

        // 落盘成功后立刻写校验和；写不成功就把清单删掉，避免留下不可用产物
        $hash = hash_file('sha256', $file);
        if ($hash === false || file_put_contents($file . '.sha256', $hash) === false) {
            @unlink($file);
            throw new CommonException('清单校验和写入失败: ' . $file . '.sha256');
        }

        // 记录生成这份清单时的缓存签名，供下次读取时判定还能不能直接用。
        // 这里写失败不中断：清单本身是好的，只是下次会因「签名未记录」而重新下载。
        if ($cacheSignature !== '') {
            @file_put_contents($file . '.rules', $cacheSignature);
        }
    }

    /**
     * 状态判定（6 种状态）
     *
     * @param string $expectedSignature 期望的缓存签名（见 buildSignature）；传空串表示不校验
     * @throws CommonException
     */
    public function status(string $product, string $name, string $version, string $profile, string $algorithm, string $expectedSignature = ''): string
    {
        $file = $this->filePath($product, $name, $version, $profile, $algorithm);

        if (is_file($file)) {
            if ($this->load($product, $name, $version, $profile, $algorithm) === null) {
                return self::STATUS_CORRUPTED;
            }

            return $this->signatureMatches($product, $name, $version, $profile, $algorithm, $expectedSignature)
                ? self::STATUS_READY
                : self::STATUS_RULES_MISMATCH;
        }

        $existing = $this->listExisting($product, $name);
        if ($existing === []) {
            return self::STATUS_MISSING;
        }

        $sameVersion = array_filter($existing, static fn (array $item): bool => $item['version'] === $version);
        if ($sameVersion === []) {
            return self::STATUS_VERSION_MISMATCH;
        }

        return self::STATUS_CONFIG_MISMATCH;
    }

    /**
     * 列出该目标目录下已有的全部清单（已解析成三段）
     *
     * @return array 每项形如 ['version'=>..,'profile'=>..,'algorithm'=>..,'file'=>..]
     */
    public function listExisting(string $product, string $name): array
    {
        $dir = $this->dir($product, $name);
        if (!is_dir($dir)) {
            return [];
        }

        $result = [];
        foreach ((array) glob($dir . DIRECTORY_SEPARATOR . '*.json') as $file) {
            $parsed = self::parseFileName($file);
            if ($parsed === null) {
                continue; // 不是本方案命名的文件（例如 .tmp），跳过
            }
            $parsed['file'] = basename($file);
            $result[]       = $parsed;
        }

        return $result;
    }

    /**
     * 清理旧版本清单
     *
     * ★ 只清理「版本号不等于当前版本」的文件。
     *   切换规则或算法时不要清理 —— 切回来还能直接复用，不用重新下载。
     */
    public function cleanOtherVersions(string $product, string $name, string $version): void
    {
        $dir = $this->dir($product, $name);

        foreach ($this->listExisting($product, $name) as $item) {
            if ($item['version'] === $version) {
                continue;
            }

            $file = $dir . DIRECTORY_SEPARATOR . $item['file'];
            @unlink($file);
            @unlink($file . '.sha256');
        }
    }

    /**
     * 反向解析文件名
     * 能这么切的前提：三段都不含下划线（版本形如 2.0.2，规则/算法都是固定枚举）
     *
     * @return array|null ['version'=>..,'profile'=>..,'algorithm'=>..]；不符合规范时返回 null
     */
    public static function parseFileName(string $file): ?array
    {
        $parts = explode('_', basename($file, '.json'));
        if (count($parts) !== 3) {
            return null;
        }

        [$version, $profile, $algorithm] = $parts;

        if (!in_array($profile, self::PROFILES, true) || !in_array($algorithm, self::ALGORITHMS, true)) {
            return null;
        }

        return ['version' => $version, 'profile' => $profile, 'algorithm' => $algorithm];
    }

    /**
     * 目录段安全化：只保留 [A-Za-z0-9_-]，并禁止 . 与 ..
     *
     * @throws CommonException
     */
    private function safeSegment(string $segment): string
    {
        $segment = (string) preg_replace('/[^A-Za-z0-9_\-]/', '_', $segment);

        if ($segment === '' || $segment === '.' || $segment === '..') {
            throw new CommonException('非法的路径段: ' . $segment . '（不允许为空或 . / ..）');
        }

        return $segment;
    }
}
