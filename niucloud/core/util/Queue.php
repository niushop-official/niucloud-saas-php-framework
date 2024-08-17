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

namespace core\util;

use Exception;
use think\facade\Log;

/**
 * Class Queue
 * @package core\util
 * @method $this method(string $method) 设置任务执行方法
 * @method $this job(string $job) 设置任务执行类名
 * @method $this errorCount(int $error_count) 执行失败次数
 * @method $this data(...$data) 执行数据
 * @method $this secs(int $secs) 延迟执行秒数
 */
class Queue
{

    /**
     * 错误信息
     * @var string
     */
    protected $error;
    /**
     * 任务执行方法
     * @var string
     */
    protected $method = 'doJob';

    /**
     * 默认任务执行方法名
     * @var string
     */
    protected $default_method;
    /**
     * 任务类名
     * @var string
     */
    protected $job;
    /**
     * 数据
     * @var array|string
     */
    protected $data;
    /**
     * 队列名称
     * @var null
     */
    protected $queue_name = null;
    /**
     * 延迟执行秒数
     * @var int
     */
    protected $secs = 0;

    /**
     * 允许的方法或属性
     * @var array
     */
    protected $allow_function = ['method', 'data', 'error_count', 'job', 'secs'];
    /**
     * 当前实例
     * @var static
     */
    protected static $instance;

    protected function __construct()
    {
        $this->default_method = $this->method;
    }

    /**
     * 实例化当前队列
     * @return static
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    /**
     * 设置队列名称
     * @param string $queue_name
     * @return $this
     */
    public function setQueueName(string $queue_name)
    {
        $this->queue_name = $queue_name;
        return $this;
    }

    /**
     * 加入队列
     * @param array|null $data
     * @return bool
     */
    public function push()
    {
        if (!$this->job) {
            return $this->setError('JOB_NOT_EXISTS');
        }
        $jodValue = $this->getValues();
        $res = $this->send(...$jodValue);
        if (!$res) {
            $res = $this->send(...$jodValue);
            if (!$res) {
                Log::error('队列推送失败，参数：' . json_encode($jodValue, JSON_THROW_ON_ERROR));
            }
        }
//        //todo 队列扩展策略调度,

        $this->clean();
        return $res;
    }

    /**
     * 向队列发送一条消息
     * @param $queue
     * @param $data
     * @param $delay
     * @return mixed
     */
    public function send($queue, $data, $delay = 0)
    {
        $pre_queue = md5(root_path()); //1.0.5版本之前为redis-queue
        $queue_waiting = $pre_queue.'{redis-queue}-waiting'; //1.0.5版本之前为redis-queue-waiting
        $queue_delay = $pre_queue.'{redis-queue}-delayed';//1.0.5版本之前为redis-queue-delayed
        $now = time();
        if (extension_loaded('redis')) {
            try {
                $redis = new \Redis();
                $redis->connect(env('redis.redis_hostname'), env('redis.port'), 8);
                if (env('redis.redis_password', '')) {
                    $redis->auth(env('redis.redis_password', ''));
                }
                $redis->select(env('redis.select'));
                if(!$redis->ping()){
                    $redis->connect(env('redis.redis_hostname'), env('redis.port'), 8);
                    if (env('redis.redis_password', '')) {
                        $redis->auth(env('redis.redis_password', ''));
                    }
                    $redis->select(env('redis.select'));
                }
                $package_str = json_encode([
                    'id' => rand(),
                    'time' => $now,
                    'delay' => $delay,
                    'attempts' => 0,
                    'queue' => $queue,
                    'data' => $data
                ]);
                if ($delay) {
                    if(!$redis->zAdd($queue_delay, ($now + $delay), $package_str)){
                        $redis->zAdd($queue_delay, ($now + $delay), $package_str);
                    }
                    return true;
                }
                if(!$redis->lPush($queue_waiting . $queue, $package_str)){
                    $res = $redis->lPush($queue_waiting . $queue, $package_str);
                    Log::write($res);
                }
                return true;
            } catch ( Throwable $e ) {
                return false;
            }
        }else{
            return false;
        }

    }

    /**
     * 清除数据
     */
    public function clean()
    {
        $this->secs = 0;
        $this->data = [];
        $this->queue_name = null;
        $this->method = $this->default_method;
    }

    /**
     * 获取参数
     * @param $data
     * @return array
     */
    protected function getValues()
    {

        return [$this->job, ['method' => $this->method, 'data' => $this->data], $this->secs];
    }

    /**
     * 不可访问时调用
     * @param $method
     * @param $arguments
     * @return $this
     * @throws Exception
     * @throws Exception
     * @throws Exception
     */
    public function __call($method, $arguments)
    {
        if (in_array($method, $this->allow_function)) {
            if ($method === 'data') {
                $this->{$method} = $arguments;
            } else {
                $this->{$method} = $arguments[0] ?? null;
            }
            return $this;
        } else {
            throw new Exception('Method does not exist' . __CLASS__ . '->' . $method . '()');
        }
    }

    /**
     * 设置错误信息
     * @param string|null $error
     * @return bool
     */
    protected function setError(?string $error = null)
    {
        $this->error = $error;
        return false;
    }

    /**
     * 获取错误信息
     * @return string
     */
    public function getError()
    {
        $error = $this->error;
        $this->error = null;
        return $error;
    }
}
