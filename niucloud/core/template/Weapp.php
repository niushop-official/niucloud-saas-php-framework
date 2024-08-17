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

namespace core\template;

use app\service\core\weapp\CoreWeappService;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use EasyWeChat\Kernel\Support\Collection;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;


class Weapp extends BaseTemplate
{

    protected $site_id;

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->site_id = $config['site_id'] ?? '';
    }

    /**
     * 消息发送
     * @param array $data
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidArgumentException
     * @throws InvalidConfigException
     */
    public function send(array $data)
    {
        $api = CoreWeappService::appApiClient($this->site_id);
        $api->postJson('cgi-bin/message/subscribe/send', [
            'template_id' => $data['template_id'], // 所需下发的订阅模板id
            'touser' => $data['openid'],     // 接收者（用户）的 openid
            'page' => $data['page'],       // 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
            'data' => $data['data'],
        ]);
    }

    /**
     * 添加模板消息
     * @param array $data
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function addTemplate(array $data)
    {
        $api = CoreWeappService::appApiClient($this->site_id);
        return $api->postJson('wxaapi/newtmpl/addtemplate', [
            'tid' => $data['tid'],
            'kidList' => $data['kid_list'],
            'sceneDesc' => $data['scene_desc'],
        ]);
    }

    /**
     * 删除
     * @param array $data
     * @return array|Collection|object|ResponseInterface|string
     * @throws GuzzleException
     * @throws InvalidConfigException
     */
    public function delete(array $data)
    {
        $api = CoreWeappService::appApiClient($this->site_id);
        return $api->postJson('wxaapi/newtmpl/deltemplate', [
            'priTmplId' => $data['template_id'],
        ]);
    }

    /**
     * 获取
     * @return void
     */
    public function get()
    {

    }
}
