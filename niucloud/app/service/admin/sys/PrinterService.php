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

use app\dict\sys\PrinterDict;
use app\model\sys\SysPrinter;
use app\service\core\printer\CorePrinterService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;


/**
 * 小票打印机服务层
 * Class PrinterService
 * @package app\service\admin\sys
 */
class PrinterService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysPrinter();
    }

    /**
     * 获取小票打印机分页列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'printer_id,site_id,brand,printer_name,printer_code,printer_key,open_id,apikey,print_width,status,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "printer_name" ], $where)->field($field)->order($order)->append([ 'brand_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取小票打印机列表
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getList(array $where = [], $field = 'printer_id,site_id,brand,printer_name,printer_code,printer_key,open_id,apikey,print_width,status,create_time')
    {
        return ( new CorePrinterService() )->getList($where, $field);
    }

    /**
     * 获取小票打印机信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'printer_id,site_id,brand,printer_name,printer_code,printer_key,open_id,apikey,value,print_width,status';

        $info = $this->model->field($field)->where([ [ 'printer_id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加小票打印机
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        try {
            Db::startTrans();

            $data[ 'site_id' ] = $this->site_id;
            $res = $this->model->create($data);

            // 绑定易联云设备授权
            if ($data[ 'brand' ] == PrinterDict::YI_LIAN_YUN) {
                $result = ( new CorePrinterService() )->addPrinterYly($this->site_id, $data);
                if ($result[ 'code' ] != 0) {
                    Db::rollback();
                    throw new CommonException($result[ 'message' ]);
                }
            }

            Db::commit();
            return $res->printer_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 小票打印机编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        try {
            Db::startTrans();

            // 绑定易联云设备授权
            if ($data[ 'brand' ] == PrinterDict::YI_LIAN_YUN) {
                $result = ( new CorePrinterService() )->addPrinterYly($this->site_id, $data);
                if ($result[ 'code' ] != 0) {
                    Db::rollback();
                    throw new CommonException($result[ 'message' ]);
                }
            }

            $this->model->where([ [ 'printer_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 修改小票打印机状态
     * @param $data
     * @return mixed
     */
    public function modifyStatus($data)
    {
        return $this->model->where([
            [ 'printer_id', '=', $data[ 'printer_id' ] ],
            [ 'site_id', '=', $this->site_id ]
        ])->update([ 'status' => $data[ 'status' ] ]);
    }

    /**
     * 删除小票打印机
     * @param int $printer_id
     * @return bool
     */
    public function del(int $printer_id)
    {
        try {
            Db::startTrans();
            $field = 'printer_id,brand,printer_code,open_id,apikey';
            $printer_info = $this->model->field($field)->where([ [ 'site_id', '=', $this->site_id ], [ 'printer_id', "=", $printer_id ] ])->findOrEmpty()->toArray();

            // 删除易联云打印机授权
            if ($printer_info[ 'brand' ] == PrinterDict::YI_LIAN_YUN) {
                $result = ( new CorePrinterService() )->deletePrinterYly($this->site_id, $printer_info);
                if ($result[ 'code' ] != 0) {
                    Db::rollback();
                    throw new CommonException($result[ 'message' ]);
                }
            }

            $model = $this->model->where([ [ 'printer_id', '=', $printer_id ], [ 'site_id', '=', $this->site_id ] ])->find();
            $res = $model->delete();
            Db::commit();
            return $res;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 获取小票打印模板类型
     * @return array|null
     */
    public function getType()
    {
        return ( new CorePrinterService() )->getType();
    }

    /**
     * 获取打印机设备品牌
     * @param $brand
     * @return array|mixed|string
     */
    public function getBrand($brand)
    {
        return ( new CorePrinterService() )->getBrand($brand);
    }

    /**************************************************** 打印机管理（第三方） *********************************************************/

    /******************** 易联云 start ************************/

    /**
     * 设置易联云小票打印token
     * @param $data
     * @return \app\model\sys\SysConfig|bool|\think\Model
     */
    public function setYlyTokenConfig($data)
    {
        return ( new CorePrinterService() )->setYlyTokenConfig($this->site_id, $data);
    }

    /**
     * 获取易联云配置
     * @return array
     */
    public function getYlyTokenConfig()
    {
        return ( new CorePrinterService() )->getYlyTokenConfig($this->site_id);
    }

    /**
     * 重新获取易联云token
     * @param $printer_id
     * @return mixed
     */
    public function refreshToken($printer_id)
    {
        return ( new CorePrinterService() )->refreshToken($this->site_id, $printer_id);
    }

    /**
     * 测试打印
     * @param $printer_id
     * @return array
     */
    public function testPrint($printer_id)
    {
        return ( new CorePrinterService() )->testPrint($this->site_id, $printer_id);
    }

    /**
     * 打印小票内容
     * @param $params
     */
    public function printTicket($params)
    {
        $params[ 'site_id' ] = $this->site_id;
        return ( new CorePrinterService() )->printTicket($params);
    }

    /******************** 易联云 end ************************/

}
