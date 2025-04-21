<?php

namespace core\printer\sdk\yilianyun\api;


use core\printer\sdk\yilianyun\config\YlyConfig;
use core\printer\sdk\yilianyun\protocol\YlyRpcClient;

class RpcService
{

    protected $client;

    public function __construct($token, YlyConfig $config)
    {
        $this->client = new YlyRpcClient($token, $config);
    }

}