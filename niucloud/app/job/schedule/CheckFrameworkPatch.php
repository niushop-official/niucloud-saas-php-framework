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

namespace app\job\schedule;

use app\service\core\niucloud\CoreFrameworkPatchService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 定时检测框架补丁
 *
 * 每小时执行一次：由 CoreFrameworkPatchService 统一处理
 * 1. 落库到 sys_framework_patch（按云端补丁 ID 唯一，重复拉取只更新）；
 * 2. 新补丁推送一条平台端站内信（已推送过的不再重复）。
 *
 * 去重由「表唯一键 + 消息 message_key」保证，不再依赖本地缓存，
 * 避免缓存失效后重复推送同一补丁。
 */
class CheckFrameworkPatch extends BaseJob
{
    public function doJob()
    {
        try {
            $result = ( new CoreFrameworkPatchService() )->sync();
        } catch (\Throwable $e) {
            Log::write('CheckFrameworkPatch 同步补丁失败：' . $e->getMessage());
            return false;
        }

        $new = (int) ( $result[ 'new' ] ?? 0 );
        if ($new > 0) Log::write('CheckFrameworkPatch 新增补丁 ' . $new . ' 条（本次拉取 ' . (int) ( $result[ 'total' ] ?? 0 ) . ' 条）');

        return true;
    }
}
