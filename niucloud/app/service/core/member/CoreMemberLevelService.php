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

namespace app\service\core\member;

use app\job\member\MemberGiftGrantJob;
use app\model\member\Member;
use app\model\member\MemberLevel;
use core\base\BaseCoreService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;

/**
 * 会员等级服务层
 * Class CoreMemberAccountService
 * @package app\service\core\member
 */
class CoreMemberLevelService extends BaseCoreService
{
    protected static $cache_tag_name = 'member_level_cache';

    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberLevel();
    }

    /**
     * 获取全部会员等级
     * @param int $site_id
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAll(int $site_id)
    {
        $cache_name = __METHOD__ . $site_id;
        return cache_remember(
            $cache_name,
            function() use ($site_id) {
                $field = 'level_id, level_name, growth,site_id,level_benefits,level_gifts';
                return $this->model->where([ [ 'site_id', '=', $site_id ] ])->field($field)->order('growth asc')->select()->toArray();
            },
            self::$cache_tag_name . $site_id
        );
    }

    /**
     * 清理站点会员等级缓存
     * @param int $site_id
     * @return true
     */
    public function clearCache(int $site_id)
    {
        Cache::tag(self::$cache_tag_name . $site_id)->clear();
        return true;
    }

    /**
     * 会员检测升级
     * @param $site_id
     * @param $member_id
     * @return void
     */
    public function checkLevelUpgrade($site_id, $member_id) {
        $member = (new Member())->where([ ['member_id', '=', $member_id ] ])->with('member_level_data')->field('member_id,growth,member_level')->findOrEmpty();
        if ($member->isEmpty()) return true;

        $condition = [
            ['site_id', '=', $site_id],
            ['growth', '<=', $member['growth'] ],
        ];
        if (isset($member['member_level_data']) && !empty($member['member_level_data'])) {
            $condition[] = ['growth', '>', $member['member_level_data']['growth'] ];
        }

        $upgrade = $this->model->where($condition)->field('level_id,level_gifts,growth')->order('growth asc')->select()->toArray();
        if (empty($upgrade)) return true;

        // 发放等级礼包
        foreach ($upgrade as $level) {
            MemberGiftGrantJob::dispatch([
                'site_id' => $site_id,
                'member_id' => $member_id,
                'gift' => $level['level_gifts'],
                'param' => [
                    'from_type' => 'level_upgrade',
                    'memo' => '会员升级奖励'
                ]
            ]);
        }

        $level = end($upgrade);
        $member->member_level = $level['level_id'];
        $member->save();

        event('MemberLevelUpgrade', ['site_id' => $site_id, 'member_id' => $member_id, 'level' => $level]);

        return true;
    }
}
