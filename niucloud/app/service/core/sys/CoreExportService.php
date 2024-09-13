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

namespace app\service\core\sys;

use app\dict\sys\ExportDict;
use app\model\sys\SysExport;
use core\base\BaseCoreService;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use think\facade\Log;

/**
 * 配置服务层
 * Class CoreExportService
 * @package app\service\core\sys
 */
class CoreExportService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysExport();
    }

    /**
     * 报表导出添加
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $export = $this->model->create($data);
        return $export->id;
    }

    /**
     * 报表导出更新
     * @param int $export_id
     * @param array $data
     * @return true
     */
    public function edit(int $export_id, array $data)
    {
        $where = ['id' => $export_id];
        $this->model->where($where)->update($data);
        return true;
    }

    /**
     * 获取导出数据类型列表
     * @return array
     */
    public function getExportDataType()
    {
        $type_array = event("ExportDataType");
        $type_list = [];
        $data = [];
        foreach ($type_array as $v)
        {
            $type_list = empty($type_list) ? $v : array_merge($type_list, $v);
        }
        foreach ($type_list as $k => $v)
        {
            $data = empty($data) ? [$k => $v['name']] : array_merge($data, [$k => $v['name']]);
        }
        return $data;
    }

    /**
     * 获取导出数据列
     * @param string $type
     * @return array|mixed
     */
    public function getExportDataColumn($type = '')
    {
        $type_array = event("ExportDataType");
        $type_list = [];
        foreach ($type_array as $v)
        {
            $type_list = empty($type_list) ? $v : array_merge($type_list, $v);
        }
        return $type == '' ? $type_list : $type_list[$type]['column'];
    }

    /**
     * 获取导出数据源
     * @param string $type
     * @return array|mixed
     */
    public function getExportData($site_id = 0, $type = '', $where = [], $page = [])
    {
        $param['site_id'] = $site_id;
        $param['type'] = $type;
        $param['where'] = $where;
        $param['page'] = $page;
        $data_array = event("ExportData", $param);
        $data_list = [];
        foreach ($data_array as $v)
        {
            $data_list = empty($data_list) ? $v : array_merge($data_list, $v);
        }
        return $data_list;
    }

    /**
     * 导出数据
     * @param string $data_key
     * @param array $data_column
     * @param array $data
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function export($site_id = 0, $data_key = 'order', $data_column = [], $data = []){
// 假设你有一个订单数组，每个订单是一个关联数组
//        $data_column = [
//            'id' =>[
//                'name' => '主键',
//            ],
//            'customer_name' => [
//                'name' => '客户名称'
//            ],
//            'order_date' => [
//                'name' => '订单数据'
//            ],
//            'total_amount' => [
//                'name' => '订单金额'
//            ],
//        ];
//        $data = [
//            [
//                'id' => 1,
//                'customer_name' => 'John Doe',
//                'order_date' => '2023-10-23',
//                'total_amount' => 100.00,
//                // ... 其他订单字段
//            ],
//            [
//                'id' => 2,
//                'customer_name' => 'Jane Smith',
//                'order_date' => '2023-10-24',
//                'total_amount' => 150.00,
//                // ... 其他订单字段
//            ],
//            // ... 其他订单数据
//        ];


        // 创建一个新的Spreadsheet对象
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        //组装excel列标识
        $i = 0;
        foreach ($data_column as $k => $v)
        {
            $data_column[$k]['excel_column_name'] = $this->getExcelColumnName($i);
            $i ++;
        }

        //设置excel文件表头
        foreach ($data_column as $k => $v)
        {
            $sheet->setCellValue($v['excel_column_name']. '1', $v['name']);
        }

        $row = 2; // 从第二行开始填充数据，第一行是表头
        foreach ($data as $item) {

            foreach ($data_column as $k => $v)
            {
                $sheet->setCellValue($v['excel_column_name'] . $row, $item[$k]);
            }

            $row++; // 移动到下一行
        }

        // 设置自动调整列宽
        foreach ($data_column as $k => $v)
        {
            $sheet->getColumnDimension($v['excel_column_name'])->setAutoSize(true);
        }

        // 保存Excel文件
        $writer = new Xlsx($spreadsheet);
        // 导出文件的路径
        $path = public_path() . 'upload/export';
        $export_status = ExportDict::EXPORTING;
        // 判断路径是否存在，不存在则创建
        if (!file_exists($path) || !is_dir($path)) {
            $res = mkdir($path, 0755);
            if (!$res) {
                $export_status = ExportDict::FAIL;
                $export['fail_reason'] = sprintf(get_lang('DIRECTORY')."%s".get_lang('WAS_NOT_CREATED'), $path);
            }
        }
        // 文件路径
        $filePath = 'upload/export/' . $data_key.'_'.time().'.xlsx';
        // 文件保存路径
        $savePath = public_path() . $filePath;
        // 添加导出记录
        $export['site_id'] = $site_id;
        $export['export_key'] = $data_key;
        $export['export_num'] = count($data);
        $export['export_status'] = $export_status;
        $export['create_time'] = time();
        $export_id = $this->add($export);
        // 生成excel文件保存
        $writer->save($savePath);
        // 更新导出记录
        $file_size = filesize($savePath);
        $update['file_size'] = $file_size;
        $update['file_path'] = $file_size ? $filePath : '';
        $update['export_status'] = $file_size ? ExportDict::SUCCESS : ExportDict::FAIL;
        $this->edit($export_id, $update);
        return true;
    }

    /**
     * 根据index生成表头
     * @param $index
     * @return string
     */
    private function getExcelColumnName($index) {
        $numeric = $index + 1; // Excel 列索引从 1 开始
        $stringValue = '';
        $value = $numeric;

        while ($value > 0) {
            $stringValue = chr(($value - 1) % 26 + ord('A')) . $stringValue;
            $value = intval(($value - 1) / 26);
        }

        return $stringValue;
    }

    /**
     * 删除导出报表文件
     * @param $file_path
     * @return void
     */
    public function deleteExportFile($file_path)
    {
        $file = public_path() . $file_path;
        if (file_exists($file)) {
            if (unlink($file)) {
                Log::write('报表文件删除成功');
            } else {
                Log::write('报表文件删除失败！文件路径：'.$file_path);
            }
        } else {
            Log::write('报表文件不存在！');
        }
    }
}
