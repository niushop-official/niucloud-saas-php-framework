<?php

namespace addon\ly_shareholder\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\ly_shareholder\app\service\admin\ShareholderLogService;


/**
 * 股东分红记录控制器
 * Class ShareholderLog
 * @package addon\ly_shareholder\app\adminapi\controller\fenhong
 */
class ShareholderLog extends BaseAdminController
{
   /**
    * 获取股东分红记录列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["site_id",""],
             ['search', ''],
             ["level_id", ""],
             ["member_id",""],
             ["level_name",""],
             ["create_time",["",""]]
        ]);

        return success((new ShareholderLogService())->getPage($data));
    }

    /**
     * 股东分红记录详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ShareholderLogService())->getInfo($id));
    }

    /**
     * 添加股东分红记录
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["order_amount",0.00],
             ["rate",0.00],
             ["level_id",0],
             ["level_name",""],
             ["level_num",0],
             ["amount",0.00],

        ]);
        // $this->validate($data, 'addon\ly_shareholder\app\validate\ShareholderLog.add');
        $id = (new ShareholderLogService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 股东分红记录编辑
     * @param $id  股东分红记录id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["order_amount",0.00],
             ["rate",0.00],
             ["level_id",0],
             ["level_name",""],
             ["level_num",0],
             ["amount",0.00],

        ]);
        // $this->validate($data, 'addon\ly_shareholder\app\validate\ShareholderLog.edit');
        (new ShareholderLogService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 股东分红记录删除
     * @param $id  股东分红记录id
     * @return \think\Response
     */
    public function del(int $id){
        (new ShareholderLogService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getShareholderLevelAll(){
         return success(( new ShareholderLogService())->getShareholderLevelAll());
    }

    //根据model中的member方法的hasdone关联的信息获取会员信息
    public function getMemberInfo(){
        
        return success(( new ShareholderLogService())->getMemberInfo());
    }

}