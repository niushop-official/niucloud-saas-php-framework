<?php

namespace app\service\core\wechat;

class WechatOAuthFactory extends \Overtrue\Socialite\Providers\WeChat {

    private $oauth_url = 'https://open.weixin.qq.com';

    public function __construct(array $config)
    {
        parent::__construct($config);
        if (isset($config['base_uri']) && !empty($config['base_uri'])) $this->oauth_url = $config['base_uri'];
    }

    protected function getAuthUrl(): string
    {
        $path = 'oauth2/authorize';
        if (\in_array('snsapi_login', $this->scopes)) {
            $path = 'qrconnect';
        }
        return $this->buildAuthUrlFromBase("{$this->oauth_url}/connect/{$path}");
    }

}

?>
