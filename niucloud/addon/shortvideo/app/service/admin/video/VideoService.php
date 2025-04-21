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

namespace addon\shortvideo\app\service\admin\video;

use addon\shortvideo\app\model\Video;
use addon\shortvideo\app\model\Cate;
use addon\shortvideo\app\model\label\Label;
use addon\shortvideo\app\service\core\CoreConfigService;
use app\model\member\Member;

use core\base\BaseAdminService;
use think\facade\Db;


/**
 * 服务层
 * Class VideoService
 * @package addon\shortvideo\app\service\admin\video
 */
class VideoService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Video();
    }

    /**
     * 获取列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
//        $field = 'id,cate_id,details,imgs,member_id,likenum,views,status,label,labelname,adddate,site_id';->with(['cate','member']) "cate_id",
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["name","member_id","status","adddate"], $where)->with(['member'])->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list[ 'data' ] as $k => &$v) {

        }

        return $list;
    }

    /**
     * 获取信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {

        $info = $this->model->where([['id', "=", $id]])->with(['member'])->findOrEmpty()->toArray();
        $info["label_ids"] = $info["label_ids"]?explode(',',$info["label_ids"]):[];
        foreach ($info["label_ids"] as $k => &$v) {
            $v = intval($v);
        }
        $info['member_info'] = (new Member())->where('member_id', $info['member_id'])->findOrEmpty()->toArray();


        $config = (new CoreConfigService)->getConfig(['site_id'=>$this->site_id]);
        if($config['open_shop']==1){
            $info['product_list'] = Db::name('shop_goods')->alias('a')->field('a.goods_id,a.goods_cover,a.goods_name,a.goods_image')->where('a.site_id',$this->site_id)->where('a.goods_id','in',$info["goods_ids"].',9999999')->select()->toArray(); $info['goods_info'] = $info['product_list'][0]??'';
            $info["goods_ids"] = $info["goods_ids"]?explode(',',$info["goods_ids"]):[];
        }else{
            $info["goods_ids"] = [];
            $info["product_list"] = [];
        }




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
        $data['label_ids'] = $data['label_ids']?implode(',',$data['label_ids']):'';
        $data['goods_ids'] = $data['goods_ids']?implode(',',$data['goods_ids']):'';

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
        $info = $this->model->where([['id', "=", $id]])->findOrEmpty()->toArray();

        $data['label_ids'] = $data['label_ids']?implode(',',$data['label_ids']):'';
        $data['goods_ids'] = $data['goods_ids']?implode(',',$data['goods_ids']):'';

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
    
    public function getCateAll(){

        $post = input('');
        $where =[];
       $cateModel = new Cate();
        $list = $cateModel->where([["site_id","=",$this->site_id]])->where($where)->where('status',1)->select()->toArray();

       return $list;
    }

    public function getMemberAll(){
       $memberModel = new Member();
       return $memberModel->where([["site_id","=",$this->site_id]])->where('status',1)->select()->toArray();
    }

    public function getVideoAll(){
        return $this->model->field('id,name')->where([["site_id","=",$this->site_id]])->where('status',1)->select()->toArray();
    }

    public function getconfig()
    {

        $data['site_id'] = $this->site_id;
        $info = (new CoreConfigService)->getConfig($data);

        return $info;
    }

    public function getGoodsAll()
    {
        $data['site_id'] = $this->site_id;
        $config = (new CoreConfigService)->getConfig($data);

        if($config['open_shop']==0){
            return [];
        }
        $info = Db::name('shop_goods')->alias('a')->join('shop_goods_sku b','a.goods_id = b.goods_id')->field('a.goods_id,a.goods_cover,a.goods_name,a.goods_image,b.sale_price')->where('a.site_id',$this->site_id)->order('b.sale_price asc')->select()->toArray();
        return $info;
    }
    public function getLabelAll(){
        $labelModel = new Label();
        return $labelModel->where([["site_id","=",$this->site_id]])->where('status',1)->order('sort desc,id desc')->select()->toArray();
    }

}
