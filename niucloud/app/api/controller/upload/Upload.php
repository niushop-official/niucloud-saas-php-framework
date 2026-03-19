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

namespace app\api\controller\upload;

use app\service\api\upload\Base64Service;
use app\service\api\upload\FetchService;
use app\service\api\upload\UploadService;
use core\base\BaseApiController;
use think\Response;

class Upload extends BaseApiController
{

    /**
     * 图片上传
     * @return Response
     */
    public function image(){
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        return success($upload_service->image($data['file']));
    }

    /**
     * 视频上传
     * @return Response
     */
    public function video(){
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        return success($upload_service->video($data['file']));
    }

    /**
     * 远程图片拉取
     * @return Response
     */
    public function imageFetch(){
        $data = $this->request->params([
            ['url', ''],
        ]);
        $fetch_service = new FetchService();
        return success($fetch_service->image($data['url']));
    }


    /**
     * base64图片上传
     * @return Response
     */
    public function imageBase64(){
        $data = $this->request->params([
            ['content', ''],
        ]);
        $base64_service = new Base64Service();
        return success($base64_service->image($data['content']));
    }

    public function config()
    {
        return success([
            'upload_max_filesize' => [
                'unit' => 'KB',
                'num'=>$this->convertPhpSizeToBytes(ini_get('upload_max_filesize'))/1024
            ],
        ]);
    }

    private  function convertPhpSizeToBytes($size_str) {
        // 去除字符串两端的空格，统一转为大写（方便判断单位）
        $size_str = trim(strtoupper($size_str));
        // 如果是空值或纯数字（无单位），默认单位为字节
        if (!preg_match('/^(\d+(\.\d+)?)([BKMGTP]B?)?$/', $size_str, $matches)) {
            return (int)$size_str;
        }

        // 提取数值和单位
        $size = (float)$matches[1];
        $unit = isset($matches[3]) ? $matches[3] : 'B'; // 默认单位为B

        // 根据单位转换为字节
        switch ($unit) {
            case 'TB': case 'T': $size *= 1024;
            case 'GB': case 'G': $size *= 1024;
            case 'MB': case 'M': $size *= 1024;
            case 'KB': case 'K': $size *= 1024;
            case 'B': default: break; // 字节无需转换
        }

        return (int)$size;
    }
}
