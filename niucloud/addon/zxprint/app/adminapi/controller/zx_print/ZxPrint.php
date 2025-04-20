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

namespace addon\zxprint\app\adminapi\controller\zx_print;

use core\base\BaseAdminController;
use addon\zxprint\app\service\admin\zx_print\ZxPrintService;


/**
 * 小票打印配置控制器
 * Class ZxPrint
 */
class ZxPrint extends BaseAdminController
{
   /**
    * 小票打印进行配置
    * @return \think\Response
    */
    public function setting(){
        $data = $this->request->params([
             ["title",""],
             ["client_id",""],
             ["client_secret",""],
             ["machine_code",""],
             ["private_key",""],
             ["print_number",1],
             ["status",""],
             ["auto_print",""],
             ["show_buyer_message",""],
             ["show_qrcode",""],
             ["qrcode_name",""],
             ["qrcode_content",""],
             ["bottom",""]
        ]);
        return success((new ZxPrintService())->edits($data));
    }

    /**
     * 小票打印配置详情
     * @param int $id
     * @return \think\Response
     */
    public function getsetting(){
        return success((new ZxPrintService())->getInfo());
    }
    
}
