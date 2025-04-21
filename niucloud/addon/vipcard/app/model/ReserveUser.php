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

namespace addon\vipcard\app\model;

use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 * 核销员
 */
class ReserveUser extends BaseModel
{

    protected $type = [
        'create_time' => 'timestamp'
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'vipcard_reserve_user';

    /**
     * 搜索器:技师名称
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("name", 'like', '%' . $value . '%');
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'create_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 创建时间转换
     * @param $value
     * @param $data
     * @return string
     */
    public function getCreateTimeDateAttr($value, $data){
        return $data['create_time'] ? get_date_by_time($data['create_time']) : '';
    }

    /**
     * 头像转换
     * @param $value
     * @param $data
     * @return string
     */
    public function getImageThumbSmallAttr($value, $data){
        return $data['headimg'] ? get_thumb_images($data['site_id'], $data['headimg'],FileDict::SMALL) : '';
    }
}
