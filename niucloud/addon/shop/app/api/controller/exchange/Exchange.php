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

namespace addon\shop\app\api\controller\exchange;


use addon\shop\app\service\api\marketing\pointexchange\ExchangeService;
use core\base\BaseApiController;
use think\Response;


/**
 * 积分商城控制器
 * Class GoodsSpec
 * @package addon\shop\app\adminapi\controller\marketing
 */
class Exchange extends BaseApiController
{

    public function lists()
    {
        $data = $this->request->params([
            ["names", ""],
            ["status", 1],
            ["create_time", ""],
            ['order', ''], // 排序方式（综合：空，销量：sale_num，价格：price）
            ['sort', 'desc'], // 升序：asc，降序：desc
            ['status', 1], // 升序：asc，降序：desc
        ]);
        return success((new ExchangeService())->getPage($data));
    }

    /**
     * 商品详情
     * @param int $id
     * @return Response
     */
    public function detail(int $id)
    {
        return success((new ExchangeService())->getDetail($id));
    }

    /**
     * 获取商品列表供组件调用
     * @return \think\Response
     */
    public function components()
    {
        $data = $this->request->params([
            ['num', 0],
            ["names", ""],
            ['ids', ''],
            ['order', ''], // 排序方式（综合：空，销量：sale_num，价格：price）
            ['sort', 'desc'], // 升序：asc，降序：desc
            ['status', 1], // 升序：asc，降序：desc
        ]);
        return success((new ExchangeService())->getGoodsComponents($data));
    }

    /**
     * 获取积分页面供组件调用
     * @return \think\Response
     */
    public function getPointInfo()
    {
        return success((new ExchangeService())->getPointInfo());
    }

}