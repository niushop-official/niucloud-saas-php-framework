<?php

namespace addon\ly_lian\app\service\api;

use addon\ly_lian\app\model\LianReward;
use core\base\BaseApiService;

class LianRewardService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new LianReward();
    }
}