<?php
declare (strict_types = 1);

namespace app\command;

use app\job\refreshArea;
use app\service\admin\auth\LoginService;
use think\console\Command;
use think\console\Input;
use think\console\Output;

class refreshAreaCommand extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('refreshArea')
            ->setDescription('更新地区命令');
    }

    protected function execute(Input $input, Output $output)
    {
        (new refreshArea())->execute($output);
        // 指令输出
        $output->writeln('地区更新成功');
    }
}
