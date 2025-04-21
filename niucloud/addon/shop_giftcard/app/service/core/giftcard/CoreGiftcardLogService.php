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

namespace addon\shop_giftcard\app\service\core\giftcard;

use addon\shop_giftcard\app\model\giftcard\GiftcardLog;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseCoreService;


/**
 * 礼品卡操作日志服务层
 * Class CoreLogService
 * @package addon\shop_giftcard\app\service\core\log;
 */
class CoreGiftcardLogService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GiftcardLog();
    }

    /**
     * 获取礼品卡操作日志列表
     * @param $site_id
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage($site_id, array $where = [], $field = 'id,site_id,giftcard_id,card_id,member_id,type,name,remark,create_time')
    {
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', "=", $site_id ] ])->withSearch([ "id", "giftcard_id", "card_id", "member_id", "type", "name", "remark", "create_time" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡操作日志信息
     * @param $site_id
     * @param int $id
     * @param string $field
     * @return mixed
     */
    public function getInfo($site_id, $id, $field = 'id,site_id,giftcard_id,card_id,member_id,type,name,remark,create_time')
    {
        $info = $this->model->field($field)->where([ [ 'site_id', "=", $site_id ], [ 'id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡操作日志
     * @param array $data
     * @param string $action_way
     * @return mixed
     */
    public function add(array $data, string $action_way)
    {
        $nick_name = '系统';
        switch ($action_way) {
            case 'member':
                $nick_name = ( Member::find($data[ 'member_id' ]) )->nickname;
                break;
            case 'user':
                $nick_name = ( SysUser::find($data[ 'member_id' ]) )->username;
                break;
        }
        $data[ 'name' ] = $nick_name;
        $data[ 'create_time' ] = time();
        $res = $this->model->create($data);
        return $res->id;
    }

}
