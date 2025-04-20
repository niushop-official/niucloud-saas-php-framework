<?php

namespace addon\ly_shareholder\app\adminapi\controller;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\service\admin\ConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 股东配置
     * @return response
     */
    public function setShareholderConfig(){
        $data = $this->request->params([
            ['is_open', '1'],//是否开启股东分红
            ['is_max', '0'],//封顶
            ['is_commission', '0'],//是否开启股东分红条件
            ['min_order', ''],//
            ['min_order_amount', '0.00'],//消费金额
            // ['fenhong_ratio', '0.00'],//分红比例
            ['settle_type', ShareholderDict::TURNOVER],//结算方式
            ['take_type', ShareholderDict::BALANCE],//提现方式
            ['settle_time', ShareholderDict::DAY],//结算时间
            ['settle_condision', ShareholderDict::ORDERFINISH],//结算条件
            ['create_time', '0'],//创建时间
            ['update_time', '0'],//更新时间
        ]);

        (new ConfigService())->setShareholderConfig($data);
        return success('保存成功');
    }

    //获取结算方式
    public function getSettleType(){
        return success(ShareholderDict::getSettleType());
    }

    //获取结算时间
    public function getSettleTime(){
        return success(ShareholderDict::getSettleTime());
    }

    //获取提现方式
    public function getTakeType(){
        return success(ShareholderDict::getTakeType());
    }

    //获取股东设置
    public function getShareholderConfig(){
        return success((new ConfigService())->getShareholderConfig());
    }

    public function getMemberLevelAll(){
        return success(( new ConfigService())->getMemberLevelAll());
   }

}