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

namespace addon\huodong\app\api\controller;

use core\base\BaseApiController;
use think\Response;
use addon\huodong\app\service\api\ActService;


class Act extends BaseApiController
{
    public function catelist()
    {
        $res = ( new ActService() )->getCateAll();
        return success($res);
    }
    public function lists()
    {
        $data = $this->request->params([
            [ 'name', '' ],
            [ 'cate_id', '' ],
        ]);
        $res = ( new ActService() )->getPage($data);
        return success($res);
    }
    public function detail()
    {
        $data = $this->request->params([
            [ 'id', '' ]
        ]);
        $res = ( new ActService() )->getInfo($data['id']);
        return success($res);
    }
 
  
}
