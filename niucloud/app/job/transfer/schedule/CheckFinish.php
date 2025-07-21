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

namespace app\job\transfer\schedule;

use app\dict\pay\TransferDict;
use app\model\pay\Transfer;
use app\service\core\pay\CoreTransferService;
use core\base\BaseJob;

/**
 * 定时校验转账是否完毕(每分钟一次)
 */
class CheckFinish extends BaseJob
{
    public function doJob()
    {
        $condition = [
            'transfer_status' => TransferDict::DEALING,
            'transfer_type' => TransferDict::WECHAT
        ];
        $list = (new Transfer())->where($condition)->select();
        $core_transfer_service = new CoreTransferService();
        foreach($list as $item){
            $core_transfer_service->check($item['site_id'], $item->toArray());
        }
        return true;
    }
}
