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

namespace core\base;


use think\facade\Db;
use think\Model;

/**
 * 基础模型
 * Class BaseModel
 * @package app\model
 */
class BaseModel extends Model
{
    public function getModelColumn()
    {
        $table_name = $this->getTable();
        $sql = 'SHOW TABLE STATUS WHERE 1=1 ';
        $tablePrefix = config('database.connections.mysql.prefix');
        if (!empty($table_name)) {
            $sql .= "AND name='" .$table_name."'";
        }
        $tables = Db::query($sql);
        $table_info = $tables[0] ?? [];
        $table_name = preg_replace("/^{$tablePrefix}/", '', $table_info['Name'], 1);
        return Db::name($table_name)->getFields();
    }

    /**
     * 处理搜索条件特殊字符（%、_）
     * @param $value
     */
    public function handelSpecialCharacter($value)
    {
        $value = str_replace('%', '\%', str_replace('_', '\_', $value));
        return $value;
    }
}
