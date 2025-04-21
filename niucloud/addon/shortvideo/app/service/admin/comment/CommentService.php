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

namespace addon\shortvideo\app\service\admin\comment;

use addon\shortvideo\app\model\Comment;

use core\base\BaseAdminService;
use think\facade\Db;
use app\model\member\Member;


/**
 * 分类服务层
 * Class CommentService
 * @package addon\shortvideo\app\service\admin\comment
 */
class CommentService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Comment();
    }

    /**
     * 获取分类列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["video_id","member_id","adddate"], $where)->with(['video','member'])->order($order);
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


        if(!$data['headimg']){
            $member = (new Member())->where([['member_id', '=', $data['member_id']],['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();

            if(!empty($member)){
                $data['headimg'] = $member['headimg'];
                $data['nickname'] = $member['nickname'];
            }
        }
        
        
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


        if(!$data['headimg']){
            $member = (new Member())->where([['member_id', '=', $data['member_id']],['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();

            if(!empty($member)){
                $data['headimg'] = $member['headimg'];
                $data['nickname'] = $member['nickname'];
            }
        }

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
