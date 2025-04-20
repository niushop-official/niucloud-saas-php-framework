<?php
namespace core\util;

use think\facade\Db;

class DbBackup
{
    private $backupPath;
    private $maxFileSize;
    private $currentFileIndex = 1;
    private $currentFile;
    private $currentFileSize = 0;
    private $tableOffset = [];
    private $excludeTables = [];

    public function __construct($backupPath, $maxFileSize = 1024 * 1024, $excludeTables = [])
    {
        $this->backupPath = $backupPath;
        $this->maxFileSize = $maxFileSize;
        $this->excludeTables = $excludeTables;
        if (!is_dir($this->backupPath)) {
            mkdir($this->backupPath, 0777, true);
        }
        $this->currentFile = $this->backupPath . '/backup_' . $this->currentFileIndex . '.sql';
    }

    public function setExcludeTables($tables) {
        $this->excludeTables = $tables;
        return $this;
    }

    public function backupDatabaseSegment($limit = 1000)
    {
        $tables = $this->getAllTables();
        foreach ($tables as $table) {
            if (in_array($table, $this->excludeTables)) {
                continue;
            }
            if (!isset($this->tableOffset[$table])) {
                $this->tableOffset[$table] = 0;
                $this->backupTableStructure($table);
            }
            while (true) {
                $data = Db::table($table)->limit($this->tableOffset[$table], $limit)->select()->toArray();
                if (empty($data)) {
                    break;
                }
                $this->backupTableData($table, $data);
                $this->tableOffset[$table] += $limit;
            }
        }
    }

    private function backupTableStructure($table)
    {
        $dropTableQuery = "DROP TABLE IF EXISTS `$table`;\n";
        $dropLength = strlen($dropTableQuery);
        if ($this->currentFileSize + $dropLength > $this->maxFileSize) {
            $this->startNewFile();
        }
        $fp = fopen($this->currentFile, 'a');
        fwrite($fp, $dropTableQuery);
        $this->currentFileSize += $dropLength;

        $createTableQuery = $this->getTableCreateQuery($table);
        $query = $createTableQuery . ";\n";
        $queryLength = strlen($query);
        if ($this->currentFileSize + $queryLength > $this->maxFileSize) {
            $this->startNewFile();
            $fp = fopen($this->currentFile, 'a');
        }
        fwrite($fp, $query);
        fclose($fp);
        $this->currentFileSize += $queryLength;
    }

    private function backupTableData($table, $data)
    {
        $columns = implode(', ', array_map(function ($column){
            return "`{$column}`";
        }, array_keys($data[0])));
        $valueSets = [];
        foreach ($data as $row) {
            $values = [];
            foreach ($row as $value) {
                if (is_int($value)) {
                    $values[] = (string)$value; // 整数类型直接转换为字符串
                } elseif (is_float($value)) {
                    $values[] = (string)$value; // 浮点数类型直接转换为字符串
                } elseif (is_bool($value)) {
                    $values[] = $value ? '1' : '0'; // 布尔类型转换为 1 或 0
                } elseif (is_null($value)) {
                    $values[] = 'NULL'; // 空值使用 NULL
                } else {
                    $values[] = Db::getPdo()->quote($value); // 其他类型使用 quote 方法处理
                }
            }
            $valueSets[] = '(' . implode(', ', $values) . ')';
        }
        $insertQuery = "INSERT INTO `$table` ($columns) VALUES\n" . implode(",\n", $valueSets) . ";\n";
        $queryLength = strlen($insertQuery);
        if ($this->currentFileSize + $queryLength > $this->maxFileSize) {
            $this->startNewFile();
        }
        $fp = fopen($this->currentFile, 'a');
        fwrite($fp, $insertQuery);
        fclose($fp);
        $this->currentFileSize += $queryLength;
    }

    private function getAllTables()
    {
        $tables = Db::query('SHOW TABLES');
        $tableNames = [];
        foreach ($tables as $table) {
            $tableNames[] = current($table);
        }
        return $tableNames;
    }

    private function getTableCreateQuery($tableName)
    {
        $result = Db::query("SHOW CREATE TABLE $tableName");
        return $result[0]['Create Table'];
    }

    private function startNewFile()
    {
        $this->currentFileIndex++;
        $this->currentFile = $this->backupPath . '/backup_' . $this->currentFileIndex . '.sql';
        $this->currentFileSize = 0;
    }

    public function restoreDatabase()
    {
        $backupFiles = glob($this->backupPath . '/backup_*.sql');
        foreach ($backupFiles as $backupFile) {
            $sql = file_get_contents($backupFile);
            $queries = explode(";\n", $sql);
            foreach ($queries as $query) {
                if (trim($query) !== '') {
                    Db::execute($query);
                }
            }
        }
    }
}
