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

namespace addon\shop\app\api\controller\goods;

use addon\shop\app\service\api\goods\EvaluateService;
use core\base\BaseApiController;


/**
 * 商品评价控制器
 * Class Evaluate
 * @package addon\shop\app\adminapi\controller\goods
 */
class Evaluate extends BaseApiController
{
    /**
     * 获取商品评价列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
            [ 'scores', [] ],
        ]);
        return success(( new EvaluateService() )->getPage($data));
    }

    /**
     * 商品评价详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new EvaluateService() )->getInfo($id));
    }

    /**
     * 添加商品评价
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "evaluate_array", [] ],
        ]);
        ( new EvaluateService() )->add($data);
        return success('SHOP_GOODS_EVALUATE_SUCCESS');
    }

    /**
     * 评价统计
     * @return \think\Response
     * @throws \think\db\exception\DbException
     */
    public function count()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
        ]);
        return success(( new EvaluateService() )->getCount($data[ 'goods_id' ]));
    }

    /**
     * 商品详情展示
     * @return \think\Response
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
        ]);
        return success(( new EvaluateService() )->getList($data[ 'goods_id' ]));
    }

    /**
     * 评价信息
     * @param $id
     */
    public function getEvaluate($id)
    {
        return success(( new EvaluateService() )->getDetail($id));
    }
}
