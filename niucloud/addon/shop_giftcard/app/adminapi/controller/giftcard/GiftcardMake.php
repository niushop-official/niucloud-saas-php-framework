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

namespace addon\shop_giftcard\app\adminapi\controller\giftcard;

use addon\shop_giftcard\app\service\admin\giftcard\GiftcardMakeService;
use core\base\BaseAdminController;


/**
 * 礼品卡实体制卡控制器
 * Class GiftcardMake
 * @package addon\shop_giftcard\app\adminapi\controller\giftcard
 */
class GiftcardMake extends BaseAdminController
{
    /**
     * 获取礼品卡实体制卡列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "giftcard_id", "" ],
        ]);
        return success(( new GiftcardMakeService() )->getPage($data));
    }

    /**
     * 添加礼品卡实体制卡
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "giftcard_id", 0 ],
            [ 'card_right_type', 'balance' ],
            [ 'balance_json', '' ],
            [ "make_card_way", "" ],
            [ "total_count", 0 ],
            [ "import_path", "" ],
        ]);
        $make_id = ( new GiftcardMakeService() )->add($data);
        return success('ADD_SUCCESS', [ 'make_id' => $make_id ]);
    }

    /**
     * 礼品卡实体制卡删除
     * @param $id - 礼品卡实体制卡记录id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new GiftcardMakeService() )->del($id);
        return success('DELETE_SUCCESS');
    }

}
