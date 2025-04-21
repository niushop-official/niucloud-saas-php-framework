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

namespace app\service\core\wechat;

use core\base\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use EasyWeChat\Kernel\Support\Collection;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

/**
 * easywechat主体提供
 * Class CoreWechatTemplateService
 * @package app\service\core\wechat
 */
class CoreWechatTemplateService extends BaseCoreService
{


    /**
     * 发送模板消息
     * @param int $site_id
     * @param string $open_id
     * @param string $wechat_template_id
     * @param array $data
     * @param string $first
     * @param string $remark
     * @param string $url
     * @param string $miniprogram
     * @return array|Collection|object|ResponseInterface|string
     * @throws InvalidArgumentException
     * @throws InvalidConfigException
     * @throws GuzzleException
     */
    public function send(int $site_id, string $open_id, string $wechat_template_id, array $data, string $first, string $remark, string $url = '', $miniprogram = '')
    {
        if (!empty($first)) $data[ 'first' ] = $first;
        if (!empty($remark)) $data[ 'remark' ] = $remark;
        $api = CoreWechatService::appApiClient($site_id);
        $param = [
            'touser' => $open_id,
            'template_id' => $wechat_template_id,
            'url' => $url,
            'miniprogram' => $miniprogram,
            'data' => $data,
        ];
        if(!empty($client_msg_id)){
            $param['client_msg_id'] = $client_msg_id;
        }
        return $api->postJson('cgi-bin/message/template/send', $param);
    }

    /**
     * 删除
     * @param int $site_id
     * @param string $templateId
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function deletePrivateTemplate(int $site_id, string $templateId)
    {
        $api = CoreWechatService::appApiClient($site_id);

        return $api->postJson('cgi-bin/template/del_private_template', [
            'template_id' => $templateId,
        ]);
    }

    /**
     * 添加
     * @param int $site_id
     * @param string $shortId
     * @param string $keyword_name_list
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function addTemplate(int $site_id, string $shortId, string $keyword_name_list)
    {
        $api = CoreWechatService::appApiClient($site_id);

        return $api->postJson('cgi-bin/template/api_add_template', [
            'template_id_short' => $shortId,
            'keyword_name_list' => $keyword_name_list
        ]);
    }

}