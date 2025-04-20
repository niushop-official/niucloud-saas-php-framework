<?php

namespace addon\ly_area\app\service\core\agent;

use addon\ly_area\app\dict\area\AreaApplyDict;
use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\model\AreaAgent;
use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use app\model\member\Member;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;

class CoreAreaAgentService extends BaseCoreService
{
    public function __construct(){
        parent::__construct();
        $this->model = new AreaAgent();
    }


    //添加代理
    public function add($site_id, $member_id, $level_id)
    {
        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);
        $level = (new AreaLevel())::where(['site_id' => $site_id, 'level_id' => $level_id])->findOrEmpty();

        if ($level->isEmpty()) throw new CommonException('LY_AREA_PLEASE_SELECT_AREA_LEVEL');

        //判断代理是否是否是有效的会员
        $member = (new Member())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        if($member->isEmpty()) throw new CommonException('LY_AREA_PLEASE_SELECT_MEMBER');

        $agent = (new AreaAgent())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        
        if($config['become_many'] != 1 && !$agent->isEmpty()) throw new CommonException('LY_AREA_ALREADY_AGENT');
 

        //增加代理
        $insert_data = [
            'site_id' => $site_id,
            'member_id' => $member_id,
            'agent_level' => $level['level_area'],
            'level_id' => $level_id,
            'status' => AreaDict::NORMAL,
        ];
        $this->model->create($insert_data);
    }


    /**
     * 累增代理相关分红数据
     * @param int $site_id
     * @param int $member_id
     * @param int|float $number
     * @param string $type
     * @return true
     */
    public function incFenhong(int $site_id, int $member_id, int|float $number, string $type)
    {
        $data = [];
        switch ($type) {
            case 'area_fenhong':
                $data['area_count_money'] = Db::raw('area_count_money + ' . $number);
                // $data['amount_get'] = Db::raw('amount_get + ?', [$number]);
                break;  
            case 'area_withdraw':
                $data['amount_withdraw'] = Db::raw('amount_withdraw + ' . $number);
                break;
        }
        if (!empty($data)) {
            (new AreaAgent())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->update($data);
        }
        return true;
    }

    /**
     * 累减代理相关分红数据
     * @param int $site_id
     * @param int $member_id
     * @param int|float $number
     * @param string $type
     * @return true
     */
    public function minFenhong(int $site_id, int $member_id, int|float $number, string $type){
        
        $data = [];
        switch ($type) {
            case 'area_tixian':
                $data['amount_cash_outing'] = Db::raw('amount_cash_outing - ? $number ' );
                break;
        }
        
        if (!empty($data)) {
            (new AreaAgent())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->update($data);
        }
        
        return true;
    }


    public function getAreaAgentByAddressId($site_id, $address_id, $level){
        return $this->model->where('site_id', $site_id)
            ->where('agent_level', $level)
            ->where(function ($query) use ($address_id) {
                return $query->where('province_id', $address_id)
                    ->whereOr('city_id', $address_id)
                    ->whereOr('district_id', $address_id);
        });      
    }


    public function getAgentNumByLevel($site_id, $level){
        return $this->model->where('site_id', $site_id)
            ->where('agent_level', $level)
            ->count();
    }


    public function getAgentByMemberId($site_id, $member_id){
        return $this->model->where('site_id', $site_id)
            ->where('member_id', $member_id)
            ->findOrEmpty();
    }


    public function getAgentByArea($site_id, $province_id, $city_id, $district_id){
        return $this->model->where('site_id', $site_id)
            ->where('province_id', $province_id)
            ->where('city_id', $city_id)
            ->where('district_id', $district_id)
            ->where('status', AreaApplyDict::AUDIT)
            ->findOrEmpty();
    }
    
}