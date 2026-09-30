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

namespace app\service\core\notice;

use app\dict\notice\NoticeMessageDict;
use app\model\sys\SysNoticeMessage;
use core\base\BaseCoreService;
use core\util\HtmlSecurity;
use think\db\exception\DbException;
use think\facade\Cache;
use Throwable;

/**
 * 站内信服务层
 *
 * 所有方法均显式传入 main_id / main_type，不依赖当前请求上下文，
 * 因此可在 前台API / 后台API / 事件监听器 / 队列任务 中安全调用。
 *
 * Class CoreNoticeMessageService
 * @package app\service\core\notice
 */
class CoreNoticeMessageService extends BaseCoreService
{
    /** 长轮询默认最大挂起秒数，必须小于 nginx / PHP-FPM / 前端 axios 的超时时间 */
    const LISTEN_TIMEOUT = 25;

    /** 服务端检测间隔（秒），决定消息感知延迟上限 */
    const LISTEN_INTERVAL = 1;

    /** 快照中返回的最新消息条数 */
    const LATEST_LIMIT = 5;

    /** 快照中消息摘要长度 */
    const CONTENT_LENGTH = 60;

    /** 版本号缓存前缀 */
    const VERSION_CACHE_KEY = 'notice_message_version_';

    /** 版本号缓存秒数：同主体多个后台并发时，把 N 次查询合并为 1 次/秒 */
    const VERSION_CACHE_TTL = 1;

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNoticeMessage();
    }

    /**
     * 获取站内信列表
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'id, category, sub_category, key, title, content, params, level, is_read, create_time';
        $order = 'id desc';
        $search_model = $this->model
            ->withSearch(['main_id', 'main_type', 'category', 'sub_category', 'is_read', 'title', 'level'], $where)
            ->field($field)
            ->order($order);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取站内信详情
     * @param int $main_id
     * @param string $main_type
     * @param int $id
     * @return array
     */
    public function getInfo(int $main_id, string $main_type, int $id)
    {
        $field = 'id, category, sub_category, key, title, content, params, level, is_read, create_time';
        return $this->model->field($field)
            ->where([['id', '=', $id], ['main_id', '=', $main_id], ['main_type', '=', $main_type]])
            ->findOrEmpty()->toArray();
    }

    /**
     * 各分类的未读数量（按层级返回）
     * @param int $main_id
     * @param string $main_type
     * @return array 例：['other' => ['count' => 3, 'sub' => ['system_notice' => 1, ...]], ...]
     */
    public function getUnreadCount(int $main_id, string $main_type): array
    {
        $category_tree = NoticeMessageDict::getCategory('', $main_type);

        $list = $this->model
            ->where([
                ['main_id', '=', $main_id],
                ['main_type', '=', $main_type],
                ['is_read', '=', NoticeMessageDict::UNREAD]
            ])
            ->field('category, sub_category, count(*) as count')
            ->group('category, sub_category')
            ->select()
            ->toArray();

        $unread = [];
        foreach ($list as $item) {
            $unread[$item['category']][$item['sub_category']] = intval($item['count']);
        }

        $result = [];
        foreach ($category_tree as $category_key => $category_item) {
            $sub_keys = array_keys($category_item['sub'] ?? []);
            $sub_result = [];
            $category_total = 0;
            foreach ($sub_keys as $sub_key) {
                $sub_count = $unread[$category_key][$sub_key] ?? 0;
                $sub_result[$sub_key] = $sub_count;
                $category_total += $sub_count;
            }
            $result[$category_key] = [
                'count' => $category_total,
                'sub' => $sub_result,
            ];
        }
        return $result;
    }

    // ============================ 实时推送：版本号与快照 ============================

    /**
     * 消息版本号：总数 + 最大ID + 未读数
     * 三者任一变化都会触发推送
     * @param int $main_id
     * @param string $main_type
     * @return string
     */
    public function getVersion(int $main_id, string $main_type): string
    {
        $cache_key = self::VERSION_CACHE_KEY . $main_type . '_' . $main_id;

        // 同一主体多个后台并发监听时，1 秒缓存可把 N 次查询合并为 1 次
        try {
            $cached = Cache::get($cache_key);
            if (!empty($cached)) return (string)$cached;
        } catch (Throwable $e) {
            // 缓存不可用时降级为直接查库
        }

        $row = $this->model
            ->where([['main_id', '=', $main_id], ['main_type', '=', $main_type]])
            ->field('count(*) as total, max(id) as max_id, sum(if(is_read = 0, 1, 0)) as unread')
            ->findOrEmpty()
            ->toArray();

        $version = md5(json_encode([
            'total' => (int)($row['total'] ?? 0),
            'max_id' => (int)($row['max_id'] ?? 0),
            'unread' => (int)($row['unread'] ?? 0),
        ]));

        try {
            Cache::set($cache_key, $version, self::VERSION_CACHE_TTL);
        } catch (Throwable $e) {
            // 忽略缓存写入失败
        }

        return $version;
    }

    /**
     * 构造推送快照：未读数 + 最新几条消息
     * SSE 与长轮询共用
     * @param int $main_id
     * @param string $main_type
     * @return array
     */
    public function getSnapshot(int $main_id, string $main_type): array
    {
        $latest = $this->model
            ->where([['main_id', '=', $main_id], ['main_type', '=', $main_type]])
            ->field('id, category, sub_category, key, title, content, params, level, is_read, create_time')
            ->order('id desc')
            ->limit(self::LATEST_LIMIT)
            ->select()
            ->toArray();

        foreach ($latest as &$item) {
            $content = trim(strip_tags((string)($item['content'] ?? '')));
            $item['content'] = mb_substr($content, 0, self::CONTENT_LENGTH)
                . (mb_strlen($content) > self::CONTENT_LENGTH ? '…' : '');
            $item['params'] = $item['params'] ?: [];
            $item['level'] = (string)($item['level'] ?? NoticeMessageDict::LEVEL_INFO);
            // 前端不持有字典，分类名称在此转换
            $item['category_name'] = NoticeMessageDict::getCategoryName((string)$item['category']);
            $item['sub_category_name'] = NoticeMessageDict::getSubCategoryName((string)$item['category'], (string)$item['sub_category']);
        }

        $unread = $this->getUnreadCount($main_id, $main_type);

        return [
            'version' => $this->getVersion($main_id, $main_type),
            'unread' => $unread,
            'unread_total' => (int)array_sum(array_column($unread, 'count')),
            'latest' => $latest,
            'server_time' => time(),
        ];
    }

    /**
     * 长轮询监听（SSE 不可用时的降级方案）
     *
     * 客户端携带上次返回的 version，服务端每秒比对一次版本号，
     * 版本变化立即返回新快照，否则挂起至 $timeout 后返回 changed=false。
     *
     * @param int $main_id
     * @param string $main_type
     * @param string $client_version 客户端当前版本号，为空表示首次请求，立即返回快照
     * @param int $timeout 最大挂起秒数，需小于 nginx fastcgi_read_timeout 与前端 axios timeout
     * @return array
     */
    public function listen(int $main_id, string $main_type, string $client_version = '', int $timeout = self::LISTEN_TIMEOUT): array
    {
        // 预留执行时间，避免被 max_execution_time 中断（需确认 set_time_limit 未被禁用）
        if (function_exists('set_time_limit')) {
            @set_time_limit($timeout + 15);
        }

        // 首次请求：直接给出当前快照，用于初始化版本号
        if ($client_version === '') {
            $snapshot = $this->getSnapshot($main_id, $main_type);
            $snapshot['changed'] = true;
            return $snapshot;
        }

        $deadline = time() + $timeout;

        do {
            // 客户端断开（关闭页面 / 中止请求）时立即退出，避免空占 FPM 进程
            if (connection_aborted()) {
                return [
                    'changed' => false,
                    'version' => $client_version,
                    'aborted' => true,
                ];
            }

            if ($this->getVersion($main_id, $main_type) !== $client_version) {
                $snapshot = $this->getSnapshot($main_id, $main_type);
                $snapshot['changed'] = true;
                return $snapshot;
            }

            if (time() >= $deadline) break;

            sleep(self::LISTEN_INTERVAL);
        } while (true);

        // 超时未变化，客户端应立即发起下一轮
        return [
            'changed' => false,
            'version' => $client_version,
            'server_time' => time(),
        ];
    }

    /**
     * 清除版本号缓存（写操作后调用，让监听立即感知）
     * @param int $main_id
     * @param string $main_type
     * @return void
     */
    protected function clearVersionCache(int $main_id, string $main_type): void
    {
        try {
            Cache::delete(self::VERSION_CACHE_KEY . $main_type . '_' . $main_id);
        } catch (Throwable $e) {
            // 忽略缓存清除失败，最多延迟 VERSION_CACHE_TTL 秒生效
        }
    }

    // ============================ 写操作 ============================

    /**
     * 标记已读
     * @param int $main_id
     * @param string $main_type
     * @param array $ids 为空表示全部标记已读
     * @return bool
     */
    public function markRead(int $main_id, string $main_type, array $ids = []): bool
    {
        $where = [
            ['main_id', '=', $main_id],
            ['main_type', '=', $main_type],
            ['is_read', '=', NoticeMessageDict::UNREAD]
        ];
        if (!empty($ids)) {
            $where[] = ['id', 'in', $ids];
        }
        $this->model->where($where)->update([
            'is_read' => NoticeMessageDict::READ,
            'read_time' => time(),
            'update_time' => time(),
        ]);
        $this->clearVersionCache($main_id, $main_type);
        return true;
    }

    /**
     * 删除站内信
     * @param int $main_id
     * @param string $main_type
     * @param array $ids 必须传入，禁止无条件清空
     * @return bool
     */
    public function del(int $main_id, string $main_type, array $ids): bool
    {
        if (empty($ids)) return false;
        $this->model->where([
            ['main_id', '=', $main_id],
            ['main_type', '=', $main_type],
            ['id', 'in', $ids]
        ])->delete();
        $this->clearVersionCache($main_id, $main_type);
        return true;
    }

    /**
     * 添加站内信记录
     * @param array $data 需包含 main_id / main_type / category / sub_category / title / content
     * @return int|null
     */
    public function add(array $data)
    {
        $main_id = (int)($data['main_id'] ?? 0);
        $main_type = (string)($data['main_type'] ?? NoticeMessageDict::ADMIN);

        $data['main_id'] = $main_id;
        $data['main_type'] = $main_type;
        $data['is_read'] = NoticeMessageDict::UNREAD;
        $data['read_time'] = 0;
        $data['level'] = (string)($data['level'] ?? NoticeMessageDict::LEVEL_INFO);
        // content 支持富文本且前端以 v-html 渲染，入库前必须做 XSS 过滤
        $data['content'] = HtmlSecurity::filter((string)($data['content'] ?? ''));
        $data['create_time'] = time();
        $data['update_time'] = time();

        $log = $this->model->create($data);
        // 写入后即时清除缓存，让已连接的 SSE / 长轮询在 1 秒内感知
        $this->clearVersionCache($main_id, $main_type);
        return $log?->id;
    }

    /**
     * 发送站内信（系统级消息入口，不依赖消息模板）
     *
     * message_key 非空时按「主体 + message_key」去重：已存在则刷新内容与时间并重置为未读
     *
     * @param int $main_id 主体ID（平台端 0，站点端 site_id）
     * @param string $main_type 主体类型 admin/site/member
     * @param string $title 标题
     * @param string $content 内容（支持富文本，内部会做 XSS 过滤）
     * @param string $category 一级分类
     * @param string $sub_category 二级分类
     * @param string $level 等级 info/success/warning/error
     * @param array $params 扩展参数（跳转链接、业务id等）
     * @param string $message_key 幂等去重标识，空表示不去重
     * @param string $key 消息模板标识
     * @return int
     */
    public function send(
        int $main_id,
        string $main_type,
        string $title,
        string $content = '',
        string $category = NoticeMessageDict::OTHER,
        string $sub_category = NoticeMessageDict::SYSTEM_NOTICE,
        string $level = NoticeMessageDict::LEVEL_INFO,
        array $params = [],
        string $message_key = '',
        string $key = ''
    ): int {
        $save = [
            'main_id' => $main_id,
            'main_type' => $main_type,
            'category' => $category,
            'sub_category' => $sub_category,
            'key' => $key,
            'message_key' => $message_key,
            'title' => $title,
            'content' => HtmlSecurity::filter($content),
            'level' => $level,
            'params' => $params,
            'is_read' => NoticeMessageDict::UNREAD,
            'read_time' => 0,
            'create_time' => time(),
            'update_time' => time(),
        ];

        // 同一标识去重：已存在则刷新内容与时间，并重置为未读
        if ($message_key !== '') {
            // 注意：find() 查不到时返回 null，必须用 findOrEmpty() 才能调用 isEmpty()
            $exists = $this->model->where([
                ['main_id', '=', $main_id],
                ['main_type', '=', $main_type],
                ['message_key', '=', $message_key],
            ])->findOrEmpty();

            if (!$exists->isEmpty()) {
                $exists->save($save);
                $this->clearVersionCache($main_id, $main_type);
                return (int)$exists->id;
            }
        }

        $message = $this->model->create($save);
        $this->clearVersionCache($main_id, $main_type);
        return (int)$message->id;
    }
}
