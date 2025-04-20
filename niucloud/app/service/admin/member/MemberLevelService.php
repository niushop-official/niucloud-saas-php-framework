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

namespace app\service\admin\member;

use app\model\member\MemberLevel;
use app\service\core\member\CoreMemberLevelService;
use app\service\core\member\CoreMemberService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

/**
 * 会员等级
 * Class MemberLabelService
 * @package app\service\admin\member
 */
class MemberLevelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberLevel();
    }

    /**
     * 获取会员等级分页列表
     * @param array $where
     * @param string $order
     * @return array
     */
    public function getPage(array $where = [], string $order = 'growth asc')
    {
        $field = 'level_id,site_id,level_name,growth,remark,create_time,update_time,level_benefits,level_gifts';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'level_name' ], $where)->field($field)->append([ "member_num" ])->order($order);
        return $this->pageQuery($search_model, function ($item) {
            if (!empty($item['level_benefits'])) $item['level_benefits'] = CoreMemberService::getBenefitsContent($item['site_id'], $item['level_benefits']);
            if (!empty($item['level_gifts'])) $item['level_gifts'] = CoreMemberService::getGiftContent($item['site_id'], $item['level_gifts']);
        });
    }

    /**
     * 获取会员等级列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'level_id,site_id,level_name,growth,remark,create_time,update_time,level_benefits,level_gifts')
    {
        $order = 'growth asc';
        return $this->model->where([['site_id', '=', $this->site_id]])->withSearch([ "level_name" ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取会员等级信息
     * @param int $level_id
     * @return array
     */
    public function getInfo(int $level_id)
    {
        $field = 'level_id,site_id,level_name,growth,remark,create_time,update_time,level_benefits,level_gifts';
        return $this->model->field($field)->where([ [ 'level_id', '=', $level_id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
    }

    /**
     * 获取等级
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAll()
    {
        return ( new CoreMemberLevelService() )->getAll($this->site_id);
    }

    /**
     * 添加会员等级
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $count = $this->model->where([ ['site_id', '=', $this->site_id ] ])->count();
        if ($count >= 10) throw new CommonException('MEMBER_LEVEL_MAX');

        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        ( new CoreMemberLevelService() )->clearCache($this->site_id);
        return $res->level_id;
    }

    /**
     * 会员等级编辑
     * @param int $level_id
     * @param array $data
     * @return true
     */
    public function edit(int $level_id, array $data)
    {
        $data[ 'update_time' ] = time();
        $this->model->update($data, [ [ 'level_id', '=', $level_id ], [ 'site_id', '=', $this->site_id ] ]);
        ( new CoreMemberLevelService() )->clearCache($this->site_id);
        return true;
    }

    /**
     * 删除会员等级
     * @param int $level_id
     * @return bool
     */
    public function del(int $level_id)
    {
        $level = $this->model->where([ [ 'level_id', '=', $level_id ], [ 'site_id', '=', $this->site_id ] ])->append(['member_num'])->findOrEmpty();
        if ($level['member_num'] > 0) throw new CommonException('LEVEL_NOT_ALLOWED_DELETE');
        $level->delete();
        ( new CoreMemberLevelService() )->clearCache($this->site_id);
        return true;
    }

}
