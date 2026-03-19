<?php

namespace app\service\core\notice;

use app\dict\notice\BindMerchantDict;
use app\model\site\SiteMerchantBind;
use core\base\BaseCoreService;

class CoreNoticeBindMerchantService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getInfo($id)
    {
        return (new SiteMerchantBind())->where('id', $id)->find()->toArray();
    }

    public function bindAccount($site_id, $value, $type = BindMerchantDict::WEAPP, $extends = [])
    {
        if ($type == BindMerchantDict::WECHAT) {
            $openid_column = 'wechat_openid';
        } else if ($type == BindMerchantDict::SMS) {
            $openid_column = 'mobile';
        } else {
            $openid_column = 'weapp_openid';
        }
        $bind_info = (new SiteMerchantBind())->where('site_id', $site_id)->findOrEmpty();
        if ($bind_info->isEmpty()) {
            if (!empty($extends)) {
                $extends[$type] = $extends;
            }
            $res = (new SiteMerchantBind())->insertGetId([
                'extends' => $extends,
                $openid_column => $value,
                'site_id' => $site_id,
                'create_time' => time(),
            ]);
        } else {
            $db_extends = $bind_info->toArray()['extends'];
            if (!empty($extends)) {
                $db_extends[$type] = $extends;
            }
            $res = (new SiteMerchantBind())->where('site_id', $site_id)->update([
                'extends' => $db_extends,
                $openid_column => $value,
                'update_time' => time(),
            ]);
        }
        return $res;
    }

    public function unBindAccount($site_id, $data)
    {
        if (in_array(BindMerchantDict::WECHAT, $data['unbind_type']) && in_array(BindMerchantDict::WEAPP, $data['unbind_type']) && in_array(BindMerchantDict::SMS, $data['unbind_type'])) {
            return (new SiteMerchantBind())->where('site_id', $site_id)->delete();
        }
        if (in_array(BindMerchantDict::WECHAT, $data['unbind_type'])) {
            (new SiteMerchantBind())->where('site_id', $site_id)->update([
                'wechat_openid' => '',
                'update_time' => time()
            ]);
        }
        if (in_array(BindMerchantDict::WEAPP, $data['unbind_type'])) {
            (new SiteMerchantBind())->where('site_id', $site_id)->update([
                'weapp_openid' => '',
                'update_time' => time()
            ]);
        }
        if (in_array(BindMerchantDict::SMS, $data['unbind_type'])) {
            (new SiteMerchantBind())->where('site_id', $site_id)->update([
                'mobile' => '',
                'update_time' => time()
            ]);
        }
        return true;
    }
}