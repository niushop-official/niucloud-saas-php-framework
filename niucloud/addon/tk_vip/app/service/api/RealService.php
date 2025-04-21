<?php
// +----------------------------------------------------------------------
// | Author: TK
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\service\api;

use addon\tk_vip\app\dict\config\ConfigDict;
use addon\tk_vip\app\dict\real\RealDict;
use addon\tk_vip\app\model\real\Real;
use app\model\member\Member;
use app\service\core\sys\CoreConfigService;
use core\base\BaseApiService;
use think\Exception;


/**
 * 实名认证服务层
 */
class RealService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Real();
    }

    public function getRealInfo()
    {
        $info = $this->model->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->findOrEmpty();
        if ($info->isEmpty()) return ['real_name' => '', 'card_num' => '', 'mobile' => '', 'status' => 10, 'status_name' => '未认证'];
        $info['status_name'] = RealDict::getRealStatus($info['status'])['name'];
        return $info->toArray();
    }

    public function checkReal()
    {
        $config = $this->getRealConfig();
        if ($config['open_real'] == 0) return ['type' => 'success', 'msg' => '', 'page' => '/'];
        $info = $this->model->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->findOrEmpty();
        if ($info->isEmpty()) return ['type' => 'redirect', 'msg' => '', 'page' => '/addon/tk_vip/pages/real'];
        if ($info['status'] == RealDict::WAIT_AUDIT) return ['type' => 'msg', 'msg' => '请等待管理员审核实名', 'page' => ''];
        if ($info['status'] == RealDict::AUDIT_SUCCESS) return ['type' => 'success', 'msg' => '', 'page' => ''];
        if ($info['status'] == RealDict::AUDIT_FATL) return ['type' => 'redirect', 'msg' => '', 'page' => '/addon/tk_vip/pages/real'];
    }

    public function submitReal($data)
    {
        try {
            $data['site_id'] = $this->site_id;
            $data['member_id'] = $this->member_id;
            $config = $this->getRealConfig();
            if ($config['open_real'] == 0) throw new Exception('未开启实名认证');
            $info = $this->model->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->findOrEmpty();
            if (!$info->isEmpty()) {
                $is_hasone = 1;
                if ($info['status'] == RealDict::AUDIT_SUCCESS) throw new Exception('已实名认证成功');
                if ($info['status'] == RealDict::WAIT_AUDIT) throw new Exception('请等待管理员审核');
            } else {
                $is_hasone = 0;
                //新添加审核  进行数量限制
                $max_num = $config['max_real_num'];
                if ($max_num > 0) {
                    $history_num = $this->model->where(['site_id' => $this->site_id, 'card_num' => $data['card_num']])->count();
                    if ($history_num >= $max_num) throw new Exception('当前身份证认证账号已到上限');
                }
            }
            if ($config['is_auto'] == 0) {
                $status = RealDict::WAIT_AUDIT;
            } else {
                $res = (new \addon\tk_vip\app\service\core\RealService())->checkReal($data['real_name'], $data['card_num']);
                $status = RealDict::AUDIT_SUCCESS;
                $new_data = [
                    'birthday' => $res['birthday'],
                    'sex' => $res['sex'] == '男' ? '1' : '2',
                ];
                $data['birthday'] = $new_data['birthday'];
                $data['sex'] = $new_data['sex'];
                (new Member())->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->update($new_data);
            }
            $data['status'] = $status;
            if ($is_hasone == 0) {
                $this->model->create($data);
            } else {
                $this->model->where(['site_id' => $this->site_id, 'member_id' => $this->member_id])->update($data);
            }
            return [];
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function getRealConfig($type = '')
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getRealType());
        if (empty($info)) {
            if ($type == '') {
                throw new Exception('实名认证配置未完成');
            }
            $info['value']['open_real'] = '0';
            $info['value']['app_code'] = '';
            $info['value']['open_mobile_code'] = '';
            $info['value']['max_real_num'] = '0';
            $info['value']['is_auto'] = '0';
            $info['value']['field'] = '0';
        }
        $res = $info['value'];
        unset($res['app_code']);
        return $res;
    }
}
