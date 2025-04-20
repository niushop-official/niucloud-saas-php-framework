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

namespace addon\qiankun_source\app\validate\source_list;
use core\base\BaseValidate;
/**
 * 素材管理验证器
 * Class SourceList
 * @package addon\qiankun_source\app\validate\source_list
 */
class SourceList extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['cate_id', 'text', 'media'],
            "edit" => ['cate_id', 'text', 'media']
        ];

}
