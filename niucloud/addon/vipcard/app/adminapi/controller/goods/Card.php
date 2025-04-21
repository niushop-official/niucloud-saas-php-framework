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

namespace addon\vipcard\app\adminapi\controller\goods;

use addon\vipcard\app\dict\GoodsDict;
use core\base\BaseAdminController;
use addon\vipcard\app\service\admin\goods\CardService;


/**
 * 卡项控制器
 * Class Service
 * @package addon\vipcard\app\adminapi\controller\goods
 */
class Card extends BaseAdminController
{
   /**
    * 获取卡项列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["goods_name",""],
             ["status",""],
             ["create_time",""],
        ]);
        return success((new CardService())->getPage($data));
    }

    /**
     * 卡项详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CardService())->getInfo($id));
    }

    /**
     * 添加卡项
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["goods_name",""],
             ["goods_cover",""],
             ["goods_image",""],
             ["goods_content",""],
             ["buy_info",""],
             ["verify_validity_type",0],
             ["verify_validity",0],
             ["status",0],
             ["price",0.00],
             ["goods_arr", []],
             ['card_type', ''],
             ['scribe_price', ''],
             ['keywords', ''],
             ['common_num', 0],
             ['virtually_sale', 0]
        ]);
        $this->validate($data, 'addon\vipcard\app\validate\Card.add');
        $id = (new CardService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 卡项编辑
     * @param $id  卡项id
     * @return \think\Response
     */
    public function edit($id){
        $data = $this->request->params([
            ["goods_name",""],
            ["goods_cover",""],
            ["goods_image",""],
            ["goods_content",""],
            ["buy_info",""],
            ["verify_validity_type",0],
            ["verify_validity",0],
            ["status",0],
            ["price",0.00],
            ['card_type', ''],
            ['scribe_price', ''],
            ['keywords', ''],
            ['common_num', 0],
            ['virtually_sale', 0]
        ]);

        $item_data = $this->request->params([
            ["goods_arr", []],
        ]);

        $this->validate($data, 'addon\vipcard\app\validate\Card.edit');
        (new CardService())->edit($id, $data, $item_data['goods_arr']);
        return success('EDIT_SUCCESS');
    }

    /**
     * 卡项删除
     * @param $id  卡项id
     * @return \think\Response
     */
    public function del(int $id){
        (new CardService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取卡项类型
     */
    public function getCardType(){
        return success('', GoodsDict::getCardType());
    }

    /**
     * 获取卡项核销类型
     */
    public function getVerifytype(){
        return success('', GoodsDict::getGoodsVerifyValidityType());
    }

    /**
     * 更新排序
     * @param int $id
     * @return \think\Response
     */
    public function editSort(int $id){
        $data = $this->request->params([
            ["sort",0],
        ]);
        (new CardService())->editSort($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 卡项上下架
     */
    public function editStatus($id){
        $data = $this->request->params([
            ["status", 0],
        ]);
        (new CardService())->editStatus($id, $data);
        return success('SUCCESS');
    }


    /**
     * 获取卡项列表
     * @return \think\Response
     */
    public function getGoodsPageOfSelect(){
        $data = $this->request->params([
            ['goods_name',''],
            ['goods_type',''],
            ['category_id',0],
        ]);
        return success((new CardService())->getGoodsPageOfSelect($data));
    }
}
