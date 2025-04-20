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

namespace addon\shop\app\listener\diy;

use addon\shop\app\model\goods\Goods;
use addon\shop\app\service\admin\order\ConfigService;
use core\exception\CommonException;

/**
 * 万能表单删除监听事件
 * Class BeforeFormDeleteListener
 * @package addon\shop\app\listener\order
 */
class BeforeFormDeleteListener
{

    public function handle($params)
    {
        $allow_operate = true;
        $form_id = $params[ 'form_id' ];
        $site_id = $params[ 'site_id' ];
        $config = ( new ConfigService() )->getConfig();
        if (!empty($config) && $config[ 'form_id' ] == $form_id) {
            $allow_operate = false;
        }
        $goods = ( new Goods() )->where([['form_id', '=', $form_id], ['site_id', '=', $site_id]])->findOrEmpty()->toArray();
        if (!empty($goods)) {
            $allow_operate = false;
        }
        return [
            'allow_operate' => $allow_operate
        ];
    }
}
