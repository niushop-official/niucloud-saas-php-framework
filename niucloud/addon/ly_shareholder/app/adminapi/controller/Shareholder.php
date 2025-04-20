<?php

namespace addon\ly_shareholder\app\adminapi\controller;

use addon\ly_shareholder\app\service\core\CoreShareholderLevelService;
use core\base\BaseAdminController;
use addon\ly_shareholder\app\service\admin\ShareholderService;


/**
 * 股东控制器
 * Class Shareholder
 * @package addon\ly_shareholder\app\adminapi\controller
 */
class Shareholder extends BaseAdminController
{
   /**
    * 获取股东列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["site_id",""],
             ["shareholder_no",""],
             ["member_id",""],
             ['search', ''],
             ["level_id",""],
             ["amount",""],
             ["status",""],
             ["create_time",["",""]],
             ["lock_time",["",""]]
        ]);
        // (new CoreShareholderLevelService())->shareholderUpgrade($data['site_id'],$data['member_id']);
        return success((new ShareholderService())->getPage($data));
    }

    /**
     * 股东详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $shareholder_id){
        return success((new ShareholderService())->getInfo($shareholder_id));
    }

    /**
     * 添加股东
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["rate",0.00],
             ["amount",0.00],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_shareholder\app\validate\Shareholder.add');
        $id = (new ShareholderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 股东编辑
     * @param $member_id  
     * @return \think\Response
     */
    public function edit(int $member_id){
        $data = $this->request->params([
            //  ["member_id",0],
             ["level_id",0],
             ["rate",0.00],
             ["amount",0.00],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_shareholder\app\validate\\Shareholder.edit');
        (new ShareholderService())->edit($data,$member_id );
        return success('EDIT_SUCCESS');
    }

    /**
     * 股东删除
     * @param $id  
     * @return \think\Response
     */
    public function del(int $id){
        (new ShareholderService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 冻结
     * @param int $member_id
     * @return Response
     */
    public function invalid(int $member_id)
    {
        $data = $this->request->params([
            ['shareholder_level', ''],
            ['status', ''],
        ]);
//        $this->validate($data, 'addon\shop_fenxiao\app\validate\fenxiao\Fenxiao.edit');
        (new ShareholderService())->invalid($member_id);
        return success('SUCCESS');
    }

    /**
     * 查询股东列表
     * @return Response
     * @throws DbException
     */
    public function getListOfSelect()
    {
        $data = $this->request->params([
            ['is_shareholder', 'all'],
            ['search', ''],
            ['not_in', []]
        ]);
        return success((new ShareholderService())->getListOfSelect($data));
    }

    public function getMemberListOfSelect(){
        
        $data = $this->request->params([
            ['search',''],
            ['not_in',[]]
        ]);

        return (new ShareholderService())->getMemberListOfSelect($data);
    }
}