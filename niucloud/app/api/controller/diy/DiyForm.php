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

namespace app\api\controller\diy;

use app\service\api\diy_form\DiyFormService;
use core\base\BaseApiController;
use think\Response;

class DiyForm extends BaseApiController
{
    /**
     * 系统表单详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new DiyFormService() )->getInfo($id));
    }

    /**
     * 添加使用记录
     * @return Response
     */
    public function addRecord()
    {
        $data = $this->request->params([
            [ 'form_id', '' ],
            [ 'value', [] ],
            [ 'relate_id', '' ],
        ]);
        return success(( new DiyFormService())->addRecord($data));
    }
}
