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

namespace app\service\admin\sys;

use app\model\sys\SysPrinterTemplate;
use app\service\core\printer\CorePrinterService;
use core\base\BaseAdminService;
use core\exception\CommonException;


/**
 * 小票打印模板服务层
 * Class PrinterTemplateService
 * @package app\service\admin\sys
 */
class PrinterTemplateService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysPrinterTemplate();
    }

    /**
     * 获取小票打印模板分页列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'template_id,template_type,template_name,value,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "template_id", "template_type", "template_name" ], $where)->field($field)->order($order)->append([ 'template_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取小票打印模板列表
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getList(array $where = [], $field = 'template_id,template_type,template_name,value,create_time')
    {
        $order = 'create_time desc';
        return $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "template_id", "template_type", "template_name" ], $where)->field($field)->order($order)->append([ 'template_type_name' ])->select()->toArray();
    }

    /**
     * 获取小票打印模板信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'template_id,site_id,template_type,template_name,value';

        $info = $this->model->field($field)->where([ [ 'template_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加小票打印模板
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->template_id;
    }

    /**
     * 小票打印模板编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([ [ 'template_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除小票打印模板
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        // 检测要删除的模板有没有被打印机使用
        $field = 'template_type';

        $info = $this->model->field($field)->where([ [ 'template_id', "=", $id ] ])->findOrEmpty()->toArray();

        $core_printer_service = new CorePrinterService();
        $printer_list = $core_printer_service->getList([
            [ 'site_id', '=', $this->site_id ],
            [ 'template_type', 'like', '%"' . $info[ 'template_type' ] . '"%' ]
        ], 'printer_id,printer_name,value');

        if (!empty($printer_list)) {
            foreach ($printer_list as $k => $v) {
                if (!empty($v[ 'value' ])) {
                    foreach ($v[ 'value' ] as $value_k => $value_v) {
                        foreach ($value_v as $trigger_k => $trigger_v) {
                            if ($trigger_v[ 'template_id' ] == $id) {
                                throw new CommonException("该模板已被打印机 [{$v['printer_name']}] 使用，无法删除");
                                break;
                            }
                        }
                    }
                }
            }
        }
        $model = $this->model->where([ [ 'template_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        return $res;
    }

}
