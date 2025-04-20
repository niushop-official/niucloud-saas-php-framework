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

namespace app\model\wechat;

use app\dict\sys\WechatMediaDict;
use core\base\BaseModel;

/**
 * 微信素材管理
 * Class WechatMedia
 * @package app\model\wechat
 */
class WechatMedia extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'wechat_media';

    /**
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        if (empty($data['type']))
            return '';
        $temp = WechatMediaDict::getTypeList()[$data['type']] ?? [];
        return $temp['name'] ?? '';
    }

    /**
     * @param $query
     * @param $value
     * @return void
     */
    public function searchTypeAttr($query, $value) {
        if (!empty($value)) {
            $query->where([['type', '=', $value]]);
        }
    }

    public function getValueAttr($value, $data) {
        if ($data['type'] == WechatMediaDict::NEWS) {
            return json_decode($value, true);
        } else {
            return $value;
        }
    }
}
