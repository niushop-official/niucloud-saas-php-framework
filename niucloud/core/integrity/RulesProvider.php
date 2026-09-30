<?php
declare(strict_types=1);

namespace core\integrity;

/**
 * 本地排除规则的读取与版本推导
 *
 * 规则以 git 忽略规格写在站点自己的 config/hash_rules.ignore 里，
 * 与服务端 {仓库}/config/hash_rules.ignore **内容逐字一致**，一致性由人工保证：
 * 两边一旦不同，扫描到的文件集合就不同，会出现整目录级别的误报
 * （全报新增或全报删除）。
 *
 * 本类的两处解析语义必须与服务端严格对齐，否则两份内容相同的文件
 * 也会算出不同的版本号：
 *   - {@see parse()}          对齐 services/addon_hash_rules.go 的 parseRulesText()
 *   - {@see computeVersion()} 对齐 services/addon_hash_rules.go 的 ComputeRulesVersion()
 *
 * @package core\integrity
 */
class RulesProvider
{
    /**
     * 兜底规则的默认版本标识（仅当配置里没给 version 时使用）
     *
     * ★ 必须与 config/integrity.php 的 fallback_rules.version 保持一致：
     *   兜底版本是固定标签、不随内容推导，patterns 一变就得一起改，
     *   否则按旧兜底规则产生的清单缓存会被误判为仍然有效。
     */
    public const FALLBACK_VERSION = 'builtin-v2';

    /** 规则文件相对 root_path() 的默认位置 */
    private const DEFAULT_RELATIVE_PATH = 'config/hash_rules.ignore';

    /**
     * 配置（来自 config/integrity.php）
     */
    private array $config;

    public function __construct(?array $config = null)
    {
        $this->config = $config ?: (array) config('integrity');
    }

    /**
     * 读取当前生效的排除规则
     *
     * 优先读本地规则文件；文件缺失、读不到、或解析后为空（例如只剩注释）时，
     * 回落到 config/integrity.php 的 fallback_rules，并在 source 上标明是兜底，
     * 让调用方可以给出告警 —— 兜底规则与另一端的规则很可能不一致。
     *
     * @return array{version: string, patterns: array, source: string} source: file|fallback
     */
    public function load(): array
    {
        $patterns = self::parse($this->readFile());

        if ($patterns !== []) {
            return [
                // 由内容推导，内容一变版本必变；这与服务端的算法一致，
                // 所以两端规则相同时版本号天然相同，清单缓存才能正常命中。
                'version'  => self::computeVersion($patterns),
                'patterns' => $patterns,
                'source'   => 'file',
            ];
        }

        return $this->fallback();
    }

    /**
     * 规则文件的绝对路径
     */
    public function rulesFilePath(): string
    {
        $path = trim((string) ($this->config['rules_file'] ?? ''));
        if ($path !== '') {
            return $path;
        }

        return rtrim(root_path(), DIRECTORY_SEPARATOR)
            . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, self::DEFAULT_RELATIVE_PATH);
    }

    /**
     * 解析规则文本成有序的规则行
     *
     * 与服务端 parseRulesText() 保持一致：去掉空行与「整行」注释（行内 # 保留），
     * 并**【绝不排序】** —— 规则顺序有语义，后面的规则可以推翻前面的。
     *
     * @return string[]
     */
    public static function parse(string $text): array
    {
        // 与服务端一致：先把 CRLF 归一成 LF，再按 LF 切分
        $lines    = explode("\n", str_replace("\r\n", "\n", $text));
        $patterns = [];

        foreach ($lines as $line) {
            $line = rtrim($line, " \t");

            // # 只有位于行首（允许前导空白）才是注释
            if ($line === '' || str_starts_with(ltrim($line), '#')) {
                continue;
            }

            $patterns[] = $line;
        }

        return $patterns;
    }

    /**
     * 由规则内容推导版本号
     *
     * 与服务端 ComputeRulesVersion() 对齐：patterns 按**原顺序**序列化后取 md5 前 8 位。
     *
     * 两个容易踩的点：
     *   1) 绝不能排序：排序会让「只换了顺序」不改变版本号，客户端就会继续复用旧清单；
     *   2) 必须用 JSON_UNESCAPED_SLASHES：PHP 默认把 / 转义成 \/，而 Go 不转义，
     *      不加这个选项两端算出的版本号永远对不上。
     */
    public static function computeVersion(array $patterns): string
    {
        $json = json_encode(array_values($patterns), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            // patterns 只是字符串数组，序列化理论上不会失败
            return 'unknown';
        }

        return substr(md5($json), 0, 8);
    }

    /**
     * 读规则文件内容；读不到返回空串（由调用方决定如何兜底）
     */
    private function readFile(): string
    {
        $path = $this->rulesFilePath();

        if (!is_file($path) || !is_readable($path)) {
            return '';
        }

        $text = @file_get_contents($path);

        return $text === false ? '' : (string) $text;
    }

    /**
     * 兜底规则（config/integrity.php 的 fallback_rules）
     *
     * @return array{version: string, patterns: array, source: string}
     */
    private function fallback(): array
    {
        $fallback = (array) ($this->config['fallback_rules'] ?? []);

        return [
            'version'  => trim((string) ($fallback['version'] ?? '')) ?: self::FALLBACK_VERSION,
            'patterns' => array_values((array) ($fallback['patterns'] ?? [])),
            'source'   => 'fallback',
        ];
    }
}
