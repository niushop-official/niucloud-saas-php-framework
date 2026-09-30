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


use Stringable;
use think\db\Express;
use think\db\Raw;
use think\facade\Db;
use think\Model;
use think\model\Collection;
use think\model\type\DateTime as ModelDateTime;

/**
 * 基础模型
 * Class BaseModel
 * @package app\model
 */
class BaseModel extends Model
{
    /**
     * JSON 字段声明（think-orm 3.x 的旧写法，子模型声明后覆盖此默认值）
     *
     * @var array
     */
    protected $json = [];

    /**
     * JSON 字段对应的字段类型，由 getBaseOptions() 按 $json / $jsonAssoc 自动补全
     * 例如 ['app' => 'array', 'addon' => 'array']
     *
     * @var array
     */
    protected $jsonType = [];

    /**
     * JSON 数据是否返回关联数组（think-orm 3.x 的旧写法，与 $json 配套）
     *
     * @var bool
     */
    protected $jsonAssoc = true;

    /**
     * 字段类型声明（think-orm 4.x 的新写法，子模型声明后覆盖此默认值）
     *
     * @var array
     */
    protected $type = [];

    /**
     * 定义模型基础配置参数（把 3.x 的 json 旧写法翻译成 4.x 的字段类型新写法）
     *
     * think-orm 4.x 起不再消费模型上的 $json：JSON 字段的读写转换只认字段类型
     * （type 中的声明），而 3.x 是由 $json / $jsonAssoc 驱动的。
     * 这里把子模型声明的 $json 逐字段补进 $jsonType，再与 $type 合并；之后的读取、
     * getData()/getOrigin()、toArray()、访问器第二参数 $data、写入编码全部由框架原生机制完成。
     * 同时兼容官方文档推荐的写法：在 getOptions() 里返回 type / jsonAssoc。
     *
     * 翻译目标说明（依据 think-orm 的 Attribute::readTransform / writeTransform）：
     * - 'array'：读取得到明文数组（与旧写法 $jsonAssoc = true 一致），写入执行一次
     *   json_encode((array) $value)，不会出现二次编码；
     *   翻译为 'json' 则相反：值会被包装成 think\model\type\Json 对象存进模型内部数据，
     *   访问器里的 $data['字段'] 与 getData() 拿到的是对象而非数组（旧写法下是明文数组），
     *   因此这里统一使用明文的 'array' 来保持旧语义。
     * - 'object'：$jsonAssoc 为 false（旧语义：返回对象）时的翻译目标。
     *
     * 注意：本方法在 Model 构造函数最开始被调用，此时模型的选项尚未初始化，
     * 因此这里只读取类属性（上面已声明 $json / $jsonType / $jsonAssoc / $type 的默认值，
     * 读取这些属性不会触发模型的 __get 魔术方法）与 getOptions()。
     *
     * @return array
     */
    protected function getBaseOptions(): array
    {
        // 官方文档写法：在 getOptions() 中声明 type / jsonAssoc
        $options = (array) $this->getOptions();

        // 字段类型 = 类属性 $type + getOptions() 的 type + $jsonType
        $type = array_merge((array) $this->type, (array) ($options['type'] ?? []), (array) $this->jsonType);

        // jsonAssoc：true（默认）返回关联数组，false 返回对象
        $assoc = array_key_exists('jsonAssoc', $options) ? (bool) $options['jsonAssoc'] : (bool) $this->jsonAssoc;

        // 旧写法翻译成新写法：把 $json 声明的字段逐个补进 $jsonType
        foreach ((array) $this->json as $field) {
            if (isset($this->jsonType[$field])) {
                continue;
            }

            $current = $type[$field] ?? null;
            // 仅当该字段未声明类型、或已声明为 json 系类型（如 Dict 的 dictionary）时才翻译，
            // 其它显式类型（如 timestamp）保持原有声明不变
            if (null === $current || 'json' === $this->getTransformTypeName($current)) {
                $this->jsonType[$field] = $assoc ? 'array' : 'object';
                $type[$field] = $this->jsonType[$field];
            }
        }

        // 结果回写到类属性：框架取配置走 getOption()，而该方法在「类属性存在」时会直接
        // 返回类属性（3.x 兼容分支），只返回选项对声明了 $type/$jsonAssoc 的模型不生效。
        $this->type = $type;
        $this->jsonAssoc = $assoc;

        return ['type' => $type, 'jsonAssoc' => $assoc];
    }

    /**
     * 获取模型的查询对象（把 json 字段声明传给查询，恢复 3.x 的 json 配置传播）
     *
     * think-orm 3.x 的 Model::db() 会执行 ->json($this->json, $this->jsonAssoc)，4.x 的
     * getQuery() 丢掉了这一步，于是「查询层写入」不会对 json 字段做编码：
     * 模型链 update() / insert() 传入数组时，关联数组会在 Builder::parseData 取 $val[0] 时
     * 抛 Undefined array key 0，列表数组则被静默丢弃（不报错但写不进库）。
     * 这里把翻译后的 json 字段补回查询对象；字段类型（type = array）仍由模型层负责，
     * 这一步只影响查询层的编码与解码。
     *
     * @return \think\db\Query
     */
    public function getQuery()
    {
        $query = parent::getQuery();

        // 只把真正的 json 字段传给查询：$jsonType 里可能还包含
        // 'info->user_id' => 'int' 这类「JSON 子属性类型」的旧写法声明，它们不是字段名
        $json = [];
        foreach ((array) $this->jsonType as $field => $type) {
            if (!str_contains((string) $field, '->') && in_array($this->getTransformTypeName($type), ['array', 'object', 'json'], true)) {
                $json[] = $field;
            }
        }

        if (!empty($json)) {
            // 第二个参数为 assoc：jsonResult() 内部固定按关联数组解码，这里保持旧写法语义
            $query->json($json, (bool) $this->jsonAssoc);
        }

        return $query;
    }

    /**
     * 写入数据前的类型转换（修正 think-orm 4.x 对 timestamp 的写入行为）
     *
     * think-orm 3.x 对 type 中的 'timestamp' 写入的是 int 时间戳
     * （'timestamp' => !is_numeric($value) ? strtotime($value) : $value），
     * 4.x 起改为与 'datetime' 完全一致，写入的是 'Y-m-d H:i:s' 格式化字符串。
     * 本项目声明为 'timestamp' 的字段（app + addon 共 150+ 处）在数据库里都是
     * int 列，4.x 的行为会写坏数据：非严格模式下被静默截断为 0，
     * 严格模式下直接报 1265 Data truncated。
     *
     * 此处仅恢复写入侧的 3.x 语义；读取行为不变（仍输出格式化时间）。
     *
     * @param mixed             $value 值
     * @param string|array|null $type  要转换的类型
     * @return mixed
     */
    protected function writeTransform($value, string | array | null $type)
    {
        $typeName = $this->getTransformTypeName($type);

        if ('timestamp' === $typeName) {
            return $this->normalizeTimestampValue($value);
        }

        return parent::writeTransform($value, $type);
    }

    /**
     * 获取自动时间戳字段的写入值（修正 think-orm 4.x 的自动时间戳行为）
     *
     * 4.x 的 AutoWriteData::getDateTime() 只在字段类型解析成 int / integer 时才返回
     * time()，声明为 'timestamp' 时落到最后的分支返回 'Y-m-d H:i:s.u' 字符串：
     *
     *     return DateTime::from('now', $this)->format('Y-m-d H:i:s.u');
     *
     * 而本项目的 create_time / update_time / delete_time 等时间列都是 int 列
     * （模型里大量声明 type['字段'] = 'timestamp'，见 addon/shop/app/model/delivery/Store.php）。
     * 于是「框架自动填充时间」这条路会把格式化字符串写进 int 列：
     * 严格模式直接报 1265 Data truncated for column 'update_time'，
     * 非严格模式被静默截断成 2026（实测：落库值为 2026），数据同样是坏的。
     *
     * 上面的 writeTransform() 只覆盖「显式赋值」这条路（writeTransform 的调用点仅有
     * Attribute::setAttr() 与 getOrigin($name, true)）；自动时间戳走的是
     * AutoWriteData::autoDateTime() → setData() 直写，不经过 writeTransform，
     * 因此必须在这里单独兜住。
     *
     * 仅影响自动填充的时间字段：显式赋值仍由 writeTransform()/normalizeTimestampValue()
     * 处理；非时间戳语义的字段一律交回父类，读取输出（格式化时间字符串）保持不变。
     *
     * @param string $field 字段名
     * @return mixed
     */
    protected function getDateTime(string $field)
    {
        // 兼容 'timestamp:Y-m-d'、['timestamp', 'Y-m-d'] 等写法
        $type = $this->getTransformTypeName($this->getFields($field));

        // 时间戳语义 + 整型列：统一写入 int 时间戳
        if (in_array($type, [ 'timestamp', 'int', 'integer' ], true)) {
            return time();
        }

        return parent::getDateTime($field);
    }

    /**
     * 取出类型名（兼容 'timestamp:Y-m-d' 与 ['timestamp', 'Y-m-d'] 写法）
     *
     * @param string|array|null $type
     * @return string
     */
    protected function getTransformTypeName(string | array | null $type): string
    {
        if (is_array($type)) {
            return (string) ($type[0] ?? '');
        }

        if (is_string($type) && str_contains($type, ':')) {
            return explode(':', $type, 2)[0];
        }

        return (string) $type;
    }

    /**
     * 将 timestamp 字段的写入值规整为 int 时间戳
     *
     * @param mixed $value
     * @return mixed
     */
    protected function normalizeTimestampValue($value)
    {
        // null 与 SQL 原生表达式原样返回，交由上层/数据库处理
        if (is_null($value) || $value instanceof Raw || $value instanceof Express) {
            return $value;
        }

        // think-orm 4.x 在 set() 阶段已把值包装为 think\model\type\DateTime 对象
        if ($value instanceof ModelDateTime) {
            $value = $value->value();
        } elseif (is_object($value) && $value instanceof Stringable) {
            $value = (string) $value;
        }

        if (is_null($value)) {
            return null;
        }

        if (is_numeric($value)) {
            return (int) $value;
        }

        $value = (string) $value;

        // 兼容带微秒或多字节分隔符的日期字符串
        if (preg_match('/^(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2})/', $value, $match)) {
            $value = $match[1];
        }

        $time = strtotime($value);

        return $time === false ? 0 : $time;
    }

    /**
     * 软删除时间字段读取（恢复 think-orm 3.x 语义）
     *
     * 4.x 的 isTimeAttr() 把 deleteTime 也纳入了「数字时间字段自动格式化」范围，
     * 于是未删除的数据（delete_time = 0）会被输出成 '1970-01-01 08:00:00' 字符串；
     * 3.x 只处理 createTime/updateTime，delete_time 原样返回。
     *
     * 该字符串在 PHP/JS 里都是真值，容易被前端误判为「已删除」，
     * 也与本项目「空时间输出空串」的约定（见 getCreateTimeAttr）不一致。
     * 用字段访问器恢复原样返回（访问器优先级高于框架的自动格式化分支）。
     *
     * @param mixed $value
     * @param array $data
     * @return mixed
     */
    public function getDeleteTimeAttr($value, $data = [])
    {
        return $value;
    }

    /**
     * 批量保存（恢复 think-orm 3.x 的事务包裹语义）
     *
     * think-orm 3.x 的 saveAll() 内部用 $db->transaction() 包裹，整批写入具备原子性；
     * 4.x 改为逐条 save()，不再自动开启事务，中途失败会残留已写入的部分数据。
     * 这里恢复 3.x 行为：整批包在一个事务里，出现异常时整体回滚。
     *
     * @param iterable $dataSet 数据集
     * @param bool     $replace 是否自动识别更新和写入
     * @return Collection
     */
    public static function saveAll(iterable $dataSet, bool $replace = true): Collection
    {
        $model = new static();

        return $model->db()->transaction(function () use ($dataSet, $replace) {
            return parent::saveAll($dataSet, $replace);
        });
    }

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
