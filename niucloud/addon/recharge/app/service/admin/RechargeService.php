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

namespace addon\recharge\app\service\admin;

use addon\recharge\app\model\Recharge;
use addon\recharge\app\model\RechargeOrder;
use addon\recharge\app\dict\RechargeOrderDict;
use addon\recharge\app\service\core\CoreRechargeConfigService;
use core\base\BaseAdminService;
use core\dict\DictLoader;
use core\exception\AdminException;

/**
 * 充值套餐
 * Class RechargeService
 * @package app\service\admin
 */
class RechargeService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Recharge();
    }

    /**
     * 设置充值套餐榜配置
     * @param array $params
     * @return bool
     */
    public function setRechargeConfig(array $params = [])
    {
        $params[ 'site_id' ] = $this->site_id;
        return ( new CoreRechargeConfigService() )->setRechargeConfig($params);
    }

    /**
     * 获取充值套餐榜配置
     * @return array
     */
    public function getRechargeConfig()
    {
        return ( new CoreRechargeConfigService() )->getRechargeConfig($this->site_id);
    }

    /**
     * 获取充值套餐列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'recharge_id,recharge_name,face_value,buy_price,point,growth,status,create_time,sort,gift_json,sale_num';
        $order = 'create_time desc';
        $search_model = $this->model
            ->where([ [ 'site_id', '=', $this->site_id ] ])
            ->withSearch([ 'recharge_name', 'create_time' ], $where)
            ->field($field)
            ->order($order);
        $list = $this->pageQuery($search_model);
        if (!empty($list[ 'data' ])) {
            foreach ($list[ 'data' ] as &$value) {
                $value[ 'gift_content' ] = [];
                if (!empty($value[ 'gift_json' ])) {
                    foreach ($value[ 'gift_json' ] as $k => $v) {
                        $v[ 'key' ] = $k;
                        $content = event('RechargeGiftContent', $v)[ 0 ];
                        if (!empty($content)) {
                            $value[ 'gift_content' ][] = $content;
                        }
                    }
                }
            }
        }
        return $list;
    }

    /**
     * 添加充值套餐
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $info = $this->model->where([ [ 'face_value', '=', $data[ 'face_value' ] ], [ 'site_id', '=', $this->site_id ] ])->find();
        if (!empty($info)) throw new AdminException('RECHARGE_AMOUNT_NOT_REPEAT');

        $data[ 'growth' ] = $data[ 'point' ] = 0;
        if (isset($data[ 'gift_json' ][ 'growth' ][ 'value' ])) {
            $data[ 'growth' ] = $data[ 'gift_json' ][ 'growth' ][ 'value' ];
            unset($data[ 'gift_json' ][ 'growth' ]);
        }
        if (isset($data[ 'gift_json' ][ 'point' ][ 'value' ])) {
            $data[ 'point' ] = $data[ 'gift_json' ][ 'point' ][ 'value' ];
            unset($data[ 'gift_json' ][ 'point' ]);
        }
        $data[ 'gift_json' ] = json_encode($data[ 'gift_json' ]);
        $data[ 'create_time' ] = time();
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->recharge_id;
    }

    /**
     * 修改充值套餐
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function edit(int $id, array $data)
    {
        $info = $this->model->where([ [ 'recharge_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        if (empty($info)) throw new AdminException('RECHARGE_NOT_EXIST');
        $face_value_info = $this->model->where([ [ 'face_value', '=', $data[ 'face_value' ] ], [ 'recharge_id', '<>', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        if (!empty($face_value_info)) throw new AdminException('RECHARGE_AMOUNT_NOT_REPEAT');

        $data[ 'growth' ] = $data[ 'point' ] = 0;
        if (isset($data[ 'gift_json' ][ 'growth' ][ 'value' ])) {
            $data[ 'growth' ] = $data[ 'gift_json' ][ 'growth' ][ 'value' ];
            unset($data[ 'gift_json' ][ 'growth' ]);
        }
        if (isset($data[ 'gift_json' ][ 'point' ][ 'value' ])) {
            $data[ 'point' ] = $data[ 'gift_json' ][ 'point' ][ 'value' ];
            unset($data[ 'gift_json' ][ 'point' ]);
        }
        $data[ 'gift_json' ] = json_encode($data[ 'gift_json' ]);
        $data[ 'update_time' ] = time();
        $info->save($data);
        return true;
    }

    /**
     * 获取套餐编辑数据
     * @param array $params
     * @return array
     */
    public function getInit($params = [])
    {
        $recharge_info = [];
        if (!empty($params[ 'recharge_id' ])) {
            //获取套餐信息
            $recharge_info = $this->model
                ->field('recharge_name,face_value,buy_price,point,growth,status,create_time,sort,gift_json')
                ->where([ [ 'recharge_id', '=', $params[ 'recharge_id' ] ], [ 'site_id', '=', $this->site_id ] ])
                ->append([ 'status_name' ])
                ->findOrEmpty()->toArray();
            if (!empty($recharge_info)) {
                $recharge_info[ 'gift_json' ][ 'point' ][ 'value' ] = $recharge_info[ 'point' ];
                $recharge_info[ 'gift_json' ][ 'growth' ][ 'value' ] = $recharge_info[ 'growth' ];
            }
        }
        return $recharge_info;
    }

    /**
     * 删除充值套餐
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $info = $this->model->where([ [ 'recharge_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        if (empty($info)) throw new AdminException('RECHARGE_NOT_EXIST');

        return $info->delete();
    }

    /**
     * 修改状态
     * @param $data
     * @return bool
     */
    public function modifyStatus($data)
    {
        $info = $this->model->where([ [ 'recharge_id', '=', $data[ 'recharge_id' ] ], [ 'site_id', '=', $this->site_id ] ])->find();
        if (empty($info)) throw new AdminException('RECHARGE_NOT_EXIST');
        return $this->model->where([
            [ 'recharge_id', '=', $data[ 'recharge_id' ] ],
            [ 'site_id', '=', $this->site_id ]
        ])->update([ 'status' => $data[ 'status' ] ]);
    }

    /**
     * 修改排序号
     * @return bool
     */
    public function editSort($data)
    {
        if (empty($data[ 'recharge_id' ])) throw new AdminException('RECHARGE_NOT_EXIST');
        $this->model->where([ [ 'recharge_id', '=', $data[ 'recharge_id' ] ], [ 'site_id', '=', $this->site_id ] ])->update([ 'sort' => $data[ 'sort' ] ]);
        return true;
    }

    /**
     * 获取套餐字典
     * @return array|null
     */
    public function getPackageGiftDict()
    {
        return ( new DictLoader("RechargeGift") )->load();
    }

}
