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

namespace addon\shop\app\service\core\goods;

use addon\shop\app\model\goods\Goods;
use core\base\BaseCoreService;

/**
 * 商品收藏服务层
 */
class CoreGoodsCollectNumService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 增加
     * @param $data
     * @return void
     */
    public function inc($data)
    {
        $this->model->where([['goods_id', '=', $data['goods_id']]])->inc('collect_num', $data['collect_num']) ->update();
        return true;
    }

    /**
     * 减少
     * @param $data
     * @return void
     */
    public function dec($data)
    {
        $this->model->where([['goods_id', '=', $data['goods_id']]])->dec('collect_num', $data['collect_num']) ->update();
        return true;
    }

}
