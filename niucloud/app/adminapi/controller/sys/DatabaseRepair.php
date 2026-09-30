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

namespace app\adminapi\controller\sys;

use app\service\admin\sys\DatabaseRepairService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 数据库结构修复
 * Class DatabaseRepair
 * @description 数据库结构修复
 * @package app\adminapi\controller\sys
 */
class DatabaseRepair extends BaseAdminController
{
    /**
     * 数据库结构检测
     * @description 对比安装文件定义与实际数据库结构，检测缺失的数据表与字段
     * @return Response
     */
    public function check()
    {
        return success((new DatabaseRepairService())->check());
    }

    /**
     * 一键修复
     * @description 补齐缺失的数据表与字段（不删除现有数据）
     * @return Response
     */
    public function repair()
    {
        return success((new DatabaseRepairService())->repair(request()->param()));
    }
}
