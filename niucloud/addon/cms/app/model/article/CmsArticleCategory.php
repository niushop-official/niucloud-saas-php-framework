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

namespace addon\cms\app\model\article;

use core\base\BaseModel;

/**
 * 文章栏目模型
 * Class CmsArticleCategory
 * @package app\model\article
 */
class CmsArticleCategory extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'category_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'cms_article_category';

    /**
     * 文章分类名称搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where([ [ 'name', 'like', "%$value%" ] ]);
        }
    }

    public function getArticleNumAttr($value, $data)
    {
        return ( new CmsArticle() )->where([ [ 'category_id', '=', $data[ 'category_id' ] ] ])->count();
    }

}
