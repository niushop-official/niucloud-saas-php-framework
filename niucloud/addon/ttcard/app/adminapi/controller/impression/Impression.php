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

namespace addon\ttcard\app\adminapi\controller\impression;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\impression\ImpressionService;


/**
 * 个人印象控制器
 * Class Impression
 * @package addon\ttcard\app\adminapi\controller\impression
 */
class Impression extends BaseAdminController
{
   /**
    * 获取个人印象列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["name",""]
        ]);
        return success((new ImpressionService())->getPage($data));
    }

    /**
     * 个人印象详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ImpressionService())->getInfo($id));
    }

    /**
     * 添加个人印象
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\impression\Impression.add');
        $id = (new ImpressionService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 个人印象编辑
     * @param $id  个人印象id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["name",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\impression\Impression.edit');
        (new ImpressionService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 个人印象删除
     * @param $id  个人印象id
     * @return \think\Response
     */
    public function del(int $id){
        (new ImpressionService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
