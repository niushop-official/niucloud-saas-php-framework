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

namespace addon\zxprint\app\adminapi\controller\zx_printlog;

use core\base\BaseAdminController;
use addon\zxprint\app\service\admin\zx_printlog\ZxPrintlogService;


/**
 * 小票打印记录控制器
 * Class ZxPrintlog
 * @package addon\zxprint\app\adminapi\controller\zx_printlog
 */
class ZxPrintlog extends BaseAdminController
{
   /**
    * 获取小票打印记录列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["order_id",""],
             ["create_time",["",""]]
        ]);
        return success((new ZxPrintlogService())->getPage($data));
    }

    /**
     * 小票打印记录删除
     * @param $id  小票打印记录id
     * @return \think\Response
     */
    public function del(int $id){
        (new ZxPrintlogService())->del($id);
        return success('DELETE_SUCCESS');
    }
    
    /**
     * 进行小票打印
     * @param $id  小票打印记录订单order_id
     * @return \think\Response
     */
    public function print(int $order_id)
    {
        return success((new ZxPrintlogService())->print($order_id));
    }

    
    public function getOrderAll(){
         return success(( new ZxPrintlogService())->getOrderAll());
    }

}
