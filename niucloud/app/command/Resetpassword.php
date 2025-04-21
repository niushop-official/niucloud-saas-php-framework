<?php
declare (strict_types = 1);

namespace app\command;

use app\service\admin\auth\LoginService;
use app\service\admin\install\InstallSystemService;
use app\service\core\menu\CoreMenuService;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;

class Resetpassword extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('reset')
            ->setDescription('the reset administrator password command');
    }

    protected function execute(Input $input, Output $output)
    {
        LoginService::resetAdministratorPassword();
        // 指令输出
        $output->writeln('password reset success');
    }
}
