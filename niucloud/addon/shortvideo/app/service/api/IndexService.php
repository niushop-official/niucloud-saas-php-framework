<?php

namespace addon\shortvideo\app\service\api;


use addon\shortvideo\app\model\label\Label;

use core\base\BaseApiService;
use think\facade\Db;


class IndexService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }


    public function getLabel()
    {

        return (new Label())->where([["site_id", "=", $this->site_id]])->where('status', 1)->order('sort desc,id desc')->select()->toArray();
    }


}
