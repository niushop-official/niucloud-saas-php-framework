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

namespace addon\shop\app\model\coupon;

use addon\shop\app\dict\coupon\CouponDict;
use addon\shop\app\dict\coupon\CouponMemberDict;
use app\model\member\Member;
use core\base\BaseModel;

/**
 * 优惠券会员领取记录模型
 */
class CouponMember extends BaseModel
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
    protected $name = 'shop_coupon_member';


    protected $type = [
        'expire_time' => 'timestamp',
        'use_time' => 'timestamp',
    ];

    public function coupon()
    {
        return $this->hasOne(Coupon::class, 'id', 'coupon_id')->joinType('left')
            ->withField('title, price, min_condition_money, type');
    }

    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')
            ->withField('member_id,member_no, username, mobile, nickname');
    }

    /**
     * 优惠券商品项
     * @return \think\model\relation\HasMany
     */
    public function goods()
    {
        return $this->hasMany(CouponGoods::class, 'coupon_id', 'coupon_id');
    }

    public function getStatusNameAttr($value, $data)
    {
        if (empty($data[ 'status' ]))
            return '';
        $temp = CouponMemberDict::getStatus()[ $data[ 'status' ] ] ?? [];
        return $temp ?? '';

    }

    public function getReceiveTypeNameAttr($value, $data)
    {

        if (empty($data[ 'receive_type' ]))
            return '';
        $receive_type = event('CouponReceiveType', []);
        if (empty($receive_type)) {
            return [];
        }
        foreach ($receive_type as &$value) {
            foreach ($value as $v) {
                $type[] = $v[ 'name' ];
                $info[] = $v;
            }
        }

        $key = array_search($data[ 'receive_type' ], $type);

        $temp = $info[ $key ][ 'title' ] ?? [];
        return $temp ?? '';

    }

    public function getCouponPriceAttr($value, $data)
    {
        if (empty($data[ 'price' ])) {
            return 0;
        }
        return rtrim(rtrim($data[ 'price' ], '0'), '.');

    }

    public function getCouponMinPriceAttr($value, $data)
    {
        if (empty($data[ 'min_condition_money' ])) {
            return 0;
        }
        return rtrim(rtrim($data[ 'min_condition_money' ], '0'), '.');

    }

    public function getTypeNameAttr($value, $data)
    {
        if (empty($data[ 'type' ]))
            return '';
        return CouponDict::getType()[ $data[ 'type' ] ] ?? '';
    }
}
