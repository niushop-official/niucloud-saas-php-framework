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

namespace app\service\admin\wechat;

use app\dict\sys\StorageDict;
use app\dict\sys\WechatMediaDict;
use app\model\wechat\WechatMedia;
use app\service\core\upload\CoreUploadService;
use app\service\core\wechat\CoreWechatMediaService;
use core\base\BaseAdminService;

/**
 * 微信素材管理
 * @package app\service\core\wechat
 */
class WechatMediaService extends BaseAdminService
{
    private $root_path = 'attachment';

    protected  CoreWechatMediaService $core_wechat_media_service;
    public function __construct()
    {
        parent::__construct();
        $this->core_wechat_media_service = new CoreWechatMediaService();
        $this->model = new WechatMedia();
    }

    /**
     * 素材列表
     * @return array
     */
    public function getMediaPage(array $where = []){
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'create_time', 'type' ], $where)->field('*')->append([ 'type_name' ])->order('create_time desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 上传图片素材
     * @return array
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function addImageMedia(array $data) {
        $dir = $this->root_path.'/'.'image'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        $upload_res = $core_upload_service->image($data['file'], $this->site_id, $dir, storage_type: StorageDict::LOCAL);

        $data = [
            'site_id' => $this->site_id,
            'type' => WechatMediaDict::IMAGE,
            'file_path' => $upload_res['url']
        ];
        return (new CoreWechatMediaService())->addMedia($data);
    }

    /**
     * 上传视频资源
     * @return array
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function addVideoMedia(array $data) {
        $dir = $this->root_path.'/'.'video'.'/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        $core_upload_service = new CoreUploadService();
        $upload_res = $core_upload_service->video($data['file'], $this->site_id, $dir, 0, storage_type: StorageDict::LOCAL);

        $data = [
            'site_id' => $this->site_id,
            'type' => WechatMediaDict::VIDEO,
            'file_path' => $upload_res['url']
        ];
        return (new CoreWechatMediaService())->addMedia($data);
    }

    /**
     * 同步草稿箱
     * @param int $pages
     * @return void
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function syncNewsMedia(int $pages = 0) {
        $data = [
            'site_id' => $this->site_id,
            'pages' => $pages
        ];
        $res = (new CoreWechatMediaService())->syncNewsMedia($data);
        if ($pages < $res['total_pages']) {
            $pages++;
            $this->syncNewsMedia($pages);
        }
        return true;
    }
}
