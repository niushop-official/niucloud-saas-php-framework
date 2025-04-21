<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop\app\service\core\order;

use addon\shop\app\dict\order\OrderBatchDeliveryDict;
use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\job\order_event\OrderBatchDeliveryJob;
use addon\shop\app\model\delivery\Company;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderBatchDelivery;
use addon\shop\app\model\order\OrderGoods;
use core\base\BaseCoreService;
use core\exception\CommonException;
use PhpOffice\PhpSpreadsheet\IOFactory;


/**
 *  订单批量操作服务层
 */
class CoreOrderBatchDeliveryService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderBatchDelivery();
    }


    public function add($data)
    {
        //记录
        $data[ 'status' ] = OrderBatchDeliveryDict::PROCESSING;//进行中
        $batch = $this->model->create($data);
        //发布任务
//        (new CoreOrderBatchDeliveryService())->execute($batch['id'], $data['site_id']);
        OrderBatchDeliveryJob::dispatch([ 'data' => $batch->toArray() ]);
        return true;
    }

    /**
     * 执行任务
     * @param $id
     * @param $site_id
     * @return void
     */
    public function execute($id, $site_id = 0)
    {
        $where = [ 'id' => $id ];
        if ($site_id > 0) {
            $where[ 'site_id' ] = $site_id;
        }
        //获取订单
        $batch = $this->model->where($where)->findOrEmpty();
        if ($batch->isEmpty()) throw new CommonException("任务不存在");
        if ($batch[ 'status' ] != OrderBatchDeliveryDict::PROCESSING) throw new CommonException("任务已经完成");
        $type = $batch[ 'type' ];
        switch ($type) {
            case 'delivery':
                //订单批量发货
                $result = $this->delivery($batch);
                break;
        }
        $fail_remark = $result[ 'fail_remark' ] ?? '';
        if (empty($fail_remark)) {
            $status = OrderBatchDeliveryDict::FINISH;
        } else {
            $status = OrderBatchDeliveryDict::FAIL;
        }
        //todo  完成或失败后，记录日志
        $update_data = [
            'status' => $status,
            'total_num' => $result[ 'total_num' ],
            'success_num' => $result[ 'success_num' ],
            'fail_num' => $result[ 'fail_num' ],
            'fail_remark' => $result[ 'fail_remark' ]
        ];
        $total_list = $result[ 'total_list' ];
        //将完整记录写入excel
        if (!empty($total_list)) {
            $output_dir = public_path() . 'upload' . DIRECTORY_SEPARATOR . 'batch' . DIRECTORY_SEPARATOR . $site_id . DIRECTORY_SEPARATOR . 'output' . DIRECTORY_SEPARATOR;
            if (!is_dir($output_dir) && !mkdir($output_dir, 0777, true) && !is_dir($output_dir)) {

            } else {
                $output = $output_dir . create_no() . '.csv';
                $file = fopen($output, 'wb');
                foreach ($total_list as $row) {
                    fputcsv($file, $row, ',', '"');
                }
                fclose($file);
                $update_data[ 'output' ] = str_replace(public_path(), '', $output);
            }
        }

        //将失败记录写入excel
        $fail_list = $result[ 'fail_list' ];
        if (!empty($fail_list)) {
            $fail_output_dir = public_path() . 'upload' . DIRECTORY_SEPARATOR . 'batch' . DIRECTORY_SEPARATOR . $site_id . DIRECTORY_SEPARATOR . 'fail_output' . DIRECTORY_SEPARATOR;
            if (!is_dir($fail_output_dir) && !mkdir($fail_output_dir, 0777, true) && !is_dir($fail_output_dir)) {

            } else {
                $fail_output = $fail_output_dir . create_no() . '.csv';
                $fail_file = fopen($fail_output, 'wb');
                foreach ($fail_list as $row) {
                    fputcsv($fail_file, $row, ',', '"');
                }
                fclose($fail_file);
                $update_data[ 'fail_output' ] = str_replace(public_path(), '', $fail_output);
            }
        }
        $this->model->where('id', $id)->update($update_data);
        return $result;
    }

    /**
     * 批量发货
     * @param $params
     * @return int[]
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public function delivery($params)
    {
        $order_delivery_data = [];//以订单编号为key分配数据
        $core_order_delivery_service = new CoreOrderDeliveryService();
        $order_model = new Order();
        $order_goods_model = new OrderGoods();
        $main_id = $params[ 'main_id' ];
        $site_id = $params[ 'site_id' ];
        $order_id_list_map = [];

        $express_company_column = ( new Company() )->where([ [ 'site_id', '=', $site_id ] ])->column('company_id', 'company_name');

        $total_num = 0;
        $success_num = 0;
        $fail_count = 0;
        $total_list = [];

        if (empty($params[ 'order_ids' ])) {
            $data = $params[ 'data' ];
            //读取导入文件
            $path = public_path() . $data[ 'path' ];
            if (is_file($path)) {
                try {
                    //复制一个新文件
                    $type = $data[ 'type' ];
                    //将文件内容读取出来
                    $spreadsheet = IOFactory::load($path);
                    // 选择要操作的工作表，这里选择第一个工作表
                    $sheet = $spreadsheet->getSheet(0);

                    // 获取行和列的数据
                    $highestRow = $sheet->getHighestRow(); // 取得总行数
                    $highestColumn = $sheet->getHighestColumn(); // 取得总列数
                    if ($type == 'order') {//整单发货
                        $sheet->setCellValue('D' . 1, '结果');
                        $sheet->setCellValue('E' . 1, '描述');
                        $total_list = [
                            [
                                '订单编号', '物流公司', '物流单号', '结果', '描述'
                            ]
                        ];
                        $fail_list = [
                            [
                                '订单编号', '物流公司', '物流单号', '结果', '描述'
                            ]
                        ];

                    } else {
                        $sheet->setCellValue('E' . 1, '结果');
                        $sheet->setCellValue('F' . 1, '描述');
                        $total_list = [
                            [
                                '订单编号', '订单项ID', '物流公司', '物流单号', '结果', '描述'
                            ]
                        ];
                        $fail_list = [
                            [
                                '订单编号', '订单项ID', '物流公司', '物流单号', '结果', '描述'
                            ]
                        ];
                    }
                    // 循环读取每一行的数据
                    for ($row = 2; $row <= $highestRow; ++$row) {
                        // 读取一行数据
                        $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
                        // 根据需要处理$rowData
                        $item_data = $rowData[ 0 ];
                        $item_data = array_map(function($value) { return trim($value); }, $item_data);

                        $error = '';
                        try {
                            $item_order_no = $item_data[ 0 ];

                            if (empty($item_order_no)) continue;
                            $total_num++;
                            $item_data[ 0 ] = (string) $item_data[ 0 ] . "\t";
                            $temp_item_data = [];
                            $item_order_id = $order_id_list_map[ $item_order_no ] ?? 0;
                            if ($item_order_id == 0) {
                                $temp_order = $order_model->where([ 'site_id' => $site_id, 'order_no' => $item_order_no ])->findOrEmpty();
                                if (!$temp_order->isEmpty()) {
                                    $order_id_list_map[ $item_order_no ] = $temp_order[ 'order_id' ];
                                    $item_order_id = $temp_order[ 'order_id' ];
                                    $order_id_list_map[ $item_order_no ] = $item_order_id;
                                }
                            }

                            if ($item_order_id > 0) {
                                if ($type == 'order') {//整单发货
                                    $item_express_company_name = $item_data[ 1 ];
                                    $express_number = $item_data[ 2 ] ?? '';
                                    if ($item_express_company_name != '无需物流') {
                                        $delivery_type = OrderDeliveryDict::EXPRESS;
                                        $item_express_company_id = $express_company_column[ $item_express_company_name ] ?? 0;
                                        if ($item_express_company_id == 0) {
//                                            $error = '物流公司不存在';
                                            throw new CommonException('物流公司不存在');
                                        }
                                    } else {
                                        $delivery_type = OrderDeliveryDict::NONE_EXPRESS;
                                        $item_express_company_id = 0;
                                        $express_number = '';
                                    }


                                    $item_order_goods_ids = $order_goods_model->where([ 'order_id' => $item_order_id ])->column('order_goods_id');
                                    $core_order_delivery_service->delivery([
                                        'main_type' => OrderLogDict::SYSTEM,
                                        'main_id' => $main_id,
                                        'site_id' => $site_id,
                                        'order_id' => $item_order_id,//订单编号
                                        'order_goods_ids' => $item_order_goods_ids,//订单项ids
                                        'delivery_type' => $delivery_type,//配送方式
                                        'delivery_way' => 'manual_write',//发货方式，manual_write：手动填写，electronic_sheet：电子面单
                                        'express_company_id' => $item_express_company_id,//物流公司
                                        'express_number' => $express_number,//物流单号
                                        'remark' => '',
                                        'electronic_sheet_id' => ''//电子面单模板
                                    ]);

                                } else {
                                    $item_express_company_name = $item_data[ 2 ];
                                    $express_number = $item_data[ 3 ] ?? '';
                                    if ($item_express_company_name != '无需物流') {
                                        $delivery_type = OrderDeliveryDict::EXPRESS;
                                        $item_express_company_id = $express_company_column[ $item_express_company_name ] ?? 0;
                                        if ($item_express_company_id == 0) {
//                                            $error = '物流公司不存在';
                                            throw new CommonException('物流公司不存在');
                                        }
                                    } else {
                                        $delivery_type = OrderDeliveryDict::NONE_EXPRESS;
                                        $item_express_company_id = 0;
                                        $express_number = '';
                                    }

                                    $core_order_delivery_service->delivery([
                                        'main_type' => OrderLogDict::SYSTEM,
                                        'main_id' => $main_id,
                                        'site_id' => $site_id,
                                        'order_id' => $item_order_id,//订单编号
                                        'order_goods_ids' => [ $item_data[ 1 ] ],//订单项ids
                                        'delivery_type' => $delivery_type,//配送方式
                                        'delivery_way' => 'manual_write',//发货方式，manual_write：手动填写，electronic_sheet：电子面单
                                        'express_company_id' => $item_express_company_id,//物流公司
                                        'express_number' => $express_number,//物流单号
                                        'remark' => '',
                                        'electronic_sheet_id' => ''//电子面单模板
                                    ]);

                                }
                            } else {
                                $error = '订单不存在';
                            }
                        } catch (\Exception $e) {
                            $error = get_lang($e->getMessage());
                        }
                        if ($type == 'order') {//整单发货
                            $temp_item_data = [
                                $item_data[ 0 ],
                                $item_data[ 1 ],
                                $item_data[ 2 ]
                            ];
                        } else {
                            $temp_item_data = [
                                $item_data[ 0 ],
                                $item_data[ 1 ],
                                $item_data[ 2 ],
                                $item_data[ 3 ]
                            ];
                        }
                        if (!$error) {
                            $temp_item_data[] = '成功';
                            $total_list[] = $temp_item_data;
                            $success_num++;
                        } else {
                            $temp_item_data[] = '失败';
                            $temp_item_data[] = $error;
                            $total_list[] = $temp_item_data;
                            $fail_list[] = $temp_item_data;
                            $fail_count++;
                        }

                    }
                } catch (\Exception $e) {
                    $fail_remark = get_lang($e->getMessage());
                }
            } else {
                $fail_remark = '文件不存在';
            }
        }
        return [
            'success_num' => $success_num,
            'fail_num' => $fail_count,
            'total_num' => $total_num,
            'total_list' => $total_list ?? [],
            'fail_list' => $fail_list ?? [],
            'fail_remark' => $fail_remark ?? ''
        ];
    }


    public function batchDelivery($data)
    {

    }

    /**
     * 获取正在进行的任务
     * @return void
     */
    public function getProcessingList()
    {
        return $this->model->where('status', OrderBatchDeliveryDict::PROCESSING)->select();
    }
}
