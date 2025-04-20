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

namespace addon\qiankun_source\app\service\admin\source_list;

use addon\qiankun_source\app\model\source_list\SourceList;
use addon\qiankun_source\app\model\category\Category;

use core\base\BaseAdminService;


/**
 * 素材管理服务层
 * Class SourceListService
 * @package addon\qiankun_source\app\service\admin\source_list
 */
class SourceListService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new SourceList();
    }

    /**
     * 获取素材管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,source_list.site_id,text,cate_id,user_id,text,video,image,source_list.create_time,source_list.delete_time';
        $order = 'id desc';

        $search_model = $this->model
            ->withJoin('user', 'left')
            ->where([['source_list.site_id', "=", $this->site_id]])
            ->withSearch(["id", "cate_id", "user_id", "text"], $where)
            ->with(['category', 'user'])
            ->field($field)
            ->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $k => $v) {
            $list['data'][$k]['image'] = $list['data'][$k]['image'] ? explode(',', $list['data'][$k]['image']) : [];
            $list['data'][$k]['video'] = $list['data'][$k]['video'] ? explode(',', $list['data'][$k]['video']) : [];
        }
        return $list;
    }

    /**
     * 获取素材管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,cate_id,user_id,text,video,image,create_time,delete_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['category'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加素材管理
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
     * 素材管理编辑
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
     * 删除素材管理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

    public function getCategoryAll()
    {
        $categoryModel = new Category();
        return $categoryModel->where([["site_id", "=", $this->site_id]])->select()->toArray();
    }

}
