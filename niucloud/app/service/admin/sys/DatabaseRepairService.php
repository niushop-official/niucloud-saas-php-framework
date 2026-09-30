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

namespace app\service\admin\sys;

use core\base\BaseAdminService;
use think\facade\Db;

/**
 * 数据库结构修复服务层
 * 对比系统安装文件(app/install/source/database.sql)与已安装插件(addon/{key}/sql/install.sql)的表结构定义，
 * 检测并补齐当前数据库中缺失的数据表与字段（仅补齐缺失结构，不删除现有数据）
 * Class DatabaseRepairService
 * @package app\service\admin\sys
 */
class DatabaseRepairService extends BaseAdminService
{

    // 差异类型
    const DIFF_TYPE_TABLE = 'table';
    const DIFF_TYPE_COLUMN = 'column';

    /**
     * 结构检测
     * @return array
     */
    public function check()
    {
        $definitions = $this->getDefinitions();
        $actualTables = $this->getActualTables();
        $actualColumns = $this->getActualColumns();

        $diffs = [];
        $missing_count = 0;
        $prefix = config('database.connections.mysql.prefix') ?? '';

        foreach ($definitions[ 'tables' ] as $table => $def) {

            $source = $def[ 'source' ];
            $source_title = $definitions[ 'sources' ][ $source ] ?? $source;

            if (!isset($actualTables[ $table ])) {
                // 整表缺失
                $create_sql = $this->buildCreateSql($def[ 'create_sql' ], $table, $prefix);
                $diffs[] = [
                    'table'        => $table,
                    'type'         => self::DIFF_TYPE_TABLE,
                    'type_name'    => '缺失数据表',
                    'source'       => $source,
                    'source_title' => $source_title,
                    'missing'      => array_keys($def[ 'columns' ]),
                    'sql'          => $create_sql,
                    'sqls'         => [ $create_sql ],
                ];
                $missing_count += max(count($def[ 'columns' ]), 1);
                continue;
            }

            // 检测缺失字段
            $missing_columns = array_diff_key($def[ 'columns' ], $actualColumns[ $table ] ?? []);
            if (!empty($missing_columns)) {
                $sqls = [];
                foreach ($missing_columns as $column => $column_define) {
                    $sqls[] = $this->buildAlterSql($table, $column, $column_define, $def[ 'columns' ], $def[ 'order' ], $actualColumns[ $table ]);
                }
                $diffs[] = [
                    'table'        => $table,
                    'type'         => self::DIFF_TYPE_COLUMN,
                    'type_name'    => '缺失字段',
                    'source'       => $source,
                    'source_title' => $source_title,
                    'missing'      => array_keys($missing_columns),
                    'sql'          => implode(";\n", $sqls),
                    'sqls'         => $sqls,
                ];
                $missing_count += count($missing_columns);
            }
        }

        $source_count = count($definitions[ 'sources' ]);
        $addon_count = max($source_count - 1, 0);

        // 字符编码与排序规则检测（独立于结构差异，不参与一键修复 SQL）
        $charset_check = $this->checkCharset();

        return [
            'database'      => $this->getDatabaseName(),
            'source_count'  => $source_count,
            'addon_count'   => $addon_count,
            'table_count'   => count($definitions[ 'tables' ]),
            'diff_count'    => count($diffs),
            'missing_count' => $missing_count,
            'status'        => empty($diffs) && $charset_check[ 'count' ] == 0 ? 'normal' : 'abnormal',
            'status_name'   => empty($diffs) && $charset_check[ 'count' ] == 0 ? '正常' : '异常',
            'sources'       => $definitions[ 'sources' ],
            'diffs'         => $diffs,
            'charset'       => $charset_check,
            'check_time'    => date('Y-m-d H:i:s'),
        ];
    }

    /**
     * 字符编码与排序规则检测
     * 检测项：
     *  1) 数据表/字段字符编码是否与标准字符集一致（是否为相同的字符编码）
     *  2) 排序规则是否归属于其自身字符编码（排序规则是否正确）
     *  3) 排序规则是否被当前服务器支持（是否存在于 information_schema.COLLATIONS）
     *  4) 字段字符编码是否与其所属数据表一致（表内一致性）
     * @return array ['standard_charset' => string, 'count' => int, 'items' => array]
     */
    public function checkCharset()
    {
        $standard_charset = strtolower(config('database.connections.mysql.charset', 'utf8mb4'));
        // 标准排序规则：取服务器对该字符集的默认排序规则（用于一键修复时的目标排序规则）
        $standard_collation = '';
        $cs_rows = Db::query("SELECT DEFAULT_COLLATE_NAME FROM information_schema.CHARACTER_SETS WHERE CHARACTER_SET_NAME = ?", [ $standard_charset ]);
        if (!empty($cs_rows)) {
            $standard_collation = strtolower($cs_rows[ 0 ][ 'DEFAULT_COLLATE_NAME' ]);
        }
        $prefix = strtolower(config('database.connections.mysql.prefix') ?? '');
        $db = $this->getDatabaseName();

        // 服务器支持的 排序规则 -> 字符集 映射（用于判断是否支持 / 是否归属正确字符编码）
        $collation_rows = Db::query("SELECT COLLATION_NAME, CHARACTER_SET_NAME FROM information_schema.COLLATIONS");
        $collation_to_charset = [];
        foreach ($collation_rows as $row) {
            $collation_to_charset[ strtolower($row[ 'COLLATION_NAME' ]) ] = strtolower($row[ 'CHARACTER_SET_NAME' ]);
        }

        // 实际数据表（含字符集、排序规则）
        $table_rows = Db::query(
            "SELECT t.TABLE_NAME, t.TABLE_COLLATION, c.CHARACTER_SET_NAME AS table_charset
             FROM information_schema.TABLES t
             LEFT JOIN information_schema.COLLATIONS c ON t.TABLE_COLLATION = c.COLLATION_NAME
             WHERE t.TABLE_SCHEMA = ? AND t.TABLE_TYPE = 'BASE TABLE'",
            [ $db ]
        );

        // 实际字段（仅字符/文本类型存在 CHARACTER_SET_NAME，数值/时间等类型为 NULL）
        $column_rows = Db::query(
            "SELECT col.TABLE_NAME, col.COLUMN_NAME, col.CHARACTER_SET_NAME AS column_charset, col.COLLATION_NAME AS column_collation
             FROM information_schema.COLUMNS col
             WHERE col.TABLE_SCHEMA = ? AND col.CHARACTER_SET_NAME IS NOT NULL",
            [ $db ]
        );
        $table_columns = [];
        foreach ($column_rows as $row) {
            $raw = $this->stripPrefix(strtolower($row[ 'TABLE_NAME' ]), $prefix);
            $table_columns[ $raw ][] = $row;
        }

        $items = [];
        foreach ($table_rows as $t) {
            $table_name = $t[ 'TABLE_NAME' ];
            $raw = $this->stripPrefix(strtolower($table_name), $prefix);
            $table_charset = strtolower($t[ 'table_charset' ] ?? '');
            $table_collation = strtolower($t[ 'TABLE_COLLATION' ] ?? '');

            $issues = [];

            // 1. 数据表字符编码是否与标准一致（是否相同字符编码）
            if ($table_charset != '' && $table_charset != $standard_charset) {
                $issues[] = [
                    'level'   => 'table',
                    'field'   => '',
                    'issue'   => 'charset',
                    'message' => "数据表字符编码为 {$table_charset}，与标准字符编码 {$standard_charset} 不一致",
                ];
            }

            // 2. 数据表排序规则：归属字符编码是否正确 + 是否被服务器支持
            if ($table_collation != '') {
                $col_charset = $collation_to_charset[ $table_collation ] ?? '';
                if ($col_charset == '') {
                    $issues[] = [
                        'level'   => 'table',
                        'field'   => '',
                        'issue'   => 'collation_unsupported',
                        'message' => "数据表排序规则 {$table_collation} 不被当前服务器支持",
                    ];
                } elseif ($table_charset != '' && $col_charset != $table_charset) {
                    $issues[] = [
                        'level'   => 'table',
                        'field'   => '',
                        'issue'   => 'collation_mismatch',
                        'message' => "数据表排序规则 {$table_collation} 不属于字符编码 {$table_charset}",
                    ];
                }
            }

            // 字段级检测
            foreach ($table_columns[ $raw ] ?? [] as $col) {
                $column_name = $col[ 'COLUMN_NAME' ];
                $column_charset = strtolower($col[ 'column_charset' ] ?? '');
                $column_collation = strtolower($col[ 'column_collation' ] ?? '');

                // 1) 字段字符编码与标准是否一致
                if ($column_charset != '' && $column_charset != $standard_charset) {
                    $issues[] = [
                        'level'   => 'column',
                        'field'   => $column_name,
                        'issue'   => 'charset',
                        'message' => "字段 {$column_name} 字符编码为 {$column_charset}，与标准字符编码 {$standard_charset} 不一致",
                    ];
                }

                // 2) 字段排序规则：归属字符编码是否正确 + 是否受服务器支持
                if ($column_collation != '') {
                    $col_charset = $collation_to_charset[ $column_collation ] ?? '';
                    if ($col_charset == '') {
                        $issues[] = [
                            'level'   => 'column',
                            'field'   => $column_name,
                            'issue'   => 'collation_unsupported',
                            'message' => "字段 {$column_name} 排序规则 {$column_collation} 不被当前服务器支持",
                        ];
                    } elseif ($column_charset != '' && $col_charset != $column_charset) {
                        $issues[] = [
                            'level'   => 'column',
                            'field'   => $column_name,
                            'issue'   => 'collation_mismatch',
                            'message' => "字段 {$column_name} 排序规则 {$column_collation} 不属于字符编码 {$column_charset}",
                        ];
                    }
                }

                // 3) 字段字符编码是否与所属数据表一致（表内一致性）
                if ($column_charset != '' && $table_charset != '' && $column_charset != $table_charset) {
                    $issues[] = [
                        'level'   => 'column',
                        'field'   => $column_name,
                        'issue'   => 'inconsistent',
                        'message' => "字段 {$column_name} 字符编码 {$column_charset} 与所属数据表字符编码 {$table_charset} 不一致",
                    ];
                }
            }

            if (!empty($issues)) {
                $items[] = [
                    'table'           => $raw,
                    'table_full'      => $table_name,
                    'table_charset'   => $table_charset ?: '-',
                    'table_collation' => $table_collation ?: '-',
                    'issues'          => $issues,
                ];
            }
        }

        return [
            'standard_charset'   => $standard_charset,
            'standard_collation' => $standard_collation,
            'count'              => count($items),
            'items'              => $items,
        ];
    }

    /**
     * 获取字符编码/排序规则修复语句（按异常数据表去重，每张表统一 CONVERT TO 标准字符集与排序规则）
     * 注：CONVERT TO 会将该表所有字符/文本字段统一转换为目标字符集与排序规则，
     * 可同时修正「表级字符编码不一致 / 字段级字符编码不一致 / 排序规则不匹配 / 表内不一致」等全部异常。
     * @return array [['table','table_full','sql']]
     */
    public function getCharsetRepairList(): array
    {
        $charset_check = $this->checkCharset();
        if (empty($charset_check[ 'count' ])) return [];

        $charset = $charset_check[ 'standard_charset' ];
        $collation = $charset_check[ 'standard_collation' ];
        if ($collation == '') return []; // 无法确定合适排序规则时不生成修复语句

        $list = [];
        foreach ($charset_check[ 'items' ] as $item) {
            $list[] = [
                'table'      => $item[ 'table' ],
                'table_full' => $item[ 'table_full' ],
                'sql'        => "ALTER TABLE `{$item['table_full']}` CONVERT TO CHARACTER SET {$charset} COLLATE {$collation}",
            ];
        }
        return $list;
    }

    /**
     * 去除表名前缀
     * @param string $name
     * @param string $prefix
     * @return string
     */
    private function stripPrefix(string $name, string $prefix)
    {
        return ($prefix !== '' && str_starts_with($name, $prefix)) ? substr($name, strlen($prefix)) : $name;
    }

    /**
     * 一键修复（仅补齐缺失结构，不删除现有数据）
     * @param array $params source-指定来源 addon key, type-指定差异类型
     * @return array
     */
    public function repair(array $params = [])
    {
        $check = $this->check();
        $diffs = $check[ 'diffs' ];

        $source = $params[ 'source' ] ?? '';
        $type = $params[ 'type' ] ?? '';

        $success_list = [];
        $fail_list = [];

        foreach ($diffs as $diff) {
            if (!empty($source) && $diff[ 'source' ] != $source) continue;
            if (!empty($type) && $diff[ 'type' ] != $type) continue;

            foreach ($diff[ 'sqls' ] as $sql) {
                try {
                    Db::execute($sql);
                    $success_list[] = [ 'table' => $diff[ 'table' ], 'type_name' => $diff[ 'type_name' ], 'sql' => $sql ];
                } catch (\Throwable $e) {
                    $fail_list[] = [ 'table' => $diff[ 'table' ], 'type_name' => $diff[ 'type_name' ], 'sql' => $sql, 'error' => $e->getMessage() ];
                }
            }
        }

        // 字符编码 / 排序规则修复（统一 CONVERT TO 标准字符集与排序规则）
        foreach ($this->getCharsetRepairList() as $cr) {
            try {
                Db::execute($cr[ 'sql' ]);
                $success_list[] = [ 'table' => $cr[ 'table' ], 'type_name' => '字符编码/排序规则', 'sql' => $cr[ 'sql' ] ];
            } catch (\Throwable $e) {
                $fail_list[] = [ 'table' => $cr[ 'table' ], 'type_name' => '字符编码/排序规则', 'sql' => $cr[ 'sql' ], 'error' => $e->getMessage() ];
            }
        }

        $after = $this->check();

        return [
            'success_count' => count($success_list),
            'fail_count'    => count($fail_list),
            'success_list'  => $success_list,
            'fail_list'     => $fail_list,
            'check'         => $after,
        ];
    }

    /**
     * 获取结构定义（系统安装文件 + 已安装插件 install.sql）
     * @return array ['sources' => [key => title], 'tables' => [表名 => ['source','columns','order','create_sql']]]
     */
    private function getDefinitions()
    {
        $sources = [ 'system' => '系统' ];
        $tables = [];

        // 1. 系统安装文件
        $system_sql = root_path() . 'app' . DIRECTORY_SEPARATOR . 'install' . DIRECTORY_SEPARATOR . 'source' . DIRECTORY_SEPARATOR . 'database.sql';
        $tables = array_merge($tables, $this->parseInstallSql($system_sql, 'system'));

        // 2. 已安装插件
        try {
            $addons = Db::name('addon')->where('status', 1)->column('title', 'key');
        } catch (\Throwable $e) {
            $addons = [];
        }

        foreach ($addons as $addon_key => $addon_title) {
            $sql_file = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon_key . DIRECTORY_SEPARATOR . 'sql' . DIRECTORY_SEPARATOR . 'install.sql';
            $addon_tables = $this->parseInstallSql($sql_file, $addon_key);
            if (!empty($addon_tables)) $sources[ $addon_key ] = $addon_title ?: $addon_key;
            $tables = array_merge($tables, $addon_tables);
        }

        return [ 'sources' => $sources, 'tables' => $tables ];
    }

    /**
     * 解析 install.sql 中的 CREATE TABLE 语句
     * @param string $sql_file
     * @param string $source 来源标识（system 或插件key）
     * @return array
     */
    private function parseInstallSql(string $sql_file, string $source)
    {
        if (!is_file($sql_file)) return [];

        $content = file_get_contents($sql_file);
        if (trim($content) == '') return [];

        $tables = [];

        // 复用系统安装器的 sql 分割函数（去除注释并按语句分割）
        $statements = parse_sql($content);

        foreach ($statements as $statement) {
            $statement = trim($statement);
            if (empty($statement) || !preg_match('/^CREATE TABLE/is', $statement)) continue;
            if (!preg_match('/CREATE TABLE\s*`?([^\s`(]+)`?\s*\(/is', $statement, $match)) continue;

            // 表名去掉 {{prefix}} 占位符，统一小写
            $raw_name = str_ireplace('{{prefix}}', '', $match[ 1 ]);
            $raw_name = strtolower(trim($raw_name, '`'));
            if (empty($raw_name)) continue;

            // 提取字段定义（表体：第一个 ( 与最后一个 ) 之间）
            $pos_start = strpos($statement, '(');
            $pos_end = strrpos($statement, ')');
            if ($pos_start === false || $pos_end === false || $pos_end <= $pos_start) continue;
            $body = substr($statement, $pos_start + 1, $pos_end - $pos_start - 1);

            $columns = [];
            $order = [];
            foreach (explode("\n", $body) as $line) {
                $line = trim($line, " \t\r\n,");
                if ($line == '') continue;
                // 仅匹配字段定义行（以 `field` 开头），索引/主键行不参与缺失字段修复
                if (preg_match('/^`([^`]+)`\s+(.+)$/', $line, $column_match)) {
                    $columns[ $column_match[ 1 ] ] = rtrim($column_match[ 2 ]);
                    $order[] = $column_match[ 1 ];
                }
            }

            $tables[ $raw_name ] = [
                'source'     => $source,
                'columns'    => $columns,
                'order'      => $order,
                'create_sql' => $statement,
            ];
        }

        return $tables;
    }

    /**
     * 获取当前数据库实际数据表（表名去掉前缀，小写）
     * @return array [原始表名 => 实际表名]
     */
    private function getActualTables()
    {
        $prefix = strtolower(config('database.connections.mysql.prefix') ?? '');
        $rows = Db::query("SELECT TABLE_NAME AS table_name FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?", [ $this->getDatabaseName() ]);

        $tables = [];
        foreach ($rows as $row) {
            $name = strtolower($row[ 'table_name' ]);
            $raw = ($prefix !== '' && str_starts_with($name, $prefix)) ? substr($name, strlen($prefix)) : $name;
            $tables[ $raw ] = $name;
        }
        return $tables;
    }

    /**
     * 获取当前数据库实际字段（表名去掉前缀，小写）
     * @return array [原始表名 => [字段名 => true]]
     */
    private function getActualColumns()
    {
        $prefix = strtolower(config('database.connections.mysql.prefix') ?? '');
        $rows = Db::query("SELECT TABLE_NAME AS table_name, COLUMN_NAME AS column_name FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ?", [ $this->getDatabaseName() ]);

        $columns = [];
        foreach ($rows as $row) {
            $name = strtolower($row[ 'table_name' ]);
            $raw = ($prefix !== '' && str_starts_with($name, $prefix)) ? substr($name, strlen($prefix)) : $name;
            $columns[ $raw ][ strtolower($row[ 'column_name' ]) ] = true;
        }
        return $columns;
    }

    /**
     * 当前数据库名
     * @return string
     */
    private function getDatabaseName()
    {
        return Db::query('SELECT DATABASE() AS db_name')[ 0 ][ 'db_name' ] ?? '';
    }

    /**
     * 生成补建数据表 SQL（将定义表名替换为实际带前缀表名）
     * @param string $create_sql
     * @param string $table
     * @param string $prefix
     * @return string
     */
    private function buildCreateSql(string $create_sql, string $table, string $prefix)
    {
        if (stripos($create_sql, '{{prefix}}') !== false) {
            return str_ireplace('{{prefix}}', $prefix, $create_sql);
        }
        return preg_replace_callback('/^CREATE TABLE\s*`?\s*' . preg_quote($table, '/') . '\s*`?/is',
            function () use ($table, $prefix) {
                return 'CREATE TABLE `' . $prefix . $table . '`';
            }, $create_sql, 1);
    }

    /**
     * 生成补加字段 SQL（尽量跟随定义顺序，添加到前一个已存在字段之后）
     * @param string $table
     * @param string $column
     * @param string $column_define
     * @param array $columns 定义的全部字段
     * @param array $order 定义的字段顺序
     * @param array $actual 实际已存在字段
     * @return string
     */
    private function buildAlterSql(string $table, string $column, string $column_define, array $columns, array $order, array $actual = [])
    {
        $prefix = config('database.connections.mysql.prefix') ?? '';
        $real_table = '`' . $prefix . $table . '`';
        $sql = "ALTER TABLE {$real_table} ADD COLUMN `{$column}` {$column_define}";

        // 按定义顺序，找到缺失字段前面最近一个实际已存在的字段，追加 AFTER
        $index = array_search($column, $order);
        if ($index !== false) {
            for ($i = $index - 1; $i >= 0; $i--) {
                $prev = $order[ $i ];
                if (isset($actual[ strtolower($prev) ])) {
                    $sql .= " AFTER `{$prev}`";
                    break;
                }
            }
        }
        return $sql;
    }
}
