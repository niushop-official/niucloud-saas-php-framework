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

namespace addon\qiankun_source\app\service\admin\category;

use addon\qiankun_source\app\model\category\Category;

use core\base\BaseAdminService;


/**
 * 乾坤素材分类服务层
 * Class CategoryService
 * @package addon\qiankun_source\app\service\admin\category
 */
class CategoryService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Category();
    }

    /**
     * 获取乾坤素材分类列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,title,icon,sort,status,create_time,delete_time';
        $order = 'sort desc, id desc';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])->withSearch(["id", "title", "status"], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取乾坤素材分类信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,title,icon,sort,status,create_time,delete_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加乾坤素材分类
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 乾坤素材分类编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除乾坤素材分类
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

}
