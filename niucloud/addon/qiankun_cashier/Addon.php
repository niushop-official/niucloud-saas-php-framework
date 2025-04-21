<?php

namespace addon\qiankun_cashier;


/**
 * 插件安装之后单独的插件方法
 */
class Addon
{
    /**
     * 插件安装执行
     */
    public function install()
    {
        // // core/base/BaseModel.php 追加 use \addon\qiankun_cashier\app\model\OrderTrait;
        // $orderModelFile = file_get_contents(app()->getRootPath() . 'core/base/BaseModel.php');
        // if (!str_contains($orderModelFile, 'use \addon\qiankun_cashier\app\model\OrderTrait;')) {
        //     $orderModelFile = str_replace('public function getModelColumn()', 'use \addon\qiankun_cashier\app\model\OrderTrait;' . PHP_EOL . 'public function getModelColumn()', $orderModelFile);
        // }
        // file_put_contents(app()->getRootPath() . 'core/base/BaseModel.php', $orderModelFile);

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
