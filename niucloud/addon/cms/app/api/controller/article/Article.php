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

namespace addon\cms\app\api\controller\article;

use addon\cms\app\service\api\article\ArticleService;
use core\base\BaseApiController;
use think\Response;

/**
 * 文章控制器
 * Class CmsArticle
 * @package app\api\controller\article
 */
class Article extends BaseApiController
{
    /**
     * 文章列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'title', '' ],
            [ 'category_id', '' ],
        ]);
        return success(( new ArticleService() )->getPage($data));
    }

    public function all()
    {
        $data = $this->request->params([
            [ 'title', '' ],
            [ 'category_id', '' ],
            [ 'ids', [] ],
            [ 'limit', 0 ]
        ]);
        return success(( new ArticleService() )->getAll($data, $data[ 'limit' ]));
    }

    /**
     * 文章详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new ArticleService() )->getInfo($id));
    }

    /**
     * 自增文章浏览量
     * @param int $id
     * @return Response
     */
    public function visit(int $id)
    {
        ( new ArticleService() )->incrVisit($id);
        return success("SUCCESS");
    }

}
