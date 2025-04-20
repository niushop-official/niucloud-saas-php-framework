<?php

namespace app\command\queue;

use app\command\WorkerCommand;
use app\model\sys\SysSchedule;
use app\service\core\addon\CoreAddonService;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use think\facade\Log;
use Workerman\RedisQueue\Client;
use Workerman\Timer;
use Workerman\Worker;

class Queue extends Command
{
    use WorkerCommand;

    public function configure()
    {
        // 指令配置
        $this->setName('queue:listen')
            ->addArgument('action', Argument::OPTIONAL, "start|stop|restart|reload|status|connections", 'start')
            ->addOption('mode', 'm', Option::VALUE_OPTIONAL, 'Run the workerman server in daemon mode.')
            ->setDescription('基于Redis的消息队列，支持消息延迟处理。');
    }

    /**
     * 执行任务
     * @return void
     */
    protected function execute(Input $input, Output $output)
    {
        $this->resetCli($input, $output);
        Worker::$pidFile = runtime_path() . 'workerman_queue.pid';
        Worker::$logFile = runtime_path() . 'workerman.log';
        $worker = new Worker();
        $worker->name = 'queue_work';
//        $worker->count = 3;
        $worker->onWorkerStart = function() use ($output) {
            // 定时，每10秒一次
            Timer::add(30, function() use ($output) {
                ( new SysSchedule() )->select();
            });
            $redis_option = [
                'connect_timeout' => 10,
                'max_attempts' => 3,
                'retry_seconds' => 5,
                'prefix' => md5(root_path())
            ];
            if (!empty(env('redis.redis_password'))) {
                $redis_option[ 'auth' ] = env('redis.redis_password');
            }
            $redis_option[ 'db' ] = env('redis.select');
            $client = new Client('redis://' . env('redis.redis_hostname') . ':' . env('redis.port'), $redis_option);
            $queue_list = $this->getAllQueue();

            foreach ($queue_list as $queue_class_name) {
                $queue_class_name = str_replace('.php', '', $queue_class_name);
                // 订阅
                $client->subscribe($queue_class_name, function($data) use ($queue_class_name, $output) {
                    echo "\n" . '[' . date('Y-m-d H:i:s') . ']' . " Processing:" . $queue_class_name;
                    try {
                        $class_name = '\\' . $queue_class_name;
                        $class = new  $class_name();
                        $class->fire($data);
                    } catch (\Throwable $e) {
                        Log::write(date('Y-m-d H:i:s') . ',队列有错误:' . $queue_class_name . '_' . $e->getMessage() . '_' . $e->getFile() . '_' . $e->getLine());
                    }
                    echo "\n" . '[' . date('Y-m-d H:i:s') . ']' . " Processed:" . $queue_class_name;
                });
            }
            // 消费失败触发的回调(可选)
            $client->onConsumeFailure(function(\Throwable $exception, $package) use ($output) {
                echo "\n" . "队列 " . $package[ 'queue' ] . " 消费失败," . $exception->getMessage();
            });
        };
        Worker::runAll();
    }

    /**
     * 捕获所有队列任务
     * @return array
     */
    public function getAllQueue()
    {
        $class_list = [];
        $system_dir = root_path() . 'app' . DIRECTORY_SEPARATOR . 'job';
        $addon_dir = root_path() . 'addon' . DIRECTORY_SEPARATOR;
        if (is_dir($system_dir)) {
            search_dir($system_dir, $app_data, root_path());
            $class_list = array_merge($class_list, $app_data);
        }

        $addons = ( new CoreAddonService() )->getInstallAddonList();
        foreach ($addons as $v) {

            $addon_path = $addon_dir . $v[ 'key' ] . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'job';
            if (is_dir($addon_path)) {
                search_dir($addon_path, $addon_data, root_path());
                $class_list = array_merge($class_list, $addon_data);
            }
        }

        foreach ($class_list as &$v) {
            $v = str_replace('.php', '', $v);
            $v = str_replace('/', '\\', $v);
        }
        return $class_list;
    }
}
