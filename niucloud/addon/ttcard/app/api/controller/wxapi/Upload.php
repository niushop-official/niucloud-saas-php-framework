<?php
namespace addon\ttcard\app\api\controller\wxapi;

use addon\ttcard\app\api\controller\Base;
use app\service\api\upload\UploadService;
use think\Response;
use think\facade\Db;

class Upload extends Base
{
    public function index(){
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        $res=$upload_service->image($data['file']);
        $url=$res['url'];
        return $this->ok('上传成功',['url' => $url, 'fullurl' => $this->cdnurl($url, true)]); 
    }
}
