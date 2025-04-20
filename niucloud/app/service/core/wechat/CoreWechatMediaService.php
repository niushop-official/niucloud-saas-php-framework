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

namespace app\service\core\wechat;

use app\dict\sys\WechatMediaDict;
use app\model\wechat\WechatMedia;
use core\base\BaseCoreService;
use core\exception\CommonException;
use EasyWeChat\Kernel\Form\File;
use EasyWeChat\Kernel\Form\Form;

/**
 * 微信素材
 * @package app\service\core\wechat
 */
class CoreWechatMediaService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new WechatMedia();
    }

    /**
     * 添加素材
     * @param array $data
     * @return array
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function addMedia(array $data) {
        $field = [
            'media' => File::fromPath($data['file_path'])
        ];
        if ($data['type'] == WechatMediaDict::VIDEO) {
//            $field['json'] = [
//                'description' => [
//                    'title' => time(),
//                    'introduction' => time()
//                ]
//            ];
            $field['description'] = json_encode(['title' => time(), 'introduction' => time()]);
        }
        $options = Form::create($field)->toArray();
        $add_res =  CoreWechatService::appApiClient($data['site_id'])->post("/cgi-bin/material/add_material?type={$data['type']}", $options);
        if (isset($add_res['errcode']) && $add_res['errcode'] != 0) throw new CommonException($add_res['errmsg']);

        $save_data = [
            'site_id' => $data['site_id'],
            'type' => $data['type'],
            'value' => $data['file_path'],
            'media_id' => $add_res['media_id']
        ];

        $res = $this->model->create($save_data);
        return $res->toArray();
    }

    /**
     * 同步草稿箱
     * @param array $data
     * @return void
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function syncNewsMedia(array $data) {
        $options = [
            'json' => [
                'offset' => $data['pages'],
                'count' => 20,
                'no_content' => 1
            ]
        ];
        $sync_res =  CoreWechatService::appApiClient($data['site_id'])->post("/cgi-bin/freepublish/batchget", $options);
        if (isset($sync_res['errcode']) && $sync_res['errcode'] != 0) throw new CommonException($sync_res['errmsg']);

        $save_data = [];

        foreach ($sync_res['item'] as $item) {
            $media = $this->model->where([ ['media_id', '=', $item['article_id'] ] ])->findOrEmpty();
            if ($media->isEmpty()) {
                $save_data[] = [
                    'site_id' => $data['site_id'],
                    'type' => WechatMediaDict::NEWS,
                    'value' => json_encode($item['content']),
                    'media_id' => $item['article_id']
                ];
            } else {
                $media->value = json_encode($item['content']);
                $media->save();
            }
        }
        if (!empty($save_data)) $this->model->saveAll($save_data);

        return [
            'total_pages' => $sync_res['total_count'] ? ceil($sync_res['total_count'] / 20) : 0
        ];
    }
}
