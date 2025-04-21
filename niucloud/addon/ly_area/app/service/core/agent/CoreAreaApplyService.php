<?php

namespace addon\ly_area\app\service\core\agent;

use addon\ly_area\app\dict\area\AreaApplyDict;
use addon\ly_area\app\model\AreaAgent;
use addon\ly_area\app\model\AreaApply;
use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\service\admin\AreaAgentService;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use core\base\BaseCoreService;
use core\exception\CommonException;


/**
 * 区域代理申请
 */
class CoreAreaApplyService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new AreaApply();
    }

    public function apply($data)
    {
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];

        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);
        if ($config['is_open'] == 0) throw new CommonException('LY_AREA_NOT_OPEN');
        // if ($config['is_become'] == 0) throw new CommonException('LY_AREA_NOT_OPEN_APPLY');

        if (empty($apply_info)) {
            $res = $this->model->create($data);
            $apply_id = $res['apply_id'];
        } else {
            $res = $this->model->create($data);
            $apply_id = $res['apply_id'];
        }

        //判断代理申请是否需要审核
        if ($config['is_become'] == 1) {
            $this->agree($site_id, $apply_id);
        }

        return $res;
    }

    /**
     * 审核
     * @param $site_id
     * @param $apply_id
     * @return true
     */
    public function agree($site_id, $apply_id)
    {
        $this->audit($site_id, $apply_id, ['status' => AreaApplyDict::AUDIT]);
        return true;
    }

    /**
     * 审核
     * @param $site_id
     * @param $apply_id
     * @param $data
     * @return true
     */
    public function audit($site_id, $apply_id, $data)
    {
        $area_apply = $this->model->where([['apply_id', '=', $apply_id], ['site_id', '=', $site_id]])->findOrEmpty();
        if (!$area_apply->isEmpty()) {
            $level = (new AreaLevel())->where('site_id', $site_id)->where('level_area', $area_apply['level_area'])->findOrEmpty();
        }else{
            throw new CommonException('LY_AREA_NOT_FOUND_AREA_APPLY');
        }

        // if ($area_apply->isEmpty()) throw new CommonException('LY_AREA_NOT_FOUND_AREA_APPLY');
        if ($area_apply['status'] != AreaApplyDict::WAIT_AUDIT) throw new CommonException('LY_AREA_APPLY_ALREADY_AUDIT');

        // $agent = (new AreaAgent())->where([['member_id', '=', $area_apply['member_id']], ['site_id', '=', $site_id]])->findOrEmpty();
        // if (!$agent->isEmpty()) throw new CommonException('LY_AREA_ALREADY_AGENT');

        $update_data = [
            'status' => $data['status'],
            'reason' => $data['reason'] ?? ''
        ];
        $this->model->where([['apply_id', '=', $apply_id], ['site_id', '=', $site_id]])->update($update_data);

        $agent_data = [
            'member_id' => $area_apply['member_id'],
            'level_id' => $level['level_id'],
            'create_time' => time(),
            'status' => $data['status'],
            'province_id' => $area_apply['province_id'],
            'city_id' => $area_apply['city_id'],
            'district_id' => $area_apply['district_id'],
            'full_area' => $area_apply['apply_area'],
            'agent_level' => $area_apply['level_area'],
        ];
        if ($data['status'] == AreaApplyDict::AUDIT) {
            //添加代理
            // (new CoreAreaAgentService())->add($site_id, $area_apply['member_id'], $level['level_id']);
            (new AreaAgentService())->add($agent_data);
        }

        return true;
    }

    /**
     * 拒绝
     * @param $site_id
     * @param $apply_id
     * @param $data
     * @return true
     */
    public function refuse($site_id, $apply_id, $data)
    {
        $data['status'] = AreaApplyDict::REFUSE;
        $this->audit($site_id, $apply_id, $data);
        return true;
    }

}
