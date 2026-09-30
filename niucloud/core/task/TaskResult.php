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

namespace core\task;

use app\dict\sys\TaskDict;

/**
 * 统一任务执行结果（驱动接口返回体）
 * 前端据此渲染终端输出、进度条与操作按钮，不感知具体任务类型。
 */
class TaskResult
{
    /**
     * 任务状态：running / waiting_input / success / failed / canceled / rolled_back / rollback_failed / locked
     * @var string
     */
    protected string $status = TaskDict::STATUS_RUNNING;

    /**
     * 进度 0-100
     * @var int
     */
    protected int $progress = 0;

    /**
     * 当前阶段中文描述
     * @var string
     */
    protected string $stage = '';

    /**
     * 续跑游标（幂等依据，由 Handler 解释）
     * @var string
     */
    protected string $cursor = '';

    /**
     * 本次产生的终端输出事件
     * @var array
     */
    protected array $events = [];

    /**
     * 可用操作 [{code,label,style}]
     * @var array
     */
    protected array $actions = [];

    /**
     * 失败信息 ['Message'=>..,'File'=>..,'Line'=>..,'Trace'=>..]
     * @var array
     */
    protected array $fail_reason = [];

    public static function make(string $status = TaskDict::STATUS_RUNNING): self
    {
        return ( new self() )->setStatus($status);
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setProgress(int $progress): self
    {
        $this->progress = max(0, min(100, $progress));
        return $this;
    }

    public function getProgress(): int
    {
        return $this->progress;
    }

    public function setStage(string $stage): self
    {
        $this->stage = $stage;
        return $this;
    }

    public function setCursor(string $cursor): self
    {
        $this->cursor = $cursor;
        return $this;
    }

    public function getCursor(): string
    {
        return $this->cursor;
    }

    /**
     * @param array $events [[level,text,progress], ...]
     */
    public function setEvents(array $events): self
    {
        $this->events = $events;
        return $this;
    }

    /**
     * 追加单条事件
     */
    public function addEvent(string $text, string $level = 'info', $progress = null): self
    {
        $this->events[] = [ 'level' => $level, 'text' => $text, 'progress' => $progress ];
        return $this;
    }

    public function getEvents(): array
    {
        return $this->events;
    }

    /**
     * @param array $actions [['code'=>'retry','label'=>'重试','style'=>'primary'], ...]
     */
    public function setActions(array $actions): self
    {
        $this->actions = $actions;
        return $this;
    }

    public function getActions(): array
    {
        return $this->actions;
    }

    public function setFailReason(array $fail_reason): self
    {
        $this->fail_reason = $fail_reason;
        return $this;
    }

    public function getFailReason(): array
    {
        return $this->fail_reason;
    }

    public function isTerminal(): bool
    {
        return TaskDict::isTerminal($this->status);
    }

    /**
     * 接口输出
     * @param int $lastSeq 已写入的最大事件序号（便于前端去重）
     * @return array
     */
    public function toArray(int $lastSeq = 0): array
    {
        return [
            'status'      => $this->status,
            'status_name' => TaskDict::getStatus($this->status),
            'progress'    => $this->progress,
            'stage'       => $this->stage,
            'cursor'      => $this->cursor,
            'events'      => $this->events,
            'last_seq'    => $lastSeq,
            'actions'     => $this->actions,
            'fail_reason' => $this->fail_reason,
        ];
    }
}
