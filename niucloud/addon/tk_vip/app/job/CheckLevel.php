<?php
// +----------------------------------------------------------------------
// | Author: addon888
// +----------------------------------------------------------------------
namespace addon\tk_vip\app\job;

use addon\tk_vip\app\model\vip\Vip;
use app\service\core\member\CoreMemberService;
use core\base\BaseJob;
use think\Exception;
use think\facade\Log;

/**
 * 检测会员等级是否过期
 */
class CheckLevel extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            Log::write("=== TK VIP 每分钟同步会员等级到期执行 ===" . date("Y-m-d H:i:s"));
            $vipModel = new Vip();
            $pageSize = 50;
            $currentPage = 1;
            while (true) {
                $list = $vipModel->where([
                    ['over_time', '>=', time() - 60 * 3],
                    ['over_time', '<=', time()]
                ])->paginate([
                    'list_rows' => $pageSize,
                    'page' => $currentPage,
                ])->toArray();
                foreach ($list['data'] as $v) {
                    $site_id = $v['site_id'];
                    $member_id = $v['member_id'];
                    if ($v['over_time'] > 0) {
                        // 初始会员等级
                        (new CoreMemberService())->modify($site_id, $member_id, 'member_level', 0);
                    }
                }
                if ($currentPage * $pageSize >= $list['total']) {
                    break;
                }
                $currentPage++;
            }
            return true;
        } catch (Exception $e) {
            Log::write($e->getMessage());
            return true;
        }
    }

}
