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

namespace addon\vipcard\app\service\admin;

use addon\vipcard\app\model\Verifier;
use app\model\member\Member;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 *
 * Class VerifyerService
 * @package app\service\admin
 */
class VerifierService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Verifier();
    }

    /**
     * 获取核销员表列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id] ])->with(['member' => function($query){
            $query->field('member_id, nickname, mobile, headimg');
        }])->field('*')->order('create_time desc');
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 添加核销员
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $member = (new Member())->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $data['member_id'] ] ])->findOrEmpty();
        if ($member->isEmpty()) throw new CommonException('MEMBER_NOT_EXIST');

        $model = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $data['member_id'] ] ])->findOrEmpty();
        if (!$model->isEmpty()) return $model->id;

        $data['create_time'] = time();
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 删除核销员
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }
}