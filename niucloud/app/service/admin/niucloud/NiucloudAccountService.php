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

namespace app\service\admin\niucloud;

use app\dict\sys\ConfigKeyDict;
use app\service\core\niucloud\CoreAuthService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use core\util\niucloud\BaseNiucloudClient;

/**
 * 官网账号（内嵌授权）服务层
 *
 * 说明：
 * 1. 官网账号登录与授权选择全部在官网 embed 页完成（iframe），本服务只负责
 *    生成 embed 地址、保存账号/授权元信息、以及把回传的授权凭据落到本地授权配置。
 * 2. 授权落库复用 NiucloudService::setAuthorize()，保证与现有授权业务（升级、应用下载、云编译）
 *    完全一致：authinfo 校验 -> 清理 access_token 与 authinfo 缓存 -> 写 NIUCLOUD_CONFIG。
 */
class NiucloudAccountService extends BaseAdminService
{
    /**
     * 官网前端域名（embed 页所在站点）
     */
    protected const OFFICIAL_WEB_HOST = 'https://www.niucloud.com';

    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 官网前端域名
     */
    public function getOfficialWebHost(): string
    {
        return rtrim(self::OFFICIAL_WEB_HOST, '/');
    }

    /**
     * 本站域名（授权绑定用，不含协议与端口）
     */
    public function getSiteDomain(): string
    {
        return request()->host(true);
    }

    /**
     * 生成本站的页面 origin（postMessage 校验用）
     */
    public function getSiteOrigin(): string
    {
        return rtrim(request()->domain(), '/');
    }

    /**
     * 生成官网 embed 页地址
     *
     * @param string $mode login | authorize | switch
     * @param string $origin 父页面 origin（由前端传 window.location.origin，最准确）
     */
    public function getEmbedUrl(string $mode = 'login', string $origin = ''): array
    {
        $mode_path = [
            'login' => 'login',
            'authorize' => 'authorize',
            'switch' => 'authorize',
            'account' => 'account'
        ];
        $path = $mode_path[$mode] ?? 'login';
        $host = $origin ?: $this->getSiteOrigin();

        $params = [
            'host' => $host,
            'domain' => $this->getSiteDomain(),
            'mode' => $mode,
            'theme' => 'light',
            // 当前产品线标识：内嵌页只展示符合本产品线的授权
            'product_key' => BaseNiucloudClient::PRODUCT
        ];
        // 已保存且未过期的官网登录态：直接注入内嵌页，实现重进免登录
        $access_token = $this->getValidAccessToken();
        if (!empty($access_token)) $params['token'] = $access_token;

        $query = http_build_query($params);

        return [
            'url' => $this->getOfficialWebHost() . '/embed/' . $path . '?' . $query,
            'host' => $host,
            'domain' => $this->getSiteDomain(),
            'mode' => $mode
        ];
    }

    /**
     * 获取账号与当前授权信息（只读本地配置，官网不可用时仍可展示）
     */
    public function getAccountInfo(): array
    {
        $account = $this->getAccountConfig();
        $auth = $this->getAuthorizeConfig();

        $authorization = $account['authorization'] ?? [];
        if (empty($authorization['auth_code']) && !empty($auth['auth_code'])) {
            $authorization = $this->buildAuthorizationFromLocal($auth);
        }

        return [
            // 已选用（仅保存所选授权）或已通过授权码绑定，均视为“已有授权”
            'bound' => !empty($authorization['auth_code']) || !empty($auth['auth_code']),
            // 是否已保存可用的官网登录态（前端据此决定内嵌登录页还是账号页，避免闪屏）
            'has_token' => $this->hasValidToken(),
            'token_expires_time' => (int)($account['token']['expires_time'] ?? 0),
            'member' => $account['member'] ?? [],
            'authorization' => $authorization,
            'sync' => $account['sync'] ?? []
        ];
    }

    /**
     * 保存官网账号登录态（内嵌页登录后回传的令牌）
     *
     * 说明：
     * - 令牌只保存在本地配置，用于下次进入内嵌页时免登录，不参与授权校验
     * - 不返回令牌内容，避免凭据外泄
     */
    public function saveToken(array $data): array
    {
        $token = trim((string)($data['token'] ?? ''));
        if (empty($token)) throw new CommonException('WEB_LOGIN_TOKEN_REQUIRE');

        $expires_time = (int)($data['expires_time'] ?? 0);
        $account = $this->getAccountConfig();
        $account['token'] = [
            'access_token' => $token,
            'expires_time' => $expires_time,
            'update_time' => date('Y-m-d H:i:s')
        ];
        $this->core_config_service->setConfig(0, ConfigKeyDict::NIUCLOUD_ACCOUNT_CONFIG, $account);

        return [
            'has_token' => true,
            'token_expires_time' => $expires_time
        ];
    }

    /**
     * 本地保存的、仍在有效期内的官网访问令牌（未登录或已过期返回空字符串）
     */
    public function getValidAccessToken(): string
    {
        $auth_token = $this->getAccountConfig()['token'] ?? [];
        $access_token = $auth_token['access_token'] ?? '';
        if (empty($access_token)) return '';

        $expires_time = (int)($auth_token['expires_time'] ?? 0);
        // 未记录有效期（0）时视为长期有效
        if ($expires_time > 0 && $expires_time <= time()) return '';

        return $access_token;
    }

    /**
     * 是否存在可用的官网登录态
     */
    public function hasValidToken(): bool
    {
        return $this->getValidAccessToken() !== '';
    }

    /**
     * 选用授权：仅把所选授权的授权码/密钥保存到本地，**不做绑定**
     *
     * 说明：
     * - 不写 NIUCLOUD_CONFIG，因此不影响现有升级、应用下载、云编译链路
     * - 不改动官网侧授权域名
     * - 后续如需真正生效（打通授权业务），再调用 bindAuthorization()
     */
    public function saveSelectedAuth(array $data): array
    {
        $auth_code = $data['auth_code'] ?? '';
        $auth_secret = $data['auth_secret'] ?? '';
        if (empty($auth_code) || empty($auth_secret)) throw new CommonException('AUTH_NOT_EXISTS');

        $account = $this->getAccountConfig();
        $account['authorization'] = [
            'auth_code' => $auth_code,
            'auth_secret' => $auth_secret,
            'site_address' => $data['site_address'] ?? '',
            'company_name' => $data['company_name'] ?? '',
            'product_key_name' => $data['product_key_name'] ?? '',
            'source' => 'embed',
            'selected' => 1,
            'select_time' => date('Y-m-d H:i:s')
        ];
        $account['sync'] = [
            'last_sync_time' => date('Y-m-d H:i:s'),
            'last_sync_status' => 'selected'
        ];
        $this->core_config_service->setConfig(0, ConfigKeyDict::NIUCLOUD_ACCOUNT_CONFIG, $account);

        return $this->getAccountInfo();
    }

    /**
     * 绑定授权：iframe 回传的凭据 -> 复用现有授权校验链路 -> 写入本地授权配置
     */
    public function bindAuthorization(array $data): array
    {
        $auth_code = $data['auth_code'] ?? '';
        $auth_secret = $data['auth_secret'] ?? '';
        if (empty($auth_code) || empty($auth_secret)) throw new CommonException('AUTH_NOT_EXISTS');

        // 复用现有链路（含 authinfo 二次校验、缓存清理），不信任前端直接落库
        (new NiucloudService())->setAuthorize([
            'auth_code' => $auth_code,
            'auth_secret' => $auth_secret
        ]);

        $account = $this->getAccountConfig();
        $account['authorization'] = [
            'auth_code' => $auth_code,
            'site_address' => $data['site_address'] ?? $this->getSiteDomain(),
            'company_name' => $data['company_name'] ?? '',
            'product_key_name' => $data['product_key_name'] ?? '',
            'source' => 'embed',
            'update_time' => date('Y-m-d H:i:s')
        ];
        $account['sync'] = [
            'last_sync_time' => date('Y-m-d H:i:s'),
            'last_sync_status' => 'success'
        ];
        $this->core_config_service->setConfig(0, ConfigKeyDict::NIUCLOUD_ACCOUNT_CONFIG, $account);

        return $this->getAccountInfo();
    }

    /**
     * 退出官网账号会话（仅清除账号信息，不解除本地授权）
     */
    public function logout(): bool
    {
        $account = $this->getAccountConfig();
        unset($account['member'], $account['token']);
        $account['sync'] = [
            'last_sync_time' => date('Y-m-d H:i:s'),
            'last_sync_status' => 'logout'
        ];
        $this->core_config_service->setConfig(0, ConfigKeyDict::NIUCLOUD_ACCOUNT_CONFIG, $account);
        return true;
    }

    /**
     * 同步当前授权状态（读官网 authinfo，失败不抛出，仅记录状态）
     */
    public function syncState(): array
    {
        $auth_info = [];
        try {
            $auth_info = (new CoreAuthService())->getAuthInfo()['data'] ?? [];
        } catch (\Throwable $e) {
            $auth_info = [];
        }

        $account = $this->getAccountConfig();
        $account['sync'] = [
            'last_sync_time' => date('Y-m-d H:i:s'),
            'last_sync_status' => empty($auth_info) ? 'fail' : 'success'
        ];

        if (!empty($auth_info)) {
            $account['authorization'] = array_merge($account['authorization'] ?? [], [
                'auth_code' => $auth_info['auth_code'] ?? '',
                'site_address' => $auth_info['site_address'] ?? '',
                'company_name' => $auth_info['company_name'] ?? '',
                'address_type' => $auth_info['address_type'] ?? false
            ]);
        }

        $this->core_config_service->setConfig(0, ConfigKeyDict::NIUCLOUD_ACCOUNT_CONFIG, $account);

        return $this->getAccountInfo();
    }

    /**
     * 官网账号配置
     */
    protected function getAccountConfig(): array
    {
        $config = $this->core_config_service->getConfig(0, ConfigKeyDict::NIUCLOUD_ACCOUNT_CONFIG);
        return $config['value'] ?? [];
    }

    /**
     * 本地授权配置
     */
    protected function getAuthorizeConfig(): array
    {
        $config = $this->core_config_service->getConfig(0, ConfigKeyDict::NIUCLOUD_CONFIG);
        return $config['value'] ?? [];
    }

    /**
     * 由本地授权配置构造展示信息（兼容只通过授权码手工绑定的老用户）
     */
    protected function buildAuthorizationFromLocal(array $auth): array
    {
        return [
            'auth_code' => $auth['auth_code'] ?? '',
            'site_address' => '',
            'company_name' => '',
            'product_key_name' => '',
            'source' => 'manual',
            'update_time' => ''
        ];
    }
}
