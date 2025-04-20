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

return [
    'validate_article' => [
        'title_require' => 'title is require',
        'title_max' => 'title must not be exceed 20 points',
        'intro_max' => 'intro must not be exceed 50 points',
        'summary_max' => 'summary must not be exceed 50 points',
        'image_max' => 'image is exceed max',
        'author_max' => 'author must not be exceed 20 points',
        'is_show_number' => 'is_show must be a number',
        'is_show_between' => 'is_show must be 0 or 1',
        'sort_number' => 'sort must be a number',
        'sort_between' => 'sort must not be exceed 10000',
        'cate_name_require' => 'cate_name is require',
        'cate_name_max' => 'cate_name must not be exceed 120 points',
    ]
];
