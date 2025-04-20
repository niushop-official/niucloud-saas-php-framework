<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener;


/**
 * 协议类型
 */
class AgreementType
{

    public function handle($data){
        return [
            'fenxiao_service' => '分销协议',//服务协议,
            'fenxiao_poster' => '分销推广规则',//分销推广规则,
        ];
    }
}
