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

namespace addon\ttcard\app\adminapi\controller\statistics;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\statistics\StatisticsService;


/**
 * 数据统计管理控制器
 * Class Statistics
 * @package addon\ttcard\app\adminapi\controller\statistics
 */
class Statistics extends BaseAdminController
{
   /**
    * 获取数据统计管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["type",""],
             ["from_user_id",""],
             ["user_id",""],
             ["card_id",""],
             ["ip",""],
             ["create_time",["",""]]
        ]);
        return success((new StatisticsService())->getPage($data));
    }

    /**
     * 数据统计管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new StatisticsService())->getInfo($id));
    }

    /**
     * 添加数据统计管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["type",""],
             ["from_user_id",0],
             ["user_id",0],
             ["card_id",0],
             ["ip",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\statistics\Statistics.add');
        $id = (new StatisticsService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 数据统计管理编辑
     * @param $id  数据统计管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["type",""],
             ["from_user_id",0],
             ["user_id",0],
             ["card_id",0],
             ["ip",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\statistics\Statistics.edit');
        (new StatisticsService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 数据统计管理删除
     * @param $id  数据统计管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new StatisticsService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new StatisticsService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new StatisticsService())->getCardAll());
    }

}
