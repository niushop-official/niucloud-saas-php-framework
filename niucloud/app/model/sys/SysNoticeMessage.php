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

namespace app\model\sys;

use core\base\BaseModel;
use think\db\Query;

/**
 * 站内信模型
 * Class SysNoticeMessage
 * @package app\model\sys
 */
class SysNoticeMessage extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'sys_notice_message';

    protected $type = [
        'read_time' => 'timestamp',
        'create_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    // 设置json类型字段
    protected $json = ['params'];
    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 主体ID搜索器
     * @param Query $query
     * @param $value
     * @return void
     */
    public function searchMainIdAttr(Query $query, $value)
    {
        if ($value !== '' && $value !== null && $value !== 'all') {
            $query->where('main_id', $value);
        }
    }

    /**
     * 主体类型搜索器
     * @param Query $query
     * @param $value
     * @return void
     */
    public function searchMainTypeAttr(Query $query, $value)
    {
        if ($value !== '' && $value !== null && $value !== 'all') {
            if (is_array($value)) {
                $query->where('main_type', 'in', $value);
            } else {
                $query->where('main_type', $value);
            }
        }
    }

    /**
     * 消息模板标识
     * @param $query
     * @param $value
     * @return void
     */
    public function searchKeyAttr($query, $value)
    {
        if ($value && $value !== 'all') {
            $query->where('key', $value);
        }
    }

    /**
     * 消息标识（幂等去重）
     * @param $query
     * @param $value
     * @return void
     */
    public function searchMessageKeyAttr($query, $value)
    {
        if ($value && $value !== 'all') {
            $query->where('message_key', $value);
        }
    }

    /**
     * 一级分类搜索器
     * @param Query $query
     * @param $value
     * @return void
     */
    public function searchCategoryAttr(Query $query, $value)
    {
        if ($value !== '' && $value !== null && $value !== 'all') {
            $query->where('category', $value);
        }
    }

    /**
     * 二级分类搜索器
     * @param Query $query
     * @param $value
     * @return void
     */
    public function searchSubCategoryAttr(Query $query, $value)
    {
        if ($value !== '' && $value !== null && $value !== 'all') {
            $query->where('sub_category', $value);
        }
    }

    /**
     * 消息等级搜索器
     * @param Query $query
     * @param $value
     * @return void
     */
    public function searchLevelAttr(Query $query, $value)
    {
        if ($value !== '' && $value !== null && $value !== 'all') {
            $query->where('level', $value);
        }
    }

    /**
     * 已读状态搜索器
     * @param Query $query
     * @param $value
     * @return void
     */
    public function searchIsReadAttr(Query $query, $value)
    {
        if ($value !== '' && $value !== null && $value !== 'all') {
            $query->where('is_read', $value);
        }
    }

    /**
     * 标题模糊搜索
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchTitleAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('title', 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 读取时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchReadTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('read_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['read_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['read_time', '<=', $end_time]]);
        }
    }

    /**
     * 创建时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }
}
