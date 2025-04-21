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

namespace addon\huodong\app\validate\act;
use core\base\BaseValidate;
/**
 * 活动列验证器
 * Class Act
 * @package addon\huodong\app\validate\act
 */
class Act extends BaseValidate
{

       protected $rule = [
//            'name' => 'require',
//            'cate_id' => 'require',
//            'image' => 'require',
//            'images' => 'require',
//            'startime' => 'require',
//            'endtime' => 'require',
//            'address' => 'require',
//            'content' => 'require'
        ];

       protected $message = [
            'name.require' => ['common_validate.require', ['name']],
            'cate_id.require' => ['common_validate.require', ['cate_id']],
            'image.require' => ['common_validate.require', ['image']],
            'images.require' => ['common_validate.require', ['images']],
            'startime.require' => ['common_validate.require', ['startime']],
            'endtime.require' => ['common_validate.require', ['endtime']],
            'address.require' => ['common_validate.require', ['address']],
            'content.require' => ['common_validate.require', ['content']]
        ];

       protected $scene = [
            "add" => ['name', 'cate_id', 'price', 'image', 'images', 'startime', 'endtime', 'address', 'content', 'sales', 'status', 'sort', 'adddate'],
            "edit" => ['name', 'cate_id', 'price', 'image', 'images', 'startime', 'endtime', 'address', 'content', 'sales', 'status', 'sort', 'adddate']
        ];

}
