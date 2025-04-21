<?php
namespace addon\shortvideo\app\api\controller;
use addon\shortvideo\app\service\api\ShortvideoService;
use addon\shortvideo\app\service\api\IndexService;
use core\base\BaseApiController;
use think\Response;
use app\service\api\upload\UploadService;

class Index extends BaseApiController
{


    public function labellist()
    {
        $res = ( new IndexService() )->getLabel();
        return success($res);
    }
    public function getvideolist()
    {
        $res = ( new ShortvideoService() )->getvideolist();
        return success($res);
    }
    public function getcatelist()
    {
        $res = ( new ShortvideoService() )->getcatelist();
        return success($res);
    }
    public function addviews()
    {
        $res = ( new ShortvideoService() )->addviews();
        return success($res);
    }

    public function tolike()
    {
        $res = ( new ShortvideoService() )->tolike();
        return success($res);
    }
    public function getcommentlist()
    {
        $res = ( new ShortvideoService() )->getcommentlist();
        return success($res);
    }
    public function tocomment()
    {
        $res = ( new ShortvideoService() )->tocomment();
        return success($res);
    }
    public function commentlike()
    {
        $res = ( new ShortvideoService() )->commentlike();
        return success($res);
    }

    public function myvideo_list()
    {
        $res = ( new ShortvideoService() )->myvideo_list();
        return success($res);
    }

    public function getuserinfo()
    {
        $res = ( new ShortvideoService() )->getuserinfo();
        return success($res);
    }

    public function myvideo_del()
    {
        $res = ( new ShortvideoService() )->myvideo_del();
        return success($res);
    }

    public function myvideo_status()
    {
        $res = ( new ShortvideoService() )->myvideo_status();
        return success($res);
    }

    public function toaddvideo()
    {
        $res = ( new ShortvideoService() )->toaddvideo();
        return success($res);
    }
    public function getfollowlist()
    {
        $res = ( new ShortvideoService() )->getfollowlist();
        return success($res);
    }

    public function getfensilist()
    {
        $res = ( new ShortvideoService() )->getfensilist();
        return success($res);
    }
    public function tofollowuser()
    {
        $res = ( new ShortvideoService() )->tofollowuser();
        return success($res);
    }
    public function upload_video(){
        $data = $this->request->params([
            ['file', 'file'],
        ]);
        $upload_service = new UploadService();
        return success($upload_service->video($data['file']));
    }

    public function getposter()
    {
        $res = ( new ShortvideoService() )->getposter();
        return success($res);
    }
    public function config()
    {
        $res = ( new ShortvideoService() )->config();
        return success($res);
    }

}
