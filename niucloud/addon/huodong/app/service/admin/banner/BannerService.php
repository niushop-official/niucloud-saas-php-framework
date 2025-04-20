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

namespace addon\huodong\app\service\admin\banner;

use addon\huodong\app\model\banner\Banner;

use core\base\BaseAdminService;


/**
 * 服务层
 * Class BannerService
 * @package addon\huodong\app\service\admin\banner
 */
class BannerService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Banner();
    }

    /**
     * 获取列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["status","adddate"], $where)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,image,url,status';

        $info = $this->model->field($field)->where([['id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加
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
     * 编辑
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
     * 删除
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
