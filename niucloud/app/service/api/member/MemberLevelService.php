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

namespace app\service\api\member;

use app\dict\member\MemberLevelDict;
use app\model\member\MemberLevel;
use app\service\core\member\CoreMemberService;
use core\base\BaseApiService;

/**
 * 会员等级服务层
 * @package app\service\api\member
 */
class MemberLevelService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 会员等级
     * @param array $data
     * @return true
     */
    public function getList(){
        $list = (new MemberLevel())->where([ ['site_id', '=', $this->site_id] ])->field('level_id,site_id,level_name,growth,remark,level_benefits,level_gifts')->order('growth asc')->select()->toArray();
        $level_style = MemberLevelDict::getStyle();
        if (!empty($list)) {
            foreach ($list as $k => $item) {
                if (!empty($item['level_benefits'])) $list[$k]['level_benefits'] = array_filter(array_map(function ($item){
                    if ($item['content']) return $item;
                }, CoreMemberService::getBenefitsContent($item['site_id'], $item['level_benefits'], 'member_level')));
                if (!empty($item['level_gifts'])) $list[$k]['level_gifts'] = CoreMemberService::getGiftContent($item['site_id'], $item['level_gifts'], 'member_level');

                $filling = [
                    'benefits_one' => [ 'title' => "专属客服",  'desc' => '专业服务', 'icon' => '/static/resource/images/member/benefits/benefits_kefu.png' ],
                    'benefits_two' => [ 'title' => "专属徽章",  'desc' => '专属徽章', 'icon' => '/static/resource/images/member/benefits/benefits_badge.png' ],
                    'benefits_four' => [ 'title' => "经验累计",  'desc' => '经验累计', 'icon' => '/static/resource/images/member/benefits/benefits_experience.png' ],
                    'benefits_three' => [ 'title' => "尊享客服",  'desc' => '尊享客服', 'icon' => '/static/resource/images/member/benefits/benefits_badge.png' ],
                ];

                $length = empty($item['level_benefits']) ? 0 : count($item['level_benefits']);
                if ($length < 4) {
                    if (empty($item['level_benefits'])) $list[$k]['level_benefits'] = [];
                    foreach ($filling as $key => $content) {
                        if (count($list[$k]['level_benefits']) == 4) break;
                        $list[$k]['level_benefits'][$key] = [
                            'content' => $content
                        ];
                    }
                }

                $level_key = $k % 7 + 1;
                $list[$k]['level_bg'] = '/static/resource/images/member/level/bg_'. $level_key .'.png';
                $list[$k]['member_bg'] = '/static/resource/images/member/level/member_'. $level_key .'.png';
                $list[$k]['level_icon'] = '/static/resource/images/member/level/level_icon'. $level_key .'.png';
                $list[$k]['level_tag'] = '/static/resource/images/member/level/level_'. $level_key .'.png';

                $list[$k]['level_style'] = $level_style['level_'.$level_key] ?? [];

            }
        }
        return $list;
    }

}
