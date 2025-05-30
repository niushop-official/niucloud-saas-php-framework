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
namespace core\sms;


use app\dict\notice\NoticeTypeDict;
use app\model\sys\NiuSmsTemplate;
use app\service\core\http\HttpHelper;
use core\exception\CommonException;
use think\facade\Log;

class Niuyun extends BaseSms
{

    protected $username = '';
    protected $password = '';
    protected $signature = '';
//    private const SEND_URL = "https://api-ogw.zthysms.com/partner/v1/sms/sub-accounts/message/%s/template";
    private const SEND_URL = "https://api-shss.zthysms.com/v2/sendSmsTp";


    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        Log::write("send niu sms init ".json_encode($config,256));
        parent::initialize($config);
        $this->username = $config['username'] ?? '';
        $this->password = $config['password'] ?? '';
        $this->signature = $config['signature'] ?? '';
    }


    /**
     * 模版发送短信
     * @param string $mobile
     * @param string $template_id
     * @param array $data
     * @return void
     */
    public function send(string $mobile, string $template_id, array $data = [])
    {
        Log::write("send niu sms pre ".json_encode($data,256));
        if (empty($this->signature)) {
            throw new CommonException('签名未配置');
        }
        $template_info = (new NiuSmsTemplate())->where('template_id', $template_id)->findOrEmpty();
        Log::write("send niu sms pre signature".json_encode($template_info->toArray(),256));

        if ($template_info->isEmpty()) {
            throw new CommonException('模版未报备');
        }
        if ($template_info->audit_status != NoticeTypeDict::API_AUDIT_RESULT_PASS) {
            throw new CommonException('模版审核未通过');
        }
        $url = sprintf(self::SEND_URL, $this->username);
        $template_info = $template_info->toArray();
        $data = $this->formatParams($data, $template_info);
        $params['records'] = [
            [
                'mobile' => $mobile,
                'tpContent' => $data
            ]
        ];
        $params['tpId'] = $template_id;
        $params['username'] = $this->username;
        $tKey = time();
        $params['tKey'] = $tKey;
        $params['password'] = md5(md5($this->password) . $tKey);
        $params['signature'] = $this->signature;
        Log::write("send niu sms params ".json_encode($params,256));
        try {
            $res = (new HttpHelper())->httpRequest('POST', $url, $params);
            Log::write("send niu sms res ".json_encode($res,256));
            if ($res['code'] != 200) {
                throw new CommonException($res['msg']);
            }
            return $res;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    private function formatParams($data, $template_info)
    {
        $params_json = $template_info['param_json'];
        $params_type_arr = NoticeTypeDict::getApiParamsType();
        $type_arr = array_column($params_type_arr, null, 'type');
        $return = [];
        foreach ($params_json as $param => $validate) {
            $value = $data[$param];
            $pattern = $type_arr[$validate]['rule'] ?? '';
            if (empty($pattern)) {
                $return[$param] = $value;
            }else{
                if (preg_match($type_arr[$validate]['rule'], $value)) {
                    $return[$param] = $value;
                } else {
                    if ($validate == NoticeTypeDict::PARAMS_TYPE_CHINESE) {
                        $value = str_sub($value, 32);
                        $return[$param] = $value;
                    }
                    if ($validate == NoticeTypeDict::PARAMS_TYPE_OTHERS) {
                        $value = str_sub($value, 35);
                        $return[$param] = $value;
                    }
                }
            }
        }
        return $return;
    }

    public function modify(string $sign, string $mobile, string $code)
    {
    }

    public function template(int $page = 0, int $limit = 10, int $type = 1)
    {
    }

    public function apply(string $title, string $content, int $type)
    {
    }

    public function localTemplate(int $type, int $page, int $limit)
    {
    }

    public function record($id)
    {
    }
}