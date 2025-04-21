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

namespace app\job\sys;

use app\service\core\sys\CoreExportService;
use core\base\BaseJob;

/**
 * 校验队列是否在正常运行
 */
class ExportJob extends BaseJob
{
    public function doJob($site_id, $type, $where, $page)
    {
        //获取导出数据列
        $data_column = (new CoreExportService())->getExportDataColumn($site_id, $type, $where);
        //获取导出数据源
        $data = (new CoreExportService())->getExportData($site_id, $type, $where, $page);
        (new CoreExportService())->export($site_id, $type, $data_column, $data);
        return true;
    }
}
