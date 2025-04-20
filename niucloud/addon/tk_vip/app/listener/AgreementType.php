<?php
declare (strict_types = 1);

namespace addon\tk_vip\app\listener;


/**
 * 协议类型
 */
class AgreementType
{

    public function handle($data){
        return [
            'tk_vip_service' => '付费会员协议',//服务协议,
        ];
    }
}
