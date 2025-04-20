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

namespace addon\qiankun_source\app\api\controller\list;

use addon\qiankun_source\app\service\admin\category\CategoryService;
use addon\qiankun_source\app\service\admin\source_list\SourceListService;
use core\base\BaseApiController;
use think\Response;

class Index extends BaseApiController
{
    /**
     * Hello World
     * @return Response
     */
    public function index()
    {
        $data = $this->request->params([
            ["cate_id", ""],
            ["text", ""],
        ]);
        $list = (new SourceListService())->getPage($data);
        return success('SUCCESS', $list);
    }

    public function category_list()
    {
        $where['status'] = 1;
        $list = (new CategoryService())->getPage($where);
        return success('SUCCESS', $list);
    }
}
