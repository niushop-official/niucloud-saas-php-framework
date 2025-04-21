<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shortvideo\app\service\core;


use addon\shortvideo\app\model\Config;
use core\base\BaseCoreService;
use app\service\core\upload\CoreStorageService;
use think\facade\Db;
use app\service\core\site\CoreSiteService;


class CoreConfigService extends BaseCoreService
{


    public function getConfig($data)
    {
        $info = (new Config())->where([['site_id', "=", $data['site_id']]])->findOrEmpty()->toArray();
        if(empty($info)){
            $indata['site_id'] = $data['site_id'];
            $indata['mianze'] = "请文明用语,禁止发违法违规内容";
            (new Config())->strict(false)->insertGetId($indata);
            $info =(new Config())->where([['site_id', "=", $data['site_id']]])->findOrEmpty()->toArray();

        }

       $storage_type =  (new CoreStorageService())->getDefaultStorage($data['site_id'])['storage_type']??'';
        if($storage_type=='aliyun'){
            $info['cover_houzhui'] = '?x-oss-process=video/snapshot,t_0,f_jpg';
//            http://a-image-demo.oss-cn-qingdao.aliyuncs.com/demo.mp4?x-oss-process=video/snapshot,t_50000,f_jpg,w_800,h_600
        }else if($storage_type=='qiniu'){
            $info['cover_houzhui'] = '?vframe/jpg/offset/0';
        }else if($storage_type=='tencent'){
            $info['cover_houzhui'] = '';
            //https://haha100-1301241294.cos.ap-guangzhou.myqcloud.com/uploads/feipin/20241112/0002.mp4
//            . '?ci-process=snapshot&time=' . $time . '&format=jpg&width=' . $width . '&height=' . $height ;
        }else{
            $info['cover_houzhui'] = '';
        }


        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId(request()->siteId());
        $info['open_shop'] = 0;
        if (in_array('shop', $site_addon)){
            $info['open_shop'] = 1;
        };

        return $info;
    }


}

