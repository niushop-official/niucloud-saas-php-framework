<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\api\weapp;

use app\service\core\weapp\CoreWeappServeService;
use core\base\BaseApiService;
use EasyWeChat\Kernel\Exceptions\BadRequestException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use ReflectionException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WeappServeService extends BaseApiService
{
    /**
     * 消息与时间推送
     * @return Response
     * @throws BadRequestException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws Throwable
     */
    public function serve(){
        return (new CoreWeappServeService())->serve($this->site_id);
    }

}
