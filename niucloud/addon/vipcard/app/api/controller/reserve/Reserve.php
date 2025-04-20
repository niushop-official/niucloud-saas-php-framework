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

namespace addon\vipcard\app\api\controller\reserve;

use addon\vipcard\app\dict\ReserveDict;
use addon\vipcard\app\service\api\reserve\ReserveService;
use core\base\BaseApiController;


/**
 * 预约控制器
 * Class Reserve
 * @package app\adminapi\controller\reserve
 */
class Reserve extends BaseApiController
{
   /**
    * 获取预约列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["reserve_state",""],
             ["create_time",""]
        ]);
        return success((new ReserveService())->getPage($data));
    }

    /**
     * 预约详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ReserveService())->getInfo($id));
    }

    /**
     * 获取状态
     */
    public function getStatus()
    {
        return success(ReserveDict::getStatus());
    }

    /**
     * 预约申请
     */
    public function apply()
    {
        $data = $this->request->params([
            ["reserve_name",""],
            ["reserve_date", ''],
            ["goods_id",""],
            ["remark", ""],
            ["source", 1],
            ["technician_id", ''],
            ['mobile', '']
        ]);
        $this->validate($data, 'addon\vipcard\app\validate\Reserve.add');
        return success('ADD_SUCCESS', (new ReserveService())->add($data));
    }

    /**
     * 修改 预约状态
     */
    public function remove($id){
        (new ReserveService())->remove($id);
        return success('SUCCESS');
    }
}
