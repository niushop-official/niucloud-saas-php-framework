<?php

namespace core\util;

/**
 * 任务产物辅助工具
 *
 * 统一各任务（云编译 / 备份等）「相关产物」的数据形态：
 * - 目录树扫描：产物文件量通常很大，默认只展开前若干层，更深层仅汇总数量与体积
 * - 文件大小格式化
 * - 安全解析产物文件路径（禁止 ../ 等目录穿越）
 */
class ArtifactScanner
{
    /** 单层默认最多返回的子项数（超出部分仍计入统计，避免接口返回体过大） */
    const MAX_CHILDREN = 200;

    /**
     * 扫描目录
     * @param string $dir 根目录
     * @param int $depth 展开层数（0 表示只统计不返回子节点）
     * @param int $maxChildren 单层最多返回的子项数
     * @return array [ 'files', 'dirs', 'size', 'truncated', 'children' ]
     */
    public static function scan(string $dir, int $depth = 2, int $maxChildren = self::MAX_CHILDREN): array
    {
        $node = [ 'files' => 0, 'dirs' => 0, 'size' => 0, 'truncated' => false, 'children' => [] ];

        $dir = rtrim($dir, DIRECTORY_SEPARATOR);
        $handle = @opendir($dir);
        if ($handle === false) return $node;

        $dirNames  = [];
        $fileNames = [];
        while (( $name = readdir($handle) ) !== false) {
            if ($name === '.' || $name === '..') continue;
            $path = $dir . DIRECTORY_SEPARATOR . $name;
            if (is_dir($path)) $dirNames[] = $name;
            elseif (is_file($path)) $fileNames[] = $name;
        }
        closedir($handle);

        sort($dirNames, SORT_NATURAL | SORT_FLAG_CASE);
        sort($fileNames, SORT_NATURAL | SORT_FLAG_CASE);

        foreach (array_merge($dirNames, $fileNames) as $index => $name) {
            $path     = $dir . DIRECTORY_SEPARATOR . $name;
            $overflow = $index >= $maxChildren;
            if ($overflow) $node[ 'truncated' ] = true;

            if (is_dir($path)) {
                $sub = self::scan($path, max(0, $depth - 1), $maxChildren);
                $node[ 'dirs' ]  += 1 + (int) $sub[ 'dirs' ];
                $node[ 'files' ] += (int) $sub[ 'files' ];
                $node[ 'size' ]  += (int) $sub[ 'size' ];
                if (!empty($sub[ 'truncated' ])) $node[ 'truncated' ] = true;

                if ($depth <= 0 || $overflow) continue;

                $node[ 'children' ][] = [
                    'name'      => $name,
                    'path'      => $name,
                    'type'      => 'dir',
                    'files'     => (int) $sub[ 'files' ],
                    'dirs'      => (int) $sub[ 'dirs' ],
                    'size'      => (int) $sub[ 'size' ],
                    'size_name' => self::formatSize((int) $sub[ 'size' ]),
                    'children'  => $sub[ 'children' ]
                ];
                continue;
            }

            $size = (int) filesize($path);
            $node[ 'files' ] += 1;
            $node[ 'size' ]  += $size;

            if ($depth <= 0 || $overflow) continue;

            $node[ 'children' ][] = [
                'name'      => $name,
                'path'      => $name,
                'type'      => 'file',
                'size'      => $size,
                'size_name' => self::formatSize($size)
            ];
        }

        return $node;
    }

    /**
     * 给根节点子节点补上相对路径（供按路径下载单个文件）
     * @param array $children
     * @param string $prefix
     * @return array
     */
    public static function withPath(array $children, string $prefix = ''): array
    {
        foreach ($children as &$child) {
            $child[ 'path' ] = $prefix === '' ? $child[ 'name' ] : $prefix . '/' . $child[ 'name' ];
            if (!empty($child[ 'children' ])) {
                $child[ 'children' ] = self::withPath($child[ 'children' ], $child[ 'path' ]);
            }
        }
        return $children;
    }

    /**
     * 单文件信息
     * @param string $file
     * @param string $name 展示名，缺省取文件名
     * @return array
     */
    public static function fileInfo(string $file, string $name = ''): array
    {
        $size = (int) filesize($file);
        return [
            'name'        => $name !== '' ? $name : basename($file),
            'size'        => $size,
            'size_name'   => self::formatSize($size),
            'update_time' => (int) filemtime($file)
        ];
    }

    /**
     * 空统计
     * @return array
     */
    public static function emptyStat(): array
    {
        return [ 'files' => 0, 'dirs' => 0, 'size' => 0, 'size_name' => self::formatSize(0) ];
    }

    /**
     * 安全解析产物文件路径（禁止目录穿越）
     * @param string $baseDir 产物根目录
     * @param string $relativePath 相对路径（以 / 分隔）
     * @return string 解析失败返回空串
     */
    public static function resolve(string $baseDir, string $relativePath): string
    {
        if ($baseDir === '' || $relativePath === '') return '';

        // 统一分隔符后逐段校验，拒绝空段 / . / ..
        $segments = explode('/', str_replace('\\', '/', $relativePath));
        foreach ($segments as $segment) {
            if ($segment === '' || $segment === '.' || $segment === '..') return '';
        }

        $path = rtrim($baseDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . implode(DIRECTORY_SEPARATOR, $segments);
        $real = realpath($path);
        if ($real === false) return '';

        // 必须仍在产物根目录内
        $root = realpath(rtrim($baseDir, DIRECTORY_SEPARATOR));
        if ($root === false || strpos($real, $root) !== 0) return '';

        return $real;
    }

    /**
     * 字节数格式化：1.23 MB
     * @param int $bytes
     * @return string
     */
    public static function formatSize(int $bytes): string
    {
        $units = [ 'B', 'KB', 'MB', 'GB', 'TB' ];
        $bytes = max($bytes, 0);
        $power = $bytes > 0 ? min((int) floor(log($bytes, 1024)), count($units) - 1) : 0;

        return ( $power === 0 ? (string) $bytes : number_format($bytes / pow(1024, $power), 2) ) . ' ' . $units[ $power ];
    }
}
