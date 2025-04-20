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

namespace addon\o2o\app\model;

use addon\o2o\app\dict\TechnicianDict;
use app\dict\sys\FileDict;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;
use think\model\concern\SoftDelete;
use think\model\relation\HasOne;

/**
 * 技师模型
 * Class Technician
 * @package app\model\o2o_technician
 */
class Technician extends BaseModel
{


    use SoftDelete;
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'o2o_technician';

    /**
     * 定义软删除标记字段
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值
     * @var int
     */
    protected $defaultSoftDelete = 0;

    /**
     * 转化状态
     * @param $value
     * @param $data
     */
    public function getStatusNameAttr($value, $data)
    {
        return $data[ 'status' ] ? TechnicianDict::getTechnicianStatus()[ $data[ 'status' ] ] : '';
    }

    /**
     * 头像
     * @param $value
     * @param $data
     */
    public function getHeadimgMidAttr($value, $data)
    {
        $thumb = '';
        if ($data[ 'headimg' ] != '') {
            $thumb = get_thumb_images($data[ 'site_id' ], $data[ 'headimg' ], FileDict::MID);
        }
        return $thumb;
    }

    /**
     * 头像
     * @param $value
     * @param $data
     */
    public function getHeadimgBigAttr($value, $data)
    {
        $thumb = '';
        if ($data[ 'headimg' ] != '') {
            $thumb = get_thumb_images($data[ 'site_id' ], $data[ 'headimg' ], FileDict::BIG);
        }
        return $thumb;
    }

    /**
     * 图片
     * @param $value
     * @param $data
     */
    public function getImagesMidAttr($value, $data)
    {
        $thumb_arr = [];
        if ($data[ 'images' ] != '') {
            $img_arr = explode(",", $data[ 'images' ]);
            foreach ($img_arr as $item) {
                $thumb_arr[] = get_thumb_images($data[ 'site_id' ], $item, FileDict::MID);
            }
        }
        return $thumb_arr;
    }

    /**
     * 图片
     * @param $value
     * @param $data
     */
    public function getImagesBigAttr($value, $data)
    {
        $thumb_arr = [];
        if ($data[ 'images' ] != '') {
            $img_arr = explode(",", $data[ 'images' ]);
            foreach ($img_arr as $item) {
                $thumb_arr[] = get_thumb_images($data[ 'site_id' ], $item, FileDict::BIG);
            }
        }
        return $thumb_arr;
    }

    /**
     * 会员关联
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->withField('member_id, member_no, username, mobile, nickname, headimg')->joinType('inner');
    }

    /**
     * 会员信息
     * @return HasOne
     */
    public function memberInfo()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')
            ->withField('member_id,member_no, username, mobile, nickname, headimg')
            ->bind([ 'username', 'nickname', 'headimg' ]);
    }

    /**
     * 关联项目
     * @return HasOne
     */
    public function goods()
    {
        return $this->hasMany(TechnicianGoods::class, 'technician_id', 'id');
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('technician.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'technician.create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'technician.create_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 手机号搜索器
     * @param $value
     */
    public function searchMobileAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('technician.mobile', 'like', '%' . $value . '%');
        }
    }

    /**
     * 状态搜索器
     * @param $value
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('technician.status', '=', $value);
        }
    }

    /**
     * 姓名搜索器
     * @param $value
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('technician.name', 'like', '%' . $value . '%');
        }
    }

    /**
     * 关键字搜索器
     * @param $value
     */
    public function searchKeywordAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('name|mobile|position_name', 'like', '%' . $value . '%');
        }
    }

}
