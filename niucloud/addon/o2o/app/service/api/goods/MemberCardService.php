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

namespace addon\o2o\app\service\api\goods;

use addon\o2o\app\model\MemberCard;
use core\base\BaseApiService;

/**
 * 卡项服务层(项目)
 * Class GoodsService
 * @package addon\o2o\app\service\api\goods
 */
class MemberCardService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCard;
    }

    public function getPage($where)
    {
        $field = 'goods_id, member_id, site_id, card_id, card_no, card_type, status, create_time';
        $order = '';

        $search_model = $this->model->where([['site_id', '=', $this->site_id], ['goods_id', '=', $where['goods_id']]])->withSearch(["create_time", "card_type"], $where)->with([
            'member' => function($query){
                $query->field("nickname,username,mobile,heading,member_id");
            }
        ])->field($field)->order($order)->append(['card_type_name', 'status_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    public function getInfo($id)
    {
        $field = 'goods_id, member_id, site_id, card_id, card_no, card_type, status, create_time';
        $info = $this->model->field($field)->where([['card_id', '=', $id], ['site_id', '=', $this->site_id], ['goods_type', '=', 2]])->with([
            'member_card_item' => function($query){
                $query->field("num,use_num,verify_code,expire_time");
            },
            'member' => function($query){
                $query->field("nickname,username,mobile,heading,member_id");
            }
        ])->findOrEmpty()->toArray();

        return $info;
    }

}