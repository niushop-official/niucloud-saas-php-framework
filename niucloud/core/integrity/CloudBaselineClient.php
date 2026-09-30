<?php
declare(strict_types=1);

namespace core\integrity;

use app\service\core\niucloud\CoreNiucloudConfigService;
use core\exception\CommonException;
use core\util\niucloud\CloudService;
use Psr\Http\Message\ResponseInterface;
use Throwable;

/**
 * 云编译服务 · 清单与规则客户端
 *
 * 对接的真实接口（详见第 8 章）：
 *
 *   GET {baseUri}addon/hash_download
 *       ?authorize_code=xxx&product_key=SAAS&addon_key=shop&version=1.6.4
 *       &algorithm=crc32&is_bom=1&is_crlf_lf=1
 *       成功 → Content-Type: application/octet-stream，body 就是清单 JSON 本体
 *       失败 → Content-Type: application/json，body 为 {"code":0,"msg":"…","data":[]}
 *
 *   GET {baseUri}addon/hash_rules?authorize_code=xxx
 *       成功 → {"code":1,"msg":"","data":{"version":"v1","patterns":["vendor/","/dist/","*.png",…]}}
 *
 * @package core\integrity
 */
class CloudBaselineClient
{
    private CloudService $cloud;

    public function __construct(?CloudService $cloud = null)
    {
        // 传 true：让 CloudService 自己决定用官方地址还是本地编译服务地址
        $this->cloud = $cloud ?: new CloudService(true);
    }

    /**
     * 下载指定组合的清单
     *
     * @param string      $name          插件名（框架目标传 framework）
     * @param string      $version       版本号（如 1.6.4）
     * @param string      $algorithm     算法（对外名）
     * @param bool        $isBom         是否忽略 BOM
     * @param bool        $isCrlfLf      是否忽略行尾
     * @param string|null $authorizeCode 授权码；不传则自动解析
     * @return array{list: array<string, string>, rules_version: string}
     * @throws CommonException
     */
    public function fetch(
        string $name,
        string $version,
        string $algorithm,
        bool $isBom,
        bool $isCrlfLf,
        ?string $authorizeCode = null
    ): array {
        $endpoint = (string) config('integrity.cloud.endpoint', 'addon/hash_download');

        $query = [
            'authorize_code' => $authorizeCode ?: $this->resolveAuthorizeCode(),
            'addon_key'      => $name,
            'version'        => $version,
            'algorithm'      => $algorithm,
            // 服务端只认 1/true/yes/on 为真，其余（含空值）一律当 false，
            // 所以这里显式传 1 / 0，避免传 true/false 被序列化成字符串后语义漂移
            'is_bom'         => $isBom ? 1 : 0,
            'is_crlf_lf'     => $isCrlfLf ? 1 : 0,
        ];

        // 产品标识：显式告知服务端，省去它去后台反查一步。
        // 服务端拿它映射出具体的媒体库根目录（SINGLE → /media-oss/、SAAS → /media-oss-saas/ …），
        // 从而定位到「框架/插件」清单所在的位置。
        // 配置缺失时不传，服务端会退回「授权码 → 产品」反查。
        $productKey = strtoupper(trim((string) config('niucloud.product')));
        if ($productKey !== '') {
            $query['product_key'] = $productKey;
        }

        try {
            $response = $this->cloud->request('GET', $endpoint . '?' . http_build_query($query));
        } catch (Throwable $e) {
            throw new CommonException('清单下载失败（连接异常）：' . $e->getMessage());
        }

        $body = $this->readBody($response);

        // ---- 失败分支：服务端返回 JSON 错误信封 ----
        if ($this->looksLikeEnvelope($response, $body)) {
            throw $this->cloudException($this->extractError($body), $name, $version, $productKey, '完整性检测');
        }

        // ---- 成功分支：body 就是清单 JSON 本体 ----
        $list = json_decode($body, true);

        if (!is_array($list) || $list === []) {
            throw new CommonException(
                '清单内容为空或不是合法 JSON：' . $name . ' / ' . $version . ' / ' . $algorithm
            );
        }

        foreach ($list as $file => $hash) {
            if (!is_string($file) || $file === '' || !is_scalar($hash)) {
                throw new CommonException('清单格式非法：应为「清单键 => 校验值」的映射');
            }
        }

        return [
            'list'          => $list,
            // 服务端用响应头回带「生成这份清单时所用的规则版本」
            'rules_version' => $response->getHeaderLine('X-Hash-Rules-Version'),
        ];
    }

    /**
     * 下载包内单个文件的内容（官方内容）
     *
     * 用于「官方 vs 本地」文本比对，以及用官方内容覆盖本地被改动的文件。
     * 服务端读的是生成清单的同一份包体（GET /addon/file_content），
     * 所以清单里存在的键一定能取到，反之取不到。
     *
     * @param string      $name          插件名（框架目标传 framework）
     * @param string      $version       版本号（如 1.6.4）
     * @param string      $file          相对内容根的文件键（与清单键一致）
     * @param string|null $authorizeCode 授权码；不传则自动解析
     * @return array{content: string, size: int}
     * @throws CommonException
     */
    public function fetchFileContent(string $name, string $version, string $file, ?string $authorizeCode = null): array
    {
        $endpoint = (string) config('integrity.cloud.file_endpoint', 'addon/file_content');

        $query = [
            'authorize_code' => $authorizeCode ?: $this->resolveAuthorizeCode(),
            'addon_key'      => $name,
            'version'        => $version,
            'file'           => $file,
        ];

        // 产品标识：与服务端定位媒体库根目录的方式一致（同 fetch()）
        $productKey = strtoupper(trim((string) config('niucloud.product')));
        if ($productKey !== '') {
            $query['product_key'] = $productKey;
        }

        try {
            $response = $this->cloud->request('GET', $endpoint . '?' . http_build_query($query));
        } catch (Throwable $e) {
            throw new CommonException('官方文件内容下载失败（连接异常）：' . $e->getMessage());
        }

        $body = $this->readBody($response);

        // 服务端成功时固定回 application/octet-stream、失败回 JSON 错误信封，
        // 判定口径与清单下载完全一致（见 looksLikeEnvelope）。
        if ($this->looksLikeEnvelope($response, $body)) {
            throw $this->cloudException($this->extractError($body), $name, $version, $productKey, '文件比对与写回');
        }

        return [
            'content' => $body,
            'size'    => strlen($body),
        ];
    }

    /**
     * 拉取共享排除规则
     *
     * ★ 保留但不再调用：客户端规则已改为读本站 config/hash_rules.ignore
     *   （见 core\integrity\RulesProvider）。本方法与服务端 GET /addon/hash_rules
     *   一并保留，作为将来需要重新统一分发时的退路。
     *
     * @return array{version: string, patterns: array}
     * @throws CommonException
     */
    public function fetchRules(?string $authorizeCode = null): array
    {
        $endpoint = (string) config('integrity.cloud.rules_endpoint', 'addon/hash_rules');

        try {
            $response = $this->cloud->request('GET', $endpoint . '?' . http_build_query([
                'authorize_code' => $authorizeCode ?: $this->resolveAuthorizeCode(),
            ]));
        } catch (Throwable $e) {
            throw new CommonException('排除规则拉取失败（连接异常）：' . $e->getMessage());
        }

        $body = $this->readBody($response);

        // 注意：规则接口是**标准的 JSON 信封**（成功也返回 application/json 的 {code:1,...}），
        // 所以这里不能复用下载清单时的 looksLikeEnvelope() —— 那会把成功响应也当成错误信封。
        $decoded = json_decode($body, true);
        if (!is_array($decoded)) {
            throw new CommonException('排除规则响应不是合法 JSON');
        }

        // 先判 code，再取 data：code 存在且非 1 才是失败
        if (isset($decoded['code']) && (int) $decoded['code'] !== 1) {
            throw new CommonException(trim((string) ($decoded['msg'] ?? '')) ?: '排除规则获取失败');
        }

        // 兼容 {code:1,data:{…}} 与直接 {…} 两种形态
        $data = (isset($decoded['data']) && is_array($decoded['data'])) ? $decoded['data'] : $decoded;

        return [
            'version'  => (string) ($data['version'] ?? ''),
            // ★ 有序的规则行，不能排序（顺序影响语义）
            'patterns' => array_values((array) ($data['patterns'] ?? [])),
        ];
    }

    /**
     * 解析授权码
     *
     * 与 app\service\core\niucloud\CoreCloudBaseService 的取值方式一致：
     * 优先取后台保存的授权配置，取不到再回落 config('niucloud.auth.code')。
     * 两者都为空时直接抛 NEED_TO_AUTHORIZE_FIRST（与项目现有行为一致）。
     *
     * @throws CommonException
     */
    public function resolveAuthorizeCode(): string
    {
        $config = (new CoreNiucloudConfigService())->getNiucloudConfig();
        $code   = trim((string) ($config['auth_code'] ?? ''));

        if ($code === '') {
            $code = trim((string) config('niucloud.auth.code'));
        }

        if ($code === '') {
            throw new CommonException('NEED_TO_AUTHORIZE_FIRST');
        }

        return $code;
    }

    /**
     * 把响应体读成字符串
     *
     * 流只能读一次，所以统一在这里读；可 seek 的先 rewind，保证从头读。
     */
    private function readBody(ResponseInterface $response): string
    {
        $body = $response->getBody();

        if ($body->isSeekable()) {
            $body->rewind();
        }

        return (string) $body;
    }

    /**
     * 判断响应是不是「错误信封」
     *
     * 优先看 Content-Type：服务端成功时固定返回 application/octet-stream。
     * Content-Type 不明确时，再看 body 是否长得像 {"code":..,"msg":..}。
     */
    private function looksLikeEnvelope(ResponseInterface $response, string $body): bool
    {
        $contentType = strtolower($response->getHeaderLine('Content-Type'));

        if (str_contains($contentType, 'json')) {
            return true;
        }
        if ($contentType !== '' && !str_contains($contentType, 'octet-stream')) {
            return true;
        }

        $trimmed = ltrim($body);
        if (!str_starts_with($trimmed, '{')) {
            return false;
        }

        $decoded = json_decode($body, true);

        return is_array($decoded) && array_key_exists('code', $decoded) && array_key_exists('msg', $decoded);
    }

    /**
     * 云端错误信封 → 异常
     *
     * 「内容目录不存在」意味着云端媒体库里没有这份包体（未发布 / 产品库不对 / 解压结构不符），
     * 这跟「请求失败」不是一回事：调用方据此跳过该目标并给出告警即可。
     * 其余错误一律按普通异常透出，不做任何掩盖。
     */
    private function cloudException(string $message, string $name, string $version, string $productKey, string $action): CommonException
    {
        if (!str_contains($message, '内容目录不存在')) {
            return new CommonException($message);
        }

        return new CloudPackageMissingException(
            self::packageMissingMessage($name, $version, $productKey, $message, $action)
        );
    }

    /**
     * 包体缺失时的可读文案
     *
     * 云端原话带着一条绝对路径（/media-oss-saas/…），对使用者没有意义；
     * 这里换成「缺什么 + 怎么修」的说法，路径放到末尾供排查。
     */
    private static function packageMissingMessage(string $name, string $version, string $productKey, string $raw, string $action): string
    {
        $message = '云端媒体库里没有 ' . $name . ' v' . $version . ' 的包体，无法进行' . $action . '。';

        $message .= $productKey === ''
            // 没上报产品标识时，云端会退回「授权码 → 产品」反查，那条链路目前固定按默认产品找，
            // 很可能找错了媒体库 —— 这属于本地配置问题，值得单独点出来
            ? '客户端未上报产品标识（config/niucloud.php 的 product 为空），云端只能按默认产品查找，很可能找错了媒体库。'
            : '该版本可能尚未发布到「' . $productKey . '」产品库，或发布时压缩包内的目录结构不符合「{目录名}/{版本}/{目录名}」约定。';

        $probed = self::probedPath($raw);
        if ($probed !== '') {
            $message .= '云端探测路径：' . $probed;
        }

        return $message;
    }

    /**
     * 从云端原话里抽出它探测的路径（仅供排查，不影响结论）
     */
    private static function probedPath(string $raw): string
    {
        return preg_match('/内容目录不存在[:：]\s*([^（(]+)/u', $raw, $matches) === 1 ? trim($matches[1]) : '';
    }

    /**
     * 从错误信封里取出可读消息
     *
     * 原样透出服务端的 msg，不做二次包装覆盖，便于定位。
     */
    private function extractError(string $body): string
    {
        $decoded = json_decode($body, true);

        if (!is_array($decoded)) {
            return '服务端返回了无法解析的错误响应';
        }

        $msg = trim((string) ($decoded['msg'] ?? ''));
        if ($msg !== '') {
            return $msg;
        }

        return '服务端返回错误（code=' . (string) ($decoded['code'] ?? '?') . '）';
    }
}
