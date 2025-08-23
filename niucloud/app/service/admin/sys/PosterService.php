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

namespace app\service\admin\sys;


use app\dict\poster\ComponentDict;
use app\model\sys\Poster;
use app\service\core\poster\CorePosterService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use Exception;
use think\db\exception\DbException;
use think\facade\Db;

/**
 * 自定义海报服务类
 * Class AgreementService
 * @package app\service\admin\sys
 */
class PosterService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Poster();
    }

    /**
     * 获取自定义海报分页列表
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'id, site_id, name, type, channel, value, status,is_default, create_time, update_time, addon';
        $order = "update_time desc";

        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'name', 'type' ], $where)->field($field)->order($order)->append([ 'type_name' ]);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取自定义海报列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'id, site_id, name, type, channel, value, status,is_default, create_time, update_time, addon')
    {
        $order = "update_time desc";
        return $this->model->where([ [ 'site_id', "=", $this->site_id ] ])->withSearch([ "name", 'type' ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取自定义海报信息
     * @param int $id
     * @param string $field
     * @return array
     */
    public function getInfo(int $id, $field = 'id, site_id, name, type, channel, value, status,is_default, create_time, update_time, addon')
    {
        return $this->model->field($field)->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
    }

    /**
     * 添加自定义海报
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 编辑自定义海报
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除自定义海报
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        return $this->model->where([ [ 'id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->delete();
    }

    /**
     * 修改自定义海报启用状态
     * @param $data
     * @return Poster
     */
    public function modifyStatus($data)
    {
        $poster_info = $this->model->field('is_default')->where([
            [ 'id', '=', $data[ 'id' ] ],
            [ 'site_id', '=', $this->site_id ]
        ])->findOrEmpty()->toArray();
        if (empty($poster_info)) throw new AdminException('POSTER_NOT_EXIST');
        if ($poster_info[ 'is_default' ] == 1) throw new AdminException('POSTER_IN_USE_NOT_ALLOW_MODIFY');
        return $this->model->where([
            [ 'id', '=', $data[ 'id' ] ],
            [ 'site_id', '=', $this->site_id ]
        ])->update([ 'status' => $data[ 'status' ] ]);
    }

    /**
     * 将自定义海报修改为默认海报
     * @param $data
     * @return bool
     */
    public function modifyDefault($data)
    {
        try {
            $info = $this->getInfo($data[ 'id' ]);
            if (empty($info)) {
                return false;
            }
            Db::startTrans();
            $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'type', '=', $info[ 'type' ] ] ])->update([ 'is_default' => 0 ]);
            $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'id', '=', $data[ 'id' ] ] ])->update([ 'is_default' => 1, 'status' => 1, 'update_time' => time() ]);
            Db::commit();
            return true;
        } catch (Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 查询海报类型
     * @param string $type
     * @return array
     */
    public function getType($type = '')
    {
        return ( new CorePosterService() )->getType($type);
    }

    /**
     * 查询海报模板
     * @param string $addon
     * @param string $type
     * @return array|null
     */
    public function getTemplateList($addon = '', $type = '')
    {
        return ( new CorePosterService() )->getTemplateList($addon, $type);
    }

    /**
     * 获取组件列表
     * @param array $params 查询指定条件的海报组件
     * @return array
     */
    public function getComponentList($params = [])
    {
        $data = ComponentDict::getComponent();
        foreach ($data as $k => $v) {

            // 该分组下若没有组件则清空
            if (empty($v[ 'list' ])) {
                unset($data[ $k ]);
                continue;
            }

            // 查询组件支持的页面
            if (!empty($v[ 'support' ])) {
                if ($params[ 'type' ] != $k && !empty($params[ 'type' ]) && !empty($v[ 'support' ]) && !in_array($params[ 'type' ], $v[ 'support' ])) {
                    unset($data[ $k ]);
                    continue;
                }
            }

            $sort_arr = [];
            foreach ($v[ 'list' ] as $ck => $cv) {
                $sort_arr[] = $cv[ 'sort' ];
                unset($data[ $k ][ 'list' ][ $ck ][ 'sort' ]);
            }

            array_multisort($sort_arr, SORT_ASC, $data[ $k ][ 'list' ]); //排序，根据 sort 排序
        }

        return $data;
    }

    /**
     * 页面加载初始化
     * @param array $params
     * @return array
     * @throws DbException
     */
    public function getInit(array $params = [])
    {
        $data = [
            'id' => 0,
            'name' => $params[ 'name' ],
            'type' => $params[ 'type' ],
            'channel' => '',
            'value' => '',
            'status' => 1,
            'is_default' => 0,
            'addon' => ''
        ];

        if (!empty($params[ 'id' ])) {
            $field = 'id, name, type, channel, value, status,is_default, addon';
            $info = $this->getInfo($params[ 'id' ], $field);
            if (!empty($info)) {
                $data = $info;
            }
        }

        $data[ 'poster_type' ] = ( new CorePosterService() )->getType($data[ 'type' ]);

        if (empty($data[ 'addon' ])) {
            $data[ 'addon' ] = $data[ 'poster_type' ][ 'addon' ];
        }

        $data[ 'component' ] = $this->getComponentList([ 'type' => $data[ 'type' ] ]);

        return $data;
    }

}