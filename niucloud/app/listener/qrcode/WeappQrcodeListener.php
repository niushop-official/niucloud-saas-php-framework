<?php

namespace app\listener\qrcode;

use app\listener\notice_template\BaseNoticeTemplate;
use app\service\core\weapp\CoreWeappService;

/**
 * 生成小程序二维码
 */
class WeappQrcodeListener extends BaseNoticeTemplate
{

    public function handle(array $params)
    {
        if ('weapp' == $params[ 'channel' ]) {
            return ( new CoreWeappService() )->qrcode($params[ 'site_id' ], $params[ 'page' ], $params[ 'data' ], $params[ 'filepath' ]);
        }
    }

}