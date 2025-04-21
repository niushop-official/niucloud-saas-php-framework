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

namespace core\base;


use core\exception\CommonException;
use core\job\Dispatch;
use think\facade\Log;
use think\queue\Job;


/**
 * 队列
 */
abstract class BaseJob extends Dispatch
{

    /**
     * 消费任务
     * @param $params
     */
    public function fire($params): void
    {
        $method = $params['method'] ?? 'doJob';//任务名
        $data = $params['data'] ?? [];//数据
        $this->runJob($method, $data);
    }


    /**
     * 执行任务
     * @param string $method
     * @param array $data
     * @param int $error_count
     */
    protected function runJob(string $method, array $data)
    {
        try {
            $method = method_exists($this, $method) ? $method : 'handle';
            if (!method_exists($this, $method)) {
                throw new CommonException('Job "'.static::class.'" not found！');
            }
            $this->{$method}(...$data);
            return true;
        } catch (\Throwable $e) {
            Log::write('队列错误:'.static::class.$method.'_'.'_'.$e->getMessage().'_'.$e->getFile().'_'.$e->getLine());
            throw new CommonException('Job "'.static::class.'" has error！');
        }

    }

}
