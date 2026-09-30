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

namespace app\service\admin\stat;

use app\dict\addon\AddonDict;
use app\dict\site\SiteDict;
use app\dict\sys\AppTypeDict;
use app\service\admin\addon\AddonService;
use core\base\BaseAdminService;
use think\facade\Db;

/**
 * 插件运营面板服务层
 *
 * 说明：项目不存在 site_addon 关联表，插件与站点是多对多关系，由 site 表的
 * JSON 字段（app/addons）与 site_group 表的 JSON 字段（app/addon）承载，
 * 运行时由 CoreSiteService::getAddonKeysBySiteId() 合并。此处统计口径与之保持一致，
 * 采用「一次性拉取站点与分组，在 PHP 内聚合」的方式，避免逐插件 LIKE 查询。
 *
 * @package app\service\admin\stat
 */
class AddonPanelService extends BaseAdminService
{
    // 聚合结果缓存时长（秒）
    const CACHE_EXPIRE = 300;
    // 卡片列表缓存 key
    const CACHE_KEY_LIST = 'addon_panel_list_cache';
    // 站点-插件映射缓存 key（结构变更时递增版本号，避免读到旧结构缓存）
    const CACHE_KEY_SITE_MAP = 'addon_panel_site_addon_map_v2';
    // 排行榜 / 到期 / 静默列表最多返回条数
    const LIST_LIMIT = 20;
    // 分布类图表最多展示的分组数，超出归入「其他」
    const TOP_LIMIT = 10;
    // 即将到期的天数范围
    const EXPIRE_SOON_DAYS = 7;
    // 静默站点判定：近 N 天无新会员注册
    const SILENT_DAYS = 30;
    // 新老站点构成的分界（天）
    const AGE_NEW_DAYS = 30;
    const AGE_MIDDLE_DAYS = 180;

    /**
     * 站点状态映射（含体验期）
     * @var array
     */
    protected $status_map = [];

    /**
     * 站点端类型映射
     * @var array
     */
    protected $app_type_map = [];

    public function __construct()
    {
        parent::__construct();
        $this->status_map = [
            0 => get_lang('dict_site.status_experience'),
            SiteDict::ON => get_lang('dict_site.status_on'),
            SiteDict::EXPIRE => get_lang('dict_site.status_expire'),
            SiteDict::CLOSE => get_lang('dict_site.status_close'),
        ];
        $this->app_type_map = AppTypeDict::getAppType();
    }

    /**
     * 插件卡片列表（含顶部汇总）
     * @return array
     */
    public function getList(): array
    {
        return cache_remember(
            self::CACHE_KEY_LIST,
            function () {
                $addon_list = Db::name('addon')
                    ->where([['status', '=', AddonDict::ON]])
                    ->field('id, title, icon, `key`, `desc`, version, author, `type`, status, install_time')
                    ->order('install_time desc, id desc')
                    ->select()->toArray();

                [$site_addon_map, $site_map] = $this->getSiteAddonMap();
                $total_site_count = count($site_map);
                $now = time();
                $expire_end = $now + 86400 * self::EXPIRE_SOON_DAYS;

                $list = [];
                $usage_sum = 0;
                foreach ($addon_list as $addon) {
                    $key = (string)$addon['key'];
                    $site_ids = $site_addon_map[$key] ?? [];
                    $site_count = count($site_ids);

                    // 即将到期站点数 + 其中最快的剩余天数（用于卡片角标提示）
                    $expire_soon_count = 0;
                    $expire_soon_days = 0;
                    foreach ($site_ids as $site_id) {
                        if (!$this->isExpireSoon($site_map[$site_id], $now, $expire_end)) continue;
                        $expire_soon_count++;
                        $days = (int)ceil(($site_map[$site_id]['expire_time'] - $now) / 86400);
                        if ($expire_soon_days === 0 || $days < $expire_soon_days) $expire_soon_days = $days;
                    }

                    $usage_rate = $total_site_count > 0 ? round($site_count / $total_site_count * 100, 1) : 0;
                    $usage_sum += $usage_rate;

                    $list[] = [
                        'key' => $key,
                        'title' => $addon['title'] ?: $key,
                        'icon' => !empty($addon['icon']) ? $addon['icon'] : addon_resource($key, 'icon.png'),
                        'desc' => $addon['desc'] ?? '',
                        'version' => $addon['version'] ?? '',
                        'author' => $addon['author'] ?? '',
                        'type' => $addon['type'] ?? '',
                        'type_name' => AddonDict::getType()[$addon['type']] ?? '',
                        'status' => (int)$addon['status'],
                        'install_time' => (int)$addon['install_time'],
                        'site_count' => $site_count,
                        'usage_rate' => $usage_rate,
                        'expire_soon_count' => $expire_soon_count,
                        'expire_soon_days' => $expire_soon_days,
                    ];
                }

                return [
                    'addon_count' => count($list),
                    'total_site_count' => $total_site_count,
                    'avg_usage_rate' => count($list) > 0 ? round($usage_sum / count($list), 1) : 0,
                    'list' => $list,
                ];
            },
            AddonService::$cache_tag_name,
            ['expire' => self::CACHE_EXPIRE]
        );
    }

    /**
     * 单插件统计详情
     * @param string $key 插件标识
     * @param int $days 趋势区间（7 / 30）
     * @return array
     */
    public function getDetail(string $key, int $days = 7): array
    {
        $days = in_array($days, [7, 30], true) ? $days : 7;

        $addon = Db::name('addon')->where([['key', '=', $key]])
            ->field('id, title, icon, `key`, `desc`, version, author, `type`, status, install_time, create_time, update_time')
            ->findOrEmpty();

        [$site_addon_map, $site_map, $group_name_map, $site_key_map] = $this->getSiteAddonMap();
        $site_ids = $site_addon_map[$key] ?? [];
        $total_site_count = count($site_map);
        $site_count = count($site_ids);

        $now = time();
        $day_start_today = strtotime(date('Y-m-d'));
        $week_start = $day_start_today - 86400 * 6;
        $expire_end = $now + 86400 * self::EXPIRE_SOON_DAYS;
        $silent_start = $now - 86400 * self::SILENT_DAYS;

        // 站点会员统计（会员数 + 最后注册时间），用于静默站点判定
        $member_stat = $this->getMemberStat($site_ids);

        // 汇总 + 分布
        $status_count = [];
        $used_group_count = [];
        $province_count = [];
        $age_count = ['new' => 0, 'middle' => 0, 'old' => 0];
        $new_site_count = 0;
        $expire_soon_count = 0;
        $expired_count = 0;
        $silent_count = 0;

        foreach ($site_ids as $site_id) {
            $site = $site_map[$site_id];
            $status = (int)$site['status'];
            $create_time = (int)$site['create_time'];

            $status_count[$status] = ($status_count[$status] ?? 0) + 1;
            if ($status == SiteDict::EXPIRE) $expired_count++;

            $group_id = (int)$site['group_id'];
            $used_group_count[$group_id] = ($used_group_count[$group_id] ?? 0) + 1;

            // 地域：未填写统一归为 0
            $province_id = (int)($site['province_id'] ?? 0);
            $province_count[$province_id] = ($province_count[$province_id] ?? 0) + 1;

            // 新老站点构成（按站点创建时长分桶）
            $age_days = $create_time > 0 ? (int)floor(($now - $create_time) / 86400) : self::AGE_MIDDLE_DAYS;
            if ($age_days < self::AGE_NEW_DAYS) {
                $age_count['new']++;
            } elseif ($age_days < self::AGE_MIDDLE_DAYS) {
                $age_count['middle']++;
            } else {
                $age_count['old']++;
            }

            if ($create_time >= $week_start) $new_site_count++;
            if ($this->isExpireSoon($site, $now, $expire_end)) $expire_soon_count++;

            // 静默站点：正常状态、建站超过 SILENT_DAYS 天、且近 SILENT_DAYS 天无新会员注册
            if ($status == SiteDict::ON && $create_time < $silent_start) {
                $last_time = (int)($member_stat[$site_id]['last_time'] ?? 0);
                if ($last_time < $silent_start) $silent_count++;
            }
        }

        // 趋势曲线
        // total：累计存量，当前使用该插件且创建时间早于当日 24 点的站点数（准确口径，单调递增，终点等于使用站点数）
        // daily：当日新建且当前使用该插件的站点数（近似口径，仅反映新站点对该插件的采纳）
        $trend = ['date' => [], 'total' => [], 'daily' => []];
        for ($i = $days - 1; $i >= 0; $i--) {
            $day_start = $day_start_today - 86400 * $i;
            $day_end = $day_start + 86400;
            $trend['date'][] = date('m-d', $day_start);

            $daily = 0;
            $total = 0;
            foreach ($site_ids as $site_id) {
                $create_time = (int)$site_map[$site_id]['create_time'];
                if ($create_time <= 0) continue;
                if ($create_time < $day_end) $total++;
                if ($create_time >= $day_start && $create_time < $day_end) $daily++;
            }
            $trend['daily'][] = $daily;
            $trend['total'][] = $total;
        }

        // 站点状态分布
        $status_stat = ['type' => [], 'value' => []];
        foreach ($this->status_map as $status => $label) {
            if (!empty($status_count[$status])) {
                $status_stat['type'][] = $label;
                $status_stat['value'][] = $status_count[$status];
            }
        }

        // 新老站点构成
        $age_stat = [
            'type' => [
                get_lang('dict_addon_panel.age_new'),
                get_lang('dict_addon_panel.age_middle'),
                get_lang('dict_addon_panel.age_old'),
            ],
            'value' => [ $age_count['new'], $age_count['middle'], $age_count['old'] ],
        ];

        // 套餐分组分布：各套餐下使用该插件的站点数（按站点数倒序），同时给出该套餐站点总数与渗透率
        $group_total_count = [];
        foreach ($site_map as $site) {
            $group_id = (int)$site['group_id'];
            $group_total_count[$group_id] = ($group_total_count[$group_id] ?? 0) + 1;
        }
        arsort($used_group_count);
        $group_stat = ['type' => [], 'value' => [], 'total' => [], 'rate' => []];
        foreach ($used_group_count as $group_id => $count) {
            $group_total = $group_total_count[$group_id] ?? $count;
            $group_stat['type'][] = $group_id > 0 ? ($group_name_map[$group_id] ?? ('#' . $group_id)) : get_lang('dict_addon_panel.group_none');
            $group_stat['value'][] = $count;
            $group_stat['total'][] = $group_total;
            $group_stat['rate'][] = $group_total > 0 ? round($count / $group_total * 100, 1) : 0;
        }

        // 站点地域分布（TopN，按站点数倒序）
        arsort($province_count);
        $province_top = array_slice($province_count, 0, self::TOP_LIMIT, true);
        $area_name_map = $this->getAreaNames(array_keys($province_top));
        $area_stat = ['type' => [], 'value' => []];
        foreach ($province_top as $province_id => $count) {
            $area_stat['type'][] = $province_id > 0 ? ($area_name_map[$province_id] ?? ('#' . $province_id)) : get_lang('dict_addon_panel.area_unknown');
            $area_stat['value'][] = $count;
        }
        $area_rest = array_sum($province_count) - array_sum($province_top);
        if ($area_rest > 0) {
            $area_stat['type'][] = get_lang('dict_addon_panel.other');
            $area_stat['value'][] = $area_rest;
        }

        // 插件搭配：统计该插件在各站点内与哪些插件同时启用，以及搭配次数（同时启用两者的站点数）
        // 先过滤掉已卸载/停用的插件，再取 TopN，避免出现不足条数的情况
        $coexist_count = [];
        foreach ($site_ids as $site_id) {
            foreach ($site_key_map[$site_id] ?? [] as $other_key) {
                if ($other_key === '' || $other_key === $key) continue;
                $coexist_count[$other_key] = ($coexist_count[$other_key] ?? 0) + 1;
            }
        }
        arsort($coexist_count);
        $addon_title_map = $this->getAddonTitleMap(array_keys($coexist_count));
        $coexist_stat = ['type' => [], 'value' => []];
        foreach ($coexist_count as $other_key => $count) {
            if (!isset($addon_title_map[$other_key])) continue;
            $coexist_stat['type'][] = $addon_title_map[$other_key];
            $coexist_stat['value'][] = $count;
            if (count($coexist_stat['type']) >= self::TOP_LIMIT) break;
        }

        return [
            'info' => [
                'key' => $key,
                'title' => ($addon['title'] ?? '') ?: $key,
                'icon' => !empty($addon['icon']) ? $addon['icon'] : addon_resource($key, 'icon.png'),
                'desc' => $addon['desc'] ?? '',
                'version' => $addon['version'] ?? '',
                'author' => $addon['author'] ?? '',
                'type' => $addon['type'] ?? '',
                'type_name' => AddonDict::getType()[$addon['type']] ?? '',
                'status' => isset($addon['status']) ? (int)$addon['status'] : 0,
                'status_name' => isset($addon['status']) ? (AddonDict::getStatus()[(int)$addon['status']] ?? '') : '',
                'install_time' => (int)($addon['install_time'] ?? 0),
                'create_time' => (int)($addon['create_time'] ?? 0),
            ],
            'overview' => [
                'site_count' => $site_count,
                'total_site_count' => $total_site_count,
                'usage_rate' => $total_site_count > 0 ? round($site_count / $total_site_count * 100, 1) : 0,
                'new_site_count' => $new_site_count,
                'expire_soon_count' => $expire_soon_count,
                'expired_count' => $expired_count,
                'silent_count' => $silent_count,
            ],
            'trend' => $trend,
            'status_stat' => $status_stat,
            'age_stat' => $age_stat,
            'group_stat' => $group_stat,
            'area_stat' => $area_stat,
            'coexist_stat' => $coexist_stat,
        ];
    }

    /**
     * 插件关联站点列表（会员数排行 / 即将到期 / 静默站点）
     * @param string $key 插件标识
     * @return array
     */
    public function getSites(string $key): array
    {
        [$site_addon_map, $site_map] = $this->getSiteAddonMap();
        $site_ids = $site_addon_map[$key] ?? [];
        $now = time();
        $expire_end = $now + 86400 * self::EXPIRE_SOON_DAYS;
        $silent_start = $now - 86400 * self::SILENT_DAYS;

        // 站点会员统计（会员数 + 最后注册时间）
        $member_stat = $this->getMemberStat($site_ids);

        // 即将到期站点
        $expire_list = [];
        foreach ($site_ids as $site_id) {
            $site = $site_map[$site_id];
            if (!$this->isExpireSoon($site, $now, $expire_end)) continue;
            $expire_list[] = [
                'site_id' => $site_id,
                'site_name' => $site['site_name'],
                'expire_time' => date('Y-m-d', $site['expire_time']),
                'days' => (int)ceil(($site['expire_time'] - $now) / 86400),
            ];
        }
        usort($expire_list, fn($a, $b) => $a['days'] <=> $b['days']);
        $expire_list = array_slice($expire_list, 0, self::LIST_LIMIT);

        // 站点使用排行（按会员数倒序）
        $rank_list = [];
        foreach ($site_ids as $site_id) {
            $site = $site_map[$site_id];
            $rank_list[] = [
                'site_id' => $site_id,
                'site_name' => $site['site_name'],
                'member_count' => (int)($member_stat[$site_id]['member_count'] ?? 0),
                'status' => (int)$site['status'],
                'status_name' => $this->status_map[(int)$site['status']] ?? '',
                'create_time' => $site['create_time'] > 0 ? date('Y-m-d', $site['create_time']) : '',
            ];
        }
        usort($rank_list, fn($a, $b) => $b['member_count'] <=> $a['member_count']);
        $rank_list = array_slice($rank_list, 0, self::LIST_LIMIT);

        // 静默站点：正常状态、建站超过 SILENT_DAYS 天、且近 SILENT_DAYS 天无新会员注册
        $silent_list = [];
        foreach ($site_ids as $site_id) {
            $site = $site_map[$site_id];
            $create_time = (int)$site['create_time'];
            if ((int)$site['status'] != SiteDict::ON || $create_time >= $silent_start) continue;

            $last_time = (int)($member_stat[$site_id]['last_time'] ?? 0);
            if ($last_time >= $silent_start) continue;

            $silent_list[] = [
                'site_id' => $site_id,
                'site_name' => $site['site_name'],
                'member_count' => (int)($member_stat[$site_id]['member_count'] ?? 0),
                'last_member_time' => $last_time > 0 ? date('Y-m-d', $last_time) : '',
                'create_time' => $create_time > 0 ? date('Y-m-d', $create_time) : '',
                'silent_days' => $last_time > 0
                    ? (int)floor(($now - $last_time) / 86400)
                    : (int)floor(($now - $create_time) / 86400),
            ];
        }
        usort($silent_list, fn($a, $b) => $b['silent_days'] <=> $a['silent_days']);
        $silent_list = array_slice($silent_list, 0, self::LIST_LIMIT);

        return [
            'expire_list' => $expire_list,
            'rank_list' => $rank_list,
            'silent_list' => $silent_list,
        ];
    }

    /**
     * 判断站点是否即将到期
     * @param array $site
     * @param int $now
     * @param int $expire_end
     * @return bool
     */
    protected function isExpireSoon(array $site, int $now, int $expire_end): bool
    {
        return (int)$site['status'] == SiteDict::ON
            && $site['expire_time'] > $now
            && $site['expire_time'] <= $expire_end;
    }

    /**
     * 构建「插件 key => 使用站点」映射
     *
     * 与 CoreSiteService::getAddonKeysBySiteId() 口径保持一致：
     * 站点端(app_type=site)的可用插件 = 所属套餐分组的 app + addon，再合并站点自身 addons。
     *
     * @return array [ $site_addon_map, $site_map, $group_name_map, $site_key_map ]
     */
    protected function getSiteAddonMap(): array
    {
        return cache_remember(
            self::CACHE_KEY_SITE_MAP,
            function () {
                // 套餐分组：分组内含的应用 + 插件
                $group_list = Db::name('site_group')->field('group_id, group_name, app, addon')->select()->toArray();
                $group_addon_map = [];
                $group_name_map = [];
                foreach ($group_list as $group) {
                    $group_id = (int)$group['group_id'];
                    $group_name_map[$group_id] = $group['group_name'] ?? '';
                    $group_addon_map[$group_id] = array_unique(array_merge(
                        $this->decodeJsonField($group['app']),
                        $this->decodeJsonField($group['addon'])
                    ));
                }

                // 站点：排除平台管理端站点
                $site_list = Db::name('site')
                    ->where([['app_type', '<>', AppTypeDict::ADMIN]])
                    ->field('site_id, site_name, group_id, app_type, status, create_time, expire_time, province_id, addons')
                    ->select()->toArray();

                $site_addon_map = [];
                $site_key_map = [];
                $site_map = [];
                foreach ($site_list as $site) {
                    $site_id = (int)$site['site_id'];
                    $site['site_id'] = $site_id;
                    $site['province_id'] = (int)($site['province_id'] ?? 0);
                    $site_map[$site_id] = $site;

                    $addon_keys = [];
                    if ($site['app_type'] == AppTypeDict::SITE) {
                        $addon_keys = $group_addon_map[(int)$site['group_id']] ?? [];
                    }
                    $addon_keys = array_values(array_unique(array_merge($addon_keys, $this->decodeJsonField($site['addons']))));

                    $site_key_map[$site_id] = $addon_keys;
                    foreach ($addon_keys as $addon_key) {
                        if (empty($addon_key)) continue;
                        $site_addon_map[$addon_key][] = $site_id;
                    }
                }

                return [$site_addon_map, $site_map, $group_name_map, $site_key_map];
            },
            AddonService::$cache_tag_name,
            ['expire' => self::CACHE_EXPIRE]
        );
    }

    /**
     * 批量获取站点会员统计（会员数 + 最后注册时间）
     * @param array $site_ids
     * @return array [ site_id => ['member_count' => int, 'last_time' => int] ]
     */
    protected function getMemberStat(array $site_ids): array
    {
        if (empty($site_ids)) return [];

        $rows = Db::name('member')
            ->where([['site_id', 'in', $site_ids]])
            ->field('site_id, COUNT(*) AS member_count, MAX(create_time) AS last_time')
            ->group('site_id')
            ->select()->toArray();

        $stat = [];
        foreach ($rows as $row) {
            $stat[(int)$row['site_id']] = [
                'member_count' => (int)$row['member_count'],
                'last_time' => (int)$row['last_time'],
            ];
        }
        return $stat;
    }

    /**
     * 批量获取地区名称
     * @param array $ids
     * @return array [ id => name ]
     */
    protected function getAreaNames(array $ids): array
    {
        $ids = array_values(array_filter($ids, fn($id) => (int)$id > 0));
        if (empty($ids)) return [];

        return Db::name('sys_area')->where([['id', 'in', $ids]])->column('name', 'id');
    }

    /**
     * 批量获取已启用插件的名称
     * @param array $keys
     * @return array [ key => title ]
     */
    protected function getAddonTitleMap(array $keys): array
    {
        $keys = array_values(array_filter($keys, fn($key) => $key !== '' && $key !== null));
        if (empty($keys)) return [];

        return Db::name('addon')
            ->where([['key', 'in', $keys], ['status', '=', AddonDict::ON]])
            ->column('title', 'key');
    }

    /**
     * 将 JSON 字段值解析为数组
     * @param mixed $value
     * @return array
     */
    protected function decodeJsonField($value): array
    {
        if (is_array($value)) return $value;
        if (is_string($value) && $value !== '') {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? $decoded : [];
        }
        return [];
    }
}
