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

namespace addon\huodong\app\adminapi\controller\act;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\act\ActService;
use addon\huodong\app\job\HuodongTask;


/**
 * 活动列控制器
 * Class Act
 * @package addon\huodong\app\adminapi\controller\act
 */
class Act extends BaseAdminController
{
   /**
    * 获取活动列列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["name",""],
             ["cate_id",""],
             ["startime",["",""]],
             ["endtime",["",""]],
             ["status",""],
             ["adddate",["",""]]
        ]);
        ((new HuodongTask)->doJob());
        return success((new ActService())->getPage($data));
    }

    /**
     * 活动列详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ActService())->getInfo($id));
    }

    /**
     * 添加活动列
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name",""],
             ["cate_id",0],
             ["price",0.00],
             ["image",""],
             ["images",""],
            ["hxstartime",""],
             ["startime","2024-08-01 19:32:40"],
             ["endtime","2024-08-01 19:32:40"],
             ["address",""],
             ["content",""],
             ["sales",0],
             ["status",0],
            ["sort",0],
            ["usertype",-1],

            ["is_tian",0],
            ["is_pay",0],
            ["is_hexiao",0],
            ["is_zhouqi",0],
            ["hexiao_type",''],
            ["level_gifts",''],

            ["num",''],
            ["vip_mianfei",0],
            ["poster_id",''],
            ["hidecontent",''],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\act\Act.add');
        $id = (new ActService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 活动列编辑
     * @param $id  活动列id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["name",""],
             ["cate_id",0],
             ["price",0.00],
             ["image",""],
             ["images",""],
            ["hxstartime",""],
            ["startime","2024-08-01 19:32:40"],
             ["endtime","2024-08-01 19:32:40"],
             ["address",""],
             ["content",""],
             ["sales",0],
             ["status",0],
             ["sort",0],
             ["adddate","2024-08-01 19:32:40"],
             ["usertype",-1],
            ["is_tian",0],
            ["is_pay",0],
            ["num",''],
            ["is_hexiao",0],
            ["is_zhouqi",0],
            ["hexiao_type",''],
            ["level_gifts",''],
            ['optype',''],
            ["vip_mianfei",0],
            ["poster_id",''],
            ["hidecontent",''],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\act\Act.edit');
        (new ActService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 活动列删除
     * @param $id  活动列id
     * @return \think\Response
     */
    public function del(int $id){
        (new ActService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getCateAll(){
         return success(( new ActService())->getCateAll());
    }

}
