<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shortvideo\app\model;

use core\base\BaseModel;
use addon\shortvideo\app\model\Video;
use app\model\member\Member;

class CommentReply extends BaseModel
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
    protected $name = 'shortvideo_comment_reply';

    public function searchAdddateAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["adddate", "between time", [ date('Y-m-d H:i:s',$start), date('Y-m-d H:i:s',$end)]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["adddate", ">= time", date('Y-m-d H:i:s',$start)]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["adddate", "<= time", date('Y-m-d H:i:s',$end)]]);
        }
    }


    /**
     * 搜索器:
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("name", "like", "%".$value."%");
        }
    }

    /**
     * 搜索器:
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value!=='') {
            $query->where("status", $value);
        }
    }
    public function searchPidAttr($query, $value, $data)
    {
        if ($value!=='') {
            $query->where("pid", $value);
        }
    }

    public function searchMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("member_id", $value);
        }
    }

    public function member(){
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_name'=>'nickname']);
    }

    public function searchVideoIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("video_id", $value);
        }
    }
    public function video(){
        return $this->hasOne(Video::class, 'id', 'video_id')->joinType('left')->withField('name,id')->bind(['video_name'=>'name']);
    }

}


