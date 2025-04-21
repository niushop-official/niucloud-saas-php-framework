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

namespace addon\zxprint\app\service\admin\zx_print;

use addon\zxprint\app\model\zx_print\ZxPrint;

use core\base\BaseAdminService;


/**
 * 小票打印配置服务层
 * Class ZxPrintService
 * @package addon\zxprint\app\service\admin\zx_print
 */
class ZxPrintService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ZxPrint();
    }

    /**
     * 小票打印机参数设置
     * @param array $where
     * @return array
     */
    public function edits(array $data)
    {
        $existingRecords = $this->model->whereIn('value_type', array_keys($data))->select()->column('value_code', 'value_type');

        $insertData = [];
        $updateData = [];

        foreach ($data as $key => $value) {
            if (isset($existingRecords[$key])) {
                $updateData[] = [
                    'value_type' => $key,
                    'value_code' => $value,
                ];
            } else {
                $insertData[] = [
                    'site_id' => $this->site_id,
                    'value_type' => $key,
                    'value_code' => $value,
                    'status' => 1,
                    'create_time' => time(),
                ];
            }
        }

        if (!empty($updateData)) {
            foreach ($updateData as $data) {
                $this->model->where('value_type', $data['value_type'])->update(['value_code' => $data['value_code']]);
            }
        }

        if (!empty($insertData)) {
            $this->model->insertAll($insertData);
        }
    }
    
    /**
     * 小票打印机参数设置
     * @param array $where
     * @return array
     */
    public function getInfo()
    {
        $info = $this->model->select()->toArray();

        return $info;
    }
    
    /**
     * 获取设置信息
     * @param array $data
     * @return mixed
     */
    public function setting(array $Values)
    {
     
        $headerCodes = [];
        foreach ($Values as $value) {
            $headerCodes[$value] = $this->model->field('value_code,status')
                ->where('value_type', '=', $value)
                ->findOrEmpty()
                ->toArray()['value_code'] ?? '';
        }
        return $headerCodes;
    }

    

}
