<?php
declare(strict_types=1);

namespace core\integrity;

/**
 * git 忽略规格匹配器
 *
 * 采用 git 忽略规则的「规格」语义（注意：不是读取 .gitignore 文件），逐条如下：
 *   - 空行、以 # 开头的行 = 注释，忽略
 *   - 感叹号前缀 = 取消忽略；按顺序评估，最后一条命中的规则决定结果
 *   - 斜杠结尾 = 只匹配目录
 *   - 以斜杠开头、或中间含斜杠的模式 = 相对内容根「锚定」；否则匹配任意层级
 *   - 星号匹配任意字符但不跨斜杠；问号匹配单个非斜杠字符；方括号为字符类
 *   - 双星号（两个连续星号）表示跨层级，分三种位置：
 *       开头双星号后紧跟斜杠      → 匹配任意层级
 *       结尾斜杠后紧跟双星号      → 匹配其下全部
 *       中间 斜杠+双星号+斜杠     → 匹配中间任意层
 *   - 其它位置的连续星号与单个星号等价
 *
 * ★ 关键约定：目录本身被判定为「忽略」时，其下内容不再遍历（剪枝）。
 *   这与 git 的「父目录被排除时，其下文件无法用感叹号规则重新包含」完全一致，
 *   所以即便支持取反，剪枝依然是正确且必要的。
 *
 * ★★ 服务端 Go 侧有一份逻辑完全一致的实现（services/ignore_matcher.go）。
 *    两边任何一点差异都会造成整目录误报，改动必须同步。
 */
class IgnoreMatcher
{
    /** @var array<int, array{negate: bool, dir_only: bool, regex: string}> */
    private array $rules = [];

    /**
     * @param array $patterns 有序的规则行（git 忽略规格）
     */
    public function __construct(array $patterns)
    {
        foreach ($patterns as $line) {
            $compiled = self::compileLine((string) $line);
            if ($compiled !== null) {
                $this->rules[] = $compiled;
            }
        }
    }

    /**
     * 判断某个键是否应被忽略
     *
     * @param string $key   相对内容根的键（用 / 分隔）
     * @param bool   $isDir 是否目录
     */
    public function isIgnored(string $key, bool $isDir): bool
    {
        $ignored = false;

        foreach ($this->rules as $rule) {
            // 以斜杠结尾的规则只对目录生效
            if ($rule['dir_only'] && !$isDir) {
                continue;
            }

            if (preg_match($rule['regex'], $key) === 1) {
                // 命中的最后一条规则决定结果：取反规则把结果翻回「不忽略」
                $ignored = !$rule['negate'];
            }
        }

        return $ignored;
    }

    /**
     * 编译一行规则；注释行 / 空行 / 非法行返回 null
     *
     * @return array{negate: bool, dir_only: bool, regex: string}|null
     */
    private static function compileLine(string $line): ?array
    {
        // git 规格：尾部空白被忽略（本书简化实现，统一 rtrim）
        $line = rtrim($line, " \t\r\n");

        if ($line === '' || $line[0] === '#') {
            return null;
        }

        // 取反前缀
        $negate = false;
        if ($line[0] === '!') {
            $negate = true;
            $line   = substr($line, 1);
        }

        // 允许用反斜杠转义开头的 # 与 !（按字面处理）
        if (str_starts_with($line, '\\#') || str_starts_with($line, '\\!')) {
            $line = substr($line, 1);
        }

        // 斜杠结尾 = 只匹配目录
        $dirOnly = false;
        if (str_ends_with($line, '/')) {
            $dirOnly = true;
            $line    = rtrim($line, '/');
        }

        // 锚定判定：开头的斜杠、或中间出现斜杠，都算「锚定内容根」
        $anchored = false;
        if (str_starts_with($line, '/')) {
            $anchored = true;
            $line     = substr($line, 1);
        } elseif (str_contains($line, '/')) {
            $anchored = true;
        }

        if ($line === '') {
            return null;
        }

        // 不含斜杠的模式 = 匹配任意层级 → 前面补双星号加斜杠
        if (!$anchored) {
            $line = '**/' . $line;
        }

        return [
            'negate'   => $negate,
            'dir_only' => $dirOnly,
            'regex'    => self::translate($line),
        ];
    }

    /**
     * git 通配表达式 → 正则
     *
     * 逐字节扫描（PHP 正则默认按字节匹配，与服务端 Go 的行为在 ASCII 上一致）。
     * 规则里请只使用 ASCII；含非 ASCII 字符的文件名匹配用星号通配即可。
     */
    private static function translate(string $glob): string
    {
        $re  = '';
        $i   = 0;
        $len = strlen($glob);

        while ($i < $len) {
            $c = $glob[$i];

            if ($c === '*') {
                // 连续星号
                $j = $i;
                while ($j < $len && $glob[$j] === '*') {
                    $j++;
                }
                $stars = $j - $i;

                if ($stars >= 2 && ($i === 0 || $glob[$i - 1] === '/')) {
                    // 处于一个路径段开头的双星号
                    if ($j < $len && $glob[$j] === '/') {
                        $re .= '(?:.*\/)?'; // 双星号加斜杠 → 零层或多层目录（斜杠必须转义，否则会撞上正则分隔符）
                        $j++;              // 吃掉后面的斜杠
                    } else {
                        $re .= '.*';       // 末尾的双星号 → 其下全部
                    }
                } else {
                    // 其它位置的双星号与单星号等价（不跨斜杠）
                    $re .= '[^\/]*';
                }

                $i = $j;
                continue;
            }

            if ($c === '?') {
                $re .= '[^\/]';
                $i++;
                continue;
            }

            if ($c === '[') {
                $close = strpos($glob, ']', $i + 1);
                if ($close === false) {
                    $re .= '\[';
                    $i++;
                    continue;
                }

                $class = substr($glob, $i + 1, $close - $i - 1);
                // git 规格里 [!...] 等价于正则 [^...]
                if ($class !== '' && $class[0] === '!') {
                    $class = '^' . substr($class, 1);
                }

                $re .= '[' . $class . ']';
                $i   = $close + 1;
                continue;
            }

            if ($c === '\\' && $i + 1 < $len) {
                $re .= preg_quote($glob[$i + 1], '/');
                $i  += 2;
                continue;
            }

            // 非 ASCII 字节直接原样保留（避免把 UTF-8 序列拆散）
            if (ord($c) >= 0x80) {
                $re .= $c;
                $i++;
                continue;
            }

            $re .= preg_quote($c, '/');
            $i++;
        }

        return '/^' . $re . '$/';
    }
}
