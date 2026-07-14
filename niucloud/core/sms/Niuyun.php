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
        Log::write("SEND_NY_SMS init " . json_encode($config, 256));
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
        Log::write("SEND_NY_SMS pre mobile: ".$mobile.'  tem_id:'.$template_id . json_encode($data, 256));
        if (empty($this->signature)) {
            throw new CommonException('签名未配置');
        }
        $template_info = (new NiuSmsTemplate())->where('template_id', $template_id)->findOrEmpty();
        Log::write("SEND_NY_SMS pre signature" . json_encode($template_info->toArray(), 256));
//        get_wap_domain($site_id)
        if ($template_info->isEmpty()) {
            throw new CommonException('模版未报备');
        }
        if ($template_info->audit_status != NoticeTypeDict::API_AUDIT_RESULT_PASS) {
            throw new CommonException('模版审核未通过');
        }
        $url = self::SEND_URL;
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
        Log::write("SEND_NY_SMS params " . json_encode($params, 256));
        try {
            $res = (new HttpHelper())->httpRequest('POST', $url, $params);
            Log::write("SEND_NY_SMS res " . json_encode($res, 256));
            if ($res['code'] != 200) {
                throw new CommonException('ZT-' . $res['code'] . ":" . $res['msg']);
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
            // 1. 兜底：参数不存在直接抛出异常
            if (!isset($data[$param])) {
                Log::write("SEND_NY_SMS 参数缺失 param:" . $param);
                throw new \Exception('NY:参数【' . $param . '】缺失，无法发送');
            }
            $origin_value = $data[$param];
            $value = trim($origin_value);

            // 2. 获取当前参数类型配置，不存在则拦截
            $type_config = $type_arr[$validate] ?? [];
            if (empty($type_config)) {
                Log::write("SEND_NY_SMS 未知校验类型 param:{$param}, type:{$validate}");
                throw new \Exception('NY:参数【' . $param . '】校验类型配置不存在');
            }
            $pattern = $type_config['rule'] ?? '';
            $max = $type_config['max'] ?? 20;
            $min = $type_config['min'] ?? 1;

            // 3. 仅中文、其他类型 清除空格与小数点（其余类型保留.空格，如金额、号码）
            if (in_array($validate, [NoticeTypeDict::PARAMS_TYPE_CHINESE, NoticeTypeDict::PARAMS_TYPE_OTHERS])) {
                $value = str_replace([' ', '.'], '', $value);
            }

            // 4. 有正则规则：先整体校验是否符合格式，不通过直接抛异常
            if (!empty($pattern)) {
                if (!preg_match($pattern, $value)) {
                    Log::write("SEND_NY_SMS 参数格式不合法 param:{$param} 原始值:{$origin_value} 规则:{$pattern}");
                    throw new \Exception('NY:参数【' . $param . '】格式不符合要求');
                }
            }

            // 5. 校验通过后，按最大长度截断
            $value = mb_substr($value, 0, $max);
            $real_len = mb_strlen($value, 'UTF-8');

            if($param == NoticeTypeDict::PARAMS_TYPE_OTHER_NUMBER && mb_strlen($value, 'UTF-8') > 20){
                $value = mb_substr($value, 0, 17) . '---';
            }

            // 6. 最小长度校验，截断后过短直接拦截
            if ($real_len < $min) {
                Log::write("SEND_NY_SMS 参数长度不足 param:{$param} 处理后值:{$value} 最小长度:{$min}");
                throw new \Exception('NY:参数【' . $param . '】长度不满足最低要求');
            }

            $return[$param] = $value;
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