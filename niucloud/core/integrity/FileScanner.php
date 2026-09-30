<?php
declare(strict_types=1);

namespace core\integrity;

use core\exception\CommonException;

/**
 * 目录扫描 + 单文件校验值生成
 *
 * 本类只负责「读」，不写入、不删除任何业务文件。
 *
 * @package core\integrity
 */
class FileScanner
{
    /** 归一化支持的规则段取值（顺序即生成顺序：先 bom 后 eol） */
    public const PROFILES = ['none', 'bom', 'eol', 'bom-eol'];

    /** 读文件的块大小：64KB，兼顾内存占用与循环次数 */
    private const CHUNK_BYTES = 65536;

    /**
     * 配置（来自 config/integrity.php）
     */
    private array $config;

    public function __construct(array $config = [])
    {
        $this->config = $config ?: (array) config('integrity');
    }

    /**
     * 归一化白名单的版本号（内容一变就变）
     *
     * 与服务端 normalizeVersion() 对齐：扩展名去重、排序后用逗号连接，取 md5 前 8 位。
     *
     * ★ 为什么要单独算一个版本：白名单变化会改变参与哈希的字节流，却**不会**改变
     *   排除规则版本号。若不把它并进清单缓存签名，白名单一改，客户端仍会继续使用
     *   「按旧白名单算出来的清单」，那批文件就会全部被报成「已修改」。
     *
     * 去重是必要的：服务端用的是 map（键天然唯一），PHP 数组若含重复项，
     * 不去重就会算出与服务端不同的版本号。
     *
     * @param array $extensions 扩展名列表（normalize.extensions）
     */
    public static function normalizeVersion(array $extensions): string
    {
        $exts = array_map(static fn ($e) => strtolower((string) $e), $extensions);
        $exts = array_values(array_unique($exts));
        sort($exts);

        return substr(md5(implode(',', $exts)), 0, 8);
    }

    /**
     * 两个开关 → 规则段
     *
     * 固定顺序：先 bom 后 eol。分隔符用短横线：
     *   - 不能用下划线，会破坏「{版本}_{规则}_{算法}.json」的三段结构
     *   - 不能用加号，作为 URL 查询参数时会被解码成空格
     */
    public static function normalizeProfile(array $normalize): string
    {
        $parts = [];
        if (!empty($normalize['is_bom'])) {
            $parts[] = 'bom';
        }
        if (!empty($normalize['is_crlf_lf'])) {
            $parts[] = 'eol';
        }

        return $parts === [] ? 'none' : implode('-', $parts);
    }

    /**
     * 规则段 → 两个开关（反向，供展示、调试、状态判定使用）
     */
    public static function parseProfile(string $profile): array
    {
        if ($profile === 'none') {
            return ['is_bom' => false, 'is_crlf_lf' => false];
        }

        $parts = explode('-', $profile);

        return [
            'is_bom'     => in_array('bom', $parts, true),
            'is_crlf_lf' => in_array('eol', $parts, true),
        ];
    }

    /**
     * 列出需要参与检测的文件
     *
     * @param string $base  扫描基准（相对 root_path()）。空串 = root_path()；'..' = 站点根。
     *                      返回的键是「文件相对 base 的路径」，必须与清单键一致。
     * @param array  $paths 待扫描的子目录（相对 base）。传空数组表示扫描整个 base。
     * @param array  $rules 排除规则，形如 ['version'=>.., 'patterns'=>[...]]（git 忽略规格）
     * @return array 排序后的键列表，如 ['niucloud/app/common.php','admin/index.vue']
     * @throws CommonException
     */
    public function listFiles(string $base, array $paths, array $rules): array
    {
        $baseAbs = $this->absolutePath($base);

        if (!is_dir($baseAbs)) {
            throw new CommonException('扫描基准目录不存在: ' . ($base === '' ? '(root_path)' : $base));
        }

        // 没有指定子目录 = 扫描整个 base
        if ($paths === []) {
            $paths = [''];
        }

        // ★ 匹配器只构造一次（正则在这里预编译），绝不能放进遍历循环里
        $matcher = new IgnoreMatcher((array) ($rules['patterns'] ?? []));

        $result = [];

        foreach ($paths as $path) {
            $relative = $this->normalize((string) $path);
            $absolute = $relative === ''
                ? $baseAbs
                : $baseAbs . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relative);

            if (!is_dir($absolute)) {
                throw new CommonException('目录不存在: ' . ($base === '' ? $relative : $base . '/' . $relative));
            }

            $this->walk($absolute, $relative, $matcher, $result);
        }

        $result = array_values(array_unique($result));
        sort($result); // 必须排序：后台分片的游标是下标，顺序必须稳定

        return $result;
    }

    /**
     * 对文件清单的一段区间计算校验值
     *
     * @param array  $files     键清单（listFiles 的返回值）
     * @param string $base      扫描基准（与 listFiles 用的同一个），用于还原绝对路径
     * @param string $algorithm 算法（对外名）
     * @param array  $normalize ['is_bom' => bool, 'is_crlf_lf' => bool]
     * @param int    $offset    起始下标（游标）
     * @param int    $limit     本片数量；传 0 表示不限制（全量）
     * @return array 键 => 校验值
     * @throws CommonException
     */
    public function hashChunk(array $files, string $base, string $algorithm, array $normalize, int $offset = 0, int $limit = 0): array
    {
        $this->assertAlgorithm($algorithm);

        $slice = $limit > 0 ? array_slice($files, $offset, $limit) : array_slice($files, $offset);
        $map   = [];

        foreach ($slice as $key) {
            $absolute = $this->absoluteFor($base, (string) $key);

            // 只有白名单内的文本文件才做归一化，其余按原始字节计算
            $normalizeForFile = $this->shouldNormalize((string) $key, $absolute)
                ? $normalize
                : ['is_bom' => false, 'is_crlf_lf' => false];

            $map[$key] = $this->hashFile($absolute, $algorithm, $normalizeForFile);
        }

        return $map;
    }

    /**
     * 在「忽略 BOM / 行尾」的意义下，文件是否等价于给定校验值
     *
     * 与 hashChunk 的唯一区别：**不看扩展名白名单**。
     *
     * 白名单是 shouldNormalize() 那道闸，为的是性能与「别去动二进制文件」；
     * 而「BOM 与行尾不算差异」是**规则**层面的承诺，不该因为扩展名不在名单里就失效。
     * 典型例子 admin/postcss.config.cjs：本地 LF、官方 CRLF，两侧内容看起来一模一样，
     * 却因为 cjs 不在名单里被按原始字节比对，于是被报成「已修改」
     * （对比视图是词级比对，行尾差异不产生任何高亮，所以用户只会觉得「明明一样」）。
     *
     * 做法：把文件内容按「BOM 有无 × 行尾 LF/CRLF」各算一次，只要有一种等于
     * $expected，就说明差异只来自这两样东西。
     *
     * ★ 只可能「少报」BOM/行尾差异，不会漏掉真实改动 ——
     *   真实改动的内容不可能等价于清单值的这几种写法。
     *
     * @param string $base      扫描基准（与 hashChunk 用同一个）
     * @param string $key       相对 base 的键
     * @param string $algorithm 算法（对外名）
     * @param string $expected  清单里记录的校验值
     * @param bool   $ignoreBom 关闭时不展开「有/无 BOM」两种写法
     * @param bool   $ignoreEol 关闭时不展开「LF/CRLF」两种写法
     */
    public function matchesIgnoringBomEol(
        string $base,
        string $key,
        string $algorithm,
        string $expected,
        bool $ignoreBom,
        bool $ignoreEol
    ): bool {
        if ($expected === '') {
            return false;
        }

        $absolute = $this->absoluteFor($base, $key);

        if (!is_file($absolute) || !is_readable($absolute)) {
            return false;
        }

        $bytes = @file_get_contents($absolute);
        if ($bytes === false) {
            return false;
        }

        $algo = $this->hashAlgo($algorithm);

        foreach ($this->bomEolVariants($bytes, $ignoreBom, $ignoreEol) as $variant) {
            if (hash($algo, $variant) === $expected) {
                return true;
            }
        }

        return false;
    }

    /**
     * 「BOM 有无 × 行尾 LF/CRLF」的候选写法
     *
     * 关掉某个开关时该维度不展开、只保留原样，于是：
     *   两个都关 → 一份（原样，等价于原始字节比对）
     *   只开 BOM → 两份（去掉 BOM / 补上 BOM）
     *   只开行尾 → 两份（统一成 LF / 统一成 CRLF）
     *   都开     → 四份（去重后；原样那份也在其中）
     */
    private function bomEolVariants(string $bytes, bool $ignoreBom, bool $ignoreEol): array
    {
        if ($ignoreBom) {
            // 清单可能是「带 BOM」或「不带 BOM」算的，两种都试
            $without = (string) preg_replace('/^\xEF\xBB\xBF/', '', $bytes);
            $bodies  = [$without, "\xEF\xBB\xBF" . $without];
        } else {
            $bodies = [$bytes];
        }

        $variants = [];

        foreach ($bodies as $body) {
            if ($ignoreEol) {
                // 清单可能是 LF 或 CRLF 算的，两种都试
                $lf         = str_replace(["\r\n", "\r"], "\n", $body);
                $variants[] = $lf;
                $variants[] = str_replace("\n", "\r\n", $lf);
            } else {
                $variants[] = $body;
            }
        }

        return array_values(array_unique($variants));
    }

    /**
     * 「相对 base 的键」对应的绝对路径
     *
     * 与 hashChunk() 内部的拼法保持一致，供需要单独访问某个文件的调用方复用。
     */
    public function absoluteFor(string $base, string $key): string
    {
        return $this->absolutePath($base) . DIRECTORY_SEPARATOR
            . str_replace('/', DIRECTORY_SEPARATOR, $key);
    }

    /**
     * 文件大小（字节）；读不到返回 0
     *
     * 只给「差异文件」这类少量文件调用，避免整目录遍历时多一遍 stat。
     */
    public function fileSize(string $absolute): int
    {
        // 同进程内可能已缓存 stat 结果，清一下确保拿到当前值
        clearstatcache(true, $absolute);

        $size = @filesize($absolute);

        return $size === false ? 0 : (int) $size;
    }

    /**
     * 校验算法是否在白名单内
     *
     * @throws CommonException
     */
    public function assertAlgorithm(string $algorithm): void
    {
        $allow = $this->config['algorithms'] ?? self::defaultAlgorithms();
        if (!in_array($algorithm, $allow, true)) {
            throw new CommonException('不支持的算法: ' . $algorithm . '（可选 ' . implode(' / ', $allow) . '）');
        }
    }

    /**
     * 相对路径转绝对路径
     * 传入绝对路径时原样返回；传入相对路径时基于 root_path() 拼接
     * 空串返回 root_path() 本身；'..' 会拼成 {root_path}/.. = 站点根
     */
    public function absolutePath(string $path): string
    {
        $path = trim(str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path));

        // Windows 盘符（C:\...）或 Unix 根（/...）视为绝对路径
        if (preg_match('/^[A-Za-z]:/', $path) === 1 || str_starts_with($path, DIRECTORY_SEPARATOR)) {
            return rtrim($path, DIRECTORY_SEPARATOR);
        }

        $root = rtrim(root_path(), DIRECTORY_SEPARATOR);
        $path = trim($path, DIRECTORY_SEPARATOR);

        // 空串 = root_path() 本身，不能拼成 "...\niucloud<分隔符>"
        return $path === '' ? $root : $root . DIRECTORY_SEPARATOR . $path;
    }

    /**
     * 对外算法名 → PHP hash 算法名
     *
     * 对外统一叫 crc32（更符合直觉），但 PHP 里等价于 crc32() 的算法名是 crc32b，
     * hash_init('crc32') 算的是「反转 CRC32」，与 crc32() 不是一回事。
     */
    private function hashAlgo(string $algorithm): string
    {
        return $algorithm === 'crc32' ? 'crc32b' : $algorithm;
    }

    /**
     * 该文件是否允许做归一化
     * 条件一：扩展名在 normalize.extensions 白名单内
     * 条件二：不是 UTF-16 编码（UTF-16 的换行是 0D 00 0A 00，按字节规则处理会算坏）
     */
    private function shouldNormalize(string $relative, string $absolute): bool
    {
        $extensions = (array) ($this->config['normalize']['extensions'] ?? []);

        $ext = strtolower(pathinfo($relative, PATHINFO_EXTENSION));
        if ($ext === '' || !in_array($ext, $extensions, true)) {
            return false;
        }

        return !$this->isUtf16($absolute);
    }

    /**
     * 文件头是否是 UTF-16 BOM（FF FE 或 FE FF）
     */
    private function isUtf16(string $absolute): bool
    {
        $fp = @fopen($absolute, 'rb');
        if ($fp === false) {
            return false;
        }

        $head = (string) fread($fp, 2);
        fclose($fp);

        return $head === "\xFF\xFE" || $head === "\xFE\xFF";
    }

    /**
     * 统一路径分隔符为 /，并去掉首尾斜杠
     */
    private function normalize(string $path): string
    {
        return trim(str_replace('\\', '/', $path), '/');
    }

    /**
     * 递归遍历目录
     *
     * ★ 目录一旦被判定为忽略，整棵子树直接剪掉（不再递归）。
     *   这与 git 的「父目录被排除时，其下文件无法用取反规则重新包含」一致，
     *   既是正确行为，也是本功能最大的性能来源。
     *
     * @param string       $absoluteDir 当前绝对目录
     * @param string       $keyPrefix   当前键前缀（相对 base，用 / 分隔）
     * @param IgnoreMatcher $matcher    排除规则匹配器（已预编译）
     * @param array        $result      结果收集容器
     */
    private function walk(string $absoluteDir, string $keyPrefix, IgnoreMatcher $matcher, array &$result): void
    {
        $items = @scandir($absoluteDir);
        if ($items === false) {
            return; // 无读取权限则跳过该目录，不中断整个检测
        }

        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }

            $key      = $keyPrefix === '' ? $item : $keyPrefix . '/' . $item;
            $absolute = $absoluteDir . DIRECTORY_SEPARATOR . $item;

            if (is_dir($absolute)) {
                if ($matcher->isIgnored($key, true)) {
                    continue; // 剪枝：整棵子树跳过
                }
                $this->walk($absolute, $key, $matcher, $result);
            } else {
                if ($matcher->isIgnored($key, false)) {
                    continue;
                }
                $result[] = $key;
            }
        }
    }

    /**
     * 计算单个文件的校验值
     *
     * 分三档走：
     *   1) 不做归一化          → hash_file()，C 层一次调用，最快
     *   2) 只忽略 BOM          → 流式读，但不做行尾替换
     *   3) 忽略行尾（含组合）  → 流式读 + 跨块 CR 处理 + 行尾替换，最慢
     *
     * @return string 校验值；文件读不了时返回空字符串（比对环节会判定为「已变化」）
     */
    private function hashFile(string $absolutePath, string $algorithm, array $normalize): string
    {
        if (!is_file($absolutePath) || !is_readable($absolutePath)) {
            return '';
        }

        $ignoreBom = !empty($normalize['is_bom']);
        $ignoreEol = !empty($normalize['is_crlf_lf']);

        // 档位 1：不需要归一化，直接走最快的路径
        if (!$ignoreBom && !$ignoreEol) {
            $hash = hash_file($this->hashAlgo($algorithm), $absolutePath);

            return $hash === false ? '' : $hash;
        }

        return $this->hashStream($absolutePath, $algorithm, $ignoreBom, $ignoreEol);
    }

    /**
     * 流式读取 + 归一化 + 计算校验值
     *
     * ★★★ 全文最容易写错的地方在这里 ★★★
     *
     * \r 和 \n 可能被切在 64KB 块的边界上：
     *   第 1 块结尾是 \r，第 2 块开头是 \n —— 它们其实是一个 CRLF。
     *
     * 如果对每块单独 str_replace：
     *   第 1 块末尾的 \r 会被当成「孤立 CR」换成 \n，
     *   第 2 块开头的 \n 保持原样，
     *   最终得到两个 \n，而整块处理时只会得到一个 \n。
     * 结果是：同一个文件，在不同机器（或不同分块方式）下算出不同的校验值。
     *
     * 正确做法：把块尾的 \r「扣住」不处理，等下一块来了再看：
     *   - 下一块开头是 \n → 这是一个被切断的 CRLF，补一个 \n，并吃掉那个 \n
     *   - 下一块开头不是 \n → 这是一个孤立 CR，补一个 \n，下一块原样继续
     * 若整个文件以孤立 \r 结尾，循环结束后要再补一个 \n。
     */
    private function hashStream(string $absolutePath, string $algorithm, bool $ignoreBom, bool $ignoreEol): string
    {
        $fp = @fopen($absolutePath, 'rb');
        if ($fp === false) {
            return '';
        }

        $ctx       = hash_init($this->hashAlgo($algorithm));
        $isFirst   = true;
        $pendingCr = false;

        while (!feof($fp)) {
            $chunk = (string) fread($fp, self::CHUNK_BYTES);
            if ($chunk === '') {
                break;
            }

            if ($isFirst) {
                if ($ignoreBom) {
                    // BOM 只可能出现在文件最开头，所以只处理第一块
                    $chunk = (string) preg_replace('/^\xEF\xBB\xBF/', '', $chunk);
                }
                $isFirst = false;
            }

            if ($ignoreEol) {
                // 先把上一块扣住的 CR 结清
                if ($pendingCr) {
                    hash_update($ctx, "\n");

                    if ($chunk !== '' && $chunk[0] === "\n") {
                        $chunk = substr($chunk, 1); // 吃掉被切断的 CRLF 的 \n
                    }

                    $pendingCr = false;
                }

                // 再扣住本块末尾的 CR，等下一块来判断
                if ($chunk !== '' && str_ends_with($chunk, "\r")) {
                    $chunk     = substr($chunk, 0, -1);
                    $pendingCr = true;
                }

                $chunk = str_replace(["\r\n", "\r"], "\n", $chunk);
            }

            hash_update($ctx, $chunk);
        }

        // 文件以孤立 CR 结尾
        if ($ignoreEol && $pendingCr) {
            hash_update($ctx, "\n");
        }

        fclose($fp);

        return hash_final($ctx);
    }

    /**
     * 兜底默认算法列表（配置缺失时使用）
     */
    private static function defaultAlgorithms(): array
    {
        return ['crc32', 'md5', 'sha256', 'sha512'];
    }
}
