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

namespace addon\shop_fenxiao\app\service\api\fenxiao;

use addon\shop_fenxiao\app\model\fenxiao\FenxiaoMember;
use core\base\BaseApiService;


/**
 *  分销会员关系
 */
class FenxiaoMemberService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoMember();
    }

    /**
     * 分销会员信息
     * @return array
     */
    public function getInfo()
    {
        $field = 'member_id,site_id,  pid, fenxiao_member_id, is_fenxiao, bind_time';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with([
                'member' => function ($query) {
                    $query->field('member_id,nickname,headimg,mobile');
                },
                'parentFenxiaoMember' => function ($query) {
                    $query->field('member_id, is_fenxiao')->with([
                        'member' => function ($query) {
                            $query->field('member_id,nickname,headimg,mobile');
                        }
                    ]);
                },
                'bindFenxiaoMember' => function ($query) {
                    $query->field('member_id,nickname,headimg,mobile');
                },
            ])->field($field)->findOrEmpty()->toArray();
        return $info;
    }

}
