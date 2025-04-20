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

namespace addon\vipcard\app\service\admin\goods;

use addon\vipcard\app\model\MemberCard;
use addon\vipcard\app\model\MemberCardItem;
use core\base\BaseAdminService;

/**
 * 会员购买记录服务层
 * Class GoodsService
 * @package addon\vipcard\app\service\admin\goods
 */
class MemberCardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCard;
    }

    /**
     * 购买记录分页列表
     * @param $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getServicePage($where)
    {
        $field = 'goods_id, member_id, site_id, card_id, card_no, card_type, status, create_time, goods_type, order_id';
        $order = '';
        $search = [
            ['order.site_id', '=', $this->site_id],
        ];
        if($where['order_no']){
            $search[] = ['order.order_no', '=', $where['order_no']];
        }

        $search_model = $this->model->withSearch(["create_time", "status", "goods_id"], $where)->field($field)->withJoin(['order'])->where($search)->with([
            'member' => function($query){
                $query->field("nickname,username,mobile,headimg,member_id");
            },
            'goods' => function($query){
                $query->field("goods_cover, goods_name, price, goods_id, site_id")->append(["cover_thumb_small"]);
            },
            'order' => function($query){
                $query->field("order_id, site_id, order_no");
            }
        ])->order($order)->append(['card_type_name', 'status_name', 'goods_type_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 购买记录详情
     * @param $id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getServiceInfo($id)
    {
        $field = 'goods_id, member_id, site_id, card_id, card_no, card_type, status, create_time, order_id, goods_type';
        $info = $this->model->field($field)->where([['card_id', '=', $id], ['site_id', '=', $this->site_id]])->with([
            'member' => function($query){
                $query->field("nickname, username, mobile, headimg, member_id");
            },
            'order' => function($query){
                $query->field("order_id, site_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, refund_no, member_id, ip, member_message, order_money, create_time, pay_time, close_time, auto_close_time, delete_time, is_enable_refund, remark, pay_money, order_name")->append(['order_from_name']);
            }
        ])->append(["status_name", "card_type_name", "goods_type_name"])->findOrEmpty()->toArray();
        if(!empty($info))
        {
            $info['member_card_item'] = (new MemberCardItem())->where([['card_id', '=', $id]])->field('item_id, site_id, card_id, member_id, goods_id, num, use_num, expire_time, verify_code')->with([
                'member_card_verify_one' =>function($query){
                    $query->field("id, card_id, site_id, card_item_id, verify_code, verifier_id, verifier_type, num, create_time")->order("id desc")->append(["verifyer"]);
                },
                'goods' => function($query){
                    $query->field("goods_cover, goods_name, price, goods_id, site_id")->append(["cover_thumb_small"]);
                }
            ])->select()->toArray();
        }
        return $info;
    }

    /**
     * 购买记录分页列表
     * @param $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getCardPage($where)
    {
        $field = 'goods_id, member_id, site_id, card_id, card_no, card_type, status, create_time, goods_type, order_id, total_use_num, total_num';
        $order = '';

        $search = [
            ['order.site_id', '=', $this->site_id],
        ];
        if($where['order_no']){
            $search[] = ['order.order_no', '=', $where['order_no']];
        }

        $search_model = $this->model->withSearch(["create_time", "status", "goods_id", "card_type"], $where)->field($field)->withJoin(['order'])->where($search)->with([
            'member' => function($query){
                $query->field("nickname,username,mobile,headimg,member_id");
            },
            'goods' => function($query){
                $query->field("goods_cover, goods_name, price, goods_id, site_id")->append(["cover_thumb_small"]);
            },
            'order' => function($query){
                $query->field("order_id, site_id, order_no");
            }
        ])->order($order)->append(['card_type_name', 'status_name', 'goods_type_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 购买记录详情
     * @param $id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getCardInfo($id)
    {
        $field = 'goods_id, member_id, site_id, card_id, card_no, card_type, status, create_time, order_id, goods_type';
        $info = $this->model->field($field)->where([['card_id', '=', $id], ['site_id', '=', $this->site_id]])->with([
            'member' => function($query){
                $query->field("nickname, username, mobile, headimg, member_id");
            },
            'order' => function($query){
                $query->field("order_id, site_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, refund_no, member_id, ip, member_message, order_money, create_time, pay_time, close_time, auto_close_time, delete_time, is_enable_refund, remark, pay_money, order_name")->append(['order_from_name']);
            }
        ])->append(["status_name", "card_type_name", "goods_type_name"])->findOrEmpty()->toArray();
        if(!empty($info))
        {
            $info['member_card_item'] = (new MemberCardItem())->where([['card_id', '=', $id]])->field('item_id, site_id, card_id, member_id, goods_id, num, use_num, expire_time, verify_code')->with([
                'member_card_verify' =>function($query){
                    $query->field("id, card_id, site_id, card_item_id, verify_code, verifier_id, verifier_type, num, create_time")->append(["verifyer"]);
                },
                'goods' => function($query){
                    $query->field("goods_cover, goods_name, price, goods_id, site_id")->append(["cover_thumb_small"]);
                }
            ])->select()->toArray();
        }
        return $info;
    }

}