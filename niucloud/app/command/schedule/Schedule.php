<?php

namespace app\command\schedule;

use app\command\WorkerCommand;
use app\dict\schedule\ScheduleDict;
use app\service\core\schedule\CoreScheduleService;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use Workerman\Crontab\Crontab;
use Workerman\Worker;

class Schedule extends Command
{
    use WorkerCommand;

    public function configure()
    {
        // 指令配置
        $this->setName('cron:schedule')
            ->addArgument('action', Argument::OPTIONAL, "start|stop|restart|reload|status|connections", 'start')
            ->addOption('mode', 'm', Option::VALUE_OPTIONAL, 'Run the workerman server in daemon mode.')
            ->setDescription('定时任务，类似linux的crontab。支持秒级别定时。');
    }

    /**
     * 执行任务
     * @return void
     */
    protected function execute(Input $input, Output $output)
    {
        $this->resetCli($input, $output);
        Worker::$pidFile = runtime_path() . 'workerman_schedule.pid';
        $worker = new Worker();
        $worker->name = 'schedule_work';
        $worker->count = 1;
        $output->writeln('[' . date('Y-m-d H:i:s') . ']' . " Schedule Starting...");
        // 设置时区，避免运行结果与预期不一致
        date_default_timezone_set('PRC');
        $worker->onWorkerStart = function() use ($output) {
//            // 每分钟的第1秒执行.用于计划任务是否仍在执行
            new Crontab('*/10 * * * * *', function() {
                $file = root_path('runtime') . '.schedule';
                file_put_contents($file, time());
            });
            $core_schedule_service = new CoreScheduleService();
            //查询所有的计划任务
            $task_list = $core_schedule_service->getList([ 'status' => ScheduleDict::ON ]);
            $output->writeln('[' . date('Y-m-d H:i:s') . ']' . " Schedule Started.");
            foreach ($task_list as $item) {
                //获取定时任务时间字符串
                new Crontab($this->getCrontab($item[ 'time' ]), function() use ($core_schedule_service, $item, $output) {
                    if (!empty($item[ 'class' ])) {
                        $core_schedule_service->execute($item, $output);
                    }

                });
            }
        };
        Worker::runAll();
    }

    /**
     * 获取计划任务所需的时间字符串
     * 0   1   2   3   4   5
     * |   |   |   |   |   |
     * |   |   |   |   |   +------ day of week (0 - 6) (Sunday=0)
     * |   |   |   |   +------ month (1 - 12)
     * |   |   |   +-------- day of month (1 - 31)
     * |   |   +---------- hour (0 - 23)
     * |   +------------ min (0 - 59)
     * +-------------- sec (0-59)[可省略，如果没有0位,则最小时间粒度是分钟]
     * @param $data
     * @return string
     */
    protected function getCrontab($data) : string
    {
        $sec = $data[ 'sec' ] ?? '*';
        $min = $data[ 'min' ] ?? '*';
        $hour = $data[ 'hour' ] ?? '*';
        $day = $data[ 'day' ] ?? '*';
        $week = $data[ 'week' ] ?? '*';
        $type = $data[ 'type' ] ?? '';
        switch ($type) {
            case 'sec':// 每隔几秒
                $crontab = '*/' . $sec . ' * * * * *';
                break;
            case 'min':// 每隔几分
                $crontab = '0 */' . $min . ' * * * *';
                break;
            case 'hour':// 每隔几时第几分钟执行
                $crontab = '0 ' . $min . ' */' . $hour . ' * * *';
                break;
            case 'day':// 每隔几日第几小时第几分钟执行
                $crontab = '0 ' . $min . ' ' . $hour . ' */' . $day . ' * *';
                break;
            case 'week':// 每周一次,周几具体时间执行
                $crontab = '0 ' . $min . ' ' . $hour . ' * * ' . $week;
                break;
            case 'month':// 每月一次,某日具体时间执行
                $crontab = '0 ' . $min . ' ' . $hour . ' ' . $day . ' * *';
                break;
        }
        return $crontab ?? '0 */1 * * * *';
    }
}
