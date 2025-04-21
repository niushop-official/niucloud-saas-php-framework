<?php

namespace addon\cms;


/**
 * 插件安装之后单独的插件方法
 * Class Manage
 * @package addon\cms
 */
class Addon
{
    /**
     * 插件安装执行
     */
    public function install()
    {
        return true;
    }

    /**
     * 插件卸载执行
     */
    public function uninstall()
    {
        return true;
    }

    /**
     * 插件升级执行
     */
    public function upgrade()
    {
        return true;
    }

}
