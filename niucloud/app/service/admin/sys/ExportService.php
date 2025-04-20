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

namespace app\service\admin\sys;

use app\job\sys\ExportJob;
use app\model\sys\SysExport;
use app\service\core\sys\CoreExportService;
use core\base\BaseAdminService;
use think\facade\Log;

/**
 * 导出服务层
 * Class ExportService
 * @package app\service\core\sys
 */
class ExportService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysExport();
    }

    /**
     * 报表导出列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, export_key, export_num, file_path, file_size, export_status, create_time';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['export_key', 'export_status', 'create_time'],$where)->append(['export_key_name', 'export_status_name'])->field($field)->order('id desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取导出数据类型列表
     * @param string $type
     */
    public function getExportDataType()
    {
        return (new CoreExportService())->getExportDataType();
    }

    /**
     * 检查导出数据源是否为空
     * @param string $type
     * @param array $where
     * @return bool
     */
    public function checkExportData(string $type, array $where)
    {
        $page = $this->request->params([
            ['page', 0],
            ['limit', 0]
        ]);
        $data = (new CoreExportService())->getExportData($this->site_id, $type, $where, $page);
        return count($data) > 0;
    }

    /**
     * 报表导出
     * @param string $type
     * @param array $where
     * @return bool
     */
    public function exportData(string $type, array $where){
        $page = $this->request->params([
            ['page', 0],
            ['limit', 0]
        ]);
        ExportJob::dispatch(['site_id' => $this->site_id, 'type' => $type, 'where' => $where, 'page' => $page]);
        return true;
    }

    /**
     * 报表删除
     * @param int $id
     * @return bool
     */
    public function deleteExport(int $id)
    {
        $export = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->find();
        if (!empty($export->file_path)) (new CoreExportService())->deleteExportFile($export->file_path);
        $res = $export->delete();
        return $res;
    }
}
