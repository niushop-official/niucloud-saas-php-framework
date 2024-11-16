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

namespace app\service\admin\member;

use app\model\member\MemberSign;
use app\service\core\member\CoreMemberService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 * 会员签到服务层
 */
class MemberSignService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberSign();
    }

    /**
     * 会员签到记录
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $member_where = [];
        if (isset($where[ 'keywords' ]) && $where[ 'keywords' ] != '') {
            $member_where = [ [ 'member.member_no|member.nickname|member.mobile', 'like', '%' . $this->model->handelSpecialCharacter($where[ 'keywords' ]) . '%' ] ];
        }
        $field = 'sign_id, member_sign.site_id, member_sign.member_id, days, day_award, continue_award, continue_tag, member_sign.create_time, is_sign';
        $search_model = $this->model->withSearch([ 'create_time' ], $where)->where($member_where)->where([ [ 'member_sign.site_id', '=', $this->site_id ] ])->withJoin([ "member" => [ 'member_no', 'mobile', 'nickname', 'headimg' ] ])->field($field)->append([ 'is_sign_name' ])->order('member_sign.create_time desc');
        return $this->pageQuery($search_model, function($item, $key) {
            $item = $this->makeUp($item);
        });
    }

    /**
     * 组合整理数据
     * @param $data
     */
    public function makeUp($data)
    {
        //日签奖励
        if (!empty($data[ 'day_award' ])) {
            $data[ 'day_award' ] = ( new CoreMemberService() )->getGiftContent($this->site_id, $data[ 'day_award' ]);
        }
        //连签奖励
        if (!empty($data[ 'continue_award' ])) {
            $gift = $data[ 'continue_award' ];
            unset($gift[ 'continue_sign' ], $gift[ 'continue_tag' ], $gift[ 'receive_limit' ], $gift[ 'receive_num' ]);
            $data[ 'continue_award' ] = ( new CoreMemberService() )->getGiftContent($this->site_id, $gift);
        }
        return $data;
    }

    /**
     * 会员签到详情
     * @param int $sign_id
     * @return array
     */
    public function getInfo(int $sign_id)
    {
        $field = 'sign_id, site_id, member_id, days, day_award, continue_award, continue_tag, create_time, is_sign';
        return $this->model->where([ [ 'sign_id', '=', $sign_id ], [ 'site_id', '=', $this->site_id ] ])->field($field)->append([ 'is_sign_name' ])->findOrEmpty()->toArray();
    }

    /**
     * 设置签到设置
     * @param array $value
     * @return bool
     */
    public function setSign(array $value)
    {
        if ($value[ 'sign_period' ] <= 0) throw new CommonException('SIGN_PERIOD_GREATER_THAN');
        $data = [
            'is_use' => $value[ 'is_use' ],  //是否开启
            'sign_period' => $value[ 'sign_period' ], // 签到周期
            'day_award' => $value[ 'day_award' ], // 日签奖励
            'continue_award' => $value[ 'continue_award' ], // 连签奖励
            'rule_explain' => $value[ 'rule_explain' ] // 规则说明
        ];
        return ( new CoreConfigService() )->setConfig($this->site_id, 'SIGN_CONFIG', $data);
    }

    /**
     * 获取签到设置
     */
    public function getSign()
    {
        $info = ( new CoreConfigService() )->getConfig($this->site_id, 'SIGN_CONFIG');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'is_use' => 0,
                'sign_period' => '',
                'day_award' => '',
                'continue_award' => [],
                'rule_explain' => ''
            ];
        }
        if (empty($info[ 'value' ][ 'continue_award' ]) && gettype($info[ 'value' ][ 'continue_award' ]) == 'string') {
            $info[ 'value' ][ 'continue_award' ] = [];
        }
        return $info[ 'value' ];
    }
}
