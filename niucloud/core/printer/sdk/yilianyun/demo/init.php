<?php

include dirname(__DIR__) . '/core/printer/sdk/yilianyun/Autoloader.php';

use core\printer\sdk\yilianyun\config\YlyConfig;

$grantType = 'client_credentials';      //'client_credentials' 自有型应用; 'authorization_code' 开放型应用
define('GRANTTYPE', $grantType);

$clientId = '';//应用id
$clientSecret = '';//应用密钥

$config = new YlyConfig($clientId, $clientSecret);
//设置接口v2.0
$config->setRequestUrl('https://open-api.10ss.net/v2');
