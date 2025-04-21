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

namespace addon\shortvideo\app\service\admin\cate;

use addon\shortvideo\app\model\Cate;

use core\base\BaseAdminService;
use think\facade\Db;


/**
 * 分类服务层
 * Class CateService
 * @package addon\shortvideo\app\service\admin\cate
 */
class CateService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Cate();
    }

    /**
     * 获取分类列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["name","status","adddate"], $where)->order($order);
        $list = $this->pageQuery($search_model);


        return $list;
    }

    /**
     * 获取分类信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $info = $this->model->where([['id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加分类
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
     * 分类编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除分类
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();

        $res = $model->delete();
        return $res;
    }
    
}
