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

namespace app\service\core\printer;

use app\dict\sys\PrinterDict;
use app\model\sys\SysPrinter;
use app\service\core\sys\CoreConfigService as ConfigService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use core\printer\sdk\yilianyun\api\PrinterService as PrinterServiceApi;
use core\printer\sdk\yilianyun\api\PrintService;
use core\printer\sdk\yilianyun\config\YlyConfig;
use core\printer\sdk\yilianyun\oauth\YlyOauthClient;

/**
 * 小票打印处理层
 */
class CorePrinterService extends BaseCoreService
{

    /**
     * 获取小票打印机列表
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getList(array $where = [], $field = 'printer_id,brand,printer_name,printer_code,printer_key,open_id,apikey,template_type,trigger,print_width,status,create_time')
    {
        $order = 'create_time desc';
        return ( new SysPrinter() )->where($where)->field($field)->order($order)->append([ 'brand_name' ])->select()->toArray();
    }

    /**
     * 获取小票打印模板类型
     * @return array|null
     */
    public function getType()
    {
        $data = PrinterDict::getType();
        array_multisort(array_column($data, 'sort'), SORT_ASC, $data); // 根据 sort 排序
        return $data;
    }

    /**
     * 获取设备品牌
     * @param string $brand
     * @return array|mixed|string
     */
    public function getBrand($brand = '')
    {
        return PrinterDict::getBrandName($brand);
    }

    /**
     * 设置易联云小票打印token
     * @param $data
     * @param $site_id
     * @return \app\model\sys\SysConfig|bool|\think\Model
     */
    public function setYlyTokenConfig($site_id, $data)
    {
        return ( new ConfigService() )->setConfig($site_id, 'PRINTER_YLY_TOKEN', $data);
    }

    /**
     * 获取易联云配置
     * @param $site_id
     * @return array|mixed
     */
    public function getYlyTokenConfig($site_id)
    {
        $info = ( new ConfigService() )->getConfig($site_id, 'PRINTER_YLY_TOKEN');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'access_token' => '',
                'end_time' => '0' // token有效期
            ];
        }
        return $info[ 'value' ];
    }

    /**
     * 获取易联云token
     * @param $site_id
     * @param $yly_config
     * @param bool $refresh 是否主动刷新token
     * @return mixed
     */
    public function getYlyToken($site_id, $yly_config, $refresh = false)
    {
        // token 配置
        $config = $this->getYlyTokenConfig($site_id);

        if ($config[ 'end_time' ] == 0 || $config[ 'end_time' ] < time() || $refresh) {
            $client = new YlyOauthClient($yly_config);
            $token = $client->getToken(); // 若是开放型应用请传授权码code
            $access_token = $token->access_token; // 调用API凭证AccessToken

            // 更新token
            $expires_in = $token->expires_in;
            $end_time = time() + $expires_in;
            $token_data = [
                'access_token' => $token->access_token,
                'end_time' => $end_time
            ];
            $this->setYlyTokenConfig($site_id, $token_data);
        } else {
            $access_token = $config[ 'access_token' ];
        }
        return $access_token;
    }

    /**
     * 添加易联云打印机授权
     * @param $site_id
     * @param $params
     * @return mixed
     */
    public function addPrinterYly($site_id, $params)
    {
        $yly_config = new YlyConfig($params[ 'open_id' ], $params[ 'apikey' ]);
        $access_token = $this->getYlyToken($site_id, $yly_config);

        $printer = new PrinterServiceApi($access_token, $yly_config);
        $api_data = $printer->addPrinter($params[ 'printer_code' ], $params[ 'printer_key' ]);

        $res = [
            'code' => $api_data->error,
            'message' => $api_data->error_description
        ];

        if (!empty($api_data->body) && gettype($api_data->body) == 'string') {
            $res[ 'message' ] .= '，' . $api_data->body;
        }

        return $res;
    }

    /**
     * 删除易联云打印机授权
     * @param $site_id
     * @param $params
     * @return mixed
     */
    public function deletePrinterYly($site_id, $params)
    {
        $yly_config = new YlyConfig($params[ 'open_id' ], $params[ 'apikey' ]);
        $access_token = $this->getYlyToken($site_id, $yly_config);

        $printer = new PrinterServiceApi($access_token, $yly_config);
        $res = $printer->deletePrinter($params[ 'printer_code' ]);
        return [
            'code' => $res->error,
            'message' => $res->error_description
        ];
    }

    /**
     * 重新获取易联云token
     * @param $site_id
     * @param $printer_id
     * @return mixed
     */
    public function refreshToken($site_id, $printer_id)
    {
        $field = 'open_id,apikey';
        $info = ( new SysPrinter() )->field($field)->where([ [ 'site_id', '=', $site_id ], [ 'printer_id', "=", $printer_id ] ])->findOrEmpty()->toArray();
        if (empty($info)) {
            throw new CommonException('PRINTER_NOT_EXIST');
        }

        $yly_config = new YlyConfig($info[ 'open_id' ], $info[ 'apikey' ]);
        $access_token = $this->getYlyToken($site_id, $yly_config, true);
        return $access_token;
    }

    /**
     * 测试打印
     * @param $site_id
     * @param $printer_id
     * @return mixed
     */
    public function testPrint($site_id, $printer_id)
    {
        $field = 'printer_id,brand,printer_code,open_id,apikey';
        $info = ( new SysPrinter() )->field($field)->where([ [ 'site_id', '=', $site_id ], [ 'printer_id', "=", $printer_id ] ])->findOrEmpty()->toArray();
        if (empty($info)) {
            throw new CommonException('PRINTER_NOT_EXIST');
        }

        // 易联云打印机
        if ($info[ 'brand' ] == PrinterDict::YI_LIAN_YUN) {
            $res = $this->testYlyPrint($site_id, $info);
            return $res;
        }

    }

    /**
     * 测试易联云打印
     * @param $site_id
     * @param $printer
     */
    public function testYlyPrint($site_id, $printer)
    {
        $origin_id = date('YmdHis') . rand(1, 999); // 内部订单号(32位以内)

        $content = "<MN>" . 1 . "</MN>";

        $content .= "<center>小票名称</center>";
        $content .= str_repeat('.', 32);
        $content .= "<FH2><FS><center>商城名称</center></FS></FH2>";
        $content .= str_repeat('.', 32);

        $content .= "订单时间:" . date("Y-m-d H:i") . "\n";
        $content .= "订单编号:" . $origin_id . "\n";

        $content .= str_repeat('.', 32);
        $content .= "<table>";
        $content .= "<tr><td>商品名称</td><td></td><td>数量</td><td>金额</td></tr>";
        $content .= "</table>";
        $content .= str_repeat('.', 32);

        $content .= "<table>";
        $content .= "<tr><td>烤土豆(超级辣)</td><td></td><td>x3</td><td>5</td></tr>";
        $content .= "<tr><td>烤豆干(超级辣)</td><td></td><td>x2</td><td>10</td></tr>";
        $content .= "<tr><td>烤鸡翅(超级辣)</td><td></td><td>x3</td><td>15</td></tr>";
        $content .= "</table>";
        $content .= str_repeat('.', 32);

        $content .= "商品总额：￥30 \n";
        $content .= "订单共8件商品，总计: ￥30 \n";
        $content .= str_repeat('.', 32);

        $content .= "<FH2>买家留言：微辣，多放孜然</FH2>\n";
        $content .= str_repeat('.', 32);

        $content .= "<center>谢谢惠顾，欢迎下次光临</center>";

        try {
            $config = new YlyConfig($printer[ 'open_id' ], $printer[ 'apikey' ]);
            $access_token = $this->getYlyToken($site_id, $config);
            $machine_code = $printer[ 'printer_code' ]; // 商户授权机器码
            $print = new PrintService($access_token, $config);
            $res = $print->index($machine_code, $content, $origin_id);
            if ($res->error != 0) {
                throw new CommonException($res->error_description);
            }
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 打印小票内容
     * @param $params
     * @return array
     */
    public function printTicket($params)
    {
        $item = array_values(array_filter(event('PrinterContent', $params)));

        $result = [
            'code' => 0,
            'message' => ''
        ];
        $list = [];
        foreach ($item as $k => $v) {
            if ($v[ 'code' ] == 0) {
                $list = array_merge($list, $v[ 'data' ]);
            } else {
                $result[ 'code' ] = $v[ 'code' ];
                $result[ 'message' ] = $v[ 'message' ];
                break;
            }
        }

        if ($result[ 'code' ] != 0) {
            return $result;
        }

        if (empty($list)) {
            return [
                'code' => -1,
                'message' => '未找到小票模板内容'
            ];
        }

        try {

            foreach ($list as $k => $v) {

                switch ($v[ 'printer_info' ][ 'brand' ]) {
                    // 易联云打印机
                    case PrinterDict::YI_LIAN_YUN:
                        $config = new YlyConfig($v[ 'printer_info' ][ 'open_id' ], $v[ 'printer_info' ][ 'apikey' ]);
                        $access_token = $this->getYlyToken($params[ 'site_id' ], $config);
                        $machine_code = $v[ 'printer_info' ][ 'printer_code' ]; // 商户授权机器码

                        $print = new PrintService($access_token, $config);
                        $res = $print->index($machine_code, $v[ 'content' ], $v[ 'origin_id' ]);
                        if ($res->error != 0) {
                            $result[ 'code' ] = $res->error;
                            $result[ 'message' ] = $res->error_description;
                        }
                        break;
                }

            }
        } catch (\Exception $e) {
            $result[ 'code' ] = -1;
            $result[ 'message' ] = $e->getMessage();
        }

        return $result;
    }

}