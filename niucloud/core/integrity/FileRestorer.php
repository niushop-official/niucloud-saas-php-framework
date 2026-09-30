<?php
declare(strict_types=1);

namespace core\integrity;

use core\exception\CommonException;
use Throwable;

/**
 * 官方文件内容取用 + 本地写回
 *
 * 只服务于后台「文件差异」弹框的两件事：
 *   1) 文本比对：给出「官方内容」与「本地内容」，前端做并排展示；
 *   2) 写回    ：把官方内容覆盖到本地文件上（覆盖前先备份到备份目录）。
 *
 * ★ 边界：本类不解析目标、不判定「哪些文件属于官方版」——
 *   那两件事分别由 CodeIntegrityChecker 与哈希清单负责。
 *   调用方（IntegrityService）先拿清单做白名单校验，再进来写文件，
 *   所以这里拿到的每个键都已经确认「官方版确实有这个文件」。
 *
 * @package core\integrity
 */
class FileRestorer
{
    /**
     * 扩展名 → 高亮语言（交给前端的比对组件用）
     *
     * 只映射常见源码类型；映射不到的返回空串，前端按纯文本展示，不做高亮。
     */
    private const LANGUAGE_MAP = [
        'php'      => 'php',
        'js'       => 'javascript',
        'ts'       => 'typescript',
        'vue'      => 'xml',
        'html'     => 'xml',
        'htm'      => 'xml',
        'xml'      => 'xml',
        'css'      => 'css',
        'scss'     => 'scss',
        'less'     => 'less',
        'json'     => 'json',
        'md'       => 'markdown',
        'sql'      => 'sql',
        'yml'      => 'yaml',
        'yaml'     => 'yaml',
        'ini'      => 'ini',
        'conf'     => 'ini',
        'txt'      => 'plaintext',
        'sh'       => 'bash',
        'htaccess' => 'apache',
    ];

    private FileScanner $scanner;
    private CloudBaselineClient $cloud;
    private array $config;

    public function __construct(?FileScanner $scanner = null, ?CloudBaselineClient $cloud = null, ?array $config = null)
    {
        $this->config  = $config ?: (array) config('integrity');
        $this->scanner = $scanner ?: new FileScanner($this->config);
        $this->cloud   = $cloud ?: new CloudBaselineClient();
    }

    /**
     * 取「官方 vs 本地」两侧内容，供前端并排比对
     *
     * 官方一侧取不到时不抛异常：本地一侧照样要展示，前端把 official_error 显示出来即可
     * （例如网络不通、该文件在官方包里已被移除）。
     *
     * @param string $targetName 目标名（云端 addon_key：shop / framework）
     * @param string $version    版本号
     * @param string $base       扫描基准（相对 root_path()）
     * @param string $file       相对 base 的文件键
     * @return array{file: string, language: string, max_file_size: int, local: array, official: array|null, official_error: string}
     */
    public function compare(string $targetName, string $version, string $base, string $file): array
    {
        $file = self::assertRelativeKey($file);

        $official = null;
        $error    = '';

        try {
            $official = $this->inspect($this->cloud->fetchFileContent($targetName, $version, $file)['content']);
        } catch (Throwable $e) {
            $error = $e->getMessage();
        }

        return [
            'file'           => $file,
            'language'       => self::guessLanguage($file),
            'max_file_size'  => $this->maxFileSize(),
            'local'          => $this->localSide($base, $file),
            'official'       => $official,
            'official_error' => $error,
        ];
    }

    /**
     * 用官方内容覆盖本地文件（覆盖前备份原文件）
     *
     * @param string $targetKey  目标标识（framework / addon:shop），只用于备份目录分层
     * @param string $targetName 目标名（云端 addon_key）
     * @param string $version    版本号
     * @param string $base       扫描基准
     * @param string $file       相对 base 的文件键
     * @param string $stamp      本次写回的时间戳（同一批写回共用一个备份目录）
     * @return array{backup: string|null, size: int} backup 为 null 表示本地原本没有该文件（无需备份）
     * @throws CommonException
     */
    public function restore(string $targetKey, string $targetName, string $version, string $base, string $file, string $stamp): array
    {
        $file = self::assertRelativeKey($file);

        $official = $this->cloud->fetchFileContent($targetName, $version, $file);
        $content  = (string) $official['content'];

        if ($content === '') {
            throw new CommonException('官方内容为空，已跳过');
        }

        // 再用本地的口径复核一遍官方内容：不能把二进制/超大文件写进站点
        $checked = $this->inspect($content);
        if ($checked['state'] !== 'ok') {
            throw new CommonException('官方内容不适合写回：' . $checked['message']);
        }

        $absolute = $this->scanner->absoluteFor($base, $file);
        $backup   = $this->backup($absolute, $targetKey, $file, $stamp);

        $this->writeFile($absolute, $content);

        return [
            'backup' => $backup,
            'size'   => strlen($content),
        ];
    }

    /**
     * 本次写回的备份目录
     */
    public function backupDir(string $stamp, string $targetKey = ''): string
    {
        $root = rtrim(str_replace('\\', '/', (string) ($this->config['diff']['backup_dir'] ?? '')), '/');

        if ($root === '') {
            $root = rtrim(str_replace('\\', '/', root_path()), '/') . '/runtime/integrity/backup';
        }

        $dir = $root . '/' . $stamp;

        if ($targetKey !== '') {
            // 目标标识可能带 addon: 前缀，路径里不能有冒号
            $dir .= '/' . preg_replace('/[^A-Za-z0-9_\-]/', '_', $targetKey);
        }

        return str_replace('/', DIRECTORY_SEPARATOR, $dir);
    }

    /**
     * 文件键安全校验与归一化
     *
     * 键必须是「相对扫描基准」的路径，与服务端 addon/file_content 的 file 参数同口径：
     * 统一 / 分隔、去掉空段与 . 段、不允许 .. / 绝对路径 / 盘符 / 空字节。
     *
     * @throws CommonException
     */
    public static function assertRelativeKey(string $file): string
    {
        $raw = trim($file);

        if ($raw === '') {
            throw new CommonException('文件名不能为空');
        }
        if (str_contains($raw, "\0")) {
            throw new CommonException('非法文件名');
        }

        $key = str_replace('\\', '/', $raw);

        if (str_starts_with($key, '/') || preg_match('/^[A-Za-z]:/', $key) === 1) {
            throw new CommonException('文件名必须是相对检测基准的路径：' . $file);
        }

        $segments = [];
        foreach (explode('/', $key) as $segment) {
            if ($segment === '' || $segment === '.') {
                continue;
            }
            if ($segment === '..') {
                throw new CommonException('文件名不允许包含 .. ：' . $file);
            }
            $segments[] = $segment;
        }

        if ($segments === []) {
            throw new CommonException('文件名不能为空');
        }

        return implode('/', $segments);
    }

    /**
     * 本地一侧的内容
     *
     * @param string $base 扫描基准（相对 root_path()）
     */
    private function localSide(string $base, string $file): array
    {
        $absolute = $this->scanner->absoluteFor($base, $file);

        clearstatcache(true, $absolute);

        if (!is_file($absolute)) {
            return [
                'state'   => 'missing',
                'size'    => 0,
                'content' => null,
                'message' => '本地没有这个文件（官方包里仍存在，写回可以把它恢复出来）',
            ];
        }

        // 先看大小再读：没必要为了一个提示把几 MB 读进内存
        $size = $this->scanner->fileSize($absolute);
        if ($size > $this->maxFileSize()) {
            return [
                'state'   => 'too_large',
                'size'    => $size,
                'content' => null,
                'message' => '文件超过比对上限（' . $this->formatSize($this->maxFileSize()) . '），未读取内容',
            ];
        }

        $content = @file_get_contents($absolute);
        if ($content === false) {
            return [
                'state'   => 'unreadable',
                'size'    => $size,
                'content' => null,
                'message' => '文件读不出来（权限或占用）',
            ];
        }

        return $this->inspect($content);
    }

    /**
     * 把一段内容"检查成"可下发的形态
     *
     * 两个拒绝条件：
     *   1) 太大 —— 塞进 JSON 响应会拖垮页面；
     *   2) 不是 UTF-8 文本 —— 二进制没法比对，而且非法 UTF-8 会让 json_encode 直接失败，
     *      整个接口返回空响应，比明确报错更难排查。
     *
     * @return array{state: string, size: int, content: string|null, message: string}
     */
    private function inspect(string $content): array
    {
        $size = strlen($content);

        if ($size > $this->maxFileSize()) {
            return [
                'state'   => 'too_large',
                'size'    => $size,
                'content' => null,
                'message' => '文件超过比对上限（' . $this->formatSize($this->maxFileSize()) . '），未下发内容',
            ];
        }

        if (!self::looksLikeText($content)) {
            return [
                'state'   => 'binary',
                'size'    => $size,
                'content' => null,
                'message' => '不是 UTF-8 文本（二进制或其它编码），无法做文本比对',
            ];
        }

        return [
            'state'   => 'ok',
            'size'    => $size,
            'content' => $content,
            'message' => '',
        ];
    }

    /**
     * 是否像 UTF-8 文本
     *
     * 两道判据：不含空字节；整体是合法 UTF-8（preg 的 /u 修饰符会在非法字节处失败）。
     */
    private static function looksLikeText(string $content): bool
    {
        if (str_contains($content, "\0")) {
            return false;
        }

        return preg_match('//u', $content) === 1;
    }

    /**
     * 备份本地文件到备份目录；本地原本没有该文件时返回 null
     *
     * @throws CommonException
     */
    private function backup(string $absolute, string $targetKey, string $file, string $stamp): ?string
    {
        clearstatcache(true, $absolute);

        // 删除项：本地已经没有文件了，没有内容可备份
        if (!is_file($absolute)) {
            return null;
        }

        $dest = $this->backupDir($stamp, $targetKey) . DIRECTORY_SEPARATOR
            . str_replace('/', DIRECTORY_SEPARATOR, $file);

        $dir = dirname($dest);
        if (!is_dir($dir) && !@mkdir($dir, 0777, true) && !is_dir($dir)) {
            throw new CommonException('创建备份目录失败：' . $dir);
        }

        if (!@copy($absolute, $dest)) {
            throw new CommonException('备份原文件失败：' . $absolute);
        }

        return $dest;
    }

    /**
     * 原子写入文件（临时文件 + rename），并尽量保留原权限
     *
     * @throws CommonException
     */
    private function writeFile(string $absolute, string $content): void
    {
        $dir = dirname($absolute);
        if (!is_dir($dir) && !@mkdir($dir, 0777, true) && !is_dir($dir)) {
            throw new CommonException('创建目录失败：' . $dir);
        }

        clearstatcache(true, $absolute);
        $mode = is_file($absolute) ? @fileperms($absolute) : false;

        $tmp     = $absolute . '.restore.tmp';
        $written = @file_put_contents($tmp, $content);

        if ($written === false || $written !== strlen($content)) {
            @unlink($tmp);
            throw new CommonException('写入临时文件失败（磁盘空间或权限问题）：' . $tmp);
        }

        // rename 是原子替换：不会出现「读到半个文件」的中间态
        if (!@rename($tmp, $absolute)) {
            @unlink($tmp);
            throw new CommonException('替换文件失败：' . $absolute);
        }

        if ($mode !== false) {
            @chmod($absolute, $mode & 0777);
        }
    }

    /**
     * 扩展名 → 高亮语言；不认识返回空串（前端按纯文本展示）
     */
    public static function guessLanguage(string $file): string
    {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        return self::LANGUAGE_MAP[$ext] ?? '';
    }

    private function maxFileSize(): int
    {
        return (int) ($this->config['diff']['max_file_size'] ?? 2 * 1024 * 1024);
    }

    private function formatSize(int $bytes): string
    {
        if ($bytes < 1024) {
            return $bytes . ' B';
        }
        if ($bytes < 1024 * 1024) {
            return round($bytes / 1024, 1) . ' KB';
        }

        return round($bytes / 1024 / 1024, 1) . ' MB';
    }
}
