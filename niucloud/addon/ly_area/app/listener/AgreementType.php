<?php
declare (strict_types = 1);

namespace addon\ly_area\app\listener;


/**
 * 协议类型
 */
class AgreementType
{

    public function handle($data){
        return [
            'area_service' => '区域代理申请协议',//服务协议,
        ];
    }
}
