<?php

namespace addon\ly_lian\app\service\api;

use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\service\core\member\CoreLianDataService;
use addon\ly_lian\app\service\core\member\CoreLianLevelService;
use core\base\BaseApiService;

/**
 *  链动会员
 */
class LianMemberService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new LianMember();
    }

    /**
     * 查询链动会员信息
     * @return array
     */
    public function getInfo()
    {
        $field = '*';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with(
                [
                    'lianMember' => function ($query) {
                        $query->field('member_id,nickname,headimg');
                    },

                    'lianLevel' => function ($query) {
                        $query->withField('*');
                    },
                    'parentMember' => function($query){
                        $query->withField('member_id, nickname, headimg, mobile');
                    },
                    'lianParentMember' => function($query){
                        $query->withField('member_id, nickname, headimg, mobile');
                    },
                    
                ]
            )->field($field)->append(['status_name'])->findOrEmpty()->toArray();

        return $info;
    }

    /**
     * 链动会员详细信息
     * @return array
     */
    public function getDetail()
    {
        $field = '*';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with(
                [
                    'lianMember' => function ($query) {
                        $query->field('member_id,nickname,headimg');
                    },

                    'lianLevel' => function ($query) {
                        $query->withField('level_id, level_name');
                    },
                    'parentMember' => function($query){
                        $query->withField('member_id, nickname, headimg, mobile');
                    },
                    'lianParentMember' => function($query){
                        $query->withField('member_id, nickname, headimg, mobile');
                    },
                ]
            )->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        // if ($info) {
        //     $info['add_up_data'] = (new CoreShareholderService())->getMemberData($this->site_id, $this->member_id);
        // }
        return $info;
    }

    /**
     * 获取链动会员账户信息
     */
    public function getAccount()
    {
        $field = 'id,site_id,member_id,level_id,commission, give_commission, frozen_commission';

        $info = $this->model->where([['member_id', '=', $this->member_id]])->with([
            'lianMember' => function ($query) {
                $query->withField('member_id,nickname,headimg');
            },
        ])->field($field)->findOrEmpty()->toArray();
        return $info;
    }

    
    //获取链动会员的奖励记录
    public function getReward(array $where = []){
        $field = '*';
        $order = 'id desc';

        $info = (new LianReward())->where([['member_id', '=', $this->member_id]])->withSearch(['create_time'], $where)->with([
            'member' => function ($query) {
                $query->withField('member_id,nickname,headimg');
            },
            'buyMember' => function ($query) {
                $query->withField('member_id,nickname,headimg');
            },
            'lianLevel' => function ($query){
                $query->withField('level_id, level_num, level_name');
            },
            'lianOrder' => function ($query){
                $query->withField('order_id, order_no');
            },
            'lianOrderGoods' => function ($query){
                $query->withField('goods_id, goods_name, goods_cover');
            },
        ])->field($field)->order($order);

        return $this->pageQuery($info);

        // $count = count($info);
        // return ['list' => $info, 'count' => $count];
    }


    //获取直推下级
    public function getRecommendChild()
    {
        $member = (new LianMember())->where([['member_id', '=', $this->member_id]])->findOrEmpty();
        $list = (new CoreLianDataService())->getChildList($this->site_id, $member);

        $res = [];
        $count = 0;
        $sub_count = 0;
        foreach($list as $child){
            $childInfo = $this->model->where('member_id', $child['member_id'])->with([
                'lianMember' => function ($query) {
                        $query->withField('member_id,nickname,headimg');
                },
                'lianLevel' => function ($query) {
                        $query->withField('level_id, level_name, level_num');
                },
            ])->findOrEmpty()->toArray();

            $res[] = $childInfo;
            $count ++;

            $sub_child = (new CoreLianDataService())->getChildList($this->site_id, $child);
            $sub_count += count($sub_child);
        }

        return ['list' => $res, 'count' => $count, 'sub_count' => $sub_count];
    }


    //获取直推下级boss列表
    public function getRecommendBossChild()
    {
        $member = (new LianMember())->where([['member_id', '=', $this->member_id]])->findOrEmpty();
        $list = (new CoreLianDataService())->getChildBossList($this->site_id, $member);

        $res = [];
        $count = 0;
        foreach($list as $child){
            $childInfo = $this->model->where('member_id', $child['member_id'])->with([
                'lianMember' => function ($query) {
                        $query->field('member_id,nickname,headimg');
                },
                'lianLevel' => function ($query) {
                        $query->withField('level_id, level_name, level_num');
                },
            ])->findOrEmpty()->toArray();

            $res[] = $childInfo;
            $count ++;
        }
        return ['list' => $res, 'count' => $count];
    }



    //获取团队下级列表
    public function getTeam(){
        $member = (new LianMember())->where([['member_id', '=', $this->member_id]])->findOrEmpty();

        $list = (new CoreLianDataService())->getTeam($this->site_id, $member);

        $team_list = [];
        $count = 0;
        foreach ($list as $item) {
            $itemInfo = $this->model->where('member_id', $item['member_id'])->with([
                'lianMember' => function ($query) {
                    $query->withField('member_id,nickname,headimg');
                },
                'lianLevel' => function ($query) {
                    $query->withField('level_id, level_name, level_num');
                },
            ])->findOrEmpty()->toArray();

            $team_list[] = $itemInfo;
            $count ++;
        }

        return ['list' => $team_list, 'count' => $count];
    }


    //获取前2直推
    public function getFirstRecommend(){
        $member = (new LianMember())->where([['member_id', '=', $this->member_id]])->findOrEmpty();
        // $level = (new CoreLianLevelService())->getLevelByMember($this->site_id, $member);
        
        $boss = 0;
        $list = [];
        $list['child_mid1'] = $member['child_mid1'];
        $list['child_mid2'] = $member['child_mid2'];

        foreach ($list as $key => $item) {
            if ($item) {
                $memberInfo = $this->model->where('member_id', $item)->with([
                    'lianMember' => function ($query) {
                        $query->withField('member_id,nickname,headimg');
                    },
                    'lianLevel' => function ($query) {
                        $query->withField('level_id, level_name, level_num');
                    },
                ])->findOrEmpty()->toArray();
                $list[$key] = $memberInfo;
                if($memberInfo['lianLevel']['level_num'] == 2){
                    $boss ++;
                }
            }
        }

        return ['list' => $list, 'count' => $boss];
    }


    //获取绩效任务期限
    public function getTaskLimitDays(){
        $member = (new LianMember())->where([['member_id', '=', $this->member_id]])->findOrEmpty();
        $level = (new CoreLianLevelService())->getLevelByMember($this->site_id, $member);

        $now = time();
        $task_days = $level['task_limit_days'];
        
        if(!$member->isEmpty()){
            $up_time = $member['up_time'];
        }else{
             $up_time = '';
        }

 
        $limit_days = round((strtotime($up_time) + $task_days * 86400 - $now) / 86400, 1);

        if($limit_days < 0){
            $limit_days = 0;
        }

        if($level['level_num'] < 2){
            $is_show = 0;
        }else{
            $is_show = 1;
        }

        // if($level['task_boss_first'])

        return ['limit_days' => $limit_days, 'is_show' => $is_show, 'level' => $level];
    }
}
