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

namespace app\api\controller\poster;

use core\base\BaseApiController;

/**
 * 海报
 */
class Poster extends BaseApiController
{

    /**
     * 获取海报
     * @return \think\Response
     */
    public function poster()
    {
        $data = $this->request->params([
            [ 'id', 0 ], // 海报id
            [ 'type', '' ], // 海报类型
            [ 'param', [] ], // 数据参数
        ]);
        $data[ 'channel' ] = $this->request->getChannel();
        return success(data: poster($this->request->siteId(), ...$data));
    }

}
