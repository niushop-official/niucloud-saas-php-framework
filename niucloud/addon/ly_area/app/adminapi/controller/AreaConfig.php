<?php

namespace addon\ly_area\app\adminapi\controller;

use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\service\admin\AreaConfigService;
use core\base\BaseAdminController;


/**
 * 区域分红设置控制器
 * Class Config
 * @package addon\ly_area\app\adminapi\controller\area
 */
class AreaConfig extends BaseAdminController
{
   /**
    * 区域分红设置
    * @return \think\Response
    */
    public function setAreaConfig(){
        $data = $this->request->params([
            ["is_open",0],
            ["is_street",'0'],
             ["is_become",0],
             ["can_apply_again",0],
             ["become_many",0],
             ["count_type", AreaDict::ORDERMONEY],
             ["take_type", AreaDict::BALANCE],
             ["is_avg",0],
             ["is_level",0],
             ["province_rate",0.00],
             ["city_rate",0.00],
             ["district_rate",0.00],
             ["street_rate",0.00],
             ["settl_cycle",0],
             ["settle_type",0],
             ["is_agreement",0],
             ["agreement_content",""],
             ["background_image",""],
             ["apply_backimg",""],
        ]);

        (new AreaConfigService())->setAreaConfig($data);
        return success('保存成功');
    }


    public function getAreaConfig(){
        return success((new AreaConfigService())->getAreaConfig());
    }

    
    public function getCountType(){
        return success(AreaDict::getCountType());
    }


    public function getTakeType(){
        return success(AreaDict::getTakeType());
    }

    
}