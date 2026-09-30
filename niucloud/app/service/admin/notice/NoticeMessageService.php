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

namespace app\service\admin\notice;

use app\dict\notice\NoticeMessageDict;
use app\model\sys\SysNoticeMessage;
use app\service\core\notice\CoreNoticeMessageService;
use core\base\BaseAdminService;
use think\db\exception\DbException;

/**
 * 站内信服务层（后台上下文）
 * Class NoticeMessageService
 * @package app\service\admin\notice
 */
class NoticeMessageService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysNoticeMessage();
    }

    /**
     * 当前主体类型：有站点ID为站点端，否则为平台端
     * @return string
     */
    public function getMainType(): string
    {
        return $this->site_id ? NoticeMessageDict::SITE : NoticeMessageDict::ADMIN;
    }

    /**
     * 当前主体ID
     * @return int
     */
    public function getMainId(): int
    {
        return (int)$this->site_id;
    }

    /**
     * 消息分页列表
     * @param array $data
     * @return array
     * @throws DbException
     */
    public function getPage(array $data): array
    {
        $data['main_id'] = $this->getMainId();
        $data['main_type'] = $this->getMainType();
        return (new CoreNoticeMessageService())->getPage($data);
    }

    /**
     * 消息详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id): array
    {
        return (new CoreNoticeMessageService())->getInfo($this->getMainId(), $this->getMainType(), $id);
    }

    /**
     * 消息分类树
     * @return array
     */
    public function getCategoryTree(): array
    {
        return NoticeMessageDict::getCategory('', $this->getMainType());
    }

    /**
     * 各分类未读数量
     * @return array
     */
    public function getUnreadCount(): array
    {
        return (new CoreNoticeMessageService())->getUnreadCount($this->getMainId(), $this->getMainType());
    }

    /**
     * 标记已读
     * @param array $ids 为空表示全部已读
     * @return bool
     */
    public function markRead(array $ids = []): bool
    {
        return (new CoreNoticeMessageService())->markRead($this->getMainId(), $this->getMainType(), $ids);
    }

    /**
     * 删除消息
     * @param array $ids
     * @return bool
     */
    public function del(array $ids): bool
    {
        return (new CoreNoticeMessageService())->del($this->getMainId(), $this->getMainType(), $ids);
    }

    /**
     * 消息版本号（SSE / 长轮询比对用）
     * @return string
     */
    public function getVersion(): string
    {
        return (new CoreNoticeMessageService())->getVersion($this->getMainId(), $this->getMainType());
    }

    /**
     * 消息快照：未读数 + 最新几条
     * @return array
     */
    public function getSnapshot(): array
    {
        return (new CoreNoticeMessageService())->getSnapshot($this->getMainId(), $this->getMainType());
    }

    /**
     * 长轮询监听消息变化（SSE 不可用时的降级方案）
     * @param string $client_version
     * @return array
     */
    public function listen(string $client_version = ''): array
    {
        return (new CoreNoticeMessageService())->listen($this->getMainId(), $this->getMainType(), $client_version);
    }
}
