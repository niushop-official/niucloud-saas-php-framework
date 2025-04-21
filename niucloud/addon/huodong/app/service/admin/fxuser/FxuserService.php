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

namespace addon\huodong\app\service\admin\fxuser;

use addon\huodong\app\model\fxuser\Fxuser;
use addon\huodong\app\model\order\Order;
use app\model\member\Member;

use core\base\BaseAdminService;


/**
 * 推广员服务层
 * Class FxuserService
 * @package addon\huodong\app\service\admin\fxuser
 */
class FxuserService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Fxuser();
    }

    /**
     * 获取推广员列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,member_id,type,name,mobile,idcard,sfz1,sfz2,ying_image,status,adddate';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","member_id","type","name","mobile","status","adddate"], $where)->with(['member'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list[ 'data' ] as $k => &$v) {
            $v['sales'] = (new Order())->where('pid', $v['id'])->where('order_status','in','2,3')->count();

        }

        return $list;
    }

    /**
     * 获取推广员信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,type,name,mobile,idcard,sfz1,sfz2,ying_image,status,adddate';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加推广员
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
     * 推广员编辑
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
     * 删除推广员
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getMemberAll(){
       $memberModel = new Member();
       return $memberModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}
