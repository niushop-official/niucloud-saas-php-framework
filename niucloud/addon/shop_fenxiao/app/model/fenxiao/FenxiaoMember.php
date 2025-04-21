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

namespace addon\shop_fenxiao\app\model\fenxiao;

use addon\shop\app\model\order\Order;
use app\model\member\Member;
use core\base\BaseModel;

/**
 * 分销会员
 */
class FenxiaoMember extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'member_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_member';
    protected $type = [
        'bind_time' => 'timestamp'
    ];

    /**
     * 关联会员信息
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }

    /**
     * 关联上级会员信息
     * @return \think\model\relation\hasOne
     */
    public function parentMember()
    {
        return $this->hasOne(Member::class, 'member_id', 'pid');
    }

    /**
     * 绑定会员
     * @return \think\model\relation\HasOne
     */
    public function bindFenxiaoMember()
    {
        return $this->hasOne(Member::class, 'member_id', 'fenxiao_member_id');
    }

    /**
     * 上级分销商信息
     * @return \think\model\relation\HasOne
     */
    public function parentFenxiaoMember()
    {
        return $this->hasOne(FenxiaoMember::class, 'member_id', 'pid');
    }

    /**
     * 关联订单
     * @return \think\model\relation\HasMany
     */
    public function shopOrder()
    {
        return $this->hasMany(Order::class, 'member_id', 'member_id');
    }

}
